function iosVersion (version) {
	if (!version) {
		return;
	}
	var userOs = null;
	var userOsVersion = null;
	var ua = navigator.userAgent;
	var uaindex;
	// determine OS
	if ( ua.match(/iPad/i) || ua.match(/iPhone/i) ) {
		userOs = 'iOS';
		uaindex = ua.indexOf( 'OS ' );
		userOsVersion = parseInt(ua.substr( uaindex + 3, 3 ).toString().slice(0,1),10);
	}
	return userOsVersion;
}
function androidVersion(version) {
	var ua = navigator.userAgent;
	if (ua.indexOf('Android') >= 0 ) {
		var androidversion = parseFloat(ua.slice(ua.indexOf('Android') + 8 ));
		if (androidversion === version) {
			return true;
		} else {
			return false;
		}
	}
}

if (Modernizr) {
	// Apple devices
	Modernizr.addTest('ipad', function () {
		return !!navigator.userAgent.match(/iPad/i);
	});
	Modernizr.addTest('iphone', function () {
		return !!navigator.userAgent.match(/iPhone/i);
	});
	Modernizr.addTest('ipod', function () {
		return !!navigator.userAgent.match(/iPod/i);
	});
	// IOS
	Modernizr.addTest('ios', function () {
		return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
	});
	Modernizr.addTest('ios6', function () {
		return iosVersion(6) ? true : false;
	});
	// IOS7
	Modernizr.addTest('ios7', function () {
		return iosVersion(7) ? true : false;
	});
	// Windows Phone
	Modernizr.addTest('windowsphone', function () {
		return !!navigator.userAgent.match(/(Windows Phone)/);
	});
	// Android OS
	Modernizr.addTest('android', function () {
		return !!navigator.userAgent.match(/(Android)/);
	});
	// Android OS 4.2
	Modernizr.addTest('android_4_2', function () {
		return androidVersion(4.2) ? true : false;
	});
	// Mac OS
	Modernizr.addTest('macos', function () {
		return !!navigator.userAgent.match(/(Mac OS)/);
	});
	// Mac OS
	Modernizr.addTest('macos', function () {
		return !!navigator.userAgent.match(/(Mac OS)/);
	});
	Modernizr.addTest('mobile', function () {
		return !!navigator.userAgent.match(/Android|BlackBerry|iPhone|Opera Mini|IEMobile/i);
	});
	// IE10
	Modernizr.addTest('ie10', function () {
		return !!navigator.userAgent.match(/MSIE 10/);
	});
	Modernizr.addTest('videoautoplay', function () {
		// [TODO: need better test for this, we want to test for video autoplay not just OS']
		return (!Modernizr.ios && !Modernizr.android && !Modernizr.windowsphone);
	});
	// IE11
	Modernizr.addTest('ie11', function () {
		var trident = !!navigator.userAgent.match(/Trident\/7.0/);
		var net = !!navigator.userAgent.match(/.NET4.0E/);
		return trident && net;
	});
}
