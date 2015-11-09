'use strict';

var assert = require('assert')
var AttParser = require('../index')
var attrs = AttParser('space="abc \n 123" name= sex company="TX" test=" 123" disabled=true value=1 $id="dolar"')

describe('#Parse', function () {
    it('Value include space', function () {
        assert.equal(attrs.space, 'abc \n 123')
        assert.equal(attrs.test, ' 123')
    })
    it('Empty value', function () {
        assert.equal(attrs.name, '')
    })
    it('String value', function () {
        assert.equal(attrs.company, 'TX')
    })
    it('No value', function () {
        assert.equal(attrs.sex, '')
    })
    it('Bool value', function () {
        assert.equal(attrs.disabled, 'true')
    })
    it('Number value', function () {
        assert.equal(attrs.value, '1')
    })
    it('Attribute name with $', function () {
        assert.equal(attrs.value, '1')
    })
    it('Redundant attribute', function () {
        var attrs = AttParser('name="a" name="a"')
        assert.equal(attrs.name, 'a')
    })
})