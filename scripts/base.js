	
	

	/* Polyfills */		
	
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== "function") {
	      // closest thing possible to the ECMAScript 5 internal IsCallable function
	      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	
	    var aArgs = Array.prototype.slice.call(arguments, 1), 
	        fToBind = this, 
	        fNOP = function () {},
	        fBound = function () {
	          return fToBind.apply(this instanceof fNOP && oThis
	                                 ? this
	                                 : oThis,
	                               aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	
	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();
	
	    return fBound;
	  };
	}
	
	(function(win, doc){
		if(win.addEventListener)return;		//No need to polyfill
	
		function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
		function addEvent(on, fn, self){
			return (self = this).attachEvent('on' + on, function(e){
				var e = e || win.event;
				e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
				e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
				fn.call(self, e);
			});
		}
		function addListen(obj, i){
			if(!obj) return obj;
			if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
			else obj.addEventListener = addEvent;
			return obj;
		}
	
		addListen([doc, win]);
		if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
		else{																			//IE < 8
			doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
			docHijack('getElementsByTagName');
			docHijack('getElementById');
			docHijack('createElement');
			addListen(doc.all);	
		}
	})(window, document);
		
	
	
	
		
	/* Utility functions */		
	
	(function() {
		window.t = function(s) { return (translation[s] ? translation[s] : s); };
		
		if(document.addEventListener) {
		    document.addEventListener("DOMContentLoaded", function()
		    {
		        document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
		        translate();
		    }, false);
		}
		else if(document.attachEvent) {
		    document.attachEvent("onreadystatechange", function()
		    {
		        if(document.readyState === "complete") {
		            document.detachEvent("onreadystatechange", arguments.callee);
		            translate();
		        }
		    });
		}
		
		function translate() {
			if (document.querySelectorAll) {
				var elements = document.querySelectorAll('[data-i18n]');
				for (var i = 0; i < elements.length; i++) {
					var id = elements[i].getAttribute('data-i18n');
					if (id == '') id = elements[i].innerHTML;
					if (id && translation[id]) elements[i].innerHTML = translation[id];
				}
			}
		}
	})();
	
	var tim = (function(){
	    var starts  = "\\{\\{",
	        ends    = "\\}\\}",
	        path    = "[a-z0-9_][\\.a-z0-9_]*", // e.g. config.person.name
	        pattern = new RegExp(starts + "("+ path +")" + ends, "gim"),
	        undef;
	    
	    return function(template, data, notFound){
	        // Merge the data into the template string
	        return template.replace(pattern, function(tag, ref){
	            var path = ref.split("."),
	                len = path.length,
	                lookup = data,
	                i = 0;
	
	            for (; i < len; i++){
	                lookup = lookup[path[i]];
	                
	                // Error handling for when the property is not found
	                if (lookup === undef){
	                    // If specified, substitute with the "not found" arg
	                    if (notFound !== undef){
	                        return notFound;
	                    }
	                    // Throw error
	                    throw "Tim: '" + path[i] + "' not found in " + tag;
	                }
	                
	                // Success! Return the required value
	                if (i === len - 1){
	                    return lookup;
	                }
	            }
	        });
	    };
	}());	

	
	
	/* Base UI functions */		
	
	var Confirm = function() { this.initialize.apply(this, arguments) };
	Confirm.prototype = {
		initialize: function(parent, options) {
			var that = this;
	
			this.options = options;
			
			this.useragent = document.createElement('p');
			this.useragent.className = 'useragent';
			parent.appendChild(this.useragent);
			this.useragent.innerHTML = t('You are using') + ' ' + Browsers;
			
			this.confirm = document.createElement('span');
			this.confirm.innerHTML = t('Correct?');
			this.useragent.appendChild(this.confirm);
			
			var correct = document.createElement('a');
			if (correct.addEventListener) {
				correct.addEventListener('click', function() { that.confirmUseragent.call(that); }, true);
			} else {
				correct.attachEvent('onclick', function() { that.confirmUseragent.call(that); });
			}
			correct.className = 'correct';
			correct.innerHTML = '✔';
			this.confirm.appendChild(correct);
			
			var wrong = document.createElement('a');
			if (correct.addEventListener) {
				wrong.addEventListener('click', function() { that.reportUseragent.call(that); }, true);
			} else {
				wrong.attachEvent('onclick', function() { that.reportUseragent.call(that); });
			}
			wrong.className = 'wrong';
			wrong.innerHTML = '✘';
			this.confirm.appendChild(wrong);
	
			this.thanks = document.createElement('span');
			this.thanks.style.display = 'none';
			this.thanks.innerHTML = t('Thanks!');
			this.useragent.appendChild(this.thanks);				
		},
	
		confirmUseragent: function() {
			this.options.onConfirm();
			this.showThanks();
		},
		
		reportUseragent: function() {
			this.options.onReport();
			this.showThanks();
		},
	
		showThanks: function() {
			this.confirm.style.display = 'none';
			this.thanks.style.display = 'inline';
			
			var that = this;
			window.setTimeout(function() {
				that.thanks.style.display = 'none';
			}, 2500);
		}
	}
	
	
	var Share = function() { this.initialize.apply(this, arguments) };
	Share.prototype = {
		initialize: function(parent, options) {
			var that = this;
	
			this.parent = parent;
			this.options = options;
			this.created = false;
	
			this.popup = document.createElement('div');
			this.popup.className = 'popupPanel pointsLeft share';
			this.popup.style.display = 'none';
			this.parent.appendChild(this.popup);
	
			this.parent.addEventListener('click', this.open.bind(this), true)
			this.parent.addEventListener('touchstart', this.open.bind(this), true)
	
			document.addEventListener('click', this.close.bind(this), true)
			document.addEventListener('touchstart', this.close.bind(this), true)
		},
		
		create: function() {
			this.created = true;
	
			this.popup.innerHTML +=
				"<div id='share'><div>" +
	
				"<div id='twitter'>" +
				"<a href='https://twitter.com/share' class='twitter-share-button' " +
					"data-url='http://html5test.com' " +
					"data-related='rakaz' " +
					"data-text='" + this.options.browser + " scored " + this.options.score + " points. How well does your browser support HTML5?' " + 
					"data-lang='en' "+
					"data-count='vertical'"+
					">Tweet</a>" +
				"</div>" +
	
				"<div id='facebook'>" +
				"<div class='fb-like' " +
					"data-href='http://html5test.com' " + 
					"data-send='false' " + 
					"data-layout='box_count' " +
					"data-width='60' " +
					"data-show-faces='false'" +
					"></div>" +
				"</div>" +
	
				"<div id='google'>" +
				"<div class='g-plusone' " +
					"data-href='http://html5test.com' " + 
					"data-size='tall'" +
					"></div>" +
				"</div>" +
				
				"</div></div>";
	
			!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id))
			{js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}
			(document,"script","twitter-wjs");
	
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=202643099847776";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
			
			
			(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			})();
		},
		
		open: function(e) {
			e.preventDefault();
	
			if (!this.created) {
				this.create();
			}
			
			this.popup.style.display = 'block';
		},
		
		close: function() {
			this.popup.style.display = 'none';
		}
	}
	
	
	var Save = function() { this.initialize.apply(this, arguments) };
	Save.prototype = {
		initialize: function(parent, options) {
			var that = this;
	
			this.parent = parent;
			this.options = options;
			this.created = false;
	
			this.popup = document.createElement('div');
			this.popup.className = 'popupPanel pointsLeft save';
			this.popup.style.display = 'none';
			this.parent.appendChild(this.popup);
	
			document.addEventListener('click', this.close.bind(this), false)
			document.addEventListener('touchstart', this.close.bind(this), false)
	
			this.parent.addEventListener('click', this.open.bind(this), true)
			this.parent.addEventListener('touchstart', this.open.bind(this), true)
		},
		
		create: function() {
			this.created = true;
	
			this.popup.innerHTML +=
				"<div id='save'>" + 
				
				"<p>You can see the results here:</p>" +
				"<p><a href='http://alpha.html5test.com/s/" + this.options.id + ".html'>http://alpha.html5test.com<br>/s/" + this.options.id + ".html</a></p>" + 
				"<p>Or scan this QR-code:</p>" +
				"<p>" + 
				"<img src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + encodeURIComponent("http://alpha.html5test.com/s/" + this.options.id + ".html") + "&choe=UTF-8' width='200' height='200'>" +
				"</p>" +
				"<p>The unique id for this test is:<br><code>" + this.options.id + "</code></p>" +
				"</div>";
		},
		
		open: function(e) {
			e.stopPropagation();
			
			var ignore = false;
			var el = e.target;
			
			while (el != this.parent && ignore == false) {
				if (el.className.indexOf('popupPanel') != -1) ignore = true;
				el = el.parentNode;
			}
			
			if (!ignore) {
				e.preventDefault();
				
				if (!this.created) {
					this.create();
				}
				
				this.popup.style.display = 'block';
			}
		},
		
		close: function(e) {
			this.popup.style.display = 'none';
		}
	}



	var ResultsTable = function() { this.initialize.apply(this, arguments) };
	ResultsTable.prototype = {
	
		initialize: function(options) {
			this.parent = options.parent;
			this.tests = options.tests;
			this.options = {
				title:			options.title || '',
				browsers:		options.browsers || [],
				columns:		options.columns || 2,
				distribute:		options.distribute || false,
				header:			options.header || false,
				links:			options.links || false,
				grading:		options.grading || false,
				features:		options.features || false,
				explainations:	options.explainations || false,
				
				onChange:		options.onChange || false
			}

			this.panel = null;

			var that = this;
			
			function close(e) {
				if (that.panel) {
					var cell = that.panel.parentNode;
					var node = e.target;

					while (node.parentNode) {
						if (node == that.panel) return;
						node = node.parentNode;
					}
				
					that.panel.parentNode.removeChild(that.panel);
					that.panel = null;

					var node = e.target;
					while (node.parentNode) {
						if (node == cell) return e.stopPropagation();
						node = node.parentNode;
					}
				}	
			}

			document.addEventListener('click', close, true)
			document.addEventListener('touchstart', close, true)

			this.data = [ null ];

			this.createCategories(this.parent, this.tests);
		},
		
		updateColumn: function(column, data) {
			this.data[column] = data;

			for (var c = 0; c < this.tests.length; c++)
			for (var i = 0; i < this.tests[c].items.length; i++) {
				var test = this.tests[c].items[i];
				
				if (typeof test != 'string') {
					if (typeof test != 'undefined') {
						var points = 0;
						var maximum = 0; 
						
						if (match = (new RegExp(test.id + "=([0-9]+)(?:\\/([0-9]+))?(?:\\+([0-9]+))?")).exec(data.points)) {
							points = match[1];
							if (match[2]) maximum = match[2];
						}

						var row = document.getElementById('head-' + test.id);
						var cell = row.childNodes[column + 1];
						
						var content = "<div><div class='grade'>";
						
						if (this.options.grading) {
							var grade = '';
							var percent = parseInt(points / maximum * 100, 10);
							switch (true) {
								case percent == 0: 	grade = 'none'; break;
								case percent <= 30: grade = 'badly'; break;
								case percent <= 60: grade = 'reasonable'; break;
								case percent <= 95: grade = 'good'; break;
								default:			grade = 'great'; break;
							}
						
							if (points == maximum)
								content += "<span class='" + grade + "'>" + points + "</span>";
							else
								content += "<span class='" + grade + "'>" + points + "/" + maximum + "</span>";
						} else {
							content += "<span>" + points + "</span>";
						}

						content += "</div></div>";
						
						cell.innerHTML = content;
						this.updateItems(column, data, 0, test.id, test.items);
					}
				}
			}			
		},

		updateItems: function(column, data, level, id, tests) {
			var count = [ 0, 0 ];
					
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var row = document.getElementById('row-' + id + '-' + tests[i].id);
					var cell = row.childNodes[column + 1];

					if (typeof tests[i].items != 'undefined') {
						var results = this.updateItems(column, data, level + 1, id + '-' + tests[i].id, tests[i].items);
					
						if (results[0] == results[1])
							cell.innerHTML = '<div>' + t('Yes') + ' <span class="check">✔</span></div>';
						else if (results[1] == 0)
							cell.innerHTML = '<div>' + t('No') + ' <span class="ballot">✘</span></div>';
						else
							cell.innerHTML = '<div><span class="partially">' + t('Partial') + '</span> <span class="partial">○</span></div>';
					} 
					
					else {
						var key = id + '-' + tests[i].id;
							
						if (match = (new RegExp(key + '=(-?[0-9]+)')).exec(data.results)) {
							switch(parseInt(match[1], 10)) {
								case 1:		cell.innerHTML = '<div>' + t('Yes') + ' <span class="check">✔</span></div>'; count[1]++; break;
								case -1:	cell.innerHTML = '<div>' + t('Buggy') + ' <span class="buggy">!</span></div>'; break;								
								case -2:	cell.innerHTML = '<div>' + t('Incomplete') + ' <span class="buggy">!</span></div>'; break;								
								default: 	cell.innerHTML = '<div>' + t('No') + ' <span class="ballot">✘</span></div>'; break;
							}
						} else {
							cell.innerHTML = '<div><span class="partially">' + t('Unknown') + '</span> <span class="partial">?</span></div>';
						}
					}

					count[0]++;
				}
			}
			
			return count;	
		},
			
		createCategories: function(parent, tests) {
			var left, right;	
					
			left = document.createElement('div');
			left.className = 'left';
			parent.appendChild(left);

			right = document.createElement('div');
			right.className = 'right';
			parent.appendChild(right);

		
			for (var i = 0; i < tests.length; i++) {
				var container = parent;
				if (tests[i].column == 'left') container = left;
				if (tests[i].column == 'right') container = right;
			
				var div = document.createElement('div');
				div.className = 'category ' + tests[i].id;
				container.appendChild(div);
			
				var h2 = document.createElement('h2');
				h2.innerHTML = t(tests[i].name);
				div.appendChild(h2);

				this.createSections(div, tests[i].items);
			}
		},
	
		createSections: function(parent, tests) {
			for (var i = 0; i < tests.length; i++) {
				var table = document.createElement('table');
				table.id = 'table-' + tests[i].id;
				parent.appendChild(table);

				var thead = document.createElement('thead');
				table.appendChild(thead);
				
				var tr = document.createElement('tr');
				tr.id = 'head-' + tests[i].id;
				thead.appendChild(tr);
				
				var th = document.createElement('th');
				th.innerHTML = t(tests[i].name);
				tr.appendChild(th);

				for (var c = 0; c < this.options.columns; c++) {
					var td = document.createElement('td');
					tr.appendChild(td);
				}
				
				if (typeof tests[i].items != 'undefined') {
					var tbody = document.createElement('tbody');
					table.appendChild(tbody);

					this.createItems(tbody, 0, tests[i].id, tests[i].items);
				}
			}
		},
		
		createItems: function(parent, level, id, tests, parentUrls) {
			var ids = [];
			
			for (var i = 0; i < tests.length; i++) {
				var tr = document.createElement('tr');
				parent.appendChild(tr);
	
				if (typeof tests[i] == 'string') {
					if (this.options.explainations || tests[i].substr(0, 4) != '<em>') {
						var th = document.createElement('th');
						th.colSpan = this.options.columns + 1;
						th.className = 'details';
						tr.appendChild(th);
	
						th.innerHTML = t(tests[i]);
					}
				} else {
					var th = document.createElement('th');
					th.innerHTML = "<div><span>" + t(tests[i].name) + "</span></div>";
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}
					
					tr.id = 'row-' + id + '-' + tests[i].id;
					
					if (level > 0) {
						tr.className = 'isChild';
					}
					
					if (typeof tests[i].items != 'undefined') {
						var urls = null;

						if (this.options.links) {
							if (typeof tests[i].urls != 'undefined') {
								urls = tests[i].urls;	
							}						
							else if (typeof tests[i].url != 'undefined') {
								urls = { 'w3c': tests[i].url };
							}
						}

						tr.className += 'hasChild';
						var children = this.createItems(parent, level + 1, id + '-' + tests[i].id, tests[i].items, urls);
						this.hideChildren(tr, children);
						
						(function(that, tr, th, children) {
							th.onclick = function() {
								that.toggleChildren(tr, children);
							};		
						})(this, tr, th, children);
					} else {
						var urls;
						var showLinks = false;
	
						if (typeof tests[i].urls != 'undefined') {
							urls = tests[i].urls;	
							showLinks = true;
						}						
						else if (typeof tests[i].url != 'undefined') {
							urls = { 'w3c': tests[i].url };
							showLinks = true;
						}
						
						if (showLinks) {
							th.className = 'hasLink';
							
							(function(that, th, id, name, parentUrls, urls) {
								th.onclick = function() {
									that.showLinks(th, id, name, parentUrls, urls);
								};		
							})(this, th, id + '-' + tests[i].id, tests[i].name, parentUrls, urls);
						}
					}
					
					ids.push(tr.id);
				}
			}	
			
			return ids;
		},
	
		showLinks: function(parent, id, name, parentUrls, urls) {
			if (this.panel) {
				this.panel.parentNode.removeChild(this.panel);
				this.panel = null;
			}
			
			var result = {};
			if (parentUrls) for (key in parentUrls) result[key] = parentUrls[key];
			if (urls) for (key in urls) result[key] = urls[key];
			
			var content = "<a href='/compare/feature/" + id +".html' class='compare'>" + t('Compare browsers') + "</a>";
			if (typeof result.w3c != 'undefined') content += "<a href='" + result.w3c +"' class='w3c'>" + t('Go to the specification at W3C.org') + "</a>";
			if (typeof result.whatwg != 'undefined') content += "<a href='" + result.whatwg +"' class='whatwg'>" + t('Go to the specification at Whatwg.org') + "</a>";
			if (typeof result.khronos != 'undefined') content += "<a href='" + result.khronos +"' class='khronos'>" + t('Go to the specification at Khronos.org') + "</a>";
			if (typeof result.wp != 'undefined') content += "<a href='http://docs.webplatform.org/wiki" + result.wp +"' class='wp'>" + t('Documentation at WebPlatform.org') + "</a>";
			if (typeof result.mdn != 'undefined') content += "<a href='https://developer.mozilla.org/en-US/docs" + result.mdn +"' class='mdn'>" + t('Documentation at Mozilla Developer Network') + "</a>";
		
			this.panel = document.createElement('div');
			this.panel.className = 'linksPanel popupPanel pointsLeft';
			this.panel.innerHTML = content;
			parent.appendChild(this.panel);
		},
	
		toggleChildren: function(element, ids) {
			if (element.className.indexOf(' hidden') == -1) {
				this.hideChildren(element, ids);
			} else {
				this.showChildren(element, ids);
			}
		},
		
		showChildren: function(element, ids) {
			element.className = element.className.replace(' hidden', '');
			
			for (var i = 0; i < ids.length; i++) {
				var e = document.getElementById(ids[i]);
				e.style.display = 'table-row';
			}
		},
	
		hideChildren: function(element, ids) {
			element.className = element.className.replace(' hidden', '');
			element.className += ' hidden';
			
			for (var i = 0; i < ids.length; i++) {
				var e = document.getElementById(ids[i]);
				e.style.display = 'none';
			}
		}
	}



