(function($) {
	var $forms = $('form');
	// Default validator settings
	var settings = {
		// highlight and unhighlight elemnts with the sames 'name' attribute
		highlight: function(element, errorClass, validClass) {
			var $element = $(element),
				$allElements = $element.closest('form').find("[name='" + element.name + "']");
			$allElements.each( function () {
				var $this = $(this),
					isReplacedSelect = ($this.is('select') && $this.parent().hasClass('select-replace')) ? true : false,
					isReplacedDatePicker = ($this.is('input[type="date"]') && $this.parent().hasClass('date-replace')) ? true : false;
				if (isReplacedSelect) {
					$this.parent().addClass(errorClass + '-replace').removeClass(validClass + '-replace');
				}
				if (isReplacedDatePicker) {
					$this.parent().addClass(errorClass + '-replace').removeClass(validClass + '-replace');
				}
				$this.addClass(errorClass).removeClass(validClass);
			});
		},
		unhighlight: function(element, errorClass, validClass) {
			var $element = $(element),
				$allElements = $element.closest('form').find("[name='" + element.name + "']");
			$allElements.each( function () {
				var $this = $(this),
					isReplacedSelect = ($this.is('select') && $this.parent().hasClass('select-replace')) ? true : false,
					isReplacedDatePicker = ($this.is('input[type="date"]') && $this.parent().hasClass('date-replace')) ? true : false;
				if (isReplacedSelect) {
					$this.parent().removeClass(errorClass + '-replace').addClass(validClass + '-replace');
				}
				if (isReplacedDatePicker) {
					$this.parent().removeClass(errorClass + '-replace').addClass(validClass + '-replace');
				}
				$this.removeClass(errorClass).addClass(validClass);
			});
		},
		submitHandler: function(form) {
			// see placeholder.js
			bb.settings.validatorForm = form;
			if(typeof Placeholders === 'function'){
				Placeholders.disable();
			}

			if (settings.hasClass(form, 'ajax-form')) {
				console.log('ajax form - valid');
			} else {
				form.submit();
			}
		},
		invalidHandler: function(event, validator) {
			// see placeholder.js
			bb.settings.validatorForm = validator.currentForm;
			if(typeof Placeholders === 'function'){
				Placeholders.enable();
			}
			if(Modernizr.ios) {
				if (!validator.numberOfInvalids()) {
					return;
				}
		        $('html, body').animate({
		            scrollTop: $(validator.errorList[0].element).offset().top - 40
		        },500);
			}
		},
		hasClass: function(el, cls) {
			return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
		}
	};
	if ($.validator) {
		$.validator.setDefaults(settings);
	}
	$(document).ready( function () {
		// add new overrides to settings
		//$.extend($forms.data('validator').settings, settings);
		// jquery unobtrusive validation will not allow us override invalidHandler directly
		$forms.off('invalid-form.validate').on('invalid-form.validate', settings.invalidHandler);
		// re-parse the forms!
		//$forms.removeData('validator');
		//$forms.removeData('unobtrusiveValidation');
		//$.validator.unobtrusive.parse('form');
	});
}(jQuery));
