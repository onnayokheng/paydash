'use strict';

const Confidence = require('confidence');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

//  Confidence document object for gulp tasks
 
internals.paths = {
    fonts: ['./assets/fonts/*'],
    styles: ['./assets/styles/**/*'],
    images: ['./assets/images/**/*'],
    misc: ['./assets/misc/*'],
    scripts: {
        main: ['./assets/scripts/**/*'],
        vendor: ['./assets/scripts/vendor/*.js'],
    },
    lint: [
        './assets/scripts/viz/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './controllers/**/*.js',
        './lib/**/*.js',
        './test/**/*.js',
    ]
};

internals.store = new Confidence.Store(internals.paths);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
