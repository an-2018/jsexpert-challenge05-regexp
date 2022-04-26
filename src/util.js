const safeRegex = require("safe-regex")

// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
class InvalidRegexError extends Error {
    constructor(exp) {
        super(`This Expression: "${exp}" has a pattern of an unsafe Regex!`)
        this.name = "InvalidRegexError"
    }
}

const evaluateRegex = (exp) => {
    if (safeRegex(exp)) return exp
    throw new InvalidRegexError(exp)
}

module.exports = { evaluateRegex, InvalidRegexError }

/**
 * Code snipets
 * 
 
main(){
    
    const matchRegex = /(?<titulo>^.+?);(?<link>[http|https]+:\/\/.+?);(?<autor>.+?);(?<etapa>.+?);(?<ementa>.+?);|(?<indexadoresnorma>.+?);$/gm
    const content = {
        headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
        body: `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;
        Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;
        Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;`
    }
    
    // const arrResult = []
    // while ((result = matchRegex.exec(content.body))) {
    //     arrResult.push(result.groups)
    // }
    const result = content.body.split("\n").map((item) => item.trim())
    console.log(result)
    const matches = content.body.matchAll(matchRegex)
    let res = {}
    for (let match of matches) {
        res = {
            ...match.groups,
            ...res,
        }
        if (match.groups.indexadoresnorma) {
            res.indexadoresnorma = match.groups.indexadoresnorma
            continue
        }
        // console.log(res)
    }
    console.log(res)
    
}
*/