// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
const { describe, it } = require('mocha')
const { expect } = require('chai')
const Project = require('./../src/project')

describe("Project", () => {
    it("#Project - should generate a new project from raw data", () => {
        const raw = {
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
        }
        const result = new Project(raw)

        expect(result).to.be.deep.equal(raw)
    })
})