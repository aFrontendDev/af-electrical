// Additional methods in jquery.validate.methods.js
(function($) {

	$.validator.unobtrusive.adapters.addBool('mandatory', 'required');

	$.validator.unobtrusive.adapters.add('checkdates', ['startdateinput'], function (options) {
		options.rules['checkdates'] = {
			startdateinput: options.params['startdateinput']
		};
		options.messages['checkdates'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('requiredif', ['dependentupon','val'], function (options) {
		options.rules['requiredif'] = {
			dependentupon: options.params['dependentupon'],
			val: options.params['val']
		};
		options.messages['requiredif'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('requiredifnot', ['dependentupon','val'], function (options) {
		options.rules['requiredifnot'] = {
			dependentupon: options.params['dependentupon'],
			val: options.params['val']
		};
		options.messages['requiredifnot'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('requiredifbtn', ['dependentupon'], function (options) {
		options.rules['requiredifbtn'] = {
			dependentupon: options.params['dependentupon']
		};
		options.messages['requiredifbtn'] = options.message;
	});

	// $.validator.unobtrusive.adapters.add('allrequired', ['dependentupon'], function (options) {
	// 	options.rules['allrequired'] = {
	// 		dependentupon: options.params['dependentupon']
	// 	};
	// 	options.messages['allrequired'] = options.message;
	// });

	$.validator.unobtrusive.adapters.add('atleast', ['minimum'], function (options) {
		options.rules['atleast'] = options.params['minimum'];
		options.messages['atleast'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('multiemail', function (options) {
		options.rules['multiemail'] = {};
		options.messages['multiemail'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('datetimerange', function (options) {
		options.rules['datetimerange'] = {};
		options.messages['datetimerange'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('time', function (options) {
		options.rules['time'] = {};
		options.messages['time'] = options.message;
	});

}(window.jQuery));
