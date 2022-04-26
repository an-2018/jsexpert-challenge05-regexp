const matchRegex = /(?<titulo>^.+?);(?<link>[http|https]+:\/\/.+?);(?<autor>.+?);(?<etapa>.+?);(?<ementa>.+?);|(?<indexadoresnorma>.+?);$/gm
const content = {
    headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
    body: `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;`
}

// const arrResult = []
// while ((result = matchRegex.exec(content.body))) {
//     arrResult.push(result.groups)
// }

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
