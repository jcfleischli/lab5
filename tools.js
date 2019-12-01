const request = require('request');
const mysql = require('mysql');

module.exports = {

/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int    imageCount - number of random images
 * @return array of image URLs
 */
getRandomImages_cb: function (keyword, imageCount, callback) {
     var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=3b454270d3063be7e46c3bfdf6866d90d846316da315d45b8a30335def6873c9";
   request(requestURL, function (error, response, body) {
        if (!error) {
            var parsedData = JSON.parse(body);
            //console.log("img url:", parsedData["urls"]["regular"]);
            var imageURLs = [];
            for (let i = 0; i < imageCount; i++) {
                imageURLs.push(parsedData[i].urls.regular);
            }
            //console.log(imageURLs);
            //return imageURLs;
            callback(imageURLs);
        } else {
            console.log("error", error);
        }
        
    });//request
},//getRandomImages


/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int    imageCount - number of random images
 * @return array of image URLs
 */
getRandomImages_promise: function (keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=3b454270d3063be7e46c3bfdf6866d90d846316da315d45b8a30335def6873c9";
     
    return new Promise( function(resolve, reject) {
        request(requestURL, function (error, response, body) {
            if (!error) {
                var parsedData = JSON.parse(body);
                //console.log("img url:", parsedData["urls"]["regular"]);
                var imageURLs = [];
                for (let i = 0; i < imageCount; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                //console.log(imageURLs);
                //return imageURLs;
                resolve(imageURLs);
                
            } else {
                console.log("error", error);
            } 
        });//request
    });//promise
},//getRandomImages

/**
 * creates database connection
 * @return db connection
 **/

createConnection: function (){
    var conn = mysql.createConnection({
    host: "cst336db.space",
    user: "cst336_dbUser003",
    password: "qazuub",
    database: "cst336_db003"
    });
        return conn;
    }
}


