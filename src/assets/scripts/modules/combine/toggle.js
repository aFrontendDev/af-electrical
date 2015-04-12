var bb = bb ? bb : {};
(function ($) {
	$.extend(bb,{
		toggle: {
			bb: bb,
			$toggles: null,
			toggleActiveClass: 'toggle-in',
			toggleInactiveClass: 'toggle-inactive',
			toggleShowClass: 'toggle-show',
			processedClass: 'processed',
			transitionSpeed: 300,
			transitionSpeedOffset: 30,
			init: function () {
				var self = this;
				self.$toggles = $('.toggle:not(.' + self.processedClass + ')');
				self.$toggles.addClass(self.processedClass);

				self.$toggles.on('click.toggle', '.toggle-handle', function (event) {
					event.preventDefault();
					var $handle = $(this),
						$toggle = $handle.closest('.toggle'),
						$content = $toggle.find('.toggle-content'),
						$toggleIn = $('.toggle.toggle-in'); // find other toggles

					if ($toggle.hasClass('toggle-in')) {
						self.toggleOut($toggle);
					} else {
						self.toggleIn($toggle);
					}

					// if there are other toggles open, close them
					if ($toggleIn.length > 0) {
						self.toggleOut($toggleIn);
					}
				});
			},
			toggleIn: function ($toggle) {
				var self = this;
				$toggle.addClass(self.toggleActiveClass);
				$toggle.removeClass(self.toggleInactiveClass);
				if (Modernizr.csstransitions && !Modernizr.ie10) {
					var toggleShowTimeout = setTimeout( function () {
						$toggle.addClass(self.toggleShowClass);
						clearTimeout(toggleShowTimeout);
					}, self.transitionSpeed + self.transitionSpeedOffset);
				} else {
					$toggle.addClass(self.toggleShowClass);
				}
			},
			toggleOut: function ($toggle) {
				var self = this;
				$toggle.removeClass(self.toggleActiveClass);
				$toggle.addClass(self.toggleInactiveClass);
				if (Modernizr.csstransitions && !Modernizr.ie10) {
					var toggleShowTimeout = setTimeout( function () {
						$toggle.removeClass(self.toggleShowClass);
						clearTimeout(toggleShowTimeout);
					}, self.transitionSpeed + self.transitionSpeedOffset);
				} else {
					$toggle.removeClass(self.toggleShowClass);
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.toggle.init();
	});
}(jQuery));
