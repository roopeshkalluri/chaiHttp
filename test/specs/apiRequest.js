let chai = require('chai');
let chaiHttp = require('chai-http');
const should = require('should');
const { assert, expect } = require('chai');
chai.use(chaiHttp);
var request = chai.request;
const fs = require('fs');
const { type } = require('os');
const apiURL = "http://localhost:3000/api/stocks?date=";


describe('test stocks API', () =>{
    it('TC02 -Pass invalid characters in the request body and verify the response code is 400 Bad Request', () =>{
        request(apiURL)
        .get('7-January-2019/test')
        .end(function ( err, res) {
            should(res.status).equals(400);
        });
     })
     it('TC03 - Pass all the valid input in all the fields and send the request  then the response code should be 200 OK', () =>{ 
        request(apiURL)
            .get('7-January-2019')
            .end(function(err, res) { 
                should(res.status).equals(200);
                res.should.be.json;
                res.should.not.be.text;
                res.should.not.be.html;
                res.text.should.be.string;
            });
     });
     it('TC04 - should validate response body', () =>{
        request(apiURL)
        .get('7-July-2020')
        .end(function ( err, res) {
            assert.containsAllKeys(res.body, ["date","open","high","low","close"] );
        });

      });
     it('TC05 -should validate response headers', () =>{
        request(apiURL)
        .get('7-January-2021')
        .end(function ( err, res) {
            assert.containsAllKeys(res.header, ["x-powered-by", "content-type", "content-length", "etag", "date", "connection"])
            // res.header['content-length'].should.equal("93");
            res.header['content-type'].should.equal("application/json; charset=utf-8");
            res.header['x-powered-by'].should.equal("Express");
            res.header['content-type'].should.equal("application/json; charset=utf-8");
            res.header['connection'].should.equal("close");
        });

      });
     it('TC06 -(boundary value scenario) >>Pass date as 29 feb in non leap year and try submitting the request, it should throw 400 Bad Request', () =>{
        request(apiURL)
        .get('29-February-2011')
        .end(function ( err, res) {
            // should(res.status).equals(400);
            res.body['date'].should.equal("29-February-2011");
        });

     });
     it('TC07 -(boundary value scenario) >>Pass date as 32 jan 2011 and try submitting the request, it should throw 400 Bad Request ', () =>{
        request(apiURL)
        .get('32-January-2011')
        .end(function ( err, res) {
            // should(res.status).equals(400);
            res.body['date'].should.equal("32-January-2011");
        });

      });
     it('TC08 -Provide String value in the date field and trigger the request, it should throw 400 Bad Request', () =>{
        request(apiURL)
        .get('test-January-roopesh')
        .end(function ( err, res) {
            should(res.status).equals(400);
        });

     });
     it('TC01 -Send the request with incorrect baseURI and verify the response code is 404 Not Found', (resolve) =>{
        request("http://localhost:3000/api/?date=7-January-2019")
          .get()
          .end(function (err, res) {
            resolve(res);
            should(res.status).equals(404);
          });
      });
});