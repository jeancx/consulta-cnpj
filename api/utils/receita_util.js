'use strict';

const crawlerUtil = require("./crawler_util");

//utils
const anticaptchaUtil = require('./anticaptcha_util');

exports.getReceitaJSON = function (cnpj, sonoro) {

    var uri_recaptcha = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao2.asp';
    var uri_sonoro = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao3.asp';

    var uri_valida = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/valida_recaptcha.asp';

    var url_cnpj = 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/Cnpjreva_Comprovante.asp';

    crawlerUtil.getPage(uri_recaptcha, function ($) {

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

};
