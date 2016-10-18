var express = require('express');
var bodyparser = require('body-parser');
var _ = require('underscore');
var runDb = require('./runDb.js');
var app = express();
//app.set('view engine', 'ejs');
app.use(bodyparser.json());
var port = process.env.PORT || 3000;

var runs = [];
var runId = 1;

//fields in POST request: location, distance, time
app.get('/', function(req,res){
    res.send("Track your workouts!");
});

app.get('/runs/:id', function(req, res){
    var thisRunId = parseInt(req.params.id); //req.params.id is a string - need to convert to integer
    var thisRun = _.findWhere(runs, {id: thisRunId}); //use the sequelize findWhere method to find cases that have the same ID
    res.send(thisRun);
});

app.get('/runs', function(req, res){
    var runQuery = req.query;
    var filteredRuns = runs; //filteredRuns starts as an empty array
    if(runQuery.hasOwnProperty('distance')){
        filteredRuns = _.filter(filteredRuns, function(run){
            return parseInt(run.distance) === parseInt(runQuery.distance);
        });
    } //if the runQuery has the distance property, use the .filter method to return runs that have the same distance value as the runQuery.distance value
    if(runQuery.hasOwnProperty('location')){
        filteredRuns = _.filter(filteredRuns, function(run){
            return run.location.toLowerCase().indexOf(runQuery.location) > -1;
        });
    } 
    res.json(filteredRuns); 
    //console.log(mi);
});

app.post('/runs', function(req, res){
    var body = _.pick(req.body, "date", "location", "distance", "time"); //remove any key-value pairs with properties not listed in _.pick function
    if(!body.date){
        body.date = new Date();
    } //if no date was provided, the system will generate a new Date
    if(!_.isString(body.location) || !_.isString(body.time) || parseInt(body.distance) <= 0){
        res.status(400).send();       
    } 
    body.id = runId++;
    runs.push(body);
    res.json(body);
    //res.render('workoutIndex.ejs', { runRecord: body});
});

app.put('/runs/:id', function(req, res){
    var thisRunId = parseInt(req.params.id, 10);
    var thisRun = _.findWhere(runs, {id: thisRunId});
    var body = _.pick(req.body, "date", "location", "distance", "time");
    _.extend(thisRun, body);
    res.send(thisRun);
});

app.delete('/runs/:id', function(req, res){
    var thisRunId = parseInt(req.params.id, 10);
    var thisRun = _.findWhere(runs, {id: thisRunId});
    if(!thisRun){
        res.status(404).send();
    }
    runs = _.without(runs, thisRun);
    res.json(runs);
});

app.listen(port);