"use strict";
var q = require("q");

module.exports = function(db, mongoose) {
	var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel = mongoose.model('FormModel', FormSchema);

	var api = {
		Create: Create,
		FindAllForms: FindAllForms,
		FindById: FindById,
		FindFormByTitle: FindFormByTitle,
		FindFormByUserId: FindFormByUserId,		
		Update: Update,
		Delete: Delete,
	};

	return api;

	function Create(userId, form) {
		var deferred = q.defer();
		console.log("called in model");
    	form.id = form._id = mongoose.Types.ObjectId();
    	form.userId = userId;
    	console.log(userId);
    	console.log(form);
    	FormModel.create(form, function(err, form) {
      		if (!err)
        		deferred.resolve(form);
      		else {
        		console.log("Error while Create : ", err);
        		deferred.reject(err);
      		}
    	});
    	return deferred.promise;
  	}


	function FindAllForms() { 
		var deferred = q.defer();
    	FormModel.find(function(err, forms) {
      		if (!err)
        		deferred.resolve(forms);
      		else
        		deferred.reject(err);
    	});
   		return deferred.promise;
  }
	

	function FindById(id) {
		var deferred = q.defer();
    	FormModel.findOne({id: formId}, function(err, form) {
      		if (!err)
        		deferred.resolve(form);
      		else
        		deferred.reject(err);
    	});
    	return deferred.promise;
    }

	function FindFormByTitle(title) {
		var deferred = q.defer();
    	FormModel.findOne({title : title}, function(err, forms) {
      		if (!err)
        		deferred.resolve(forms);
      		else
        		deferred.reject(err);
    	});
    	return deferred.promise;
	}

	function FindFormByUserId(userId) {
		var deferred = q.defer();
		console.log("finding forms model");
		console.log(userId);
    	FormModel.find({userId : userId}, function(err, forms) {
      		if (!err)
        		deferred.resolve(forms);
      		else
        		deferred.reject(err);
    	});
    	return deferred.promise;
	}


	function Update(id, newForm) {
		var deferred = q.defer();
    	FormModel.findOne({id : formId}, function(err, form) {
      		if (!err){
        		for(var prop in form) {
          			if (!(typeof newForm[prop] == 'undefined')){
            			form[prop] = newForm[prop];
          			}
        		}
        		form.save(function(err) {
          			if (err){
            			deferred.reject(err);
          			} else {
            			deferred.resolve(form);
          				}
        		});
      		}
      		else
        		deferred.reject(err);
    	});
    	return deferred.promise;
	}

	function Delete(id) {
		var deferred = q.defer();
    	findFormById(formId).then(function(form){
        	var userId = form.userId;
        	FormModel.remove({id: formId}, function(err){
          		if(err){
            		deferred.reject(err);
          		} else {
            			findAllFormsForUser(userId).then(function(forms){
                		deferred.resolve(forms);
              		});
          		}
        	});
      	});
    	return deferred.promise;
  
	}
};