
Test8 = (function() {

	var version = 8;
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


	var testsuite = [

		/* doctype */

		function(results) {
			results.setItem({
				key:	'parsing-doctype',
				passed:	document.compatMode == 'CSS1Compat'
			});
		},


		/* tokenizer */

		function(results) {
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
		},


		/* tree builder */

		function(results) {
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
		},


		/* svg in html */

		function(results) {
			var e = document.createElement('div');
			e.innerHTML = '<svg></svg>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/2000/svg';

			results.setItem({
				key:	'parsing-svg',
				passed:	passed
			});
		},


		/* svg in html */

		function(results) {
			var e = document.createElement('div');
			e.innerHTML = '<math></math>';
			var passed = e.firstChild && "namespaceURI" in e.firstChild && e.firstChild.namespaceURI == 'http://www.w3.org/1998/Math/MathML';

			results.setItem({
				key:	'parsing-mathml',
				passed:	passed
			});
		},

		/* dataset */

		function(results) {
			var element = document.createElement('div');
			element.setAttribute('data-test', 'test');

			results.setItem({
				key:	'elements-dataset',
				passed:	'dataset' in element
			});
		},


		/* section, nav, article, header and footer */

		function(results) {
			var elements = 'section nav article aside header footer'.split(' ');

			for (var e = 0; e < elements.length; e++) {
				var passed = false;

				try {
					var element = document.createElement(elements[e]);
					document.body.appendChild(element);

					try {
						passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && isBlock(element) && closesImplicitly(elements[e]);
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

		},


		/* main, figure and figcaption */

		function(results) {
			var elements = 'main figure figcaption'.split(' ');

			for (var e = 0; e < elements.length; e++) {
				var passed = false;

				try {
					var element = document.createElement(elements[e]);
					document.body.appendChild(element);

					try {
						passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && isBlock(element) && (elements[e] != 'figure' || closesImplicitly(elements[e]));
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

		},


		/* ol grouping */

		function(results) {
			results.setItem({
				key:	'elements-grouping-ol',
				passed:	'reversed' in document.createElement('ol')
			});

		},


		/* a download */

		function(results) {
			results.setItem({
				key:	'elements-semantic-download',
				passed:	'download' in document.createElement('a')
			});
		},


		/* a ping */

		function(results) {
			results.setItem({
				key:	'elements-semantic-ping',
				passed:	'ping' in document.createElement('a')
			});
		},


		/* mark element */

		function(results) {
			var passed = false;

			try {
				var element = document.createElement('mark');
				document.body.appendChild(element);

				try {
					passed = element instanceof HTMLElement && !(element instanceof HTMLUnknownElement) && (color = getStyle(element, 'background-color')) && (color != 'transparent');
				} catch(error) {
				}

				document.body.removeChild(element);
			} catch(error) {
			}

			results.setItem({
				key:	'elements-semantic-mark',
				passed:	passed
			});
		},


		/* ruby, rt, rp element */

		function(results) {
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
				rubySupport = rubyElement && rubyElement instanceof HTMLElement && !(rubyElement instanceof HTMLUnknownElement);
				rtSupport = rtElement && rtElement instanceof HTMLElement && !(rtElement instanceof HTMLUnknownElement);
				rpSupport = rpElement && rpElement instanceof HTMLElement && !(rpElement instanceof HTMLUnknownElement) && isHidden(rpElement);
			} catch(error) {
			}

			document.body.removeChild(container);

			results.setItem({
				key:	'elements-semantic-ruby',
				passed:	rubySupport && rtSupport && rpSupport
			});
		},


		/* time element */

		function(results) {
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
		},


		/* data element */

		function(results) {
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
		},


		/* wbr element */

		function(results) {
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
		},


		/* details element */

		function(results) {
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
		},


		/* summary element */

		function(results) {
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
		},


		/* menu toolbar */

		function(results) {
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
		},


		/* menu popup */

		function(results) {
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
		},


		/* dialog element */

		function(results) {
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
		},


		/* hidden attribute */

		function(results) {
			results.setItem({
				key:	'elements-hidden',
				passed:	'hidden' in document.createElement('div')
			});
		},


		/* outerHTML property */

		function(results) {
			results.setItem({
				key:	'elements-dynamic-outerHTML',
				passed:	'outerHTML' in document.createElement('div')
			});
		},


		/* insertAdjacentHTML property */

		function(results) {
			results.setItem({
				key:	'elements-dynamic-insertAdjacentHTML',
				passed:	'insertAdjacentHTML' in document.createElement('div')
			});
		},


		/* input type=text */

		function(results) {
			var element = createInput('text');

			results.setItem({
				key:		'form-text-element',
				passed:		element.type == 'text'
			});

			results.setItem({
				key:		'form-text-selection',
				passed:		'selectionDirection' in element
			});
		},


		/* input type=search */

		function(results) {
			var element = createInput('search');

			results.setItem({
				key:		'form-search-element',
				passed:		element.type == 'search'
			});
		},


		/* input type=tel */

		function(results) {
			var element = createInput('tel');

			results.setItem({
				key:		'form-tel-element',
				passed:		element.type == 'tel'
			});
		},


		/* input type=url */

		function(results) {
			var element = createInput('url');

			var validation = false;
			if ('validity' in element) {
				validation = true;

				element.value = "foo";
				validation &= !element.validity.valid

				element.value = "http://foo.org";
				validation &= element.validity.valid
			}

			results.setItem({
				key:		'form-url-element',
				passed:		element.type == 'url'
			});

			results.setItem({
				key:		'form-url-validation',
				passed:		validation
			});
		},


		/* input type=email */

		function(results) {
			var element = createInput('email');

			var validation = false;
			if ('validity' in element) {
				validation = true;

				element.value = "foo";
				validation &= !element.validity.valid

				element.value = "foo@bar.org";
				validation &= element.validity.valid
			}

			results.setItem({
				key:		'form-email-element',
				passed:		element.type == 'email'
			});

			results.setItem({
				key:		'form-email-validation',
				passed:		validation
			});
		},


		/* input type=date, month, week, time, datetime and datetime-local */

		function(results) {
			var types = ['date', 'month', 'week', 'time', 'datetime', 'datetime-local'];
			for (var t = 0; t < types.length; t++) {
				var element = createInput(types[t]);

				element.value = "foobar";
				var sanitization = element.value == '';

				var minimal = element.type == types[t];

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
					passed:		minimal && 'min' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-max',
					passed:		minimal && 'max' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-step',
					passed:		minimal && 'step' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepDown',
					passed:		minimal && 'stepDown' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepUp',
					passed:		minimal && 'stepUp' in element
				});

				if (t != 'datetime-local' && t != 'datetime') {
					results.setItem({
						key:		'form-' + types[t] + '-valueAsDate',
						passed:		minimal && 'valueAsDate' in element
					});
				}

				results.setItem({
					key:		'form-' + types[t] + '-valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element
				});
			}
		},


		/* input type=number, range */

		function(results) {
			var types = ['number', 'range'];
			for (var t = 0; t < types.length; t++) {
				var element = createInput(types[t]);

				element.value = "foobar";
				var sanitization = element.value != 'foobar';

				var validation = false;
				if ('validity' in element) {
					validation = true;

					element.min = 40;
					element.max = 50;
					element.value = 100;
					validation &= !element.validity.valid

					element.value = 42;
					validation &= element.validity.valid
				}

				var minimal = element.type == types[t];

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
					passed:		minimal && 'min' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-max',
					passed:		minimal && 'max' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-step',
					passed:		minimal && 'step' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepDown',
					passed:		minimal && 'stepDown' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-stepUp',
					passed:		minimal && 'stepUp' in element
				});

				results.setItem({
					key:		'form-' + types[t] + '-valueAsNumber',
					passed:		minimal && 'valueAsNumber' in element
				});
			}
		},


		/* input type=color */

		function(results) {
			var element = createInput('color');

			element.value = "foobar";
			var sanitization = element.value != 'foobar';

			results.setItem({
				key:		'form-color-element',
				passed:		element.type == 'color'
			});

			results.setItem({
				key:		'form-color-ui',
				passed:		sanitization,		// Testing UI reliably is not possible, so we assume if sanitization is support we also have a UI and use the blacklist to make corrections
			});

			results.setItem({
				key:		'form-color-sanitization',
				passed:		sanitization
			});
		},


		/* input type=checkbox */

		function(results) {
			var element = createInput('checkbox');

			results.setItem({
				key:		'form-checkbox-element',
				passed:		element.type == 'checkbox'
			});

			results.setItem({
				key:		'form-checkbox-indeterminate',
				passed:		'indeterminate' in element
			});
		},


		/* input type=image */

		function(results) {
			var element = createInput('image');
			element.style.display = 'inline-block';

			var supportsWidth = 'width' in element;
			var supportsHeight = 'height' in element;

			element.setAttribute('width', '100');
			element.setAttribute('height', '100');

			results.setItem({
				key:		'form-image-element',
				passed:		element.type == 'image'
			});

			results.setItem({
				key:		'form-image-width',
				passed:		supportsWidth && element.offsetWidth == 100
			});

			results.setItem({
				key:		'form-image-height',
				passed:		supportsHeight && element.offsetHeight == 100
			});
		},


		/* input type=file */

		function(results) {
			var element = createInput('file');

			results.setItem({
				key:		'form-file-element',
				passed:		element.type == 'file'
			});

			results.setItem({
				key:		'form-file-files',
				passed:		element.files && element.files instanceof FileList
			});

			results.setItem({
				key:		'form-file-directory',
				passed:		'directory' in element && window.Directory
			});
		},


		/* textarea */

		function(results) {
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
		},


		/* select */

		function(results) {
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
		},


		/* fieldset */

		function(results) {
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
		},


		/* datalist */

		function(results) {
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
		},


		/* keygen */

		function(results) {
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
		},


		/* output */

		function(results) {
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
		},


		/* progress */

		function(results) {
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
		},


		/* meter */

		function(results) {
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
		},


		/* pattern and required properties */

		function(results) {
			var element = document.createElement('input');

			var props = 'pattern required'.split(' ');

			for (var p = 0; p < props.length; p++) {
				results.setItem({
					key:		'form-validation-' + props[p],
					passed:		!!(props[p] in element)
				});
			}
		},


		/* control property on labels */

		function(results) {
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
		},


		/* form attribute on input */

		function(results) {
			var element = document.createElement('div');
			document.body.appendChild(element);
			element.innerHTML = '<form id="form"></form><input form="form">';

			results.setItem({
				key:		'form-association-form',
				passed:		element.lastChild.form == element.firstChild
			});

			document.body.removeChild(element);
		},


		/* formAction, formEnctype, formMethod, formNoValidate and formTarget properties */

		function(results) {
			var props = 'formAction formEnctype formMethod formNoValidate formTarget'.split(' ');

			var element = document.createElement('input');

			for (var p = 0; p < props.length; p++) {
				results.setItem({
					key:		'form-association-' + props[p],
					passed:		!!(props[p] in element)
				});
			}
		},


		/* labels property on input */

		function(results) {
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
		},


		/* autofocus */

		function(results) {
			var element = document.createElement('input');

			results.setItem({
				key:		'form-other-autofocus',
				passed:		!!('autofocus' in element)
			});
		},


		/* autocomplete, placeholder, multiple and dirName properties */

		function(results) {
			var element = document.createElement('input');

			var props = 'autocomplete placeholder multiple dirName'.split(' ');

			for (var p = 0; p < props.length; p++) {
				var prop = props[p].toLowerCase();
				results.setItem({
					key:		'form-other-' + prop,
					passed:		!!(props[p] in element)
				});
			}
		},


		/* valid, invalid, optional, required, in-range, out-of-range, read-write and read-only css selectors */

		function(results) {
			var selectors = "valid invalid optional required in-range out-of-range read-write read-only".split(" ");
			var passed = [NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN, NO | UNKNOWN];

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
					passed[0] = !!document.querySelector("#testFormInput:valid");
				} catch(e) {
					passed[0] = NO;
				}

				try {
					passed[6] = !!document.querySelector("#testFormInput:read-write");
				} catch(e) {
					passed[6] = NO;

					try {
						passed[6] = document.querySelector("#testFormInput:-moz-read-write") ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				if ("validity" in element && "setCustomValidity" in element) {
					element.setCustomValidity("foo");

					try {
						passed[1] = !!document.querySelector("#testFormInput:invalid");
					} catch(e) {
						passed[1] = NO;
					}
				} else {
					passed[1] = NO;
				}

				try {
					passed[2] = !!document.querySelector("#testFormInput:optional");
				} catch(e) {
					passed[2] = NO;
				}

				element.setAttribute("required", "true");

				try {
					passed[3] = !!document.querySelector("#testFormInput:required");
				} catch(e) {
					passed[3] = NO;
				}

				try {
					element.setAttribute("type", "number");
					element.setAttribute("min", "10");
					element.setAttribute("max", "20");
					element.setAttribute("value", "15");
					passed[4] = !!document.querySelector("#testFormInput:in-range");
				} catch(e) {
					passed[4] = NO;
				}


				try {
					element.setAttribute("type", "number");
					element.setAttribute("min", "10");
					element.setAttribute("max", "20");
					element.setAttribute("value", "25");
					passed[5] = !!document.querySelector("#testFormInput:out-of-range");
				} catch(e) {
					passed[5] = NO;
				}

				document.body.removeChild(element);

				var element = document.createElement('input');
				element.id = 'testFormInput';
				element.setAttribute("type", "text");
				element.setAttribute("readonly", "readonly");
				document.body.appendChild(element);

				try {
					passed[7] = !!document.querySelector("#testFormInput:read-only");
				} catch(e) {
					passed[7] = NO;

					try {
						passed[7] = document.querySelector("#testFormInput:-moz-read-only") ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				document.body.removeChild(element);
			}

			for (var i = 0; i < selectors.length; i++) {
				results.setItem({
					key:		'form-selectors-' + selectors[i],
					passed:		passed[i]
				});
			}
		},


		/* oninput, onchange and oninvalid events */

		function(results) {
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
		},


		/* checkValidity property */

		function(results) {
			results.setItem({
				key:		'form-formvalidation-checkValidity',
				passed:		'checkValidity' in document.createElement('form')
			});
		},


		/* noValidate property */

		function(results) {
			results.setItem({
				key:		'form-formvalidation-noValidate',
				passed:		'noValidate' in document.createElement('form')
			});
		},


		/* microdata */

		function(results) {
			var container = document.createElement('div');
			container.innerHTML = '<div id="microdataItem" itemscope itemtype="http://example.net/user"><p>My name is <span id="microdataProperty" itemprop="name">Elizabeth</span>.</p></div>';
			document.body.appendChild(container);

			var item = document.getElementById('microdataItem');
			var property = document.getElementById('microdataProperty');
			var passed = true;

			// Check the element that contains the property
			passed = passed && !!('itemValue' in property) && property.itemValue == 'Elizabeth';

			// Check the element that is the item
			passed = passed && !!('properties' in item) && item.properties['name'][0].itemValue == 'Elizabeth';

			// Check the getItems method
			if (!!document.getItems) {
				var user = document.getItems('http://example.net/user')[0];
				passed = passed && user.properties['name'][0].itemValue == 'Elizabeth';
			}

			document.body.removeChild(container);

			results.setItem({
				key:	'microdata-microdata',
				passed:	passed
			});
		},


		/* geolocation */

		function(results) {
			results.setItem({
				key:	'location-geolocation',
				passed:	!!navigator.geolocation
			});
		},


		/* device orientation */

		function(results) {
			results.setItem({
				key:	'location-orientation',
				passed:	!!window.DeviceOrientationEvent
			});
		},


		/* device motion */

		function(results) {
			results.setItem({
				key:	'location-motion',
				passed:	!!window.DeviceMotionEvent
			});
		},


		/* fullscreen */

		function(results) {
			results.setItem({
				key:	'output-requestFullScreen',
				passed:	!! document.documentElement.requestFullscreen ? YES : !! document.documentElement.webkitRequestFullScreen || !! document.documentElement.mozRequestFullScreen || !! document.documentElement.msRequestFullscreen ? YES | PREFIX : NO
			});
		},


		/* notifications */

		function(results) {
			results.setItem({
				key:	'output-notifications',
				passed:	'Notification' in window ? YES : 'webkitNotifications' in window || 'mozNotification' in window.navigator || 'oNotification' in window || 'msNotification' in window ? YES | PREFIX : NO
			});
		},


		/* getUserMedia */

		function(results) {
			results.setItem({
				key:		'input-getUserMedia',
				passed:		!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia ? YES : !!navigator.getUserMedia ? YES | OLD : !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia || !!navigator.msGetUserMedia || !!navigator.oGetUserMedia ? YES | PREFIX : NO
			});
		},


		/* getGamepads */

		function(results) {
			results.setItem({
				key:		'input-getGamepads',
				passed:		!!navigator.getGamepads ? YES : !!navigator.webkitGetGamepads || !!navigator.mozGetGamepads || !!navigator.msGetGamepads || !!navigator.oGetGamepads ? YES | PREFIX : NO
			});
		},


		/* pointerLock */

		function(results) {
			results.setItem({
				key:		'input-pointerLock',
				passed:  	'pointerLockElement' in document ? YES : 'oPointerLockElement' in document || 'msPointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document ? YES | PREFIX : NO
			});
		},


		/* pointerevents */

		function(results) {
			results.setItem({
				key:		'input-pointerevents',
				passed:		!!window.PointerEvent ? YES : !!window.webkitPointerEvent || !!window.mozPointerEvent || !!window.msPointerEvent || !!window.oPointerEvent ? YES | PREFIX : NO
			});
		},


		/* beacon */

		function(results) {
			results.setItem({
				key:	'communication-beacon',
				passed:	'sendBeacon' in navigator
			});
		},


		/* eventSource */

		function(results) {
			results.setItem({
				key:	'communication-eventSource',
				passed:	'EventSource' in window
			});
		},


		/* fetch */

		function(results) {
			results.setItem({
				key:	'communication-fetch',
				passed:	'Promise' in window && typeof window.fetch === 'function' && window.fetch('') instanceof Promise
			});
		},


		/* xmlhttprequest upload */

		function(results) {
			results.setItem({
				key:	'communication-xmlhttprequest2.upload',
				passed:	window.XMLHttpRequest && 'upload' in new XMLHttpRequest()
			});
		},


		/* xmlhttprequest response text */

		function(results) {
			var item = results.setItem({
				key:	'communication-xmlhttprequest2.response-text',
				passed:	false
			});

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


		/* xmlhttprequest response document */

		function(results) {
			var item = results.setItem({
				key:	'communication-xmlhttprequest2.response-document',
				passed:	false
			});

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


		/* xmlhttprequest response array */

		function(results) {
			var item = results.setItem({
				key:	'communication-xmlhttprequest2.response-array',
				passed:	false
			});

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
		},


		/* xmlhttprequest response blob */

		function(results) {
			var item = results.setItem({
				key:	'communication-xmlhttprequest2.response-blob',
				passed:	false
			});

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


		/* websockets */

		function(results) {
			var websocket = window.WebSocket || window.MozWebSocket;
			var passed = 'WebSocket' in window ? YES : 'MozWebSocket' in window ? YES | PREFIX : NO;
			if (websocket && websocket.CLOSING !== 2) passed |= OLD;

			results.setItem({
				key:	'communication-websocket.basic',
				passed:	passed
			});
		},


		/* binary websockets */

		function(results) {
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
				key:	'communication-websocket.binary',
				passed:	passed
			});
		},

		function(results) {

			/* webrtc */

			results.setItem({
				key:	'webrtc-webrtc',
				passed:	!!window.RTCPeerConnection ? YES : !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection || !!window.msRTCPeerConnection || !!window.oRTCPeerConnection ? YES | PREFIX : NO
			});
		},

		function(results) {


			/* objectrtc */

			results.setItem({
				key:	'webrtc-objectrtc',
				passed:	!!window.RTCIceTransport ? YES : !!window.webkitRTCIceTransport || !!window.mozRTCIceTransport || !!window.msRTCIceTransport || !!window.oRTCIceTransport ? YES | PREFIX : NO
			});
		},

		function(results) {


			/* datachannel */

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
		},


		/* Draggable */

		function(results) {
			results.setItem({
				key:	'interaction-dragdrop.attributes-draggable',
				passed:	'draggable' in document.createElement('div')
			});
		},


		/* Dropzone */

		function(results) {
			var element = document.createElement('div');

			results.setItem({
				key:	'interaction-dragdrop.attributes-dropzone',
				passed:	'dropzone' in element ? YES : 'webkitdropzone' in element || 'mozdropzone' in element || 'msdropzone' in element || 'odropzone' in element ? YES | PREFIX : NO
			});
		},


		/* Drag and drop events */

		function(results) {
			var passed = 'draggable' in document.createElement('div')

			/* We need to check if the draggable attribute is supported, because older versions of IE do
			   support the incompatible versions of the events below. IE 9 and up do support the HTML5
			   events in combination with the draggable attribute */


			results.setItem({
				key:	'interaction-dragdrop.events-ondrag',
				passed:	isEventSupported('drag') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondragstart',
				passed:	isEventSupported('dragstart') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondragenter',
				passed:	isEventSupported('dragenter') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondragover',
				passed:	isEventSupported('dragover') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondragleave',
				passed:	isEventSupported('dragleave') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondragend',
				passed:	isEventSupported('dragend') && passed
			});

			results.setItem({
				key:	'interaction-dragdrop.events-ondrop',
				passed:	isEventSupported('drop') && passed
			});
		},


		/* contentEditable */

		function(results) {
			results.setItem({
				key:	'interaction-editing.elements-contentEditable',
				passed:	'contentEditable' in document.createElement('div')
			});
		},


		/* isContentEditable */

		function(results) {
			results.setItem({
				key:	'interaction-editing.elements-isContentEditable',
				passed:	'isContentEditable' in document.createElement('div')
			});
		},


		/* designMode */

		function(results) {
			results.setItem({
				key:	'interaction-editing.documents-designMode',
				passed:	'designMode' in document
			});
		},


		/* execCommand and queryCommand API */

		function(results) {
			results.setItem({
				key:	'interaction-editing.apis-execCommand',
				passed:	'execCommand' in document
			});

			results.setItem({
				key:	'interaction-editing.apis-queryCommandEnabled',
				passed:	'queryCommandEnabled' in document
			});

			results.setItem({
				key:	'interaction-editing.apis-queryCommandIndeterm',
				passed:	'queryCommandIndeterm' in document
			});

			results.setItem({
				key:	'interaction-editing.apis-queryCommandState',
				passed:	'queryCommandState' in document
			});

			results.setItem({
				key:	'interaction-editing.apis-queryCommandSupported',
				passed:	'queryCommandSupported' in document
			});

			results.setItem({
				key:	'interaction-editing.apis-queryCommandValue',
				passed:	'queryCommandValue' in document
			});
		},


		/* read-write and read-only selectors */

		function(results) {
			var selectors = "read-write read-only".split(" ");
			var passed = [ NO | UNKNOWN, NO | UNKNOWN ];

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
					passed[0] = document.querySelector("#testDivElement:read-write") == element;
				} catch(e) {
					passed[0] = NO;

					try {
						passed[0] = document.querySelector("#testDivElement:-moz-read-write") == element ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				try {
					passed[1] = document.querySelector("#testDivNested:read-only") == nested;
				} catch(e) {
					passed[1] = NO;

					try {
						passed[1] = document.querySelector("#testDivNested:-moz-read-only") == nested ? YES | PREFIX : NO;
					} catch(e) {
					}
				}

				document.body.removeChild(element);
			}

			for (var i = 0; i < selectors.length; i++) {
				results.setItem({
					key:	'interaction-editing.selectors-' + selectors[i],
					passed:	passed[i]
				});
			}
		},


		/* ClipboardEvent */

		function(results) {
			results.setItem({
				key:	'interaction-clipboard',
				passed:	'ClipboardEvent' in window
			});
		},


		/* spellcheck */

		function(results) {
			results.setItem({
				key:	'interaction-spellcheck',
				passed:	'spellcheck' in document.createElement('div')
			});
		},


		/* webworker */

		function(results) {
			results.setItem({
				key:	'performance-worker',
				passed:	!!window.Worker
			});
		},


		/* sharedworker */

		function(results) {
			results.setItem({
				key:	'performance-sharedWorker',
				passed:	!!window.SharedWorker
			});
		},


		/* datatypes */

		function(results) {
			results.setItem({
				key:	'performance-datatypes-ArrayBuffer',
				passed:	typeof ArrayBuffer != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Int8Array',
				passed:	typeof Int8Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Uint8Array',
				passed:	typeof Uint8Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Uint8ClampedArray',
				passed:	typeof Uint8ClampedArray != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Int16Array',
				passed:	typeof Int16Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Uint16Array',
				passed:	typeof Uint16Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Int32Array',
				passed:	typeof Int32Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Uint32Array',
				passed:	typeof Uint32Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Float32Array',
				passed:	typeof Float32Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-Float64Array',
				passed:	typeof Float64Array != 'undefined'
			});

			results.setItem({
				key:	'performance-datatypes-DataView',
				passed:	typeof DataView != 'undefined'
			});
		},


		/* crypto */

		function(results) {
			var passed = NO;
			try {
				var crypto = window.crypto || window.webkitCrypto || window.mozCrypto || window.msCrypto || window.oCrypto;
				var available = window.crypto ? YES : window.mozCrypto || window.msCrypto || window.oCrypto ? YES | PREFIX : NO;
				passed = !!crypto && 'subtle' in crypto ? available : !!crypto && 'webkitSubtle' in crypto ? YES | PREFIX : NO;
			} catch(e) {
			}

			results.setItem({
				key:	'security-crypto',
				passed: passed
			});
		},


		/* csp 1.0 */

		function(results) {
			results.setItem({
				key:	'security-csp10',
				passed:	!(function() { try { return eval('true'); } catch (e) {} return false; })()
			});
		},


		/* csp 1.1 */

		function(results) {
			results.setItem({
				key:	'security-csp11',
				passed:	'SecurityPolicyViolationEvent' in window
			});
		},


		/* cors */

		function(results) {
			results.setItem({
				key:	'security-cors',
				passed:	window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()
			});
		},


		/* postMessage */

		function(results) {
			results.setItem({
				key:	'security-postMessage',
				passed:	!!window.postMessage
			});
		},


		/* sandboxed iframe */
		
		function(results) {
			results.setItem({
				key:	'security-sandbox',
				passed:	'sandbox' in document.createElement('iframe')
			});
		},


		/* srcdoc iframe */
		
		function(results) {
			results.setItem({
				key:	'security-srcdoc',
				passed:	'srcdoc' in document.createElement('iframe')
			});
		},


		/* history */
		
		function(results) {
			results.setItem({
				key:	'history-history',
				passed:	!!(window.history && history.pushState)
			});
		},


		/* video element */
		
		function(results) {
			this.element = document.createElement('video');

			results.setItem({
				key:	'video-element',
				passed:	!!this.element.canPlayType
			});


			/* audioTracks property */

			results.setItem({
				key:	'video-audiotracks',
				passed:	'audioTracks' in this.element
			});


			/* videoTracks property */

			results.setItem({
				key:	'video-videotracks',
				passed:	'videoTracks' in this.element
			});


			/* subtitles */

			results.setItem({
				key:	'video-subtitle',
				passed:	'track' in document.createElement('track')
			});


			/* poster */

			results.setItem({
				key:	'video-poster',
				passed:	'poster' in this.element
			});


			/* drm */

			results.setItem({
				key:	'video-drm',
				passed:	'setMediaKeys' in this.element ? YES : 'webkitAddKey' in this.element || 'webkitSetMediaKeys' in this.element || 'mozSetMediaKeys' in this.element || 'msSetMediaKeys' in this.element ? YES | PREFIX : NO
			});


			/* mediasource */

			results.setItem({
				key:	'video-mediasource',
				passed:	'MediaSource' in window ? YES : 'WebKitMediaSource' in window || 'mozMediaSource' in window || 'msMediaSource' in window ? YES | PREFIX : NO
			});


			/* recorder */

			results.setItem({
				key:	'video-recorder',
				passed:	'MediaRecorder' in window
			});
		},


		/* video codecs */

		function(results) {
			this.element = document.createElement('video');

			/* mpeg-4 codec */

			results.setItem({
				key:	'video-mpeg4',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'video/mp4; codecs="mp4v.20.8"')
			});

			/* h.264 codec */

			/* I added a workaround for IE9, which only detects H.264 if you also provide an audio codec. Bug filed @ connect.microsoft.com */

			results.setItem({
				key:	'video-h264',
				passed:	!!this.element.canPlayType && (canPlayType(this.element, 'video/mp4; codecs="avc1.42E01E"') || canPlayType(this.element, 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))
			});

			/* h.265 codec */

			results.setItem({
				key:	'video-h265',
				passed:	!!this.element.canPlayType && (canPlayType(this.element, 'video/mp4; codecs="hvc1.1.L0.0"') || canPlayType(this.element, 'video/mp4; codecs="hev1.1.L0.0"'))
			});

			/* theora codec */

			results.setItem({
				key:	'video-theora',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'video/ogg; codecs="theora"')
			});

			/* vp8 in webm codec */

			results.setItem({
				key:	'video-webmvp8',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'video/webm; codecs="vp8"')
			});

			/* vp9 in webm codec */

			results.setItem({
				key:	'video-webmvp9',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'video/webm; codecs="vp9"')
			});

			/* does codec detection work properly? */

			var passed = true;

			if (!!this.element.canPlayType) {
				if (this.element.canPlayType('video/nonsense') == 'no') {
					passed = false;
					log('Codec detection is buggy: known bug in Firefox 3.5.0 - 3.5.1 and Safari 4.0.0 - 4.0.4 that answer "no" to unknown codecs instead of an empty string')
				}

				if (this.element.canPlayType('video/webm') == 'probably') {
					passed = false;
					log('Codec detection is buggy: known bug that Firefox 27 and earlier always says "probably" when asked about WebM, even when the codecs string is not present')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') == 'maybe' && this.element.canPlayType('video/mp4') == 'probably') {
					passed = false;
					log('Codec detection is buggy: known bug in iOS 4.1 and earlier that switches "maybe" and "probably" around')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') == 'maybe' && this.element.canPlayType('video/mp4') == 'maybe') {
					passed = false;
					log('Codec detection is buggy: known bug in Android where no better answer than "maybe" is given')
				}

				if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') == 'probably' && this.element.canPlayType('video/mp4; codecs="avc1.42E01E"') != 'probably') {
					passed = false;
					log('Codec detection is buggy: known bug in Internet Explorer 9 that requires both audio and video codec on test')
				}
			}

			results.setItem({
				key:	'video-canplaytype',
				passed:	this.element.canPlayType ? (passed ? YES : YES | BUGGY) : NO
			});
		},


		/* audio element */
		
		function(results) {
			this.element = document.createElement('audio');

			results.setItem({
				key:	'audio-element',
				passed:	!!this.element.canPlayType
			});

			/* loop property */

			results.setItem({
				key:	'audio-loop',
				passed:	'loop' in this.element
			});

			/* preload property */

			results.setItem({
				key:	'audio-preload',
				passed:	'preload' in this.element
			});
		},


		/* audio codecs */
		
		function(results) {
			this.element = document.createElement('audio');

			/* pcm codec */

			results.setItem({
				key:	'audio-pcm',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/wav; codecs="1"')
			});

			/* mp3 codec */

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

			results.setItem({
				key:	'audio-mp3',
				passed:	r
			});

			/* aac codec */

			results.setItem({
				key:	'audio-aac',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/mp4; codecs="mp4a.40.2"')
			});

			/* ac3 codec */

			results.setItem({
				key:	'audio-ac3',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/mp4; codecs="ac-3"')
			});

			/* enhanced ac3 codec */

			results.setItem({
				key:	'audio-ec3',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/mp4; codecs="ec-3"')
			});

			/* ogg vorbis codec */

			results.setItem({
				key:	'audio-vorbis',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/ogg; codecs="vorbis"')
			});

			/* ogg opus codec */

			results.setItem({
				key:	'audio-opus',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/ogg; codecs="opus"')
			});

			/* webm vorbis codec */

			results.setItem({
				key:	'audio-webm',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/webm; codecs="vorbis"')
			});

			/* webm opus codec */

			results.setItem({
				key:	'audio-webmopus',
				passed:	!!this.element.canPlayType && canPlayType(this.element, 'audio/webm; codecs="opus"')
			});
		},


		/* webaudio */
		
		function(results) {
			results.setItem({
				key:		'audio-webaudio',
				passed:		'AudioContext' in window ? YES : 'webkitAudioContext' in window || 'mozAudioContext' in window || 'oAudioContext' in window || 'msAudioContext' in window ? YES | PREFIX : NO
			});
		},


		/* speech recognition */
		
		function(results) {
			results.setItem({
				key:		'audio-speechrecognition',
				passed:		'SpeechRecognition' in window ? YES : 'webkitSpeechRecognition' in window || 'mozSpeechRecognition' in window || 'oSpeechRecognition' in window || 'msSpeechRecognition' in window ? YES | PREFIX : NO
			});
		},


		/* speech synthesis */
		
		function(results) {
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


		/* picture element */
		
		function(results) {
			results.setItem({
				key:	'responsive-picture',
				passed:	'HTMLPictureElement' in window
			});
		},
		
		
		/* srcset attribute */

		function(results) {
			results.setItem({
				key:	'responsive-srcset',
				passed:	'srcset' in document.createElement('img')
			});
		},


		/* sizes attribute */
		
		function(results) {
			results.setItem({
				key:	'responsive-sizes',
				passed:	'sizes' in document.createElement('img')
			});
		},


		/* canvas element and 2d context */
		
		function(results) {
			this.canvas = document.createElement('canvas');

			results.setItem({
				key:	'canvas-context',
				passed:	!! (this.canvas.getContext && typeof CanvasRenderingContext2D != 'undefined' && this.canvas.getContext('2d') instanceof CanvasRenderingContext2D)
			});
		},


		/* canvas drawing functions */

		function(results) {
			this.canvas = document.createElement('canvas');

			/* text support */

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

			/* ellipse support */

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

			/* dashed support */

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

			/* focusring support */

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

			/* hittest support */

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
		},


		/* path support */
		
		function(results) {
			results.setItem({
				key:	'canvas-path',
				passed:	typeof Path2D != "undefined" ? YES : typeof Path != "undefined" ? YES | OLD : NO
			});
		},


		/* blending support */

		function(results) {
			this.canvas = document.createElement('canvas');
			
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
		},


		/* export to image format */

		function(results) {
			this.canvas = document.createElement('canvas');

			/* export to png */

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

			/* export to jpeg */

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

			/* export to jpeg xr */

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

			/* export to webp */

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
		},


		/* webgl */
		
		function(results) {
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
				key:	'webgl-context',
				passed:	passed ? (context == 'webgl' ? YES : YES | PREFIX) : NO
			});
		},


		/* animation api */
		
		function(results) {
			results.setItem({
				key:	'animation-webanimation',
				passed:	'animate' in document.createElement('div')
			});
		},


		/* requestAnimationFrame */
		
		function(results) {
			results.setItem({
				key:	'animation-requestAnimationFrame',
				passed:	!! window.requestAnimationFrame ? YES : !! window.webkitRequestAnimationFrame || !! window.mozRequestAnimationFrame || !! window.msRequestAnimationFrame || !! window.oRequestAnimationFrame ? YES | PREFIX : NO
			});
		},


		/* applicationCache */
		
		function(results) {
			results.setItem({
				key:	'offline-applicationCache',
				passed:	!!window.applicationCache
			});
		},


		/* serviceWorker */
		
		function(results) {
			results.setItem({
				key:	'offline-serviceWorkers',
				passed:	!!window.navigator.serviceWorker
			});
		},


		/* registerProtocolHandler */
		
		function(results) {
			results.setItem({
				key:	'offline-registerProtocolHandler',
				passed:	!!window.navigator.registerProtocolHandler
			});
		},


		/* registerContentHandler */
		
		function(results) {
			results.setItem({
				key:	'offline-registerContentHandler',
				passed:	!!window.navigator.registerContentHandler
			});
		},


		/* session storage */
		
		function(results) {
			results.setItem({
				key:	'storage-sessionStorage',
				passed:	'sessionStorage' in window && window.sessionStorage != null
			});

		},


		/* local storage */
		
		function(results) {
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
				key:	'storage-localStorage',
				passed:	passed
			});
		},


		/* indexeddb */
		
		function(results) {
			var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB || window.oIndexedDB || window.msIndexedDB;
			var passed = !! window.indexedDB ? YES : !! window.webkitIndexedDB || !! window.mozIndexedDB || !! window.moz_indexedDB || !! window.oIndexedDB || !! window.msIndexedDB ? YES | PREFIX : NO;
			if (indexedDB && ! 'deleteDatabase' in indexedDB) passed != BUGGY;

			results.setItem({
				key:	'storage-indexedDB.basic',
				passed:	passed
			});

			/* indexeddb blob and arraybuffer storage */

			var blobitem = results.setItem({
				key:	'storage-indexedDB.blob',
				passed:	false
			});

			var arrayitem = results.setItem({
				key:	'storage-indexedDB.arraybuffer',
				passed:	false
			});

			if (indexedDB && 'deleteDatabase' in indexedDB) {
				log('IndexedDB: starting tests');

				try {
					blobitem.startBackground();
					arrayitem.startBackground();

					log('IndexedDB: delete existing database (if exists)');
					var request = indexedDB.deleteDatabase('html5test');

					request.onerror = function(e) {
						log('IndexedDB: error, could not delete database', e);

						blobitem.stopBackground();
						arrayitem.stopBackground();
					};

					request.onsuccess = function () {
						var request = indexedDB.open('html5test', 1);
						log('IndexedDB: opening new database');

						request.onupgradeneeded = function() {
							log('IndexedDB: creating objectStore');
							request.result.createObjectStore("store");
						};

						request.onerror = function(event) {
							log('IndexedDB: error opening database', event);

							blobitem.stopBackground();
							arrayitem.stopBackground();
						};

						request.onsuccess = function() {
							log('IndexedDB: database opened');

							var db = request.result;

							try {
								db.transaction("store", "readwrite").objectStore("store").put(new Blob(), "key");

								log('IndexedDB: objectStore with Blob passed');

								blobitem.update({
									passed: true
								});
							} catch (e) {
								log('IndexedDB: objectStore with Blob failed');
							}

							try {
								db.transaction("store", "readwrite").objectStore("store").put(new ArrayBuffer(), "key");

								log('IndexedDB: objectStore with ArrayBuffer passed');

									arrayitem.update({
									passed: true
								});

							} catch (e) {
								log('IndexedDB: objectStore with ArrayBuffer failed');
							}

							blobitem.stopBackground();
							arrayitem.stopBackground();

							db.close();
							indexedDB.deleteDatabase('html5test');
						};
					};
				} catch (e) {
					log('IndexedDB: exception reached during test', e);

					blobitem.stopBackground();
					arrayitem.stopBackground();
				}
			}
		},


		/* websql */
		
		function(results) {
			results.setItem({
				key:	'storage-sqlDatabase',
				passed:	!!window.openDatabase
			});
		},


		/* file reader */
		
		function(results) {
			results.setItem({
				key:	'files-fileReader',
				passed:	'FileReader' in window
			});

			/* file reader as blob */

			results.setItem({
				key:	'files-fileReader.blob',
				passed:	'Blob' in window
			});

			/* file reader as data url */

			results.setItem({
				key:	'files-fileReader.dataURL',
				passed:	'FileReader' in window && 'readAsDataURL' in (new FileReader())
			});

			/* file reader as array buffer */

			results.setItem({
				key:	'files-fileReader.arraybuffer',
				passed:	'FileReader' in window && 'readAsArrayBuffer' in (new FileReader())
			});

			/* file reader as object url */

			results.setItem({
				key:	'files-fileReader.objectURL',
				passed:	'URL' in window && 'createObjectURL' in URL
			});
		},

		
		/* request file system */
		
		function(results) {
			results.setItem({
				key:	'files-fileSystem',
				passed:	!! window.requestFileSystem ? YES : !! window.webkitRequestFileSystem || !! window.mozRequestFileSystem || !! window.oRequestFileSystem || !! window.msRequestFileSystem ? YES | PREFIX : NO
			});
		},


		/* get file system */
		
		function(results) {
			results.setItem({
				key:	'files-getFileSystem',
				passed:	!! navigator.getFileSystem ? YES : !! navigator.webkitGetFileSystem || !! navigator.mozGetFileSystem || !! window.msGetFileSystem ? YES | PREFIX : NO
			});
		},


		/* readable streams */
		
		function(results) {
			results.setItem({
				key:	'streams-streams.readable',
				passed:	'ReadableStream' in window
			});

		},


		/* writeable streams */
		
		function(results) {
			results.setItem({
				key:	'streams-streams.writeable',
				passed:	'WriteableStream' in window
			});
		},


		/* custom elements */

		function(results) {
			results.setItem({
				key:	'components-custom',
				passed:	'registerElement' in document
			});
		},


		/* shadow dom */
		
		function(results) {
			results.setItem({
				key:	'components-shadowdom',
				passed:	'attachShadow' in document.createElement('div') ? YES : 'createShadowRoot' in document.createElement('div') || 'webkitCreateShadowRoot' in document.createElement('div') ? YES | OLD : NO
			});
		},


		/* templates */
		
		function(results) {
			var passed = false;

			try {
				passed = 'content' in document.createElement('template');
			} catch(error) {
			}

			results.setItem({
				key:	'components-template',
				passed:	passed
			});
		},


		/* html imports */
		
		function(results) {
			results.setItem({
				key:	'components-imports',
				passed:	'import' in document.createElement('link')
			});
		},


		/* async scripts */
		
		function(results) {
			results.setItem({
				key:	'other-async',
				passed:	'async' in document.createElement('script')
			});
		},
		
		
		/* deferred scripts */

		function(results) {
			results.setItem({
				key:	'other-defer',
				passed:	'defer' in document.createElement('script')
			});
		},


		/* script error reporting */
		
		function(results) {
			results.setItem({
				key:	'other-onerror',
				passed:	isEventSupported('error')
			});
		},


		/* script execution events */
		
		function(results) {
			var executionevents = results.setItem({
				key:	'other-executionevents',
				passed:	false
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
		},


		/* base64 encoding and decoding */
		
		function(results) {
			results.setItem({
				key:	'other-base64',
				passed:	'btoa' in window && 'atob' in window
			});
		},


		/* json encoding and decoding */
		
		function(results) {
			results.setItem({
				key:	'other-json',
				passed:	'JSON' in window && 'parse' in JSON
			});
		},


		/* mutation observer */
		
		function(results) {
			results.setItem({
				key:	'other-mutationObserver',
				passed: 'MutationObserver' in window ? YES : 'WebKitMutationObserver' in window || 'MozMutationObserver' in window || 'oMutationObserver' in window || 'msMutationObserver' in window ? YES | PREFIX : NO
			});
		},

		
		/* url api */
		
		function(results) {
			results.setItem({
				key:	'other-url',
				passed: 'URL' in window ? YES : 'WebKitURL' in window || 'MozURL' in window || 'oURL' in window || 'msURL' in window ? YES | PREFIX : NO
			});
		},


		/* text encoding api */
		
		function(results) {
			results.setItem({
				key:	'other-encoding',
				passed: 'TextEncoder' in window && 'TextDecoder' in window ? YES : NO
			});
		},


		/* internationalisation api */
		
		function(results) {
			results.setItem({
				key:	'other-i18n',
				passed:	'Intl' in window ? YES : NO
			});
		},

		
		/* promises */
		
		function(results) {
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
				key:	'other-promises',
				passed:	passed
			});
		},


		/* page visiblity */
		
		function(results) {
			results.setItem({
				key:	'other-pagevisiblity',
				passed:	'visibilityState' in document ? YES : 'webkitVisibilityState' in document || 'mozVisibilityState' in document || 'oVisibilityState' in document || 'msVisibilityState' in document ? YES | PREFIX : NO
			});
		},


		/* selection */

		function(results) {
			results.setItem({
				key:	'other-getSelection',
				passed:	!!window.getSelection
			});
		},


		/* scrollIntoView */
		
		function(results) {
			results.setItem({
				key:	'other-scrollIntoView',
				passed:	'scrollIntoView' in document.createElement('div')
			});
		}
	];




	/* Helper functions */

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

	var log = function(m){
		if (console && console.log) {
			console.log(m);
		}
	};

	var createInput = function(type) {
		var field = document.createElement('input');

		try {
			field.setAttribute('type', type);
		} catch(e) {
		}

		return field;
	};

	var canPlayType = function(element, type) {
		/*
			There is a bug in iOS 4.1 or earlier where probably and maybe are switched around.
			This bug was reported and fixed in iOS 4.2
		*/

		if (Browsers.isOs('iOS', '<', '4.2'))
			return element.canPlayType(type) == 'probably' || element.canPlayType(type) == 'maybe';
		else
			return element.canPlayType(type) == 'probably';
	};

	var closesImplicitly = function(name) {
		var foo = document.createElement('div');
		foo.innerHTML = '<p><' + name + '></' + name + '>';
		return foo.childNodes.length == 2;
	};

	var getStyle = function(element, name) {
		function camelCase(str){
			return str.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase()
			})
		}

		if (element.style[name]) {
			return element.style[name];
		} else if (element.currentStyle) {
			return element.currentStyle[camelCase(name)];
		}
		else if (document.defaultView && document.defaultView.getComputedStyle) {
			s = document.defaultView.getComputedStyle(element, "");
			return s && s.getPropertyValue(name);
		} else {
			return null;
		}
	};

	var isBlock = function(element) {
		return getStyle(element, 'display') == 'block';
	};

	var isHidden = function(element) {
		return getStyle(element, 'display') == 'none';
	};




	/* Classes */

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

	function test (callback, error) { this.initialize(callback, error); }
	test.prototype = {
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

				for (var s = 0; s < testsuite.length; s++) {
					testsuite[s](this.results);
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
				version:	version,
				revision:	revision,
				uniqueid:	uniqueid,
				results:	this.results.toString(),
			});
		}
	};

	return test;
})();