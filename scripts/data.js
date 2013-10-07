var tests = [

	{
		id:		'semantics',
		name:	'Semantics',
		column:	'left',
		items:	[
					{
						id:		'parsing',
						name:	'Parsing rules',
						items:	[
									{
										id:		'doctype',
										name: 	'<code>&lt;!DOCTYPE html&gt;</code> triggers standards mode', 
										url:    'http://www.w3.org/TR/html5/syntax.html#the-doctype'
									}, {
										id:		'tokenizer',
										name: 	'HTML5 tokenizer', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/syntax.html#parsing',
													'mdn':	'/HTML/HTML5/HTML5_Parser'
												}
									}, {
										id:		'tree',
										name: 	'HTML5 tree building', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/syntax.html#parsing',
													'mdn':	'/HTML/HTML5/HTML5_Parser'
												}
									}, 
									
									'<em>HTML5 defines rules for embedding SVG and MathML inside a regular HTML document. Support for SVG and MathML is not required though, so no actual points are awarded if your browser supports embedding these two technologies.</em>',
									
									{
										id:		'svg',
										name: 	'SVG in <code>text/html</code>', 
										url2:	{
													'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#svg',
													'mdn':	'/SVG'
												}
												
									}, {
										id:		'mathml',
										name: 	'MathML in <code>text/html</code>', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#mathml',
													'mdn':	'/MathML'
												}
									}
								]
					}, {
						id:		'elements',
						name:	'Elements',
						items:	[
									{
										id:		'dataset',
										name: 	'Embedding custom non-visible data', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes',
													'mdn':	'/DOM/element.dataset'
												}
									}, 
									
									'<strong>New or modified elements</strong>',
									
									{
										id:		'section',
										name:	'Section elements',
										urls:	{
													'mdn':	'/Sections_and_Outlines_of_an_HTML5_document'
												},
										items:	[
													{
														id:		'section',
														name: 	'<code>section</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-section-element'
													}, {
														id:		'nav',
														name: 	'<code>nav</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-nav-element'
													}, {
														id:		'article',
														name: 	'<code>article</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-article-element'
													}, {
														id:		'aside',
														name: 	'<code>aside</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-aside-element'
													}, {
														id:		'header',
														name: 	'<code>header</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-header-element'
													}, {
														id:		'footer',
														name: 	'<code>footer</code> element', 
														url:	'http://www.w3.org/TR/html5/sections.html#the-footer-element'
													}
												]
										
									}, {
										id:		'grouping',
										name:	'Grouping content elements',
										urls:	{
													'mdn':	'/Sections_and_Outlines_of_an_HTML5_document'
												},
										items:	[
													{
														id:		'main',
														name: 	'<code>main</code> element', 
														url:	'http://www.w3.org/html/wg/drafts/html/master/single-page.html#the-main-element'
													}, {
														id:		'figure',
														name: 	'<code>figure</code> element', 
														url:	'http://www.w3.org/TR/html5/grouping-content.html#the-figure-element'
													}, {
														id:		'figcaption',
														name: 	'<code>figcaption</code> element', 
														url:	'http://www.w3.org/TR/html5/grouping-content.html#the-figcaption-element'
													}, {
														id:		'ol',
														name: 	'<code>reversed</code> attribute on the <code>ol</code> element', 
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
														urls:	{ 'whatwg': 'http://developers.whatwg.org/links.html#attr-hyperlink-download' }
													}, {
														id:		'ping',
														name: 	'<code>ping</code> attribute on the <code>a</code> element', 
														urls:	{ 'whatwg': 'http://developers.whatwg.org/links.html#ping' }
													}, {
														id:		'mark',
														name: 	'<code>mark</code> element', 
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-mark-element'
													}, {
														id:		'ruby',
														name: 	'<code>ruby</code>, <code>rt</code> and <code>rp</code> elements', 
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-ruby-element'
													}, {
														id:		'time',
														name: 	'<code>time</code> element', 
														url:	'http://www.w3.org/TR/html5/text-level-semantics.html#the-time-element'
													}, {
														id:		'wbr',
														name: 	'<code>wbr</code> element', 
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
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-details-element'
													}, {
														id:		'summary',
														name: 	'<code>summary</code> element', 
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-summary-element'
													}, {
														id:		'menu',
														name: 	'<code>menu</code> element of type <code>list</code>', 
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-menu-element'
													}, {
														id:		'menutoolbar',
														name: 	'<code>menu</code> element of type <code>toolbar</code>', 
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-menu-element'
													}, {
														id:		'menucontext',
														name: 	'<code>menu</code> element of type <code>context</code>', 
														url:	'http://www.w3.org/TR/html5/interactive-elements.html#the-menu-element'
													}, {
														id:		'dialog',
														name: 	'<code>dialog</code> element', 
														url:	'http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#the-dialog-element'
													}
												]					
									},
									
									'<strong>Global attributes or methods</strong>',
				
									{
										id:		'hidden',
										name: 	'<code>hidden</code> attribute', 
										url:	'http://www.w3.org/TR/html5/editing.html#the-hidden-attribute'
									}, {
										id:		'dynamic',
										name:	'Dynamic markup insertion',
										items:	[
													{
														id:		'outerHTML',
														name: 	'<code>outerHTML</code> property', 
														urls:	{ 'whatwg': 'http://domparsing.spec.whatwg.org/#outerhtml' }
													}, {
														id:		'insertAdjacentHTML',
														name: 	'<code>insertAdjacentHTML</code> function', 
														urls:	{ 'whatwg': 'http://domparsing.spec.whatwg.org/#insertadjacenthtml%28%29' }
													}
												]
									}
								]
					}, {
						id:		'form',
						name:	'Forms',
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
														name: 		'Selection Direction'
													}
												]
									}, {
										id:		'search',
										name:	'<code>input type=search</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support', 
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
														url:		'http://www.w3.org/TR/html5/forms.html#date-state-(type=date)'
													}, {
														id:			'ui',
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
														url:		'http://www.w3.org/TR/html5/forms.html#month-state-(type=month)'
													}, {
														id:			'ui',
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
										id:		'week',
										name:	'<code>input type=week</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support', 
														url:		'http://www.w3.org/TR/html5/forms.html#week-state-(type=week)'
													}, {
														id:			'ui',
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
										id:		'time',
										name:	'<code>input type=time</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support', 
														url:		'http://www.w3.org/TR/html5/forms.html#time-state-(type=time)'
													}, {
														id:			'ui',
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
										id:		'datetime-local',
										name:	'<code>input type=datetime-local</code>',
										items:	[
													{
														id:			'element',
														name: 		'Minimal element support', 
														url:		'http://www.w3.org/TR/html5/forms.html#local-date-and-time-state-(type=datetime-local)'
													}, {
														id:			'ui',
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
														url:		'http://www.w3.org/TR/html5/forms.html#number-state-(type=number)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface'
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
														url:		'http://www.w3.org/TR/html5/forms.html#range-state-(type=range)'
													}, {
														id:			'ui',
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
														url:		'http://www.w3.org/TR/html5/forms.html#color-state-(type=color)'
													}, {
														id:			'ui',
														name: 		'Custom user-interface'
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
														url:		'http://www.w3.org/TR/html5/embedded-content-0.html#attr-dim-width'
													}, {
														id:			'height',
														name: 		'<code>height</code> property', 
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
														url:		'http://www.w3.org/TR/html5/forms.html#attr-textarea-maxlength'
													}, {
														id:			'wrap',
														name:		'<code>wrap</code> attribute',
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
														url:		'http://www.w3.org/TR/html5/forms.html#dom-fieldset-elements'
													}, {
														id:			'disabled',
														name:		'<code>disabled</code> attribute',
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
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-pattern'
													}, {
														id:			'required',
														name: 		'<code>required</code> attribute', 
														url:		'http://www.w3.org/TR/html5/forms.html#attr-input-required'
													}
												]
									}, {
										id:		'association',
										name:	'Association of controls and forms',
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
														url:		'http://www.w3.org/TR/html5/forms.html#dom-form-checkvalidity'
													}, {
														id:			'noValidate',
														name: 		'<code>noValidate</code> attribute', 
														url:		'http://www.w3.org/TR/html5/forms.html#dom-fs-novalidate'
													}
												]
									}
								]
					}, {
						id:		'microdata',
						name:	'Microdata',
						items:	[
									{
										id:			'microdata',
										name: 		'Microdata', 
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
						items:	[
									{
										id:			'geolocation',
										name: 		'Geolocation', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/geolocation-API/',
														'wp': 	'/apis/geolocation',
														'mdn':	'/Using_geolocation'
													}
									}, {
										id:			'orientation',
										name: 		'Device Orientation', 
										urls:		{
														'w3c':	'http://dev.w3.org/geo/api/spec-source-orientation.html',
														'mdn':	'/Mozilla_event_reference/devicemotion'
													}
									}
								]
					}, {
						id:		'output',
						name:	'Output',
						items:	[
									{
										id:			'requestFullScreen',
										name: 		'Full screen support', 
										urls:		{
														'w3c':	'http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api',
														'wp':	'/dom/methods/requestFullscreen',
														'mdn':	'/DOM/Using_fullscreen_mode'
													}
									}, {
										id:			'notifications',
										name: 		'Web Notifications', 
										url:		'http://www.w3.org/TR/notifications/'
									}
								]
					}, {
						id:		'input',
						name:	'Input',
						items:	[
									{
										id:			'getUserMedia',
										name: 		'Access the webcam', 
										urls:		{
														'w3c':	'http://dev.w3.org/2011/webrtc/editor/getusermedia.html',
														'mdn':	'/WebRTC'
													}
									}, {
										id:			'getGamepads',
										name: 		'Gamepad control', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/gamepad/'
													}
									}, {
										id:			'pointerevents',
										name: 		'Pointer Events', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/pointerevents/',
														'wp':	'/concepts/Pointer_Events'
													}
									}, {
										id:			'pointerLock',
										name: 		'Pointer Lock support', 
										urls:		{
														'w3c':	'http://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html',
														'wp':	'/dom/methods/requestPointerLock',
														'mdn':	'/API/Pointer_Lock_API'
													}
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
						items:	[
									{
										id:		'element',
										name: 	'<code>video</code> element', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element',
													'wp': 	'/html/elements/video',
													'mdn':	'/Using_HTML5_audio_and_video'
												}
									}, {
										id:		'drm',
										name: 	'DRM support', 
										url:	'https://dvcs.w3.org/hg/html-media/raw-file/tip/encrypted-media/encrypted-media.html'
									}, {
										id:		'mediasource',
										name: 	'Media Source extensions', 
										url:	'https://dvcs.w3.org/hg/html-media/raw-file/tip/media-source/media-source.html'
									}, {
										id:		'subtitle',
										name: 	'Subtitle support', 
										url:	'http://www.w3.org/TR/html5/embedded-content-0.html#the-track-element'
									}, {
										id:		'poster',
										name: 	'Poster image support', 
										url:	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-video-poster'
									}, {
										id:		'canplaytype',
										name: 	'Codec detection', 
										url:	'http://www.w3.org/TR/html5/embedded-content-0.html#dom-navigator-canplaytype'
									}, 
									
									'<em>The following tests go beyond the requirements of the HTML5 specification and are not counted towards the total score.</em>',
									
									{
										id:		'mpeg4',
										name: 	'MPEG-4 support'
									}, {
										id:		'h264',
										name: 	'H.264 support',
										urls:	{
													'other':	'http://ip.hhi.de/imagecom_G1/assets/pdfs/csvt_overview_0305.pdf'
												}
									}, {
										id:		'theora',
										name: 	'Ogg Theora support',
										urls:	{
													'xiph':		'http://theora.org/doc/Theora.pdf'
												}
									}, {
										id:		'webmvp8',
										name: 	'WebM with VP8 support',
										urls:	{
													'webm':		'http://www.webmproject.org/',
													'ietf':		'http://www.rfc-editor.org/rfc/rfc6386.txt'
												}
									}, {
										id:		'webmvp9',
										name: 	'WebM with VP9 support',
										urls:	{
													'webm':		'http://www.webmproject.org/',
													'ietf':		'http://tools.ietf.org/id/draft-grange-vp9-bitstream-00.txt'
												}
									}
								]
					}, {
						id:		'audio',
						name:	'Audio',
						items:	[
									{
										id:		'element',
										name: 	'<code>audio</code> element', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element',
													'wp': 	'/html/elements/audio',
													'mdn':	'/Using_HTML5_audio_and_video'
												}
									},
									
									{
										id:			'webaudio',
										name: 		'Web Audio API', 
										url:		'https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html'
									},
				
									{
										id:			'speechrecognition',
										name: 		'Speech Recognition', 
										url:		'https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html'
									},
				
									{
										id:			'speechsynthesis',
										name: 		'Speech Synthesis', 
										url:		'https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html'
									},
				
									'<em>The following tests go beyond the requirements of the HTML5 specification and are not counted towards the total score.</em>',
									
									{
										id:		'pcm',
										name: 	'PCM audio support'
									}, { 
										id:		'aac',
										name: 	'AAC support'
									}, { 
										id:		'mp3',
										name: 	'MP3 support'
									}, { 
										id:		'vorbis',
										name: 	'Ogg Vorbis support'
									}, {
										id:		'opus',
										name: 	'Ogg Opus support'
									}, { 
										id:		'webm',
										name: 	'WebM support'
									}
								]	
					}, {
						id:		'webrtc',
						name:	'Peer To Peer',
						items:	[
									{
										id:			'peerconnection',
										name: 		'WebRTC', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/webrtc/',
														'mdn':	'/WebRTC'
													}
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
						id:		'canvas',
						name:	'2D Graphics',
						items:	[
									{
										id:		'context',
										name: 	'Canvas 2D graphics', 
										urls:   {
													'w3c':	'http://www.w3.org/TR/2dcontext/',
													'wp': 	'/canvas',
													'mdn':	'/HTML/Canvas'
												}
									}, 
									
									'<strong>Drawing primitives</strong>',

									{
										id:		'text',
										name: 	'Text support', 
										urls:	{
													'w3c':	'http://www.w3.org/TR/2dcontext/#text'
												}
									}, {
										id:		'path',
										name: 	'Path support', 
										urls:	{
													'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#path-objects'
												}
									}, {
										id:		'ellipse',
										name: 	'Ellipse support', 
										urls:	{
													'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-ellipse'
												}
									}, {
										id:		'dashed',
										name: 	'Dashed line support', 
										urls:	{
													'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-setlinedash'
												}
									}, 
									
									'<strong>Features</strong>',
									
									{
										id:		'hittest',
										name: 	'Hit testing support', 
										urls:	{
													'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-addhitregion'
												}
									}, {
										id:		'hires',
										name: 	'High resolution support', 
										urls:	{
													'whatwg':	'http://developers.whatwg.org/the-canvas-element.html#dom-context-2d-getimagedatahd'
												}
									}, {
										id:		'blending',
										name: 	'Blending modes', 
										urls:	{
													'w3c':	'https://dvcs.w3.org/hg/FXTF/rawfile/tip/compositing/index.html#canvascompositingandblending'
												}
									},

									'<strong>File formats</strong>',

									{
										id:		'png',
										name: 	'PNG support'
									}, {
										id:		'jpeg',
										name: 	'JPEG support'
									}, {
										id:		'webp',
										name: 	'WebP support'
									}
								]
					}, {
						id:		'webgl',
						name:	'3D Graphics',
						items:	[
									{
										id:			'context',
										name: 		'WebGL 3D graphics', 
										urls:		{
														'khronos':	'http://www.khronos.org/registry/webgl/specs/latest/',
														'wp': 		'/webgl',
														'mdn':		'/docs/WebGL'
													}
				
									}, {
										id:			'context2',
										name: 		'WebGL 2 3D graphics', 
										urls:		{
														'khronos':	'http://www.khronos.org/registry/webgl/specs/latest/2.0/',
														'wp': 		'/webgl',
														'mdn':		'/docs/WebGL'
													}
				
									}
								]
					}, {
						id:		'animation',
						name: 	'Animation',
						items:	[
									{
										id:			'requestAnimationFrame',
										name: 		'<code>window.requestAnimationFrame</code>', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/animation-timing/#requestAnimationFrame',
														'wp': 	'/apis/timing/methods/requestAnimationFrame',
														'mdn':	'/DOM/window.requestAnimationFrame'
													}
									}
								]
					}
				]
	},
	
	{
		id:		'connectivity',
		name:	'Connectivity',
		column:	'right',
		items:	[
					{
						id:		'communication',
						name: 	'Communication',
						items:	[
									{
										id:			'eventSource',
										name: 		'Server-Sent Events', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/eventsource/',
														'mdn':	'/Server-sent_events/Using_server-sent_events'
													}
									}, 
									
									'<strong>XMLHttpRequest Level 2</strong>',

									{
										id:			'xmlhttprequest2.upload',
										name: 		'Upload files', 
										url:    	'http://www.w3.org/TR/XMLHttpRequest2/#the-upload-attribute'
									}, {
										id:			'xmlhttprequest2.response',
										name:		'Response type support',
										urls:		{
														'mdn':	'/DOM/XMLHttpRequest'
													},
										items:		[
														{
															id:			'text',
															name: 		'Text response type', 
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'document',
															name: 		'Document response type', 
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'array',
															name: 		'<code>ArrayBuffer</code> response type', 
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}, {
															id:			'blob',
															name: 		'<code>Blob</code> response type', 
															url:    	'http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype'
														}
													]
									}, 
									
									'<strong>WebSocket</strong>',
									
									{
										id:			'websocket.basic',
										name: 		'Basic socket communication', 
										urls:		{
														'w3c':		'http://www.w3.org/TR/websockets/',
														'mdn':		'/docs/WebSockets'
													}
									}, {
										id:			'websocket.binary',
										name: 		'<code>ArrayBuffer</code> and <code>Blob</code> support', 
										urls:		{
														'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/multipage/network.html#dom-websocket-binarytype',
														'mdn':		'/docs/WebSockets'
													}
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
						name: 	'User interaction',
						items:	[
									'<strong>Drag and drop</strong>',
									
									{
										id:		'dragdrop.attributes',
										name:	'Attributes',
										urls:	{
													'mdn':	'/DragDrop/Drag_and_Drop'
												},
										items:	[
													{
														id:			'draggable',
														name: 		'<code>draggable</code> attribute', 
														url:		'http://www.w3.org/TR/html5/editing.html#the-draggable-attribute'
													}, {
														id:			'dropzone',
														name: 		'<code>dropzone</code> attribute', 
														url:		'http://www.w3.org/TR/html5/editing.html#the-dropzone-attribute	'
													}
												]
									}, {
										id:		'dragdrop.events',
										name:	'Events',
										urls:	{
													'mdn':	'/DragDrop/Drag_and_Drop'
												},
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
										urls:	{
													'mdn':	'/HTML/Content_Editable'
												},
										items:	[
													{
														id:			'contentEditable',
														name: 		'<code>contentEditable</code> attribute', 
														url:		'http://www.w3.org/TR/html5/editing.html#contenteditable'
													}, {
														id:			'isContentEditable',
														name: 		'<code>isContentEditable</code> property', 
														url:		'http://www.w3.org/TR/html5/editing.html#contenteditable'
													}
												]
									}, {
										id:		'editing.documents',
										name:	'Editing documents',
										urls:	{
													'mdn':	'/HTML/Content_Editable'
												},
										items:	[
													{
														id:			'designMode',
														name: 		'<code>designMode</code> attribute', 
														url:		'http://www.w3.org/TR/html5/editing.html#designMode'
													}
												]
									}, {
										id:		'editing.selectors',
										name:	'CSS selectors',
										urls:	{
													'mdn':	'/HTML/Content_Editable'
												},
										items:	[
													{
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
										id:		'editing.apis',
										name:	'APIs',
										urls:	{
													'mdn':	'/HTML/Content_Editable'
												},
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
									
									'<strong>Spellcheck</strong>',
									
									{
										id:			'spellcheck',
										name: 		'<code>spellcheck</code> attribute', 
										url:		'http://www.w3.org/TR/html5/editing.html#attr-spellcheck'
									}
								]
					}, {
						id:		'performance',
						name:	'Performance',
						items:	[
									{
										id:			'datatypes',
										name:		'Native binary data',
										items:		[
														{
															id:			'ArrayBuffer',
															name: 		'<code>ArrayBuffer</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#5' }
														}, {
															id:			'Int8Array',
															name: 		'<code>Int8Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Uint8Array',
															name: 		'<code>Uint8Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Int16Array',
															name: 		'<code>Int16Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Uint16Array',
															name: 		'<code>Uint16Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Int32Array',
															name: 		'<code>Int32Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Uint32Array',
															name: 		'<code>Uint32Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Float32Array',
															name: 		'<code>Float32Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'Float64Array',
															name: 		'<code>Float64Array</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#7' }
														}, {
															id:			'DataView',
															name: 		'<code>DataView</code>', 
															urls:    	{ 'khronos': 'http://www.khronos.org/registry/typedarray/specs/latest/#8' }
														}
													]
									},
									
									'<strong>Workers</strong>',

									{
										id:			'worker',
										name: 		'Web Workers', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/workers/#dedicated-workers-and-the-worker-interface',
														'mdn':	'/DOM/Using_web_workers'
													}
									}, {
										id:			'sharedWorker',
										name: 		'Shared Workers', 
										urls:    	{
														'w3c':	'http://www.w3.org/TR/workers/#shared-workers-and-the-sharedworker-interface',
														'mdn':	'/DOM/Using_web_workers'
													}
									}
								]
					}, {
						id:		'security',
						name:	'Security',
						items:	[
									{
										id:			'crypto',
										name: 		'Web Cryptography API', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/WebCryptoAPI/'
													}
									}, {
										id:			'csp',
										name: 		'Content Security Policy', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/CSP/',
														'mdn':	'/Security/CSP'
													}
									}, {
										id:			'cors',
										name: 		'Cross-Origin Resource Sharing', 
										urls:		{
														'mdn':	'/HTTP/Access_control_CORS'
													}
									}, {
										id:			'postMessage',
										name: 		'Cross-document messaging', 
										urls:    	{
														'w3c':	'http://dev.w3.org/html5/postmsg/',
														'wp':	'/apis/web-messaging',
														'mdn':	'/DOM/window.postMessage'
													}
									}, 
															
									'<strong>Iframes</strong>',

									{
										id:			'sandbox',
										name: 		'Sandboxed <code>iframe</code>', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-sandbox',
														'mdn':	'/HTML/Element/iframe'
													}
									}, {
										id:			'seamless',
										name: 		'Seamless <code>iframe</code>', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-seamless',
														'mdn':	'/HTML/Element/iframe'
													}
									}, {
										id:			'srcdoc',
										name: 		'<code>iframe</code> with inline contents', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/embedded-content-0.html#attr-iframe-srcdoc',
														'mdn':	'/HTML/Element/iframe'
													}
									}
								]
					}, {
						id:		'history',
						name: 	'History and navigation',
						items:	[
									{
										id:			'history',
										name: 		'Session history', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/browsers.html#the-history-interface',
														'wp': 	'/dom/history',
														'mdn':	'/DOM/Manipulating_the_browser_history'
													}
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
						items:	[
									{
										id:			'applicationCache',
										name: 		'Application Cache', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/browsers.html#offline',
														'wp': 	'/apis/appcache/ApplicationCache',
														'mdn':	'/HTML/Using_the_application_cache'
													}
									}, {
										id:			'registerProtocolHandler',
										name: 		'Custom scheme handlers', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/webappapis.html#custom-handlers',
														'mdn':	'/docs/Web-based_protocol_handlers'
													}
									}, {
										id:			'registerContentHandler',
										name: 		'Custom content handlers', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/webappapis.html#custom-handlers',
														'mdn':	'/DOM/window.navigator.registerContentHandler'
													}
									}, {
										id:			'addSearchProvider',
										name: 		'Custom search providers', 
										urls:		{
														'whatwg':	'http://www.whatwg.org/specs/web-apps/current-work/#dom-external-addsearchprovider'
													}
									}
								]
					}, {
						id:		'storage',
						name: 	'Storage',
						items:	[
									'<strong>Key-value storage</strong>',

									{
										id:			'sessionStorage',
										name: 		'Session Storage', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute',
														'wp': 	'/apis/web-storage',
														'mdn':	'/DOM/Storage'
													}
									}, {
										id:			'localStorage',
										name: 		'Local Storage', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/webstorage/#the-localstorage-attribute',
														'wp': 	'/apis/web-storage',
														'mdn':	'/DOM/Storage'
													}
									}, 

									'<strong>Database storage</strong>',
									
									{
										id:			'indexedDB.basic',
										name: 		'IndexedDB', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/IndexedDB/',
														'wp': 	'/apis/indexedDB',
														'mdn':	'/IndexedDB'
													}
									}, {
										id:			'indexedDB.blob',
										name: 		'Objectstore <code>Blob</code> support', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/IndexedDB/',
														'wp': 	'/apis/indexedDB',
														'mdn':	'/IndexedDB'
													}
									}, {
										id:			'indexedDB.arraybuffer',
										name: 		'Objectstore <code>ArrayBuffer</code> support', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/IndexedDB/',
														'wp': 	'/apis/indexedDB',
														'mdn':	'/IndexedDB'
													}
									},
									
									'<em>The Web SQL Database specification is no longer being updated and has been replaced by IndexedDB. Because at least 3 vendors have shipped implementations of this specification we still include it in this test.</em>',
								
									{
										id:			'sqlDatabase',
										name: 		'Web SQL Database', 
										url:		'http://www.w3.org/TR/webdatabase/'
									}
								]
					}, {
						id:		'files',
						name:	'Files',
						items:	[
									{
										id:			'fileReader',
										name: 		'File API', 
										urls:		{
														'w3c':	'http://dev.w3.org/2006/webapi/FileAPI/#filereader-interface',
														'wp': 	'/apis/file',
														'mdn':	'/Using_files_from_web_applications'
													}
									}, 
									
									'<em>The Directories and System API proposal has failed to gain traction among browser vendors and is only supported in some Webkit based browsers. No additional points are awarded for supporting this API.</em>',
				
									{
										id:			'fileSystem',
										name: 		'File API: Directories and System', 
										url:    	'http://www.w3.org/TR/file-system-api/'
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
						id:		'other',
						name: 	'Other',
						items:	[
									'<strong>Styling</strong>',
			
									{
										id:			'scoped',
										name: 		'Scoped <code>style</code> element', 
										url:		'http://www.w3.org/TR/html5/document-metadata.html#attr-style-scoped'
									}, 
									
									'<strong>Scripts</strong>',
			
									{
										id:			'async',
										name: 		'Asyncronous script execution', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/scripting-1.html#attr-script-async',
														'mdn':	'/HTML/Element/script'
													}
									}, {
										id:			'onerror',
										name: 		'Runtime script error reporting', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/html5/webappapis.html#report-the-error',
														'mdn':	'/DOM/window.onerror'
													}
									}, {
										id:			'base64',
										name: 		'Base64 encoding and decoding', 
										url:		{
														'w3c':	'http://www.w3.org/TR/html5/webappapis.html#atob',
														'mdn':	'/DOM/window.atob'
													}
									}, {
										id: 		'mutationObserver',
										name:   	'Mutation Observer',
										urls:		{
														'w3c':	'http://www.w3.org/TR/dom/#mutation-observers',
														'mdn':	'/DOM/MutationObserver'
													}
									},
									
									'<strong>Other</strong>',

									{
										id:			'pagevisiblity',
										name: 		'Page Visibility', 
										urls:		{
														'w3c':	'http://www.w3.org/TR/page-visibility/',
														'mdn':	'/DOM/Using_the_Page_Visibility_API'
													}
									}, {
										id:			'getSelection',
										name: 		'Text selection', 
										url:		'http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections'
									}, {
										id:			'scrollIntoView',
										name: 		'Scroll into view'
									}
								]
					}
				]
	}
]
