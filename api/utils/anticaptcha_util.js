'use strict';

require('dotenv').config({path: './.env'});
const api_key = process.env.ANTI_CAPTCHA_API_KEY; 				// set the port

var anticaptcha = require('../vendor/anticaptcha')(api_key);

exports.solveImage = function (image) {

    anticaptcha.getBalance(function (err, balance) {
        if (err) {
            console.error(err);
            return;
        }

        // captcha params can be set here
        anticaptcha.setMinLength(6);

        console.log(balance);

        if (balance > 0) {
            anticaptcha.createImageToTextTask({
                    case: true, // or params can be set for every captcha specially
                    body: image
                },
                function (err, taskId) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    console.log(taskId);

                    anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        console.log(taskSolution);
                        return taskSolution;
                    });
                }
            );
        }
    });

};


exports.solveReacptcha = function (sitekey, callback) {

    //recaptcha key from target website
    anticaptcha.setWebsiteURL("http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao2.asp");
    anticaptcha.setWebsiteKey(sitekey);

    //browser header parameters
    anticaptcha.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116");

    // check balance first
    anticaptcha.getBalance(function (err, balance) {
        if (err) {
            console.error(err);
            return;
        }

        if (balance > 0) {

            anticaptcha.createTaskProxyless(function (err, taskId) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(taskId);

                anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(taskSolution);
                    callback(taskSolution);
                });
            });
        }
    });

};