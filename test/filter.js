/**
 * Created by pengkun on 24/07/2017.
 */
var expect = require('chai').expect


describe('Filter#',function (){
    describe('check filter validation#', function () {
        var createFilter = require('../lib/filter/filter')
        it('Filter factory', function () {
            var selector = createFilter('selector')
            var like = createFilter('like')
            expect(selector.type).to.be.equal('selector')
            expect(like.type).to.be.equal('like')
            expect(function () {
                createFilter('aa')
            }).to.throw()
        })
        it('Selector Validation', function () {
            var badOne = createFilter('selector')
            var badTwo = createFilter('selector', 'dimension')
            var badThree = createFilter('selector', '')
            expect(function () {
                badOne.validate()
            }).to.throw(/missing/)
            expect(function () {
                badTwo.validate()
            }).to.throw(/missing/)
            expect(function () {
                badThree.validate()
            }).to.throw(/empty/)

        })
        it('And  Validation', function () {
            var badOne = createFilter('and')
            var badTwo = createFilter('and', [])
            var badThree = createFilter('and', [createFilter('selector')])
            var goodOne = createFilter('and', [createFilter('selector', 'a', 'b')])
            expect(function () {
                badOne.validate()
            }).to.throw(/empty/)
            expect(function () {
                badTwo.validate()
            }).to.throw(/empty/)
            expect(function () {
                badThree.validate()
            }).to.throw(/missing/)

            expect(function () {
                goodOne.validate()
            }).to.not.throw()
            expect(function (){
                badTwo.fields.push(createFilter('selector','a','b'))
                badTwo.validate()
            }).to.not.throw()
        })

        it('Or Validation', function () {
            var badOne = createFilter('or')
            var badTwo = createFilter('or', [])
            var badThree = createFilter('or', [createFilter('selector')])
            var goodOne = createFilter('or', [createFilter('selector', 'a', 'b')])
            expect(function () {
                badOne.validate()
            }).to.throw(/empty/)
            expect(function () {
                badTwo.validate()
            }).to.throw(/empty/)
            expect(function () {
                badThree.validate()
            }).to.throw(/missing/)

            expect(function () {
                goodOne.validate()
            }).to.not.throw()
            expect(function (){
                badTwo.fields.push(createFilter('selector','a','b'))
                badTwo.validate()
            }).to.not.throw()
        })

        it('Bound Validation', function (){
            var badZero =  createFilter('bound')
            var badThree = createFilter('bound','dimension','1500886453','1500886453', true, false, 'asdf')
            var badFour =  createFilter('bound', 'dimension','1500886453', '1500886453', 'asdf','asdf')
            var good = createFilter('bound','dimension','1500886453','1500886453')
            expect(function (){
                badZero.validate()
            }).to.throw(/missing/)
            expect(function (){
                badThree.validate()
            }).to.throw()
            expect(function (){
                badFour.validate()
            }).to.throw(/boolean/)
            expect(function (){
               good.validate()
            }).to.not.throw()



        })
        it('In  Validation', function (){
            var badOne = createFilter('in')
            var badTwo = createFilter('in','dimension',[])
            var badThree = createFilter('in','dimension',['a','b'])
            expect(function (){
                badOne.validate()
            }).to.throw(/missing/)
            expect(function (){
                badTwo.validate()
            }).to.throw(/empty/)
            expect(function (){
               badThree.validate()
            }).to.not.throw()

        })
        it('Interval Validation', function (){
            var badOne = createFilter('interval')
            var good = createFilter('interval', ['20171010T00:00:00/201510101T00:00:00'])
            expect(function (){
               badOne.validate()
            }).to.throw(/empty/)
            expect(function (){
               good.validate()
            }).to.not.throw()

        })
        it('Like Validation', function (){
            var badOne = createFilter('like')
            var badTwo = createFilter('like','dimension')
            var good = createFilter('like','dimension','pattern')
            expect( function (){
               badOne.validate()
            }).to.throw(/missing/)
            expect(function(){
               badTwo.validate()
            }).to.throw(/missing/)
            expect(function (){
               good.validate()
            }).to.not.throw()

        })
        it('Not Validation', function (){
            var badOne = createFilter('not')
            var badTwo = createFilter('not', createFilter('selector'))
            var good = createFilter('not', createFilter('like','dimension','xx'))
            expect(function(){
               badOne.validate()
            }).to.throw(/missing/)
            expect(function (){
               badTwo.validate()
            }).to.throw(/missing/)
            expect(function (){
               good.validate()
            }).to.not.throw()
        })
        it('Regex Validation', function (){
            var badOne = createFilter('regex')
            var badTwo = createFilter('regex','dimension')
            var good = createFilter('regex', 'dimension','pattern')
            expect(function (){
               badOne.validate()
            }).to.throw(/missing/)
            expect(function (){
               badTwo.validate()
            }).to.throw(/missing/)
            expect(function (){
               good.validate()
            }).to.not.throw()
        })

    })
})
