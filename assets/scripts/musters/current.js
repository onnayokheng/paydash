'use strict';

var $ = require('jquery');
var dynatable = require('../vendors/dynatable');
var Cookie = require('../lib/cookie');

exports.init = function() {
    $.ajax({
        url: '/musters/current/data?active_region=' + Cookie.read('active_region'),
        success: function(data) {
            $('#loading_message').hide();

            $('#my-final-table').dynatable({
                dataset: {
                    records: data
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true,
                    search: false,
                }
            });
        }
    });
};
