require('dotenv').config({path: './.env'});
const api_key = process.env.ANTI_CAPTCHA_API_KEY; 				// set the port

var anticaptcha = require('./anticaptcha')(api_key);

exports.solveImage = function (image) {

    anticaptcha.getBalance(function (err, balance) {
        if (err) {
            console.error(err);
            return;
        }

        // captcha params can be set here
        anticaptcha.setMinLength(6);
        console.time("AntiCaptcha");

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
                        console.timeEnd("AntiCaptcha");
                    });
                }
            );
        }
    });

};


exports.solveReacptcha = function () {

    //recaptcha key from target website
    anticaptcha.setWebsiteURL("http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao2.asp");
    anticaptcha.setWebsiteKey("6LcT2zQUAAAAABRp8qIQR2R0Y2LWYTafR0A8WFbr");

    //browser header parameters
    anticaptcha.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116");

    // check balance first
    anticaptcha.getBalance(function (err, balance) {
        if (err) {
            console.error(err);
            return;
        }

        if (balance > 0) {

            console.time("AntiCaptcha");

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
                    console.timeEnd("AntiCaptcha");
                });
            });
        }
    });

}