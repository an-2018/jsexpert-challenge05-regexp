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