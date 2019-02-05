'use strict';

var Validator = require('validator');
var isEmpty = require('./is-empty');

module.exports = function validateThemeInput(data) {
	var errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 to 30 chars';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	};
};
//# sourceMappingURL=theme.js.map