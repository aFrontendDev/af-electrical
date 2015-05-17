var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Scroll to target related methods.
        * @namespace scrollToTarget
        */
		scrollToTarget: {
			$scrollToTargetBtn: null,
			scrollToTargetBtnSelector: '.scroll-to-target-btn',
			init: function () {
				var self = this;

				self.$scrollToTargetBtn = $(self.scrollToTargetBtnSelector);

				if (self.$scrollToTargetBtn.length < 1) {
					return;
				}

				self.$scrollToTargetBtn.on('click.scrollToTarget', function (e) {
					e.preventDefault();
					var $this = $(this),
						dataScrollToTarget = $this.attr('data-scroll-to-target-element'),
						$scrollToTarget = $(dataScrollToTarget);

					if ($scrollToTarget.length > 0) {
						self.scrollToTarget($scrollToTarget);
					}
				});
			},
			scrollToTarget: function ($element) {
				var self = this;

				if (!$element) {
					return;
				}

				var elementPosition = $element.offset().top;

				bb.settings.$htmlbody.animate({
					scrollTop: elementPosition
				}, 500);
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.scrollToTarget.init();
	});
}(jQuery));
