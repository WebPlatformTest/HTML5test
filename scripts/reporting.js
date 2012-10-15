	
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
	


	var FeatureTable = function() { this.initialize.apply(this, arguments) };
	FeatureTable.prototype = {
	
		initialize: function(options) {
			this.parent = options.parent;
			this.tests = options.tests;
			this.options = {
				title:			options.title || '',
				browsers:		options.browsers || [],
				columns:		options.columns || 2,
				header:			options.header || false,
				links:			options.links || false,
				grading:		options.grading || false,
				bonus:			options.bonus || false,
				features:		options.features || false,
				explainations:	options.explainations || false,
				
				onChange:		options.onChange || false
			}

			this.panel = null;

			if (this.options.links) {
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
			}

			this.data = [];
			for (var i = 0; i < this.options.columns; i++) {
				this.data[i] = null;
			}
			
			this.createSections(this.parent);
		},
		
		loadColumn: function(column, id) {
			var that = this;
			
			var httpRequest;
			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}

		   	httpRequest.open('POST','/api/loadBrowser', true);
			httpRequest.onreadystatechange = process;
		   	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send('id=' + encodeURIComponent(id));

			function process() {
				if (httpRequest.readyState == 4 && httpRequest.responseText != '') {
					var data = JSON.parse(httpRequest.responseText);
					that.updateColumn(column, data);
				}
			}
		},
		
		calculateColumn: function(column) {
			var that = this;

			new Test(process);
			
			function process(r) {
				that.updateColumn(column, {
					id:				'mybrowser',
					nickname:		t('My browser'),
					score:			r.score,
					bonus:			r.bonus,
					points:			r.points,
					results:		r.results
				})
			}
		},
		
		clearColumn: function(column) {
			this.data[column] = null;
			
			if (this.options.onChange) {
				var ids = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) 
						ids.push(this.data[i].id);
				}

				this.options.onChange(ids);
			}

			if (this.options.header) {
				var row = document.getElementById('row-header');
				var cell = row.childNodes[column + 1];
				cell.className = 'empty';
				cell.firstChild.firstChild.innerHTML = '';
				cell.firstChild.childNodes[1].selectedIndex = 0;
			}
			
			for (var i = 0; i < this.tests.length; i++) {
				if (typeof this.tests[i] != 'string') {
					if (typeof this.tests[i].items != 'undefined') {
						var row = document.getElementById('head-' + tests[i].id);
						var cell = row.childNodes[column + 1];
						cell.innerHTML = '';

						this.clearItems(column, this.tests[i].id, this.tests[i].items);
					}
				}
			}				
		},
		
		clearItems: function(column, id, tests) {
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var row = document.getElementById('row-' + id + '-' + tests[i].id);
					var cell = row.childNodes[column + 1];
					cell.innerHTML = '';
					
					if (typeof tests[i].items != 'undefined') {
						this.clearItems(column, id + '-' + tests[i].id, tests[i].items);
					}
				}
			}
		},
		
		updateColumn: function(column, data) {
			this.data[column] = data;

			if (this.options.onChange) {
				var ids = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) 
						ids.push(this.data[i].id);
				}

				this.options.onChange(ids);
			}
		
			if (this.options.header) {
				var row = document.getElementById('row-header');
				var cell = row.childNodes[column + 1];
				cell.className = '';
				cell.firstChild.firstChild.innerHTML = '<span class="nickname">' + t(data.nickname) + '</span><span class="score">' + data.score + '</span><span class="bonus">' + data.bonus + ' ' + t('bonus points') + '</span>';
			}
			
			for (var i = 0; i < this.tests.length; i++) {
				if (typeof this.tests[i] != 'string') {
					if (typeof this.tests[i].items != 'undefined') {
						var points = 0;
						var maximum = 0; 
						var bonus = 0;
						
						if (match = (new RegExp(tests[i].id + "=([0-9]+)(?:\\/([0-9]+))?(?:\\+([0-9]+))?")).exec(data.points)) {
							points = match[1];
							if (match[2]) maximum = match[2];
							if (match[3]) bonus = match[3];
						}

						var row = document.getElementById('head-' + tests[i].id);
						var cell = row.childNodes[column + 1];
						
						var content = "<div class='grade'>";
						
						if (this.options.bonus && bonus > 0) {
							content += "<span class='bonus'>+" + bonus + "<span> " + t('bonus points') + "</span></span>";
						}
												
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

						content += "</div>"
						
						cell.innerHTML = content;
						this.updateItems(column, data, 0, this.tests[i].id, this.tests[i].items);
					}
				}
			}			
		},

		updateItems: function(column, data, level, id, tests) {
			var count = [ 0, 0 ];
					
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var unknown = false;
					var passed = null;
				
					var key = id + '-' + tests[i].id;
						
					if (match = (new RegExp(key + '=([0|1])')).exec(data.results))
						passed = match[1] == '1';
					else
						unknown = true;
					
					var row = document.getElementById('row-' + id + '-' + tests[i].id);
					var cell = row.childNodes[column + 1];
					
					if (typeof tests[i].items != 'undefined') {
						var results = this.updateItems(column, data, level + 1, id + '-' + tests[i].id, tests[i].items);
					
						if (results[0] == results[1])
							cell.innerHTML = t('Yes') + ' <span class="check">✔</span>';
						else if (results[1] == 0)
							cell.innerHTML = t('No') + ' <span class="ballot">✘</span>';
						else
							cell.innerHTML = '<span class="partially">' + t('Partial') + '</span> <span class="partial">○</span>';
					} 
					
					else {
						if (unknown) {
							cell.innerHTML = '<span class="partially">' + t('Unknown') + '</span> <span class="partial">?</span>';
						} else {
							if (passed)
								cell.innerHTML = t('Yes') + ' <span class="check">✔</span>';
							else
								cell.innerHTML = t('No') + ' <span class="ballot">✘</span>';
						}
					}

					count[0]++;
					if (passed) count[1]++
				}
			}
			
			return count;	
		},
			
		
	
		createSections: function(parent) {
			if (this.options.header) {
				var table = document.createElement('table');
				table.id = 'table-header';
				parent.appendChild(table);
				
				var tbody = document.createElement('tbody');
				table.appendChild(tbody);
				
				var tr = document.createElement('tr');
				tr.id = 'row-header';
				tbody.appendChild(tr);

				var th = document.createElement('th');
				th.innerHTML = this.options.title;
				tr.appendChild(th);

				for (var c = 0; c < this.options.columns; c++) {
					var td = document.createElement('td');
					td.className = 'empty';
					tr.appendChild(td);
					
					var wrapper = document.createElement('div');
					td.appendChild(wrapper);
								
					var div = document.createElement('div');
					div.className = 'name';
					wrapper.appendChild(div);
								
					var menu = document.createElement('div');
					menu.className = 'popup';
					wrapper.appendChild(menu);
					
					var scroll = document.createElement('div');
					menu.appendChild(scroll);
					
 					var list = document.createElement('ul');
					scroll.appendChild(list);	
					
					var item = document.createElement('li');
					item.innerHTML = t('My browser');
					list.appendChild(item);

					(function(c, menu, item, that) {
						item.addEventListener('click', function(e) { 
							menu.className = 'popup';
							that.calculateColumn(c);
							e.stopPropagation();
						}, true);
					})(c, menu, item, this);

					var type = null;
					for (var i = 0; i < this.options.browsers.length; i++) {
						if (type != this.options.browsers[i].type) {
							var item = document.createElement('li');
							item.className = 'indent-0 title';
							list.appendChild(item);
							
							switch(this.options.browsers[i].type) {
								case 'desktop':		item.innerHTML = t('Desktop browsers'); break;
								case 'gaming':		item.innerHTML = t('Gaming'); break;
								case 'mobile':		item.innerHTML = t('Mobiles'); break;
								case 'tablet':		item.innerHTML = t('Tablets'); break;
								case 'television':	item.innerHTML = t('Television'); break;
							}
						}
						
						var item = document.createElement('li');
						item.innerHTML = this.options.browsers[i].nickname + (this.options.browsers[i].details ? ' <em>(' + this.options.browsers[i].details + ')</em>' : '');
						list.appendChild(item);

						(function(c, menu, item, id, that) {
							item.addEventListener('click', function(e) { 
								menu.className = 'popup';
								that.loadColumn(c, id);
								e.stopPropagation();
							}, true);
						})(c, menu, item, this.options.browsers[i].id, this);

						type = this.options.browsers[i].type;
					}

					(function(that, c, menu) {
						document.body.addEventListener('click', function(e) { 
							menu.className='popup'; 
						}, true);
						
						div.addEventListener('click', function(e) { 
							if (that.data[c] == null) {
								if (e.altKey) {
									var id = prompt(t('Enter the unique id of the results you want to see'))
									if (id) {
										that.loadColumn(c, 'custom:' + id);
									}
								}
								else
									menu.className='popup visible';
							}
							else
								that.clearColumn(c);

							e.stopPropagation();
						}, true);
					})(this, c, menu);
				}
			}
		
			for (var i = 0; i < this.tests.length; i++) {
				if (typeof this.tests[i] == 'string') {
					var h2 = document.createElement('h2');
					h2.innerHTML = t(tests[i]);
					parent.appendChild(h2);
				} else {
					var table = document.createElement('table');
					table.id = 'table-' + tests[i].id;
					parent.appendChild(table);
	
					var thead = document.createElement('thead');
					table.appendChild(thead);
					
					var tr = document.createElement('tr');
					tr.id = 'head-' + tests[i].id;
					thead.appendChild(tr);
					
					var th = document.createElement('th');
					th.innerHTML = t(this.tests[i].name);
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}
					
					if (typeof this.tests[i].items != 'undefined') {
						var tbody = document.createElement('tbody');
						table.appendChild(tbody);
	
						this.createItems(tbody, 0, this.tests[i].id, this.tests[i].items);
					}
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
					th.innerHTML = "<span>" + t(tests[i].name) + "</span>";
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
						if (this.options.features) {
							th.innerHTML = "<a href='/compare/feature/" + id + '-' + tests[i].id + ".html'>" + t(tests[i].name) + " <span>»</span></a>";
						}

						if (this.options.links) {
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
			if (typeof result.khronos != 'undefined') content += "<a href='" + result.khronos +"' class='khronos'>" + t('Go to the specification at Khronos.org') + "</a>";
			if (typeof result.wp != 'undefined') content += "<a href='http://docs.webplatform.org/wiki" + result.wp +"' class='wp'>" + t('Documentation at WebPlatform.org') + "</a>";
			if (typeof result.mdn != 'undefined') content += "<a href='https://developer.mozilla.org/en-US/docs" + result.mdn +"' class='mdn'>" + t('Documentation at Mozilla Developer Network') + "</a>";
		
			this.panel = document.createElement('div');
			this.panel.className = 'linksPanel';
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












	var BrowserTable = function() { this.initialize.apply(this, arguments) };
	BrowserTable.prototype = {
	
		initialize: function(options) {
			this.parent = options.parent;
			this.browsers = options.browsers;
			this.options = {
				title:			options.title || '',
				tests:			options.tests || [],
				columns:		options.columns || 2,
				header:			options.header || false,
				links:			options.links || false,
				grading:		options.grading || false,
				bonus:			options.bonus || false,
				explainations:	options.explainations || false,
				
				onChange:		options.onChange || false
			}

			this.data = [];
			for (var i = 0; i < this.options.columns; i++) {
				this.data[i] = null;
			}
			
			this.createSections(this.parent);
		},
		
		loadColumn: function(column, id) {
			var httpRequest;
			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}

		   	httpRequest.open('POST','/api/loadFeature', true);
			httpRequest.onreadystatechange = process;
		   	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send('id=' + encodeURIComponent(id));

			var that = this;
			
			function process() {
				if (httpRequest.readyState == 4 && httpRequest.responseText != '') {
					var data = JSON.parse(httpRequest.responseText);
					that.updateColumn(column, data);
				}
			}
		},
		
		clearColumn: function(column) {
			this.data[column] = null;
			
			if (this.options.onChange) {
				var ids = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) 
						ids.push(this.data[i].id);
				}

				this.options.onChange(ids);
			}

			if (this.options.header) {
				var row = document.getElementById('row-header');
				var cell = row.childNodes[column + 1];
				cell.className = 'empty';
				cell.firstChild.firstChild.innerHTML = '';
				cell.firstChild.childNodes[1].selectedIndex = 0;
			}
			
			for (var i = 0; i < this.browsers.length; i++) {
				var row = document.getElementById('row-' + this.browsers[i].uid);
				var cell = row.childNodes[column + 1];
				cell.innerHTML = '';
			}
		},
		
		updateColumn: function(column, data) {
			this.data[column] = data;

			if (this.options.onChange) {
				var ids = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) 
						ids.push(this.data[i].id);
				}

				this.options.onChange(ids);
			}
		
			if (this.options.header) {
				var row = document.getElementById('row-header');
				var cell = row.childNodes[column + 1];
				cell.className = '';
				
				var item;
				if (item = this.getItemById(this.options.tests, data.id)) {
					cell.firstChild.firstChild.innerHTML = '<span class="feature">' + t(item.name) + '</span>';
				}
			}
			
			for (var i = 0; i < this.browsers.length; i++) {
				var row = document.getElementById('row-' + this.browsers[i].uid);
				var cell = row.childNodes[column + 1];

				if (match = (new RegExp(this.browsers[i].id + '=1')).exec(data.supported))
					cell.innerHTML = t('Yes') + ' <span class="check">✔</span>';
				else
					cell.innerHTML = t('No') + ' <span class="ballot">✘</span>';
			}
		},

		createSections: function(parent) {
			if (this.options.header) {
				var table = document.createElement('table');
				table.id = 'table-header';
				parent.appendChild(table);
				
				var tbody = document.createElement('tbody');
				table.appendChild(tbody);
				
				var tr = document.createElement('tr');
				tr.id = 'row-header';
				tbody.appendChild(tr);

				var th = document.createElement('th');
				th.innerHTML = this.options.title;
				tr.appendChild(th);

				for (var c = 0; c < this.options.columns; c++) {
					var td = document.createElement('td');
					td.className = 'empty';
					tr.appendChild(td);
					
					var wrapper = document.createElement('div');
					td.appendChild(wrapper);
								
					var div = document.createElement('div');
					div.className = 'name';
					wrapper.appendChild(div);
								
					var menu = document.createElement('div');
					menu.className = 'popup';
					wrapper.appendChild(menu);
					
					var scroll = document.createElement('div');
					menu.appendChild(scroll);
					
 					var list = document.createElement('ul');
					scroll.appendChild(list);	
					
					var tests = this.getList(this.options.tests);

					for (var i = 0; i < tests.length; i++) {
						var item = document.createElement('li');
						item.className = 'indent-' + tests[i].indent;
						item.innerHTML = t(tests[i].name);
						list.appendChild(item);

						
						if (typeof tests[i].id == 'undefined') {
							item.className += ' title';
						}

						(function(c, menu, item, id, that) {
							item.addEventListener('click', function(e) { 
								if (id) {
									menu.className = 'popup';
									that.loadColumn(c, id);
								}
								e.stopPropagation();
							}, true);
						})(c, menu, item, tests[i].id, this);
					}

					(function(that, c, menu) {
						document.body.addEventListener('click', function(e) { 
							menu.className='popup'; 
						}, true);
						
						div.addEventListener('click', function(e) { 
							if (that.data[c] == null) 
								menu.className='popup visible';
							else
								that.clearColumn(c);

							e.stopPropagation();
						}, true);
					})(this, c, menu);
				}
			}
		
			var table = document.createElement('table');
			parent.appendChild(table);

			var tbody = document.createElement('tbody');
			table.appendChild(tbody);

			var type = null;
			for (var i = 0; i < this.browsers.length; i++) {
				if (type != this.browsers[i].type) {
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
		
					var th = document.createElement('th');	
					th.className = 'details';
					th.colspan = this.options.columns + 1;				
					tr.appendChild(th);
					
					switch(this.browsers[i].type) {
						case 'desktop':		th.innerHTML = '<h3>' + t('Desktop browsers') + '</h3>'; break;
						case 'gaming':		th.innerHTML = '<h3>' + t('Gaming') + '</h3>'; break;
						case 'mobile':		th.innerHTML = '<h3>' + t('Mobiles') + '</h3>'; break;
						case 'tablet':		th.innerHTML = '<h3>' + t('Tablets') + '</h3>'; break;
						case 'television':	th.innerHTML = '<h3>' + t('Television') + '</h3>'; break;
					}
				}
	
				var tr = document.createElement('tr');
				tr.id = 'row-' + this.browsers[i].uid;
				tbody.appendChild(tr);
	
				var th = document.createElement('th');					
				th.innerHTML = "<a href='/compare/browser/" + this.browsers[i].id + ".html'>" + this.browsers[i].nickname + (this.browsers[i].details ? ' <em>(' + this.browsers[i].details + ')</em>' : '') + " <span>»</span></a>";
				tr.appendChild(th);
				
				for (var c = 0; c < this.options.columns; c++) {
					var td = document.createElement('td');
					tr.appendChild(td);
				}
				
				type = this.browsers[i].type;
			}	
		},
		
		getList: function(items, level, prefix) {
			if (typeof level == 'undefined') level = 0;
			if (typeof prefix == 'undefined') prefix = '';

			var result = [];
		
			for (var i = 0; i < items.length; i++) {
				if (typeof items[i] == 'object') {
					if (typeof items[i].items == 'undefined') {
						result.push({
							id:		prefix + items[i].id,
							name:	items[i].name,
							indent:	level
						})
					}
					
					if (typeof items[i].items != 'undefined') {
						result.push({
							name:	items[i].name,
							indent:	level
						})

						if (children = this.getList(items[i].items, level + 1, prefix + items[i].id + '-')) {
							for (var c = 0; c < children.length; c++) {
								result.push(children[c]);
							}
						}
					}
				}
			}
			
			return result;	
		},
		
		getItemById: function(items, id, prefix) {
			if (typeof prefix == 'undefined') prefix = '';
			for (var i = 0; i < items.length; i++) {
				if (typeof items[i] == 'object') {
					if (prefix + items[i].id == id) return items[i];
					if (typeof items[i].items != 'undefined') {
						if (result = this.getItemById(items[i].items, id, prefix + items[i].id + '-')) {
							return result;
						}
					}
				}
			}
		}
	}
