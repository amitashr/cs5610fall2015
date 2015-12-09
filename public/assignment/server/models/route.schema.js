'use strict';

module.exports = function(mongoose) {
    var routeSchema = new mongoose.Schema({
        source : String,
        dest : String,
        terrain : String,
        difficulty : String,
        markers : [{
            id :Number,
            lng : Number,
            lat : Number
        }],
        user : {
            id : mongoose.Schema.Types.ObjectId,
            username : String
        }


    }, {collection: 'cs5610.assignment.route'});

    return routeSchema;
}