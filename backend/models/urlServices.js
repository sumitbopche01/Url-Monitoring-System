const Url = require("./url");

module.exports = {
    saveUrl,
    listAll,
    singleUrl,
    updateUrl,
    deleteUrl,
    addToResponse
}
/**
 * @description Function to save url information
 * @param {Object} dataToSave
 * @param {String} url
 * @param {String} method
 * @param {String} data
 * @param {String} headers
 */
function saveUrl(dataToSave){
    return new Promise((resolve, reject) => {
        Url.create(dataToSave)
        .then((response) => resolve(response))
        .catch((error) => reject("Error in saving the document -- ", error));
    });
}

/**
 * @description Function to list all the urls currently being monitored
 * 
 */
function listAll() {
    return new Promise((resolve, reject) => {
        Url.find({},{responses: 0, _v: 0})
        .then((list) => resolve(list))
        .catch((error) => reject("Error in finding all the documents -- ", error));
    });
}

/**
 * 
 * @description Function to get information about given url 
 * @param {String} _id
 */
function singleUrl(_id){
    return new Promise((resolve, reject) => {
        Url.findById({_id: _id}, {responses: { $slice: -100}})
        .then((response) => resolve(response))
        .catch((error) => reject("Error in finding single the document -- ", error));
    });
}

/**
 * @description Function to update the document on given id
 * @param {String} _id
 * @param {Object} updateData 
 */
function updateUrl(_id,updateData){
    return new Promise((resolve, reject) => {
        Url.findOneAndUpdate({_id: _id}, updateData)
        .then((response) => resolve(response))
        .catch((error) => reject("Error in updating the document -- ",error))
    });
}

/**
 * Function to delete a particular url and stop monitoring it.
 * @param _id 
 */
function deleteUrl(_id){
    return new Promise((resolve, reject) => {
        Url.findByIdAndDelete({_id: _id})
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}

/**
 * 
 * @param {Number} responseTime 
 * @param {String} _id 
 */
function addToResponse(responseTime, _id){
    return new Promise((resolve, reject) => {
        Url.findOneAndUpdate({_id:_id},{$push: {responses: responseTime}})
        .then((added) => resolve(added))
        .catch((error)=> reject(error));
    });
}
