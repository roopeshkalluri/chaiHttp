let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert, expect } = require('chai');
const res = require('express/lib/response');
const fs = require('fs');
const allureReporter = require('@wdio/allure-reporter').default;
chai.use(chaiHttp);

class APIUtilities {
    async validateAPIResponse(endPoint, statuscode) {
        return await new Promise(async function (resolve, reject) {
            await chai.request(endPoint).get('/')
                .then((res) => {
                    console.log("status :"+res.status)
                    expect(res).to.have.status(statuscode);
                    allureReporter.addStep("status :"+res.status)
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
   
    async getAPIResponseBody(endPoint) {
        return await new Promise(async function (resolve, reject) {
            await chai.request(endPoint).get('/')
                .then((res) => {
                    console.log(JSON.stringify(res.body))
                    // console.log("body>>>"+res.body)
                     resolve(res)
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
    async getAPIResponseHeaders(endPoint) {
        return await new Promise(async function (resolve, reject) {
            await chai.request(endPoint).get('/')
                .then((res) => {
                    console.log(JSON.stringify(res))
                    console.log("headers>>"+res.header)
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
    
}
module.exports = new APIUtilities();