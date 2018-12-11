const urlServices = require('../models/urlServices');
const request = require('request');

let listOfUrls = [];

function urlMonitor(){
    urlServices.listAll()
    .then((list) => {
        listOfUrls = list;
    })
    .catch((error) => {
        console.log("Error in urlMonitor -- ", error);
    })
}

function monitor(){
    listOfUrls.forEach(element => {
        let urlFormated;
        if(element.url.substring(0,4) == "http"){
            urlFormated = element.url;
        }
        else{
            urlFormated = "http://"+ element.url;
        }
        
        let options = {
            method: element.method,
            url: urlFormated,
            headers:element.headers,
            time: true
        }

        if(element.method.toLowerCase() == "get"){
            options.params = element.data;
        }
        else{
            options.body = element.data
        }

        request(options, function (error, response, body) {
            let responseTime = response.elapsedTime;
            urlServices.addToResponse(responseTime, element._id)
            .then((response) => {
                console.log("Done");
            })
            .catch((error) => {
                console.log("error --- ", error);
            })
        });
    });
}

/**
 * @description This could be improved using the Timer
 */
setInterval(monitor, 1000);

urlMonitor();
module.exports = urlMonitor;
