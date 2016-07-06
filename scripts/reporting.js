
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

			this.container.addEventListener("click", this.onClick.bind(this), false);

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

		onClick: function(e) {
			e.stopPropagation();
		},

		onClear: function(e) {
			e.stopPropagation();

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

			this.diff = [];

			this.data = [];
			for (var i = 0; i < this.options.columns; i++) {
				this.data[i] = null;
			}

			this.createCategories(this.parent, this.tests)
			this.results = document.createElement('div');
			this.parent.appendChild(this.results);

			this.filter(options.filter || '');
		},

		filter: function(filter, force) {
			var that = this;

			if (!force && this.options.filter == filter) {
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
			var status = [];
			var name = [];

			function retrieveItems(items, level) {
				for (var i = 0; i < items.length; i++) {
					if (typeof items[i] == 'object') {
						name[level] = items[i].name;
						status[level] = items[i].status || null;

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
						name[level] = items[i].name;
						status[level] = items[i].status || null;

						if (level > 1) {
							var s = "";
							for (var l = level; l >= 0; l--) {
								if (status[l]) {
									s = status[l];
									break;
								}
							}

							var r = {
								key:	items[i].key,
								name:	items[i].name,
								status:	s
							}
							if (items[i].value) r.value = items[i].value;
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
				name[level] = item.name;
				status[level] = item.status || null;

				var selected = true;
				if (filter == ':diff')
					selected = level > 1 ? that.diff[item.key] : false;
				else
					selected = item.name.toLowerCase().indexOf(filter) != -1;


				if (selected) {
					if (level > 1) {
						var s = "";
						for (var l = level; l >= 0; l--) {
							if (status[l]) {
								s = status[l];
								break;
							}
						}

						var r = {
							key:	item.key,
							name:	name.slice(2, level + 1).join(' ▸ '),
							status:	s
						}
						if (item.value) r.value = item.value;
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
			this.createSections(this.results, [{ name: filter == ':diff' ? 'Difference' : filter, items: result }]);

			this.update();
		},

		loadColumn: function(column, browser) {
			var id = browser;

			if (typeof browser == 'object') {
				id = browser.platform + (browser.version ? '-' + browser.version : '');
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

					var f = that.options.filter;
					that.filter('');
					that.updateColumn(column, data);
					that.filter(f);
				}
			}
		},

		calculateColumn: function(column) {
			var that = this;

			new Test(process);

			function process(r) {
				var c = new Calculate(r, tests);

				that.updateColumn(column, {
					id:				'mybrowser',
					nickname:		'My browser',
					score:			c.score,
					points:			c.points,
					results:		r.results
				})
			}
		},

		clearColumn: function(column) {
			this.data[column] = null;
			this.diff = [];

			if (this.options.onChange) {
				var ids = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) {
						if (this.data[i].id)
							ids.push(this.data[i].id);
						else if (this.data[i].version)
							ids.push(this.data[i].platform + '-' + this.data[i].version);
						else
							ids.push(this.data[i].platform);
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

			this.filter(this.options.filter, true);
		},

		clearItems: function(column, id, tests) {
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var key = tests[i].key;

					var row = document.getElementById('row-' + key);
					if (row) {
						var cell = row.childNodes[column + 1];
						cell.innerHTML = '';
						cell.className = '';
					}

					if (typeof tests[i].items != 'undefined') {
						this.clearItems(column, key, tests[i].items);
					}


					var base = null;
					var diff = false;

					for (var c = 0; c < this.options.columns; c++) {
						if (this.data[c]) {
							if (match = (new RegExp(key + '=(-?[0-9]+)')).exec(this.data[c].results)) {
								var result = parseInt(match[1], 10);

								if (base === null) {
									base = result;
								}
								else {
									if (result != base) {
										diff = true;
										break;
									}
								}
							}
						}
					}

					this.diff[key] = diff;
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
			this.diff = [];

			if (this.options.onChange) {
				var ids = [];


				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i]) {
						if (this.data[i].id)
							ids.push(this.data[i].id);
						else if (this.data[i].version)
							ids.push(this.data[i].platform + '-' + this.data[i].version);
						else
							ids.push(this.data[i].platform);
					}
				}

				this.options.onChange(ids);
			}

			var row = document.getElementById('row-header');
			var cell = row.childNodes[column + 1];
			cell.className = '';
			cell.firstChild.firstChild.innerHTML = '<span class="nickname">' + data.nickname + '</span><span class="score">' + data.score + '</span>';

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

						this.updateItems(column, data, test.items);
					}
				}
			}
		},

		updateItems: function(column, data, tests) {
			var count = [ 0, 0 ];

			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] != 'string') {
					var key = tests[i].key;

					var row = document.getElementById('row-' + key);
					if (row) {
						var cell = row.childNodes[column + 1];
						var classes = [ 'used' ];

						if (typeof tests[i].items != 'undefined') {
							var results = this.updateItems(column, data, tests[i].items);

							if (results[0] == results[1]) {
								cell.innerHTML = '<div>' + 'Yes' + ' <span class="check">✔</span></div>';
								classes.push('yes');
							} else if (results[1] == 0) {
								cell.innerHTML = '<div>' + 'No' + ' <span class="ballot">✘</span></div>';
								classes.push('no');
							} else {
								cell.innerHTML = '<div><span class="partially">' + 'Partial' + '</span> <span class="partial">○</span></div>';
							}
						}

						else {
							if (match = (new RegExp(key + '=(-?[0-9]+)')).exec(data.results)) {
								var result = parseInt(match[1], 10);

								if (result & YES) {
									switch(true) {
										case !! (result & BUGGY):			cell.innerHTML = '<div>Buggy <span class="buggy"></span></div>'; break;
										case !! (result & OLD):				cell.innerHTML = '<div>Partial <span class="partial">○</span></div>'; count[1]++; break;
										case !! (result & PREFIX):			cell.innerHTML = '<div>Prefixed <span class="check">✔</span></div>'; classes.push('yes'); count[1]++; break;
										case !! (result & EXPERIMENTAL):	cell.innerHTML = '<div>Prefixed <span class="check">✔</span></div>'; classes.push('yes'); count[1]++; break;
										default:							cell.innerHTML = '<div>Yes <span class="check">✔</span></div>'; classes.push('yes'); count[1]++; break;
									}
								}
								else {
									switch(true) {
										case !! (result & UNKNOWN):			cell.innerHTML = '<div>Unknown <span class="buggy">?</span></div>'; break;
										case !! (result & BLOCKED):			cell.innerHTML = '<div>Broken <span class="buggy">!</span></div>'; classes.push('no'); break;
										case !! (result & DISABLED):		cell.innerHTML = '<div>Disabled <span class="ballot">✘</span></div>'; classes.push('no'); break;
										default:							cell.innerHTML = '<div>No <span class="ballot">✘</span></div>'; classes.push('no'); break;
									}
								}
							} else {
								cell.innerHTML = '<div><span class="partially">Unknown</span> <span class="partial">?</span></div>';
							}
						}

						cell.className = classes.join(' ');


						var base = null;
						var diff = false;

						for (var c = 0; c < this.options.columns; c++) {
							if (this.data[c]) {
								if (match = (new RegExp(key + '=(-?[0-9]+)')).exec(this.data[c].results)) {
									var result = parseInt(match[1], 10);

									if (base === null) {
										base = result;
									}
									else {
										if (result != base) {
											diff = true;
											break;
										}
									}
								}
							}
						}

						this.diff[key] = diff;
					} else {
						if (typeof tests[i].items != 'undefined') {
							var results = this.updateItems(column, data, tests[i].items);
						}
					}

					count[0]++;
				}
			}

			return count;
		},

		askForUniqueId: function(c) {
			var id = prompt('Enter the unique id of the results you want to see')
			if (id) {
				this.loadColumn(c, 'custom:' + id);
			}
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
				var that = this;

				var td = document.createElement('td');
				td.className = 'empty';
				tr.appendChild(td);

				var wrapper = document.createElement('div');
				td.appendChild(wrapper);

				var div = document.createElement('div');
				div.className = 'name';
				wrapper.appendChild(div);

				var menu = document.createElement('div');
				menu.className = 'popup popupPanel pointsRight hasSearch';
				wrapper.appendChild(menu);

				var header = document.createElement('div');
				header.className = 'toolbar';
				menu.appendChild(header);

				var scroll = document.createElement('div');
				scroll.className = 'scroll';
				menu.appendChild(scroll);

				var list = document.createElement('ul');
				scroll.appendChild(list);


				(function(c, menu, list, header) {
					var search = new SearchField({
						parent:		header,
						onQuery:	function(query) {
										build(list, that.options.browsers, query != "", query);
									}
					});


					document.body.addEventListener('click', function(e) {
						menu.className = menu.className.replace(' visible', '');
					}, false);

					div.addEventListener('click', function(e) {
						if (that.data[c] == null) {
							if (e.altKey) {
								that.askForUniqueId(c);
							}
							else
								menu.className += ' visible';
						}
						else
							that.clearColumn(c);

						e.stopPropagation();
					}, true);

					list.addEventListener('click', function(e) {
						var close = true;

						if (e.target) {
							if (e.target.hasAttribute('data-action')) {
								var action = e.target.getAttribute('data-action');

								if (action == 'more') {
									build(list, that.options.browsers, true);
									close = false;
								}

								if (action == 'less') {
									build(list, that.options.browsers, false);
									close = false;
								}

								if (action == 'calculate') {
									that.calculateColumn(c);
								}

								if (action == 'custom') {
									window.setTimeout(function() {
										that.askForUniqueId(c);
									}, 0);
								}

								if (action == 'load') {
									var id = e.target.getAttribute('data-id');
									that.loadColumn(c, that.options.browsers[id]);
								}
							}
						}

						if (close) {
							menu.className = menu.className.replace(' visible', '');
						}

						e.stopPropagation();
					}, true);
				})(c, menu, list, header);


				build(list, this.options.browsers, false);


				function build(list, browsers, all, filter) {
					list.innerHTML = '';

					if (!filter) {
						var item = document.createElement('li');
						item.setAttribute('data-action', 'calculate');
						item.innerHTML = 'My browser';
						list.appendChild(item);

						var item = document.createElement('li');
						item.setAttribute('data-action', 'custom');
						item.innerHTML = 'Enter unique id...';
						list.appendChild(item);
					}

					var type = null;

					for (var i = 0; i < browsers.length; i++) {
						if (!filter || browsers[i].nickname.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
							if (all || browsers[i].visible) {
								if (type != browsers[i].type) {
									var item = document.createElement('li');
									item.className = 'indent-0 title';
									list.appendChild(item);

									switch(browsers[i].type) {
										case 'desktop':		item.innerHTML = 'Desktop browsers'; break;
										case 'gaming':		item.innerHTML = 'Gaming'; break;
										case 'mobile':		item.innerHTML = 'Mobiles'; break;
										case 'tablet':		item.innerHTML = 'Tablets'; break;
										case 'television':	item.innerHTML = 'Television'; break;
									}
								}

								var item = document.createElement('li');
								item.setAttribute('data-action', 'load');
								item.setAttribute('data-id', i);
								item.innerHTML = browsers[i].nickname + (browsers[i].details ? ' <em>(' + browsers[i].details + ')</em>' : '');
								list.appendChild(item);

								type = browsers[i].type;
							}
						}
					}

					if (!filter) {
						if (!all) {
							var item = document.createElement('li');
							item.className = 'more';
							item.setAttribute('data-action', 'more');
							item.innerHTML = 'Show more';
							list.appendChild(item);
						} else {
							var item = document.createElement('li');
							item.className = 'less';
							item.setAttribute('data-action', 'less');
							item.innerHTML = 'Show less';
							list.appendChild(item);
						}
					}
				}
			}
		},

		createSections: function(parent, tests) {
			for (var i = 0; i < tests.length; i++) {
				if (typeof tests[i] == 'string') {
					var h2 = document.createElement('h2');
					h2.innerHTML = tests[i];
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
					if (tests[i].name) th.innerHTML = tests[i].name;
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}

					if (typeof tests[i].items != 'undefined') {
						var tbody = document.createElement('tbody');
						table.appendChild(tbody);

						var status = typeof tests[i].status != 'undefined' ? tests[i].status : '';

						this.createItems(tbody, 0, tests[i].items, {
							id:		tests[i].id,
							status:	status,
							urls:	[]
						});
					}
				}
			}
		},

		createItems: function(parent, level, tests, data) {
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

						th.innerHTML = tests[i];
					}
				} else {
					var key = tests[i].key;

					var th = document.createElement('th');
					th.innerHTML = "<div><span>" + tests[i].name + "</span></div>";
					tr.appendChild(th);

					for (var c = 0; c < this.options.columns; c++) {
						var td = document.createElement('td');
						tr.appendChild(td);
					}

					tr.id = 'row-' + key;

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

						var children = this.createItems(parent, level + 1, tests[i].items, {
							id: 	key,
							status:	typeof tests[i].status != 'undefined' ? tests[i].status : data.status,
							urls:	urls
						});

						this.hideChildren(tr, children);

						(function(that, tr, th, children) {
							th.onclick = function() {
								that.toggleChildren(tr, children);
							};
						})(this, tr, th, children);
					} else {
						var urls;
						var value = 0;

						if (typeof tests[i].value != 'undefined') {
							value = tests[i].value;
						}

						if (typeof tests[i].urls != 'undefined') {
							urls = tests[i].urls;
						}
						else if (typeof tests[i].url != 'undefined') {
							urls = [ [ 'w3c', tests[i].url ] ];
						}

						th.className = 'hasLink';

						(function(th, data){
							th.onclick = function() {
								new FeaturePopup(th, data);
							};
						})(th, {
							id:		key,
							name:	tests[i].name,
							value:	value,
							status:	typeof tests[i].status != 'undefined' ? tests[i].status : data.status,
							urls:	(urls || []).concat(data.urls || [])
						});
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
				e.style.display = '';
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
							visible = this.browsers[i].visible;
						}

						else {
							visible = this.browsers[i].nickname.toLowerCase().indexOf(filter) != -1
						}
					}

					row.style.display = visible ? '' : 'none';
				}
			}
		},

		loadColumn: function(column, key) {
			var httpRequest;
			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}

		   	httpRequest.open('POST','/api/loadFeature', true);
			httpRequest.onreadystatechange = process;
		   	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send('key=' + encodeURIComponent(key));

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
				var keys = [];
				for (var i = 0; i < this.options.columns; i++) {
					if (this.data[i])
						keys.push(this.data[i].key);
				}

				this.options.onChange(keys);
			}

			if (this.options.header) {
				var row = document.getElementById('row-header');
				var cell = row.childNodes[column + 1];
				cell.className = '';

				var item, parent;
				if (item = this.getItemByKey(this.options.tests, data.key)) {
					if (data.key.split('.').length > 2) {
						if (parent = this.getItemByKey(this.options.tests, data.key.split('.').slice(0,-1).join('.'))) {
							cell.firstChild.firstChild.innerHTML = '<span class="feature">' + parent.name + '<hr>' + item.name + '</span>';
						} else {
							cell.firstChild.firstChild.innerHTML = '<span class="feature">' + item.name + '</span>';
						}
					}
					else {
						cell.firstChild.firstChild.innerHTML = '<span class="feature">' + item.name + '</span>';
					}
				}
			}

			for (var i = 0; i < this.browsers.length; i++) {
				var row = document.getElementById('row-' + this.browsers[i].uid);
				var cell = row.childNodes[column + 1];
				var classes = [ 'used' ];

				cell.className = 'used';

				if (match = (new RegExp(this.browsers[i].platform + '-' + this.browsers[i].version + '=(-?[0-9]+)')).exec(data.supported)) {
					var result = parseInt(match[1], 10);

					if (result & YES) {
						switch(true) {
							case !! (result & BUGGY):			cell.innerHTML = '<div>Buggy <span class="buggy"></span></div>'; break;
							case !! (result & OLD):				cell.innerHTML = '<div>Partial <span class="partial">○</span></div>'; break;
							case !! (result & PREFIX):			cell.innerHTML = '<div>Prefixed <span class="check">✔</span></div>'; classes.push('yes'); break;
							case !! (result & EXPERIMENTAL):	cell.innerHTML = '<div>Prefixed <span class="check">✔</span></div>'; classes.push('yes'); break;
							default:							cell.innerHTML = '<div>Yes <span class="check">✔</span></div>'; classes.push('yes'); break;
						}
					}
					else {
						switch(true) {
							case !! (result & UNKNOWN):			cell.innerHTML = '<div>Unknown <span class="partial">?</span></div>'; break;
							case !! (result & BLOCKED):			cell.innerHTML = '<div>Broken <span class="buggy">!</span></div>'; classes.push('no'); break;
							case !! (result & DISABLED):		cell.innerHTML = '<div>Disabled <span class="ballot">✘</span></div>'; classes.push('no'); break;
							default:							cell.innerHTML = '<div>No <span class="ballot">✘</span></div>'; classes.push('no'); break;
						}
					}
				}
				else
					cell.innerHTML = '<div><span class="partially">Unknown</span> <span class="partial">?</span></div>';

				cell.className = classes.join(' ');
			}
		},

		createSections: function(parent) {
			var that = this;
			var tests = this.getList(this.options.tests);

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
					menu.className = 'popup popupPanel pointsRight hasSearch';
					wrapper.appendChild(menu);

					var header = document.createElement('div');
					header.className = 'toolbar';
					menu.appendChild(header);

					var scroll = document.createElement('div');
					scroll.className = 'scroll';
					menu.appendChild(scroll);

					var list = document.createElement('ul');
					scroll.appendChild(list);


					(function(c, menu, list, header) {
						var search = new SearchField({
							parent:		header,
							onQuery:	function(query) {
											build(list, tests, query);
										}
						});


						document.body.addEventListener('click', function(e) {
							menu.className = menu.className.replace(' visible', '');
						}, false);

						div.addEventListener('click', function(e) {
							if (that.data[c] == null)
								menu.className += ' visible';
							else
								that.clearColumn(c);

							e.stopPropagation();
						}, true);

						list.addEventListener('click', function(e) {
							var close = true;

							if (e.target) {
								var target = e.target;

								while (target.tagName != 'LI' && target.parentNode) {
									target = target.parentNode;
								}

								if (target.hasAttribute('data-action')) {
									var action = target.getAttribute('data-action');

									if (action == 'load') {
										var key = target.getAttribute('data-key');
										that.loadColumn(c, key);
									}
								}
							}

							if (close) {
								menu.className = menu.className.replace(' visible', '');
							}

							e.stopPropagation();
						}, true);
					})(c, menu, list, header);


					build(list, tests);


					function build(list, tests, filter) {
						list.innerHTML = '';

						var type = null;

						for (var i = 0; i < tests.length; i++) {
							if (!filter || (typeof tests[i].key != 'undefined' && tests[i].name.toLowerCase().indexOf(filter.toLowerCase()) != -1)) {
								var item = document.createElement('li');

								if (!filter) item.className = 'indent-' + tests[i].indent;

								if (typeof tests[i].key != 'undefined') {
									item.setAttribute('data-action', 'load');
									item.setAttribute('data-key', tests[i].key);
								} else {
									item.className += ' title';
								}

								item.innerHTML = tests[i].name;
								list.appendChild(item);
							}
						}
					}
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
						case 'desktop':		th.innerHTML = '<h3>Desktop browsers</h3>'; break;
						case 'gaming':		th.innerHTML = '<h3>Gaming</h3>'; break;
						case 'mobile':		th.innerHTML = '<h3>Mobiles</h3>'; break;
						case 'tablet':		th.innerHTML = '<h3>Tablets</h3>'; break;
						case 'television':	th.innerHTML = '<h3>Television</h3>'; break;
					}
				}

				var tr = document.createElement('tr');
				tr.id = 'row-' + this.browsers[i].uid;
				tbody.appendChild(tr);

				var th = document.createElement('th');
				th.className = 'hasLink';
				th.innerHTML =  this.browsers[i].nickname + (this.browsers[i].details ? ' <em>(' + this.browsers[i].details + ')</em>' : '');
				tr.appendChild(th);

				(function(th, type, data){
					th.onclick = function() {
						new BrowserPopup(th, type, data);
					};
				})(th, type, {
					platform:	this.browsers[i].platform,
					version:	this.browsers[i].version,
					id:			this.browsers[i].id,
					name:		this.browsers[i].nickname,
					score:		this.browsers[i].score,
					urls:		[]
				});

				for (var c = 0; c < this.options.columns; c++) {
					var td = document.createElement('td');
					tr.appendChild(td);
				}

				type = this.browsers[i].type;
			}
		},

		getList: function(items, level) {
			if (typeof level == 'undefined') level = 0;

			var result = [];

			for (var i = 0; i < items.length; i++) {
				if (typeof items[i] == 'object') {
					if (typeof items[i].items == 'undefined') {
						if (level > 0) {
							result.push({
								key: 	items[i].key,
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

						if (children = this.getList(items[i].items, level + 1)) {
							for (var c = 0; c < children.length; c++) {
								result.push(children[c]);
							}
						}
					}
				}
			}

			return result;
		},

		getItemByKey: function(items, key, level) {
			if (typeof level == 'undefined') level = 0;

			for (var i = 0; i < items.length; i++) {
				if (typeof items[i] == 'object') {
					if (items[i].key == key) return items[i];
					if (typeof items[i].items != 'undefined') {
						if (result = this.getItemByKey(items[i].items, key, level + 1)) {
							return result;
						}
					}
				}
			}
		}
	}





	var DiffTable = function() { this.initialize.apply(this, arguments) };
	DiffTable.prototype = {

		initialize: function(options) {
			this.parent = options.parent;
			this.metadata = options.metadata;
			this.data = options.data;

			this.createSections(this.parent);
		},

		createSections: function(parent) {
			var table = document.createElement('table');
			parent.appendChild(table);

			var tbody = document.createElement('tbody');
			table.appendChild(tbody);

			for (var i = 0; i < this.data.length; i++) {
				if (this.metadata.getItem(this.data[i].id)) {
					var tr = document.createElement('tr');
					tbody.appendChild(tr);

					var th = document.createElement('th');
					th.innerHTML = "<a href='/compare/feature/" + this.data[i].id + ".html'>" + this.metadata.getTrail(this.data[i].id, ' ▸ ') + "</a>";
					tr.appendChild(th);

					var td = document.createElement('td');
					td.innerHTML = "<div>" + this.getStatus(this.data[i].from) + " <span>→</span> " + this.getStatus(this.data[i].to) + "</div>";
					tr.appendChild(td);
				}
			}
		},

		getStatus: function(status) {
			html = '';
			status = parseInt(status, 10);

			if (status & YES) {
				switch(true) {
					case !! (status & BUGGY):			html = '<div>Buggy <span class="buggy"></span></div>'; break;
					case !! (status & OLD):				html = '<div>Partial <span class="partial">○</span></div>'; break;
					case !! (status & PREFIX):			html = '<div>Prefixed <span class="check">✔</span></div>'; break;
					case !! (status & EXPERIMENTAL):	html = '<div>Prefixed <span class="check">✔</span></div>'; break;
					default:							html = '<div>Yes <span class="check">✔</span></div>'; break;
				}
			}
			else {
				switch(true) {
					case !! (status & UNKNOWN):			html = '<div>Unknown <span class="partial">?</span></div>'; break;
					case !! (status & BLOCKED):			html = '<div>Not functional <span class="buggy">!</span></div>'; break;
					case !! (status & DISABLED):		html = '<div>Disabled <span class="ballot">✘</span></div>'; break;
					default:							html = '<div>No <span class="ballot">✘</span></div>'; break;
				}
			}

			return html;
		}
	}



	var BrowserPopup = function() { this.initialize.apply(this, arguments) };
	BrowserPopup.current = null;
	BrowserPopup.prototype = {
		initialize: function(parent, type, data) {
			if (BrowserPopup.current) {
				BrowserPopup.current.close();
			}

			var browser = data.platform + (data.version ? "-" + data.version : "");

			var content = "";
			content += "<div class='info'>";
			content += "<div class='column left score'><h2>" + data.score + "</h2><span>Points</span></div>";
			content += "<div class='column middle'><a href='/results/" + type + "/timeline/" + data.id +".html' class='timeline'><span>Timeline</span></a></div>";
			content += "<div class='column right'><a href='/compare/browser/" + browser +".html' class='compare'><span>Compare</span></a></div>";
			content += "</div>";

			if (typeof data.urls != 'undefined') {
				content += "<div class='links'>";

				for (var i = 0; i < data.urls.length; i++) {
				}

				content += "</div>";
			}

			this.panel = document.createElement('div');
			this.panel.className = 'linksPanel popupPanel pointsLeft';
			this.panel.innerHTML = content;
			parent.appendChild(this.panel);

			BrowserPopup.current = this;
		},

		close: function() {
			this.panel.parentNode.removeChild(this.panel);
			BrowserPopup.current = null;
		}
	}

	document.addEventListener('click', function() { if (BrowserPopup.current) BrowserPopup.current.close() }, true)
	document.addEventListener('touchstart', function() { if (BrowserPopup.current) BrowserPopup.current.close() }, true)
