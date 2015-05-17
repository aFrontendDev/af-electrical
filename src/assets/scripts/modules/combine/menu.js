/**
 * @file Menu module
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Menu related methods.
        * @namespace menu
        */
		menu: {
			// jQuery DOM caching
			$handle : null,
			// CSS selectors
			menuInClass : 'sidenav-in',
			menuShowClass : 'sidenav-show',
			// Misc
			openTimeout : null,
			closeTimeout : null,
			transitionSpeed: 300,
			/**
			* Initialises menu module. Caches jQuery DOM objects.
			* @function init
			* @memberof menu
			*/
			init: function () {
				var self = this;
				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function (event) {
					event.preventDefault();
					if (bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
					}
				});
			},
			/**
			* Adds CSS class to <html>, showing menu.
			* @function openMenu
			* @memberof menu
			*/
			openMenu: function () {
				var self = this;
				bb.settings.$html.addClass(self.menuShowClass);
				self.openTimeout = setTimeout( function () {
					bb.settings.$html.addClass(self.menuInClass);
					clearTimeout(self.openTimeout);
				}, 30);
			},
			/**
			* Removes CSS class from <html>, hiding menu.
			* @function closeMenu
			* @memberof menu
			*/
			closeMenu: function () {
				var self = this;
				bb.settings.$html.removeClass(self.menuInClass);
				self.closeTimeout = setTimeout( function () {
					bb.settings.$html.removeClass(self.menuShowClass);
					clearTimeout(self.closeTimeout);
				}, self.transitionSpeed + 10);
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.menu.init();
	});
}(jQuery));
