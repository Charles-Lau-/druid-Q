/**
 * Created by pengkun on 19/07/2017.
 */
var expect = require('chai').expect

describe("Specific Query Tests# ", function (){
    var druid = require('../index').Druid
    var client  = new druid('http://cloud-host-07:8082').client()
    describe("timeseries#", function (){
        this.timeout(15000);
        var query = druid.TimeSeriesQuery('POPP').intervals("2017-06-02T00:00:00.000","2017-06-03T00:00:00.000")
                     .filter('selector', 'verb', 'user.login')
                     .aggregator('count')
        it("test a simple normal query", function (done){
                client.exec(query, function (err, data){
                    if(err) done(err)
                    else{
                        expect(data).be.an('array')
                        expect(data).to.have.lengthOf(1)
                        expect(data).to.have.nested.property('0.result')
                        expect(data[0].result.count).to.be.equal(399292)
                        done()
                        }

                })
        })
        it("test the add filter function", function (done){
              client.exec(query.clone().filter('and').addFilter('selector', 'verb','user.login'), function (err, data){
                  if(err) done(err)
                  else{
                      expect(data).be.an('array')
                      expect(data).to.have.lengthOf(1)
                      expect(data).to.have.nested.property('0.result')
                      expect(data[0].result.count).to.be.equal(399292)
                      done()

                  }
              })
        })
        it("test add filter directly from filter instance", function (done){
               var Selector =  require('../lib/filter/selector'),
                   And = require('../lib/filter/and')

               client.exec(query.clone().filter(new And([new Selector('verb', 'user.login')])), function (err, data){
                   if(err) done(err)
                   else{
                       expect(data).be.an('array')
                       expect(data).to.have.lengthOf(1)
                       expect(data).to.have.nested.property('0.result')
                       expect(data[0].result.count).to.be.equal(399292)
                       done()

                   }
               })
        })
        it("throw exceptions when there are fields missing", function (){
             expect(function (){
               var q =  query.clone()
               q.remove('intervals')
               client.exec(q)

             }).to.throw(/missing/)

        })
    })
    describe("topN#", function () {
        this.timeout(15000);
        var query = druid.TopNQuery('POPP').intervals("2017-06-02T00:00:00.000", "2017-06-03T00:00:00.000")
                .filter('selector', 'verb', 'user.login')
                .dimension('gender')
                .aggregator('count')
                .metric('count')
        it('test a simple topN query', function (done)
        {
            client.exec(query, function (err, data)
            {
                if(err) done(err)
                else{
                    expect(data).be.an('array')
                    expect(data).to.have.nested.property('0.count')
                    expect(data).to.have.nested.property('0.gender')
                    expect(data[0].count).to.be.equal(307985)
                    done()
                }
            })
        })
        it('throw errors when there are missing field', function (){
             expect(function (){
                 var q = druid.TopNQuery('POPP').intervals("2017-06-02T00:00:00.000", "2017-06-03T00:00:00.000")
                     .filter('selector', 'verb', 'user.login')
                     .dimension('gender')
                 client.exec(q)
             }).to.throw(/empty/)
        })
    })
    describe("groupBy#", function (){
        this.timeout(15000)
        var query =  druid.GroupByQuery('POPP').intervals("2017-06-02T00:00:00.000", "2017-06-03T00:00:00.000")
            .filter('selector', 'verb', 'user.login')
            .aggregator('count')

        it('a simple groupBy query', function (done){
                client.exec(query, function (err, data){
                     if(err) done(err)
                     else {
                         expect(data).be.an('array')
                         expect(data).to.have.nested.property('0.count')
                         done()
                     }
                })
          })
        it('throw exceptions when there are fields missing', function (){
            expect(function (){
                 var q = query.clone().remove('filter').remove('aggregations').remove('intervals')
                client.exec(q)
            }).to.throw(/missing/)

        })

    })



})

