// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
const Project = require('./project')
const { evaluateRegex } = require('./util')
class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content
    }

    /**
     * Step 1 Extract headers of the excel data 
     * and separate into headers and body property in the #content object
     * Goal:
     * [
     *  {
     *      headers: "headers...",
     *      body: "body content..."
     *  }
     * ]
     *  */
    extractHeaders() {
        const matchHeaders = evaluateRegex(/\n/s)
        const result = this.#content.split(matchHeaders)
        this.#content = {
            headers: result.shift(),
            body: [...result].join("\n")
        }
        return this
    }

    /**
     * Step 2 Extract project data from body of the #content from step 1
     * Goal:
     * {
        título: 'Projeto de lei 584/2016',
        link: 'http://www.al.sp.gov.br/propositura?id=1322563',
        autor: 'Jorge Wilson Xerife do Consumidor',
        etapa: 'PAUTA',
        ementa:
            'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
        indexadoresnorma:
            'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
        }
     * */
    extractBodyContent() {
        const bodyContent = this.#content.body.split("\n").map((item) => item.trim())
        const matchRegex = evaluateRegex(/(?<titulo>^.+?);(?<link>[http|https]+:\/\/.+?);(?<autor>.+?);(?<etapa>.+?);(?<ementa>.+?);|(?<indexadoresnorma>.+?);$/gm)
        const result = bodyContent.map((item) => {
            const matches = item.matchAll(matchRegex)
            let result = {}
            for (let match of matches) {
                result = {
                    ...match.groups,
                    ...result,
                }
                if (match.groups.indexadoresnorma) {
                    result.indexadoresnorma = match.groups.indexadoresnorma
                    continue
                }
            }
            return result
        })

        this.#content.body = result
        return this
    }
    /**
     * Step 3 Extract additional informations in each field of the body
     * Goal:
     * {
        id: '1322563',
        numero: '584',
        ano: '2016',
        autores: [
            {
            nome: 'Jorge Consumidor',
            },
        ],
        url: 'http://www.al.sp.gov.br/propositura?id=1322563',
        indexadores: [
            'CONTRATO',
            'OBRIGATORIEDADE',
            'CLÁUSULA',
            'SERVIÇO',
            'TELEFONIA MÓVEL',
            'TELEFONIA FIXA',
            'PRAZO',
            'INCLUSÃO',
            'RESCISÃO CONTRATUAL',
            'LIBERAÇÃO',
        ],
        },
     */
    extractContentInfo() {
        const result = this.#content.body.map((item) => {
            const numAnoReg = evaluateRegex(/(\d.+)\/(\d.+)/gm)
            const linkReg = evaluateRegex(/(?<=\?id=)(\d.+)/mg)
            const authorsExp = evaluateRegex(/(^.+?)\s.+\s?\s(.+)$/mg)
            const formatAuthors = (prop) => {
                return prop.replace(authorsExp, (fullMatch, group1, group2, index) => {
                    console.log(`Autores  fullmacth:${fullMatch}  group1:${group1} group2: ${group2} index: ${index}`)
                    // return `${group1} ${group2}`
                })
            }
            const formatAnoNumero = (prop) => {
                return prop.replace(authorsExp, (fullMatch, group1, group2, index) => {
                    console.log(`Ano Number  fullmacth:${fullMatch}  group1:${group1} group2: ${group2} index: ${index}`)
                    const result = group2.split('/')
                    console.log(result)
                    return [...result]
                })
            }
            const { link, titulo, autor } = item
            const [numero, ano] = formatAnoNumero(titulo)//titulo.match(numAnoReg)[0].split('/')
            console.log([numero, ano])
            const [id] = link.match(linkReg)
            const autores = formatAuthors(autor)//authorsExp.exec(autor).groups
            //const extratecAutor = [autores.name, autores.lastname].join(" ")

            item = {
                id,
                numero,
                ano,
                autores: [{ nome: autores, }],
                url: link,
                indexadores: this.#content.body[0].indexadoresnorma.split(',').map(item => item.trim())
            }
            return item
        })

        this.#content.body = result
        return this
    }
    /**
     * Step 4 Create an instance of Project from the raw objects in #content
     */
    createProjectFromRawData() {
        const result = this.#content.body.map((item) => {
            return new Project(item)
        })
        this.#content = result
        return this
    }
    /**
     * Step 5 Build the end result of the Fluent API
     */
    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI