/**
 * Created by pengkun on 17/08/2017.
 */
var expect = require('chai').expect

describe('PostAggregator#', function (){
    describe('check postAggregator validation#', function (){
        var createPosts = require('../lib/post/postAggregator')
        it('PostAggregator Factory', function (){
            var good = createPosts('constant')
            var good2 = createPosts('fieldAccess')
            var good3 = createPosts('+')

            expect(good.type).to.be.equal('constant')
            expect(good2.type).to.be.equal('fieldAccess')
            expect(good3.type).to.be.equal('arithmetic')

            expect(function (){
                createPosts('ab')
            }).to.throw()
        })
        it('Arithemetic PostAggregator Validation', function (){
            var bad1 = createPosts('+')
            var bad2 = createPosts('-', 'name')
            var bad3 = createPosts('quotient', 'name', ['asd'], 'asdf')
            var good = createPosts('*', 'outputName', ['asdf'])

            expect(function (){
                bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
                bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
                bad3.validate()
            }).to.throw(/numericFirst/)
            expect(function (){
               good.validate()
            }).to.not.throw()
        })
        it('Compare postAggregator Validation', function (){
            var bad1 = createPosts('longGreatest')
            var bad2 = createPosts('longGreatest','outputName')
            var bad3 = createPosts('doubleGreatest', 'outputName', 'asdf')
            var good = createPosts('longGreatest', 'outputName', ['asdf'])
            expect(function (){
               bad1.validate()
            }).to.throw(/missing/)
            expect(function (){
               bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
               bad3.validate()
            }).to.throw(/array/)
            expect(function (){
                good.validate()
            }).to.not.throw()
        })
        it('Constant postAggregator Validation', function (){
            var bad = createPosts('constant')
            var bad2 = createPosts('constant', 'name', '')
            var good = createPosts('constant', 'name' ,'val')
            expect(function (){
                bad.validate()
            }).to.throw(/missing/)
            expect(function (){
               bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
                good.validate()
            }).to.not.throw()

        })
        it('FieldAccess postAggregator Validation', function (){
            var bad = createPosts('fieldAccess')
            var bad2 = createPosts('fieldAccess', 'fieldName', '' )
            var good = createPosts('fieldAccess', 'fieldName', 'outputName')
            expect(function (){
                bad.validate()
            }).to.throw(/missing/)
            expect(function (){
                bad2.validate()
            }).to.throw(/empty/)
            expect(function (){
                good.validate()
            }).to.not.throw()
        })
        it('hyperUniqueCardinality postAggregator Validation', function (){
           var bad = createPosts('hyperUniqueCardinality')
           var bad2 = createPosts('hyperUniqueCardinality', '')
           var good = createPosts('hyperUniqueCardinality', 'fieldName')
           expect(function (){
              bad.validate()
           }).to.throw(/missing/)
           expect(function (){
              bad2.validate()
           }).to.throw(/empty/)
           expect(function (){
              good.validate()
           }).to.not.throw()
        })
        it('javascript postAggregator Validation', function (){
           var bad = createPosts('javascript')
           var bad2 = createPosts('javascript', 'outputname', '')
           var bad3 = createPosts('javascript', 'outputname', 'asdf', 'asdf')
           var good = createPosts('javascript', 'outputname', 'asdf', ['a','b'])

           expect(function (){
              bad.validate()
           }).to.throw(/missing/)
           expect(function (){
              bad2.validate()
           }).to.throw(/empty/)
           expect(function (){
              bad3.validate()
           }).to.throw(/array/)
           expect(function (){
              good.validate()
           }).to.not.throw()
        })
        it('thetaSketchEstimate postAggregator Validation', function (){
           var bad = createPosts()
        })
    })
})
