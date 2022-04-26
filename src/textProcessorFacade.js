const TextProcessorFluentAPI = require("./textProcessorFluentAPI")

// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
class TextProcessorFacade {
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getProjectFromCSV() {
        return this.#textProcessorFluentAPI
            .extractHeaders()
            .extractBodyContent()
            .extractContentInfo()
            .createProjectFromRawData()
            .build()
    }
}

module.exports = TextProcessorFacade