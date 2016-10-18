
    var Sequelize = require('sequelize');
    var env = process.env.NODE_ENV || 'development';
    var sequelize;
    if(env === 'production'){
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres'
        });
    } else {
        sequelize = new Sequelize(undefined, undefined, undefined, {
            'dialect': 'sqlite',
            'storage': __dirname + '/data/dev-run-api.sqlite'
        }); //if the env variable isn't prod, we use sqlite and store data in the dev-run-api file'
    }
    var runDb = {};
    runDb.run = sequelize.import(__dirname + '/models/run.js'); //import the model from the run.js file
    runDb.sequelize = sequelize;
    runDb.Sequelize = Sequelize;
    module.exports = runDb;