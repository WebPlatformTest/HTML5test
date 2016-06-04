
Test8 = (function() {			
	
	var revision = 0;
	
	var NO = 0, 
		YES = 1, 
		OLD = 2, 
		BUGGY = 4, 
		PREFIX = 8, 
		BLOCKED = 16,
		DISABLED = 32,	
		UNCONFIRMED = 64;	
	
	var blacklists = [];
	
	


	function results (parent) { this.initialize(parent); }
	results.prototype = {
		initialize: function(parent) {
			this.parent = parent;
			this.items = [];
		},
		
		setItem: function(result) {
			var i = new item(this, result);
			this.items.push(i);
			return i;
		},

		startBackground: function(key) {
			this.parent.startBackground(key);
		},
		
		stopBackground: function(key) {
			this.parent.stopBackground(key);
		},
		
		toString: function() {
			var results = [];
			
			for (var i = 0; i < this.items.length; i++) {
				if (typeof this.items[i].data.passed != 'undefined') results.push(this.items[i].data.key + '=' + (+this.items[i].data.passed));
			}
			
			return results.join(',');
		}
	};

	function item (parent, data) { this.initialize(parent, data); }
	item.prototype = {
		initialize: function(parent, data) {
			this.parent = parent;
			this.data = data;

			if (typeof this.data.passed == 'undefined') this.data.passed = false;

			if (this.data.passed) {
				var blacklist = this.isOnBlacklist();
				if (blacklist) {
					this.data.passed = blacklist;
				}
			}
		},
		
		update: function(data) {
			for (var key in data) {
				this.data[key] = data[key];
			}

			if (typeof this.data.passed == 'undefined') this.data.passed = false;

			if (this.data.passed) {
				var blacklist = this.isOnBlacklist();
				if (blacklist) {
					this.data.passed = blacklist;
				}
			}
		},
		
		isOnBlacklist: function() {
			var part = '';
			var parts = this.data.key.split('.');
			for (var i = 0; i < parts.length; i++) {
				part += (i == 0 ? '' : '.') + parts[i];

				for (var k = 0; k < blacklists.length; k++) {
					if (typeof blacklists[k][1][part] != 'undefined') {
						if (blacklists[k][1][part]) {
							if (console && console.log) console.log('BLOCKED TEST: ' + part + '!');
							return blacklists[k][0];
						}
					}
				}
			}
			
			return false;
		},
			
		startBackground: function() {
			this.parent.startBackground(this.data.key);
		},
		
		stopBackground: function() {
			this.parent.stopBackground(this.data.key);
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
			results.setItem({
				key:	'parsing-doctype',
				passed:	document.compatMode == 'CSS1Compat'
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

			results.setItem({
				key:	'parsing-tokenizer',
				passed:	result
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

			results.setItem({
				key:	'parsing-tree',
				passed:	result
			});

			var e = document.createElement('div');
			e.innerHTML = '<svg></svg>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/2000/svg';
			
			results.setItem({
				key:	'parsing-svg',
				passed:	passed
			});

			var e = document.createElement('div');
			e.innerHTML = '<math></math>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/1998/Math/MathML';
			
			results.setItem({
				key:	'parsing-mathml',
				passed:	passed
			});
		}
	};
	
	
	function testResponsive (results) { this.initialize(results); }			
	testResponsive.prototype = {
		initialize: function(results) {
			results.setItem({
				key:	'responsive-picture',
				passed:	'HTMLPictureElement' in window
			});

			results.setItem({
				key:	'responsive-srcset',
				passed:	'srcset' in document.createElement('img')
			});

			results.setItem({
				key:	'responsive-sizes',
				passed:	'sizes' in document.createElement('img')
			});
		}
	};

							
	function testCanvas (results) { this.initialize(results); }			
	testCanvas.prototype = {
		initialize: function(results) {
			this.canvas = document.createElement('canvas');

			results.setItem({
				key:	'canvas-context',
				passed:	!! (this.canvas.getContext && typeof CanvasRenderingContext2D != 'undefined' && this.canvas.getContext('2d') instanceof CanvasRenderingContext2D)
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').fillText == 'function';
				}
				catch(e) {
				}
			}
			
			results.setItem({
				key:	'canvas-text',
				passed:	passed
			});


			results.setItem({
				key:	'canvas-path',
				passed:	typeof Path2D != "undefined" ? YES : typeof Path != "undefined" ? YES | OLD : NO
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').ellipse != 'undefined';
				}
				catch(e) {
				}
			}
			
			results.setItem({
				key:	'canvas-ellipse',
				passed:	passed
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').setLineDash != 'undefined';
				}
				catch(e) {
				}
			}
			
			results.setItem({
				key:	'canvas-dashed',
				passed:	passed
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').drawFocusIfNeeded != 'undefined';
				}
				catch(e) {
				}
			}
			
			results.setItem({
				key:	'canvas-focusring',
				passed:	passed
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = typeof this.canvas.getContext('2d').addHitRegion != 'undefined';
				}
				catch(e) {
				}
			}
			
			results.setItem({
				key:	'canvas-hittest',
				passed:	passed
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
			
			results.setItem({
				key:	'canvas-blending',
				passed:	passed
			});
			
			
			
			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/png').substring(5,14) == 'image/png';
				}
				catch(e) {
				}
			}


			results.setItem({
				key:	'canvas-png',
				passed:	passed
			});

			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/jpeg').substring(5,15) == 'image/jpeg';
				}
				catch(e) {
				}
			}

			results.setItem({
				key:	'canvas-jpeg',
				passed:	passed
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/vnd.ms-photo').substring(5,23) == 'image/vnd.ms-photo';
				}
				catch(e) {
				}
			}

			results.setItem({
				key:	'canvas-jpegxr',
				passed:	passed
			});


			var passed = false;
			if (this.canvas.getContext) {
				try {
					passed = this.canvas.toDataURL('image/webp').substring(5,15) == 'image/webp';
				}
				catch(e) {
				}
			}

			results.setItem({
				key:	'canvas-webp',
				passed:	passed
			});
		}
	};

							
	function testVideo (results) { this.initialize(results); }			
	testVideo.prototype = {
		initialize: function(results) {
			this.element = document.createElement('video');

			results.setItem({
				key:	'video-element',
				passed:	!!this.element.canPlayType
			});

			results.setItem({
				key:	'video-audiotracks',
				passed:	'audioTracks' in this.element
			});
			
			results.setItem({
				key:	'video-videotracks',
				passed:	'videoTracks' in this.element
			});
			
			results.setItem({
				key:	'video-subtitle',
				passed:	'track' in document.createElement('track')
			});
			
			results.setItem({
				key:	'video-poster',
				passed:	'poster' in this.element
			});


			results.setItem({
				key:	'video-drm',
				passed:	'setMediaKeys' in this.element ? YES : 'webkitAddKey' in this.element || 'webkitSetMediaKeys' in this.element || 'mozSetMediaKeys' in this.element || 'msSetMediaKeys' in this.element ? YES | PREFIX : NO
			});

			results.setItem({
				key:	'video-mediasource',
				passed:	'MediaSource' in window ? YES : 'WebKitMediaSource' in window || 'mozMediaSource' in window || 'msMediaSource' in window ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'video-recorder',
				passed:		'MediaRecorder' in window
			});


			/* I added a workaround for IE9, which only detects H.264 if you also provide an audio codec. Bug filed @ connect.microsoft.com */
			var item = {
				key:	'video-mpeg4',
				passed:	!!this.element.canPlayType && this.canPlayType('video/mp4; codecs="mp4v.20.8"')
			};
			
			results.setItem(item);
		
			var item = {
				key:	'video-h264',
				passed:	!!this.element.canPlayType && (this.canPlayType('video/mp4; codecs="avc1.42E01E"') || this.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))				
			};
			
			results.setItem(item);

			var item = {
				key:	'video-h265',
				passed:	!!this.element.canPlayType && (this.canPlayType('video/mp4; codecs="hvc1.1.L0.0"') || this.canPlayType('video/mp4; codecs="hev1.1.L0.0"'))
			};
			
			results.setItem(item);

			var item = {
				key:	'video-theora',
				passed:	!!this.element.canPlayType && this.canPlayType('video/ogg; codecs="theora"')
			};
			
			results.setItem(item);

			var item = {
				key:	'video-webmvp8',
				passed:	!!this.element.canPlayType && this.canPlayType('video/webm; codecs="vp8"')
			};
			
			results.setItem(item);

			var item = {
				key:	'video-webmvp9',
				passed:	!!this.element.canPlayType && this.canPlayType('video/webm; codecs="vp9"')
			};
			
			results.setItem(item);
		
		
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
				key:	'video-canplaytype',
				passed:	this.element.canPlayType ? (passed ? YES : YES | BUGGY) : NO
			};
		
			results.setItem(item);
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
			this.element = document.createElement('audio');
			
			results.setItem({
				key:	'audio-element',
				passed:	!!this.element.canPlayType
			});
			
			results.setItem({
				key:	'audio-loop',
				passed:	'loop' in this.element
			});

			results.setItem({
				key:	'audio-preload',
				passed:	'preload' in this.element
			});

			var item = {
				key:	'audio-pcm',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/wav; codecs="1"')
			};
			
			results.setItem(item);

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
				key:	'audio-mp3',
				passed:	r
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-aac',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/mp4; codecs="mp4a.40.2"')
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-ac3',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/mp4; codecs="ac-3"')
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-ec3',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/mp4; codecs="ec-3"')
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-vorbis',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/ogg; codecs="vorbis"') 
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-opus',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/ogg; codecs="opus"') 
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-webm',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/webm; codecs="vorbis"') 
			};
			
			results.setItem(item);

			var item = {
				key:	'audio-webmopus',
				passed:	!!this.element.canPlayType && this.canPlayType('audio/webm; codecs="opus"') 
			};
			
			results.setItem(item);


			results.setItem({
				key:		'audio-webaudio',
				passed:		'AudioContext' in window ? YES : 'webkitAudioContext' in window || 'mozAudioContext' in window || 'oAudioContext' in window || 'msAudioContext' in window ? YES | PREFIX : NO
			});


			results.setItem({
				key:		'audio-speechrecognition',
				passed:		'SpeechRecognition' in window ? YES : 'webkitSpeechRecognition' in window || 'mozSpeechRecognition' in window || 'oSpeechRecognition' in window || 'msSpeechRecognition' in window ? YES | PREFIX : NO
			});


			var speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis || window.mozSpeechSynthesis || window.oSpeechSynthesis || window.msSpeechSynthesis; 
			var available = 'speechSynthesis' in window ? YES : 'webkitSpeechSynthesis' in window || 'mozSpeechSynthesis' in window || 'oSpeechSynthesis' in window || 'msSpeechSynthesis' in window ? YES | PREFIX : NO;
			var voices = speechSynthesis ? speechSynthesis.getVoices().length : 0;
			
			var speechItem = results.setItem({
				key:		'audio-speechsynthesis',
				passed:		speechSynthesis && voices ? available : NO
			});
			
			if (speechSynthesis && !voices) {
				if (speechSynthesis.addEventListener) {
					
					speechItem.startBackground();
					
					speechSynthesis.addEventListener("voiceschanged", function() {
						voices = speechSynthesis.getVoices().length;
	
						speechItem.update({
							passed: voices ? available : NO, 
						});
	
						speechItem.stopBackground();
					});
					
					window.setTimeout(function() {
						speechItem.stopBackground();
					}, 1000);
				}
			}
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
			var webrtc = !!window.RTCPeerConnection ? YES : !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection || !!window.msRTCPeerConnection || !!window.oRTCPeerConnection ? YES | PREFIX : NO;
			var objectrtc = !!window.RTCIceTransport ? YES : !!window.webkitRTCIceTransport || !!window.mozRTCIceTransport || !!window.msRTCIceTransport || !!window.oRTCIceTransport ? YES | PREFIX : NO;
			
			results.setItem({
				key:	'webrtc-webrtc',
				passed:	webrtc
			});
			
			results.setItem({
				key:	'webrtc-objectrtc',
				passed:	objectrtc
			});
			
			var passed = false;
			try {
				o = new (window.RTCPeerConnection || window.msRTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)(null);
				passed = 'createDataChannel' in o;
			}
			catch(e) {
			}
			
			results.setItem({
				key:	'webrtc-datachannel',
				passed:	passed ? (window.RTCPeerConnection ? YES : YES | PREFIX) : NO
			});
		}
	};

	function testInput (results) { this.initialize(results); }			
	testInput.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'input-getUserMedia',
				passed:		!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia ? YES : !!navigator.getUserMedia ? YES | OLD : !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia || !!navigator.msGetUserMedia || !!navigator.oGetUserMedia ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'input-getGamepads',
				passed:		!!navigator.getGamepads ? YES : !!navigator.webkitGetGamepads || !!navigator.mozGetGamepads || !!navigator.msGetGamepads || !!navigator.oGetGamepads ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'input-pointerLock',
				passed:  	'pointerLockElement' in document ? YES : 'oPointerLockElement' in document || 'msPointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'input-pointerevents',
				passed:		!!window.PointerEvent ? YES : !!window.webkitPointerEvent || !!window.mozPointerEvent || !!window.msPointerEvent || !!window.oPointerEvent ? YES | PREFIX : NO
			});
		}
	};


	function testElements (results) { this.initialize(results); }			
	testElements.prototype = {
		initialize: function(results) {
			var element = document.createElement('div');
			element.setAttribute('data-test', 'test');
			
			results.setItem({
				key:	'elements-dataset',
				passed:	'dataset' in element
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
				
				results.setItem({
					key:	'elements-section-' + elements[e],
					passed:	passed, 
					value: 	1
				});
			}

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

				results.setItem({
					key:	'elements-grouping-' + elements[e],
					passed:	passed
				});
			}


			var element = document.createElement('ol');
			results.setItem({
				key:	'elements-grouping-ol',
				passed:	'reversed' in element
			});

			var element = document.createElement('a');
			results.setItem({
				key:	'elements-semantic-download',
				passed:	'download' in element
			});
			
			results.setItem({
				key:	'elements-semantic-ping',
				passed:	'ping' in element
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

			results.setItem({
				key:	'elements-semantic-mark',
				passed:	passed
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
			
			results.setItem({
				key:	'elements-semantic-ruby',
				passed:	rubySupport && rtSupport && rpSupport
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

			results.setItem({
				key:	'elements-semantic-time',
				passed:	passed
			});
			

			var passed = false;

			try { 
				var element = document.createElement('data');
	
				try { 
					passed = typeof HTMLDataElement != 'undefined' && element instanceof HTMLDataElement;
				} catch(error) {
				}
			} catch(error) {
			}

			results.setItem({
				key:	'elements-semantic-data',
				passed:	passed
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

			results.setItem({
				key:	'elements-semantic-wbr',
				passed:	passed
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

			results.setItem({
				key:	'elements-interactive-details',
				passed:	passed
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

			results.setItem({
				key:	'elements-interactive-summary',
				passed:	passed
			});


			var passed = legacy = false;

			try { 
				var element = document.createElement('menu');
				document.body.appendChild(element);
	
				try { 
					 legacy = typeof HTMLMenuElement != 'undefined' && element instanceof HTMLMenuElement && 'type' in element;
				} catch(error) {
				}
	
				// Check default type
				if (legacy && element.type != 'list') legacy = false;	
				
				// Check type sanitization
				try {
					element.type = 'foobar';
				} catch(error) {
				}
				
				if (legacy && element.type == 'foobar') legacy = false;	
	
				// Check if correct type sticks
				try {
					element.type = 'list';
				} catch(error) {
					legacy = false;
				}
	
				if (legacy && element.type != 'list') legacy = false;	

				document.body.removeChild(element);					
			} catch(error) {
			}

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

			results.setItem({
				key:	'elements-interactive-menutoolbar',
				passed:	passed ? YES : legacy ? YES | OLD : NO
			});



			var passed = legacy = false;

			try { 
				var element = document.createElement('menu');
				document.body.appendChild(element);
	
				try { 
					legacy = typeof HTMLMenuElement != 'undefined' && element instanceof HTMLMenuElement && 'type' in element;
				} catch(error) {
				}
	
				// Check if correct type sticks
				try {
					element.type = 'context';
				} catch(error) {
					legacy = false;
				}
	
				if (legacy && element.type != 'context') legacy = false;	
	
	
				if (legacy) {
					var item = document.createElement('menuitem');
					element.appendChild(item);
					
					if (typeof HTMLMenuItemElement == 'undefined' || ! item instanceof HTMLMenuItemElement) legacy = false;
				}

				document.body.removeChild(element);					
			} catch(error) {
			}
			
			try { 
				var element = document.createElement('menu');
				document.body.appendChild(element);
	
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

			results.setItem({
				key:	'elements-interactive-menupopup',
				passed:	passed ? YES : legacy ? YES | OLD : NO
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
			
			results.setItem({
				key:	'elements-interactive-dialog',
				passed:	passed
			});
			
			
			var element = document.createElement('div');
			
			results.setItem({
				key:	'elements-hidden',
				passed:	'hidden' in element
			});

			var element = document.createElement('div');

			results.setItem({
				key:	'elements-dynamic-outerHTML',
				passed:	!!('outerHTML' in element)
			});
				
			results.setItem({
				key:	'elements-dynamic-insertAdjacentHTML',
				passed:	!!('insertAdjacentHTML' in element)
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
			var element = this.createInput('text');
			var baseline = { field: getRenderedStyle(element.field), wrapper: getRenderedStyle(element.wrapper) };
			this.removeInput(element);
			
			
			/* input type=text */
			
			var element = this.createInput('text');
			
			results.setItem({
				key:		'form-text-element',
				passed:		element.field.type == 'text'
			});
			
			results.setItem({
				key:		'form-text-selection',
				passed:		'selectionDirection' in element.field
			});
			
			this.removeInput(element);
			
			
			/* input type=search */
			
			var element = this.createInput('search');
			
			results.setItem({
				key:		'form-search-element',
				passed:		element.field.type == 'search'
			});
			
			this.removeInput(element);
			
			
			/* input type=tel */
			
			var element = this.createInput('tel');
			
			results.setItem({
				key:		'form-tel-element',
				passed:		element.field.type == 'tel'
			});
			
			this.removeInput(element);
			
			
			/* input type=url */
			
			var element = this.createInput('url');
			
			var validation = false;
			if ('validity' in element.field) {
				validation = true;
				
				element.field.value = "foo";
				validation &= !element.field.validity.valid
						
				element.field.value = "http://foo.org";
				validation &= element.field.validity.valid
			}
			
			results.setItem({
				key:		'form-url-element',
				passed:		element.field.type == 'url'
			});
			
			results.setItem({
				key:		'form-url-validation',
				passed:		validation
			});
			
			this.removeInput(element);
			
			
			/* input type=email */
			
			var element = this.createInput('email');
													
			var validation = false;
			if ('validity' in element.field) {
				validation = true;
				
				element.field.value = "foo";
				validation &= !element.field.validity.valid

				element.field.value = "foo@bar.org";
				validation &= element.field.validity.valid
			}
			
			results.setItem({
				key:		'form-email-element',
				passed:		element.field.type == 'email'
			});
			
			results.setItem({
				key:		'form-email-validation',
				passed:		validation
			});
			
			this.removeInput(element);
			
			
			/* input type=date, month, week, time, datetime and datetime-local */
			
			var types = ['date', 'month', 'week', 'time', 'datetime', 'datetime-local'];
			for (var t = 0; t < types.length; t++) {
				var element = this.createInput(types[t]);
				
				element.field.value = "foobar";							
				var sanitization = element.field.value == '';
				
				var minimal = element.field.type == types[t];

				results.setItem({
					key:		'form-' + types[t] + '-element',
					passed:		minimal
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-ui',
					passed:		minimal && sanitization, 	// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
				});

				results.setItem({
					key:		'form-' + types[t] + '-sanitization',
					passed:		minimal && sanitization
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-min',
					passed:		minimal && 'min' in element.field
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-max',
					passed:		minimal && 'max' in element.field
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-step',
					passed:		minimal && 'step' in element.field
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepDown',
					passed:		minimal && 'stepDown' in element.field
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepUp',
					passed:		minimal && 'stepUp' in element.field
				});
				
				if (t != 'datetime-local' && t != 'datetime') {
					results.setItem({
						key:		'form-' + types[t] + '-valueAsDate',
						passed:		minimal && 'valueAsDate' in element.field
					});
				}
				
				results.setItem({
					key:		'form-' + types[t] + '-valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element.field
				});

				this.removeInput(element);
			}
			
			
			/* input type=number, range */
			
			var types = ['number', 'range'];
			for (var t = 0; t < types.length; t++) {
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
				
				results.setItem({
					key:		'form-' + types[t] + '-element',
					passed:		minimal
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-ui',
					passed:		minimal && sanitization,		// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
				});

				results.setItem({
					key:		'form-' + types[t] + '-sanitization',
					passed:		minimal && sanitization
				});
				
				if (types[t] != 'range') {
					results.setItem({
						key:		'form-' + types[t] + '-validation',
						passed:		minimal && validation
					});
				}

				results.setItem({
					key:		'form-' + types[t] + '-min',
					passed:		minimal && 'min' in element.field
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-max',
					passed:		minimal && 'max' in element.field
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-step',
					passed:		minimal && 'step' in element.field
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepDown',
					passed:		minimal && 'stepDown' in element.field
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepUp',
					passed:		minimal && 'stepUp' in element.field
				});
				
				results.setItem({
					key:		'form-' + types[t] + '-valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element.field
				});

				this.removeInput(element);
			}					
			
			
			/* input type=color */
			
			var element = this.createInput('color');
									
			element.field.value = "foobar";					
			var sanitization = element.field.value != 'foobar';

			results.setItem({
				key:		'form-color-element',
				passed:		element.field.type == 'color'
			});
			
			results.setItem({
				key:		'form-color-ui',
				passed:		sanitization,		// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
			});
				
			results.setItem({
				key:		'form-color-sanitization',
				passed:		sanitization
			});
				
			this.removeInput(element);
			
			
			
			/* input type=checkbox */
			
			var element = this.createInput('checkbox');
			
			results.setItem({
				key:		'form-checkbox-element',
				passed:		element.field.type == 'checkbox'
			});

			results.setItem({
				key:		'form-checkbox-indeterminate',
				passed:		'indeterminate' in element.field
			});

			this.removeInput(element);
			

			/* input type=image */
			
			var element = this.createInput('image');
			element.field.style.display = 'inline-block';
			
			var supportsWidth = 'width' in element.field;
			var supportsHeight = 'height' in element.field;
			
			element.field.setAttribute('width', '100');
			element.field.setAttribute('height', '100');
			
			results.setItem({
				key:		'form-image-element',
				passed:		element.field.type == 'image'
			});

			results.setItem({
				key:		'form-image-width',
				passed:		supportsWidth && element.field.offsetWidth == 100
			});

			results.setItem({
				key:		'form-image-height',
				passed:		supportsHeight && element.field.offsetHeight == 100
			});
			
			this.removeInput(element);
			

			/* input type=file */
			
			var element = this.createInput('file');
			
			results.setItem({
				key:		'form-file-element',
				passed:		element.field.type == 'file'
			});

			results.setItem({
				key:		'form-file-files',
				passed:		element.field.files && element.field.files instanceof FileList
			});

			results.setItem({
				key:		'form-file-directory',
				passed:		'directory' in element.field && window.Directory
			});

			this.removeInput(element);
			

			/* textarea */
			
			var element = document.createElement('textarea');

			var passed = false;
			try { 
				passed = typeof HTMLTextAreaElement != 'undefined' && element instanceof HTMLTextAreaElement;
			} catch(error) {
			}

			results.setItem({
				key:		'form-textarea-element',
				passed:		passed
			});

			results.setItem({
				key:		'form-textarea-maxlength',
				passed:		'maxLength' in element
			});

			results.setItem({
				key:		'form-textarea-wrap',
				passed:		'wrap' in element
			});


			/* select */
			
			var element = document.createElement('select');

			var passed = false;
			try { 
				passed = typeof HTMLSelectElement != 'undefined' && element instanceof HTMLSelectElement;
			} catch(error) {
			}

			results.setItem({
				key:		'form-select-element',
				passed:		passed
			});

			results.setItem({
				key:		'form-select-required',
				passed:		'required' in element
			});


			/* fieldset */
			
			var element = document.createElement('fieldset');

			var passed = false;
			try { 
				passed = typeof HTMLFieldSetElement != 'undefined' && element instanceof HTMLFieldSetElement;
			} catch(error) {
			}

			results.setItem({
				key:		'form-fieldset-element',
				passed:		passed
			});

			results.setItem({
				key:		'form-fieldset-elements',
				passed:		'elements' in element
			});

			results.setItem({
				key:		'form-fieldset-disabled',
				passed:		'disabled' in element
			});


			/* datalist */
			
			var passed = false;
			
			try { 
				var element = document.createElement('datalist');
			
				try { 
					passed = (typeof HTMLDataListElement != 'undefined' && element instanceof HTMLDataListElement) || element.childNodes.length;
				} catch(error) {
				}
			} catch(error) {
			}

			results.setItem({
				key:		'form-datalist-element',
				passed:		passed
			});

			var element = document.createElement('input');

			results.setItem({
				key:		'form-datalist-list',
				passed:		!!("list" in element)
			});


			/* keygen */
			
			var element = document.createElement('div');
			element.innerHTML = '<keygen>';
			
			var passed = false;
			try { 
				passed = typeof HTMLKeygenElement != 'undefined' && element.firstChild instanceof HTMLKeygenElement && 'challenge' in element.firstChild && 'keytype' in element.firstChild;
			} catch(error) {
			}

			results.setItem({
				key:		'form-keygen-element',
				passed:		passed
			});

			results.setItem({
				key:		'form-keygen-challenge',
				passed:		element.firstChild && 'challenge' in element.firstChild
			});
				
			results.setItem({
				key:		'form-keygen-keytype',
				passed:		element.firstChild && 'keytype' in element.firstChild
			});
				
			
			
			/* output */
			
			var passed = false;

			try { 
				var element = document.createElement('output');
	
				try { 
					passed = typeof HTMLOutputElement != 'undefined' && element instanceof HTMLOutputElement;
				} catch(error) {
				}
			} catch(error) {
			}

			results.setItem({
				key:		'form-output-element',
				passed:		passed
			});


			/* progress */
			
			var passed = false;

			try { 
				var element = document.createElement('progress');
	
				try { 
					passed = typeof HTMLProgressElement != 'undefined' && element instanceof HTMLProgressElement;
				} catch(error) {
				}
			} catch(error) {
			}

			results.setItem({
				key:		'form-progress-element',
				passed:		passed
			});
			
			
			/* meter */
			
			var passed = false;

			try { 
				var element = document.createElement('meter');
	
				try { 
					passed = typeof HTMLMeterElement != 'undefined' && element instanceof HTMLMeterElement;
				} catch(error) {
				}
			} catch(error) {
			}

			results.setItem({
				key:		'form-meter-element',
				passed:		passed
			});

			var element = document.createElement('input');

			var props = 'pattern required'.split(' ');
			
			for (var p = 0; p < props.length; p++) {
				results.setItem({
					key:		'form-validation-' + props[p],
					passed:		!!(props[p] in element)
				});
			}

			var field = document.createElement('input');
			field.id = "a";
			document.body.appendChild(field);

			var label = document.createElement("label");
			label.setAttribute('for', 'a');
			document.body.appendChild(label);
			
			results.setItem({
				key:		'form-association-control',
				passed:		label.control == field
			});
			
			document.body.removeChild(field);
			document.body.removeChild(label);
			
			var element = document.createElement('div');
			document.body.appendChild(element);
			element.innerHTML = '<form id="form"></form><input form="form">';
			results.setItem({
				key:		'form-association-form',
				passed:		element.lastChild.form == element.firstChild
			});
			document.body.removeChild(element);

			var props = 'formAction formEnctype formMethod formNoValidate formTarget'.split(' ');
			
			var element = document.createElement('input');

			for (var p = 0; p < props.length; p++) {
				results.setItem({
					key:		'form-association-' + props[p],
					passed:		!!(props[p] in element)
				});
			}

			var element = document.createElement('input');
			document.body.appendChild(element);
			element.id = "testFormInput";

			var label = document.createElement("label");
			label.setAttribute('for', 'testFormInput');
			document.body.appendChild(label);
			results.setItem({
				key:		'form-association-labels',
				passed:		(!!element.labels && element.labels.length == 1 && element.labels[0] == label)
			});
			
			document.body.removeChild(label);
			document.body.removeChild(element);
			
			var element = document.createElement('input');

			results.setItem({
				key:		'form-other-autofocus',
				passed:		!!('autofocus' in element)
			});

			var props = 'autocomplete placeholder multiple dirName'.split(' ');
				
			for (var p = 0; p < props.length; p++) {
				var prop = props[p].toLowerCase();
				results.setItem({
					key:		'form-other-' + prop,
					passed:		!!(props[p] in element)
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
			
			for (var i = 0; i < selectors.length; i++) {
				results.setItem({
					key:		'form-selectors-' + selectors[i],
					passed:		res[i]
				});
			}


			var inputItem = results.setItem({
				key:		'form-events-oninput',
				passed:		isEventSupported('input')
			});

			var changeItem = results.setItem({
				key:		'form-events-onchange',
				passed:		isEventSupported('change')
			});

			var invalidItem = results.setItem({
				key:		'form-events-oninvalid',
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

			var element = document.createElement('form');
			
			results.setItem({
				key:		'form-formvalidation-checkValidity',
				passed:		'checkValidity' in element
			});
			
			results.setItem({
				key:		'form-formvalidation-noValidate',
				passed:		'noValidate' in element
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

			/* Drag and drop */
			var element = document.createElement('div');
			
			results.setItem({
				key:		'interaction-dragdrop.attributes-draggable',
				passed:		'draggable' in element
			});

			results.setItem({
				key:		'interaction-dragdrop.attributes-dropzone',
				passed:		'dropzone' in element ? YES : 'webkitdropzone' in element || 'mozdropzone' in element || 'msdropzone' in element || 'odropzone' in element ? YES | PREFIX : NO
			});

			
			/* We need to check if the draggable attribute is supported, because older versions of IE do
			   support the incompatible versions of the events below. IE 9 and up do support the HTML5
			   events in combination with the draggable attribute */
			
			var supported = 'draggable' in element;

			results.setItem({
				key:		'interaction-dragdrop.events-ondrag',
				passed:		isEventSupported('drag') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondragstart',
				passed:		isEventSupported('dragstart') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondragenter',
				passed:		isEventSupported('dragenter') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondragover',
				passed:		isEventSupported('dragover') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondragleave',
				passed:		isEventSupported('dragleave') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondragend',
				passed:		isEventSupported('dragend') && supported
			});
			
			results.setItem({
				key:		'interaction-dragdrop.events-ondrop',
				passed:		isEventSupported('drop') && supported
			});

			
			/* Content editable */

			var element = document.createElement('div');

			results.setItem({
				key:		'interaction-editing.elements-contentEditable',
				passed:		'contentEditable' in element
			});

			results.setItem({
				key:		'interaction-editing.elements-isContentEditable',
				passed:		'isContentEditable' in element
			});
			
			results.setItem({
				key:		'interaction-editing.documents-designMode',
				passed:		'designMode' in document
			});
			
			results.setItem({
				key:		'interaction-editing.apis-execCommand',
				passed:		'execCommand' in document
			});

			results.setItem({
				key:		'interaction-editing.apis-queryCommandEnabled',
				passed:		'queryCommandEnabled' in document
			});

			results.setItem({
				key:		'interaction-editing.apis-queryCommandIndeterm',
				passed:		'queryCommandIndeterm' in document
			});

			results.setItem({
				key:		'interaction-editing.apis-queryCommandState',
				passed:		'queryCommandState' in document
			});

			results.setItem({
				key:		'interaction-editing.apis-queryCommandSupported',
				passed:		'queryCommandSupported' in document
			});

			results.setItem({
				key:		'interaction-editing.apis-queryCommandValue',
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
			
			for (var i = 0; i < selectors.length; i++) {
				results.setItem({
					key:		'interaction-editing.selectors-' + selectors[i],
					passed:		res[i]
				});
			}
			
			results.setItem({
				key:		'interaction-clipboard',
				passed:		!!('ClipboardEvent' in window)
			});
			

			results.setItem({
				key:		'interaction-spellcheck',
				passed:		!!('spellcheck' in element)
			});
		}			
	};

	function testHistory (results) { this.initialize(results); }			
	testHistory.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'history-history',
				passed:		!!(window.history && history.pushState)
			});
		}			
	};

	function testMicrodata (results) { this.initialize(results); }			
	testMicrodata.prototype = {
		initialize: function(results) {
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

			results.setItem({
				key:		'microdata-microdata',
				passed:		r
			});
		}
	};					

	function testOffline (results) { this.initialize(results); }			
	testOffline.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'offline-applicationCache',
				passed:		!!window.applicationCache
			});

			results.setItem({
				key:		'offline-serviceWorkers',
				passed:		!!window.navigator.serviceWorker
			});

			results.setItem({
				key:		'offline-registerProtocolHandler',
				passed:		!!window.navigator.registerProtocolHandler
			});

			results.setItem({
				key:		'offline-registerContentHandler',
				passed:		!!window.navigator.registerContentHandler
			});
		}
	};

	function testSecurity (results) { this.initialize(results); }			
	testSecurity.prototype = {
		initialize: function(results) {
			var passed = NO;
			try {
				var crypto = window.crypto || window.webkitCrypto || window.mozCrypto || window.msCrypto || window.oCrypto;
				var available = window.crypto ? YES : window.mozCrypto || window.msCrypto || window.oCrypto ? YES | PREFIX : NO;
				passed = !!crypto && 'subtle' in crypto ? available : !!crypto && 'webkitSubtle' in crypto ? YES | PREFIX : NO;
			} catch(e) {
			}

			results.setItem({
				key:		'security-crypto',
				passed: 	passed
			});

			results.setItem({
				key:		'security-csp10',
				passed:		!(function() { try { return eval('true'); } catch (e) {} return false; })()
			});

			results.setItem({
				key:		'security-csp11',
				passed:		'SecurityPolicyViolationEvent' in window
			});

			results.setItem({
				key:		'security-cors',
				passed:		!!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())
			});

			results.setItem({
				key:		'security-postMessage',
				passed:		!!window.postMessage
			});



			results.setItem({
				key:		'security-sandbox',
				passed:		'sandbox' in document.createElement('iframe')
			});

			results.setItem({
				key:		'security-srcdoc',
				passed:		'srcdoc' in document.createElement('iframe')
			});
		}
	};

	function testGeolocation (results) { this.initialize(results); }			
	testGeolocation.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'location-geolocation',
				passed:		!!navigator.geolocation
			});

			results.setItem({
				key:		'location-orientation',
				passed:		!!window.DeviceOrientationEvent
			});

			results.setItem({
				key:		'location-motion',
				passed:		!!window.DeviceMotionEvent
			});
		}
	};

	function testWebGL (results) { this.initialize(results); }			
	testWebGL.prototype = {
		initialize: function(results) {
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
				
			results.setItem({
				key:		'webgl-context',
				passed:		passed ? (context == 'webgl' ? YES : YES | PREFIX) : NO
			});
		}
	};

	function testCommunication (results) { this.initialize(results); }			
	testCommunication.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'communication-beacon',
				passed:		'sendBeacon' in navigator
			});
			
			results.setItem({
				key:		'communication-eventSource',
				passed:		'EventSource' in window
			});
			
			results.setItem({
				key:		'communication-fetch',
				passed:		'Promise' in window && typeof window.fetch === 'function' && window.fetch('') instanceof Promise
			});
			
			results.setItem({
				key:		'communication-xmlhttprequest2.upload',
				passed:		window.XMLHttpRequest && 'upload' in new XMLHttpRequest()
			});

			var item = results.setItem({
				key:		'communication-xmlhttprequest2.response-text',
				passed:		false
			});
			
			this.testResponseTypeText(item);

			var item = results.setItem({
				key:		'communication-xmlhttprequest2.response-document',
				passed:		false
			});
			
			this.testResponseTypeDocument(item);

			var item = results.setItem({
				key:		'communication-xmlhttprequest2.response-array',
				passed:		false
			});
			
			this.testResponseTypeArrayBuffer(item);

			var item = results.setItem({
				key:		'communication-xmlhttprequest2.response-blob',
				passed:		false
			});
			
			this.testResponseTypeBlob(item);


			var websocket = window.WebSocket || window.MozWebSocket;
			var passed = 'WebSocket' in window ? YES : 'MozWebSocket' in window ? YES | PREFIX : NO;
			if (websocket && websocket.CLOSING !== 2) passed |= OLD;

			results.setItem({
				key:		'communication-websocket.basic',
				passed:		passed
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

			results.setItem({
				key:		'communication-websocket.binary',
				passed:		passed
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
			results.setItem({
				key:		'streams-streams.readable',
				passed:		'ReadableStream' in window
			});

			results.setItem({
				key:		'streams-streams.writeable',
				passed:		'WriteableStream' in window
			});
		}
	};
	
	function testFiles (results) { this.initialize(results); }			
	testFiles.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'files-fileReader',
				passed:		'FileReader' in window
			});

			results.setItem({
				key:		'files-fileReader.blob',
				passed:		'Blob' in window
			});

			results.setItem({
				key:		'files-fileReader.dataURL',
				passed:		'FileReader' in window && 'readAsDataURL' in (new FileReader())
			});

			results.setItem({
				key:		'files-fileReader.arraybuffer',
				passed:		'FileReader' in window && 'readAsArrayBuffer' in (new FileReader())
			});

			results.setItem({
				key:		'files-fileReader.objectURL',
				passed:		'URL' in window && 'createObjectURL' in URL
			});

			results.setItem({
				key:		'files-fileSystem',
				passed:		!! window.requestFileSystem ? YES : !! window.webkitRequestFileSystem || !! window.mozRequestFileSystem || !! window.oRequestFileSystem || !! window.msRequestFileSystem ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'files-getFileSystem',
				passed:		!! navigator.getFileSystem ? YES : !! navigator.webkitGetFileSystem || !! navigator.mozGetFileSystem || !! window.msGetFileSystem ? YES | PREFIX : NO
			});
		}
	};
	
	function testStorage (results) { this.initialize(results); }			
	testStorage.prototype = {
		initialize: function(results) {
			
			/* Key-value storage */
			
			results.setItem({
				key:		'storage-sessionStorage',
				passed:		'sessionStorage' in window && window.sessionStorage != null
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

			results.setItem({
				key:		'storage-localStorage',
				passed:		passed
			});



			/* IndexedDB */
			
			var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB || window.oIndexedDB || window.msIndexedDB;
			var passed = !! window.indexedDB ? YES : !! window.webkitIndexedDB || !! window.mozIndexedDB || !! window.moz_indexedDB || !! window.oIndexedDB || !! window.msIndexedDB ? YES | PREFIX : NO;
			if (indexedDB && ! 'deleteDatabase' in indexedDB) passed != BUGGY;

			results.setItem({
				key:		'storage-indexedDB.basic',
				passed:		passed
			});

			var blobitem = results.setItem({
				key:		'storage-indexedDB.blob',
				passed:		false
			});

			var arrayitem = results.setItem({
				key:		'storage-indexedDB.arraybuffer',
				passed:		false
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

			results.setItem({
				key:		'storage-sqlDatabase',
				passed:		!!window.openDatabase
			});
		}
	};

	function testPerformance (results) { this.initialize(results); }			
	testPerformance.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'performance-worker',
				passed:		!!window.Worker
			});

			results.setItem({
				key:		'performance-sharedWorker',
				passed:		!!window.SharedWorker
			});

			results.setItem({
				key:		'performance-datatypes-ArrayBuffer',
				passed:		typeof ArrayBuffer != 'undefined'
			});

			results.setItem({
				key:		'performance-datatypes-Int8Array',
				passed:		typeof Int8Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Uint8Array',
				passed:		typeof Uint8Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Uint8ClampedArray',
				passed:		typeof Uint8ClampedArray != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Int16Array',
				passed:		typeof Int16Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Uint16Array',
				passed:		typeof Uint16Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Int32Array',
				passed:		typeof Int32Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Uint32Array',
				passed:		typeof Uint32Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Float32Array',
				passed:		typeof Float32Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-Float64Array',
				passed:		typeof Float64Array != 'undefined'
			});
			
			results.setItem({
				key:		'performance-datatypes-DataView',
				passed:		typeof DataView != 'undefined'
			});
		}
	};
	
	function testOutput (results) { this.initialize(results); }			
	testOutput.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'output-requestFullScreen',
				passed:		!! document.documentElement.requestFullscreen ? YES : !! document.documentElement.webkitRequestFullScreen || !! document.documentElement.mozRequestFullScreen || !! document.documentElement.msRequestFullscreen ? YES | PREFIX : NO
			});
			

			/* W3C standard is "new Notification()", WebKit pre-standard is "window.webkitNotifications.createNotification()", Gecko pre-standard is "window.navigator.mozNotification.createNotification()" */
			results.setItem({
				key:		'output-notifications',
				passed:		'Notification' in window ? YES : 'webkitNotifications' in window || 'mozNotification' in window.navigator || 'oNotification' in window || 'msNotification' in window ? YES | PREFIX : NO
			});
		}
	};			
	

	function testOther (results) { this.initialize(results); }			
	testOther.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'other-async',
				passed:		'async' in document.createElement('script')
			});

			results.setItem({
				key:		'other-defer',
				passed:		'defer' in document.createElement('script')
			});

			results.setItem({
				key:		'other-onerror',
				passed:		isEventSupported('error')
			});

			var executionevents = results.setItem({
				key:		'other-executionevents',
				passed:		false
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


			results.setItem({
				key:		'other-base64',
				passed:		'btoa' in window && 'atob' in window
			});

			results.setItem({
				key:		'other-json',
				passed:		'JSON' in window && 'parse' in JSON
			});

			results.setItem({
				key:		'other-mutationObserver',
				passed:   	'MutationObserver' in window ? YES : 'WebKitMutationObserver' in window || 'MozMutationObserver' in window || 'oMutationObserver' in window || 'msMutationObserver' in window ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'other-url',
				passed:   	'URL' in window ? YES : 'WebKitURL' in window || 'MozURL' in window || 'oURL' in window || 'msURL' in window ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'other-encoding',
				passed:   	'TextEncoder' in window && 'TextDecoder' in window ? YES : NO
			});

			results.setItem({
				key:		'other-i18n',
				passed:   	'Intl' in window ? YES : NO
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
    
			results.setItem({
				key:		'other-promises',
				passed:   	passed
			});
    
    


			results.setItem({
				key:		'other-pagevisiblity',
				passed:		'visibilityState' in document ? YES : 'webkitVisibilityState' in document || 'mozVisibilityState' in document || 'oVisibilityState' in document || 'msVisibilityState' in document ? YES | PREFIX : NO
			});

			results.setItem({
				key:		'other-getSelection',
				passed:		!!window.getSelection
			});

			var element = document.createElement('div');
			
			results.setItem({
				key:		'other-scrollIntoView',
				passed:		!!element.scrollIntoView
			});
			
		}
	};			
	
	
	function testAnimation (results) { this.initialize(results); }			
	testAnimation.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'animation-webanimation',
				passed:		'animate' in document.createElement('div')
			});

			results.setItem({
				key:		'animation-requestAnimationFrame',
				passed:		!! window.requestAnimationFrame ? YES : !! window.webkitRequestAnimationFrame || !! window.mozRequestAnimationFrame || !! window.msRequestAnimationFrame || !! window.oRequestAnimationFrame ? YES | PREFIX : NO
			});
		}
	};
	
	
	function testComponents (results) { this.initialize(results); }			
	testComponents.prototype = {
		initialize: function(results) {
			results.setItem({
				key:		'components-custom',
				passed:		'registerElement' in document
			});

			results.setItem({
				key:		'components-shadowdom',
				passed:		'attachShadow' in document.createElement('div') ? YES : 'createShadowRoot' in document.createElement('div') || 'webkitCreateShadowRoot' in document.createElement('div') ? YES | OLD : NO
			});
			
			var passed = false;

			try {
				passed = 'content' in document.createElement('template');
			} catch(error) {
			}

			results.setItem({
				key:		'components-template',
				passed:		passed
			});

			results.setItem({
				key:		'components-imports',
				passed:		'import' in document.createElement('link')
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
			blacklists = [
				[
					BLOCKED,
					{
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
						'input.getUserMedia':				Browsers.isDevice('webOS TV') || Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer') || Browsers.isBrowser('UC Browser', '<', '9.8') || Browsers.isBrowser('Dolphin'),
						'input.getGamepads':				Browsers.isDevice('webOS TV') || Browsers.isDevice('Playstation 4') || Browsers.isDevice('Wii U'),
						'location.geolocation':				Browsers.isDevice('webOS TV') || Browsers.isDevice('Xbox One') || Browsers.isBrowser('Baidu Browser') || Browsers.isOs('Google TV'),
						'location.orientation':				Browsers.isBrowser('Baidu Browser'),
						'output.notifications':				Browsers.isBrowser('Opera', '=', '18') || Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer'),
						'output.requestFullScreen':			Browsers.isBrowser('Sogou Explorer') || Browsers.isOs('BlackBerry Tablet OS') || Browsers.isOs('BlackBerry OS'),
						'video.subtitle':					Browsers.isBrowser('Baidu Browser') || Browsers.isBrowser('Sogou Explorer'),
						'webgl.context':					Browsers.isBrowser('Baidu Browser'),
					}
				],
				
				[
					DISABLED,
					{
						'elements.semantic.ping':			Browsers.isBrowser('Firefox') || Browsers.isBrowser('Firefox Mobile')
					}	
				],
				
				[
					UNCONFIRMED,
					{
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
					}
				]
			];		
			
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
			var uniqueid = (((1+Math.random())*0x1000000)|0).toString(16).substring(1) + ("0000000000" + (new Date().getTime() - new Date(2010,0,1).getTime()).toString(16)).slice(-10);

			this.callback({
				revision:	revision,
				uniqueid:	uniqueid,
				results:	this.results.toString(),
			});
		}
	};
	
	return test;			
})();			
