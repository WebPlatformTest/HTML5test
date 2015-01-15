
	var DeviceTable = function() { this.initialize.apply(this, arguments) };
	DeviceTable.prototype = {
	
		initialize: function(options) {
			this.parent = options.parent;

			document.body.addEventListener("click", this.onClose.bind(this), true);

			var rows = this.parent.querySelectorAll('tbody tr');
			for (var r = 0; r < rows.length; r++) {
				rows[r].addEventListener("click", this.onShow.bind(this, rows[r]), true);
			}
			
			this.popup = null;
		},
		
		onClose: function(e) {
			var child = false;
			
			var el = e.target;
			while (el.parentNode) {
				if (el == this.parent) {
					child = true;
					break;
				}
				
				el = el.parentNode;
			}
			
			if (!child) this.close();
		},
		
		onShow: function(row) {
			this.close();
			
			var httpRequest;
			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}

		   	httpRequest.open('POST','/api/loadLabDevice', true);
			httpRequest.onreadystatechange = process.bind(this);
		   	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send('id=' + encodeURIComponent(row.getAttribute('data-id')));

			function process() {
				if (httpRequest.readyState == 4 && httpRequest.responseText != '') {
					var data = JSON.parse(httpRequest.responseText);

					var bb = [ 
						[ 'ie5', 'ie6', 'IE 5'],
						[ 'ie6', 'ie6', 'IE 6'],
						[ 'ie7', 'ie7', 'IE 7'],
						[ 'ie8', 'ie7', 'IE 8'],
						[ 'ie9', 'ie9', 'IE 9'],
						[ 'ie10', 'ie10', 'IE 10'],
						[ 'ie11', 'ie10', 'IE 11'],
						[ 'ie10_metro', 'ie-metro', 'IE 10'],
						[ 'ie11_metro', 'ie-metro', 'IE 11'],
						[ 'wp7', 'ie-metro', 'IE 9'],
						[ 'wp8', 'ie-metro', 'IE 10'],
						[ 'safari_ios_6', 'safari-ios-6', 'Safari'],
						[ 'safari_ios_7', 'safari-ios-7', 'Safari'],
						[ 'xpress', 'nokia', 'Xpress'],
						[ 'nokia', 'nokia', 'Nokia'],
						[ 'maemo', 'nokia', 'Nokia'],
						[ 'meego', 'nokia', 'Nokia'],
						[ 'webos', 'webos', 'webOS'],
						[ 'android', 'android', 'Android'],
						[ 'bb', 'bb', 'Browser'],
						[ 'bb10', 'bb10', 'Browser'],
						[ 'tabletos', 'tabletos', 'Browser'],
						
						[ 'chrome', 'chrome', 'Chrome'],
						[ 'coast', 'coast', 'Coast'],
						[ 'diigo', 'diigo', 'Diigo'],
						[ 'dolphin', 'dolphin', 'Dolphin'],
						[ 'firefox', 'firefox', 'Firefox'],
						[ 'ilunascape', 'ilunascape', 'iLunascape'],
						[ 'maxthon', 'maxthon', 'Maxthon'],
						[ 'mercury', 'mercury', 'Mercury'],
						[ 'puffin', 'puffin', 'Puffin'],
						[ 'silk', 'silk', 'Silk'],
						[ 'sleipnir', 'sleipnir', 'Sleipnir'],
						[ 'one', 'one', 'One'],
						[ 'opera', 'opera', 'Opera'],
						[ 'qq', 'qq', 'QQ'],
						[ 'uc-iphone', 'uc-iphone', 'UC Web'],
						[ 'uc-old', 'uc-old', 'UC Web'],
					]
					
					var browsers = "<ul class='browsers'>";
					
					if (data.defaultBrowser || data.defaultFingerprint) {
						browsers += "<li class='default'>";
						var stock = true;
						
						if (data.defaultBrowser) {
							for (var b = 0; b < bb.length; b++) {
								if (data.defaultBrowser == bb[b][0]) {
									stock = false;
									browsers += "<img src='/images/browsers/" + bb[b][1] +".png'><span>" + bb[b][2] + "</span>";
								}
							}
						}
						
						if (stock) {
							browsers += "<span class='stock'>Default browser</span>";
						}

						if (data.defaultFingerprint) {
							browsers += "<div class='score'><a href='" + document.location.protocol + "//html5te.st/" + data.defaultFingerprint + "'>" +  data.defaultResults.score + "</a></div>";
						}
						
						browsers += "</li>";
					}
					
					
					for (var b = 0; b < bb.length; b++) {
						if (data.otherBrowsers[bb[b][0]]) browsers += "<li><img src='/images/browsers/" + bb[b][1] +".png'><span>" + bb[b][2] + "</span></li>";
					}

					if (data.hasInspect) browsers += "<li><img src='/images/browsers/inspect.png'><span>Inspect</span></li>";
					browsers += "</ul>";
					
					this.popup = document.createElement('div');
					this.popup.className = 'popupPanel pointsLeft deviceInfo';
					this.popup.innerHTML = 
						"<h2>" + data.deviceManufacturer + " " + data.deviceModel + ( data.url ? "<a class='external' href='" + data.url + "'></a>" : "") + "</h2>" +
						"<div class='image'" + (data.image ? " style='background-image: url(/images/devices/" + data.image + ");'" : "") + "></div>" +
						"<div class='information'>" +
							"<table>" +
								"<tr><th>Type</th><td>" + data.type + (data.deviceSize ? ", " + data.deviceSize + "&nbsp;inch": "") + "</td></tr>" + 
								"<tr><th>Display</th><td>" + (data.deviceWidth && data.deviceHeight ? data.deviceWidth + "&nbsp;x&nbsp;" + data.deviceHeight + "&nbsp;pixels" : "") + (data.devicePPI ? ", " + data.devicePPI + "&nbsp;ppi" : "") + "</td></tr>" + 
								"<tr><th>OS</th><td>" + (data.osName ? data.osName + (data.osVersion ? " " + data.osVersion : "") : "-") + "</td></tr>" + 
								"<tr><th>Wi-Fi</th><td>" + (data.hasWifi ? "<span class='check'>✔</span> Yes" : "<span class='ballot'>✘</span> No") + "</td></tr>" + 
								"<tr><th>Cellular</th><td>" + (data.simSize ? "<span class='check'>✔</span> " + data.simSize + " sim" + (data.simLocked ? ', locked' : ', unlocked') : "<span class='ballot'>✘</span> No") + "</td></tr>" + 
							"</table>" +
							browsers +
							
							(data.comment ? "<div class='comment'>" + data.comment + "</div>" : "" ) +
						"</div>";

					row.cells[0].appendChild(this.popup);
				}
			}			
		},
		
		close: function() {
			if (this.popup) {
				this.popup.parentNode.removeChild(this.popup);
				this.popup = null;
			}
		}
	}



	var SearchField = function() { this.initialize.apply(this, arguments) };
	SearchField.prototype = {

		initialize: function(options) {
			this.parent = options.parent;
			this.options = {
				value:		options.value || null,
				onQuery:	options.onQuery || null,
				onSubmit:	options.onSubmit || null
			}
			
			this.interval = null;
			
			this.container = document.createElement('div');
			this.container.className = 'search';
			this.parent.appendChild(this.container);
			
			this.container.innerHTML = 
				"<input type='text' placeholder='Search...' value='" + (this.options.value || "") + "'>" +
				"<button>×</button>";
				
			this.container.firstChild.addEventListener("keyup", this.onUpdate.bind(this), true);
			this.container.firstChild.addEventListener("change", this.onUpdate.bind(this), true);
			this.container.firstChild.nextSibling.addEventListener("click", this.onClear.bind(this), true);
		},
		
		onUpdate: function(e) {
			if (this.interval) {
				window.clearTimeout(this.interval);
			}
			
			this.interval = window.setTimeout(this.onQuery.bind(this), 250);
			
			if (e.keyCode == 13) {
				if (this.options.onSubmit) {
					this.options.onSubmit(this.container.firstChild.value);
				}	
			}
		},
		
		onClear: function() {
			this.clear();

			if (this.options.onQuery) {
				this.options.onQuery('');
			}	

			if (this.options.onSubmit) {
				this.options.onSubmit('');
			}	
		},
		
		onQuery: function() {
			var value = this.container.firstChild.value;
			if (value.length < 3) return;
			
			if (this.options.onQuery) {
				this.options.onQuery(value);
			}	
		},
		
		clear: function() {
			this.container.firstChild.value = '';
		}
	}
	
	var ToggleSwitch = function() { this.initialize.apply(this, arguments) };
	ToggleSwitch.prototype = {

		initialize: function(options) {
			this.parent = options.parent;
			this.options = {
				inactive:	options.inactive || '',
				active:		options.active || '',
				onChange:	options.onChange || null
			}
			
			this.active = false;
			
			this.container = document.createElement('div');
			this.container.className = 'toggle';
			this.parent.appendChild(this.container);
			
			this.container.innerHTML = 
				"<div class='background'></div>" +
				"<div class='part first'>" + this.options.inactive + "</div>" +
				"<div class='part second'>" + this.options.active + "</div>";
				
			
			this.container.addEventListener("click", this.onToggle.bind(this), true);
		},
		
		onToggle: function() {
			this.active = ! this.active;
			
			if (this.active) {
				this.container.className += ' selected';
			} else {
				this.container.className = this.container.className.replace(' selected', '');
			}
			
			if (this.options.onChange) {
				this.options.onChange(this.active);
			}
		},
		
		activate: function() {
			if (!this.active) {
				this.active = true;
				this.container.className += ' selected';
			}
		},
		
		deactivate: function() {
			if (this.active) {
				this.active = false;
				this.container.className = this.container.className.replace(' selected', '');
			}
		}
	}


	var FeatureTable = function() { this.initialize.apply(this, arguments) };
	FeatureTable.prototype = {
	
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
				filter:			null,
				
				onChange:		options.onChange || false
			}

			this.panel = null;

			this.data = [];
			for (var i = 0; i < this.options.columns; i++) {
				this.data[i] = null;
			}
			
			this.createCategories(this.parent, this.tests)
			this.results = document.createElement('div');
			this.parent.appendChild(this.results);
			
			this.filter(options.filter || '');
		},
		
		filter: function(filter) {
			if (this.options.filter == filter) {
				return;
			}
			
			this.options.filter = filter;
		
			if (filter == '') {
				this.results.innerHTML = '';
				for (var i = 0; i < this.tests.length; i++) {
					this.createSections(this.results, this.tests[i].items);
				}
				
				this.update();
				return;
			}
			
			var result = [];
			var path = [];
		
			function retrieveItems(items, level) {
				for (var i = 0; i < items.length; i++) {
					if (typeof items[i] == 'object') {
						path[level] = items[i].id;
				
						if (!filterItem(items[i], level)) {
							if (items[i].items) {
								retrieveItems(items[i].items, level + 1);
							}
						}
					}
				}
			}
			
			function addItems(items, level) {
				for (var i = 0; i < items.length; i++) {
					if (typeof items[i] == 'object') {
						path[level] = items[i].id;
						
						if (level > 1) {
							var r = {
								id:		path.slice(1, level + 1).join('-'),
								name:	items[i].name
							}
							if (items[i].url) r.url = items[i].url;
							if (items[i].urls) r.urls = items[i].urls;
							if (items[i].items) r.items = items[i].items;
	
							result.push(r);
						}
						else if (items[i].items) {
							addItems(items[i].items, level + 1);
						}
					}
				}
				
				return true;
			}
			
			function filterItem(item, level) {
				path[level] = item.id;
				
				var selected = item.name.toLowerCase().indexOf(filter) != -1;

				if (selected) {
					if (level > 1) {
						var r = {
							id:		path.slice(1, level + 1).join('-'),
							name:	item.name
						}
						if (item.url) r.url = item.url;
						if (item.urls) r.urls = item.urls;
						if (item.items) r.items = item.items;

						return result.push(r);
					}
					else if (item.items) {
						return addItems(item.items, level + 1);
					}
				}		
			}

			retrieveItems(this.tests, 0);
			
			this.results.innerHTML = '';
			this.createSections(this.results, [{ name: filter, items: result }]);
			
			this.update();
		},
		
		loadColumn: function(column, browser) {
			var id = browser;
			
			if (typeof browser == 'object') {
				id = browser.variant + '-' + browser.version;	
			}
			
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
					if (this.data[i]) {
						if (this.data[i].id)
							ids.push(this.data[i].id);
						else if (this.data[i].version)
							ids.push(this.data[i].variant + '-' + this.data[i].version);
						else 
							ids.push(this.data[i].variant);
					}
				}

				this.options.onChange(ids);
			}

			var row = document.getElementById('row-header');
			var cell = row.childNodes[column + 1];
			cell.className = 'empty';
			cell.firstChild.firstChild.innerHTML = '';
			cell.firstChild.childNodes[1].selectedIndex = 0;
			
			for (var c = 0; c < this.tests.length; c++)
			for (var i = 0; i < this.tests[c].items.length; i++) {
				var test = this.tests[c].items[i];

				if (typeof test != 'string') {
					if (typeof test.items != 'undefined') {
						var row = document.getElementById('head-' + test.id);
						if (row) {
							var cell = row.childNodes[column + 1];
							cell.innerHTML = '';
						}
						
						this.clearItems(column, test.id, test.items);
					}
				}
			}				
		},
		
		clearItems: function(column, id, tests) {
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var row = document.getElementById('row-' + id + '-' + tests[i].id);
					if (row) {
						var cell = row.childNodes[column + 1];
						cell.innerHTML = '';
						cell.className = '';
					}
					
					if (typeof tests[i].items != 'undefined') {
						this.clearItems(column, id + '-' + tests[i].id, tests[i].items);
					}
				}
			}
		},
		
		update: function() {
			for (var i = 0; i < this.options.columns; i++) {
				if (this.data[i]) {
					this.updateColumn(i, this.data[i]);
				}
			}
		},
		
		updateColumn: function(column, data) {
			this.data[column] = data;

			if (this.options.onChange) {
				var ids = [];
				
				
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) {
						if (this.data[i].id)
							ids.push(this.data[i].id);
						else if (this.data[i].version)
							ids.push(this.data[i].variant + '-' + this.data[i].version);
						else
							ids.push(this.data[i].variant);
					}
				}

				this.options.onChange(ids);
			}
		
			var row = document.getElementById('row-header');
			var cell = row.childNodes[column + 1];
			cell.className = '';
			cell.firstChild.firstChild.innerHTML = '<span class="nickname">' + t(data.nickname) + '</span><span class="score">' + data.score + '</span>';
			
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
						if (row) {
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
						}

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
					if (row) {
						var cell = row.childNodes[column + 1];
	
						cell.className = 'used';
	
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
								var result = parseInt(match[1], 10);
								
								if (result & YES) {
									switch(true) {
										case !! (result & OLD):		cell.innerHTML = '<div>' + t('Incomplete') + ' <span class="buggy">!</span></div>'; break;								
										case !! (result & BUGGY):	cell.innerHTML = '<div>' + t('Buggy') + ' <span class="buggy">!</span></div>'; break;								
										case !! (result & PREFIX):	cell.innerHTML = '<div>' + t('Prefixed') + ' <span class="check">✔</span></div>'; count[1]++; break;
										default:					cell.innerHTML = '<div>' + t('Yes') + ' <span class="check">✔</span></div>'; count[1]++; break;
									}
								}
								else {
									cell.innerHTML = '<div>' + t('No') + ' <span class="ballot">✘</span></div>';
								}
							} else {
								cell.innerHTML = '<div><span class="partially">' + t('Unknown') + '</span> <span class="partial">?</span></div>';
							}
						}
					} else {
						if (typeof tests[i].items != 'undefined') {
							var results = this.updateItems(column, data, level + 1, id + '-' + tests[i].id, tests[i].items);					
						}
					}
					
					count[0]++;
				}
			}
			
			return count;	
		},
			
		createCategories: function(parent, tests) {
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
				menu.className = 'popup popupPanel pointsRight';
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
						menu.className = menu.className.replace(' visible', '');
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

					(function(c, menu, item, browser, that) {
						item.addEventListener('click', function(e) { 
							menu.className = menu.className.replace(' visible', '');
							that.loadColumn(c, browser);
							e.stopPropagation();
						}, true);
					})(c, menu, item, this.options.browsers[i], this);

					type = this.options.browsers[i].type;
				}

				(function(that, c, menu) {
					document.body.addEventListener('click', function(e) { 
						menu.className = menu.className.replace(' visible', '');
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
								menu.className += ' visible';
						}
						else
							that.clearColumn(c);

						e.stopPropagation();
					}, true);
				})(this, c, menu);
			}
		},
	
		createSections: function(parent, tests) {
		
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] == 'string') {
					var h2 = document.createElement('h2');
					h2.innerHTML = t(tests[i]);
					parent.appendChild(h2);
				} else {
					var table = document.createElement('table');
					if (tests[i].id) table.id = 'table-' + tests[i].id;
					parent.appendChild(table);
	
					var thead = document.createElement('thead');
					table.appendChild(thead);
					
					var tr = document.createElement('tr');
					if (tests[i].id) tr.id = 'head-' + tests[i].id;
					thead.appendChild(tr);
					
					var th = document.createElement('th');
					if (tests[i].name) th.innerHTML = t(tests[i].name);
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}
					
					if (typeof tests[i].items != 'undefined') {
						var tbody = document.createElement('tbody');
						table.appendChild(tbody);
	
						this.createItems(tbody, 0, tests[i].id ? tests[i].id : '', tests[i].items);
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
					th.innerHTML = "<div><span>" + t(tests[i].name) + "</span></div>";
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}
					
					tr.id = 'row-' + (id ? id + '-' : '') + tests[i].id;
					
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
						var children = this.createItems(parent, level + 1, (id ? id + '-' : '') + tests[i].id, tests[i].items, urls);
						this.hideChildren(tr, children);
						
						(function(that, tr, th, children) {
							th.onclick = function() {
								that.toggleChildren(tr, children);
							};		
						})(this, tr, th, children);
					} else {
						th.innerHTML = "<div><a href='/compare/feature/" + id + '-' + tests[i].id + ".html'>" + t(tests[i].name) + " <span>»</span></a></div>";
					}
					
					ids.push(tr.id);
				}
			}	
			
			return ids;
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
				explainations:	options.explainations || false,
				filter:			'',
				
				onChange:		options.onChange || false
			}

			this.data = [];
			for (var i = 0; i < this.options.columns; i++) {
				this.data[i] = null;
			}
			
			this.createSections(this.parent);
			
			this.filter(options.filter || '');
		},
		
		filter: function(filter) {
			if (this.options.filter != filter) {
				this.options.filter = filter;	
				
				filter = filter.toLowerCase();
				
				for (var i = 0; i < this.browsers.length; i++) {
					var row = document.getElementById('row-' + this.browsers[i].uid);
					var visible = true;
					
					if (filter != '') {
						if (filter == ':mostused') {
							visible = this.browsers[i].listed;	
						}
						
						else {
							visible = this.browsers[i].nickname.toLowerCase().indexOf(filter) != -1
						}
					}
					
					row.style.display = visible ? '' : 'none';
				}	
			}
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
				cell.className = '';
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
				
				cell.className = 'used';

				if (match = (new RegExp(this.browsers[i].variant + '-' + this.browsers[i].version + '=(-?[0-9]+)')).exec(data.supported)) {
					var result = parseInt(match[1], 10);
							
					if (result & YES) {
						switch(true) {
							case !! (result & OLD):		cell.innerHTML = '<div>' + t('Incomplete') + ' <span class="buggy">!</span></div>'; break;								
							case !! (result & BUGGY):	cell.innerHTML = '<div>' + t('Buggy') + ' <span class="buggy">!</span></div>'; break;								
							case !! (result & PREFIX):	cell.innerHTML = '<div>' + t('Prefixed') + ' <span class="check">✔</span></div>'; break;
							default:					cell.innerHTML = '<div>' + t('Yes') + ' <span class="check">✔</span></div>'; break;
						}
					}
					else {
						cell.innerHTML = '<div>' + t('No') + ' <span class="ballot">✘</span></div>';
					}
				}
				else
					cell.innerHTML = '<div><span class="partially">' + t('Unknown') + '</span> <span class="partial">?</span></div>';
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
					menu.className = 'popup popupPanel pointsRight';
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
									menu.className = menu.className.replace(' visible', '');
									that.loadColumn(c, id);
								}
								e.stopPropagation();
							}, true);
						})(c, menu, item, tests[i].id, this);
					}

					(function(that, c, menu) {
						document.body.addEventListener('click', function(e) { 
							menu.className = menu.className.replace(' visible', '');
						}, true);
						
						div.addEventListener('click', function(e) { 
							if (that.data[c] == null) 
								menu.className += ' visible';
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
					th.colSpan = this.options.columns + 1;				
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
				th.innerHTML = "<a href='/compare/browser/" + this.browsers[i].variant + (this.browsers[i].version ? "-" + this.browsers[i].version : "") + ".html'>" + this.browsers[i].nickname + (this.browsers[i].details ? ' <em>(' + this.browsers[i].details + ')</em>' : '') + " <span>»</span></a>";
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
						if (level > 0) {
							result.push({
								id:		prefix + items[i].id,
								name:	items[i].name,
								indent:	level
							})
						}
					}
					
					if (typeof items[i].items != 'undefined') {
						if (level > 0) {
							result.push({
								name:	items[i].name,
								indent:	level
							})
						}
						
						if (children = this.getList(items[i].items, level + 1, level > 0 ? prefix + items[i].id + '-' : prefix)) {
							for (var c = 0; c < children.length; c++) {
								result.push(children[c]);
							}
						}
					}
				}
			}
			
			return result;	
		},
		
		getItemById: function(items, id, level, prefix) {
			if (typeof level == 'undefined') level = 0;
			if (typeof prefix == 'undefined') prefix = '';
			
			for (var i = 0; i < items.length; i++) {
				if (typeof items[i] == 'object') {
					if (prefix + items[i].id == id) return items[i];
					if (typeof items[i].items != 'undefined') {
						if (result = this.getItemById(items[i].items, id, level + 1, level > 0 ? prefix + items[i].id + '-' : prefix)) {
							return result;
						}
					}
				}
			}
		}
	}
