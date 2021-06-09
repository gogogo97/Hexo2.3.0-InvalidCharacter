


function buildConfig(env) {

    return require('./webpack/'+env+'.babel.js').default(env);
}

module.exports = buildConfig;