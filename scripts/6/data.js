

var tests = [

	{
		id:		'semantics',
		name:	'Semantics',
		column:	'left',
		items:	[
					{
						id:		'parsing',
						name:	'Parsing rules',
						status:	'stable',
						items:	[
									{
										id:		'doctype',
										name: 	'<code>&lt;!DOCTYPE html&gt;</code> triggers standards mode',
										urls:   [
													[ 'w3c', 'http://www.w3.org/TR/html5/syntax.html#the-doctype' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/syntax.html#the-doctype' ]
												]
									}, {
										id:		'tokenizer',
										name: 	'HTML5 tokenizer',
										value:	3,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/syntax.html#parsing' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/syntax.html#parsing' ],
													[ 'mdn', '/HTML/HTML5/HTML5_Parser' ]
												]
									}, {
										id:		'tree',
										name: 	'HTML5 tree building',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/syntax.html#parsing' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/syntax.html#parsing' ],
													[ 'mdn', '/HTML/HTML5/HTML5_Parser' ]
												]
									},

									'<em>HTML5 defines rules for embedding SVG and MathML inside a regular HTML document. The following tests only check if the browser is following the HTML5 parsing rules for inline SVG and MathML, not if the browser can actually understand and render it.</em>',

									{
										id:		'svg',
										name: 	'Parsing inline SVG',
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#svg' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/embedded-content.html#svg-0' ],
													[ 'mdn', '/SVG' ]
												]

									}, {
										id:		'mathml',
										name: 	'Parsing inline MathML',
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#mathml' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/embedded-content.html#mathml' ],
													[ 'mdn', '/MathML' ]
												]
									}
								]
					}, {
						id:		'elements',
						name:	'Elements',
						status:	'stable',
						items:	[
									{
										id:		'dataset',
										name: 	'Embedding custom non-visible data',
										value:	3,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes' ],
													[ 'mdn', '/DOM/element.dataset' ]
												]
									},

									'<strong>New or modified elements</strong>',

									{
										id:		'section',
										name:	'Section elements',
										urls:	[
													[ 'mdn', '/Sections_and_Outlines_of_an_HTML5_document' ]
												],
										items:	[
													{
														id:		'section',
														name: 	'<code>section</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-section-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-section-element' ]
																]
													}, {
														id:		'nav',
														name: 	'<code>nav</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-nav-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-nav-element' ]
																]
													}, {
														id:		'article',
														name: 	'<code>article</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-article-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-article-element' ]
																]
													}, {
														id:		'aside',
														name: 	'<code>aside</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-aside-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-aside-element' ]
																]
													}, {
														id:		'header',
														name: 	'<code>header</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-header-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-header-element' ]
																]
													}, {
														id:		'footer',
														name: 	'<code>footer</code> element',
														value:	1,
														urls:	[
																	[ 'w3c', 'http://www.w3.org/TR/html5/sections.html#the-footer-element' ],
																	[ 'whatwg', 'https://html.spec.whatwg.org/multipage/semantics.html#the-footer-element' ]
																]
													}
												]

									}, {
										id:		'grouping',
										name:	'Grouping content elements',
										urls:	[
													[ 'mdn', '/Sections_and_Outlines_of_an_HTML5_document' ]
												],
										items:	[
													{
														id:		'main',
														name: 	'<code>main</code> element',
														value:	1,
														url:	'http://www.w3.org/html/wg/drafts/html/master/single-page.html#the-main-element'
													}, {
														id:		'figure',
														name: 	'<code>figure</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/grouping-content.html#the-figure-element'
													}, {
														id:		'figcaption',
														name: 	'<code>figcaption</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/grouping-content.html#the-figcaption-element'
													}, {
														id:		'ol',
														name: 	'<code>reversed</code> attribute on the <code>ol</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/grouping-content.html#the-ol-element'
													}
												]
									}, {
										id:		'semantic',
										name:	'Text-level semantic elements',
										items:	[
													{
														id:		'download',
														name: 	'<code>download</code> attribute on the <code>a</code> element',
														value:	1,
														urls:	[ [ 'whatwg', 'http://developers.whatwg.org/links.html#attr-hyperlink-download' ] ]
													}, {
														id:		'ping',
														name: 	'<code>ping</code> attribute on the <code>a</code> element',
														value:	1,
														urls:	[ [ 'whatwg', 'http://developers.whatwg.org/links.html#ping' ] ]
													}, {
														id:		'mark',
														name: 	'<code>mark</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-mark-element'
													}, {
														id:		'ruby',
														name: 	'<code>ruby</code>, <code>rt</code> and <code>rp</code> elements',
														value:	3,
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-ruby-element'
													}, {
														id:		'time',
														name: 	'<code>time</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-time-element'
													}, {
														id:		'wbr',
														name: 	'<code>wbr</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-wbr-element'
													}
												]
									}, {
										id:		'interactive',
										name:	'Interactive elements',
										items:	[
													{
														id:		'details',
														name: 	'<code>details</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-details-element'
													}, {
														id:		'summary',
														name: 	'<code>summary</code> element',
														value:	1,
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-summary-element'
													}, {
														id:		'menutoolbar',
														name: 	'<code>menu</code> element of type <code>toolbar</code>',
														status:	'proposal',
														value:	1,
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-menu-element'
													}, {
														id:		'menupopup',
														name: 	'<code>menu</code> element of type <code>popup</code>',
														status:	'proposal',
														value:	2,
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-menu-element'
													}, {
														id:		'dialog',
														name: 	'<code>dialog</code> element',
														status:	'proposal',
														value:	1,
														url:	'http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#the-dialog-element'
													}
												]
									},

									'<strong>Global attributes or methods</strong>',

									{
										id:		'hidden',
										name: 	'<code>hidden</code> attribute',
										value:	1,
										url:	'http://www.w3.org/TR/html5/editing.html#the-hidden-attribute'
									}, {
										id:		'dynamic',
										name:	'Dynamic markup insertion',
										items:	[
													{
														id:		'outerHTML',
														name: 	'<code>outerHTML</code> property',
														value:	1,
														urls:	[
																	[ 'whatwg', 'http://domparsing.spec.whatwg.org/#outerhtml' ]
																]
													}, {
														id:		'insertAdjacentHTML',
														name: 	'<code>insertAdjacentHTML</code> function',
														value:	1,
														urls:	[
																	['whatwg', 'http://domparsing.spec.whatwg.org/#insertadjacenthtml%28%29' ]
																]
													}
												]
									}
								]
					}, {
						id:		'form',
						name:	'Forms',
						status:	'stable',
						items:	[
									'<strong>Field types</strong>',

									{
										id:		'text',
										name:	'<code>input type=text</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support'
													}, {
														id:			'selection',
														name: 		'Selection Direction',
														value:		2
													}
												]
									}, {
										id:		'search',
										name:	'<code>input type=search</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#text-(type=text)-state-and-search-state-(type=search)'
													}
												]
									}, {
										id:		'tel',
										name:	'<code>input type=tel</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#telephone-state-(type=tel)'
													}
												]
									}, {
										id:		'url',
										name:	'<code>input type=url</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#url-state-(type=url)'
													}, {
														id:			'validation',
														name: 		'Field validation',
														url:		'http://www.w3.org/TR/html5/forms.html#the-constraint-validation-api'
													}
												]
									}, {
										id:		'email',
										name:	'<code>input type=email</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)'
													}, {
														id:			'validation',
														name: 		'Field validation',
														url:		'http://www.w3.org/TR/html5/forms.html#the-constraint-validation-api'
													}
												]
									}, {
										id:		'date',
										name:	'<code>input type=date</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#date-state-(type=date)'
													}, {
														id:			'ui',
														value:		2,
														name: 		'Custom user-interface'
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsDate',
														name: 		'<code>valueAsDate()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasdate'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'month',
										name:	'<code>input type=month</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#month-state-(type=month)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsDate',
														name: 		'<code>valueAsDate()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasdate'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'week',
										name:	'<code>input type=week</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#week-state-(type=week)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsDate',
														name: 		'<code>valueAsDate()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasdate'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'time',
										name:	'<code>input type=time</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#time-state-(type=time)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsDate',
														name: 		'<code>valueAsDate()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasdate'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'datetime',
										name:	'<code>input type=datetime</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#date-and-time-state-(type=datetime)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		1
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'datetime-local',
										name:	'<code>input type=datetime-local</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#local-date-and-time-state-(type=datetime-local)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'number',
										name:	'<code>input type=number</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#number-state-(type=number)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'validation',
														name: 		'Field validation',
														url:		'http://www.w3.org/TR/html5/forms.html#the-constraint-validation-api'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'range',
										name:	'<code>input type=range</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#range-state-(type=range)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}, {
														id:			'min',
														name: 		'<code>min</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-min'
													}, {
														id:			'max',
														name: 		'<code>max</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-max'
													}, {
														id:			'step',
														name: 		'<code>step</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-step'
													}, {
														id:			'stepDown',
														name: 		'<code>stepDown()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepdown'
													}, {
														id:			'stepUp',
														name: 		'<code>stepUp()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-stepup'
													}, {
														id:			'valueAsNumber',
														name: 		'<code>valueAsNumber()</code> method',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-valueasnumber'
													}
												]
									}, {
										id:		'color',
										name:	'<code>input type=color</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#color-state-(type=color)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface',
														value:		2
													}, {
														id:			'sanitization',
														name: 		'Value sanitization',
														url:		'http://www.w3.org/TR/html5/forms.html#value-sanitization-algorithm'
													}
												]
									}, {
										id:		'checkbox',
										name:	'<code>input type=checkbox</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#checkbox-state-(type=checkbox)'
													}, {
														id:			'indeterminate',
														name: 		'<code>indeterminate</code> property',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-indeterminate'
													}
												]
									}, {
										id:		'image',
										name:	'<code>input type=image</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#image-button-state-(type=image)'
													}, {
														id:			'width',
														name: 		'<code>width</code> property',
														value:		0,
														url:		'http://www.w3.org/TR/html5/embedded-content-0.html#attr-dim-width'
													}, {
														id:			'height',
														name: 		'<code>height</code> property',
														value:		0,
														url:		'http://www.w3.org/TR/html5/embedded-content-0.html#attr-dim-height'
													}
												]
									}, {
										id:		'file',
										name:	'<code>input type=file</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#file-upload-state-(type=file)'
													}, {
														id:			'files',
														name: 		'<code>files</code> property',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-input-files'
													}
												]
									}, {
										id:		'textarea',
										name:	'<code>textarea</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#the-textarea-element'
													}, {
														id:			'maxlength',
														name:		'<code>maxlength</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#attr-textarea-maxlength'
													}, {
														id:			'wrap',
														name:		'<code>wrap</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#attr-textarea-wrap'
													}
												]
									}, {
										id:		'select',
										name:	'<code>select</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#the-select-element'
													}, {
														id:			'required',
														name:		'<code>required</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#attr-select-required'
													}
												]
									}, {
										id:		'fieldset',
										name:	'<code>fieldset</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														url:		'http://www.w3.org/TR/html5/forms.html#the-fieldset-element'
													}, {
														id:			'elements',
														name:		'<code>elements</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-fieldset-elements'
													}, {
														id:			'disabled',
														name:		'<code>disabled</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-fieldset-disabled'
													}
												]
									}, {
										id:		'datalist',
										name:	'<code>datalist</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#the-datalist-element'
													}, {
														id:			'list',
														name:		'<code>list</code> attribute for fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-list'
													}
												]
									}, {
										id:		'keygen',
										name:	'<code>keygen</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#the-keygen-element'
													}, {
														id:			'challenge',
														name: 		'<code>challenge</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-keygen-challenge'
													}, {
														id:			'keytype',
														name: 		'<code>keytype</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-keygen-keytype'
													}
												]
									}, {
										id:		'output',
										name:	'<code>output</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#the-output-element'
													}
												]
									}, {
										id:		'progress',
										name:	'<code>progress</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#the-progress-element'
													}
												]
									}, {
										id:		'meter',
										name:	'<code>meter</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support',
														value:		2,
														url:		'http://www.w3.org/TR/html5/forms.html#the-meter-element'
													}
												]
									},

									'<strong>Fields</strong>',

									{
										id:		'validation',
										name:	'Field validation',
										items:	[
													{
														id:			'pattern',
														name: 		'<code>pattern</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-pattern'
													}, {
														id:			'required',
														name: 		'<code>required</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-required'
													}
												]
									}, {
										id:		'association',
										name:	'Association of controls and forms',
										value:	2,
										items:	[
													{
														id:			'control',
														name: 		'<code>control</code> property on labels',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-label-control'
													}, {
														id:			'form',
														name: 		'<code>form</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fae-form'
													}, {
														id:			'formAction',
														name: 		'<code>formAction</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fs-formaction'
													}, {
														id:			'formEnctype',
														name: 		'<code>formEnctype</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fs-formenctype'
													}, {
														id:			'formMethod',
														name: 		'<code>formMethod</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fs-formmethod'
													}, {
														id:			'formNoValidate',
														name: 		'<code>formNoValidate</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fs-formnovalidate'
													}, {
														id:			'formTarget',
														name: 		'<code>formTarget</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fs-formtarget'
													}, {
														id:			'labels',
														name: 		'<code>labels</code> property on fields',
														url:		'http://www.w3.org/TR/html5/forms.html#dom-lfe-labels'
													}
												]
									}, {
										id:		'other',
										name:	'Other attributes',
										value:	2,
										items:	[
													{
														id:			'autofocus',
														name: 		'<code>autofocus</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-fe-autofocus'
													}, {
														id:			'autocomplete',
														name: 		'<code>autocomplete</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-autocomplete'
													}, {
														id:			'placeholder',
														name: 		'<code>placeholder</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-placeholder'
													}, {
														id:			'multiple',
														name: 		'<code>multiple</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-multiple'
													}, {
														id:			'dirname',
														name: 		'<code>dirName</code> attribute',
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-dirname'
													}
												]
									}, {
										id:		'selectors',
										name:	'CSS selectors',
										value:	2,
										items:	[
													{
														id:			'valid',
														name: 		'<code>:valid</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-valid'
													}, {
														id:			'invalid',
														name: 		'<code>:invalid</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-invalid'
													}, {
														id:			'optional',
														name: 		'<code>:optional</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-optional'
													}, {
														id:			'required',
														name: 		'<code>:required</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-required'
													}, {
														id:			'in-range',
														name: 		'<code>:in-range</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-in-range'
													}, {
														id:			'out-of-range',
														name: 		'<code>:out-of-range</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-out-of-range'
													}, {
														id:			'read-write',
														name: 		'<code>:read-write</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-read-write'
													}, {
														id:			'read-only',
														name: 		'<code>:read-only</code> selector',
														url:		'http://www.w3.org/TR/html5/links.html#selector-read-only'
													}
												]
									}, {
										id:		'events',
										name:	'Events',
										value:	2,
										items:	[
													{
														id:			'oninput',
														name: 		'<code>oninput</code> event',
														url:		'http://www.w3.org/TR/html5/forms.html#event-input-input'
													}, {
														id:			'onchange',
														name: 		'<code>onchange</code> event',
														url:		'http://www.w3.org/TR/html5/forms.html#event-input-change'
													}, {
														id:			'oninvalid',
														name: 		'<code>oninvalid</code> event',
														url:		'http://www.w3.org/TR/html5/webappapis.html#events'
													}
												]
									},

									'<strong>Forms</strong>',

									{
										id:		'formvalidation',
										name:	'Form validation',
										items:	[
													{
														id:			'checkValidity',
														name: 		'<code>checkValidity</code> method',
														value:		3,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-form-checkvalidity'
													}, {
														id:			'noValidate',
														name: 		'<code>noValidate</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/forms.html#dom-fs-novalidate'
													}
												]
									}
								]
					}, {
						id:		'microdata',
						name:	'Microdata',
						status:	'rejected',
						items:	[
									{
										id:			'microdata',
										name: 		'Microdata',
										value:		0,
										url:    	'http://www.w3.org/TR/microdata/'
									}
								]
					}
				]
	},


	{
		id:		'deviceaccess',
		name:	'Device Access',
		column:	'left',
		items:	[
					{
						id:		'location',
						name:	'Location and Orientation',
						status:	'stable',
						items:	[
									{
										id:			'geolocation',
										name: 		'Geolocation',
										value:		15,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/geolocation-API/' ],
														[ 'wp',  '/apis/geolocation' ],
														[ 'mdn', '/Using_geolocation' ]
													]
									}, {
										id:			'orientation',
										name: 		'Device Orientation',
										value:		3,
										urls:		[
														[ 'w3c', 'http://dev.w3.org/geo/api/spec-source-orientation.html' ],
														[ 'mdn', '/Mozilla_event_reference/devicemotion' ]
													]
									}, {
										id:			'motion',
										name: 		'Device Motion',
										value:		2,
										urls:		[
														[ 'w3c', 'http://dev.w3.org/geo/api/spec-source-orientation.html' ],
														[ 'mdn', '/Mozilla_event_reference/devicemotion' ]
													]
									}
								]
					}, {
						id:		'output',
						name:	'Output',
						status:	'proposal',
						items:	[
									{
										id:			'requestFullScreen',
										name: 		'Full screen support',
										value:		5,
										urls:		[
														[ 'w3c', 'http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api' ],
														[ 'wp',	 '/dom/methods/requestFullscreen' ],
														[ 'mdn', '/DOM/Using_fullscreen_mode' ]
													]
									}, {
										id:			'notifications',
										name: 		'Web Notifications',
										value:		5,
										url:		'http://www.w3.org/TR/notifications/'
									}
								]
					}, {
						id:		'input',
						name:	'Input',
						status:	'proposal',
						items:	[
									{
										id:			'getUserMedia',
										name: 		'Access the webcam',
										value:		15,
										urls:		[
														[ 'w3c', 'http://dev.w3.org/2011/webrtc/editor/getusermedia.html' ],
														[ 'wp',  '/dom/methods/getUserMedia' ],
														[ 'mdn', '/WebRTC' ]
													]
									}, {
										id:			'getGamepads',
										name: 		'Gamepad control',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/gamepad/' ],
														[ 'wp',  '/apis/gamepad' ]
													]
									}, {
										id:			'pointerevents',
										name: 		'Pointer Events',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/pointerevents/' ],
														[ 'wp',  '/concepts/Pointer_Events' ]
													]
									}, {
										id:			'pointerLock',
										name: 		'Pointer Lock support',
										value:		3,
										urls:		[
														[ 'w3c', 'http://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html' ],
														[ 'wp',	 '/dom/methods/requestPointerLock' ],
														[ 'mdn', '/API/Pointer_Lock_API' ]
													]
									}
								]
					}
				]
	},

	{
		id:		'multimedia',
		name:	'Multimedia',
		column:	'right',
		items:	[
					{
						id:		'video',
						name:	'Video',
						status:	'stable',
						items:	[
									{
										id:		'element',
										name: 	'<code>video</code> element',
										value:	16,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element' ],
													[ 'wp',  '/html/elements/video' ],
													[ 'mdn', '/Using_HTML5_audio_and_video' ]
												]
									}, {
										id:		'subtitle',
										name: 	'Subtitles',
										value:	8,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#the-track-element' ],
													[ 'wp',  '/html/elements/track' ]
												]
									}, {
										id:		'audiotracks',
										name: 	'Audio track selection',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#dom-media-audiotracks' ]
												]
									}, {
										id:		'videotracks',
										name: 	'Video track selection',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#dom-media-videotracks' ]
												]
									}, {
										id:		'poster',
										name: 	'Poster images',
										value:	1,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#attr-video-poster' ],
													[ 'wp',  '/dom/apis/audio-video/properties/poster' ]
												]
									}, {
										id:		'canplaytype',
										name: 	'Codec detection',
										value:	4,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#dom-navigator-canplaytype' ],
													[ 'wp',  '/dom/apis/audio-video/methods/canPlayType' ]
												]
									},

									'<strong>Advanced</strong>',

									{
										id:		'drm',
										name: 	'DRM support',
										status:	'controversial',
										url:	'http://www.w3.org/TR/encrypted-media/'
									}, {
										id:		'mediasource',
										name: 	'Media Source extensions',
										status:	'proposal',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/media-source/' ],
													[ 'wp',  '/apis/media_source_extensions' ]
												]
									},

									'<strong>Codecs</strong>',

									{
										id:		'mpeg4',
										name: 	'MPEG-4 ASP support',
										status:	'optional'
									}, {
										id:		'h264',
										name: 	'H.264 support',
										status:	'optional',
										urls:	[
													[ 'other', 'http://ip.hhi.de/imagecom_G1/assets/pdfs/csvt_overview_0305.pdf' ]
												]
									}, {
										id:		'theora',
										name: 	'Ogg Theora support',
										status:	'optional',
										urls:	[
													[ 'xiph', 'http://theora.org/doc/Theora.pdf' ]
												]
									}, {
										id:		'webmvp8',
										name: 	'WebM with VP8 support',
										status:	'optional',
										urls:	[
													[ 'webm', 'http://www.webmproject.org/' ],
													[ 'ietf', 'http://www.rfc-editor.org/rfc/rfc6386.txt' ]
												]
									}, {
										id:		'webmvp9',
										name: 	'WebM with VP9 support',
										status:	'optional',
										urls:	[
													[ 'webm', 'http://www.webmproject.org/' ],
													[ 'ietf', 'http://tools.ietf.org/id/draft-grange-vp9-bitstream-00.txt' ]
												]
									}
								]
					}, {
						id:		'audio',
						name:	'Audio',
						status:	'stable',
						items:	[
									{
										id:		'element',
										name: 	'<code>audio</code> element',
										value:	18,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element' ],
													[ 'wp',  '/html/elements/audio' ],
													[ 'mdn', '/Using_HTML5_audio_and_video' ]
												]
									}, {
										id:		'loop',
										name: 	'Loop audio',
										value:	1,
										url:	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-media-loop'
									}, {
										id:		'preload',
										name: 	'Preload in the background',
										value:	1,
										url:	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-media-preload'
									},


									'<strong>Advanced</strong>',

									{
										id:		'webaudio',
										name: 	'Web Audio API',
										status:	'proposal',
										value:	5,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/webaudio/' ],
													[ 'wp',  '/apis/webaudio' ]
												]
									},

									{
										id:		'speechrecognition',
										name: 	'Speech Recognition',
										status:	'experimental',
										value:	3,
										url:	'https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html'
									},

									{
										id:		'speechsynthesis',
										name: 	'Speech Synthesis',
										status:	'experimental',
										value:	2,
										url:	'https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html'
									},

									'<strong>Codecs</strong>',

									{
										id:		'pcm',
										name: 	'PCM audio support',
										status:	'optional'
									}, {
										id:		'aac',
										name: 	'AAC support',
										status:	'optional'
									}, {
										id:		'mp3',
										name: 	'MP3 support',
										status:	'optional'
									}, {
										id:		'vorbis',
										name: 	'Ogg Vorbis support',
										status:	'optional'
									}, {
										id:		'opus',
										name: 	'Ogg Opus support',
										status:	'optional'
									}, {
										id:		'webm',
										name: 	'WebM with Vorbis support',
										status:	'optional'
									}, {
                                        id:             'webmopus',
                                        name:   'WebM with Opus support',
                                        status: 'optional'
									}
								]
					}
				]
	},

	{
		id:		'graphicseffects',
		name:	'3D, Graphics & Effects',
		column:	'right',
		items:	[
					{
						id:		'responsive',
						status:	'proposal',
						name: 	'Responsive images',
						items:	[
									{
										id:			'picture',
										name: 		'<code>picture</code> element',
										value:		5,
										urls:		[
														[ 'ricg', 'http://responsiveimages.org/' ],
														[ 'whatwg', 'https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element' ]
													]
									}, {
										id:			'srcset',
										name: 		'<code>srcset</code> attribute',
										value:		5,
										urls:		[
														[ 'ricg', 'http://responsiveimages.org/' ],
														[ 'w3c', 'http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/' ],
														[ 'whatwg', 'https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset' ]
													]
									}, {
										id:			'sizes',
										name: 		'<code>sizes</code> attribute',
										value:		5,
										urls:		[
														[ 'ricg', 'http://responsiveimages.org/' ],
														[ 'whatwg', 'https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-sizes' ],
													]
									}
								]
					}, {
						id:		'canvas',
						name:	'2D Graphics',
						status:	'stable',
						items:	[
									{
										id:		'context',
										name: 	'Canvas 2D graphics',
										value:	10,
										urls:   [
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/' ],
													[ 'wp',  '/apis/canvas' ],
													[ 'mdn', '/HTML/Canvas' ]
												]
									},

									'<strong>Drawing primitives</strong>',

									{
										id:		'text',
										name: 	'Text support',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/#drawing-text-to-the-canvas' ],
													[ 'wp',  '/apis/canvas/CanvasRenderingContext2D/fillText' ]
												]
									}, {
										id:		'path',
										name: 	'Path support',
										status:	'proposal',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/#path-objects' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/scripting.html#path2d-objects' ]
												]
									}, {
										id:		'ellipse',
										name: 	'Ellipse support',
										status:	'proposal',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/#dom-context-2d-ellipse' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-ellipse' ]
												]
									}, {
										id:		'dashed',
										name: 	'Dashed line support',
										status:	'proposal',
										value:	2,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/#dom-context-2d-setlinedash' ],
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-setlinedash' ]
												]
									}, {
										id:		'focusring',
										name: 	'System focus ring support',
										status:	'proposal',
										value:	1,
										urls:	[
													[ 'whatwg', 'https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-drawsystemfocusring' ]
												]
									},

									'<strong>Features</strong>',

									{
										id:		'hittest',
										name: 	'Hit testing support',
										status:	'proposal',
										value:	1,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/2dcontext/#dom-context-2d-addhitregion' ],
													[ 'whatwg', 'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-addhitregion' ]
												]
									}, {
										id:		'blending',
										name: 	'Blending modes',
										status:	'proposal',
										value:	5,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/compositing-1/#canvascompositingandblending' ]
												]
									},

									'<strong>Image export formats</strong>',

									{
										id:		'png',
										name: 	'PNG support'
									}, {
										id:		'jpeg',
										name: 	'JPEG support'
									}, {
										id:		'jpegxr',
										name: 	'JPEG-XR support'
									}, {
										id:		'webp',
										name: 	'WebP support'
									}
								]
					}, {
						id:		'webgl',
						status:	'stable',
						name:	'3D Graphics',
						items:	[
									{
										id:			'context',
										name: 		'WebGL 3D graphics',
										value:		20,
										urls:		[
														[ 'khronos', 'http://www.khronos.org/registry/webgl/specs/latest/' ],
														[ 'wp',  '/webgl' ],
														[ 'mdn', '/docs/WebGL' ]
													]

									}
								]
					}, {
						id:		'animation',
						status:	'stable',
						name: 	'Animation',
						items:	[
									{
										id:			'requestAnimationFrame',
										name: 		'<code>window.requestAnimationFrame</code>',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/animation-timing/#requestAnimationFrame' ],
														[ 'wp',  '/apis/timing/methods/requestAnimationFrame' ],
														[ 'mdn', '/DOM/window.requestAnimationFrame' ]
													]
									}
								]
					}
				]
	},

	{
		id:		'connectivity',
		name:	'Connectivity',
		column:	'left',
		items:	[
					{
						id:		'communication',
						status:	'stable',
						name: 	'Communication',
						items:	[
									{
										id:			'eventSource',
										name: 		'Server-Sent Events',
										value:		6,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/eventsource/' ],
														[ 'mdn', '/Server-sent_events/Using_server-sent_events' ]
													]
									},

									{
										id:			'beacon',
										name: 		'Beacon',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/beacon/' ],
														[ 'mdn', '/Web/API/navigator.sendBeacon' ]
													]
									},



									'<strong>XMLHttpRequest Level 2</strong>',

									{
										id:			'xmlhttprequest2.upload',
										name: 		'Upload files',
										value:		5,
										url:    	'http://www.w3.org/TR/XMLHttpRequest2/#the-upload-attribute'
									}, {
										id:			'xmlhttprequest2.response',
										name:		'Response type support',
										urls:		[
														[ 'mdn', '/DOM/XMLHttpRequest' ]
													],
										items:		[
														{
															id:			'text',
															name: 		'Text response type',
															value:		1,
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'document',
															name: 		'Document response type',
															value:		2,
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'array',
															name: 		'<code>ArrayBuffer</code> response type',
															value:		2,
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'blob',
															name: 		'<code>Blob</code> response type',
															value:		2,
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}
													]
									},

									'<strong>WebSocket</strong>',

									{
										id:			'websocket.basic',
										name: 		'Basic socket communication',
										value:		10,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/websockets/' ],
														[ 'mdn', '/docs/WebSockets' ]
													]
									}, {
										id:			'websocket.binary',
										name: 		'<code>ArrayBuffer</code> and <code>Blob</code> support',
										value:		5,
										urls:		[
														[ 'whatwg', 'http://www.whatwg.org/specs/web-apps/current-work/multipage/network.html#dom-websocket-binarytype' ],
														[ 'mdn', '/docs/WebSockets' ]
													]
									}
								]
					}, {
						id:		'webrtc',
						name:	'Peer To Peer',
						status:	'proposal',
						items:	[
									{
										id:		'webrtc',
										name: 	'WebRTC 1.0',
										value:	10,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/webrtc/' ],
													[ 'wp',  '/apis/webrtc/RTCPeerConnection' ],
													[ 'mdn', '/WebRTC' ]
												]
									}, {
										id:		'objectrtc',
										name: 	'ObjectRTC API for WebRTC',
										value:	{ maximum: 15, conditional: '!webrtc.webrtc' },
										urls:	[
													[ 'w3c', 'http://ortc.org/wp-content/uploads/2014/10/ortc.html' ]
												]
									}, {
										id:		'datachannel',
										name: 	'Data channel',
										value:	5,
										urls:	[
													[ 'w3c', 'http://www.w3.org/TR/webrtc/' ],
													[ 'wp',  '/apis/webrtc/RTCDataChannel' ],
													[ 'mdn', '/WebRTC' ]
												]
									}
								]
					}
				]
	},

	{
		id:		'performanceintegration',
		name:	'Performance & Integration',
		column:	'left',
		items:	[
					{
						id:		'interaction',
						status:	'stable',
						name: 	'User interaction',
						items:	[
									'<strong>Drag and drop</strong>',

									{
										id:		'dragdrop.attributes',
										name:	'Attributes',
										urls:	[
													[ 'mdn', '/DragDrop/Drag_and_Drop' ]
												],
										items:	[
													{
														id:			'draggable',
														name: 		'<code>draggable</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/editing.html#the-draggable-attribute'
													}, {
														id:			'dropzone',
														name: 		'<code>dropzone</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/editing.html#the-dropzone-attribute	'
													}
												]
									}, {
										id:		'dragdrop.events',
										name:	'Events',
										urls:	[
													[ 'mdn', '/DragDrop/Drag_and_Drop' ]
												],
										items:	[
													{
														id:			'ondrag',
														name: 		'<code>ondrag</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondragstart',
														name: 		'<code>ondragstart</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondragenter',
														name: 		'<code>ondragenter</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondragover',
														name: 		'<code>ondragover</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondragleave',
														name: 		'<code>ondragleave</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondragend',
														name: 		'<code>ondragend</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}, {
														id:			'ondrop',
														name: 		'<code>ondrop</code> event',
														url:		'http://www.w3.org/TR/html5/editing.html#dndevents'
													}
												]
									},

									'<strong>HTML editing</strong>',

									{
										id:		'editing.elements',
										name:	'Editing elements',
										urls:	[
													[ 'mdn', '/HTML/Content_Editable' ]
												],
										items:	[
													{
														id:			'contentEditable',
														name: 		'<code>contentEditable</code> attribute',
														value:		5,
														url:		'http://www.w3.org/TR/html5/editing.html#contenteditable'
													}, {
														id:			'isContentEditable',
														name: 		'<code>isContentEditable</code> property',
														value:		1,
														url:		'http://www.w3.org/TR/html5/editing.html#contenteditable'
													}
												]
									}, {
										id:		'editing.documents',
										name:	'Editing documents',
										urls:	[
													[ 'mdn', '/HTML/Content_Editable' ]
												],
										items:	[
													{
														id:			'designMode',
														name: 		'<code>designMode</code> attribute',
														value:		1,
														url:		'http://www.w3.org/TR/html5/editing.html#designMode'
													}
												]
									}, {
										id:		'editing.selectors',
										name:	'CSS selectors',
										urls:	[
													[ 'mdn', '/HTML/Content_Editable' ]
												],
										items:	[
													{
														id:			'read-write',
														name: 		'<code>:read-write</code> selector',
														value:		1,
														url:		'http://www.w3.org/TR/html5/links.html#selector-read-write'
													}, {
														id:			'read-only',
														name: 		'<code>:read-only</code> selector',
														value:		1,
														url:		'http://www.w3.org/TR/html5/links.html#selector-read-only'
													}
												]
									}, {
										id:		'editing.apis',
										name:	'APIs',
										value:	2,
										urls:	[
													[ 'mdn', '/HTML/Content_Editable' ]
												],
										items:	[
													{
														id:			'execCommand',
														name: 		'<code>execCommand</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}, {
														id:			'queryCommandEnabled',
														name: 		'<code>queryCommandEnabled</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}, {
														id:			'queryCommandIndeterm',
														name: 		'<code>queryCommandIndeterm</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}, {
														id:			'queryCommandState',
														name: 		'<code>queryCommandState</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}, {
														id:			'queryCommandSupported',
														name: 		'<code>queryCommandSupported</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}, {
														id:			'queryCommandValue',
														name: 		'<code>queryCommandValue</code> method',
														url:		'https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html'
													}
												]
									},

									'<strong>Clipboard</strong>',

									{
										id:			'clipboard',
										name: 		'Clipboard API and events',
										value:		5,
										url:		'http://dev.w3.org/2006/webapi/clipops/clipops.html'
									},

									'<strong>Spellcheck</strong>',

									{
										id:			'spellcheck',
										name: 		'<code>spellcheck</code> attribute',
										value:		2,
										url:		'http://www.w3.org/TR/html5/editing.html#attr-spellcheck'
									}
								]
					}, {
						id:		'performance',
						status:	'stable',
						name:	'Performance',
						items:	[
									{
										id:			'datatypes',
										name:		'Native binary data',
										status:		'stable',
										items:		[
														{
															id:			'ArrayBuffer',
															name: 		'<code>ArrayBuffer</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#5' ] ]
														}, {
															id:			'Int8Array',
															name: 		'<code>Int8Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Uint8Array',
															name: 		'<code>Uint8Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Uint8ClampedArray',
															name: 		'<code>Uint8ClampedArray</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7.1' ] ]
														}, {
															id:			'Int16Array',
															name: 		'<code>Int16Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Uint16Array',
															name: 		'<code>Uint16Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Int32Array',
															name: 		'<code>Int32Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Uint32Array',
															name: 		'<code>Uint32Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Float32Array',
															name: 		'<code>Float32Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'Float64Array',
															name: 		'<code>Float64Array</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}, {
															id:			'DataView',
															name: 		'<code>DataView</code>',
															value:		1,
															urls:    	[ [ 'khronos', 'http://www.khronos.org/registry/typedarray/specs/latest/#7' ] ]
														}
													]
									},

									'<strong>Workers</strong>',

									{
										id:			'worker',
										name: 		'Web Workers',
										value:		10,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/workers/#dedicated-workers-and-the-worker-interface' ],
														[ 'mdn', '/DOM/Using_web_workers' ]
													]
									}, {
										id:			'sharedWorker',
										name: 		'Shared Workers',
										value:		4,
										urls:    	[
														[ 'w3c', 'http://www.w3.org/TR/workers/#shared-workers-and-the-sharedworker-interface' ],
														[ 'mdn', '/DOM/Using_web_workers' ]
													]
									}
								]
					}, {
						id:		'security',
						status:	'stable',
						name:	'Security',
						items:	[
									{
										id:			'crypto',
										name: 		'Web Cryptography API',
										status:		'experimental',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/WebCryptoAPI/' ]
													]
									}, {
										id:			'csp10',
										name: 		'Content Security Policy 1.0',
										value:		3,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/CSP/' ],
														[ 'mdn', '/Security/CSP' ]
													]
									}, {
										id:			'csp11',
										name: 		'Content Security Policy 1.1',
										status:		'proposal',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/CSP/' ],
														[ 'mdn', '/Security/CSP' ]
													]
									}, {
										id:			'cors',
										name: 		'Cross-Origin Resource Sharing',
										value:		5,
										urls:		[
														[ 'mdn', '/HTTP/Access_control_CORS' ]
													]
									}, {
										id:			'postMessage',
										name: 		'Cross-document messaging',
										value:		5,
										urls:    	[
														[ 'w3c', 'http://dev.w3.org/html5/postmsg/' ],
														[ 'wp',  '/apis/web-messaging' ],
														[ 'mdn', '/DOM/window.postMessage' ]
													]
									},

									'<strong>Iframes</strong>',

									{
										id:			'sandbox',
										name: 		'Sandboxed <code>iframe</code>',
										value:		10,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-sandbox' ],
														[ 'mdn', '/HTML/Element/iframe' ]
													]
									}, {
										id:			'seamless',
										name: 		'Seamless <code>iframe</code>',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-seamless' ],
														[ 'mdn', '/HTML/Element/iframe' ]
													]
									}, {
										id:			'srcdoc',
										name: 		'<code>iframe</code> with inline contents',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-srcdoc' ],
														[ 'mdn', '/HTML/Element/iframe' ]
													]
									}
								]
					}, {
						id:		'history',
						name: 	'History and navigation',
						status:	'stable',
						items:	[
									{
										id:			'history',
										name: 		'Session history',
										value:		10,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/browsers.html#the-history-interface' ],
														[ 'wp',  '/dom/history' ],
														[ 'mdn', '/DOM/Manipulating_the_browser_history' ]
													]
									}
								]
					}
				]
	},

	{
		id:		'offlinestorage',
		name:	'Offline & Storage',
		column:	'right',
		items:	[
					{
						id:		'offline',
						name: 	'Web applications',
						status:	'stable',
						items:	[
									'<strong>Offline resources</strong>',

									{
										id:			'applicationCache',
										name: 		'Application Cache',
										value:		10,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/browsers.html#offline' ],
														[ 'wp',  '/apis/appcache/ApplicationCache' ],
														[ 'mdn', '/HTML/Using_the_application_cache' ]
													]
									}, {
										id:			'serviceWorkers',
										name: 		'Service Workers',
										status:		'experimental',
										value:		10,
										urls:		[
														[ 'w3c', 'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#service-worker-obj' ],
														[ 'mdn', '/Web/API/ServiceWorker_API' ]
													]
									},

									'<strong>Content and Scheme handlers</strong>',

									{
										id:			'registerProtocolHandler',
										name: 		'Custom scheme handlers',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/webappapis.html#custom-handlers' ],
														[ 'mdn', '/docs/Web-based_protocol_handlers' ]
													]
									}, {
										id:			'registerContentHandler',
										name: 		'Custom content handlers',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/webappapis.html#custom-handlers' ],
														[ 'mdn', '/DOM/window.navigator.registerContentHandler' ]
													]
									}, {
										id:			'addSearchProvider',
										name: 		'Custom search providers',
										value:		1,
										urls:		[
														[ 'whatwg', 'http://www.whatwg.org/specs/web-apps/current-work/#dom-external-addsearchprovider' ]
													]
									}
								]
					}, {
						id:		'storage',
						name: 	'Storage',
						status:	'stable',
						items:	[
									'<strong>Key-value storage</strong>',

									{
										id:			'sessionStorage',
										name: 		'Session Storage',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute' ],
														[ 'wp',  '/apis/web-storage' ],
														[ 'mdn', '/DOM/Storage' ]
													]
									}, {
										id:			'localStorage',
										name: 		'Local Storage',
										value:		5,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/webstorage/#the-localstorage-attribute' ],
														[ 'wp',  '/apis/web-storage' ],
														[ 'mdn', '/DOM/Storage' ]
													]
									},

									'<strong>Database storage</strong>',

									{
										id:			'indexedDB.basic',
										name: 		'IndexedDB',
										status:		'proposal',
										value:		21,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/IndexedDB/' ],
														[ 'wp',  '/apis/indexedDB' ],
														[ 'mdn', '/IndexedDB' ]
													]
									}, {
										id:			'indexedDB.blob',
										name: 		'Objectstore <code>Blob</code> support',
										status:		'proposal',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/IndexedDB/' ],
														[ 'wp',  '/apis/indexedDB' ],
														[ 'mdn', '/IndexedDB' ]
													]
									}, {
										id:			'indexedDB.arraybuffer',
										name: 		'Objectstore <code>ArrayBuffer</code> support',
										status:		'proposal',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/IndexedDB/' ],
														[ 'wp',  '/apis/indexedDB' ],
														[ 'mdn', '/IndexedDB' ]
													]
									},

									'<em>The Web SQL Database specification is no longer being updated and has been replaced by IndexedDB. Because at least 3 vendors have shipped implementations of this specification we still include it in this test.</em>',

									{
										id:			'sqlDatabase',
										name: 		'Web SQL Database',
										status:		'rejected',
										value:		{ maximum: 5, conditional: '!storage.indexedDB.basic' },
										url:		'http://www.w3.org/TR/webdatabase/'
									}
								]
					}, {
						id:		'files',
						name:	'Files',
						status:	'stable',
						items:	[
									'<strong>Reading files</strong>',

									{
										id:			'fileReader',
										name: 		'Basic support for reading files',
										value:		7,
										urls:		[
														[ 'w3c', 'http://dev.w3.org/2006/webapi/FileAPI/#filereader-interface' ],
														[ 'wp',  '/apis/file' ],
														[ 'mdn', '/Using_files_from_web_applications' ]
													]
									}, {
										id:			'fileReader.blob',
										name: 		'Create a <code>Blob</code> from a file',
										value:		2,
										urls:		[
														[ 'w3c', 'http://dev.w3.org/2006/webapi/FileAPI/#dfn-Blob' ],
													]
									}, {
										id:			'fileReader.dataURL',
										name: 		'Create a Data URL from a <code>Blob</code>',
										value:		2,
										urls:    	[
														[ 'w3c', 'http://dev.w3.org/2006/webapi/FileAPI/#dfn-readAsDataURL' ],
													]
									}, {
										id:			'fileReader.arraybuffer',
										name: 		'Create an <code>ArrayBuffer</code> from a <code>Blob</code>',
										value:		2,
										urls:    	[
														[ 'w3c', 'http://dev.w3.org/2006/webapi/FileAPI/#dfn-readAsArrayBuffer' ],
													]
									}, {
										id:			'fileReader.objectURL',
										name: 		'Create a Blob URL from a <code>Blob</code>',
										value:		2,
										urls:    	[
														[ 'w3c', 'http://dev.w3.org/2006/webapi/FileAPI/#dfn-createObjectURL' ],
													]
									},

									'<strong>Accessing the file system</strong>',

									{
										id:			'getFileSystem',
										name: 		'FileSystem API',
										status:		'experimental',
										urls:    	[
														[ 'w3c', 'http://w3c.github.io/filesystem-api/Overview.html' ],
													]
									},

									'<em>The Directories and System API proposal has failed to gain traction among browser vendors and is only supported in some Webkit based browsers. No additional points are awarded for supporting this API.</em>',

									{
										id:			'fileSystem',
										name: 		'File API: Directories and System',
										status:		'rejected',
										urls:    	[
														[ 'w3c', 'http://www.w3.org/TR/file-system-api/' ],
														[ 'wp',  '/apis/filesystem' ]
													]
									}
								]
					}, {
						id:		'streams',
						status:	'experimental',
						name: 	'Streams',
						items:	[
									{
										id:			'streams.readable',
										name: 		'Readable streams',
										value:		3,
										urls:		[
														[ 'w3c', 'https://streams.spec.whatwg.org/' ]
													]
									}, {
										id:			'streams.writeable',
										name: 		'Writable streams',
										value:		2,
										urls:		[
														[ 'w3c', 'https://streams.spec.whatwg.org/' ]
													]
									}
								]
					}
				]
	},

	{
		id:		'other',
		name:	'Other',
		column:	'right',
		items:	[
					{
						id:		'components',
						status:	'experimental',
						name: 	'Web Components',
						items:	[
									{
										id:			'custom',
										name: 		'Custom elements',
										value:		4,
										urls:		[
														[ 'w3c', 'http://w3c.github.io/webcomponents/spec/custom/' ]
													]
									}, {
										id:			'shadowdom',
										name: 		'Shadow DOM',
										value:		2,
										urls:		[
														[ 'w3c', 'http://w3c.github.io/webcomponents/spec/shadow/' ]
													]
									}, {
										id:			'template',
										name: 		'HTML templates',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html-templates/' ]
													]
									}, {
										id:			'imports',
										name: 		'HTML imports',
										value:		2,
										urls:		[
														[ 'w3c', 'http://w3c.github.io/webcomponents/spec/imports/' ]
													]
									}
								]
					}, {
						id:		'other',
						name: 	'Other',
						status:	'stable',
						items:	[
									'<strong>Styling</strong>',

									{
										id:			'scoped',
										name: 		'Scoped <code>style</code> element',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/document-metadata.html#attr-style-scoped' ],
														[ 'wp',  '/Meta:HTML/Elements/style' ]
													]
									},

									'<strong>Scripts</strong>',

									{
										id:			'async',
										name: 		'Asynchronous script execution',
										value:		3,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/scripting-1.html#attr-script-async' ],
														[ 'mdn', '/HTML/Element/script' ],
														[ 'wp',  '/html/elements/script' ]
													]
									}, {
										id:			'onerror',
										name: 		'Runtime script error reporting',
										value:		1,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/webappapis.html#report-the-error' ],
														[ 'mdn', '/DOM/window.onerror' ]
													]
									}, {
										id:			'executionevents',
										name: 		'Script execution events',
										value:		1,
										urls:		[
														[ 'whatwg', 'http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#the-script-element' ],
														[ 'mdn', '/Web/Reference/Events/beforescriptexecute' ]
													]
									}, {
										id:			'base64',
										name: 		'Base64 encoding and decoding',
										value:		1,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/html5/webappapis.html#atob' ],
														[ 'mdn', '/DOM/window.atob' ]
													]
									}, {
										id:			'json',
										name: 		'JSON encoding and decoding',
										value:		1,
										urls:		[
														[ 'mdn', '/JSON' ],
														[ 'wp',	 '/apis/json' ]
													]
									}, {
										id: 		'url',
										name:   	'URL API',
										value:		2,
										urls:		[
														[ 'w3c', 'w3ctag.github.io/url/' ]
													]
									}, {
										id: 		'mutationObserver',
										name:   	'Mutation Observer',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/dom/#mutation-observers' ],
														[ 'mdn', '/DOM/MutationObserver' ]
													]
									}, {
										id: 		'promises',
										name:   	'Promises',
										status:		'experimental',
										value:		2,
										urls:		[
														[ 'mdn', '/Web/JavaScript/Reference/Global_Objects/Promise' ]
													]
									},

									'<strong>Other</strong>',

									{
										id:			'pagevisiblity',
										name: 		'Page Visibility',
										value:		2,
										urls:		[
														[ 'w3c', 'http://www.w3.org/TR/page-visibility/' ],
														[ 'mdn', '/DOM/Using_the_Page_Visibility_API' ]
													]
									}, {
										id:			'getSelection',
										name: 		'Text selection',
										value:		2,
										url:		'http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections'
									}, {
										id:			'scrollIntoView',
										name: 		'Scroll into view',
										value:		1,
										url:		'http://dev.w3.org/csswg/cssom-view/#dom-element-scrollintoview'
									}
								]
					}
				]
	}
]
