const  poll = require('../routes/poll');
const question = require('../routes/question');
const express = require('express');
const error = require('../middleware/error')
module.exports = function(app){
    console.log('router enabled');
    app.use(express.json());
    app.use('/api/poll',poll);
    app.use('/api/question',question);
    app.use(error);
}