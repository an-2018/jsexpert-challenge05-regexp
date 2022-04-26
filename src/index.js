// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
// Dica do wells: no lugar da chamada do PDF parser, um simples `.toString()` resolve, já que nós é que implementaremos o "CSV parser"
'use strict'
const { readFile } = require('fs/promises');
const { join } = require('path');
const TextProcessorFacade = require('./textProcessorFacade');

(
    async () => {
        const dataBuffer = await readFile(join(__dirname, "./../docs/projeto-de-lei.csv"))
        const instance = new TextProcessorFacade(dataBuffer.toString())
        const projects = instance.getProjectFromCSV()
        console.log(JSON.stringify(projects.slice(0, 10)))
    }
)()