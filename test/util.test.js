// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex } = require('./../src/util')

describe('Util', () => {
    it('#evaluateRegex should throw an error on invalid Regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This Expression: "${unsafeRegex}" has a pattern of an unsafe Regex!`)
    })

    it('#evaluateRegex should return the expression on valid Regex', () => {
        const safeRegex = /^a-z$/

        expect(evaluateRegex(safeRegex)).to.not.throw
        const result = evaluateRegex(safeRegex)
        expect(result).to.be.deep.equal(safeRegex)
    })
})