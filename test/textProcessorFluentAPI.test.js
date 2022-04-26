// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
const { describe, it } = require('mocha')
const { expect } = require('chai')
const mock = require('./mock/valid')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const Project = require('./../src/project')
describe("TextProcessorFluentAPI", () => {
    it("#Build - Should return the result of building an instance of the Fluent API text processor", () => {
        const processor = new TextProcessorFluentAPI(mock)
        const result = processor.build()
        expect(result).to.be.deep.equal(mock)
    })
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
    it("#ExtractHeaders - should separate the header from the body content of the raw data", () => {
        const processor = new TextProcessorFluentAPI(mock)
        const result = processor.extractHeaders().build()
        const expected = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;
Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;
Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;`
        }
        expect(result).to.be.deep.equal(expected)
    })
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
    it("#ExtractContent - Extract additional informations in each field of the body", () => {
        const content = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;
            Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;`
        }
        const processor = new TextProcessorFluentAPI(content)
        const result = processor.extractBodyContent().build()
        const expected = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: [
                {
                    titulo: 'Projeto de lei 584/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322563',
                    autor: 'Jorge Wilson Xerife do Consumidor',
                    etapa: 'PAUTA',
                    ementa:
                        'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    indexadoresnorma:
                        'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                },
                {
                    titulo: 'Projeto de lei 584/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322563',
                    autor: 'Jorge Wilson Xerife do Consumidor',
                    etapa: 'PAUTA',
                    ementa:
                        'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    indexadoresnorma:
                        'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                }
            ]
        }

        expect(result).to.be.deep.equal(expected)
    })
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
    it("#ExtractContentInfo - Extract additional informations in each field of the body", () => {
        const content = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: [
                {
                    titulo: 'Projeto de lei 584/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322563',
                    autor: 'Jorge Wilson Xerife do Consumidor',
                    etapa: 'PAUTA',
                    ementa:
                        'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    indexadoresnorma:
                        'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                },
                {
                    titulo: 'Projeto de lei 584/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322563',
                    autor: 'Jorge Wilson Xerife do Consumidor',
                    etapa: 'PAUTA',
                    ementa:
                        'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    indexadoresnorma:
                        'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                }
            ]
        }
        const processor = new TextProcessorFluentAPI(content)
        const result = processor.extractContentInfo().build()
        const expected = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: [
                {
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
                {
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
            ]
        }
        expect(result).to.be.deep.equal(expected)
    })
    /**
     * Step 4 Create an instance of Project from the raw objects in #content
     */
    it("#Create Create an instance of Project from the raw objects in content", () => {
        const content = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;",
            body: [
                {
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
                {
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
            ]
        }
        const processor = new TextProcessorFluentAPI(content)
        const result = processor.createProjectFromRawData().build()
        const expected = [
            new Project({
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
            }),
            new Project({
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
            })
        ]
        expect(result).to.be.deep.equal(expected)
    })
})
