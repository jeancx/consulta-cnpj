'use strict';

const crawlerUtil = require("./crawler_util");
const image2base64 = require("imageurl-base64");

//utils
const anticaptchaUtil = require('./anticaptcha_util');

exports.getReceitaJSON = function (cnpj, sonoro) {

    sonoro = true;

    var uri_recaptcha = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao2.asp';
    var uri_valida_recaptcha = 'https://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/valida_recaptcha.asp';
    var uri_sonoro = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao3.asp';
    var uri_valida_sonoro = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/valida.asp';
    var url_captcha_image = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/captcha/gerarCaptcha.asp';
    var url_cnpj = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/Cnpjreva_Comprovante.asp';

    if (sonoro) {
        crawlerUtil.getPage(uri_sonoro, function ($, headers) {
            image2base64(url_captcha_image, function (err, base64) {
                anticaptchaUtil.solveImage(base64.base64, function (solution) {

                    console.log(solution);

                    var params = {
                        cnpj: cnpj,
                        origem: 'comprovante',
                        submit1: 'Consultar',
                        search_type: 'cnpj',
                        captcha: solution,
                        captchaAudio: ''
                    };

                    crawlerUtil.postPageSonoro(uri_valida_sonoro, params, headers, function ($) {
                        console.log($);
                    })

                });
            });

        });
    } else {
        crawlerUtil.getPage(uri_valida_recaptcha, function ($) {

            var siteKey = $('.g-recaptcha').data('sitekey');
            anticaptchaUtil.solveReacptcha(siteKey, function (solution) {

                console.log(solution);

                var params = {
                    cnpj: cnpj,
                    origem: 'comprovante',
                    submit1: 'Consultar',
                    search_type: 'cnpj',
                    'g-recaptcha-response': solution
                };

                crawlerUtil.postPage(uri_valida, params, function ($) {
                    console.log($);
                })

            });

        });
    }


};
