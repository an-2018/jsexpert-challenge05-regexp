// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
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
        const matchRegex = evaluateRegex(/(?<titulo>^.+?);(?<link>[http|https]+:\/\/.+?);(?<autor>.+?);(?<etapa>.+?);(?<ementa>.+?);|(?<indexadoresnorma>.+?);$/gm)
        const matches = this.#content.body.matchAll(matchRegex)
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
        this.#content.body = [result]

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
        const { link, titulo, autor } = this.#content.body[0]
        const numAnoReg = evaluateRegex(/(\d.+)\/(\d.+)/gm)
        const linkReg = evaluateRegex(/(?<=\?id=)(\d.+)/mg)
        const authorsReg = evaluateRegex(/(?<name>^.+?)\s.+\s?\s(?<lastname>.+)$/mg)
        const [numero, ano] = titulo.match(numAnoReg)[0].split('/')
        const [id] = link.match(linkReg)
        const autores = authorsReg.exec(autor).groups
        const extratecAutor = [autores.name, autores.lastname].join(" ")

        this.#content.body = [
            {
                id,
                numero,
                ano,
                autores: [{ nome: extratecAutor, }],
                url: link,
                indexadores: this.#content.body[0].indexadoresnorma.split(',').map(item => item.trim())
            }
        ]
        return this
    }
    /**
     * Step 4 Create an instance of Project from the raw objects in #content
     */
    createProjectFromRawData() {

    }
    /**
     * Step 5 Build the end result of the Fluent API
     */
    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI