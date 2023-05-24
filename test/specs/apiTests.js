const apiPage = require('./../pageObjects/apiUtilities');

const apiURL = "http://localhost:3000/api/stocks?date=";


describe('test stocks API', () =>{
    it('Send the request with incorrect baseURI and verify the response code is 404 Not Found', () =>{
        apiPage.validateAPIResponse('http://localhost:3000/api/?date=7-January-2019', '404');
    });
    it('Pass invalid characters in the request body and verify the response code is 400 Bad Request', () =>{
        apiPage.validateAPIResponse(apiURL+'7-January-2019/test', '400');
    });
    it('Pass all the valid input in all the fields and send the request  then the response code should be 200 OK', () =>{
        apiPage.validateAPIResponse(apiURL+'7-January-2019', "200");
    });
    it('should validate response body', () =>{
        apiPage.getAPIResponseBody(apiURL+'7-July-2020');
    })
    it('should validate response headers', () =>{
        apiPage.getAPIResponseHeaders(apiURL+'7-January-2021');
    });
    it('the request behavior does not work as intended (theres a bug)', () =>{
        apiPage.validateAPIResponse('https://localhost:3000/api/stocks?date=5-January-2000');
    });
    it('Pass date as 29 feb in non leap year and try submitting the request, it should throw 400 Bad Request', () =>{
        apiPage.validateAPIResponse(apiURL+'29-February-2011', '400');  
    });
    it('Pass date as 32 jan 2000 and try submitting the request, it should throw 400 Bad Request ', () =>{
        apiPage.validateAPIResponse(apiURL+'32-January-2011', '400');
    });
    it('Provide String value in the date field and trigger the request, it should throw 400 Bad Request', () =>{
        apiPage.validateAPIResponse(apiURL+'test-January-test', '400');
    });
});