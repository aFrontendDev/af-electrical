/**
 * @file thumb overlay module
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * thumbOverlay related methods.
        * @namespace thumbOverlay
        */
		thumbOverlay: {
			// jQuery DOM caching
			$handle : null,
			$overlay : null,
			$fullImgContainer : null,
			$fullImgContainerClose : null,
			// CSS selectors
			handleSelector: '.action-gallery-thumb',
			// Classes
			thumbOverlayInClass: 'thumb-overlay-in',
			thumbOverlayShowClass: 'thumb-overlay-show',
			// Misc
			/**
			* Initialises thumbOverlay module. Caches jQuery DOM objects.
			* @function init
			* @memberof thumbOverlay
			*/
			init: function () {
				var self = this;
				self.$handle = $(self.handleSelector);

				if (self.$handle.length < 1) {
					return;
				}

				if (!self.$overlay) {
					self.$overlay = $('<div>', {
						'class': 'overlay'
					});
				}

				if (!self.$fullImgContainer) {
					self.$fullImgContainer = $('<div>', {
						'class': 'full-img-container'
					});
				}

				self.$fullImgContainerClose = $('<a>', {
					'href': '#',
					'class': 'action-full-img-close'
				});

				self.$fullImgContainerCloseIcon = $('<i>', {
					'class': 'icon icon-x'
				});

				self.$fullImgContainerInner = $('<div>', {
					'class': 'full-img-container-inner'
				});

				bb.settings.$body.append(self.$overlay);
				bb.settings.$body.append(self.$fullImgContainer);
				self.$fullImgContainer.append(self.$fullImgContainerClose);
				self.$fullImgContainerClose.append(self.$fullImgContainerCloseIcon);
				self.$fullImgContainer.append(self.$fullImgContainerInner);

				self.$handle.on('click.thumbOverlay', function (event) {
					event.preventDefault();
					var $this = $(this),
						dataFullImg = $this.data('gallery-full-img');

					if (!dataFullImg) {
						return;
					}

					if (bb.settings.$html.hasClass(self.thumbOverlayInClass)) {
						self.closeOverlay();
					} else {
						self.openOverlay(dataFullImg);
					}
				});

				$('.action-full-img-close').on('click.thumbOverlay', function (e) {
					e.preventDefault();
					self.closeOverlay();
				});
			},
			/**
			* Adds CSS class to <html>, showing thumbOverlay.
			* @function openOverlay
			* @memberof thumbOverlay
			*/
			openOverlay: function (dataFullImg) {
				var self = this;

				if (!dataFullImg) {
					return;
				}

				var $fullImg = $('<img>', {
					'src': dataFullImg
				});

				self.$fullImgContainerInner.html($fullImg);

				if (Modernizr.csstransitions) {
					bb.settings.$html.addClass(self.thumbOverlayShowClass);
					setTimeout( function () {
						bb.settings.$html.addClass(self.thumbOverlayInClass);
					}, 30);
				} else {
					bb.settings.$html.addClass(self.thumbOverlayShowClass).addClass(self.thumbOverlayInClass);
				}
			},
			/**
			* Removes CSS class from <html>, hiding thumbOverlay.
			* @function closeOverlay
			* @memberof thumbOverlay
			*/
			closeOverlay: function () {
				var self = this;

				if (Modernizr.csstransitions) {
					setTimeout( function () {
						bb.settings.$html.removeClass(self.thumbOverlayInClass);
					}, 100);
					setTimeout( function () {
						bb.settings.$html.removeClass(self.thumbOverlayShowClass);
					}, 330);
				} else {
					bb.settings.$html.removeClass(self.thumbOverlayInClass).removeClass(self.thumbOverlayShowClass);
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.thumbOverlay.init();
	});
}(jQuery));
