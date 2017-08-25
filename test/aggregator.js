/**
 * Created by pengkun on 17/08/2017.
 */
var expect = require('chai').expect

describe('Aggregator#', function (){
    describe('check aggregator validation#', function (){
        var createAggregator = require('../lib/aggregator/aggregator')
        it('Aggregator Factory', function (){
            var count = createAggregator('count')
            var thetaSketch = createAggregator('thetaSketch')
            expect(count.type).to.be.equal('count')
            expect(thetaSketch.type).to.be.equal('thetaSketch')
            expect(function (){
                createAggregator('bbbb')
            }).to.throw()
        })
        it('aggregator count validation', function (){
            var good = createAggregator('count', 'count')
            var bad = createAggregator('count','')

            expect(function (){
                good.validate()
            }).to.not.throw()
           expect(function (){
                bad.validate()
            }).to.throw(/empty/)
        })
        it('simple form aggregator validation', function (){
            var   ls = createAggregator('longSum','ls', 'field')
            var ds = createAggregator('doubleSum', 'ds', 'field')
            var bad1 = createAggregator('longSum', 'ls')
            var bad2 = createAggregator('doubleSum', 'ds','')

            expect( function (){
                ls.validate()
            }).to.not.throw()
            expect(function (){
                ds.validate()
            }).to.not.throw()
            expect(function (){
                bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
                bad2.validate()
            }).to.throw(/empty/)
        })

        it('cardinality aggregator validation', function (){
            var good = createAggregator('cardinality', 'name', ['field'])
            var bad1 = createAggregator('cardinality')
            var bad2  = createAggregator('cardinality', 'name', '')
            var bad3 = createAggregator('cardinality', 'name' ,[])
            var good2 = createAggregator('cardinality', 'name', ['field'], true)
            expect(function (){
               good.validate()
               good2.validate()
            }).to.not.throw()
            expect(function (){
                bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
                bad2.validate()
            }).to.throw(/array/)
            expect(function (){
                bad3.validate()
            }).to.throw(/empty/)


        })
        it('filtered aggregator validation', function (){ var createFilter = require('../lib/filter/filter')
           var bad1 = createAggregator('filtered')
           var bad2 = createAggregator('filtered', {},{})

           var bad3 = createAggregator('filtered', createFilter('selector'), createAggregator('count'))
           var bad4 = createAggregator('filtered', createFilter('selector', 'name', 'value'), createAggregator('thetaSketch'))

           var good = createAggregator('filtered').withF('selector', 'name', 'value').withG('count')
           expect(function (){
              bad1.validate()
           }).to.throw(/missing/)
           expect(function (){
              bad2.validate()
           }).to.throw(/empty/)
           expect(function (){
               bad3.validate()
           }).to.throw(/missing/)
           expect(function (){
               bad4.validate()
           }).to.throw(/missing/)
           expect(function (){
               good.validate()
           })

        })
        it('hyperUnique aggregator validation', function (){
            var bad1 = createAggregator('hyperUnique')
            var bad2 = createAggregator('hyperUnique', '','')
            var good = createAggregator('hyperUnique', 'name', 'field')
            expect(function (){
                bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
                bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
               good.validate()
            }).to.not.throw()
        })
        it('thetaSketch aggregator validation', function (){
            var bad1 = createAggregator('thetaSketch')
            var bad2 = createAggregator('thetaSketch', '' , '')
            var good = createAggregator('thetaSketch', 'name', 'field', false, 123)
            var good2 = createAggregator('thetaSketch', 'name', 'field')
            expect(function (){
                bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
               bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
               good.validate()
               good2.validate()
            }).to.not.throw()
        })
    })

})
