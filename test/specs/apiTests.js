const { assert, expect } = require('chai');
const apiPage = require('./../pageObjects/apiUtilities');
const allureReporter = require('@wdio/allure-reporter').default;
const response = require('../../response.json');

const apiURL = "http://localhost:3000/api/stocks?date=";


describe('test stocks API', () =>{
    it('TC01 -Send the request with incorrect baseURI and verify the response code is 404 Not Found', () =>{
        try {
            apiPage.validateAPIResponse('http://localhost:3000/api/?date=7-January-2019');
            assert.equal(response.status,'404');
            allureReporter.addStep("status :"+response.status, 'attachment', 'passed');
        } catch (error) {
            allureReporter.addStep("status :"+response.status, 'attachment', 'failed');
            assert.fail('test validation failed');
        }
    });
    it('TC02 -Pass invalid characters in the request body and verify the response code is 400 Bad Request', () =>{
        try {
            apiPage.validateAPIResponse(apiURL+'7-January-2019/test');
            // assert.equal(response.status, '404');
            expect(response.status).to.be("404")
            allureReporter.addStep("status :"+response.status, 'attachment', 'passed');
        } catch (error) {
            allureReporter.addStep("status :"+response.status, 'attachment', 'failed');
            assert.fail('test validation failed');
        }
    });
    it('TC03 - Pass all the valid input in all the fields and send the request  then the response code should be 200 OK', () =>{
        try {
            apiPage.validateAPIResponse(apiURL+'7-January-2019');
            assert.equal(response.req.headers['user-agent'], "node-superagent/3.8.3");
            // assert.strictEqual(response.status, "200");
            expect(response.status).to.be("200");
            allureReporter.addStep("status :"+response.status, 'attachment', 'passed');
        } catch (error) {
            allureReporter.addStep("status :"+response.status, 'attachment', 'failed');
            assert.fail('test validation failed');
        }
    });
    it('TC04 - should validate response body', () =>{
        try {
            apiPage.getAPIResponseBody(apiURL+'7-July-2020');
            assert.containsAllKeys(response, ["date","open","high","low","close"] );
        } catch (error) {
            assert.fail('test validation failed');
        }
    })
    it('TC05 -should validate response headers', () =>{
        try {
            apiPage.getAPIResponseHeaders(apiURL+'7-January-2021');
            assert.containsAllKeys(response, ["x-powered-by", "content-type", "content-length", "etag", "date", "connection"])
            assert.equal(response['content-length'], '94'); 
            assert.equal(response['content-type'], "application/json; charset=utf-8");
            assert.equal(response['x-powered-by'], "Express");
            assert.equal(response.connection, "close");
        } catch (error) {
            assert.fail('test validation failed');
        }
    });
   
    it('TC06 -(boundary value scenario) >>Pass date as 29 feb in non leap year and try submitting the request, it should throw 400 Bad Request', () =>{
        try {
            apiPage.getAPIResponseBody(apiURL+'29-February-2011');
            assert.equal(response.date, '29-February-2011');
        } catch (error) {
            assert.fail('test validation failed');
        }
    });
    it('TC07 -(boundary value scenario) >>Pass date as 32 jan 2011 and try submitting the request, it should throw 400 Bad Request ', () =>{
        try {
            apiPage.getAPIResponseBody(apiURL+'32-January-2011');
            assert.equal(response.date, '32-January-2011');
        } catch (error) {
            assert.fail('test validation failed');
        }
    });
    it('TC08 -Provide String value in the date field and trigger the request, it should throw 400 Bad Request', () =>{
        try {
            apiPage.validateAPIResponse(apiURL+'test-January-roopesh');
            chai.expect(response.status).to.be("404")
            allureReporter.addStep("status :"+response.status, 'attachment', 'passed');
        } catch (error) {
            allureReporter.addStep("status :"+response.status, 'attachment', 'failed');
            assert.fail('test validation failed');
        }
    });
    
});