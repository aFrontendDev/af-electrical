/**
 * @file Ajax Form
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Ajax Form related methods.
        * @namespace menu
        */
		ajaxForm: {
			// jQuery DOM caching
			$ajaxFormContainer : null,
			// CSS selectors
			ajaxFormContainerSelector : '.ajax-form',
			// Misc
			ajaxWait : null,
			formSuccessWait : null,
			/**
			* Initialises ajax form module. Caches jQuery DOM objects.
			* @function init
			* @memberof ajaxForm
			*/
			init: function () {
				var self = this;
				self.$ajaxFormContainer = $(self.ajaxFormContainerSelector);

				if (self.$ajaxFormContainer.length < 1) {
					return;
				}

				bb.settings.$body.on('click.ajaxForm', '.ajax-form-submit-btn', function (event) {
					event.preventDefault();
					var $this = $(this),
						$ajaxForm = $this.closest(self.ajaxFormContainerSelector);

					if ($ajaxForm.length < 1) {
						return;
					}

					var $form = $ajaxForm.find('form');

					if ($form.length < 1) {
						return;
					}

					if ($form.valid()) {
						self.submitForm($form, $ajaxForm);
					} else {
						console.log('invalid form');
					}
				});
			},
			/**
			* Submits form via ajax
			* @function submitForm
			* @memberof ajaxForm
			*/
			submitForm: function ($form, $ajaxForm) {
				var self = this;

				if (!$form && !$ajaxForm) {
					return;
				}

				var endpoint = $form.data('endpoint'),
					formData = $form.serialize();

				console.log(formData);

				if (self.ajaxWait) {
					clearTimeout(self.ajaxWait);
				}
				//bb.loader.showLoader();
				if (endpoint) {
					self.ajaxWait = setTimeout( function () {
						$.ajax({
							type: 'POST',
							url: endpoint,
							data: formData,
							dataType: 'html',
							cache: false,
							timeout: 10000,
							success: function (html) {
								$.publish('ajaxLoaded');
								var $formSuccess = $ajaxForm.find('.ajax-form-success');
								if ($formSuccess.length > 0) {
									$formSuccess.addClass('ajax-form-response-show');

									clearTimeout(self.formSuccessWait);
									self.formSuccessWait = setTimeout(function () {
										$formSuccess.addClass('ajax-form-response-in');
										clearTimeout(self.formSuccessWait);
									}, 100);
								}
							},
							error: function (xhr, textStatus) {
								var $formError = $ajaxForm.find('.ajax-form-error');
								if ($formError.length > 0) {
									$formError.addClass('ajax-form-response-in');
								}
							},
							complete: function () {
								//bb.loader.hideLoader();
								clearTimeout(self.ajaxWait);
							}
						});
					}, 300);
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.ajaxForm.init();
	});
}(jQuery));
