/**
 * Created by pengkun on 19/07/2017.
 */
var expect = require('chai').expect

describe("Specific Query Tests# ", function (){
    var druid = require('../index').Druid
    var client  = new druid('http://cloud-host-07:8082').client()
    var createPosts = require('../lib/post/postAggregator')
    describe("timeseries#", function (){
        this.timeout(15000);
        var query = druid.TimeSeriesQuery('POPP').intervals("2017-06-02T00:00:00.000","2017-06-03T00:00:00.000")
                     .filter('selector', 'verb', 'user.login')
                     .aggregator('count')
                     .postAggregator('/', 'res', [createPosts('constant','a','5'),createPosts('constant', 'b','5')])
        it("test a simple normal query", function (done){
                client.exec(query, function (err, data){
                    if(err) done(err)
                    else{
                        expect(data).be.an('array')
                        expect(data).to.have.lengthOf(1)
                        expect(data).to.have.nested.property('0.result')
                        expect(data[0].result.count).to.be.equal(399292)
                        expect(data[0].result.res).to.be.equal(1)
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
                .filter('and')
                   .with('selector', 'verb', 'user.login')
                .dimension('gender')
                .aggregator('count')
                .metric('count')
                .postAggregator('/', 'res')
                   .with('constant', 'a', '5')
                   .with('constant', 'b', '5')
                .postAggregator('*', 'res2')
                   .with('constant','c', '5')
                   .with('constant', 'd', '5')
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
                    expect(data[0].res).to.be.equal(1)
                    expect(data[0].res2).to.be.equal(25)
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
             }).to.throw(/missing/)
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
    describe("retentionQuery#", function (){
        this.timeout(15000)
        var query =  druid.RetentionQuery('POPP').intervals("2017-08-02T00:00:00.000", "2017-08-03T00:00:00.000")
        it('A  simple retention query', function (done){
              query.clone().aggregator('thetaSketch', 'unique_users', 'userId')
                  .addFilter('selector','verb', 'user.reg_confirm')
            client.exec(query.clone().aggregator('thetaSketch', 'unique_users','userId')
                    .addFilter('selector', 'verb', 'user.reg_confirm')
                , function (err, data){
                    if(err) done(err)
                    else{
                        expect(data[0].unique_users).to.be.equal(1417)
                        done()
                    }
            }
            )

        })
        it('A typical retention query', function (done){
            let q = query.clone().intervals("2017-07-02T00:00:00.000", "2017-08-03T00:00:00.000")
            q.addFilter('or')
                .with('selector', 'verb', 'user.reg_confirm')
                .with('selector', 'verb', 'user.login')
                .aggregator('filtered')
                   .withF('interval', ['2017-07-02T00:00:00.000/2017-07-29T00:00:00.000'])
                   .withG('thetaSketch', 'signup_num', "userId")
                .aggregator('filtered')
                   .withF('interval', ['2017-08-01T00:00:00.000/2017-08-03T00:00:00.000'])
                   .withG('thetaSketch', 'login_num', "userId")
                .postAggregator('thetaSketchEstimate', 'res')
                   .with('thetaSketchSetOp', 'final_res', 'INTERSECT')
                   .with('fieldAccess', 'signup_num')
                   .with('fieldAccess','login_num')
            client.exec(q, function (err, data){
                if(err) done(err)
                else{
                    expect(data.length).to.not.be.equal(0)
                    done()
                }


            })
        })
        it('A typical retention query', function (done){
            let q = query.clone().intervals("2017-07-02T00:00:00.000", "2017-08-03T00:00:00.000")
             q.addFilter('or')
                .with('selector', 'verb', 'user.reg_confirm')
                .with('selector', 'verb', 'user.login')
              .intervalFiltered(['2017-07-02T00:00:00.000/2017-07-29T00:00:00.000'], 'signup_num', 'userId')
              .intervalFiltered(['2017-08-01T00:00:00.000/2017-08-03T00:00:00.000'], 'login_sum', 'userId')
              .intersect('res', 'signup_num', 'login_sum')

            client.exec(q, function (err, data){
                if(err) done(err)
                else{
                    expect(data.length).to.not.be.equal(0)
                    done()
                }
            })
        })
    })



})

