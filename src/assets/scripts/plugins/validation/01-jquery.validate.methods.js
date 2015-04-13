(function($) {

	// 'checkDates' - check 'date a' against 'date b' to check b is after a
	$.validator.addMethod('checkdates', function(value, element, parameters) {
		var dateAId = '#' + parameters['startdateinput'];
		var $dateA = $(dateAId);
		var dateAVal = $dateA.val();
		var dateBVal = value;

		if (dateAVal < dateBVal) {
			return true;
		} else {
			return false;
		}
	});

	// 'required if' certain field has any value
	$.validator.addMethod('requiredif', function(value, element, parameters) {
		var id = "#" + parameters["dependentupon"],
			control = $(id),
			matchValue = parameters["val"];
		if (!control.length) {
			control = $('[name="' + parameters["dependentupon"] + '"]');
		}
		console.log(parameters["dependentupon"]  + ' ' + control.length);
		if (!control.length) {
			return false;
		}
		var controlType = control.eq(0).attr('type');
		var actualValue = false;
		if (control.is('select')) {
			actualValue = control.find(':selected').attr('value');
		} else if (controlType === 'checkbox' && control.length > 1) {
			actualValue = control.is(':checked').val();
		} else if (controlType === 'checkbox' && control.length === 1) {
			actualValue = control.is(':checked');
		} else if (controlType === 'radio') {
			actualValue = control.filter(':checked').val();
		} else {
			actualValue = control.val();
		}
		if ((matchValue && actualValue) && (matchValue === actualValue)) {
			console.log('value matches');
			actualValue = true;
		} else if (matchValue && actualValue) {
			console.log('value does not match');
			actualValue = false;
		}
		if (actualValue) {
			return $.validator.methods.required.call(this, value, element, parameters);
		}
		return true;
	});

	// 'required if not' certain field has any value
	$.validator.addMethod('requiredifnot', function(value, element, parameters) {
		var id = "#" + parameters["dependentupon"],
			control = $(id),
			matchValue = parameters["val"];
		if (!control.length) {
			control = $('[name="' + parameters["dependentupon"] + '"]');
		}
		if (!control.length) {
			return false;
		}
		var controlType = control.eq(0).attr('type');
		var actualValue = false;
		if (control.is('select')) {
			actualValue = control.find(':selected').attr('value');
		} else if (controlType === 'checkbox' && control.length > 1) {
			actualValue = control.is(':checked').val();
		} else if (controlType === 'checkbox' && control.length === 1) {
			actualValue = control.is(':checked');
		} else if (controlType === 'radio') {
			actualValue = control.filter(':checked').val();
		} else {
			actualValue = control.val();
		}
		if ((matchValue && actualValue) && (matchValue === actualValue)) {
			console.log('value matches');
			actualValue = true;
		} else if (matchValue && actualValue) {
			console.log('value does not match');
			actualValue = false;
		}
		if (!actualValue) {
			return $.validator.methods.required.call(this, value, element, parameters);
		}
		return true;
	});

	// 'required if btn' is submitted by specific button
	$.validator.addMethod('requiredifbtn', function(value, element, parameters) {
		var id = "#" + parameters["dependentupon"],
			$control = $(id);
		if (!$control.length) {
			return false;
		}
		var $form = $(element).closest('form');
		var $submitButton = $($form.data('validator').submitButton);
		var match = (parameters["dependentupon"] === $submitButton.attr('id'));
		if (match) {
			return $.validator.methods.required.call(this, value, element, parameters);
		}
		return true;
	});

	// 'at least' certain amount of items picked
	$.validator.addMethod('atleast', function(value, element, minimum) {
		var $element = $(element),
			$elements = null,
			elementsName = $element.attr('name');
		if (minimum) {
			minimum = parseInt(minimum,10); // -1 to 0 base int
		} else {
			minimum = 0;
		}
		if (elementsName) {
			$elements = $('[name="' + elementsName + '"]');
		} else {
			return false;
		}
		var atleastLength = 0;
		$elements.each(function() {
			$input = $(this);
			if ($input.is(':checkbox:not(:checked)') || $input.is(':radio:not(:checked)')) {
				return false;
			} else if ($input.val().length === 0) {
				return false;
			}
			atleastLength++;
		});
		if (atleastLength >= minimum) {
			return true;
		} else {
			return false;
		}
	});

	// $.validator.addMethod("allrequired", function(value, element, parameters) {
	// 	var self = this,
	// 		$element = $(element),
	// 		$elements = $(parameters["dependentupon"]),
	// 		inputsValid = 0;
	// 	$elements.each( function (index, item) {
	// 		//var valid = $(item).valid();
	// 		//var valid = false;
	// 		var $item = $(item);
	// 		//var isValid = $.validator.methods.required.call(item, $item.val(), item, parameters);
	// 		var isValid = $item.valid();
	// 		console.log($item.attr('id'));
	// 		console.log(isValid);
	// 		if (isValid) {
	// 			inputsValid++;
	// 		}
	// 	});
	// 	console.log(inputsValid + ' ' + $elements.length);
	// 	if (inputsValid === $elements.length) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }, "{0}");

	$.validator.addMethod("phone", function(value, element) {
		return this.optional(element) || /^[0-9 (+)]+$/.test(value);
	});

	$.validator.addMethod("multiemail", function(value, element) {
		if (this.optional(element)) {
			return true;
		}
		var emails = value.trim().replace(/\,$/, '').split(','),
			valid = true;
		for (var i = 0, limit = emails.length; i < limit; i++) {
			value = $.trim(emails[i]);
			valid = valid && $.validator.methods.email.call(this, value, element);
		}
		return valid;
	}, "Invalid email format: please use a comma to separate multiple email addresses.");

	$.validator.addMethod("time", function(value, element) {
		if (this.optional(element) && value.length < 1) {
			return true;
		}
		var valid = true,
			timeTest = /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(value);
		if (!timeTest) {
			valid = false;
		}
		return valid;
	}, "Please enter a valid time (hh:mm).");

	$.validator.addMethod("datetimerange", function(value, element) {
		var $element = $(element);
		var startDateInput = $element.siblings('.start-date');
		var startDate = startDateInput.val();
		if (startDate === '') return true;
		var startTimeInput = $element.siblings('.start-time');
		var startTime = startTimeInput.is(':hidden') ? '00:00' : startTimeInput.val();
		if (startTime === '') return true;
		var endDateInput = $element.siblings('.end-date');
		var endDate = endDateInput.val();
		if (endDate === '') return true;
		var endTimeInput = $element.siblings('.end-time');
		var endTime = endTimeInput.is(':hidden') ? '00:00' : endTimeInput.val();
		if (endTime === '') return true;
		var startDateTime = Date.parse(startDate + 'T' + startTime);
		var endDateTime = Date.parse(endDate + 'T' + endTime);
		return startDateTime <= endDateTime;
	}, "The end date/time must be after the start date/time.");

}(window.jQuery));
