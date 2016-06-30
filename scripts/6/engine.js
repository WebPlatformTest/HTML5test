
Test6 = (function() {

	var NO = 0,
		YES = 1,
		OLD = 2,
		BUGGY = 4,
		PREFIX = 8,
		BLOCKED = 16;

	var release = 6;

	var blacklists = {};



	function results (parent) { this.initialize(parent); }
	results.prototype = {
		initialize: function(parent) {
			this.parent = parent;
			this.items = [];
			this.points = 0;
			this.max = 0;

			this.backgroundTasks = 0;

			this.update();
		},

		startBackground: function(id) {
			this.parent.startBackground(id);
		},

		stopBackground: function(id) {
			this.parent.stopBackground(id);
		},

		getSection: function(data) {
			var i = new section(this, data);
			this.items.push(i);
			return i;
		},

		update: function() {
			var points = 0;
			var max = 0;

			for (var i = 0; i < this.items.length; i++) {
				points += this.items[i].getPoints();
				max += this.items[i].getMaximum();
			}

			this.points = points;
			this.max = max;
		},

		retrieve: function() {
			var data = {
				points:		this.points,
				items:		{}
			};

			for (var i = 0; i < this.items.length; i++) {
				data.items[this.items[i].data.id] = this.items[i].retrieve();
			}

			return data;
		}
	};

	function section (parent, data) { this.initialize(parent, data); }
	section.prototype = {
		initialize: function(parent, data) {
			this.items = [];
			this.points = 0;
			this.max = 0;

			this.parent = parent;
			this.data = data;
			this.path = data.id;
		},

		startBackground: function(id) {
			this.parent.startBackground(id);
		},

		stopBackground: function(id) {
			this.parent.stopBackground(id);
		},

		setItem: function(result) {
			var i = new item(this, result);
			this.items.push(i);

			this.update();

			return i;
		},

		getGroup: function(data) {
			var i = new group(this, data);
			this.items.push(i);
			return i;
		},

		update: function() {
			var points = 0;
			var max = 0;

			for (var i = 0; i < this.items.length; i++) {
				points += this.items[i].getPoints();
				max += this.items[i].getMaximum();
			}

			this.points = points;
			this.max = max;

			this.parent.update();
		},

		getPoints: function() {
			return this.points;
		},

		getMaximum: function() {
			return this.max;
		},

		retrieve: function() {
			var data = {
				points:		this.points,
				items: 		{}
			};

			for (var i = 0; i < this.items.length; i++) {
				data.items[this.items[i].data.id] = this.items[i].retrieve();
			}

			return data;
		}
	};

	function group (parent, data) { this.initialize(parent, data); }
	group.prototype = {
		initialize: function(parent, data) {
			this.items = [];
			this.points = 0;
			this.max = 0;

			this.data = data;
			this.parent = parent;
			this.path = parent.path + '.' + data.id;
		},

		update: function() {
			var points = 0;
			var max = 0;
			var count = 0;

			var hasRequired = false;

			var passedAll = true;
			var passedAllRequiredFields = true;
			var passedPartially = false;

			for (var i = 0; i < this.items.length; i++) {
				points += this.items[i].getPoints();
				max += this.items[i].getMaximum();
				count += this.items[i].getPassed() > 0 ? 1 : 0;

				if (this.items[i].getRequired()) {
					hasRequired = true;
					passedAllRequiredFields &= this.items[i].getPassed() > 0;
				}

				passedAll &= this.items[i].getPassed() > 0;
				passedPartially |= this.items[i].getPartiallyPassed();
			}

			if (!passedAllRequiredFields) {
				points = 0;
			}

			if (this.data.value && this.items.length) {
				if (hasRequired ? passedAllRequiredFields : passedAll) {
					points += this.data.value;
				}

				max += this.data.value;
			}


			this.points = points;
			this.max = max;

			this.parent.update();
		},

		startBackground: function(id) {
			this.parent.startBackground(id);
		},

		stopBackground: function(id) {
			this.parent.stopBackground(id);
		},

		setItem: function(result) {
			var i = new item(this, result);
			this.items.push(i);

			this.update();

			return i;
		},

		getPoints: function() {
			return this.points;
		},

		getMaximum: function() {
			return this.max;
		},

		retrieve: function() {
			var data = {
				points:		this.points,
				items: 		{}
			};

			for (var i = 0; i < this.items.length; i++) {
				data.items[this.items[i].data.id] = this.items[i].retrieve();
			}

			return data;
		}
	};

	function item (parent, data) { this.initialize(parent, data); }
	item.prototype = {
		initialize: function(parent, data) {
			this.parent = parent;

			this.path = parent.path + '.' + data.id;

			this.data = data;
			if (typeof this.data.value == 'undefined') this.data.value = 0;
			if (typeof this.data.award == 'undefined') this.data.award = this.data.value;
			if (typeof this.data.passed == 'undefined') this.data.padded = false;

			if (this.data.passed && this.isOnBlacklist()) this.data.passed = BLOCKED;
		},

		update: function(data) {
			for (var key in data) {
				this.data[key] = data[key];
			}

			if (typeof this.data.value == 'undefined') this.data.value = 0;
			if (typeof this.data.award == 'undefined') this.data.award = this.data.value;
			if (typeof this.data.passed == 'undefined') this.data.passed = false;

			if (this.data.passed && this.isOnBlacklist()) this.data.passed = BLOCKED;

			this.parent.update();
		},

		isOnBlacklist: function() {
			var part = '';
			var parts = this.path.split('.');
			for (var i = 0; i < parts.length; i++) {
				part += (i == 0 ? '' : '.') + parts[i];

				if (typeof blacklists[part] != 'undefined') {
					if (blacklists[part]) {
						return true;
					}
				}
			}

			return false;
		},

		startBackground: function() {
			this.parent.startBackground(this.data.id);
		},

		stopBackground: function() {
			this.parent.stopBackground(this.data.id);
		},

		getPoints: function() {
			return this.data.passed & YES ? this.data.award : 0;
		},

		getMaximum: function() {
			return this.data.value;
		},

		getPassed: function() {
			return this.data.passed;
		},

		getPartiallyPassed: function() {
			if (this.data.custom && this.data.custom == 'partial') {
				return true;
			}

			return this.getPassed();
		},

		getRequired: function() {
			return !!this.data.required;
		},

		retrieve: function() {
			var data = {
				points:	this.getPoints()
			};

			return data;
		}
	};


	var isEventSupported = (function(){

		var TAGNAMES = {
			'select':'input','change':'input','input':'input',
			'submit':'form','reset':'form','forminput':'form','formchange':'form',
			'error':'img','load':'img','abort':'img'
		}

		function isEventSupported(eventName, element) {
			element = element || document.createElement(TAGNAMES[eventName] || 'div');
			eventName = 'on' + eventName;

			var isSupported = (eventName in element);

			if (!isSupported) {
				if (!element.setAttribute) {
					element = document.createElement('div');
				}
				if (element.setAttribute && element.removeAttribute) {
					element.setAttribute(eventName, '');
					isSupported = typeof element[eventName] == 'function';

					if (typeof element[eventName] != 'undefined') {
						element[eventName] = void 0;
					}
					element.removeAttribute(eventName);
				}
			}

			element = null;
			return isSupported;
		}

		return isEventSupported;
	})();

	var getRenderedStyle = (function(){

		function getRenderedStyle(elem, name) {
		    if (document.defaultView && document.defaultView.getComputedStyle) {
		        s = document.defaultView.getComputedStyle(elem, "");
		        r = [];

		        if (s.length) {
			        for (var i = 0; i < s.length; i++) {
			        	try {
				        	v = s.getPropertyValue(s[i]);
				        	if (v != '') {
				        		r.push(s[i] + ': ' + v);
				        	}
			        	} catch(e) {
			        	};
			        }
		        } else {
			        for (var i in s) {
			        	try {
				        	v = s.getPropertyValue(i);
				        	if (v != '') {
				        		r.push(i + ': ' + v);
				        	}
			        	} catch(e) {
			        	};
			        }
		        }

		        return r.join('; ') + ';';
		    } else {
		        return null;
		    }
		}

		return getRenderedStyle;
	})();

	function testParsing (results) { this.initialize(results); }
	testParsing.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'parsing'
			});

			this.section.setItem({
				id:		'doctype',
				passed:	document.compatMode == 'CSS1Compat',
				value: 	0
			});

			var result = true;
			var e = document.createElement('div');

			try {
				e.innerHTML = "<div<div>";
				result &= e.firstChild && e.firstChild.nodeName == "DIV<DIV";

				e.innerHTML = "<div foo<bar=''>";
				result &= e.firstChild.attributes[0].nodeName == "foo<bar" || e.firstChild.attributes[0].name == "foo<bar";

				e.innerHTML = "<div foo=`bar`>";
				result &= e.firstChild.getAttribute("foo") == "`bar`";

				e.innerHTML = "<div \"foo=''>";
				result &= e.firstChild && (e.firstChild.attributes[0].nodeName == "\"foo" || e.firstChild.attributes[0].name == "\"foo");

				e.innerHTML = "<a href='\nbar'></a>";
				result &= e.firstChild && e.firstChild.getAttribute("href") == "\nbar";

				e.innerHTML = "<!DOCTYPE html>";
				result &= e.firstChild == null;

				e.innerHTML = "\u000D";
				result &= e.firstChild && e.firstChild.nodeValue == "\u000A";

				e.innerHTML = "&lang;&rang;";
				result &= e.firstChild.nodeValue == "\u27E8\u27E9";

				e.innerHTML = "&apos;";
				result &= e.firstChild.nodeValue == "'";

				e.innerHTML = "&ImaginaryI;";
				result &= e.firstChild.nodeValue == "\u2148";

				e.innerHTML = "&Kopf;";
				result &= e.firstChild.nodeValue == "\uD835\uDD42";

				e.innerHTML = "&notinva;";
				result &= e.firstChild.nodeValue == "\u2209";

				e.innerHTML = '<?import namespace="foo" implementation="#bar">';
				result &= e.firstChild && e.firstChild.nodeType == 8 && e.firstChild.nodeValue == '?import namespace="foo" implementation="#bar"';

				e.innerHTML = '<!--foo--bar-->';
				result &= e.firstChild && e.firstChild.nodeType == 8 && e.firstChild.nodeValue == 'foo--bar';

				e.innerHTML = '<![CDATA[x]]>';
				result &= e.firstChild && e.firstChild.nodeType == 8 && e.firstChild.nodeValue == '[CDATA[x]]';

				e.innerHTML = "<textarea><!--</textarea>--></textarea>";
				result &= e.firstChild && e.firstChild.firstChild && e.firstChild.firstChild.nodeValue == "<!--";

				e.innerHTML = "<textarea><!--</textarea>-->";
				result &= e.firstChild && e.firstChild.firstChild && e.firstChild.firstChild.nodeValue == "<!--";

				e.innerHTML = "<style><!--</style>--></style>";
				result &= e.firstChild && e.firstChild.firstChild && e.firstChild.firstChild.nodeValue == "<!--";

				e.innerHTML = "<style><!--</style>-->";
				result &= e.firstChild && e.firstChild.firstChild && e.firstChild.firstChild.nodeValue == "<!--";
			} catch(e) {
				result = false;
			}

			this.section.setItem({
				id:		'tokenizer',
				passed:	result,
				value: 	3
			});

			var result = true;
			var e = document.createElement('div');

			try {
				var h = document.createElement("html");
				h.innerHTML = "";
				result &= h.firstChild && h.firstChild.nodeName == "HEAD" && h.lastChild.nodeName == "BODY" && h.firstChild.nextSibling == h.lastChild;
			} catch (e) {
				result = false;
			}

			try {
				var t = document.createElement("table");
				t.innerHTML = "<col>";
				result &= t.firstChild && t.firstChild.nodeName == "COLGROUP";
			} catch (e) {
				result = false;
			}

			e.innerHTML = "<ul><li>A </li> <li>B</li></ul>";
			result &= e.firstChild && e.firstChild.firstChild && e.firstChild.firstChild.firstChild && e.firstChild.firstChild.firstChild.nodeValue == "A ";

			e.innerHTML = "<table><form><input type=hidden><input></form><div></div></table>";
			result &= e.firstChild &&
					  e.firstChild.nodeName == "INPUT" &&
					  e.firstChild.nextSibling &&
					  e.firstChild.nextSibling.nodeName == "DIV" &&
					  e.lastChild.nodeName == "TABLE" &&
					  e.firstChild.nextSibling.nextSibling == e.lastChild &&
					  e.lastChild.firstChild &&
					  e.lastChild.firstChild.nodeName == "FORM" &&
					  e.lastChild.firstChild.firstChild == null &&
					  e.lastChild.lastChild.nodeName == "INPUT" &&
					  e.lastChild.firstChild.nextSibling == e.lastChild.lastChild;

			e.innerHTML = "<i>A<b>B<p></i>C</b>D";
			result &= e.firstChild &&
					  e.childNodes.length == 3 &&
					  e.childNodes[0].nodeName == "I" &&
					  e.childNodes[0].childNodes.length == 2 &&
					  e.childNodes[0].childNodes[0].nodeValue == "A" &&
					  e.childNodes[0].childNodes[1].nodeName == "B" &&
					  e.childNodes[0].childNodes[1].childNodes.length == 1 &&
					  e.childNodes[0].childNodes[1].childNodes[0].nodeValue == "B" &&
					  e.childNodes[1].nodeName == "B" &&
					  e.childNodes[1].firstChild == null &&
					  e.childNodes[2].nodeName == "P" &&
					  e.childNodes[2].childNodes.length == 2 &&
					  e.childNodes[2].childNodes[0].nodeName == "B" &&
					  e.childNodes[2].childNodes[0].childNodes.length == 2 &&
					  e.childNodes[2].childNodes[0].childNodes[0].nodeName == "I" &&
					  e.childNodes[2].childNodes[0].childNodes[0].firstChild == null &&
					  e.childNodes[2].childNodes[0].childNodes[1].nodeValue == "C" &&
					  e.childNodes[2].childNodes[1].nodeValue == "D";

			e.innerHTML = "<div></div>";
			result &= e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == "http://www.w3.org/1999/xhtml";

			this.section.setItem({
				id:		'tree',
				passed:	result,
				value: 	2
			});

			var e = document.createElement('div');
			e.innerHTML = '<svg></svg>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/2000/svg';

			this.section.setItem({
				id:		'svg',
				passed:	passed
			});

			var e = document.createElement('div');
			e.innerHTML = '<math></math>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/1998/Math/MathML';

			this.section.setItem({
				id:		'mathml',
				passed:	passed
			});
		}
	};


	function testResponsive (results) { this.initialize(results); }
	testResponsive.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'responsive'
			});

			this.section.setItem({
				id:		'picture',
				passed:	'HTMLPictureElement' in window,
				value: 	5
			});

			this.section.setItem({
				id:		'srcset',
				passed:	'srcset' in document.createElement('img'),
				value: 	5
			});

			this.section.setItem({
				id:		'sizes',
				passed:	'sizes' in document.createElement('img'),
				value: 	5
			});
		}
	};


	function testCanvas (results) { this.initialize(results); }
	testCanvas.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'canvas'
			});

			this.canvas = document.createElement('canvas');

			this.section.setItem({
				id:		'context',
				passed:	!! (this.canvas.getContext && typeof CanvasRenderingContext2D != 'undefined' && this.canvas.getContext('2d') instanceof CanvasRenderingContext2D),
				value: 	10
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').fillText == 'function';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'text',
				passed:	passed,
				value: 	2
			});


			this.section.setItem({
				id:		'path',
				passed:	typeof Path != "undefined" || typeof Path2D != "undefined",
				value: 	2
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').ellipse != 'undefined';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'ellipse',
				passed:	passed,
				value: 	2
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').setLineDash != 'undefined';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'dashed',
				passed:	passed,
				value: 	2
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').drawSystemFocusRing != 'undefined';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'focusring',
				passed:	passed,
				value: 	1
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').addHitRegion != 'undefined';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'hittest',
				passed:	passed,
				value: 	1
			});


			var passed = false;

			if (this.canvas.getContext) {
				this.canvas.width = 1;
				this.canvas.height = 1;

				try {
					var ctx = this.canvas.getContext('2d');
					ctx.fillStyle = '#fff';
					ctx.fillRect(0,0,1,1);
					ctx.globalCompositeOperation = 'screen';
					ctx.fillStyle = '#000';
					ctx.fillRect(0,0,1,1);

					var data = ctx.getImageData(0,0,1,1);

					passed = ctx.globalCompositeOperation == 'screen' && data.data[0] == 255;
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'blending',
				passed:	passed,
				value: 	5
			});



			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/png').substring(5,14) == 'image/png';
				}
				catch(e) {
				}
			}


			this.section.setItem({
				id:		'png',
				passed:	passed,
				value: 	0
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/jpeg').substring(5,15) == 'image/jpeg';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'jpeg',
				passed:	passed,
				value: 	0
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/vnd.ms-photo').substring(5,23) == 'image/vnd.ms-photo';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'jpegxr',
				passed:	passed,
				value: 	0
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/webp').substring(5,15) == 'image/webp';
				}
				catch(e) {
				}
			}

			this.section.setItem({
				id:		'webp',
				passed:	passed,
				value: 	0
			});
		}
	};


	function testVideo (results) { this.initialize(results); }
	testVideo.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'video'
			});

			this.element = document.createElement('video');

			this.section.setItem({
				id:		'element',
				passed:	!!this.element.canPlayType,
				value: 	16
			});

			this.section.setItem({
				id:		'audiotracks',
				passed:	'audioTracks' in this.element,
				value: 	2
			});

			this.section.setItem({
				id:		'videotracks',
				passed:	'videoTracks' in this.element,
				value: 	2
			});

			this.section.setItem({
				id:		'subtitle',
				passed:	'track' in document.createElement('track'),
				value: 	8
			});

			this.section.setItem({
				id:		'poster',
				passed:	'poster' in this.element,
				value: 	1
			});


			this.section.setItem({
				id:		'drm',
				passed:	'setMediaKeys' in this.element ? YES : 'webkitAddKey' in this.element || 'webkitSetMediaKeys' in this.element || 'mozSetMediaKeys' in this.element || 'msSetMediaKeys' in this.element ? YES | PREFIX : NO
			});

			this.section.setItem({
				id:		'mediasource',
				passed:	'MediaSource' in window ? YES : 'WebKitMediaSource' in window || 'mozMediaSource' in window || 'msMediaSource' in window ? YES | PREFIX : NO,
				value: 	2
			});


			/* I added a workaround for IE9, which only detects H.264 if you also provide an audio codec. Bug filed @ connect.microsoft.com */
			var item = {
				id:		'mpeg4',
				passed:	!!this.element.canPlayType && this.canPlayType('video/mp4; codecs="mp4v.20.8"')
			};

			this.section.setItem(item);

			var item = {
				id:		'h264',
				passed:	!!this.element.canPlayType && (this.canPlayType('video/mp4; codecs="avc1.42E01E"') || this.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))

			};

			this.section.setItem(item);

			var item = {
				id:		'theora',
				passed:	!!this.element.canPlayType && this.canPlayType('video/ogg; codecs="theora"')
			};

			this.section.setItem(item);

			var item = {
				id:		'webmvp8',
				passed:	!!this.element.canPlayType && this.canPlayType('video/webm; codecs="vp8"')
			};

			this.section.setItem(item);

			var item = {
				id:		'webmvp9',
				passed:	!!this.element.canPlayType && this.canPlayType('video/webm; codecs="vp9"')
			};

			this.section.setItem(item);


			var passed = true;

			if (!!this.element.canPlayType) {
				if (this.element.canPlayType('video/nonsense') == 'no') {
					passed = false;
					if (console && console.log) console.log('Codec detection is buggy: known bug in Firefox 3.5.0 - 3.5.1 and Safari 4.0.0 - 4.0.4 that answer "no" to unknown codecs instead of an empty string')
				}

				if (this.element.canPlayType('video/webm') == 'probably') {
					passed = false;
					if (console && console.log) console.log('Codec detection is buggy: known bug that Firefox 27 and earlier always says "probably" when asked about WebM, even when the codecs string is not present')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') == 'maybe' && this.element.canPlayType('video/mp4') == 'probably') {
					passed = false;
					if (console && console.log) console.log('Codec detection is buggy: known bug in iOS 4.1 and earlier that switches "maybe" and "probably" around')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') == 'maybe' && this.element.canPlayType('video/mp4') == 'maybe') {
					passed = false;
					if (console && console.log) console.log('Codec detection is buggy: known bug in Android where no better answer than "maybe" is given')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') == 'probably' && this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') != 'probably') {
					passed = false;
					if (console && console.log) console.log('Codec detection is buggy: known bug in Internet Explorer 9 that requires both audio and video codec on test')
				}

				/* This test should always return an empty string, if not the codecs string is ignored */
				// if (this.element.canPlayType('video/mp4; codecs="whatthewhat"') != '') passed = false;

				/* This test should always return an empty string, if not there is no check at all */
				// if (this.element.canPlayType('video/huh') != '') passed = false;
			}

			var item = {
				id:		'canplaytype',
				passed:	this.element.canPlayType ? (passed ? YES : YES | BUGGY) : NO,
				value:	4
			};

			this.section.setItem(item);
		},

		canPlayType: function(t) {
			/*
				There is a bug in iOS 4.1 or earlier where probably and maybe are switched around.
				This bug was reported and fixed in iOS 4.2
			*/

			if (Browsers.isOs('iOS', '<', '4.2'))
				return this.element.canPlayType(t) == 'probably' || this.element.canPlayType(t) == 'maybe';
			else
				return this.element.canPlayType(t) == 'probably';
		}
	};


	function testAudio (results) { this.initialize(results); }
	testAudio.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'audio'
			});

			this.element = document.createElement('audio');

			this.section.setItem({
				id:		'element',
				passed:	!!this.element.canPlayType,
				value: 	18
			});

			this.section.setItem({
				id:		'loop',
				passed:	'loop' in this.element,
				value: 	1
			});

			this.section.setItem({
				id:		'preload',
				passed:	'preload' in this.element,
				value: 	1
			});

			var item = {
				id:		'pcm',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/wav; codecs="1"')
			};

			this.section.setItem(item);

			var r = false;
			if (this.element.canPlayType) {
				var t = this.element.canPlayType('audio/mpeg');
				if (t == 'maybe') {
					// We need to check if the browser really supports playing MP3s by loading one and seeing if the
					// loadedmetadata event is triggered... but for now assume it does support it...
					r = true;
				} else if (t == 'probably') {
					r = true;
				}
			}

			var item = {
				id:		'mp3',
				passed:	r
			};

			this.section.setItem(item);

			var item = {
				id:		'aac',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/mp4; codecs="mp4a.40.2"')
			};

			this.section.setItem(item);

			var item = {
				id:		'vorbis',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/ogg; codecs="vorbis"')
			};

			this.section.setItem(item);

			var item = {
				id:		'opus',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/ogg; codecs="opus"')
			};

			this.section.setItem(item);

			var item = {
				id:		'webm',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/webm; codecs="vorbis"')
			};

			this.section.setItem(item);

			var item = {
				id:		'webmopus',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/webm; codecs="opus"')
			};

			this.section.setItem(item);


			this.section.setItem({
				id:			'webaudio',
				passed:		'AudioContext' in window ? YES : 'webkitAudioContext' in window || 'mozAudioContext' in window || 'oAudioContext' in window || 'msAudioContext' in window ? YES | PREFIX : NO,
				value: 		5
			});


			this.section.setItem({
				id:			'speechrecognition',
				passed:		'SpeechRecognition' in window ? YES : 'webkitSpeechRecognition' in window || 'mozSpeechRecognition' in window || 'oSpeechRecognition' in window || 'msSpeechRecognition' in window ? YES | PREFIX : NO,
				value: 		3
			});

			this.section.setItem({
				id:			'speechsynthesis',
				passed:		'speechSynthesis' in window ? YES : 'webkitSpeechSynthesis' in window || 'mozSpeechSynthesis' in window || 'oSpeechSynthesis' in window || 'msSpeechSynthesis' in window ? YES | PREFIX : NO,
				value: 		2
			});
		},

		canPlayType: function(t) {
			/*
				There is a bug in iOS 4.1 or earlier where probably and maybe are switched around.
				This bug was reported and fixed in iOS 4.2
			*/

			if (Browsers.isOs('iOS', '<', '4.2'))
				return this.element.canPlayType(t) == 'probably' || this.element.canPlayType(t) == 'maybe';
			else
				return this.element.canPlayType(t) == 'probably';
		}
	};


	function testWebRTC (results) { this.initialize(results); }
	testWebRTC.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'webrtc'
			});

			var webrtc = !!window.RTCPeerConnection ? YES : !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection || !!window.msRTCPeerConnection || !!window.oRTCPeerConnection ? YES | PREFIX : NO;
			var objectrtc = !!window.RTCIceTransport ? YES : !!window.webkitRTCIceTransport || !!window.mozRTCIceTransport || !!window.msRTCIceTransport || !!window.oRTCIceTransport ? YES | PREFIX : NO;

			this.section.setItem({
				id:		'webrtc',
				passed:	webrtc,
				value: 	10
			});

			this.section.setItem({
				id:		'objectrtc',
				passed:	objectrtc,
				value: 	5,
				award:  webrtc == NO ? 15 : 5	/* Award extra 10 points when WebRTC is not supported */
			});

			var passed = false;
			try {
				o = new (window.RTCPeerConnection || window.msRTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)(null);
				passed = 'createDataChannel' in o;
			}
			catch(e) {
			}

			this.section.setItem({
				id:		'datachannel',
				passed:	passed ? (window.RTCPeerConnection ? YES : YES | PREFIX) : NO,
				value: 	5
			});
		}
	};

	function testInput (results) { this.initialize(results); }
	testInput.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'input'
			});

			this.section.setItem({
				id:			'getUserMedia',
				passed:		!!navigator.getUserMedia ? YES : !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia || !!navigator.msGetUserMedia || !!navigator.oGetUserMedia ? YES | PREFIX : NO,
				value: 		15
			});

			this.section.setItem({
				id:			'getGamepads',
				passed:		!!navigator.getGamepads ? YES : !!navigator.webkitGetGamepads || !!navigator.mozGetGamepads || !!navigator.msGetGamepads || !!navigator.oGetGamepads ? YES | PREFIX : NO,
				value: 		2
			});

			this.section.setItem({
				id:   		'pointerLock',
				passed:  	'pointerLockElement' in document ? YES : 'oPointerLockElement' in document || 'msPointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document ? YES | PREFIX : NO,
				value:   	3
			});

			this.section.setItem({
				id:   		'pointerevents',
				passed:  	!!window.navigator.maxTouchPoints  ? YES : !!window.navigator.msMaxTouchPoints || !!window.navigator.mozMaxTouchPoints || !!window.navigator.webkitMaxTouchPoints ? YES | PREFIX : NO,
				value:   	5
			});
		}
	};


	function testElements (results) { this.initialize(results); }
	testElements.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'elements'
			});

			var element = document.createElement('div');
			element.setAttribute('data-test', 'test');

			this.section.setItem({
				id:		'dataset',
				passed:	'dataset' in element,
				value: 	3
			});

			var group = this.section.getGroup({
				id:		'section'
			});

			var elements = 'section nav article aside header footer'.split(' ');

			for (var e = 0; e < elements.length; e++) {
				var passed = false;

				try {
					var element = document.createElement(elements[e]);
					document.body.appendChild(element);

					try {
						passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && this.isBlock(element) && this.closesImplicitly(elements[e]);
					} catch(error) {
					}

					document.body.removeChild(element);
				} catch(error) {
				}

				group.setItem({
					id:		elements[e],
					passed:	passed,
					value: 	1
				});
			}

			var group = this.section.getGroup({
				id:		'grouping'
			});

			var elements = 'main figure figcaption'.split(' ');

			for (var e = 0; e < elements.length; e++) {
				var passed = false;

				try {
					var element = document.createElement(elements[e]);
					document.body.appendChild(element);

					try {
						passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && this.isBlock(element) && (elements[e] != 'figure' || this.closesImplicitly(elements[e]));
					} catch(error) {
					}

					document.body.removeChild(element);
				} catch(error) {
				}

				group.setItem({
					id:		elements[e],
					passed:	passed,
					value: 	1
				});
			}


			var element = document.createElement('ol');
			group.setItem({
				id:		'ol',
				passed:	'reversed' in element,
				value: 	1
			});

			var group = this.section.getGroup({
				id:		'semantic'
			});

			var element = document.createElement('a');
			group.setItem({
				id:		'download',
				passed:	'download' in element,
				value: 	1
			});

			group.setItem({
				id:		'ping',
				passed:	'ping' in element,
				value: 	1
			});


			var passed = false;

			try {
				var element = document.createElement('mark');
				document.body.appendChild(element);

				try {
					passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && (color = this.getStyle(element, 'background-color')) && (color != 'transparent');
				} catch(error) {
				}

				document.body.removeChild(element);
			} catch(error) {
			}

			group.setItem({
				id:		'mark',
				passed:	passed,
				value: 	1
			});


			var container = document.createElement('div');
			document.body.appendChild(container);
			container.innerHTML = "<ruby id='ruby'><rp id='rp'></rp><rt id='rt'></rt></ruby>";
			var rubyElement = document.getElementById('ruby');
			var rtElement = document.getElementById('rt');
			var rpElement = document.getElementById('rp');

			var rubySupport = false;
			var rtSupport = false;
			var rpSupport = false;

			try {
				rubySupport = rubyElement && rubyElement instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
				rtSupport = rtElement && rtElement instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
				rpSupport = rpElement && rpElement instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && this.isHidden(rpElement);
			} catch(error) {
			}

			document.body.removeChild(container);

			group.setItem({
				id:		'ruby',
				passed:	rubySupport && rtSupport && rpSupport,
				value: 	3
			});


			var passed = false;

			try {
				var element = document.createElement('time');

				try {
					passed = typeof HTMLTimeElement != 'undefined' && element instanceof HTMLTimeElement;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:		'time',
				passed:	passed,
				value: 	1
			});


			var passed = false;

			try {
				var element = document.createElement('wbr');

				try {
					passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:		'wbr',
				passed:	passed,
				value: 	1
			});

			var group = this.section.getGroup({
				id:		'interactive'
			});


			var passed = false;

			try {
				var element = document.createElement('details');
				element.innerHTML = '<summary>a</summary>b';
				document.body.appendChild(element);

				var height = element.offsetHeight;
				element.open = true;

				passed = height != element.offsetHeight;

				document.body.removeChild(element);
			} catch(error) {
			}

			group.setItem({
				id:		'details',
				passed:	passed,
				value: 	1
			});


			var passed = false;

			try {
				var element = document.createElement('summary');
				document.body.appendChild(element);

				try {
					passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
				} catch(error) {
				}

				document.body.removeChild(element);
			} catch(error) {
			}

			group.setItem({
				id:		'summary',
				passed:	passed,
				value: 	1
			});


			var passed = false;

			try {
				var element = document.createElement('menu');
				document.body.appendChild(element);

				try {
					passed = typeof HTMLMenuElement != 'undefined' && element instanceof HTMLMenuElement && 'type' in element;
				} catch(error) {
				}

				// Check default type
				if (passed && element.type != 'toolbar') passed = false;

				// Check type sanitization
				try {
					element.type = 'foobar';
				} catch(error) {
				}

				if (passed && element.type == 'foobar') passed = false;

				// Check if correct type sticks
				try {
					element.type = 'toolbar';
				} catch(error) {
					passed = false;
				}

				if (passed && element.type != 'toolbar') passed = false;

				document.body.removeChild(element);
			} catch(error) {
			}

			group.setItem({
				id:		'menutoolbar',
				passed:	passed,
				value: 	1
			});



			var passed = false;

			try {
				var element = document.createElement('menu');
				document.body.appendChild(element);

				var passed = false;
				try {
					passed = typeof HTMLMenuElement != 'undefined' && element instanceof HTMLMenuElement && 'type' in element;
				} catch(error) {
				}

				try {
					element.type = 'popup';
				} catch(error) {
				}

				// Check default type
				var second = document.createElement('menu');
				element.appendChild(second);
				if (passed && second.type != 'popup') passed = false;
				element.removeChild(second);

				// Check type sanitization
				try {
					element.type = 'foobar';
				} catch(error) {
				}

				if (passed && element.type == 'foobar') passed = false;

				// Check if correct type sticks
				try {
					element.type = 'popup';
				} catch(error) {
					passed = false;
				}

				if (passed && element.type != 'popup') passed = false;


				if (passed) {
					var item = document.createElement('menuitem');
					element.appendChild(item);

					if (typeof HTMLMenuItemElement == 'undefined' || ! item instanceof HTMLMenuItemElement) passed = false;
				}

				document.body.removeChild(element);
			} catch(error) {
			}

			group.setItem({
				id:		'menupopup',
				passed:	passed,
				value: 	2
			});


			var passed = false;

			try {
				var element = document.createElement('dialog');

				try {
					passed = typeof HTMLDialogElement != 'undefined' && element instanceof HTMLDialogElement;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:			'dialog',
				passed:		passed,
				value: 		1
			});


			var element = document.createElement('div');

			this.section.setItem({
				id:		'hidden',
				passed:	'hidden' in element,
				value: 	1
			});

			var group = this.section.getGroup({
				id:		'dynamic'
			});

			var element = document.createElement('div');

			group.setItem({
				id:		'outerHTML',
				passed:	!!('outerHTML' in element),
				value: 	1
			});

			group.setItem({
				id:		'insertAdjacentHTML',
				passed:	!!('insertAdjacentHTML' in element),
				value: 	1
			});
		},

		getStyle: function(elem, name) {
			function camelCase(str){
			  return str.replace(/-\D/g, function(match){
				return match.charAt(1).toUpperCase()
			  })
			}

			if (elem.style[name]) {
		        return elem.style[name];
		    } else if (elem.currentStyle) {
		        return elem.currentStyle[camelCase(name)];
		    }
		    else if (document.defaultView && document.defaultView.getComputedStyle) {
		    	s = document.defaultView.getComputedStyle(elem, "");
		        return s && s.getPropertyValue(name);
		    } else {
		        return null;
		    }
		},

		isBlock: function(element) {
			return this.getStyle(element, 'display') == 'block';
		},

		closesImplicitly: function(name) {
			var foo = document.createElement('div');
			foo.innerHTML = '<p><' + name + '></' + name + '>';
			return foo.childNodes.length == 2;
		},

		isHidden: function(element) {
			return this.getStyle(element, 'display') == 'none';
		}
	};

	function testForm (results) { this.initialize(results); }
	testForm.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'form'
			});

			var element = this.createInput('text');
			var baseline = { field: getRenderedStyle(element.field), wrapper: getRenderedStyle(element.wrapper) };
			this.removeInput(element);


			/* input type=text */

			var group = this.section.getGroup({
				id:		'text'
			});

			var element = this.createInput('text');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'text'
			});

			group.setItem({
				id:			'selection',
				passed:		'selectionDirection' in element.field,
				value: 		2
			});

			this.removeInput(element);


			/* input type=search */

			var group = this.section.getGroup({
				id:		'search'
			});

			var element = this.createInput('search');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'search',
				value: 		2
			});

			this.removeInput(element);


			/* input type=tel */

			var group = this.section.getGroup({
				id:		'tel'
			});

			var element = this.createInput('tel');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'tel',
				value: 		2
			});

			this.removeInput(element);


			/* input type=url */

			var group = this.section.getGroup({
				id:		'url'
			});

			var element = this.createInput('url');

			var validation = false;
			if ('validity' in element.field) {
				validation = true;

				element.field.value = "foo";
				validation &= !element.field.validity.valid

				element.field.value = "http://foo.org";
				validation &= element.field.validity.valid
			}

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'url',
				value: 		2,
				required:	true
			});

			group.setItem({
				id:			'validation',
				passed:		validation,
				required:	true
			});

			this.removeInput(element);


			/* input type=email */

			var group = this.section.getGroup({
				id:		'email'
			});

			var element = this.createInput('email');

			var validation = false;
			if ('validity' in element.field) {
				validation = true;

				element.field.value = "foo";
				validation &= !element.field.validity.valid

				element.field.value = "foo@bar.org";
				validation &= element.field.validity.valid
			}

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'email',
				value: 		2,
				required:	true
			});

			group.setItem({
				id:			'validation',
				passed:		validation,
				required:	true
			});

			this.removeInput(element);


			/* input type=date, month, week, time, datetime and datetime-local */

			var types = ['date', 'month', 'week', 'time', 'datetime', 'datetime-local'];
			for (var t = 0; t < types.length; t++) {
				var group = this.section.getGroup({
					id:		types[t]
				});

				var element = this.createInput(types[t]);

				element.field.value = "foobar";
				var sanitization = element.field.value == '';

				var minimal = element.field.type == types[t];

				group.setItem({
					id:			'element',
					passed:		minimal,
					value: 		types[t] != 'datetime' ? 2 : 1,
					required:	true
				});

				group.setItem({
					id:			'ui',
					passed:		minimal && sanitization, 	// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
					value: 		types[t] != 'datetime' ? 2 : 1
				});

				group.setItem({
					id:			'sanitization',
					passed:		minimal && sanitization,
					required:	true
				});

				group.setItem({
					id:			'min',
					passed:		minimal && 'min' in element.field,
					required:	true
				});

				group.setItem({
					id:			'max',
					passed:		minimal && 'max' in element.field,
					required:	true
				});

				group.setItem({
					id:			'step',
					passed:		minimal && 'step' in element.field,
					required:	true
				});

				group.setItem({
					id:			'stepDown',
					passed:		minimal && 'stepDown' in element.field,
					required:	true
				});

				group.setItem({
					id:			'stepUp',
					passed:		minimal && 'stepUp' in element.field,
					required:	true
				});

				if (t != 'datetime-local' && t != 'datetime') {
					group.setItem({
						id:			'valueAsDate',
						passed:		minimal && 'valueAsDate' in element.field,
						required:	true
					});
				}

				group.setItem({
					id:			'valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element.field,
					required:	true
				});

				this.removeInput(element);
			}


			/* input type=number, range */

			var types = ['number', 'range'];
			for (var t = 0; t < types.length; t++) {
				var group = this.section.getGroup({
					id:		types[t],
					name:	'<code>input type=' + types[t] + '</code>'
				});

				var element = this.createInput(types[t]);

				element.field.value = "foobar";
				var sanitization = element.field.value != 'foobar';

				var validation = false;
				if ('validity' in element.field) {
					validation = true;

					element.field.min = 40;
					element.field.max = 50;
					element.field.value = 100;
					validation &= !element.field.validity.valid

					element.field.value = 42;
					validation &= element.field.validity.valid
				}

				var minimal = element.field.type == types[t];

				group.setItem({
					id:			'element',
					passed:		minimal,
					value: 		2,
					required:	true
				});

				group.setItem({
					id:			'ui',
					passed:		minimal && sanitization,		// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
					value: 		2
				});

				group.setItem({
					id:			'sanitization',
					passed:		minimal && sanitization,
					required:	true
				});

				if (types[t] != 'range') {
					group.setItem({
						id:			'validation',
						passed:		minimal && validation,
						required:	true
					});
				}

				group.setItem({
					id:			'min',
					passed:		minimal && 'min' in element.field,
					required:	true
				});

				group.setItem({
					id:			'max',
					passed:		minimal && 'max' in element.field,
					required:	true
				});

				group.setItem({
					id:			'step',
					passed:		minimal && 'step' in element.field,
					required:	true
				});

				group.setItem({
					id:			'stepDown',
					passed:		minimal && 'stepDown' in element.field,
					required:	true
				});

				group.setItem({
					id:			'stepUp',
					passed:		minimal && 'stepUp' in element.field,
					required:	true
				});

				group.setItem({
					id:			'valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element.field,
					required:	true
				});

				this.removeInput(element);
			}


			/* input type=color */

			var group = this.section.getGroup({
				id:		'color'
			});

			var element = this.createInput('color');

			element.field.value = "foobar";
			var sanitization = element.field.value != 'foobar';

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'color',
				value: 		2
			});

			group.setItem({
				id:			'ui',
				passed:		sanitization,		// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
				value: 		2
			});

			group.setItem({
				id:			'sanitization',
				passed:		sanitization,
				required:	true
			});

			this.removeInput(element);



			/* input type=checkbox */

			var group = this.section.getGroup({
				id:		'checkbox'
			});

			var element = this.createInput('checkbox');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'checkbox',
				value: 		0
			});

			group.setItem({
				id:			'indeterminate',
				passed:		'indeterminate' in element.field,
				value: 		1
			});

			this.removeInput(element);


			/* input type=image */

			var group = this.section.getGroup({
				id:		'image'
			});

			var element = this.createInput('image');
			element.field.style.display = 'inline-block';

			var supportsWidth = 'width' in element.field;
			var supportsHeight = 'height' in element.field;

			element.field.setAttribute('width', '100');
			element.field.setAttribute('height', '100');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'image',
				value: 		0
			});

			group.setItem({
				id:			'width',
				passed:		supportsWidth && element.field.offsetWidth == 100,
				value: 		0
			});

			group.setItem({
				id:			'height',
				passed:		supportsHeight && element.field.offsetHeight == 100,
				value: 		0
			});

			this.removeInput(element);


			/* input type=file */

			var group = this.section.getGroup({
				id:		'file'
			});

			var element = this.createInput('file');

			group.setItem({
				id:			'element',
				passed:		element.field.type == 'file',
				value: 		0
			});

			group.setItem({
				id:			'files',
				passed:		element.field.files && element.field.files instanceof FileList,
				value: 		1
			});

			this.removeInput(element);


			/* textarea */

			var group = this.section.getGroup({
				id:		'textarea'
			});

			var element = document.createElement('textarea');

			var passed = false;
			try {
				passed = typeof HTMLTextAreaElement != 'undefined' && element instanceof HTMLTextAreaElement;
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		0
			});

			group.setItem({
				id:			'maxlength',
				passed:		'maxLength' in element,
				value:		1
			});

			group.setItem({
				id:			'wrap',
				passed:		'wrap' in element,
				value:		1
			});


			/* select */

			var group = this.section.getGroup({
				id:		'select'
			});

			var element = document.createElement('select');

			var passed = false;
			try {
				passed = typeof HTMLSelectElement != 'undefined' && element instanceof HTMLSelectElement;
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		0
			});

			group.setItem({
				id:			'required',
				passed:		'required' in element,
				value:		1
			});


			/* fieldset */

			var group = this.section.getGroup({
				id:		'fieldset'
			});

			var element = document.createElement('fieldset');

			var passed = false;
			try {
				passed = typeof HTMLFieldSetElement != 'undefined' && element instanceof HTMLFieldSetElement;
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		0
			});

			group.setItem({
				id:			'elements',
				passed:		'elements' in element,
				value:		1
			});

			group.setItem({
				id:			'disabled',
				passed:		'disabled' in element,
				value:		1
			});


			/* datalist */

			var group = this.section.getGroup({
				id:		'datalist'
			});

			var passed = false;

			try {
				var element = document.createElement('datalist');

				try {
					passed = (typeof HTMLDataListElement != 'undefined' && element instanceof HTMLDataListElement) || element.childNodes.length;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		2,
				required:	true
			});

			var element = document.createElement('input');

			group.setItem({
				id:			'list',
				passed:		!!("list" in element),
				required:	true
			});


			/* keygen */

			var group = this.section.getGroup({
				id:		'keygen'
			});

			var element = document.createElement('div');
			element.innerHTML = '<keygen>';

			var passed = false;
			try {
				passed = typeof HTMLKeygenElement != 'undefined' && element.firstChild instanceof HTMLKeygenElement && 'challenge' in element.firstChild && 'keytype' in element.firstChild;
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		2,
				required:	true
			});

			group.setItem({
				id:			'challenge',
				passed:		element.firstChild && 'challenge' in element.firstChild,
				required:	true
			});

			group.setItem({
				id:			'keytype',
				passed:		element.firstChild && 'keytype' in element.firstChild,
				required:	true
			});



			/* output */

			var group = this.section.getGroup({
				id:		'output'
			});

			var passed = false;

			try {
				var element = document.createElement('output');

				try {
					passed = typeof HTMLOutputElement != 'undefined' && element instanceof HTMLOutputElement;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		2
			});


			/* progress */

			var group = this.section.getGroup({
				id:		'progress'
			});

			var passed = false;

			try {
				var element = document.createElement('progress');

				try {
					passed = typeof HTMLProgressElement != 'undefined' && element instanceof HTMLProgressElement;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		2
			});


			/* meter */

			var group = this.section.getGroup({
				id:		'meter'
			});

			var passed = false;

			try {
				var element = document.createElement('meter');

				try {
					passed = typeof HTMLMeterElement != 'undefined' && element instanceof HTMLMeterElement;
				} catch(error) {
				}
			} catch(error) {
			}

			group.setItem({
				id:			'element',
				passed:		passed,
				value: 		2
			});

			var group = this.section.getGroup({
				id:		'validation'
			});

			var element = document.createElement('input');

			var props = 'pattern required'.split(' ');

			for (var p = 0; p < props.length; p++) {
					group.setItem({
					id:			props[p],
					passed:		!!(props[p] in element),
					value: 		1
				});
			}

			var group = this.section.getGroup({
				id:		'association',
				value:	2
			});

			var field = document.createElement('input');
			field.id = "a";
			document.body.appendChild(field);

			var label = document.createElement("label");
			label.setAttribute('for', 'a');
			document.body.appendChild(label);

			group.setItem({
				id:			'control',
				passed:		label.control == field
			});

			document.body.removeChild(field);
			document.body.removeChild(label);

			var element = document.createElement('div');
			document.body.appendChild(element);
			element.innerHTML = '<form id="form"></form><input form="form">';
			group.setItem({
				id:			'form',
				passed:		element.lastChild.form == element.firstChild
			});
			document.body.removeChild(element);

			var props = 'formAction formEnctype formMethod formNoValidate formTarget'.split(' ');

			var element = document.createElement('input');

			for (var p = 0; p < props.length; p++) {
					group.setItem({
					id:			props[p],
					passed:		!!(props[p] in element)
				});
			}

			var element = document.createElement('input');
			document.body.appendChild(element);
			element.id = "testFormInput";

			var label = document.createElement("label");
			label.setAttribute('for', 'testFormInput');
			document.body.appendChild(label);
			group.setItem({
				id:			'labels',
				passed:		(!!element.labels && element.labels.length == 1 && element.labels[0] == label)
			});

			document.body.removeChild(label);
			document.body.removeChild(element);

			var group = this.section.getGroup({
				id:		'other',
				value:	2
			});

			var element = document.createElement('input');

			group.setItem({
				id:			'autofocus',
				passed:		!!('autofocus' in element)
			});

			var props = 'autocomplete placeholder multiple dirName'.split(' ');

			for (var p = 0; p < props.length; p++) {
				var prop = props[p].toLowerCase();
				group.setItem({
					id:			prop,
					passed:		!!(props[p] in element),
					required:	props[p] != 'dirName'
				});
			}

			var selectors = "valid invalid optional required in-range out-of-range read-write read-only".split(" ");
			var res = [NO, NO, NO, NO, NO, NO, NO, NO];
			var unknown = false;

			/*  At this time we are not testing enabled, disabled, checked and indeterminate,
				because these selectors are part of the CSS 3 Selector specification and
				universally implemented, see http://www.css3.info/selectors-test/
			*/

			if ('querySelector' in document) {
				var element = document.createElement('input');
				element.id = 'testFormInput';
				element.setAttribute("type", "text");
				document.body.appendChild(element);

				try {
					res[0] = !!document.querySelector("#testFormInput:valid");
				} catch(e) {
					res[0] = NO;
				}

				try {
					res[6] = !!document.querySelector("#testFormInput:read-write");
				} catch(e) {
					res[6] = NO;

					try {
						res[6] = document.querySelector("#testFormInput:-moz-read-write") ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				if ("validity" in element && "setCustomValidity" in element) {
					element.setCustomValidity("foo");

					try {
						res[1] = !!document.querySelector("#testFormInput:invalid");
					} catch(e) {
						res[1] = NO;
					}
				} else {
					res[1] = NO;
				}

				try {
					res[2] = !!document.querySelector("#testFormInput:optional");
				} catch(e) {
					res[2] = NO;
				}

				element.setAttribute("required", "true");

				try {
					res[3] = !!document.querySelector("#testFormInput:required");
				} catch(e) {
					res[3] = NO;
				}

				try {
					element.setAttribute("type", "number");
					element.setAttribute("min", "10");
					element.setAttribute("max", "20");
					element.setAttribute("value", "15");
					res[4] = !!document.querySelector("#testFormInput:in-range");
				} catch(e) {
					res[4] = NO;
				}


				try {
					element.setAttribute("type", "number");
					element.setAttribute("min", "10");
					element.setAttribute("max", "20");
					element.setAttribute("value", "25");
					res[5] = !!document.querySelector("#testFormInput:out-of-range");
				} catch(e) {
					res[5] = NO;
				}

				document.body.removeChild(element);

				var element = document.createElement('input');
				element.id = 'testFormInput';
				element.setAttribute("type", "text");
				element.setAttribute("readonly", "readonly");
				document.body.appendChild(element);

				try {
					res[7] = !!document.querySelector("#testFormInput:read-only");
				} catch(e) {
					res[7] = NO;

					try {
						res[7] = document.querySelector("#testFormInput:-moz-read-only") ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				document.body.removeChild(element);
			} else {
				unknown = true;
			}

			var group = this.section.getGroup({
				id:		'selectors',
				value:	2
			});

			for (var i = 0; i < selectors.length; i++) {
				group.setItem({
					id:			selectors[i],
					passed:		res[i],
					custom:		unknown ? 'unknown' : false
				});
			}


			var group = this.section.getGroup({
				id:		'events',
				value:	2
			});

			var inputItem = group.setItem({
				id:			'oninput',
				passed:		isEventSupported('input')
			});

			var changeItem = group.setItem({
				id:			'onchange',
				passed:		isEventSupported('change')
			});

			var invalidItem = group.setItem({
				id:			'oninvalid',
				passed:		isEventSupported('invalid')
			});

			try {
				inputItem.startBackground();
				changeItem.startBackground();

				var event = document.createEvent("KeyboardEvent");
				if (event.initKeyEvent) {
					event.initKeyEvent("keypress", false, true, null, false, false, false, false, null, 65);

					var input = document.createElement('input');
					input.style.position = 'fixed';
					input.style.left = '-500px';
					input.style.top = '0px';

					document.body.appendChild(input);
					input.addEventListener('input', function() {
						inputItem.update({
							'passed': true
						});

						inputItem.stopBackground();
					}, true);

					input.addEventListener('change', function() {
						changeItem.update({
							'passed': true
						});

						changeItem.stopBackground();
					}, true);

					input.focus();
	        		input.dispatchEvent(event);
	                input.blur();

					window.setTimeout(function() {
						document.body.removeChild(input);

						inputItem.stopBackground();
						changeItem.stopBackground();
					}, 1000);
				} else {
					inputItem.stopBackground();
					changeItem.stopBackground();
				}
			} catch(e) {
				inputItem.stopBackground();
				changeItem.stopBackground();
			}

			var group = this.section.getGroup({
				id:		'formvalidation'
			});

			var element = document.createElement('form');

			group.setItem({
				id:			'checkValidity',
				passed:		'checkValidity' in element,
				value: 		3
			});

			group.setItem({
				id:			'noValidate',
				passed:		'noValidate' in element,
				value: 		1
			});
		},

		createInput: function(type) {
			var wrapper = document.createElement('div');
			document.body.appendChild(wrapper)

			var field = document.createElement('input');
			wrapper.appendChild(field);

			try {
				field.setAttribute('type', type);
			} catch(e) {
			}

			/* Make sure our field is position absolutely for CSS style comparison */
			wrapper.style.position = 'absolute';
			wrapper.style.display = 'inline-block';
			wrapper.style.top = '0px';
			wrapper.style.left = '0px';

			return { field: field, wrapper: wrapper };
		},

		removeInput: function(e) {
			document.body.removeChild(e.wrapper);
		}
	};

	function testInteraction (results) { this.initialize(results); }
	testInteraction.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'interaction'
			});

			/* Drag and drop */
			var element = document.createElement('div');

			var group = this.section.getGroup({
				id:		'dragdrop.attributes'
			});

			group.setItem({
				id:			'draggable',
				passed:		'draggable' in element,
				value:		1
			});

			group.setItem({
				id:			'dropzone',
				passed:		'dropzone' in element ? YES : 'webkitdropzone' in element || 'mozdropzone' in element || 'msdropzone' in element || 'odropzone' in element ? YES | PREFIX : NO,
				value:		1
			});

			var group = this.section.getGroup({
				id:		'dragdrop.events'
			});

			/* We need to check if the draggable attribute is supported, because older versions of IE do
			   support the incompatible versions of the events below. IE 9 and up do support the HTML5
			   events in combination with the draggable attribute */

			var supported = 'draggable' in element;

			group.setItem({
				id:			'ondrag',
				passed:		isEventSupported('drag') && supported
			});

			group.setItem({
				id:			'ondragstart',
				passed:		isEventSupported('dragstart') && supported
			});

			group.setItem({
				id:			'ondragenter',
				passed:		isEventSupported('dragenter') && supported
			});

			group.setItem({
				id:			'ondragover',
				passed:		isEventSupported('dragover') && supported
			});

			group.setItem({
				id:			'ondragleave',
				passed:		isEventSupported('dragleave') && supported
			});

			group.setItem({
				id:			'ondragend',
				passed:		isEventSupported('dragend') && supported
			});

			group.setItem({
				id:			'ondrop',
				passed:		isEventSupported('drop') && supported
			});


			/* Content editable */

			var element = document.createElement('div');

			var group = this.section.getGroup({
				id:		'editing.elements'
			});

			group.setItem({
				id:			'contentEditable',
				passed:		'contentEditable' in element,
				value: 		5
			});

			group.setItem({
				id:			'isContentEditable',
				passed:		'isContentEditable' in element,
				value: 		1
			});

			var group = this.section.getGroup({
				id:		'editing.documents'
			});

			group.setItem({
				id:			'designMode',
				passed:		'designMode' in document,
				value: 		1
			});

			var group = this.section.getGroup({
				id:		'editing.apis',
				value:	2
			});

			group.setItem({
				id:			'execCommand',
				passed:		'execCommand' in document
			});

			group.setItem({
				id:			'queryCommandEnabled',
				passed:		'queryCommandEnabled' in document
			});

			group.setItem({
				id:			'queryCommandIndeterm',
				passed:		'queryCommandIndeterm' in document
			});

			group.setItem({
				id:			'queryCommandState',
				passed:		'queryCommandState' in document
			});

			group.setItem({
				id:			'queryCommandSupported',
				passed:		'queryCommandSupported' in document
			});

			group.setItem({
				id:			'queryCommandValue',
				passed:		'queryCommandValue' in document
			});



			var selectors = "read-write read-only".split(" ");
			var res = [false, false];
			var unknown = false;

			if ('querySelector' in document) {
				var element = document.createElement('div');
				element.id = 'testDivElement';
				element.contentEditable = true;
				document.body.appendChild(element);

				var nested = document.createElement('div');
				nested.id = 'testDivNested';
				nested.contentEditable = false;
				element.appendChild(nested);

				try {
					res[0] = document.querySelector("#testDivElement:read-write") == element;
				} catch(e) {
					res[0] = NO;

					try {
						res[0] = document.querySelector("#testDivElement:-moz-read-write") == element ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				try {
					res[1] = document.querySelector("#testDivNested:read-only") == nested;
				} catch(e) {
					res[1] = NO;

					try {
						res[1] = document.querySelector("#testDivNested:-moz-read-only") == nested ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				document.body.removeChild(element);
			} else {
				unknown = true;
			}

			var group = this.section.getGroup({
				id:		'editing.selectors'
			});

			for (var i = 0; i < selectors.length; i++) {
				group.setItem({
					id:			selectors[i],
					passed:		res[i],
					value: 		1,
					custom:		unknown ? 'unknown' : false
				});
			}

			this.section.setItem({
				id:			'clipboard',
				passed:		!!('ClipboardEvent' in window),
				value: 		5
			});


			this.section.setItem({
				id:			'spellcheck',
				passed:		!!('spellcheck' in element),
				value: 		2
			});
		}
	};

	function testHistory (results) { this.initialize(results); }
	testHistory.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'history'
			});

			this.section.setItem({
				id:			'history',
				passed:		!!(window.history && history.pushState),
				value: 		10
			});
		}
	};

	function testMicrodata (results) { this.initialize(results); }
	testMicrodata.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'microdata'
			});

			var container = document.createElement('div');
			container.innerHTML = '<div id="microdataItem" itemscope itemtype="http://example.net/user"><p>My name is <span id="microdataProperty" itemprop="name">Elizabeth</span>.</p></div>';
			document.body.appendChild(container);

			var item = document.getElementById('microdataItem');
			var property = document.getElementById('microdataProperty');
			var r = true;

			// Check the element that contains the property
			r = r && !!('itemValue' in property) && property.itemValue == 'Elizabeth';

			// Check the element that is the item
			r = r && !!('properties' in item) && item.properties['name'][0].itemValue == 'Elizabeth';

			// Check the getItems method
			if (!!document.getItems) {
				var user = document.getItems('http://example.net/user')[0];
				r = r && user.properties['name'][0].itemValue == 'Elizabeth';
			}

			document.body.removeChild(container);

			this.section.setItem({
				id:			'microdata',
				passed:		r,
				value: 		0
			});
		}
	};

	function testOffline (results) { this.initialize(results); }
	testOffline.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'offline'
			});

			this.section.setItem({
				id:			'applicationCache',
				passed:		!!window.applicationCache,
				value: 		10
			});

			this.section.setItem({
				id:			'serviceWorkers',
				passed:		!!window.navigator.serviceWorker,
				value: 		10
			});

			this.section.setItem({
				id:			'registerProtocolHandler',
				passed:		!!window.navigator.registerProtocolHandler,
				value: 		2
			});

			this.section.setItem({
				id:			'registerContentHandler',
				passed:		!!window.navigator.registerContentHandler,
				value: 		2
			});

			var passed = false;
			try {
				passed = !!(window.external && typeof window.external.AddSearchProvider != 'undefined' && typeof window.external.IsSearchProviderInstalled != 'undefined');
			} catch(e) {
			}
			this.section.setItem({
				id:			'addSearchProvider',
				passed:		passed,
				value: 		1
			});
		}
	};

	function testSecurity (results) { this.initialize(results); }
	testSecurity.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'security'
			});

			var passed = NO;
			try {
				var crypto = window.crypto || window.webkitCrypto || window.mozCrypto || window.msCrypto || window.oCrypto;
				var available = window.crypto ? YES : window.webkitCrypto || window.mozCrypto || window.msCrypto || window.oCrypto ? YES | PREFIX : NO;
				passed = !!crypto && 'subtle' in crypto ? available : NO;
			} catch(e) {
			}

			this.section.setItem({
				id:			'crypto',
				passed: 	passed,
				value: 		5
			});

			this.section.setItem({
				id:			'csp10',
				passed:		!(function() { try { return eval('true'); } catch (e) {} return false; })(),
				value: 		3
			});

			this.section.setItem({
				id:			'csp11',
				passed:		'SecurityPolicyViolationEvent' in window,
				value: 		2
			});

			this.section.setItem({
				id:			'cors',
				passed:		!!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
				value: 		5
			});

			this.section.setItem({
				id:			'postMessage',
				passed:		!!window.postMessage,
				value: 		5
			});



			this.section.setItem({
				id:			'sandbox',
				passed:		'sandbox' in document.createElement('iframe'),
				value: 		10
			});

			this.section.setItem({
				id:			'seamless',
				passed:		'seamless' in document.createElement('iframe'),
				value: 		5
			});

			this.section.setItem({
				id:			'srcdoc',
				passed:		'srcdoc' in document.createElement('iframe'),
				value: 		5
			});
		}
	};

	function testGeolocation (results) { this.initialize(results); }
	testGeolocation.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'location'
			});

			this.section.setItem({
				id:			'geolocation',
				passed:		!!navigator.geolocation,
				value: 		15
			});

			this.section.setItem({
				id:			'orientation',
				passed:		!!window.DeviceOrientationEvent,
				value: 		3
			});

			this.section.setItem({
				id:			'motion',
				passed:		!!window.DeviceMotionEvent,
				value: 		2
			});
		}
	};

	function testWebGL (results) { this.initialize(results); }
	testWebGL.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'webgl'
			});

			var element = document.createElement('canvas');
			var contexts = ['webgl', 'ms-webgl', 'experimental-webgl', 'moz-webgl', 'opera-3d', 'webkit-3d', 'ms-3d', '3d'];
			var context = '';
			var passed = false;

	        for (var b = -1, len = contexts.length; ++b < len;) {
	            try {
	                if (element.getContext(contexts[b])) {
	                	context = contexts[b];
	                	passed = true;
	                	break;
	                };
	            } catch(e){	}
	        }

			this.section.setItem({
				id:			'context',
				passed:		passed ? (context == 'webgl' ? YES : YES | PREFIX) : NO,
				value: 		20
			});
		}
	};

	function testCommunication (results) { this.initialize(results); }
	testCommunication.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'communication'
			});

			this.section.setItem({
				id:			'beacon',
				passed:		'sendBeacon' in navigator,
				value: 		2
			});

			this.section.setItem({
				id:			'eventSource',
				passed:		'EventSource' in window,
				value: 		6
			});

			this.section.setItem({
				id:			'xmlhttprequest2.upload',
				passed:		window.XMLHttpRequest && 'upload' in new XMLHttpRequest(),
				value: 		5
			});

			var group = this.section.getGroup({
				id:			'xmlhttprequest2.response'
			});

			var item = group.setItem({
				id:			'text',
				passed:		false,
				value: 		1
			});

			this.testResponseTypeText(item);

			var item = group.setItem({
				id:			'document',
				passed:		false,
				value: 		2
			});

			this.testResponseTypeDocument(item);

			var item = group.setItem({
				id:			'array',
				passed:		false,
				value: 		2
			});

			this.testResponseTypeArrayBuffer(item);

			var item = group.setItem({
				id:			'blob',
				passed:		false,
				value: 		2
			});

			this.testResponseTypeBlob(item);


			var websocket = window.WebSocket || window.MozWebSocket;
			var passed = 'WebSocket' in window ? YES : 'MozWebSocket' in window ? YES | PREFIX : NO;
			if (websocket && websocket.CLOSING !== 2) passed |= OLD;

			this.section.setItem({
				id:			'websocket.basic',
				passed:		passed,
				value: 		10
			});



			var passed = false;
			var protocol = 'https:' == location.protocol ? 'wss' : 'ws';

			if ("WebSocket" in window) {
	        	if ("binaryType" in WebSocket.prototype) {
	            	passed = true;
				}
				else {
					try {
						passed = !!(new WebSocket(protocol+'://.').binaryType);
					} catch (e) {
					}
	          	}
	        }

			this.section.setItem({
				id:			'websocket.binary',
				passed:		passed,
				value: 		5
			});
		},

		testResponseTypeDocument: function(item) {
			if (!window.XMLHttpRequest) return;

			var xhr = new window.XMLHttpRequest();

			if (typeof xhr.responseType == 'undefined') return;

			var done = false;

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && !done) {
					done = true;
					passed = false;

					try {
						passed = !!(this.responseXML && this.responseXML.title && this.responseXML.title == "&&<");
					} catch(e) {
					}

					item.stopBackground();
					item.update({
						'passed': passed
					});
				}
			}

			try {
				item.startBackground();
				xhr.open("GET", "/detect.html?" + Math.random().toString(36).substr(2, 5));
				xhr.responseType = "document";
				xhr.send();
			} catch (e) {
				item.stopBackground();
			}
		},

		testResponseTypeText: function(item) {
			if (!window.XMLHttpRequest) return;

			var xhr = new window.XMLHttpRequest();

			if (typeof xhr.responseType == 'undefined') return;

			var done = false;

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && !done) {
					done = true;
					passed = false;

					try {
						passed = !!(this.responseText); // && this.responseText == '<title>&amp;&<</title>');
					} catch(e) {
					}

					item.stopBackground();
					item.update({
						'passed': passed
					});
				}
			}

			try {
				item.startBackground();
				xhr.open("GET", "/detect.html?" + Math.random().toString(36).substr(2, 5));
				xhr.responseType = "text";
				xhr.send();
			} catch (e) {
				item.stopBackground();
			}
		},

		testResponseTypeBlob: function(item) {
			if (!window.XMLHttpRequest || !window.Blob) return;

			var xhr = new window.XMLHttpRequest();

			if (typeof xhr.responseType == 'undefined') return;

			var done = false;

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && !done) {
					done = true;
					passed = false;

					try {
						passed = !!(this.response && this.response instanceof Blob);
					} catch(e) {
					}

					item.stopBackground();
					item.update({
						'passed': passed
					});
				}
			}

			try {
				item.startBackground();
				xhr.open("GET", "/detect.html?" + Math.random().toString(36).substr(2, 5));
				xhr.responseType = "blob";
				xhr.send();
			} catch (e) {
				item.stopBackground();
			}
		},

		testResponseTypeArrayBuffer: function(item) {
			if (!window.XMLHttpRequest || !window.ArrayBuffer) return;

			var xhr = new window.XMLHttpRequest();

			if (typeof xhr.responseType == 'undefined') return;

			var done = false;

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && !done) {
					done = true;
					passed = false;

					try {
						passed = !!(this.response && this.response instanceof ArrayBuffer);
					} catch(e) {
					}

					item.stopBackground();
					item.update({
						'passed': passed
					});
				}
			}

			try {
				item.startBackground();
				xhr.open("GET", "/detect.html?" + Math.random().toString(36).substr(2, 5));
				xhr.responseType = "arraybuffer";
				xhr.send();
			} catch (e) {
				item.stopBackground();
			}
		}
	};

	function testStreams (results) { this.initialize(results); }
	testStreams.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'streams'
			});

			this.section.setItem({
				id:			'streams.readable',
				passed:		'ReadableStream' in window,
				value: 		3
			});

			this.section.setItem({
				id:			'streams.writeable',
				passed:		'WriteableStream' in window,
				value: 		2
			});
		}
	};

	function testFiles (results) { this.initialize(results); }
	testFiles.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'files'
			});

			this.section.setItem({
				id:			'fileReader',
				passed:		'FileReader' in window,
				value: 		7
			});

			this.section.setItem({
				id:			'fileReader.blob',
				passed:		'Blob' in window,
				value: 		2
			});

			this.section.setItem({
				id:			'fileReader.dataURL',
				passed:		'FileReader' in window && 'readAsDataURL' in (new FileReader()),
				value: 		2
			});

			this.section.setItem({
				id:			'fileReader.arraybuffer',
				passed:		'FileReader' in window && 'readAsArrayBuffer' in (new FileReader()),
				value: 		2
			});

			this.section.setItem({
				id:			'fileReader.objectURL',
				passed:		'URL' in window && 'createObjectURL' in URL,
				value: 		2
			});

			this.section.setItem({
				id:			'fileSystem',
				passed:		!! window.requestFileSystem ? YES : !! window.webkitRequestFileSystem || !! window.mozRequestFileSystem || !! window.oRequestFileSystem || !! window.msRequestFileSystem ? YES | PREFIX : NO,
				value: 		0
			});

			this.section.setItem({
				id:			'getFileSystem',
				passed:		!! navigator.getFileSystem ? YES : !! navigator.webkitGetFileSystem || !! navigator.mozGetFileSystem || !! window.msGetFileSystem ? YES | PREFIX : NO,
				value: 		0
			});
		}
	};

	function testStorage (results) { this.initialize(results); }
	testStorage.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'storage'
			});


			/* Key-value storage */

			this.section.setItem({
				id:			'sessionStorage',
				passed:		'sessionStorage' in window && window.sessionStorage != null,
				value: 		5
			});

			var passed = false;
			try {
				passed = 'localStorage' in window && window.localStorage != null
			} catch(e) {
				/* If we get a security exception we know the feature exists, but cookies are disabled */
				if (e.name == 'NS_ERROR_DOM_SECURITY_ERR') {
					passed = true;
				}
			}

			this.section.setItem({
				id:			'localStorage',
				passed:		passed,
				value: 		5
			});



			/* IndexedDB */

			var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB || window.oIndexedDB || window.msIndexedDB;
			var passed = !! window.indexedDB ? YES : !! window.webkitIndexedDB || !! window.mozIndexedDB || !! window.moz_indexedDB || !! window.oIndexedDB || !! window.msIndexedDB ? YES | PREFIX : NO;
			if (indexedDB && ! 'deleteDatabase' in indexedDB) passed != BUGGY;

			this.section.setItem({
				id:			'indexedDB.basic',
				passed:		passed,
				value: 		21
			});

			var blobitem = this.section.setItem({
				id:			'indexedDB.blob',
				passed:		false,
				value: 		2
			});

			var arrayitem = this.section.setItem({
				id:			'indexedDB.arraybuffer',
				passed:		false,
				value: 		2
			});

			if (indexedDB && 'deleteDatabase' in indexedDB) {
				if (console && console.log) console.log('IndexedDB: starting tests');

				try {
					blobitem.startBackground();
					arrayitem.startBackground();

					if (console && console.log) console.log('IndexedDB: delete existing database (if exists)');
					var request = indexedDB.deleteDatabase('html5test');

					request.onerror = function(e) {
						if (console && console.log) console.log('IndexedDB: error, could not delete database', e);

						blobitem.stopBackground();
						arrayitem.stopBackground();
					};

					request.onsuccess = function () {
						var request = indexedDB.open('html5test', 1);
						if (console && console.log) console.log('IndexedDB: opening new database');

						request.onupgradeneeded = function() {
							if (console && console.log) console.log('IndexedDB: creating objectStore');
							request.result.createObjectStore("store");
						};

						request.onerror = function(event) {
							if (console && console.log) console.log('IndexedDB: error opening database', event);

							blobitem.stopBackground();
							arrayitem.stopBackground();
						};

						request.onsuccess = function() {
							if (console && console.log) console.log('IndexedDB: database opened');

							var db = request.result;

							try {
								db.transaction("store", "readwrite").objectStore("store").put(new Blob(), "key");

								if (console && console.log) console.log('IndexedDB: objectStore with Blob passed');

								blobitem.update({
									passed: true
								});
							} catch (e) {
								if (console && console.log) console.log('IndexedDB: objectStore with Blob failed');
							}

							try {
								db.transaction("store", "readwrite").objectStore("store").put(new ArrayBuffer(), "key");

								if (console && console.log) console.log('IndexedDB: objectStore with ArrayBuffer passed');

									arrayitem.update({
									passed: true
								});

							} catch (e) {
								if (console && console.log) console.log('IndexedDB: objectStore with ArrayBuffer failed');
							}

							blobitem.stopBackground();
							arrayitem.stopBackground();

							db.close();
							indexedDB.deleteDatabase('html5test');
						};
					};
				} catch (e) {
					if (console && console.log) console.log('IndexedDB: exception reached during test', e);

					blobitem.stopBackground();
					arrayitem.stopBackground();
				}
			}




			/* WebSQL */

			this.section.setItem({
				id:			'sqlDatabase',
				passed:		!!window.openDatabase,
				value: 		0,
				award:  	! indexedDB ? 5 : 0	/* only award points if IndexedDB is not implemented */
			});
		}
	};

	function testPerformance (results) { this.initialize(results); }
	testPerformance.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'performance'
			});

			this.section.setItem({
				id:			'worker',
				passed:		!!window.Worker,
				value: 		10
			});

			this.section.setItem({
				id:			'sharedWorker',
				passed:		!!window.SharedWorker,
				value: 		4
			});

			var group = this.section.getGroup({
				id:		'datatypes'
			});

			group.setItem({
				id:			'ArrayBuffer',
				passed:		typeof ArrayBuffer != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Int8Array',
				passed:		typeof Int8Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Uint8Array',
				passed:		typeof Uint8Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Uint8ClampedArray',
				passed:		typeof Uint8ClampedArray != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Int16Array',
				passed:		typeof Int16Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Uint16Array',
				passed:		typeof Uint16Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Int32Array',
				passed:		typeof Int32Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Uint32Array',
				passed:		typeof Uint32Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Float32Array',
				passed:		typeof Float32Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'Float64Array',
				passed:		typeof Float64Array != 'undefined',
				value: 		1
			});

			group.setItem({
				id:			'DataView',
				passed:		typeof DataView != 'undefined',
				value: 		1
			});
		}
	};

	function testOutput (results) { this.initialize(results); }
	testOutput.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'output'
			});

			this.section.setItem({
				id:			'requestFullScreen',
				passed:		!! document.documentElement.requestFullscreen ? YES : !! document.documentElement.webkitRequestFullScreen || !! document.documentElement.mozRequestFullScreen || !! document.documentElement.msRequestFullscreen ? YES | PREFIX : NO,
				value: 		5
			});


			/* W3C standard is "new Notification()", WebKit pre-standard is "window.webkitNotifications.createNotification()", Gecko pre-standard is "window.navigator.mozNotification.createNotification()" */
			this.section.setItem({
				id:			'notifications',
				passed:		'Notification' in window ? YES : 'webkitNotifications' in window || 'mozNotification' in window.navigator || 'oNotification' in window || 'msNotification' in window ? YES | PREFIX : NO,
				value: 		5
			});
		}
	};


	function testOther (results) { this.initialize(results); }
	testOther.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'other'
			});

			this.section.setItem({
				id:			'scoped',
				passed:		'scoped' in document.createElement('style'),
				value: 		2
			});

			this.section.setItem({
				id:			'async',
				passed:		'async' in document.createElement('script'),
				value: 		3
			});

			this.section.setItem({
				id:			'onerror',
				passed:		isEventSupported('error'),
				value: 		1
			});

			var executionevents = this.section.setItem({
				id:			'executionevents',
				passed:		false,
				value: 		1
			});

			executionevents.startBackground();

			var before = false;

			var s = document.createElement('script');
			s.src="data:text/javascript;charset=utf-8,window"

			s.addEventListener('beforescriptexecute', function() {
				before = true;
			}, true);

			s.addEventListener('afterscriptexecute', function() {
				if (before) {
					executionevents.update({
						passed: true
					});
				}

				executionevents.stopBackground();
			}, true);

			document.body.appendChild(s);

			window.setTimeout(function() {
				executionevents.stopBackground();
			}, 500);


			this.section.setItem({
				id:			'base64',
				passed:		'btoa' in window && 'atob' in window,
				value: 		1
			});

			this.section.setItem({
				id:			'json',
				passed:		'JSON' in window && 'parse' in JSON,
				value: 		1
			});

			this.section.setItem({
				id:   		'mutationObserver',
				passed:   	'MutationObserver' in window ? YES : 'WebKitMutationObserver' in window || 'MozMutationObserver' in window || 'oMutationObserver' in window || 'msMutationObserver' in window ? YES | PREFIX : NO,
				value:  	2
			});

			this.section.setItem({
				id:   		'url',
				passed:   	'URL' in window ? YES : 'WebKitURL' in window || 'MozURL' in window || 'oURL' in window || 'msURL' in window ? YES | PREFIX : NO,
				value:  	2
			});



			var passed = 'Promise' in window ? YES | OLD : NO;

			if ('Promise' in window &&
			    'resolve' in window.Promise &&
			    'reject' in window.Promise &&
			    'all' in window.Promise &&
			    'race' in window.Promise &&
			    (function() {
			      var resolve;
			      new window.Promise(function(r) { resolve = r; });
			      return typeof resolve === 'function';
			    }()))
			{
				passed = YES;
			}

			this.section.setItem({
				id:   		'promises',
				passed:   	passed,
				value:  	2
			});




			this.section.setItem({
				id:			'pagevisiblity',
				passed:		'visibilityState' in document ? YES : 'webkitVisibilityState' in document || 'mozVisibilityState' in document || 'oVisibilityState' in document || 'msVisibilityState' in document ? YES | PREFIX : NO,
				value: 		2
			});

			this.section.setItem({
				id:			'getSelection',
				passed:		!!window.getSelection,
				value: 		2
			});

			var element = document.createElement('div');

			this.section.setItem({
				id:			'scrollIntoView',
				passed:		!!element.scrollIntoView,
				value: 		1
			});

		}
	};


	function testAnimation (results) { this.initialize(results); }
	testAnimation.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'animation'
			});

			this.section.setItem({
				id:			'requestAnimationFrame',
				passed:		!! window.requestAnimationFrame ? YES : !! window.webkitRequestAnimationFrame || !! window.mozRequestAnimationFrame || !! window.msRequestAnimationFrame || !! window.oRequestAnimationFrame ? YES | PREFIX : NO,
				value: 		5
			});
		}
	};


	function testComponents (results) { this.initialize(results); }
	testComponents.prototype = {
		initialize: function(results) {
			this.section = results.getSection({
				id:		'components'
			});

			this.section.setItem({
				id:			'custom',
				passed:		'registerElement' in document,
				value: 		4
			});

			this.section.setItem({
				id:			'shadowdom',
				passed:		'createShadowRoot' in document.createElement('div') ? YES : 'webkitCreateShadowRoot' in document.createElement('div') ? YES | PREFIX : NO,
				value: 		2
			});

			var passed = false;

			try {
				passed = 'content' in document.createElement('template');
			} catch(error) {
			}

			this.section.setItem({
				id:			'template',
				passed:		passed,
				value: 		2
			});

			this.section.setItem({
				id:			'imports',
				passed:		'import' in document.createElement('link'),
				value: 		2
			});
		}
	};


	function test (callback, error) { this.initialize(callback, error); }
	test.prototype = {
		tests: [

			/* Semantics */						testParsing, testElements, testForm, testMicrodata,
			/* Offline & Storage */				testOffline, testStorage, testFiles, testStreams,
			/* Device Access */					testGeolocation, testOutput, testInput,
			/* Connectivity */					testCommunication, testWebRTC,
			/* Multimedia */					testVideo, testAudio,
			/* 3D, Graphics & Effects */		testResponsive, testCanvas, testWebGL, testAnimation,
			/* Performance & Integration */		testInteraction, testPerformance, testSecurity, testHistory, testComponents,

			testOther
		],

		initialize: function(callback, error) {
			blacklists = {
				'form.file':						Browsers.isDevice('Xbox 360') || Browsers.isDevice('Xbox One') || Browsers.isDevice('Playstation 4') || Browsers.isOs('Windows Phone', '<', '8.1') || Browsers.isOs('iOS', '<', '6')  || Browsers.isOs('Android', '<', '2.2'),
				'form.date.ui':						Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('Maxthon', '<', '4.0.5') || Browsers.isBrowser('UC Browser', '<', '8.6'),
				'form.month.ui':					Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('Maxthon', '<', '4.0.5') || Browsers.isBrowser('UC Browser', '<', '8.6'),
				'form.week.ui':						Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('Maxthon', '<', '4.0.5') || Browsers.isBrowser('UC Browser', '<', '8.6'),
				'form.time.ui':						Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('Maxthon', '<', '4.0.5') || Browsers.isBrowser('UC Browser', '<', '8.6'),
				'form.datetime-local.ui':			Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('Maxthon', '<', '4.0.5') || Browsers.isBrowser('UC Browser', '<', '8.6'),
				'form.color.ui':					Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('UC Browser', '<', '9.8'),
				'form.range.ui':					Browsers.isBrowser('UC Browser', '<', '9.8'),
				'form.progress.element':			Browsers.isBrowser('Baidu Browser'),
				'files.fileSystem':					Browsers.isOs('BlackBerry Tablet OS'),
				'input.getUserMedia':				Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('UC Browser', '<', '9.8') || Browsers.isBrowser('Dolphin'),
				'location.geolocation':				Browsers.isDevice('Xbox 360') || Browsers.isDevice('Xbox One') || Browsers.isBrowser('Baidu Browser'),
				'location.orientation':				Browsers.isBrowser('Baidu Browser'),
				'output.notifications':				Browsers.isBrowser('Opera', '=', '18') || Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer'),
				'output.requestFullScreen':			Browsers.isBrowser('Sogou Explorer') || Browsers.isOs('BlackBerry Tablet OS') || Browsers.isOs('BlackBerry OS'),
				'video.subtitle':					Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer'),
				'webgl.context':					Browsers.isBrowser('Baidu Browser'),

				'interaction.dragdrop':				!(  Browsers.isType('desktop') ||
														Browsers.isType('mobile', 'tablet', 'media') && (
															Browsers.isBrowser('Opera') && Browsers.isEngine('Presto')
														) ||
														Browsers.isType('television') && (
															Browsers.isDevice('webOS TV')
														)
													),

				'interaction.editing':				!(	Browsers.isType('desktop') ||
														Browsers.isType('mobile', 'tablet', 'media') && (
															Browsers.isOs('iOS', '>=', '5') ||
															Browsers.isOs('Android', '>=', '4') ||
															Browsers.isOs('Windows Phone', '>=', '7.5') ||
															Browsers.isOs('BlackBerry') ||
															Browsers.isOs('BlackBerry OS') ||
															Browsers.isOs('BlackBerry Tablet OS') ||
															Browsers.isOs('Meego') ||
															Browsers.isOs('Tizen') ||
															Browsers.isEngine('Gecko') ||
															Browsers.isEngine('Presto') ||
															Browsers.isBrowser('Chrome') ||
															Browsers.isBrowser('Polaris', '>=', '8')
														) ||
														Browsers.isType('television') && (
															Browsers.isOs('Tizen') ||
															Browsers.isDevice('webOS TV') ||
															Browsers.isBrowser('Espial') ||
															Browsers.isBrowser('MachBlue XT') ||
															Browsers.isEngine('Presto', '>=', '2.9')
														) ||
														Browsers.isType('gaming') && (
															Browsers.isDevice('Xbox 360') ||
															Browsers.isDevice('Xbox One') ||
															Browsers.isDevice('Playstation 4')
														)
													)
			};

			try {
				this.backgroundTasks = [];
				this.backgroundIds = {};
				this.backgroundId = 0;

				this.callback = callback;

				this.results = new results(this);

				for (var s = 0; s < this.tests.length; s++) {
					new (this.tests[s])(this.results);
				}

				this.waitForBackground();
			}
			catch(e) {
				error(e);
			}
		},

		waitForBackground: function() {
			var that = this;

			window.setTimeout(function() {
				that.checkForBackground.call(that);
			}, 300);
		},

		checkForBackground: function() {
			var running = 0;
			for (var task = 0; task < this.backgroundTasks.length; task++) { running += this.backgroundTasks[task] }

			if (running) {
				this.waitForBackground();
			} else {
				this.finished();
			}
		},

		startBackground: function(id) {
			var i = this.backgroundId++;
			this.backgroundIds[id] = i;
			this.backgroundTasks[i] = 1;
		},

		stopBackground: function(id) {
			this.backgroundTasks[this.backgroundIds[id]] = 0;
		},

		finished: function() {
			var results = [], points = [];

			collectResults(0, '', this.results);
			function collectResults(level, prefix, data) {
				if (data.items) {
					for (var i = 0; i < data.items.length; i++) {
						if (level == 0) points.push(data.items[i].data.id + '=' + data.items[i].points + '/' + data.items[i].max);
						if (typeof data.items[i].data.passed != 'undefined') results.push(prefix + data.items[i].data.id + '=' + (+data.items[i].data.passed));
						if (data.items[i].items) {
							collectResults(level + 1, prefix + data.items[i].data.id + '-', data.items[i]);
						}
					}
				}
			}

			var uniqueid = (((1+Math.random())*0x1000000)|0).toString(16).substring(1) + ("0000000000" + (new Date().getTime() - new Date(2010,0,1).getTime()).toString(16)).slice(-10);

			this.callback({
				release:	release,
				uniqueid:	uniqueid,
				score:		this.results.points,
				results:	results.join(','),
				points:		points.join(','),
				maximum:	this.results.max
			});
		}
	};

	return test;
})();
