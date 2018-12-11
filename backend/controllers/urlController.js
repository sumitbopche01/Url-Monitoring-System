const urlServices = require('../models/urlServices');
const urlMonitor = require('../scripts/urlMonitor');
module.exports = {
    saveUrlInfo,
    listAllUrlsInfo,
    singleUrlInfo,
    updateUrlInfo,
    deleteUrlInfo
}

function saveUrlInfo(req, res, next){
    
    urlServices.saveUrl(req.body)
    .then((savedToMongo) => {
        let response = {
            status: true,
            _id: savedToMongo._id
        }
        urlMonitor();
        return res.status(200).send(response)
    })
    .catch(next)

}

function listAllUrlsInfo(req, res, next){

    urlServices.listAll()
    .then((listOfUrls) => {
        let response = {
            urls: listOfUrls
        }
        return res.status(200).send(response)
    })
    .catch(next)

}

function singleUrlInfo(req, res, next){
    let urlInfo;
    urlServices.singleUrl(req.params._id)
    .then((resp) => {
        urlInfo = resp;
        if(urlInfo.length == 0){
            let response = {
                status: false
            }
            return res.status(200).send(response)
        }
        let getList = [50, 75, 95, 99];
        return getPercentiles(getList,urlInfo.responses)
    })
    .then((percentilesList) => {
        let response = {
            success: true,
            "_id": urlInfo._id,
            "url": urlInfo.url,
            "method": urlInfo.method,
            "data": urlInfo.data,
            "headers": urlInfo.headers,
            "50th_percentile": percentilesList["50th_percentile"],
            "75th_percentile": percentilesList["75th_percentile"], 
            "95th_percentile": percentilesList["95th_percentile"], 
            "99th_percentile": percentilesList["99th_percentile"],
            "responses": urlInfo.responses
        }

        return res.status(200).send(response)
    })
    .catch(next) 
}

function updateUrlInfo(req, res, next){

    let updateData = {
        url:req.body.url,
        method: req.body.method,
        data: JSON.parse(req.body.data),
        headers: JSON.parse(req.body.headers)
    }

    updateData.responses = [];
    urlServices.updateUrl(req.params._id, updateData)
    .then((updated) => {

        let response = {
            status: true,
            _id: req.params._id
        }
        urlMonitor();
        return res.status(200).send(response);
    })
    .catch(next);

}

function deleteUrlInfo(req, res, next){

    urlServices.deleteUrl(req.params._id)
    .then((deletedUrl) => {
        
        let response = {
            status: true
        }
        urlMonitor();
        return res.status(200).send(response);
    })
    .catch(next);

}

/**
 * Function to calculate the percentiles
 * @param {Array} getList 
 * @param {Array} responses 
 */
function getPercentiles(getList, responses){
    return new Promise((resolve, reject) => {

        let sortedResponses = responses.sort();
        let respObj = {};
        getList.forEach(element => {
            let P = element;
            let R = P/100 * (sortedResponses.length);
            R = Math.ceil(R);
            respObj[element+"th_percentile"] = sortedResponses[R-1];
        });

        return resolve(respObj);
    })
    .catch((error) => {
        return reject("Error while calculating percentile -- ", error);
    })
}
