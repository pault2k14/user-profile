"use strict";

var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback) {

    if(!event.authToken) {
        console.log(JSON.stringify(event));
        callback('Could not find authToken');
        return;
    }

    if(!event.accessToken) {
        console.log(JSON.stringify(event));
        callback('Could not find access_token');
        return;
    }

    console.log(JSON.stringify(event));

    var id_token = event.authToken.split(' ')[1];
    var access_token = event.accessToken;

    var body = {
        'id_token': id_token,
        'access_token': access_token
    };

    var options = {
        url: 'https://' + process.env.DOMAIN + '/userinfo',
        method: 'GET',
        json: true,
        body: body
    };

    request(options, function(error, response, body) {
        console.log("Response0: " + JSON.stringify(response));

        if(!error && response.statusCode === 200) {
            console.log("Response1: " + JSON.stringify(response));
            callback(null, body);
        } else {
            callback(error);
        }
    });
};