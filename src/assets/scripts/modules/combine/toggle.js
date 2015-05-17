var bb = bb ? bb : {};
(function ($) {
	$.extend(bb,{
		toggle: {
			bb: bb,
			$toggles: null,
			toggleContentInnerSelector: '.toggle-content-inner',
			toggleActiveClass: 'toggle-in',
			toggleInactiveClass: 'toggle-inactive',
			toggleShowClass: 'toggle-show',
			processedClass: 'processed',
			transitionSpeed: 300,
			transitionSpeedOffset: 30,
			otherToggleTimeout: null,
			resized: false,
			init: function () {
				var self = this;
				self.$toggles = $('.toggle:not(.' + self.processedClass + ')');
				self.$toggles.addClass(self.processedClass);

				$('.toggle-proxy').on('click.toggle', function (event) {
					event.preventDefault();
					var $this = $(this),
						dataToggleTarget = $this.data('toggle-target'),
						$toggleTarget = null;

					if (dataToggleTarget) {
						$toggleTarget = $(dataToggleTarget);
					}

					if ($toggleTarget && $toggleTarget.length > 0) {
						var $toggle = $toggleTarget.closest('.toggle'),
							$content = $toggle.find('.toggle-content');
						self.toggleIn($toggle, $content);
					}
				});

				self.$toggles.on('click.toggle', '.toggle-handle', function (event) {
					event.preventDefault();
					var $handle = $(this),
						$toggle = $handle.closest('.toggle'),
						$content = $toggle.find('.toggle-content'),
						$toggleIn = $('.toggle.toggle-in'); // find other toggles

					if ($toggle.hasClass('toggle-in')) {
						self.toggleOut($toggle, $content);
					} else {
						self.toggleIn($toggle, $content);
					}

					// if there are other toggles open, close them
					// if ($toggleIn.length > 0) {
					// 	clearTimeout(self.otherToggleTimeout);
					// 	var $contentInnerIn = $toggleIn.find(self.toggleContentInnerSelector),
					// 		$contentIn = $toggleIn.find('.toggle-content');

					// 	if ($contentInnerIn.length > 0) {
					// 		self.otherToggleTimeout = setTimeout(function () {
					// 			$contentIn.height(0);
					// 			clearTimeout(self.otherToggleTimeout);
					// 		}, 0);
					// 	}
					// 	self.toggleOut($toggleIn);
					// }
				});
			},
			// set height used on resize for open toggles
			setHeight: function () {
				var self = this,
					$toggleIn = $('.' + self.toggleActiveClass);

				if ($toggleIn.length < 1) {
					return;
				}

				$toggleIn.each(function () {
					var $this = $(this),
						$content = $this.find('.toggle-content'),
						$toggleContentInner = $this.find(self.toggleContentInnerSelector);

					if ($content.length < 1) {
						return;
					}

					if ($toggleContentInner.length > 0) {
						var toggleContentHeight = $toggleContentInner.height();

						$content.attr('data-toggle-height', toggleContentHeight);
						self.resized = false;
						$content.height(toggleContentHeight);
					}
				});
			},
			toggleIn: function ($toggle, $content) {
				var self = this,
					$toggleContentInner = $content.find(self.toggleContentInnerSelector);

				$toggle.addClass(self.toggleActiveClass);
				$toggle.removeClass(self.toggleInactiveClass);

				if ($toggleContentInner.length > 0) {
					var toggleContentHeight = 0,
						dataToggleHeight = $content.attr('data-toggle-height');

					if (dataToggleHeight && !self.resized) {
						toggleContentHeight = dataToggleHeight;
					} else {
						toggleContentHeight = $toggleContentInner.height();
						$content.attr('data-toggle-height', toggleContentHeight);
						self.resized = false;
					}

					$content.height(toggleContentHeight);
				}

				if (Modernizr.csstransitions && !Modernizr.ie10) {
					var toggleShowTimeout = setTimeout( function () {
						$toggle.addClass(self.toggleShowClass);
						clearTimeout(toggleShowTimeout);
					}, self.transitionSpeed + self.transitionSpeedOffset);
				} else {
					$toggle.addClass(self.toggleShowClass);
				}
			},
			toggleOut: function ($toggle, $content) {
				var self = this;

				if ($content) {
					$content.height(0);
				}

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
	$.subscribe('viewportResizeEnd', function () {
		bb.toggle.resized = true;
		bb.toggle.setHeight();
	});
}(jQuery));
