const querystring = require('querystring');
const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');

const START_URL = "http://www.arstechnica.com";
const SEARCH_WORD = "stemming";
const MAX_PAGES_TO_VISIT = 10;

const numPagesVisited = 0;
const pagesToVisit = [];
const url = new URL(START_URL);
const baseUrl = url.protocol + "//" + url.hostname;

exports.getPage = function (url, callback) {
    const options = {
        url: url,
        method: 'GET'
    };
    console.log("Visiting page " + url);
    request.get(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        // Parse the document body
        const $ = cheerio.load(body);
        callback($);
    });
};

exports.postPage = function (url, params, callback) {

    var formData = querystring.stringify(params);
    var contentLength = formData.length;

    console.log("Visiting page " + url);

    var headers = {
        'Host': 'www.receita.fazenda.gov.br',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:32.0) Gecko/20100101 Firefox/32.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9, */* ;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Referer': 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/Cnpjreva_Solicitacao2.asp',
        'Connection': 'keep-alive'
    };

    request({
        headers: headers,
        uri: url,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {
        // Check status code (200 is HTTP OK)
        headers = res.headers;
        console.log("Headers: " + JSON.stringify(headers));
        console.log("Status code: " + res.statusCode);

        if (res.statusCode === 302) {
            console.log(res.statusCode);
            request({
                headers: headers,
                uri: 'https://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/Cnpjreva_Comprovante.asp',
                method: 'GET'
            }, function (e, r, body) {
                console.log("Headers: " + JSON.stringify(body));
                // Parse the document body
                const $ = cheerio.load(body);
                callback(body);
            });

        } else if (res.statusCode === 200) {
            // Parse the document body
            const $ = cheerio.load(body);
            callback(body);
        }



    });

};