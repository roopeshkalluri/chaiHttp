let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert, expect } = require('chai');
const res = require('express/lib/response');
const fs = require('fs');
const allureReporter = require('@wdio/allure-reporter').default;
chai.use(chaiHttp);

class APIUtilities {
    async validateAPIResponse(endPoint) {
        return await new Promise(async function (resolve, reject) {
            await chai.request(endPoint).get('/')
                .then((res) => {
                    fs.writeFileSync('response.json', JSON.stringify(res))
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
   
    async getAPIResponseBody(endPoint) {
        return await new Promise(async function (resolve, reject) {
            await chai.request(endPoint).get('')
                .then((res) => {
                    fs.writeFileSync('response.json', JSON.stringify(res.body))
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
                    fs.writeFileSync('response.json', JSON.stringify(res.header))
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
    
}
module.exports = new APIUtilities();