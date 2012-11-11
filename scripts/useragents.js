var UserAgents = (function(){
	
	var STRINGS_ZTE = 'ZTE',
		STRINGS_TOSHIBA = 'Toshiba',
		STRINGS_TI = 'Texas Instruments',
		STRINGS_SAMSUNG = 'Samsung',
		STRINGS_SHARP = 'Sharp',
		STRINGS_SONY = 'Sony',
		STRINGS_SONY_ERICSSON = 'Sony Ericsson',
		STRINGS_QUALCOMM = 'Qualcomm',
		STRINGS_PANTECH = 'Pantech',
		STRINGS_MOTOROLA = 'Motorola',
		STRINGS_LG = 'LG',
		STRINGS_LENOVO = 'Lenovo',
		STRINGS_HUAWEI = 'Huawei',
		STRINGS_HTC = 'HTC',
		STRINGS_COOLPAD = 'Coolpad',
		STRINGS_BN = 'Barnes & Noble',
		STRINGS_ASUS = 'Asus',
		STRINGS_ARCHOS = 'Archos',
		STRINGS_ALCATEL = 'Alcatel',
		STRINGS_ACER = 'Acer',
		STRINGS_GALAXY = 'Galaxy',
		STRINGS_XPERIA = 'Xperia';

	var STRINGS_BASED = ' based device';
	
	var TYPE_EREADER = 'ereader',
		TYPE_MOBILE = 'mobile',
		TYPE_TABLET = 'tablet',
		TYPE_TELEVISION = 'television';

	var DeviceModels = (function(){
		DeviceModels = {
			identify: function() {
				var type = Array.prototype.shift.call(arguments);
				
				switch(type) {
					case 'android':		return DeviceModels.identifyAndroid.apply(this, arguments);
					case 'blackberry':	return DeviceModels.identifyBlackBerry.apply(this, arguments);
					case 'bada': 		return DeviceModels.identifyList.apply(this, [ BADA_MODELS ].concat(Array.prototype.slice.call(arguments)));
					case 'brew': 		return DeviceModels.identifyList.apply(this, [ BREW_MODELS ].concat(Array.prototype.slice.call(arguments)));
					case 'tizen': 		return DeviceModels.identifyList.apply(this, [ TIZEN_MODELS ].concat(Array.prototype.slice.call(arguments)));
					case 'touchwiz': 	return DeviceModels.identifyList.apply(this, [ TOUCHWIZ_MODELS ].concat(Array.prototype.slice.call(arguments)));
					case 'wm': 			return DeviceModels.identifyList.apply(this, [ WINDOWS_MOBILE_MODELS ].concat(Array.prototype.slice.call(arguments)));
					case 'wp': 			return DeviceModels.identifyList.apply(this, [ WINDOWS_PHONE_MODELS ].concat(Array.prototype.slice.call(arguments)));
				}
			},
			
			identifyList: function(list, model) {
				model = DeviceModels.cleanup(model);
			
				var device = {
					type:			TYPE_MOBILE,
					identified:		false,
					manufacturer:	null,
					model:			model
				};

				for (var m in list) {
					var match = false;
					if (m.substring(m.length - 1) == "!")
						match = model.match(new RegExp('^' + m.substring(0,m.length - 1), 'i'));
					else
						match = m.toLowerCase() == model.toLowerCase();
					
					if (match) {
	 					device.manufacturer = list[m][0];
						device.model = list[m][1];
						if (typeof list[m][2] != 'undefined') device.type = list[m][2];
						device.identified = true;
						
						return device;
					}
				}
				
				return device;
			},
			
			identifyAndroid: function(model) {
				var result = DeviceModels.identifyList(ANDROID_MODELS, model);

				if (!result.identified) {
					model = DeviceModels.cleanup(model);
					if (model.match(/AndroVM/i) || model == 'Emulator' || model == 'x86 Emulator' || model == 'x86 VirtualBox' || model == 'vm') {
						return {
							type:			'emulator',
							identified:		true,
							manufacturer:	null,
							model:			null
						};
					}
				}
				
				return result;
			},
			
			identifyBlackBerry: function(model) {
				if (typeof BLACKBERRY_MODELS[model] != 'undefined') return 'BlackBerry ' + BLACKBERRY_MODELS[model] + ' ' + model;
				return 'BlackBerry ' + model;
			},

			cleanup: function(s) {
				s = typeof s == 'undefined' ? '' : s;
			
				s = s.replace(/\/[^/]+$/, "");
				s = s.replace(/\/[^/]+ Android\/.*/, "");

				s = s.replace(/_TD$/, '');
				s = s.replace(/_CMCC$/, '');
		
				s = s.replace(/_/g, " ");
				s = s.replace(/^\s+|\s+$/g, "");
		
				s = s.replace(/^tita on /, '');
				s = s.replace(/^ICS AOSP on /, '');
				s = s.replace(/^Android (on |for )/, '');
				s = s.replace(/^Full (AOSP on |Android on |Cappuccino on |MIPS Android on |Android)/, '');
		
				s = s.replace(/^Acer ?/i, '');
				s = s.replace(/^Iconia( Tab)? /, '');
				s = s.replace(/^ASUS ?/, '');
				s = s.replace(/^Ainol /, '');
				s = s.replace(/^Coolpad ?/i, 'Coolpad ');
				s = s.replace(/^ALCATEL /, '');
				s = s.replace(/^Alcatel OT-(.*)/, 'one touch $1');
				s = s.replace(/^YL-/, '');
				s = s.replace(/^Novo7 ?/i, 'Novo7 ');
				s = s.replace(/^G[iI]ONEE[ -]/, '');
				s = s.replace(/^HW-/, '');
				s = s.replace(/^Huawei[ -]/i, 'Huawei ');
				s = s.replace(/^SAMSUNG[ -]/i, '');
				s = s.replace(/^(Sony ?Ericsson|Sony)/, '');
				s = s.replace(/^(Lenovo Lenovo|LNV-Lenovo|LENOVO-Lenovo)/, 'Lenovo');
				s = s.replace(/^Lenovo-/, 'Lenovo ');
				s = s.replace(/^ZTE-/, 'ZTE ');
				s = s.replace(/^(LG)[ _\/]/, '$1-');
				s = s.replace(/^(HTC.*)\s(?:v|V)?[0-9.]+$/, '$1');
				s = s.replace(/^(HTC)[-\/]/, '$1 ');
				s = s.replace(/^(HTC)([A-Z][0-9][0-9][0-9])/, '$1 $2');
				s = s.replace(/^(Motorola[\s|-])/, '')
				s = s.replace(/^(Moto|MOT-)/, '')

				s = s.replace(/-?(orange(-ls)?|vodafone|bouygues|parrot|Kust)$/i, '');
				s = s.replace(/http:\/\/.+$/i, '');
				s = s.replace(/^\s+|\s+$/g, "");
		
				return s;
			}			
		};

	
		var ANDROID_MODELS = {
			/* Generic identifiers */
			'Android':									[ null, null ],		
			'google sdk':								[ null, null ],		
			'sdk':										[ null, null ],
			'generic':									[ null, null ],
			'generic x86':								[ null, null ],
			
			/* Development boards and kits */
			'amd brazos':								[ 'AMD', 'Fusion' + STRINGS_BASED ],
			'Amlogic M1 reference board':				[ 'Amlogic', 'M1 reference board' ],
			'AML8726M':									[ 'Amlogic', 'AML8726-M' + STRINGS_BASED ],
			'vexpress a9':								[ 'ARM', 'Versatile Express development platform' ],
			'bcm7231':									[ 'Broadcom', 'BCM7231' + STRINGS_BASED, TYPE_TELEVISION ],
			'bcm7425':									[ 'Broadcom', 'BCM7425' + STRINGS_BASED, TYPE_TELEVISION ],
			'bcm7429':									[ 'Broadcom', 'BCM7429' + STRINGS_BASED, TYPE_TELEVISION ],
			'imx50!':									[ 'Freescale', 'i.MX50' + STRINGS_BASED ],
			'imx51!':									[ 'Freescale', 'i.MX51' + STRINGS_BASED ],
			'imx53!':									[ 'Freescale', 'i.MX53' + STRINGS_BASED ],
			'imx6q!':									[ 'Freescale', 'i.MX6Q' + STRINGS_BASED ],
			'ODROID-A':									[ 'Hardkernel', 'ODROID-A developer tablet', TYPE_TABLET ],
			'mfld (dv10|dv20|lw00|pr2|pr3)!':			[ 'Intel', 'Medfield' + STRINGS_BASED ],
			'berlin bg2':								[ 'Marvell', 'Armada 1000' + STRINGS_BASED, TYPE_TELEVISION ],
			'MStar Amber3':								[ 'MStar', 'Amber3' + STRINGS_BASED ],
			'Konka Amber3':								[ 'MStar', 'Amber3' + STRINGS_BASED ],
			'mt5396':									[ 'Mediatek', 'MT5396' + STRINGS_BASED, TYPE_TELEVISION ],
			'bird75v2':									[ 'Mediatek', 'MT6575' + STRINGS_BASED ],
			'eagle75v1 2':								[ 'Mediatek', 'MT6575' + STRINGS_BASED ],
			'mt6575!':									[ 'Mediatek', 'MT6575' + STRINGS_BASED ],		
			'mt8658':									[ 'Mediatek', 'MT8658' + STRINGS_BASED ],
			'MBX DVBT reference board (c03ref)':		[ 'MXB', 'DVBT reference board', TYPE_TELEVISION ],
			'NS2816':									[ 'Nufront', 'NuSmart 2816' + STRINGS_BASED ],
			'Ventana':									[ 'nVidia', 'Tegra Ventana development kit' ],
			'Cardhu':									[ 'nVidia', 'Tegra 3' + STRINGS_BASED ],
			'Panda(Board)?!':							[ 'Pandaboard', 'Development Kit' ],
			'MSM':										[ STRINGS_QUALCOMM, 'Snapdragon' + STRINGS_BASED ],
			'msm(7227|7627)!':							[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
			'msm7630!':									[ STRINGS_QUALCOMM, 'Snapdragon S2' + STRINGS_BASED ],
			'msm8660!':									[ STRINGS_QUALCOMM, 'Snapdragon S3' + STRINGS_BASED ],
			'msm(8625|8960)!':							[ STRINGS_QUALCOMM, 'Snapdragon S4' + STRINGS_BASED ],
			'msm8974!':									[ STRINGS_QUALCOMM, 'Snapdragon' + STRINGS_BASED ],
			'rk2808(sdk)?!':							[ 'Rockchip', 'RK2808' + STRINGS_BASED ],
			'rk2818(sdk)?!':							[ 'Rockchip', 'RK2818' + STRINGS_BASED ],
			'Android-for-Rockchip-2818':				[ 'Rockchip', 'RK2818' + STRINGS_BASED ],
			'rk29sdk':									[ 'Rockchip', 'RK29' + STRINGS_BASED ],
			'rk30sdk':									[ 'Rockchip', 'RK30' + STRINGS_BASED ],
			's3c6410':									[ STRINGS_SAMSUNG, 'S3C6410' + STRINGS_BASED ],
			'smdk6410':									[ STRINGS_SAMSUNG, 'S3C6410' + STRINGS_BASED ],
			'SMDKC110':									[ STRINGS_SAMSUNG, 'Exynos 3110' + STRINGS_BASED ],
			'SMDKV210':									[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
			'S5PV210':									[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
			'sec smdkc210':								[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
			'SMDK4x12':									[ STRINGS_SAMSUNG, 'Exynos 4212 or 4412' + STRINGS_BASED ],
			'SMDK5250':									[ STRINGS_SAMSUNG, 'Exynos 5250' + STRINGS_BASED ],									
			'smp86xx':									[ 'Sigma', 'SMP86xx' + STRINGS_BASED, TYPE_TELEVISION ],
			'sv8860':									[ 'Skyviia', 'SV8860' + STRINGS_BASED, TYPE_TELEVISION ],
			'ste u8500':								[ 'ST Ericsson', 'Novathor U8500' + STRINGS_BASED ],
			'Telechips M801 Evaluation Board':			[ 'Telechips', 'M801' + STRINGS_BASED, TYPE_TELEVISION ],
			'Telechips TCC8900 Evaluation Board':		[ 'Telechips', 'TCC8900' + STRINGS_BASED, TYPE_TELEVISION ],
			'TCC8920 STB EV':							[ 'Telechips', 'TCC8920' + STRINGS_BASED, TYPE_TELEVISION ],
			'OMAP':										[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
			'OMAP SS':									[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
			'LogicPD Zoom2':							[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
			'omap3evm':									[ STRINGS_TI, 'OMAP3' + STRINGS_BASED ],
			'Omap5sevm':								[ STRINGS_TI, 'OMAP5' + STRINGS_BASED ],
			'pnx8473 kiryung':							[ 'Trident', 'PNX8473' + STRINGS_BASED, TYPE_TELEVISION ],
			
			/* Official Google development devices */
			'Bravo':									[ STRINGS_HTC, 'Desire' ],
			'Dream':									[ STRINGS_HTC, 'Dream' ],
			'Vogue':									[ STRINGS_HTC, 'Touch' ],
			'Vendor Optimus':							[ STRINGS_LG, 'Optimus' ],
			'Stingray':									[ STRINGS_MOTOROLA, 'XOOM', TYPE_TABLET ],
			'Wingray':									[ STRINGS_MOTOROLA, 'XOOM', TYPE_TABLET ],
			'Blaze':									[ STRINGS_TI, 'Blaze Tablet', TYPE_TABLET ],
			'Blaze Tablet':								[ STRINGS_TI, 'Blaze Tablet', TYPE_TABLET ],
			'Google Ion':								[ 'Google', 'Ion' ],


			/* Nexus Devices (without official model no. */
			'Passion':									[ STRINGS_HTC, 'Nexus One' ],
			'(HTC )?Nexus ?One!':						[ STRINGS_HTC, 'Nexus One' ],
			'Crespo!':									[ STRINGS_SAMSUNG, 'Nexus S' ],
			'(Google )?Nexus S!':						[ STRINGS_SAMSUNG, 'Nexus S' ],
			'Dooderbutt!':								[ STRINGS_SAMSUNG, 'Nexus S' ],
			'Maguro':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'Toro-VZW':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'Galaxy Nexus':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'(Google )?Nexus 7!':						[ STRINGS_ASUS, 'Nexus 7', TYPE_TABLET ],
			'Nexus 4':									[ STRINGS_LG, 'Nexus 4' ],
			'manta':									[ STRINGS_SAMSUNG, 'Nexus 10', TYPE_TABLET ],
			'Nexus 10':									[ STRINGS_SAMSUNG, 'Nexus 10', TYPE_TABLET ],

			
			/* Middleware and emulators */
			'BlueStacks':								[ 'BlueStacks', 'App Player', 'desktop' ],
			'youwave custom':							[ 'Youwave', 'Android on PC', 'desktop' ],
			'BlackBerry Runtime for Android Apps':		[ 'RIM', 'BlackBerry (Android Runtime)', TYPE_MOBILE ],
			
			/* Regular devices */
			'A100':										[ STRINGS_ACER, 'Iconia Tab A100', TYPE_TABLET ],
			'A101':										[ STRINGS_ACER, 'Iconia Tab A101', TYPE_TABLET ],
			'A110':										[ STRINGS_ACER, 'Iconia Tab A110', TYPE_TABLET ],
			'A200':										[ STRINGS_ACER, 'Iconia Tab A200', TYPE_TABLET ],
			'A211':										[ STRINGS_ACER, 'Iconia Tab A211', TYPE_TABLET ],
			'A500':										[ STRINGS_ACER, 'Iconia Tab A500', TYPE_TABLET ],
			'A501':										[ STRINGS_ACER, 'Iconia Tab A501', TYPE_TABLET ],
			'A510':										[ STRINGS_ACER, 'Iconia Tab A510', TYPE_TABLET ],
			'A511':										[ STRINGS_ACER, 'Iconia Tab A511', TYPE_TABLET ],
			'A700':										[ STRINGS_ACER, 'Iconia Tab A700', TYPE_TABLET ],
			'P2A700':									[ STRINGS_ACER, 'Iconia Tab A700', TYPE_TABLET ],
			'A701':										[ STRINGS_ACER, 'Iconia Tab A701', TYPE_TABLET ],
			'A800':										[ STRINGS_ACER, 'Iconia Tab A800', TYPE_TABLET ],
			'E110':										[ STRINGS_ACER, 'beTouch E110' ],
			'E120':										[ STRINGS_ACER, 'beTouch E120' ],
			'E130':										[ STRINGS_ACER, 'beTouch E130' ],
			'E140':										[ STRINGS_ACER, 'beTouch E140' ],
			'E210':										[ STRINGS_ACER, 'beTouch E210' ],
			'E310':										[ STRINGS_ACER, 'Liquid mini' ],
			'E320':										[ STRINGS_ACER, 'Liquid Express' ],
			'E330':										[ STRINGS_ACER, 'Liquid Glow' ],
			'E350':										[ STRINGS_ACER, 'Liquid Gallant' ],
			'E400':										[ STRINGS_ACER, 'beTouch E400' ],
			'G100W':									[ STRINGS_ACER, 'G100W' ],
			'S100':										[ STRINGS_ACER, 'Liquid' ],
			'S110':										[ STRINGS_ACER, 'Stream' ],
			'S120':										[ STRINGS_ACER, 'Liquid mt' ],
			'S300':										[ STRINGS_ACER, 'Iconia Smart' ],
			'S500':										[ STRINGS_ACER, 'CloudMobile' ],
			'TD600':									[ STRINGS_ACER, 'beTouch TD600' ],
			'Liquid':									[ STRINGS_ACER, 'Liquid' ],
			'Liquid E':									[ STRINGS_ACER, 'Liquid E' ],
			'Liquid MT':								[ STRINGS_ACER, 'Liquid mt' ],
			'Liquid Metal':								[ STRINGS_ACER, 'Liquid mt' ],
			'Stream':									[ STRINGS_ACER, 'Stream' ],
			'N700':										[ 'aigo', 'N700', TYPE_TABLET ],
			'M801':										[ 'aigo', 'M801', TYPE_TABLET ],
			'Novo7':									[ 'Ainovo', 'Novo7', TYPE_TABLET ],
			'Novo7 Aurora':								[ 'Ainovo', 'Novo7 Aurora', TYPE_TABLET ],
			'Novo7 Advanced':							[ 'Ainovo', 'Novo7 Advanced', TYPE_TABLET ],
			'Novo7 Advanced2':							[ 'Ainovo', 'Novo7 Advanced 2', TYPE_TABLET ],
			'Novo7 Basic':								[ 'Ainovo', 'Novo7 Basic', TYPE_TABLET ],
			'Novo7 ELF':								[ 'Ainovo', 'Novo7 Elf', TYPE_TABLET ],
			'Novo7 Fire':								[ 'Ainovo', 'Novo7 Fire', TYPE_TABLET ],
			'Novo7 Flame':								[ 'Ainovo', 'Novo7 Flame', TYPE_TABLET ],
			'Novo7 PALADIN':							[ 'Ainovo', 'Novo7 Paladin', TYPE_TABLET ],
			'Novo8 Advanced':							[ 'Ainovo', 'Novo8 Advanced', TYPE_TABLET ],
			'one touch 890!':							[ STRINGS_ALCATEL, 'One Touch 890' ],
			'one touch 891!':							[ STRINGS_ALCATEL, 'One Touch 891' ],
			'one touch 903!':							[ STRINGS_ALCATEL, 'One Touch 903' ],
			'one touch 906!':							[ STRINGS_ALCATEL, 'One Touch 906' ],
			'one touch 908!':							[ STRINGS_ALCATEL, 'One Touch 908' ],
			'one touch 910!':							[ STRINGS_ALCATEL, 'One Touch 910' ],
			'one touch 918!':							[ STRINGS_ALCATEL, 'One Touch 918' ],
			'one touch 980!':							[ STRINGS_ALCATEL, 'One Touch 980' ],
			'one touch 981!':							[ STRINGS_ALCATEL, 'One Touch 981' ],
			'one touch 986!':							[ STRINGS_ALCATEL, 'One Touch 986' ],
			'one touch 990!':							[ STRINGS_ALCATEL, 'One Touch 990' ],
			'one touch 991!':							[ STRINGS_ALCATEL, 'One Touch 991' ],
			'one touch 993!':							[ STRINGS_ALCATEL, 'One Touch 993' ],
			'one touch 995!':							[ STRINGS_ALCATEL, 'One Touch 995' ],
			'one touch 997!':							[ STRINGS_ALCATEL, 'One Touch 997' ],
			'Telenor OneTouch':							[ STRINGS_ALCATEL, 'One Touch 990' ],
			'OT 918':									[ STRINGS_ALCATEL, 'One Touch 918' ],
			'Venture':									[ STRINGS_ALCATEL, 'Venture' ],
			'Allwinner A10':							[ 'AllWinner', 'A10', TYPE_TABLET ],
			'97FC':										[ 'AllWinner', 'A10 97FC', TYPE_TABLET ],
			'(Amazon )?Kindle Fire!':					[ 'Amazon', 'Kindle Fire', TYPE_TABLET ],
			'KFOT':										[ 'Amazon', 'Kindle Fire', TYPE_TABLET ],	
			'KFTT':										[ 'Amazon', 'Kindle Fire HD 7"', TYPE_TABLET ],
			'KFJW(I|A)!':								[ 'Amazon', 'Kindle Fire HD 8.9"', TYPE_TABLET ],
			'AMOI N89':									[ 'Amoi', 'N89' ],
			'AMOI N820':								[ 'Amoi', 'N820' ],
			'AMOI N821':								[ 'Amoi', 'N821' ],
			'AMD120':									[ 'AnyDATA', 'AnyTAB AMD120', TYPE_TABLET ],
			'MW0811':									[ 'AOC', 'Breeze MW0811', TYPE_TABLET ],
			'MW0821 V2.0':								[ 'AOC', 'Breeze MW0821', TYPE_TABLET ],
			'MW0922':									[ 'AOC', 'Breeze MW0922', TYPE_TABLET ],
			'Apanda.A60!':								[ 'Apanda', 'A60' ],
			'apanda-A80S':								[ 'Apanda', 'A80' ],
			'A80KSC':									[ STRINGS_ARCHOS, 'Arnova 8', TYPE_TABLET ],
			'AN7CG2':									[ STRINGS_ARCHOS, 'Arnova 7', TYPE_TABLET ],
			'A101B':									[ STRINGS_ARCHOS, 'Arnova 10', TYPE_TABLET ],
			'AN10BG2DT':								[ STRINGS_ARCHOS, 'Arnova 10 B', TYPE_TABLET ],
			'AN10G2':									[ STRINGS_ARCHOS, 'Arnova 10 G2', TYPE_TABLET ],
			'A32':										[ STRINGS_ARCHOS, '32', 'media' ],
			'A35DE':									[ STRINGS_ARCHOS, '35 Smart Home Phone' ],
			'A43':										[ STRINGS_ARCHOS, '43', 'media' ],
			'Archos5':									[ STRINGS_ARCHOS, '5', 'media' ],
			'A70H':										[ STRINGS_ARCHOS, '7 Home Tablet', TYPE_TABLET ],					// G7
			'A70HB':									[ STRINGS_ARCHOS, '7 Home Tablet', TYPE_TABLET ],
			'A70BHT':									[ STRINGS_ARCHOS, '7 Home Tablet', TYPE_TABLET ],
			'A70CHT':									[ STRINGS_ARCHOS, '7 Home Tablet', TYPE_TABLET ],
			'A70S':										[ STRINGS_ARCHOS, '70 Internet Tablet', TYPE_TABLET ],				// G8
			'A7EB':										[ STRINGS_ARCHOS, '70B Internet Tablet', TYPE_TABLET ],
			'ARCHOS 70it2':								[ STRINGS_ARCHOS, '70B Internet Tablet', TYPE_TABLET ],		
			'A101IT':									[ STRINGS_ARCHOS, '101 Internet Tablet', TYPE_TABLET ],		
			'ARCHOS 80G9':								[ STRINGS_ARCHOS, '80 G9', TYPE_TABLET ],							// G9
			'ARCHOS 101G9':								[ STRINGS_ARCHOS, '101 G9', TYPE_TABLET ],						
			'ARCHOS 97XSLG10':							[ STRINGS_ARCHOS, '97 XS', TYPE_TABLET ],							// G10
			'ARCHOS 101G10':							[ STRINGS_ARCHOS, '101 XS', TYPE_TABLET ],
			'ARCHOS 97 CARBON':							[ STRINGS_ARCHOS, '97 Carbon', TYPE_TABLET ],						// Elements
			'ASTRI':									[ 'ASTRI', 'e-reader', TYPE_EREADER ],
			'eeepc':									[ STRINGS_ASUS, 'Eee Pc' ],
			'asus laptop':								[ STRINGS_ASUS, 'Eee Pc' ],
			'ME171':									[ STRINGS_ASUS, 'Eee Pad MeMO', TYPE_TABLET ],
			'Slider SL101':								[ STRINGS_ASUS, 'Eee Pad Slider', TYPE_TABLET ],
			'EPAD':										[ STRINGS_ASUS, 'Eee Pad Transformer', TYPE_TABLET ],
			'TF101':									[ STRINGS_ASUS, 'Eee Pad Transformer', TYPE_TABLET ],
			'Transformer TF101(G)?!':					[ STRINGS_ASUS, 'Eee Pad Transformer', TYPE_TABLET ],
			'TF201':									[ STRINGS_ASUS, 'Eee Pad Transformer Prime', TYPE_TABLET ],
			'Transformer Prime TF201':					[ STRINGS_ASUS, 'Eee Pad Transformer Prime', TYPE_TABLET ],
			'Transformer Prime':						[ STRINGS_ASUS, 'Eee Pad Transformer Prime', TYPE_TABLET ],
			'Transformer (Pad )?TF300(T|TG|TL)!':		[ STRINGS_ASUS, 'Transformer Pad 300', TYPE_TABLET ],
			'Transformer (Pad )?TF700(T|K)!':			[ STRINGS_ASUS, 'Transformer Pad Infinity 700', TYPE_TABLET ],
			'PadFone':									[ STRINGS_ASUS, 'Padfone', TYPE_TABLET ],
			'PadFone 2':								[ STRINGS_ASUS, 'Padfone 2', TYPE_TABLET ],
			'OMS TTD':									[ STRINGS_ASUS, 'Eee Pc T10' ],
			'ASUS T20':									[ STRINGS_ASUS, 'Eee Pc T20' ],
			'ETBW11AA':									[ STRINGS_ASUS, 'Tough' ],
			'AUX V900':									[ 'AUX', 'V900' ],
			'PICOpad-QGN':								[ 'Axioo', 'Picopad QGN', TYPE_TABLET ],
			'NOOK':										[ STRINGS_BN, 'NOOK', TYPE_EREADER ],
			'Nook ?Color!':								[ STRINGS_BN, 'NOOK Color', TYPE_EREADER ],
			'(NOOK )?BNRV(200|300)!':					[ STRINGS_BN, 'NOOK Color', TYPE_EREADER ],
			'Nook ?Tablet!':							[ STRINGS_BN, 'NOOK Tablet', TYPE_EREADER ],
			'(NOOK )?BNTV250!':							[ STRINGS_BN, 'NOOK Tablet', TYPE_EREADER ],
			'NOOK Slate':								[ STRINGS_BN, 'NOOK Tablet', TYPE_EREADER ],
			'Barnes & Noble Nook Tablet':				[ STRINGS_BN, 'NOOK Tablet', TYPE_EREADER ],
			'(NOOK )?BNTV(400)!':						[ STRINGS_BN, 'NOOK HD Tablet', TYPE_EREADER ],
			'(NOOK )?BNTV(600)!':						[ STRINGS_BN, 'NOOK HD+ Tablet', TYPE_EREADER ],
			'BenWee 5100':								[ 'BenWee', '5100' ],
			'CA907AAC0G':								[ 'Besta', 'CA907AAC0G' ],
			'BM999':									[ 'Bmorn', 'BM999', TYPE_TABLET ],
			'V11':										[ 'Bmorn', 'V11', TYPE_TABLET ],
			'V99':										[ 'Bmorn', 'V99', TYPE_TABLET ],
			'bq DaVinci':								[ 'bq', 'DaVinci', TYPE_TABLET ],
			'CT704':									[ 'Carrefour', 'CT704', TYPE_TABLET ],
			'CT1002':									[ 'Carrefour', 'CT1002', TYPE_TABLET ],
			'Camangi-Mangrove7':						[ 'Camangi', 'Mangrove 7', TYPE_TABLET ],
			'WS171':									[ 'Camangi', 'WebStation', TYPE_TABLET ],
			'IS11CA':									[ 'Casio', 'GzOne IS11CA' ],
			'C771':										[ 'Casio', 'GzOne Commando' ],
			'CAT NOVA':									[ 'Cat', 'NOVA', TYPE_TABLET ],
			'ChangHong-Z-ME':							[ 'ChangHong', 'Z-me' ],
			'ARMM3V':									[ 'chinaleap', 'ARMM3V', TYPE_TABLET ],
			'CIUS-7!':									[ 'Cisco', 'Cius', TYPE_TABLET ],
			'CSL Spice MI300':							[ 'CSL', 'Spice MI300' ],
			'CSL-MI410':								[ 'CSL', 'Spice MI410' ],
			'MID1024':									[ 'Coby', 'Kyros MID1024', TYPE_TABLET ],
			'MID1125':									[ 'Coby', 'Kyros MID1125', TYPE_TABLET ],
			'MID1126':									[ 'Coby', 'Kyros MID1126', TYPE_TABLET ],
			'MID7010':									[ 'Coby', 'Kyros MID7010', TYPE_TABLET ],
			'MID7012':									[ 'Coby', 'Kyros MID7012', TYPE_TABLET ],
			'MID7015!':									[ 'Coby', 'Kyros MID7015', TYPE_TABLET ],
			'MID7016':									[ 'Coby', 'Kyros MID7016', TYPE_TABLET ],
			'MID7020':									[ 'Coby', 'Kyros MID7020', TYPE_TABLET ],
			'MID7022':									[ 'Coby', 'Kyros MID7022', TYPE_TABLET ],
			'MID7024':									[ 'Coby', 'Kyros MID7024', TYPE_TABLET ],
			'MID7025':									[ 'Coby', 'Kyros MID7025', TYPE_TABLET ],
			'MID7035':									[ 'Coby', 'Kyros MID7035', TYPE_TABLET ],
			'MID7127':									[ 'Coby', 'Kyros MID7127', TYPE_TABLET ],
			'MID8024':									[ 'Coby', 'Kyros MID8024', TYPE_TABLET ],
			'MID8125':									[ 'Coby', 'Kyros MID8125', TYPE_TABLET ],
			'MID8127':									[ 'Coby', 'Kyros MID8127', TYPE_TABLET ],
			'Z71':										[ 'Commtiva', 'Z71' ],
			'V-T100':									[ 'Commtiva', 'V-T100' ],
			'FIH-FB0':									[ 'Commtiva', 'HD700'],
			'Coolpad D510':								[ STRINGS_COOLPAD, 'D510' ],
			'D530':										[ STRINGS_COOLPAD, 'D530' ],
			'Coolpad D530':								[ STRINGS_COOLPAD, 'D530' ],
			'D539':										[ STRINGS_COOLPAD, 'D539' ],
			'Coolpad D539':								[ STRINGS_COOLPAD, 'D539' ],
			'E239':										[ STRINGS_COOLPAD, 'E239' ],
			'Coolpad E239':								[ STRINGS_COOLPAD, 'E239' ],
			'Coolpad N930':								[ STRINGS_COOLPAD, 'N930' ],
			'N930':										[ STRINGS_COOLPAD, 'N930' ],
			'Coolpad W706!':							[ STRINGS_COOLPAD, 'W706' ],
			'Coolpad W708':								[ STRINGS_COOLPAD, 'W708' ],
			'W711':										[ STRINGS_COOLPAD, 'W711' ],
			'Coolpad 5210':								[ STRINGS_COOLPAD, '5210' ],
			'Coolpad 5820':								[ STRINGS_COOLPAD, '5820' ],
			'5832':										[ STRINGS_COOLPAD, '5832' ],
			'Coolpad 5832':								[ STRINGS_COOLPAD, '5832' ],
			'5855':										[ STRINGS_COOLPAD, '5855' ],
			'Coolpad 5860!':							[ STRINGS_COOLPAD, '5860' ],
			'5860':										[ STRINGS_COOLPAD, '5860' ],
			'Coolpad 5870':								[ STRINGS_COOLPAD, '5870' ],
			'Coolpad 7005':								[ STRINGS_COOLPAD, '7005' ],
			'Coolpad 7019!':							[ STRINGS_COOLPAD, '7019' ],
			'Coolpad 7230':								[ STRINGS_COOLPAD, '7230' ],
			'7260':										[ STRINGS_COOLPAD, '7260' ],
			'Coolpad 7260!':							[ STRINGS_COOLPAD, '7260' ],
			'Coolpad 8013':								[ STRINGS_COOLPAD, '8013' ],
			'Coolpad 8026':								[ STRINGS_COOLPAD, '8026' ],
			'Coolpad 8809':								[ STRINGS_COOLPAD, '8809' ],
			'Coolpad 8810':								[ STRINGS_COOLPAD, '8810' ],
			'8810':										[ STRINGS_COOLPAD, '8810' ],
			'Coolpad 8811':								[ STRINGS_COOLPAD, '8811' ],
			'Coolpad 9900':								[ STRINGS_COOLPAD, '9900' ],
			'Coolpad 9960':								[ STRINGS_COOLPAD, '9960' ],
			'ZiiO7':									[ 'Creative', 'ZiiO 7', TYPE_TABLET ],
			'ZiiLABS ZiiO7':							[ 'Creative', 'ZiiO 7', TYPE_TABLET ],
			'ZiiLABS ZiiO10 ':							[ 'Creative', 'ZiiO 10', TYPE_TABLET ],
			'CUBE K8GT A':								[ 'Cube', 'K8GT A', TYPE_TABLET ],
			'CUBE K8GT B':								[ 'Cube', 'K8GT B', TYPE_TABLET ],
			'K8GT C':									[ 'Cube', 'K8GT C', TYPE_TABLET ],
			'K8GT H':									[ 'Cube', 'K8GT H', TYPE_TABLET ],
			'CUBE K8GT H':								[ 'Cube', 'K8GT H', TYPE_TABLET ],
			'K8GT W':									[ 'Cube', 'K8GT W', TYPE_TABLET ],
			'CUBE U8GT':								[ 'Cube', 'U8GT', TYPE_TABLET ],
			'CUBE U9GT':								[ 'Cube', 'U9GT', TYPE_TABLET ],
			'CUBE U9GT ?2!':							[ 'Cube', 'U9GT 2', TYPE_TABLET ],
			'U9GT':										[ 'Cube', 'U9GT', TYPE_TABLET ],
			'U9GT2!':									[ 'Cube', 'U9GT 2', TYPE_TABLET ],
			'N90 From moage.com':						[ 'Cube', 'U9GT 2', TYPE_TABLET ],
			'U9GT S':									[ 'Cube', 'U9GT S', TYPE_TABLET ],
			'U9GT S A':									[ 'Cube', 'U9GT SA', TYPE_TABLET ],
			'U9GTS A':									[ 'Cube', 'U9GT SA', TYPE_TABLET ],
			'U10GT 2':									[ 'Cube', 'U10GT 2', TYPE_TABLET ],
			'U10GT S':									[ 'Cube', 'U10GT S', TYPE_TABLET ],
			'CUBE U15GT':								[ 'Cube', 'U15GT', TYPE_TABLET ],
			'U30GT-H':									[ 'Cube', 'U30GT H', TYPE_TABLET ],
			'U30GT-M':									[ 'Cube', 'U30GT M', TYPE_TABLET ],
			'CUBE Q7PRO':								[ 'Cube', 'Q7 Pro', TYPE_TABLET ],
			'CUBE Q7PRO J':								[ 'Cube', 'Q7 Pro', TYPE_TABLET ],
			'Cydle M7!':								[ 'Cydle', 'M7 MultiPAD', TYPE_TABLET ],
			'Dell Aero':								[ 'Dell', 'Aero' ],
			'Dell M01M':								[ 'Dell', 'Mini 5', TYPE_TABLET ],
			'Dell Streak':								[ 'Dell', 'Streak', TYPE_TABLET ],
			'001DL':									[ 'Dell', 'Streak', TYPE_TABLET ],
			'101DL':									[ 'Dell', 'Streak Pro', TYPE_TABLET ],
			'GS01':										[ 'Dell', 'Streak Pro', TYPE_TABLET ],
			'Dell Streak Pro':							[ 'Dell', 'Streak Pro', TYPE_TABLET ],
			'streak7':									[ 'Dell', 'Streak 7', TYPE_TABLET ],
			'Dell Streak 7':							[ 'Dell', 'Streak 7', TYPE_TABLET ],
			'Dell Streak 10 Pro':						[ 'Dell', 'Streak 10 Pro', TYPE_TABLET ],
			'Dell V04B':								[ 'Dell', 'Streak V04B', TYPE_TABLET ],
			'Dell Venue':								[ 'Dell', 'Venue' ],
			'Dell XCD35':								[ 'Dell', 'XCD35' ],
			'XCD35':									[ 'Dell', 'XCD35' ],
			'iDx7':										[ 'Digma', 'iDx7', TYPE_TABLET ],
			'iDx10!':									[ 'Digma', 'iDx10', TYPE_TABLET ],
			'DM009SH':									[ 'Disney Mobile', 'DM009SH' ],
			'DM010SH':									[ 'Disney Mobile', 'DM010SH' ],
			'DM012SH':									[ 'Disney Mobile', 'DM012SH' ],
			'F-08D':									[ 'Disney Mobile', 'F-08D' ],
			'P-05D':									[ 'Disney Mobile', 'P-05D' ],
			'Tablet-P27':								[ 'DracoTek', 'P27 Tablet', TYPE_TABLET ],
			'edgejr':									[ 'EnTourage', 'Pocket eDGe', TYPE_TABLET ],
			'l97D':										[ 'EPad', 'l97D', TYPE_TABLET ],
			'M4301':									[ 'Eston', 'MID M4301', 'media' ],
			'P10AN':									[ 'Exper', 'Easypad P10AN', TYPE_TABLET ],
			'FIH-F0X':									[ 'FIH', 'F0X' ],
			'Fly IQ245':								[ 'Fly', 'IQ245 Wizard' ],
			'Fly IQ260':								[ 'Fly', 'IQ260 BlackBird' ],
			'Fly IQ441':								[ 'Fly', 'IQ441 Radiance' ],
			'ISW11F':									[ 'Fujitsu', 'Arrows Z' ],
			'ISW13F':									[ 'Fujitsu', 'Arrows Z' ],
			'IS12F':									[ 'Fujitsu', 'Arrows ES' ],
			'F-01D':									[ 'Fujitsu', 'Arrows Tab LTE', TYPE_TABLET ],
			'F-03D':									[ 'Fujitsu', 'Arrows Kiss' ],
			'F-05D':									[ 'Fujitsu', 'Arrows X LTE' ],
			'F-07D':									[ 'Fujitsu', 'Arrows μ' ],
			'F-10D':									[ 'Fujitsu', 'Arrows X F-10D' ],
			'F-12C':									[ 'Fujitsu', 'Globetrotter' ],
			'f12arc':									[ 'Fujitsu', 'F12arc' ],
			'M532':										[ 'Fujitsu', 'Stylistic M532', TYPE_TABLET ],
			'Garminfone':								[ 'Garmin-Asus', 'Garminfone' ],
			'Garmin-Asus A10':							[ 'Garmin-Asus', 'Nuvifone A10' ],
			'Garmin-Asus A50':							[ 'Garmin-Asus', 'Nuvifone A50' ],
			'TPA60W':									[ 'Gateway', 'TPA60W', TYPE_TABLET ],
			'Geeksphone ZERO':							[ 'Geeksphone', 'ZERO'],
			'Gemei G2':									[ 'Gemei', 'G2', TYPE_TABLET ],
			'Gemei G3':									[ 'Gemei', 'G3', TYPE_TABLET ],
			'Gemei G9':									[ 'Gemei', 'G9', TYPE_TABLET ],
			'GSmart G1317D':							[ 'Gigabyte', 'GSmart G1317D' ],
			'GSmart G1342':								[ 'Gigabyte', 'GSmart G1342' ],
			'GSmart G1345':								[ 'Gigabyte', 'GSmart G1345' ],
			'Gigabyte TB100':							[ 'Gigabyte', 'TB100', TYPE_TABLET ],
			'GIO-GiONEE C500':							[ 'Gionee', 'C500' ],
			'GIO-GiONEE C600':							[ 'Gionee', 'C600' ],
			'GN100':									[ 'Gionee', 'GN100' ],		
			'GN105':									[ 'Gionee', 'GN105' ],		
			'GN109':									[ 'Gionee', 'GN109' ],
			'GN180':									[ 'Gionee', 'GN180' ],
			'GN200':									[ 'Gionee', 'GN200' ],		
			'GN205':									[ 'Gionee', 'GN205' ],
			'GN305':									[ 'Gionee', 'GN305' ],
			'GN360':									[ 'Gionee', 'GN360' ],
			'GN700T':									[ 'Gionee', 'GN700T' ],
			'GN858':									[ 'Gionee', 'GN858' ],
			'Haier-HT-I617':							[ 'Haier', 'HT-I617' ],
			'Haier HW-W910':							[ 'Haier', 'HW-W910' ],
			'X720D':									[ 'Haipai', 'X720D' ],
			'SN10T1':									[ 'HANNspree', 'HANNSpad SN10T1', TYPE_TABLET ],
			'SN10T2':									[ 'HANNspree', 'HANNSpad SN10T2', TYPE_TABLET ],
			'HannsComb':								[ 'HANNspree', 'HANNSpad', TYPE_TABLET ],
			'X1':										[ 'HCL', 'ME X1', TYPE_TABLET ],
			'MID Ser(ai|ia)ls!':						[ 'Herotab', 'C8', TYPE_TABLET ],
			'HS-9DTB4':									[ 'Hipstreet', '9" Flare tablet', TYPE_TABLET ],
			'COSMO DUO':								[ 'Hiscreen', 'Cosmo DUO', TYPE_TABLET ],
			'HS-U8':									[ 'Hisense', 'U8' ],
			'HS-U950':									[ 'Hisense', 'U950' ],
			'HS-T92':									[ 'Hisense', 'T92' ],
			'HS-T96':									[ 'Hisense', 'T96' ],
			'HS-T909':									[ 'Hisense', 'T909' ],
			'HS-E860':									[ 'Hisense', 'E860' ],
			'E860':										[ 'Hisense', 'E860' ],
			'HS-E910':									[ 'Hisense', 'E910' ],
			'HS-E920':									[ 'Hisense', 'E920' ],
			'HS-EG900':									[ 'Hisense', 'EG900' ],
			'HS-EG906':									[ 'Hisense', 'EG906' ],
			'HS-ET919':									[ 'Hisense', 'ET919' ],
			'EG968B':									[ 'Hisense', 'EG968B' ],
			'HKPHONE H8-3G':							[ 'HKPhone', 'H8 3G' ],
			'HOSIN U2':									[ 'Hosin', 'U2' ],
			'(HP )?Touchpad!':							[ 'HP', 'TouchPad', TYPE_TABLET ],
			'(cm|aokp) tenderloin!':					[ 'HP', 'TouchPad', TYPE_TABLET ],
			'Amaze 4G':									[ STRINGS_HTC, 'Amaze 4G' ],
			'HTC (Amaze|Ruby)!':						[ STRINGS_HTC, 'Amaze 4G' ],
			'HTC (Aria|Liberty)!':						[ STRINGS_HTC, 'Aria' ],
			'HTC A63(66|80)!':							[ STRINGS_HTC, 'Aria' ],
			'HTC Bee':									[ STRINGS_HTC, 'Bee' ],
			'HTC ChaCha!':								[ STRINGS_HTC, 'ChaCha' ],
			'HTC A810e':								[ STRINGS_HTC, 'ChaCha' ],
			'HTC A9188!':								[ STRINGS_HTC, 'Cullinan' ],
			'HTC Desire C':								[ STRINGS_HTC, 'Desire C' ],
			'HTC Desire ?HD!':							[ STRINGS_HTC, 'Desire HD' ],
			'HTC A91(91|92)!':							[ STRINGS_HTC, 'Desire HD' ],
			'HTC Desire ?S( |$)!':						[ STRINGS_HTC, 'Desire S' ],
			'HTC S510(b|e)!':							[ STRINGS_HTC, 'Desire S' ],
			'HTC Desire Saga':							[ STRINGS_HTC, 'Desire S' ],
			'HTC Saga':									[ STRINGS_HTC, 'Desire S' ],
			'HTC Desire V':								[ STRINGS_HTC, 'Desire V' ],
			'HTC T328w':								[ STRINGS_HTC, 'Desire V' ],
			'HTC Desire VC':							[ STRINGS_HTC, 'Desire VC' ],
			'HTC T328d':								[ STRINGS_HTC, 'Desire VC' ],
			'HTC Desire VT':							[ STRINGS_HTC, 'Desire VT' ],
			'HTC T328t':								[ STRINGS_HTC, 'Desire VT' ],
			'HTC Desire ?Z!':							[ STRINGS_HTC, 'Desire Z' ],
			'HTC Vision':								[ STRINGS_HTC, 'Desire Z' ],
			'HTC A72(71|72)!':							[ STRINGS_HTC, 'Desire Z' ],
			'HTC Desire!':								[ STRINGS_HTC, 'Desire' ],
			'HTC Bravo':								[ STRINGS_HTC, 'Desire' ],
			'HTC A81(81|83)!':							[ STRINGS_HTC, 'Desire' ],
			'HTC ?X06HT!':								[ STRINGS_HTC, 'Desire' ],
			'HTC Dream':								[ STRINGS_HTC, 'Dream' ],
			'HTC Droid Incredible':						[ STRINGS_HTC, 'Droid Incredible' ],
			'HTC S710d':								[ STRINGS_HTC, 'Droid Incredible 2' ],
			'HTC Incredible 2':							[ STRINGS_HTC, 'Droid Incredible 2' ],
			'HTC EVO ?3D!':								[ STRINGS_HTC, 'EVO 3D' ],
			'HTC X51(5a|5c|5d|5m)!':					[ STRINGS_HTC, 'EVO 3D' ],
			'HTC EVO 4G\+!':							[ STRINGS_HTC, 'EVO 4G+' ],
			'HTC X515e':								[ STRINGS_HTC, 'EVO 4G+' ],
			'HTC EVO ?4G!':								[ STRINGS_HTC, 'EVO 4G' ],
			'HTC ?(EVO ?)?Design ?4G!':					[ STRINGS_HTC, 'EVO Design 4G' ],		
			'HTC C715c':								[ STRINGS_HTC, 'EVO Design 4G' ],
			'HTC EVO Shift!':							[ STRINGS_HTC, 'EVO Shift' ],
			'HTC Explorer!':							[ STRINGS_HTC, 'Explorer' ],
			'HTC A31(0b|0e)!':							[ STRINGS_HTC, 'Explorer' ],
			'HTC Flyer!':								[ STRINGS_HTC, 'Flyer', TYPE_TABLET ],
			'HTC P51(0e|2|5e)!':						[ STRINGS_HTC, 'Flyer', TYPE_TABLET ],
			'HTC Gratia!':								[ STRINGS_HTC, 'Gratia' ],
			'HTC A6380':								[ STRINGS_HTC, 'Gratia' ],
			'HTC HD':									[ STRINGS_HTC, 'HD' ],
			'HTC HD2!':									[ STRINGS_HTC, 'HD2' ],
			'HTC T8585':								[ STRINGS_HTC, 'HD2' ],
			'HTC HD7!':									[ STRINGS_HTC, 'HD7' ],
			'HTC T9299!':								[ STRINGS_HTC, 'HD7' ],
			'HTC HD7S!':								[ STRINGS_HTC, 'HD7s' ],
			'HTC T(93|98)99!':							[ STRINGS_HTC, 'HD7s' ],
			'VitMod ExtraLite 1.6.5.fullodex for HTC HD7 Pro':		[ STRINGS_HTC, 'HD7 Pro' ],
			'HTC HERO200':								[ STRINGS_HTC, 'Hero 200' ],			/* Sprint */
			'HTC Hero S':								[ STRINGS_HTC, 'Hero S' ],				/* US Cellular */
			'HTC Hero!':								[ STRINGS_HTC, 'Hero' ],
			'HTC H3000C':								[ STRINGS_HTC, 'Hero' ],
			'HTC IMAGIO':								[ STRINGS_HTC, 'Imagio' ],
			'HTC Incredible':							[ STRINGS_HTC, 'Incredible' ],
			'HTC Incredible ?S!':						[ STRINGS_HTC, 'Incredible S' ],
			'HTC Vivo':									[ STRINGS_HTC, 'Incredible S' ],
			'HTC S710e!':								[ STRINGS_HTC, 'Incredible S' ],
			'HTC Innovation':							[ STRINGS_HTC, 'Innovation' ],
			'HTC (HD7 )?Inspire!':						[ STRINGS_HTC, 'Inspire 4G' ],
			'HTC J Z321e':								[ STRINGS_HTC, 'J' ],
			'HTC P715a':								[ STRINGS_HTC, 'Jetstream', TYPE_TABLET ],
			'HTC Legend':								[ STRINGS_HTC, 'Legend' ],
			'HTC Magic':								[ STRINGS_HTC, 'Magic' ],
			'HTC Sapphire':								[ STRINGS_HTC, 'Magic' ],
			'HTC Lexikon':								[ STRINGS_HTC, 'Merge' ],
			'HTC One S':								[ STRINGS_HTC, 'One S' ],
			'HTC Z(52|56)0e!':							[ STRINGS_HTC, 'One S' ],
			'HTC One V':								[ STRINGS_HTC, 'One V' ],
			'HTC T320e':								[ STRINGS_HTC, 'One V' ],
			'HTC H2000C':								[ STRINGS_HTC, 'One V' ],
			'HTC One X':								[ STRINGS_HTC, 'One X' ],
			'HTC Endeavour!':							[ STRINGS_HTC, 'One X' ],
			'HTC S720e':								[ STRINGS_HTC, 'One X' ],
			'HTC One X+':								[ STRINGS_HTC, 'One X+' ],
			'HTC OneXplus':								[ STRINGS_HTC, 'One X+' ],
			'HTC PM63100':								[ STRINGS_HTC, 'One X+' ],
			'HTC One XL':								[ STRINGS_HTC, 'One XL' ],
			'HTC S720t':								[ STRINGS_HTC, 'One XT' ],
			'HTC Raider!':								[ STRINGS_HTC, 'Raider 4G' ],
			'HTC Holiday':								[ STRINGS_HTC, 'Raider 4G' ],
			'HTC X710(a|e|s)!':							[ STRINGS_HTC, 'Raider 4G' ],
			'HTC PH39100':								[ STRINGS_HTC, 'Raider 4G' ],
			'HTC Rezound':								[ STRINGS_HTC, 'Rezound' ],
			'HTC Rhyme!':								[ STRINGS_HTC, 'Rhyme' ],
			'HTC Bliss!':								[ STRINGS_HTC, 'Rhyme' ],
			'HTC S510b':								[ STRINGS_HTC, 'Rhyme' ],
			'HTC Salsa!':								[ STRINGS_HTC, 'Salsa' ],	
			'HTC C510e':								[ STRINGS_HTC, 'Salsa' ],
			'HTC Sensation.*XE!':						[ STRINGS_HTC, 'Sensation XE' ],
			'HTC .*Z715(a|e)!':							[ STRINGS_HTC, 'Sensation XE' ],
			'HTC Sensation.*XL!':						[ STRINGS_HTC, 'Sensation XL' ],
			'HTC Runnymede':							[ STRINGS_HTC, 'Sensation XL' ],
			'HTC .*X315(b|e)!':							[ STRINGS_HTC, 'Sensation XL' ],
			'HTC G21!':									[ STRINGS_HTC, 'Sensation XL' ],
			'HTC Sensation!':							[ STRINGS_HTC, 'Sensation' ],
			'HTC Pyramid!':								[ STRINGS_HTC, 'Sensation' ],
			'HTC .*Z710(a|e|t)?!':						[ STRINGS_HTC, 'Sensation' ],
			'HTC G14!':									[ STRINGS_HTC, 'Sensation' ],
			'HTC Status':								[ STRINGS_HTC, 'Status' ],
			'HTC PH06130':								[ STRINGS_HTC, 'Status' ],
			'HTC Tattoo!':								[ STRINGS_HTC, 'Tattoo' ],
			'HTC Click':								[ STRINGS_HTC, 'Tattoo' ],
			'HTC A3288':								[ STRINGS_HTC, 'Tattoo' ],
			'HTC A9188':								[ STRINGS_HTC, 'Tianxi' ],
			'HTC X310e':								[ STRINGS_HTC, 'Titan' ],
			'HTC T7373':								[ STRINGS_HTC, 'Touch Pro II' ],
			'HTC ThunderBolt':							[ STRINGS_HTC, 'ThunderBolt'],	
			'HTC Mecha':								[ STRINGS_HTC, 'ThunderBolt'],
			'HTC Velocity!':							[ STRINGS_HTC, 'Velocity 4G'],
			'HTC Wildfire ?S!':							[ STRINGS_HTC, 'Wildfire S' ],	
			'HTC .*A510(a|b|c|e)!':						[ STRINGS_HTC, 'Wildfire S' ],
			'HTC Wildfire!':							[ STRINGS_HTC, 'Wildfire' ],
			'HTC .*A33(33|66|80)!':						[ STRINGS_HTC, 'Wildfire' ],
			'HTC A6390':								[ STRINGS_HTC, 'A6390' ],
			'HTC A8180':								[ STRINGS_HTC, 'A8180' ],
			'HTC PG762':								[ STRINGS_HTC, 'PG762' ],
			'HTC S610d':								[ STRINGS_HTC, 'S610d' ],
			'HTC S715e':								[ STRINGS_HTC, 'S715e' ],
			'HTC Z510d':								[ STRINGS_HTC, 'Z510d' ],
			'HTC VLE U':								[ STRINGS_HTC, 'One S' ],
			'HTC VLE#U':								[ STRINGS_HTC, 'One S' ],
			'HTC VIE U':								[ STRINGS_HTC, 'One S' ],
			'HTC EVA UL':								[ STRINGS_HTC, 'One V' ],
			'HTC DLX U':								[ STRINGS_HTC, 'Droid DNA' ],
			'HTC DLX WL':								[ STRINGS_HTC, 'Droid DNA' ],
			'HTC6435LVW!':								[ STRINGS_HTC, 'Droid DNA' ],
			'DLX':										[ STRINGS_HTC, 'Droid DNA' ],
			'HTC ENR U':								[ STRINGS_HTC, 'One X' ],
			'ENR U':									[ STRINGS_HTC, 'One X' ],
			'EndeavorU':								[ STRINGS_HTC, 'One X' ],
			'HTC EVARE UL':								[ STRINGS_HTC, 'One X+' ],
			'Liberty':									[ STRINGS_HTC, 'Aria' ],
			'Desire HD!':								[ STRINGS_HTC, 'Desire HD' ],
			'Desire ?S!':								[ STRINGS_HTC, 'Desire S' ],
			'Desire Z':									[ STRINGS_HTC, 'Desire Z' ],
			'Desire!':									[ STRINGS_HTC, 'Desire' ],
			'Dream':									[ STRINGS_HTC, 'Dream' ],
			'GinDream/GinMagic':						[ STRINGS_HTC, 'Dream' ],
			'SiRF Dream':								[ STRINGS_HTC, 'Dream' ],
			'Droid Incredible':							[ STRINGS_HTC, 'Droid Incredible' ],
			'Incredible':								[ STRINGS_HTC, 'Droid Incredible' ],	/* Verizon */
			'Incredible 2':								[ STRINGS_HTC, 'Droid Incredible 2' ],	/* Verizon */
			'EVO':										[ STRINGS_HTC, 'EVO' ],
			'Evo HD2':									[ STRINGS_HTC, 'EVO HD' ],
			'EVO ?3D!':									[ STRINGS_HTC, 'EVO 3D' ],
			'EVO 4G':									[ STRINGS_HTC, 'EVO 4G' ],
			'photon':									[ STRINGS_HTC, 'HD mini' ],
			'HD2':										[ STRINGS_HTC, 'HD2' ],
			'NexusHD2':									[ STRINGS_HTC, 'HD2' ],
			'Nexus HD2':								[ STRINGS_HTC, 'HD2' ],
			'HD7  Pro':									[ STRINGS_HTC, 'HD7 Pro' ],
			'Hero':										[ STRINGS_HTC, 'Hero' ],
			'HERO CDMA':								[ STRINGS_HTC, 'Hero' ],
			'HERO200':									[ STRINGS_HTC, 'Hero 200' ],
			'Incredible ?S!':							[ STRINGS_HTC, 'Incredible S' ],
			'Inspire HD':								[ STRINGS_HTC, 'Inspire 4G' ],
			'Inspire 4G':								[ STRINGS_HTC, 'Inspire 4G' ],
			'Legend':									[ STRINGS_HTC, 'Legend' ],
			'Docomo HT-03A':							[ STRINGS_HTC, 'Magic' ],
			'One X':									[ STRINGS_HTC, 'One X' ],
			'One V':									[ STRINGS_HTC, 'One V' ],
			'MIUI.us Sensation 4G':						[ STRINGS_HTC, 'Sensation 4G' ],
			'SensationXE!':								[ STRINGS_HTC, 'Sensation XE' ],
			'SensationXL!':								[ STRINGS_HTC, 'Sensation XL' ],
			'Sensation!':								[ STRINGS_HTC, 'Sensation' ],
			'Pyramid':									[ STRINGS_HTC, 'Sensation' ],
			'TripNiCE Pyramid':							[ STRINGS_HTC, 'Sensation' ],
			'Click':									[ STRINGS_HTC, 'Tattoo' ],
			'Wildfire S!':								[ STRINGS_HTC, 'Wildfire S' ],
			'Wildfire!':								[ STRINGS_HTC, 'Wildfire' ],
			'Sprint APX515CKT':							[ STRINGS_HTC, 'EVO 3D' ],
			'Sprint APA9292KT':							[ STRINGS_HTC, 'EVO 4G' ],
			'Sprint APA7373KT':							[ STRINGS_HTC, 'EVO Shift 4G' ],
			'Sprint APC715CKT':							[ STRINGS_HTC, 'EVO Design 4G' ],
			'A3380':									[ STRINGS_HTC, 'Wildfire' ],
			'A6277':									[ STRINGS_HTC, 'Hero' ],
			'a7272':									[ STRINGS_HTC, 'Desire Z' ],					
			'A7272+(HTC DesireZ)':						[ STRINGS_HTC, 'Desire Z' ],					
			'S31HT':									[ STRINGS_HTC, 'Aria' ],
			'S710d':									[ STRINGS_HTC, 'Droid Incredible 2' ],
			'S710D':									[ STRINGS_HTC, 'Droid Incredible 2' ],
			'X06HT':									[ STRINGS_HTC, 'Desire' ],
			'001HT':									[ STRINGS_HTC, 'Desire HD' ],
			'X325a':									[ STRINGS_HTC, 'One X' ],
			'Z520m':									[ STRINGS_HTC, 'One S' ],
			'Z710':										[ STRINGS_HTC, 'Sensation' ],
			'Z710e':									[ STRINGS_HTC, 'Sensation' ],
			'T9199h':									[ STRINGS_HTC, 'T9199h' ],
			'ADR6200':									[ STRINGS_HTC, 'Droid Eris' ],
			'ADR6300':									[ STRINGS_HTC, 'Droid Incredible' ],
			'ADR6325VW':								[ STRINGS_HTC, 'Merge' ],	
			'ADR6330VW':								[ STRINGS_HTC, 'Rhyme' ],	
			'ADR6350':									[ STRINGS_HTC, 'Droid Incredible 2' ],
			'ADR6400L!':								[ STRINGS_HTC, 'Thunderbolt 4G' ],
			'ADR6410LVW!':								[ STRINGS_HTC, 'Fireball' ],
			'ADR6425LVW!':								[ STRINGS_HTC, 'Rezound' ],
			'Coquettish Red':							[ STRINGS_HTC, 'Rezound' ],
			'PB99400':									[ STRINGS_HTC, 'Droid Incredible' ],	
			'pcdadr6350':								[ STRINGS_HTC, 'Droid Incredible 2' ],
			'PC36100':									[ STRINGS_HTC, 'EVO 4G' ],
			'PG06100':									[ STRINGS_HTC, 'EVO Shift 4G' ],
			'PG41200':									[ STRINGS_HTC, 'EVO View 4G', TYPE_TABLET ],
			'PG86100!':									[ STRINGS_HTC, 'EVO 3D' ],
			'PH44100':									[ STRINGS_HTC, 'EVO Design 4G' ],
			'PJ83100':									[ STRINGS_HTC, 'One X' ],
			'PM63100':									[ STRINGS_HTC, 'One X+' ],
			'ISW11HT':									[ STRINGS_HTC, 'EVO 4G' ],
			'ISW12HT':									[ STRINGS_HTC, 'EVO 3D' ],
			'ISW13HT':									[ STRINGS_HTC, 'J' ],
			'USCCADR6275US!':							[ STRINGS_HTC, 'Desire' ],
			'USCCADR6285US!':							[ STRINGS_HTC, 'Hero S' ],
			'USCCADR6325US!':							[ STRINGS_HTC, 'Merge' ],
			'MediaPad':									[ STRINGS_HUAWEI, 'MediaPad', TYPE_TABLET ],
			'Huawei MediaPad':							[ STRINGS_HUAWEI, 'MediaPad', TYPE_TABLET ],
			'Huawei S7-312u':							[ STRINGS_HUAWEI, 'MediaPad', TYPE_TABLET ],
			'MediaPad 7 Lite':							[ STRINGS_HUAWEI, 'MediaPad 7 Lite', TYPE_TABLET ],
			'MediaPad 10 FHD':							[ STRINGS_HUAWEI, 'MediaPad 10', TYPE_TABLET ],
			'Huawei C8500!':							[ STRINGS_HUAWEI, 'C8500' ],
			'Huawei C8600':								[ STRINGS_HUAWEI, 'C8600' ],
			'Huawei C8650!':							[ STRINGS_HUAWEI, 'C8650' ],
			'Huawei C8800':								[ STRINGS_HUAWEI, 'IDEOS X5' ],
			'Huawei C8810':								[ STRINGS_HUAWEI, 'Ascend G300' ],
			'Huawei C8812!':							[ STRINGS_HUAWEI, 'Ascend C8812' ],
			'Huawei C8825D':							[ STRINGS_HUAWEI, 'Ascend G330C' ],
			'Huawei C8860E':							[ STRINGS_HUAWEI, 'Honor' ],
			'Huawei G300':								[ STRINGS_HUAWEI, 'Ascend G300' ],
			'Huawei M835':								[ STRINGS_HUAWEI, 'M835' ],
			'Huawei M860':								[ STRINGS_HUAWEI, 'Ascend' ],
			'Huawei M920':								[ STRINGS_HUAWEI, 'M920' ],
			'Huawei M921':								[ STRINGS_HUAWEI, 'M921' ],
			'Huawei M931':								[ STRINGS_HUAWEI, 'M931' ],
			'Huawei S8520':								[ STRINGS_HUAWEI, 'S8520' ],
			'Huawei S8600':								[ STRINGS_HUAWEI, 'S8600' ],
			'Huawei T8100':								[ STRINGS_HUAWEI, 'T8100' ],
			'Huawei T8300':								[ STRINGS_HUAWEI, 'T8300' ],
			'Huawei ?T8500!':							[ STRINGS_HUAWEI, 'T8500' ],
			'Huawei T8600':								[ STRINGS_HUAWEI, 'T8600' ],
			'Huawei T8620':								[ STRINGS_HUAWEI, 'Ascend Y200T' ],
			'Huawei T8828':								[ STRINGS_HUAWEI, 'Ascend G305T' ],
			'Huawei T8830':								[ STRINGS_HUAWEI, 'Ascend G309T' ],
			'Huawei T8950':								[ STRINGS_HUAWEI, 'Honor+' ],
			'Huawei T9200':								[ STRINGS_HUAWEI, 'Ascend P1' ],
			'Huawei U8220':								[ STRINGS_HUAWEI, 'U8220' ],
			'Huawei U8500':								[ STRINGS_HUAWEI, 'IDEOS X2' ],
			'Huawei ?U8520!':							[ STRINGS_HUAWEI, 'U8520 Duplex' ],
			'Huawei ?U8650!':							[ STRINGS_HUAWEI, 'Sonic' ],
			'Huawei U8652':								[ STRINGS_HUAWEI, 'Sonic' ],
			'Huawei U8661':								[ STRINGS_HUAWEI, 'Sonic+' ],
			'Huawei U8666!':							[ STRINGS_HUAWEI, 'Ascend Y201' ],
			'Huawei U8800!':							[ STRINGS_HUAWEI, 'IDEOS X5' ],
			'Huawei U8815':								[ STRINGS_HUAWEI, 'Ascend G300' ],
			'Huawei U8818':								[ STRINGS_HUAWEI, 'Ascend G300' ],
			'Huawei U8825D':							[ STRINGS_HUAWEI, 'Ascend G330D' ],
			'Huawei U8850':								[ STRINGS_HUAWEI, 'Vision' ],
			'Huawei U8950!':							[ STRINGS_HUAWEI, 'Ascend G600' ],
			'Huawei U9000':								[ STRINGS_HUAWEI, 'Ascend X' ],
			'Huawei U9510!':							[ STRINGS_HUAWEI, 'Ascend D quad' ],
			'Huawei D2-0082':							[ STRINGS_HUAWEI, 'Ascend D2' ],
			'Huawei IDEOS U8500':						[ STRINGS_HUAWEI, 'IDEOS X2' ],
			'Huawei IDEOS U8650':						[ STRINGS_HUAWEI, 'Sonic' ],
			'Huawei IDEOS X3':							[ STRINGS_HUAWEI, 'IDEOS X3' ],
			'Huawei Ideos X5!':							[ STRINGS_HUAWEI, 'IDEOS X5' ],
			'Huawei SONIC':								[ STRINGS_HUAWEI, 'Sonic' ],
			'Huawei 8100-9':							[ STRINGS_HUAWEI, 'U8100' ],
			'Ascend G300':								[ STRINGS_HUAWEI, 'Ascend G300' ],
			'Huawei Y300!':								[ STRINGS_HUAWEI, 'Ascend Y300' ],
			'FUSIONideos':								[ STRINGS_HUAWEI, 'IDEOS' ],
			'Gnappo Ideos':								[ STRINGS_HUAWEI, 'IDEOS' ],
			'Ideos':									[ STRINGS_HUAWEI, 'IDEOS' ],
			'IDEOS X5':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
			'IDEOS S7!':								[ STRINGS_HUAWEI, 'IDEOS S7', TYPE_TABLET ],
			'Huawei S7':								[ STRINGS_HUAWEI, 'IDEOS S7', TYPE_TABLET ],
			'SONIC':									[ STRINGS_HUAWEI, 'Sonic' ],
			'Kyivstar Aqua':							[ STRINGS_HUAWEI, 'Sonic' ],
			'Lucky Ultra Sonic U8650':					[ STRINGS_HUAWEI, 'Sonic' ],
			'Turkcell T20':								[ STRINGS_HUAWEI, 'Sonic' ],
			'MTC 950':									[ STRINGS_HUAWEI, 'U8160' ],
			'MTC 955':									[ STRINGS_HUAWEI, 'Sonic' ],
			'MTC Evo':									[ STRINGS_HUAWEI, 'C8500' ],
			'MTC Android':								[ STRINGS_HUAWEI, 'U8110' ],
			'S31HW':									[ STRINGS_HUAWEI, 'Pocket WiFi S' ],
			'S41HW':									[ STRINGS_HUAWEI, 'Pocket WiFi S II' ],
			'007HW':									[ STRINGS_HUAWEI, 'Vision' ],	
			'201HW':									[ STRINGS_HUAWEI, 'Ascend P1' ],
			'UM840':									[ STRINGS_HUAWEI, 'Evolution' ],	
			'M860':										[ STRINGS_HUAWEI, 'Ascend' ],
			'M865':										[ STRINGS_HUAWEI, 'Ascend II' ],
			'M886':										[ STRINGS_HUAWEI, 'Glory' ],
			'C8150':									[ STRINGS_HUAWEI, 'IDEOS' ],
			'C8500!':									[ STRINGS_HUAWEI, 'C8500' ],
			'C8600':									[ STRINGS_HUAWEI, 'C8600' ],
			'C8650':									[ STRINGS_HUAWEI, 'C8650' ],
			'C8800':									[ STRINGS_HUAWEI, 'C8800' ],
			'C8810':									[ STRINGS_HUAWEI, 'Ascend G300C' ],
			'C8812':									[ STRINGS_HUAWEI, 'Ascend C8812' ],
			'S8600':									[ STRINGS_HUAWEI, 'S8600' ],
			'T8620':									[ STRINGS_HUAWEI, 'Ascend Y200T' ],
			'U8100':									[ STRINGS_HUAWEI, 'U8100' ],
			'U8110':									[ STRINGS_HUAWEI, 'U8110' ],
			'U8120':									[ STRINGS_HUAWEI, 'U8120' ],
			'U8180':									[ STRINGS_HUAWEI, 'IDEOS X1' ],
			'U8220':									[ STRINGS_HUAWEI, 'Pulse' ],
			'U8300':									[ STRINGS_HUAWEI, 'U8300' ],
			'U8350':									[ STRINGS_HUAWEI, 'Boulder' ],
			'U8150':									[ STRINGS_HUAWEI, 'IDEOS' ],
			'U8160':									[ STRINGS_HUAWEI, 'U8160' ],
			'U8180':									[ STRINGS_HUAWEI, 'IDEOS X1' ],
			'U8500':									[ STRINGS_HUAWEI, 'IDEOS X2' ],
			'U8500 HiQQ':								[ STRINGS_HUAWEI, 'U8500 HiQQ Edition' ],
			'U8510':									[ STRINGS_HUAWEI, 'IDEOS X3' ],
			'U8650!':									[ STRINGS_HUAWEI, 'Sonic' ],
			'U8660':									[ STRINGS_HUAWEI, 'Sonic' ],
			'U8800 ?Pro!':								[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
			'U8800!':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
			'U8815':									[ STRINGS_HUAWEI, 'Ascend G300' ],
			'U8818':									[ STRINGS_HUAWEI, 'Ascend G300' ],
			'U8820':									[ STRINGS_HUAWEI, 'Titan' ],
			'U8850':									[ STRINGS_HUAWEI, 'Vision' ],
			'U8860':									[ STRINGS_HUAWEI, 'Honor' ],
			'U9000':									[ STRINGS_HUAWEI, 'Ascend X' ],
			'U9200!':									[ STRINGS_HUAWEI, 'Ascend P1' ],
			'U9500':									[ STRINGS_HUAWEI, 'Ascend D1' ],
			'U9501L':									[ STRINGS_HUAWEI, 'Ascend D LTE' ],
			'U9510!':									[ STRINGS_HUAWEI, 'Ascend D quad' ],
			'Comet':									[ STRINGS_HUAWEI, 'Comet' ],
			'GS02':										[ STRINGS_HUAWEI, 'Honor' ],
			'GS03':										[ STRINGS_HUAWEI, 'Ascend P1' ],
			'DroniX-0.5':								[ STRINGS_HUAWEI, 'U8180' ],
			'MTS-SP101':								[ STRINGS_HUAWEI, 'C8511' ],
			'TSP21':									[ STRINGS_HUAWEI, 'U8110' ],
			'HW-01E':									[ STRINGS_HUAWEI, 'Ascend HW-01E' ],								
			'HYUNDAI H6':								[ 'Hyundai', 'Storm H6' ],
			'iBall Slide i7011':						[ 'iBall', 'Slide i7011' ],
			'NetTAB RUNE':								[ 'IconBit', 'NetTab Rune', TYPE_TABLET ],
			'D70W':										[ 'Icoo', 'D70W', TYPE_TABLET ],
			'D80':										[ 'Icoo', 'D80', TYPE_TABLET ],
			'INFOBAR A01':								[ 'iida', 'INFOBAR A01' ],
			'M009F':									[ 'Infotmic', 'M009F' ],
			'AZ210A':									[ 'Intel', 'AZ210A' ],
			'AZ210B':									[ 'Intel', 'AZ210B' ],
			'AZ510':									[ 'Intel', 'AZ510' ],
			'BT210':									[ 'Intel', 'BT210' ],
			'BT510':									[ 'Intel', 'BT510' ],
			'greenridge':								[ 'Intel', 'Green Ridge', TYPE_TABLET ],
			'INQ Cloud Touch':							[ 'INQ', 'Cloud Touch' ],
			'ILT-MX100':								[ 'iRiver', 'Tab', TYPE_TABLET ],
			'IVIO_DE38':								[ 'Ivio', 'DE38' ],
			'JY-G2':									[ 'Jiayu', 'G2' ],
			'JXD S601WIFI':								[ 'JXD', 'S601 WIFI', 'media' ],
			'A2':										[ 'KakaTech', 'A2' ],
			'D91':										[ 'KK', 'D91', TYPE_TABLET ],
			'K080':										[ 'Kobo', 'K080', TYPE_EREADER ],
			'A106':										[ 'koobee', 'A160' ],
			'KPT A9':									[ 'KPT', 'A9' ],
			'EV-S100':									[ 'Kttech', 'Take EV-S100' ],
			'KM-E100':									[ 'Kttech', 'Take LTE KM-E100' ],
			'KM-S120':									[ 'Kttech', 'Take 2 KM-S120' ],
			'KM-S200':									[ 'Kttech', 'Take Janus KM-S200' ],
			'KM-S220':									[ 'Kttech', 'Take Tachy KM-S220' ],
			'Kyobo mirasol eReader':					[ 'Kyobo', TYPE_EREADER, TYPE_EREADER ],
			'ISW11K':									[ 'Kyocera', 'Digno' ],
			'JC-KSP8000':								[ 'Kyocera', 'Echo' ],
			'KSP8000':									[ 'Kyocera', 'Echo' ],
			'Zio':										[ 'Kyocera', 'Zio' ],
			'C5155':									[ 'Kyocera', 'C5155' ],
			'C5170':									[ 'Kyocera', 'C5170' ],
			'M9300':									[ 'Kyocera', 'M9300' ],
			'K-Touch E619':								[ 'K-Touch', 'E619' ],
			'E800':										[ 'K-Touch', 'E800' ],
			'K-TouchT580':								[ 'K-Touch', 'T580' ],
			'K-Touch V9':								[ 'K-Touch', 'V9' ],
			'W606':										[ 'K-Touch', 'W606' ],
			'K-Touch W619':								[ 'K-Touch', 'W619' ],
			'K-Touch W621':								[ 'K-Touch', 'W621' ],
			'K-Touch W650':								[ 'K-Touch', 'W650' ],
			'K-Touch W688':								[ 'K-Touch', 'W688' ],
			'W700':										[ 'K-Touch', 'W700' ],
			'W732':										[ 'K-Touch', 'W732' ],
			'K-Touch W760':								[ 'K-Touch', 'W760' ],
			'W800':										[ 'K-Touch', 'W800' ],
			'K-Touch W806+':							[ 'K-Touch', 'W806' ],
			'W806':										[ 'K-Touch', 'W806' ],
			'W808':										[ 'K-Touch', 'W808' ],
			'W810':										[ 'K-Touch', 'W810' ],
			'W880':										[ 'K-Touch', 'W880' ],
			'X900':										[ 'Lava', 'XOLO X900' ],
			'ThinkPad( Tablet)?!':						[ STRINGS_LENOVO, 'ThinkPad Tablet', TYPE_TABLET ],
			'(Ideapad )?K1!':							[ STRINGS_LENOVO, 'IdeaPad K1', TYPE_TABLET ],
			'Ideapad S10-3T':							[ STRINGS_LENOVO, 'IdeaPad S10-3T', TYPE_TABLET ],
			'S2005A-H':									[ STRINGS_LENOVO, 'S2005A' ],
			'IdeaTab ?A2107(A-H)!':						[ STRINGS_LENOVO, 'IdeaTab A2107A', TYPE_TABLET ],
			'IdeaTab ?A2109(A)!':						[ STRINGS_LENOVO, 'IdeaTab A2109A', TYPE_TABLET ],
			'IdeaTab ?K2110(A-F)!':						[ STRINGS_LENOVO, 'IdeaTab K2110A', TYPE_TABLET ],
			'IdeaTab ?S2007(A-D)!':						[ STRINGS_LENOVO, 'IdeaTab S2007A', TYPE_TABLET ],
			'IdeaTab ?V2007(A|A-D-I)!':					[ STRINGS_LENOVO, 'IdeaTab V2007A', TYPE_TABLET ],
			'IdeaTab ?V2010(A)!':						[ STRINGS_LENOVO, 'IdeaTab V2010A', TYPE_TABLET ],
			'A1 07':									[ STRINGS_LENOVO, 'LePad', TYPE_TABLET ],
			'lepad 001b':								[ STRINGS_LENOVO, 'LePad', TYPE_TABLET ],
			'lepad 001n':								[ STRINGS_LENOVO, 'LePad', TYPE_TABLET ],
			'(Lenovo )?3GC101!':						[ STRINGS_LENOVO, 'LePhone 3GC101' ],
			'(Lenovo )?3GW100!':						[ STRINGS_LENOVO, 'LePhone 3GW100' ],
			'(Lenovo |Lephone )?3GW101!':				[ STRINGS_LENOVO, 'LePhone 3GW101' ],
			'Lenovo A1-32AB0':							[ STRINGS_LENOVO, 'LePhone A1-32AB0' ],
			'Lenovo S1-37AH0':							[ STRINGS_LENOVO, 'LePhone S1-37AH0' ],
			'S1 37AHO':									[ STRINGS_LENOVO, 'LePhone S1-37AH0' ],
			'Lenovo S2-38AH0':							[ STRINGS_LENOVO, 'LePhone S2-38AH0' ],
			'Lenovo S2-38AT0':							[ STRINGS_LENOVO, 'LePhone S2-38AT0' ],
			'Lenovo A288t':								[ STRINGS_LENOVO, 'LePhone A288' ],
			'Lenovo A300':								[ STRINGS_LENOVO, 'LePhone A300' ],
			'Lenovo A366t':								[ STRINGS_LENOVO, 'LePhone A366' ],
			'Lenovo A390e':								[ STRINGS_LENOVO, 'LePhone A390' ],
			'Lenovo A500':								[ STRINGS_LENOVO, 'LePhone A500' ],
			'Lenovo A520!':								[ STRINGS_LENOVO, 'LePhone A520' ],
			'Lenovo A560e':								[ STRINGS_LENOVO, 'LePhone A560' ],
			'Lenovo A660':								[ STRINGS_LENOVO, 'LePhone A660' ],
			'Lenovo A668t':								[ STRINGS_LENOVO, 'LePhone A668' ],
			'Lenovo A698t':								[ STRINGS_LENOVO, 'LePhone A698' ],
			'Lenovo A710e':								[ STRINGS_LENOVO, 'LePhone A710' ],
			'Lenovo A750':								[ STRINGS_LENOVO, 'LePhone A750' ],
			'Lenovo A780':								[ STRINGS_LENOVO, 'LePhone A780' ],
			'Lenovo A789':								[ STRINGS_LENOVO, 'LePhone A789' ],
			'Lenovo A790e':								[ STRINGS_LENOVO, 'LePhone A790' ],
			'Lenovo K860':								[ STRINGS_LENOVO, 'LePhone K860' ],
			'Lenovo P70':								[ STRINGS_LENOVO, 'LePhone P70' ],
			'Lenovo P700!':								[ STRINGS_LENOVO, 'LePhone P700' ],
			'Lenovo S560':								[ STRINGS_LENOVO, 'S560' ],
			'Lenovo S680':								[ STRINGS_LENOVO, 'S680' ],
			'Lenovo S720':								[ STRINGS_LENOVO, 'S720' ],
			'Lenovo S850e':								[ STRINGS_LENOVO, 'S850' ],
			'Lenovo S880':								[ STRINGS_LENOVO, 'S880' ],
			'Lenovo ?S899!':							[ STRINGS_LENOVO, 'S899' ],
			'A30t':										[ STRINGS_LENOVO, 'A30t' ],
			'Lenovo A60+?!':							[ STRINGS_LENOVO, 'A60' ],
			'Lenovo A65':								[ STRINGS_LENOVO, 'A65' ],
			'Lenovo A66t':								[ STRINGS_LENOVO, 'A66t' ],
			'Lenovo A68e':								[ STRINGS_LENOVO, 'A68e' ],
			'Lenovo K800':								[ STRINGS_LENOVO, 'K800' ],
			'IDEA TV T100':								[ STRINGS_LENOVO, 'IDEA TV', TYPE_TELEVISION ],
			'IDEA TV K91':								[ STRINGS_LENOVO, 'IDEA TV', TYPE_TELEVISION ],
			'TC970':									[ 'Le Pan', 'TC970', TYPE_TABLET ],
			'LePanII':									[ 'Le Pan', 'II', TYPE_TABLET ],
			'LG-C555':									[ STRINGS_LG, 'Optimus Chat' ],
			'LG-C660!':									[ STRINGS_LG, 'Optimus Pro' ],
			'LG-C729':									[ STRINGS_LG, 'DoublePlay' ],
			'LG-C800G':									[ STRINGS_LG, 'Eclypse' ],
			'LG-CX670':									[ STRINGS_LG, 'Optimus 3G' ],
			'LG-E400!':									[ STRINGS_LG, 'Optimus L3' ],
			'LG-E405!':									[ STRINGS_LG, 'Optimus L3 Dual' ],
			'LG-E435!':									[ STRINGS_LG, 'E435' ],
			'LG-E455!':									[ STRINGS_LG, 'E455' ],
			'LG-E510!':									[ STRINGS_LG, 'Optimus Hub' ],
			'LG-E6(10|12|17)!':							[ STRINGS_LG, 'Optimus L5' ],
			'LG-E615!':									[ STRINGS_LG, 'Optimus L5 Dual' ],
			'LG-E720!':									[ STRINGS_LG, 'Optimus Chic' ],
			'LG-E730':									[ STRINGS_LG, 'Optimus Sol' ],
			'LG-E960':									[ STRINGS_LG, 'Nexus 4' ],
			'LG-E970':									[ STRINGS_LG, 'Shine' ],
			'LG-E9(71|73)!':							[ STRINGS_LG, 'Optimus G' ],
			'LG-F100!':									[ STRINGS_LG, 'Optimus Vu' ],
			'LG-F120!':									[ STRINGS_LG, 'Optimus LTE Tag' ],
			'LG-F160!':									[ STRINGS_LG, 'Optimus LTE II' ],
			'LG-F180!':									[ STRINGS_LG, 'Optimus G' ],
			'LG-F200!':									[ STRINGS_LG, 'Optimus Vu 2' ],
			'LG-F260!':									[ STRINGS_LG, 'F260' ],
			'LG-GT540!':								[ STRINGS_LG, 'Optimus' ],
			'LG-GW620':									[ STRINGS_LG, 'GW620 Eve' ],
			'LG-KH5200':								[ STRINGS_LG, 'Andro-1' ],
			'LG-KU3700':								[ STRINGS_LG, 'Optimus One' ],
			'LG-KU5400':								[ STRINGS_LG, 'PRADA 3.0' ],
			'LG-KU5900':								[ STRINGS_LG, 'Optimus Black' ],
			'LG-L40G':									[ STRINGS_LG, 'L40G' ],
			'LG-LG730':									[ STRINGS_LG, 'Venice' ],
			'LG-LG855':									[ STRINGS_LG, 'Marquee' ],
			'LG-LS670':									[ STRINGS_LG, 'Optimus S' ],
			'LG-LS696':									[ STRINGS_LG, 'Elite' ],
			'LG-LS840':									[ STRINGS_LG, 'Viper' ],
			'LG-LS855':									[ STRINGS_LG, 'Marquee' ],
			'LG-LS860':									[ STRINGS_LG, 'Mach' ],
			'LG-LS970':									[ STRINGS_LG, 'Eclipse' ],
			'LG-LU3000':								[ STRINGS_LG, 'Optimus Mach' ],
			'LG-LU3100':								[ STRINGS_LG, 'Optimus Chic' ],
			'LG-LU3700':								[ STRINGS_LG, 'Optimus One' ],
			'LG-LU5400':								[ STRINGS_LG, 'PRADA 3.0' ],
			'LG-LU6200':								[ STRINGS_LG, 'Optimus Q2' ],
			'LG-LU6500':								[ STRINGS_LG, 'Optimus Note' ],
			'LG-LU6800':								[ STRINGS_LG, 'Optimus Big' ],
			'LG-LU8300':								[ STRINGS_LG, 'Optimus Pad LTE' ],
			'LG-LW690':									[ STRINGS_LG, 'Optimus C' ],
			'LG-LW770':									[ STRINGS_LG, 'Regard' ],
			'LG-MS690':									[ STRINGS_LG, 'Optimus M' ],
			'LG-MS770':									[ STRINGS_LG, 'Motion 4G' ],
			'LG-MS840':									[ STRINGS_LG, 'Connect 4G' ],
			'LG-MS870':									[ STRINGS_LG, 'MS870' ],
			'LG-MS910':									[ STRINGS_LG, 'Esteem' ],
			'LG-MS695':									[ STRINGS_LG, 'Optimus M+' ],
			'LG-P350!':									[ STRINGS_LG, 'Optimus Me' ],
			'LG-P355':									[ STRINGS_LG, 'P355' ],
			'LG-P5(00|03|04)!':							[ STRINGS_LG, 'Optimus One' ],
			'LG-P505!':									[ STRINGS_LG, 'Phoenix' ],
			'LG-P506':									[ STRINGS_LG, 'Thrive' ],
			'LG-P509':									[ STRINGS_LG, 'Optimus T' ],
			'LG-P6(90|98)':								[ STRINGS_LG, 'Optimus Net' ],
			'LG-P693':									[ STRINGS_LG, 'P693' ],
			'LG-P7(00|05|08)!':							[ STRINGS_LG, 'Optimus L7' ],
			'LG-P720!':									[ STRINGS_LG, 'Optimus Chic' ],
			'LG-P725':									[ STRINGS_LG, 'Optimus 3D Max' ],
			'LG-P7(60|69)!':							[ STRINGS_LG, 'Optimus L9' ],
			'LG-P860':									[ STRINGS_LG, 'P860' ],
			'LG-P870!':									[ STRINGS_LG, 'Escape' ],	
			'LG-P880!':									[ STRINGS_LG, 'Optimus 4X HD' ],
			'LG-P895':									[ STRINGS_LG, 'Optimus Vu' ],	
			'LG-P920!':									[ STRINGS_LG, 'Optimus 3D' ],
			'LG-P925!':									[ STRINGS_LG, 'Thrill' ],
			'LG-P930':									[ STRINGS_LG, 'Nitro HD' ],
			'LG-P9(35|36)!':							[ STRINGS_LG, 'Optimus LTE' ],
			'LG-P940':									[ STRINGS_LG, 'PRADA 3.0' ],
			'LG-P970!':									[ STRINGS_LG, 'Optimus Black' ],
			'LG-P990!':									[ STRINGS_LG, 'Optimus 2X Speed' ],
			'LG-P993':									[ STRINGS_LG, 'Optimus 2X' ],
			'LG-SU540':									[ STRINGS_LG, 'PRADA 3.0' ],
			'LG-SU640':									[ STRINGS_LG, 'Optimus LTE' ],
			'LG-SU660':									[ STRINGS_LG, 'Optimus 2X' ],
			'LG-SU760':									[ STRINGS_LG, 'Optimus 3D' ],
			'LG-SU870':									[ STRINGS_LG, 'Optimus 3D Cube' ],
			'LG-SU880':									[ STRINGS_LG, 'Optimus EX' ],
			'LG-US670':									[ STRINGS_LG, 'Optimus U' ],
			'LG-US730':									[ STRINGS_LG, 'Splendor' ],
			'LG-V900':									[ STRINGS_LG, 'Optimus Pad', TYPE_TABLET ],
			'LG-V9(05|09)!':							[ STRINGS_LG, 'Optimus G-Slate', TYPE_TABLET ],
			'LG-VM670':									[ STRINGS_LG, 'Optimus V' ],
			'LG-VM696':									[ STRINGS_LG, 'Optimus Elite' ],
			'LG-VM701':									[ STRINGS_LG, 'Optimus Slider' ],
			'LG-VS660':									[ STRINGS_LG, 'Vortex' ],
			'LG-VS700':									[ STRINGS_LG, 'Enlighten' ],
			'LG-VS740':									[ STRINGS_LG, 'Ally' ],
			'LG-VS840':									[ STRINGS_LG, 'Lucid' ],
			'LG-VS870':									[ STRINGS_LG, 'VS870' ],
			'LG-VS910':									[ STRINGS_LG, 'Revolution' ],
			'lgp-970':									[ STRINGS_LG, 'Optimus Black' ],
			'AS740':									[ STRINGS_LG, 'Axis' ],
			'E900':										[ STRINGS_LG, 'Optimus 7' ],
			'GT540':									[ STRINGS_LG, 'Optimus GT540' ],
			'GW620':									[ STRINGS_LG, 'Eve' ],
			'KU9500':									[ STRINGS_LG, 'Optimus Z' ],
			'LGC660':									[ STRINGS_LG, 'Optimus Pro' ],
			'LGL45C':									[ STRINGS_LG, 'Optimus Net' ],
			'LGL55C':									[ STRINGS_LG, 'Optimus Q' ],
			'LU2300':									[ STRINGS_LG, 'Optimus Q' ],	
			'LS670':									[ STRINGS_LG, 'Optimus S' ],
			'P940':										[ STRINGS_LG, 'PRADA 3.0' ],
			'P990':										[ STRINGS_LG, 'Optimus 2X Speed' ],
			'USCC-US730':								[ STRINGS_LG, 'Splendor' ],
			'USCC-US760':								[ STRINGS_LG, 'Genesis' ],
			'VM670':									[ STRINGS_LG, 'Optimus V' ],
			'VS840 4G':									[ STRINGS_LG, 'Lucid' ],
			'VS870 4G':									[ STRINGS_LG, 'VS870' ],
			'VS900-4G':									[ STRINGS_LG, 'Enlighten' ],
			'VS910 4G':									[ STRINGS_LG, 'Revolution 4G' ],
			'VS920 4G':									[ STRINGS_LG, 'Spectrum' ],
			'VS930 4G':									[ STRINGS_LG, 'Spectrum 2' ],
			'VS950 4G':									[ STRINGS_LG, 'Intuition' ],
			'L-01D':									[ STRINGS_LG, 'Optimus LTE' ],
			'L-01E':									[ STRINGS_LG, 'Optimus G' ],
			'L-02D':									[ STRINGS_LG, 'PRADA phone' ],
			'L-02E':									[ STRINGS_LG, 'Optimus LIFE' ],
			'L-04C':									[ STRINGS_LG, 'Optimus Chat' ],
			'L-05D':									[ STRINGS_LG, 'Optimus it' ],
			'L-06C':									[ STRINGS_LG, 'Optimus Pad', TYPE_TABLET ],
			'L-06D':									[ STRINGS_LG, 'Optimus Vu' ],
			'L-07C':									[ STRINGS_LG, 'Optimus Bright' ],
			'LG-Eve':									[ STRINGS_LG, 'Eve' ],
			'LG-Optimus One P500':						[ STRINGS_LG, 'Optimus One' ],
			'LG-Optimus 2X':							[ STRINGS_LG, 'Optimus 2X' ],
			'LG-GT540 Optimus':							[ STRINGS_LG, 'Optimus' ],
			'LG-Optimus Black':							[ STRINGS_LG, 'Optimus Black' ],
			'Ally':										[ STRINGS_LG, 'Ally' ],
			'Optimus':									[ STRINGS_LG, 'Optimus' ],
			'Optimus Me':								[ STRINGS_LG, 'Optimus Me' ],
			'optimus me p350':							[ STRINGS_LG, 'Optimus Me' ],
			'Optimus 2X':								[ STRINGS_LG, 'Optimus 2X' ],
			'Optimus 2x':								[ STRINGS_LG, 'Optimus 2X' ],
			'IS11LG':									[ STRINGS_LG, 'Optimus X' ],
			'Vortex':									[ STRINGS_LG, 'Vortex' ],
			'LDK-ICK v1.4':								[ STRINGS_LG, 'Esteem' ],
			'T6':										[ 'Malata', 'Zpad T6', TYPE_TABLET ],
			'Malata SMBA1002':							[ 'Malata', 'Tablet SMB-A1002', TYPE_TABLET ],
			'STM712HCZ':								[ 'Mediacom', 'SmartPad 712c', TYPE_TABLET ],
			'STM803HC':									[ 'Mediacom', 'SmartPad 810c', TYPE_TABLET ],
			'Mediacom 810C':							[ 'Mediacom', 'SmartPad 810c', TYPE_TABLET ],
			'SmartPad810c':								[ 'Mediacom', 'SmartPad 810c', TYPE_TABLET ],
			'MP810C':									[ 'Mediacom', 'SmartPad 810c', TYPE_TABLET ],
			'MP907C':									[ 'Mediacom', 'SmartPad 907c', TYPE_TABLET ],
			'MTK6516':									[ 'Mediatek', 'MTK6516' ],
			'LIFETAB S9512':							[ 'Medion', 'Lifetab S9512', TYPE_TABLET ],
			'LIFETAB P9514':							[ 'Medion', 'Lifetab P9514', TYPE_TABLET ],
			'MD LIFETAB P9516':							[ 'Medion', 'Lifetab P9516', TYPE_TABLET ],
			'MEDION LIFE P4012':						[ 'Medion', 'Life P4012' ],
			'MEDION LIFE P4310':						[ 'Medion', 'Life P4310' ],
			'M8':										[ 'Meizu', 'M8' ],
			'M9':										[ 'Meizu', 'M9' ],
			'M9-unlocked':								[ 'Meizu', 'M9' ],
			'MEIZU M9':									[ 'Meizu', 'M9' ],
			'MEIZU MX':									[ 'Meizu', 'MX' ],
			'M030':										[ 'Meizu', 'MX M030' ],
			'M031':										[ 'Meizu', 'MX M031' ],
			'M032':										[ 'Meizu', 'MX M032' ],
			'Slidepad':									[ 'Memup', 'Slidepad', TYPE_TABLET ],
			'Micromax A44':								[ 'Micromax', 'A44 Punk' ],
			'A45':										[ 'Micromax', 'A45 Punk' ],
			'Micromax A50':								[ 'Micromax', 'A50 Ninja' ],
			'Micromax A52':								[ 'Micromax', 'A52 Aisha' ],
			'Micromax A56':								[ 'Micromax', 'A56 Ninja 2' ],
			'Micromax A57':								[ 'Micromax', 'A57 Ninja 3' ],
			'Micromax A60':								[ 'Micromax', 'Andro A60' ],
			'Micromax A70':								[ 'Micromax', 'Andro A70' ],
			'Micromax A73':								[ 'Micromax', 'A73 Buzz' ],
			'Micromax A75':								[ 'Micromax', 'A75 Lite' ],
			'Micromax A78':								[ 'Micromax', 'A78 Gossip' ],
			'Micromax A80':								[ 'Micromax', 'A80 Infinity' ],
			'Micromax A84':								[ 'Micromax', 'A84' ],
			'Micromax A85':								[ 'Micromax', 'A85' ],
			'Micromax A87':								[ 'Micromax', 'A87 Ninja 4' ],
			'Micromax A90':								[ 'Micromax', 'A90 Pixel' ],
			'Micromax A100':							[ 'Micromax', 'A100 Canvas' ],
			'Micromax A110':							[ 'Micromax', 'A110 Canvas 2' ],
			'Micromax P275':							[ 'Micromax', 'Funbook Infinity P275', TYPE_TABLET ],
			'P300(Funbook)':							[ 'Micromax', 'Funbook P300', TYPE_TABLET ],
			'Micromax P500(Funbook)':					[ 'Micromax', 'Funbook Pro P500', TYPE_TABLET ],
			'AT735':									[ 'Moinstone', 'AT735', TYPE_TABLET ],
			'A853':										[ STRINGS_MOTOROLA, 'Milestone' ],
			'A953':										[ STRINGS_MOTOROLA, 'Milestone 2' ],
			'A1680':									[ STRINGS_MOTOROLA, 'MOTO A1680' ],
			'ET1':										[ STRINGS_MOTOROLA, 'ET1 Enterprise Tablet', TYPE_TABLET ],
			'MB200':									[ STRINGS_MOTOROLA, 'CLIQ' ],
			'MB300':									[ STRINGS_MOTOROLA, 'BACKFLIP' ],
			'MB501':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
			'MB502':									[ STRINGS_MOTOROLA, 'CHARM' ],
			'MB508':									[ STRINGS_MOTOROLA, 'FLIPSIDE' ],
			'MB511':									[ STRINGS_MOTOROLA, 'FLIPOUT' ],
			'MB520':									[ STRINGS_MOTOROLA, 'BRAVO' ],
			'MB525!':									[ STRINGS_MOTOROLA, 'DEFY' ],
			'MB526':									[ STRINGS_MOTOROLA, 'DEFY+' ],
			'MB611':									[ STRINGS_MOTOROLA, 'CLIQ 2' ],
			'MB612':									[ STRINGS_MOTOROLA, 'XPRT' ],
			'MB632':									[ STRINGS_MOTOROLA, 'PRO+' ],
			'MB855':									[ STRINGS_MOTOROLA, 'PHOTON 4G' ],
			'MB8(60|61)!':								[ STRINGS_MOTOROLA, 'ATRIX' ],
			'MB865':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
			'MB870':									[ STRINGS_MOTOROLA, 'Droid X2' ],
			'MB886':									[ STRINGS_MOTOROLA, 'DINARA' ],
			'ME501':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
			'ME511':									[ STRINGS_MOTOROLA, 'FLIPOUT' ],
			'ME525!':									[ STRINGS_MOTOROLA, 'MOTO ME525' ],
			'ME600':									[ STRINGS_MOTOROLA, 'BACKFLIP' ],
			'ME632':									[ STRINGS_MOTOROLA, 'PRO+' ],
			'ME722':									[ STRINGS_MOTOROLA, 'Milestone 2' ],
			'ME811':									[ STRINGS_MOTOROLA, 'Droid X' ],
			'ME860':									[ STRINGS_MOTOROLA, 'ATRIX' ],
			'ME863':									[ STRINGS_MOTOROLA, 'Milestone 3' ],
			'ME865':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
			'MT620!':									[ STRINGS_MOTOROLA, 'MOTO MT620' ],
			'MT716':									[ STRINGS_MOTOROLA, 'MOTO MT716' ],
			'MT810':									[ STRINGS_MOTOROLA, 'MOTO MT810' ],
			'MT870':									[ STRINGS_MOTOROLA, 'MOTO MT870' ],
			'MT917':									[ STRINGS_MOTOROLA, 'MT917' ],
			'MZ505':									[ STRINGS_MOTOROLA, 'XOOM Family Edition', TYPE_TABLET ],
			'MZ600':									[ STRINGS_MOTOROLA, 'XOOM 4G LTE', TYPE_TABLET ],
			'MZ601':									[ STRINGS_MOTOROLA, 'XOOM 3G', TYPE_TABLET ],
			'MZ602':									[ STRINGS_MOTOROLA, 'XOOM 4G LTE', TYPE_TABLET ],
			'MZ603':									[ STRINGS_MOTOROLA, 'XOOM 3G', TYPE_TABLET ],
			'MZ604':									[ STRINGS_MOTOROLA, 'XOOM WiFi', TYPE_TABLET ],
			'MZ605':									[ STRINGS_MOTOROLA, 'XOOM 3G', TYPE_TABLET ],
			'MZ606':									[ STRINGS_MOTOROLA, 'XOOM WiFi', TYPE_TABLET ],
			'MZ607':									[ STRINGS_MOTOROLA, 'XOOM 2 WiFi Media Edition', TYPE_TABLET ],
			'MZ609!':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 8.2', TYPE_TABLET ],
			'MZ615':									[ STRINGS_MOTOROLA, 'XOOM 2 WiFi', TYPE_TABLET ],
			'MZ617!':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 10.1', TYPE_TABLET ],
			'WX435':									[ STRINGS_MOTOROLA, 'TRIUMPH WX435' ],
			'WX445':									[ STRINGS_MOTOROLA, 'CITRUS WX445' ],
			'XT300':									[ STRINGS_MOTOROLA, 'SPICE' ],
			'XT301':									[ STRINGS_MOTOROLA, 'MOTO XT301' ],
			'XT311':									[ STRINGS_MOTOROLA, 'FIRE' ],
			'XT316':									[ STRINGS_MOTOROLA, 'MOTO XT316' ],
			'XT319':									[ STRINGS_MOTOROLA, 'MOTO XT319' ],
			'XT3(20|21)!':								[ STRINGS_MOTOROLA, 'DEFY Mini' ],
			'XT390':									[ STRINGS_MOTOROLA, 'MOTOSMART XT390' ],
			'XT500':									[ STRINGS_MOTOROLA, 'MOTO XT500' ],
			'xt-500':									[ STRINGS_MOTOROLA, 'MOTO XT500' ],
			'XT502':									[ STRINGS_MOTOROLA, 'QUENCH XT5' ],
			'XT5(30|31)!':								[ STRINGS_MOTOROLA, 'FIRE XT' ],
			'XT532':									[ STRINGS_MOTOROLA, 'MOTO XT532' ],	
			'XT535':									[ STRINGS_MOTOROLA, 'DEFY' ],	
			'XT536':									[ STRINGS_MOTOROLA, 'DEFY Diana' ],	
			'XT550':									[ STRINGS_MOTOROLA, 'MOTOSMART MIX' ],	
			'XT5(56|57)!':								[ STRINGS_MOTOROLA, 'DEFY XT' ],	
			'XT603':									[ STRINGS_MOTOROLA, 'ADMIRAL' ],
			'XT605':									[ STRINGS_MOTOROLA, 'XT605' ],	
			'XT610':									[ STRINGS_MOTOROLA, 'Droid Pro' ],
			'XT615':									[ STRINGS_MOTOROLA, 'MOTO XT615' ],
			'XT626':									[ STRINGS_MOTOROLA, 'MOTO XT626' ],
			'XT681':									[ STRINGS_MOTOROLA, 'MOTO XT681' ],
			'XT682':									[ STRINGS_MOTOROLA, 'Droid 3' ],
			'XT685':									[ STRINGS_MOTOROLA, 'MOTO XT685' ],
			'XT687':									[ STRINGS_MOTOROLA, 'ATRIX TV' ],
			'XT701':									[ STRINGS_MOTOROLA, 'XT701' ],
			'XT702':									[ STRINGS_MOTOROLA, 'MOTO XT702' ],
			'XT711':									[ STRINGS_MOTOROLA, 'MOTO XT711' ],
			'XT720':									[ STRINGS_MOTOROLA, 'Milestone' ],
			'XT788':									[ STRINGS_MOTOROLA, 'XT788' ],
			'XT875':									[ STRINGS_MOTOROLA, 'Droid Bionic' ],
			'XT800W':									[ STRINGS_MOTOROLA, 'MOTO Glam' ],
			'XT800!':									[ STRINGS_MOTOROLA, 'MOTO XT800' ],
			'XT806':									[ STRINGS_MOTOROLA, 'MOTO XT806' ],
			'XT8(60|83)!':								[ STRINGS_MOTOROLA, 'Milestone 3' ],
			'XT862':									[ STRINGS_MOTOROLA, 'Droid 3' ],
			'XT881':									[ STRINGS_MOTOROLA, 'Electrify 2' ],
			'XT882':									[ STRINGS_MOTOROLA, 'MOTO XT882' ],
			'XT8(85|86)!':								[ STRINGS_MOTOROLA, 'RAZR V' ],
			'XT889':									[ STRINGS_MOTOROLA, 'XT889' ],
			'XT890':									[ STRINGS_MOTOROLA, 'RAZR i' ],
			'XT8(94|97)!':								[ STRINGS_MOTOROLA, 'Droid 4' ],
			'XT9(01|10)!':								[ STRINGS_MOTOROLA, 'RAZR' ],
			'XT907':									[ STRINGS_MOTOROLA, 'Droid RAZR M' ],
			'XT912!':									[ STRINGS_MOTOROLA, 'Droid RAZR' ],
			'XT9(23|25|26)!':							[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
			'XT928':									[ STRINGS_MOTOROLA, 'XT928' ],
			'201M':										[ STRINGS_MOTOROLA, 'Droid RAZR M' ],
			'Atrix 2':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
			'Atrix 4G':									[ STRINGS_MOTOROLA, 'ATRIX 4G' ],
			'Atrix 4G ME860':							[ STRINGS_MOTOROLA, 'ATRIX 4G' ],
			'CLIQ':										[ STRINGS_MOTOROLA, 'CLIQ' ],
			'CLIQ XT':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
			'CLIQ2':									[ STRINGS_MOTOROLA, 'CLIQ 2' ],
			'Corvair':									[ STRINGS_MOTOROLA, 'Corvair', TYPE_TABLET ],
			'DEFY':										[ STRINGS_MOTOROLA, 'DEFY' ],
			'Defy(\\+| Plus)!':							[ STRINGS_MOTOROLA, 'DEFY+' ],
			'Dext':										[ STRINGS_MOTOROLA, 'Dext' ],
			'Droid':									[ STRINGS_MOTOROLA, 'Droid' ],
			'DROID':									[ STRINGS_MOTOROLA, 'Droid' ],
			'DROID ?2!':								[ STRINGS_MOTOROLA, 'Droid 2' ],
			'DROID ?3!':								[ STRINGS_MOTOROLA, 'Droid 3' ],
			'DROID ?4!':								[ STRINGS_MOTOROLA, 'Droid 4' ],
			'DROID BIONIC!':							[ STRINGS_MOTOROLA, 'Droid Bionic' ],
			'DROID RAZR HD!':							[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
			'DROID ?RAZR!':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
			'DROID SPYDER':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
			'DROID ?X2!':								[ STRINGS_MOTOROLA, 'Droid X2' ],
			'DROID ?X!':								[ STRINGS_MOTOROLA, 'Droid X' ],
			'Devour':									[ STRINGS_MOTOROLA, 'Droid Devour' ],
			'calgary':									[ STRINGS_MOTOROLA, 'Droid Devour' ],
			'Electrify':								[ STRINGS_MOTOROLA, 'Electrify' ],
			'Milestone XT720':							[ STRINGS_MOTOROLA, 'Milestone' ],
			'Milestone':								[ STRINGS_MOTOROLA, 'Milestone' ],
			'A853 Milestone':							[ STRINGS_MOTOROLA, 'Milestone' ],
			'Milestone X':								[ STRINGS_MOTOROLA, 'Milestone X' ],
			'Milestone X2':								[ STRINGS_MOTOROLA, 'Milestone X2' ],
			'MotoroiX':									[ STRINGS_MOTOROLA, 'Droid X' ],
			'Moto Backflip':							[ STRINGS_MOTOROLA, 'BACKFLIP' ],
			'RAZR':										[ STRINGS_MOTOROLA, 'RAZR' ],
			'Triumph':									[ STRINGS_MOTOROLA, 'TRIUMPH' ],
			'Opus One':									[ STRINGS_MOTOROLA, 'i1' ],
			'Photon':									[ STRINGS_MOTOROLA, 'PHOTON' ],
			'Photon 4G':								[ STRINGS_MOTOROLA, 'PHOTON 4G' ],
			'XOOM':										[ STRINGS_MOTOROLA, 'XOOM', TYPE_TABLET ],
			'XOOM 2!':									[ STRINGS_MOTOROLA, 'XOOM 2', TYPE_TABLET ],
			'XOOM MZ606':								[ STRINGS_MOTOROLA, 'XOOM WiFi', TYPE_TABLET ],
			'ISW11M':									[ STRINGS_MOTOROLA, 'PHOTON' ],
			'IS12M':									[ STRINGS_MOTOROLA, 'RAZR' ],
			'MOTWX435KT':								[ STRINGS_MOTOROLA, 'TRIUMPH' ],
			'X3-Ice MIUI XT720 Memorila Classics':		[ STRINGS_MOTOROLA, 'Milestone' ],
			'NABI-A':									[ 'Nabi', 'Kids tablet', TYPE_TABLET ],
			'Newpad':									[ 'Newsmy', 'Newpad', TYPE_TABLET ],
			'Newpad-K97':								[ 'Newsmy', 'Newpad K97', TYPE_TABLET ],
			'Newpad P9':								[ 'Newsmy', 'Newpad P9', TYPE_TABLET ],
			'M-PAD N8':									[ 'Newsmy', 'M-pad N8', TYPE_TABLET ],
			'LT-NA7':									[ 'NEC', 'LT-NA7' ],
			'N-01D':									[ 'NEC', 'MEDIAS PP N-01D' ],
			'N-04C':									[ 'NEC', 'MEDIAS N-04C' ],
			'N-04D':									[ 'NEC', 'MEDIAS LTE N-04D' ],
			'N-05D':									[ 'NEC', 'MEDIAS ES N-05D' ],
			'N-06C':									[ 'NEC', 'MEDIAS WP N-06C' ],
			'N-06D':									[ 'NEC', 'MEDIAS Tab N-06D', TYPE_TABLET ],
			'N-07D':									[ 'NEC', 'MEDIAS X N-07D' ],
			'101N':										[ 'NEC', 'MEDIAS CH Softbank 101N' ],
			'IS11N':									[ 'NEC', 'MEDIAS BR IS11N' ],
			'Nexian NX-A890':							[ 'Nexian', 'Journey' ],
			'NX-A891':									[ 'Nexian', 'Ultra Journey' ],
			'M726HC':									[ 'Nextbook', 'Premium 7', TYPE_EREADER ],
			'Next7P12':									[ 'Nextbook', 'Premium 7', TYPE_EREADER ],
			'NXM726HN':									[ 'Nextbook', 'Premium 7', TYPE_EREADER ],
			'NXM727KC!':								[ 'Nextbook', 'Premium 7', TYPE_EREADER ],
			'NXM803HD':									[ 'Nextbook', 'Premium 8', TYPE_EREADER ],
			'DATAM803HC':								[ 'Nextbook', 'Premium 8', TYPE_EREADER ],
			'NXM901':									[ 'Nextbook', 'Next 3', TYPE_EREADER],
			'NGM Vanity Smart':							[ 'NGM', 'Vanity Smart' ],
			'Nokia N9':									[ 'Nokia', 'N9' ],
			'Nokia N900':								[ 'Nokia', 'N900' ],
			'Lumia800':									[ 'Nokia', 'Lumia 800' ],
			'Lumia 900':								[ 'Nokia', 'Lumia 900' ],
			'Notion Ink ADAM':							[ 'Notion Ink', 'ADAM', TYPE_TABLET ],
			'Adam':										[ 'Notion Ink', 'ADAM', TYPE_TABLET ],
			'P4D Sirius':								[ 'Nvsbl', 'P4D SIRIUS', TYPE_TABLET ],
			'EFM710A':									[ 'Oblio', 'Mint 7x', TYPE_TABLET ],
			'ODYS-Xpress':								[ 'Odys', 'Xpress', TYPE_TABLET ],
			'Olivetti Olipad 100':						[ 'Olivetti', 'Olipad 100', TYPE_TABLET ],
			'OP110':									[ 'Olivetti', 'Olipad 110', TYPE_TABLET ],
			'ONDA MID':									[ 'Onda', 'MID', TYPE_TABLET ],
			'VX580A':									[ 'Onda', 'VX580A', TYPE_TABLET ],
			'VX610A':									[ 'Onda', 'VX610A', TYPE_TABLET ],
			'TQ150':									[ 'Onda', 'TQ150' ],
			'N2T':										[ 'ONN', 'N2T', TYPE_TABLET ],
			'Renesas!':									[ 'Opad', 'Renesas', TYPE_TABLET ],
			'X903':										[ 'Oppo', 'Find Me X903' ],
			'X905':										[ 'Oppo', 'Find 3 X905' ],
			'OPPOX905':									[ 'Oppo', 'Find 3 X905' ],
			'X907':										[ 'Oppo', 'Finder X907' ],
			'OPPOX907':									[ 'Oppo', 'Finder X907' ],
			'X9015':									[ 'Oppo', 'Find X9015' ],
			'OPPOX9015':								[ 'Oppo', 'Find X9015' ],
			'OPPOX9017':								[ 'Oppo', 'Finder X9017' ],
			'R801':										[ 'Oppo', 'Real R801' ],
			'OPPOR801':									[ 'Oppo', 'Real R801' ],
			'OPPOR805':									[ 'Oppo', 'Real R805' ],
			'OPPOR807':									[ 'Oppo', 'Real R807' ],
			'OPPOR817':									[ 'Oppo', 'Real R817' ],
			'OPPOT29':									[ 'Oppo', 'T29' ],
			'OPPOT703':									[ 'Oppo', 'T703' ],
			'OPPOU701':									[ 'Oppo', 'Ulike U701' ],
			'OPPOU7011':								[ 'Oppo', 'Find Gemini U7011' ],
			'P-01D':									[ 'Panasonic', 'P-01D' ],
			'P-02D':									[ 'Panasonic', 'Lumix Phone' ],
			'P-04D':									[ 'Panasonic', 'Eluga' ],
			'P-06D':									[ 'Panasonic', 'Eluga V' ],
			'P-07C':									[ 'Panasonic', 'P-07C' ],
			'dL1':										[ 'Panasonic', 'Eluga dL1' ],
			'101P':										[ 'Panasonic', 'Lumix Phone' ],
			'JT-H580VT':								[ 'Panasonic', 'BizPad 7', TYPE_TABLET ],
			'JT-H581VT':								[ 'Panasonic', 'BizPad 10', TYPE_TABLET ],
			'FZ-A1A':									[ 'Panasonic', 'Toughpad', TYPE_TABLET ],
			'pandigital9hr':							[ 'Pandigital', '9HR', TYPE_TABLET ],
			'pandigital9hr2':							[ 'Pandigital', '9HR2', TYPE_TABLET ],
			'pandigitalopc1':							[ 'Pandigital', 'OPC1', TYPE_TABLET ],
			'pandigitalopp1':							[ 'Pandigital', 'OPP1', TYPE_TABLET ],
			'pandigitalp1hr':							[ 'Pandigital', 'p1hr', TYPE_TABLET ],
			'IM-A600!':									[ STRINGS_PANTECH, 'SIRIUS α' ],
			'IM-A630!':									[ STRINGS_PANTECH, 'Izar' ],
			'IM-A650!':									[ STRINGS_PANTECH, 'Vega' ],
			'IM-A690!':									[ STRINGS_PANTECH, 'Mirach' ],
			'IM-A7(10|20)!':							[ STRINGS_PANTECH, 'VegaXpress' ],
			'IM-A725!':									[ STRINGS_PANTECH, 'Vega X+' ],
			'IM-A730!':									[ STRINGS_PANTECH, 'Vega S' ],
			'IM-A7(40|50)!':							[ STRINGS_PANTECH, 'Mirach A' ],
			'IM-A7(60|70|75|80)!':						[ STRINGS_PANTECH, 'Vega Racer' ],
			'IM-A800!':									[ STRINGS_PANTECH, 'Vega LTE' ],
			'IM-A810!':									[ STRINGS_PANTECH, 'Vega LTE M' ],
			'IM-A820!':									[ STRINGS_PANTECH, 'Vega LTE EX' ],
			'IM-A830!':									[ STRINGS_PANTECH, 'Vega Racer 2' ],
			'IM-A840!':									[ STRINGS_PANTECH, 'Vega S5' ],
			'IM-A850!':									[ STRINGS_PANTECH, 'Vega R3' ],
			'IM-T100K':									[ STRINGS_PANTECH, 'Vega N˚ 5', TYPE_TABLET ],
			'IS06':										[ STRINGS_PANTECH, 'SIRIUS α' ],
			'ADR8995!':									[ STRINGS_PANTECH, 'Breakout' ],
			'ADR910L 4G':								[ STRINGS_PANTECH, 'Marauder' ],
			'ADR930L 4G':								[ STRINGS_PANTECH, 'ADR930L' ],
			'PantechP4100':								[ STRINGS_PANTECH, 'Element', TYPE_TABLET ],
			'PantechP8000':								[ STRINGS_PANTECH, 'Crossover' ],
			'PantechP8010':								[ STRINGS_PANTECH, 'Flex' ],
			'PantechP9060':								[ STRINGS_PANTECH, 'Pocket' ],
			'PantechP9070':								[ STRINGS_PANTECH, 'Burst' ],
			'PantechP9090':								[ STRINGS_PANTECH, 'Magnus' ],
			'SKY IM-A600S':								[ STRINGS_PANTECH, 'SIRIUS α' ],
			'SKY IM-A630K':								[ STRINGS_PANTECH, 'Izar' ],
			'SKY IM-A650S':								[ STRINGS_PANTECH, 'Vega' ],
			'IS11PT':									[ STRINGS_PANTECH, 'Mirach IS11PT' ],
			'PAT712W':									[ 'Perfeo', 'PAT712W', TYPE_TABLET ],
			'X7G':										[ 'Pearl', 'Touchlet X7G', TYPE_TABLET ],
			'FWS810':									[ 'PHICOMM', 'FWS810' ],
			'Philips PI5000':							[ 'Philips', 'PI5000', TYPE_TABLET ],
			'PI7000':									[ 'Philips', 'PI7000', TYPE_TABLET ],
			'Philips W626':								[ 'Philips', 'W626' ],
			'Philips W632':								[ 'Philips', 'W632' ],
			'MOMO':										[ 'Ployer', 'MOMO', TYPE_TABLET ],
			'MOMO7':									[ 'Ployer', 'MOMO7', TYPE_TABLET ],
			'MOMO8':									[ 'Ployer', 'MOMO8', TYPE_TABLET ],
			'MOMO9':									[ 'Ployer', 'MOMO9', TYPE_TABLET ],
			'MOMO15':									[ 'Ployer', 'MOMO15', TYPE_TABLET ],
			'PocketBook A7':							[ 'PocketBook', 'A7', TYPE_TABLET ],
			'PocketBook A10':							[ 'PocketBook', 'A10', TYPE_TABLET ],
			'Mobii 7':									[ 'Point Of View', 'Mobii 7', TYPE_TABLET ],
			'PMID4311':									[ 'Polaroid', 'PMID 4311', TYPE_TABLET ],
			'PMP3384BRU':								[ 'Prestigio', 'Multipad 3384', TYPE_TABLET ],
			'TB07FTA':									[ 'Positivo', 'TB07FTA', TYPE_TABLET ],
			'QW TB-1207':								[ 'Qware', 'Pro3', TYPE_TABLET ],
			'W6HD ICS':									[ 'Ramos', 'W6HD', TYPE_TABLET ],
			'W10':										[ 'Ramos', 'W10', TYPE_TABLET ],
			'W10 V2.0':									[ 'Ramos', 'W10 v2.0', TYPE_TABLET ],
			'W22PRO':									[ 'Ramos', 'W22 Pro', TYPE_TABLET ],
			'T11AD!':									[ 'Ramos', 'T11AD', TYPE_TABLET ],
			'Rikomagic MK802':							[ 'Rikomagic', 'MK802', TYPE_TELEVISION ],
			'PlayBook':									[ 'RIM', 'BlackBerry PlayBook', TYPE_TABLET ],
			'RBK-490':									[ 'Ritmix', 'RBK-490', TYPE_TABLET ],
			'A8HD':										[ 'Saayi', 'Dropad A8HD', TYPE_TABLET ],
			'GT-B5330!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Chat' ],
			'GT-B5510!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro' ],
			'GT-B5512!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro Duos' ],
			'GT-B7510!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pro' ],
			'GT-B9062':									[ STRINGS_SAMSUNG, 'GT-B9062' ],
			'GT-I55(00|03|08)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
			'GT-I5510!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 551' ],
			'GT-I5700!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Spica' ],
			'GT-I58(00|01)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Apollo' ],
			'GT-I6500!':								[ STRINGS_SAMSUNG, 'Saturn' ],
			'GT-I777!':									[ STRINGS_SAMSUNG, 'Singa' ],
			'GT-I8000!':								[ STRINGS_SAMSUNG, 'Omnia 2' ],
			'GT-I8150!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' W' ],
			'GT-I8160!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace 2' ],
			'GT-I8190!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III Mini' ],
			'GT-I8250!':								[ STRINGS_SAMSUNG, 'GT-I8250' ],
			'GT-I8320!':								[ STRINGS_SAMSUNG, 'H1' ],
			'GT-I85(20|30)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Beam' ],
			'GT-I90(00|08|88)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'GT-I9001!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Plus' ],
			'GT-I9003!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' SL' ],
			'GT-I9010!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Giorgio Armani' ],
			'GT-I9018!':								[ STRINGS_SAMSUNG, 'GT-I9018' ],
			'GT-I9050!':								[ STRINGS_SAMSUNG, 'GT-I9050' ],
			'GT-I9070!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Advance' ],
			'GT-I91(00|08)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'GT-I9103!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' R' ],
			'GT-I9210!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
			'GT-I92(20|28)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'GT-I9250!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'GT-I93(00|03|05|08)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'GT-I9500!':								[ STRINGS_SAMSUNG, 'GT-I9500' ],
			'GT-I9800!':								[ STRINGS_SAMSUNG, 'GT-I9800' ],
			'GT-N70(00|05)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'GT-N71(00|05)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'GT-N80(00|05|10|13)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note 10.1' ],
			'GT-P10(00|10)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', TYPE_TABLET ],
			'GT-P31(00|10|13)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', TYPE_TABLET ],
			'GT-P51(00|10|13)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (10.1)', TYPE_TABLET ],
			'GT-P62(00|10)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', TYPE_TABLET ],
			'GT-P62(01|11)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus N', TYPE_TABLET ],
			'GT-P68(00|10)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', TYPE_TABLET ],
			'GT-P7100!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1V', TYPE_TABLET ],
			'GT-P73(00|10|20)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', TYPE_TABLET ],
			'GT-P75(00|10)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', TYPE_TABLET ],
			'GT-P75(01|11)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1N', TYPE_TABLET ],
			'GT-S5300!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pocket' ],
			'GT-S5302!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pocket Duos' ],
			'GT-S53(60|63|69)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
			'GT-S5367!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y TV' ],
			'GT-S5368!':								[ STRINGS_SAMSUNG, 'GT-S5368' ],
			'GT-S55(70|78)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
			'GT-S5660!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
			'GT-S5670!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Fit' ],
			'GT-S5690!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Xcover' ],
			'GT-S58(20|30|38|39)!':						[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
			'GT-S6102!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Duos' ],
			'GT-S6352':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Duos' ],
			'GT-S6358':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
			'GT-S6500!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini 2' ],
			'GT-S6702!':								[ STRINGS_SAMSUNG, 'GT-S6702' ],
			'GT-S6802!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Duos' ],
			'GT-S7500!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Plus' ],
			'GT-S7562!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Duos' ],
			'GT-T959!':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Vibrant' ],
			'SCH-i509':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
			'SCH-i559':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pop' ],
			'SCH-i569':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
			'SCH-i579':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
			'SCH-i589':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Duos' ],
			'SCH-i705!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', TYPE_TABLET ],
			'SCH-i809':									[ STRINGS_SAMSUNG, 'SCH-i809' ],
			'SCH-i889':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'SCH-i909':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'SCH-i919':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Duos' ],
			'SCH-i929':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Duos' ],
			'SCH-I100':									[ STRINGS_SAMSUNG, 'Gem' ],
			'SCH-I110':									[ STRINGS_SAMSUNG, 'Illusion' ],
			'SCH-I200':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Stellar' ],
			'SCH-I339':									[ STRINGS_SAMSUNG, 'SCH-I339' ],
			'SCH-I400':									[ STRINGS_SAMSUNG, 'Continuum' ],
			'SCH-I405( 4G)?$!':							[ STRINGS_SAMSUNG, 'Stratosphere' ],
			'SCH-I405U':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Metrix' ],
			'SCH-I500':									[ STRINGS_SAMSUNG, 'Fascinate' ],
			'SCH-I510':									[ STRINGS_SAMSUNG, 'Stealth V' ],
			'SCH-I510 4G':								[ STRINGS_SAMSUNG, 'Droid Charge' ],
			'SCH-I515':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'SCH-I535!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SCH-I605':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SCH-I619':									[ STRINGS_SAMSUNG, 'SCH-I619' ],
			'SCH-I779':									[ STRINGS_SAMSUNG, 'SCH-I779' ],
			'SCH-I800':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', TYPE_TABLET ],
			'SCH-I815!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', TYPE_TABLET ],
			'SCH-I905!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', TYPE_TABLET ],
			'SCH-I909':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'SCH-I915':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (10.1)', TYPE_TABLET ],
			'SCH-I939':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SCH-M828!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Precedent' ],
			'SCH-N719':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SCH-R530!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SCH-R680':									[ STRINGS_SAMSUNG, 'Repp' ],
			'SCH-R720':									[ STRINGS_SAMSUNG, 'Admire' ],
			'SCH-R730':									[ STRINGS_SAMSUNG, 'Transfix' ],
			'SCH-R760':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SCH-R820':									[ STRINGS_SAMSUNG, 'Admire' ],
			'SCH-R880':									[ STRINGS_SAMSUNG, 'Acclaim' ],
			'SCH-R910':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Indulge 4G' ],
			'SCH-R915':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Indulge' ],
			'SCH-R920':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Attain 4G' ],
			'SCH-R930':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Aviator' ],
			'SCH-R940':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Lightray' ],
			'SCH-S720C':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Proclaim' ],
			'SCH-S735C':								[ STRINGS_SAMSUNG, 'SCH-S735' ],
			'SCH-S950C':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Showcase' ],
			'SCH-W899':									[ STRINGS_SAMSUNG, 'SCH-W899' ],
			'SCH-W999':									[ STRINGS_SAMSUNG, 'SCH-W999' ],
			'SGH-E258':									[ STRINGS_SAMSUNG, 'SGH-E258' ],
			'SGH-I317!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SGH-I547!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Rugby Pro' ],
			'SGH-I717!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'SGH-I727':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Skyrocket' ],
			'SGH-I727R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SGH-I7(47|48)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SGH-I757!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Skyrocket HD' ],
			'SGH-I9?777!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SGH-I8(96|97)!':							[ STRINGS_SAMSUNG, 'Captivate' ],
			'SGH-I927!':								[ STRINGS_SAMSUNG, 'Captivate Glide' ],
			'SGH-I957!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', TYPE_TABLET ],
			'SGH-I987':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', TYPE_TABLET ],
			'SGH-I997':									[ STRINGS_SAMSUNG, 'Infuse 4G' ],
			'SGH-I997R':								[ STRINGS_SAMSUNG, 'Infuse 4G' ],
			'SGH-I9000':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'SGH-S730G':								[ STRINGS_SAMSUNG, 'SGH-S730' ],
			'SGH-T499':									[ STRINGS_SAMSUNG, 'Dart' ],
			'SGH-T499[VY]!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
			'SGH-T589!':								[ STRINGS_SAMSUNG, 'Gravity Smart' ],
			'SGH-T679!':								[ STRINGS_SAMSUNG, 'Exhibit II 4G' ],
			'SGH-T699':									[ STRINGS_SAMSUNG, 'S Blaze Q' ],
			'SGH-T759':									[ STRINGS_SAMSUNG, 'Exhibit 4G' ],
			'SGH-T769':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Blaze 4G' ],
			'SGH-T839':									[ STRINGS_SAMSUNG, 'T-Mobile Sidekick' ],
			'SGH-T849':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', TYPE_TABLET ],
			'SGH-T859':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', TYPE_TABLET ],
			'SGH-T869':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', TYPE_TABLET ],
			'SGH-T879':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'SGH-T889':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SGH-T959':									[ STRINGS_SAMSUNG, 'Vibrant' ],
			'SGH-T959D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Fascinate 3G+' ],
			'SGH-T959P':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Fascinate 4G' ],
			'SGH-T959V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S 4G' ],
			'SGH-T989':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SGH-T989D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II X' ],
			'SGH-T999!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Blaze 4G' ],
			'SHV-E120!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II HD LTE' ],
			'SHV-E110!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
			'SHV-E140!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', TYPE_TABLET ],
			'SHV-E150!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', TYPE_TABLET ],
			'SHV-E160!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'SHV-E170!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' R' ],
			'SHV-E210!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SHV-E250!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SHW-M100!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' A' ],
			'SHW-M110!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'SHW-M130L!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' U' ],
			'SHW-M130K!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' K' ],
			'SHW-M1(80|85)!':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', TYPE_TABLET ],
			'SHW-M190!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Hoppin' ],
			'SHW-M220!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Neo' ],
			'SHW-M240!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
			'SHW ?-M250!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SHW-M300!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', TYPE_TABLET ],
			'SHW-M305!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', TYPE_TABLET ],
			'SHW-M340!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' M Style' ],
			'SHW-M380!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', TYPE_TABLET ],
			'SHW-M440!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SHW-M480!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note 10.1' ],
			'SMT-i9100':								[ STRINGS_SAMSUNG, 'SMT-I9100', TYPE_TABLET ],
			'SPH-D600':									[ STRINGS_SAMSUNG, 'Conquer 4G' ],
			'SPH-D700':									[ STRINGS_SAMSUNG, 'Epic 4G' ],
			'SPH-D705':									[ STRINGS_SAMSUNG, 'Epic 4G 2' ],
			'SPH-D710!':								[ STRINGS_SAMSUNG, 'Epic 4G Touch' ],
			'SPH-L700':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'SPH-L710':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'SPH-L900':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SPH-M820!':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Prevail' ],
			'SPH-M580':									[ STRINGS_SAMSUNG, 'Replenish' ],
			'SPH-M900':									[ STRINGS_SAMSUNG, 'Moment' ],
			'SPH-M910':									[ STRINGS_SAMSUNG, 'Intercept' ],
			'SPH-M920':									[ STRINGS_SAMSUNG, 'Transform' ],
			'SPH-M930!':								[ STRINGS_SAMSUNG, 'Transform Ultra' ],
			'SPH-M950':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Reverb' ],
			'SPH-P100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', TYPE_TABLET ],
			'YP-GB1':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Player', 'media' ],
			'YP-GB70':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Player 70', 'media' ],
			'YP-GB70D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Player 70 Plus', 'media' ],
			'YP-GS1':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S WiFi 3.6', 'media' ],
			'YP-G1':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S WiFi 4.0', 'media' ],
			'YP-GI1':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S WiFi 4.2', 'media' ],
			'YP-G50':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Player', 'media' ],
			'YP-G70':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S WiFi 5.0', 'media' ],
			'GT9100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'I897':										[ STRINGS_SAMSUNG, 'Captivate' ],
			'I7500':									[ STRINGS_SAMSUNG, 'Galaxy' ],
			'I9000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'T959':										[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Vibrant' ],
			'Captivate-I897':							[ STRINGS_SAMSUNG, 'Captivate' ],
			'Galaxy':									[ STRINGS_SAMSUNG, STRINGS_GALAXY ],
			'Galaxy Note':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
			'GalaxyS':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'Galaxy S II':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'Galaxy X':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' X' ],
			'Galaxy Spica':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Spica' ],
			'GALAXY Tab':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', TYPE_TABLET ],
			'Vibrantmtd':								[ STRINGS_SAMSUNG, 'Vibrant' ],
			'SC-01C':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', TYPE_TABLET ],
			'SC-01D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1 LTE', TYPE_TABLET ],
			'SC-01E':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7 Plus', TYPE_TABLET ],
			'SC-02B':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
			'SC-02C':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
			'SC-02D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', TYPE_TABLET ],
			'SC-02E':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
			'SC-03D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
			'SC-04D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
			'SC-05D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note LTE' ],
			'SC-06D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
			'ISW11SC':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II WiMAX' ],
			'A01SH':									[ STRINGS_SHARP, 'A01SH' ],
			'IS01':										[ STRINGS_SHARP, 'IS01' ],
			'IS03':										[ STRINGS_SHARP, 'IS03' ],
			'IS05':										[ STRINGS_SHARP, 'IS05' ],
			'IS11SH':									[ STRINGS_SHARP, 'Aquos IS11SH' ],
			'IS12SH':									[ STRINGS_SHARP, 'Aquos IS12SH' ],
			'IS13SH':									[ STRINGS_SHARP, 'Aquos IS13SH' ],
			'IS14SH':									[ STRINGS_SHARP, 'Aquos IS14SH' ],
			'ISW16SH':									[ STRINGS_SHARP, 'Aquos ISW16SH' ],
			'EB-W51GJ':									[ STRINGS_SHARP, 'EB-W51GJ' ],
			'SBM003SH':									[ STRINGS_SHARP, 'Galapagos' ],
			'SBM005SH':									[ STRINGS_SHARP, 'Galapagos' ],
			'SBM006SH':									[ STRINGS_SHARP, 'Aquos' ],
			'SBM007SH':									[ STRINGS_SHARP, 'Aquos 007SH' ],
			'SBM009SH':									[ STRINGS_SHARP, 'Aquos 009SH' ],
			'SBM102SH':									[ STRINGS_SHARP, 'Aquos 102SH' ],
			'SBM103SH':									[ STRINGS_SHARP, 'Aquos 103SH' ],
			'SBM104SH':									[ STRINGS_SHARP, 'Aquos 104SH' ],
			'SBM107SH':									[ STRINGS_SHARP, 'Aquos 107SH' ],
			'SBM107SHB':								[ STRINGS_SHARP, 'Aquos 107SH' ],
			'SH-01D':									[ STRINGS_SHARP, 'Aquos SH-01D' ],
			'SH-01E':									[ STRINGS_SHARP, 'Aquos si SH-01E' ],
			'SH-02D':									[ STRINGS_SHARP, 'Aquos slider SH-02D' ],
			'SH-02E':									[ STRINGS_SHARP, 'Aquos Zeta SH-02E' ],
			'SH-03C':									[ STRINGS_SHARP, 'Lynx 3D' ],
			'SH-06D':									[ STRINGS_SHARP, 'Aquos SH-06D' ],
			'SH-09D':									[ STRINGS_SHARP, 'Aquos Zeta SH-09D' ],
			'SH-10B':									[ STRINGS_SHARP, 'Lynx' ],
			'SH-12C':									[ STRINGS_SHARP, 'Aquos' ],
			'SH-13C':									[ STRINGS_SHARP, 'Aquos f SH-13C' ],
			'SH80F':									[ STRINGS_SHARP, 'Aquos SH80F' ],
			'SH530U':									[ STRINGS_SHARP, 'SH530U' ],
			'SH72x8U':									[ STRINGS_SHARP, 'SH72x8U' ],
			'SH8118U':									[ STRINGS_SHARP, 'SH8118U' ],
			'SH8128U':									[ STRINGS_SHARP, 'SH8128U' ],
			'SH8158U':									[ STRINGS_SHARP, 'SH8158U' ],
			'SH8188U':									[ STRINGS_SHARP, 'SH8188U' ],
			'SH8268U':									[ STRINGS_SHARP, 'SH8268U' ],
			'INFOBAR C01':								[ STRINGS_SHARP, 'INFOBAR C01' ],
			'SPX-5':									[ 'Simvalley', 'SPX-5' ],
			'SPX-5 3G':									[ 'Simvalley', 'SPX-5 3G' ],
			'SmartQ G7':								[ 'SmartQ', 'G7', TYPE_TABLET ],
			'SmartQT7':									[ 'SmartQ', 'T7', TYPE_TABLET ],
			'SmartQT10':								[ 'SmartQ', 'T10', TYPE_TABLET ],
			'SmartQT15':								[ 'SmartQ', 'T15', TYPE_TABLET ],
			'SmartQT19':								[ 'SmartQ', 'T19', TYPE_TABLET ],
			'SmartQT20':								[ 'SmartQ', 'T20', TYPE_TABLET ],
			'OMS1 6':									[ STRINGS_SONY_ERICSSON, 'A8i' ],
			'C1504':									[ STRINGS_SONY, 'C1504' ],
			'C65(02|03|06)!':							[ STRINGS_SONY, STRINGS_XPERIA + ' "Odin"' ],
			'E10(a|i|iv)!':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
			'E15(a|i|iv|i-o)?$!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
			'E16i!':									[ STRINGS_SONY_ERICSSON, 'W8 Walkman' ],
			'LT11i!':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
			'LT15(a|i|iv|i-o)?$!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
			'LT18(a|i|iv|i-o)?$!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
			'LT22i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' P' ],
			'LT26(i|i-o)!':								[ STRINGS_SONY, STRINGS_XPERIA + ' S' ],
			'LT26ii!':									[ STRINGS_SONY, STRINGS_XPERIA + ' SL' ],
			'LT26w!':									[ STRINGS_SONY, STRINGS_XPERIA + ' Acro S' ],
			'LT28(at|h|i)!':							[ STRINGS_SONY, STRINGS_XPERIA + ' Ion' ],
			'LT29i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' TX' ],
			'LT30(at)!':								[ STRINGS_SONY, STRINGS_XPERIA + ' TL' ],
			'LT30(a|p)!':								[ STRINGS_SONY, STRINGS_XPERIA + ' T' ],
			'MK16(a|i)!':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Pro' ],
			'MT11(a|i|iv|i-o)!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
			'MT15(a|i|iv|i-o)!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
			'MT25i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' Neo L' ],
			'MT27i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' Sola' ],
			'R800(a|at|i|iv|x)!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
			'SK17(a|i|iv|i-o)!':						[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini Pro' ],
			'ST15(a|i)!':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
			'ST17(a|i)!':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Active' ],
			'ST18(a|av|i|iv)!':							[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
			'ST21(i)?$!':								[ STRINGS_SONY, STRINGS_XPERIA + ' Tipo' ],
			'ST21(a2|i2)!':								[ STRINGS_SONY, STRINGS_XPERIA + ' Tipo Dual' ],
			'ST23i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' Miro' ],
			'ST25(a|i)!':								[ STRINGS_SONY, STRINGS_XPERIA + ' U' ],
			'ST26i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' J' ],
			'ST27i!':									[ STRINGS_SONY, STRINGS_XPERIA + ' Go' ],
			'U20(a|i|iv)!':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
			'WT13i!':									[ STRINGS_SONY_ERICSSON, 'Mix Walkman' ],
			'WT18i!':									[ STRINGS_SONY_ERICSSON, 'Walkman' ],
			'WT19(a|i|iv)!':							[ STRINGS_SONY_ERICSSON, 'Live with Walkman' ],
			'X8':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
			'X10(a|i|iv|s)?$!':							[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
			'X10 ?(Mini|Mini Pro)$!':					[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
			'Z1i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
			'S51SE':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
			'IS11S':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro' ],
			'IS12S':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro HD' ],
			'SO-01B':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
			'SO-01C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
			'SO-01D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
			'SO-01E':									[ STRINGS_SONY, STRINGS_XPERIA + ' AX' ],
			'SO-02C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro' ],
			'SO-02D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' NX' ],
			'SO-03C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
			'SO-03D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro HD' ],
			'SO-04D':									[ STRINGS_SONY, STRINGS_XPERIA + ' GX' ],
			'SO-05D':									[ STRINGS_SONY, STRINGS_XPERIA + ' SX' ],
			'Xperia X1':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X1' ],
			'Xperia X8':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
			'Xperia X10':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
			'Xperia Ray':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
			'Xperia Arc':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
			'Xperia Arc S':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
			'Xperia Mini':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
			'Xperia Neo':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
			'Xperia NeoV':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
			'Xperia Neo V':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
			'Xperia Play':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
			'Xperia Pro':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Pro' ],
			'Xperia S':									[ STRINGS_SONY, STRINGS_XPERIA + ' S' ],
			'Xperia Live with Walkman':					[ STRINGS_SONY_ERICSSON, 'Live with Walkman' ],
			'Hayabusa':									[ STRINGS_SONY, STRINGS_XPERIA + ' Ion' ],
			'Nozomi':									[ STRINGS_SONY, STRINGS_XPERIA + ' S' ],
			'Tablet P':									[ STRINGS_SONY, 'Tablet P', TYPE_TABLET ],
			'Tablet S':									[ STRINGS_SONY, 'Tablet S', TYPE_TABLET ],
			'SGPT12':									[ STRINGS_SONY, 'Tablet S', TYPE_TABLET ],
			'NWZ?-Z1000Series!':						[ STRINGS_SONY, 'Walkman Z', 'media' ],
			'Spice Mi280':								[ 'Spice', 'Mi-280' ],
			'Spice Mi300':								[ 'Spice', 'Mi-300' ],
			'Spice Mi-310':								[ 'Spice', 'Mi-310' ],
			'Spice Mi-355':								[ 'Spice', 'Mi-355' ],
			'Spice Mi-425':								[ 'Spice', 'Mi-425' ],
			'Spice Mi-500':								[ 'Spice', 'Mi-500' ],
			'SPICE Mi-720':								[ 'Spice', 'Mi-720' ],
			'A7272+':									[ 'Star', 'A7272+' ],
			'e1109 v73 gq1002 ctp':						[ 'Star', 'X18i' ],
			'TS1004T':									[ 'Surf 3Q', 'TS1004T', TYPE_TABLET ],
			'SYTABEX7-2':								[ 'Sylvania', 'SYTABEX7', TYPE_TABLET ],
			'KM-S200':									[ 'TAKE', 'Janus KM-S200' ],
			'TCL A860':									[ 'TCL', 'A860' ],
			'TCL A906':									[ 'TCL', 'A906' ],
			'TCL A909':									[ 'TCL', 'A909' ],
			'TCL A919':									[ 'TCL', 'A919' ],
			'TCL A968':									[ 'TCL', 'A968' ],
			'TCL A990':									[ 'TCL', 'A990' ],
			'TCL A996':									[ 'TCL', 'A996' ],
			'TCL A998':									[ 'TCL', 'A998' ],
			'TCL C990+':								[ 'TCL', 'C990+' ],
			'TCL GENESEE E708':							[ 'TCL', 'Genesee E708' ],
			'TCL S500':									[ 'TCL', 'S500' ],
			'(TCL )?S600!':								[ 'TCL', 'S600' ],
			'TCL S900':									[ 'TCL', 'S900' ],
			'A10t(5DM3)':								[ 'Teclast', 'A10T', TYPE_TABLET ],
			'P72':										[ 'Teclast', 'P72', TYPE_TABLET ],
			'P76TI':									[ 'Teclast', 'P76Ti', TYPE_TABLET ],
			'P81HD':									[ 'Teclast', 'P81HD', TYPE_TABLET ],
			'P85(R8A1)':								[ 'Teclast', 'P85', TYPE_TABLET ],
			'Teclast P85':								[ 'Teclast', 'P85', TYPE_TABLET ],
			'T720 SE':									[ 'Teclast', 'T720', TYPE_TABLET ],
			'T760 from moage.com':						[ 'Teclast', 'T760', TYPE_TABLET ],
			'tegav2':									[ 'Tegatech', 'TEGA v2', TYPE_TABLET ],
			'TM-7025':									[ 'teXet', 'TM-7025', TYPE_TABLET ],
			'MoFing':									[ 'Thomson', 'MoFing', TYPE_TABLET ],
			'Ultimate10':								[ 'Tomtec', 'Ultimate10', TYPE_TABLET ],
			'ThL V7':									[ 'THL', 'V7' ],
			'ThL V8':									[ 'THL', 'V8' ],
			'ThL V9':									[ 'THL', 'V9' ],
			'ThL V11':									[ 'THL', 'V11' ],
			'TSB CLOUD COMPANION;TOSHIBA AC AND AZ':	[ STRINGS_TOSHIBA, 'Dynabook AZ', 'desktop' ],
			'TOSHIBA AC AND AZ':						[ STRINGS_TOSHIBA, 'Dynabook AZ', 'desktop' ],
			'TOSHIBA FOLIO AND A':						[ STRINGS_TOSHIBA, 'Folio 100', TYPE_TABLET ],
			'T-01C':									[ STRINGS_TOSHIBA, 'Regza T-01C' ],
			'T-01D':									[ STRINGS_TOSHIBA, 'Regza T-01D' ],
			'T-02D':									[ STRINGS_TOSHIBA, 'Regza T-02D' ],
			'IS04':										[ STRINGS_TOSHIBA, 'Regza IS04' ],
			'IS11T':									[ STRINGS_TOSHIBA, 'Regza IS11T' ],
			'AT1S0':									[ STRINGS_TOSHIBA, 'Regza AT1S0' ],
			'Tostab03':									[ STRINGS_TOSHIBA, 'Regza AT100', TYPE_TABLET ],
			'AT100':									[ STRINGS_TOSHIBA, 'Regza AT100', TYPE_TABLET ],
			'AT200':									[ STRINGS_TOSHIBA, 'Regza AT200', TYPE_TABLET ],
			'AT300':									[ STRINGS_TOSHIBA, 'Regza AT300', TYPE_TABLET ],
			'AT470':									[ STRINGS_TOSHIBA, 'Regza AT470', TYPE_TABLET ],
			'AT570':									[ STRINGS_TOSHIBA, 'Regza AT570', TYPE_TABLET ],
			'AT830':									[ STRINGS_TOSHIBA, 'Regza AT830', TYPE_TABLET ],
			'Folio 100':								[ STRINGS_TOSHIBA, 'Folio 100', TYPE_TABLET ],
			'folio100':									[ STRINGS_TOSHIBA, 'Folio 100', TYPE_TABLET ],
			'THRiVE':									[ STRINGS_TOSHIBA, 'THRiVE', TYPE_TABLET ],
			'Fantastic T3':								[ 'TWM', 'Fantastic T3' ],
			'M70014':									[ 'United Star Technology', 'M70014', TYPE_TABLET ],
			'PS47':										[ 'Velocity Micro', 'Cruz PS47', TYPE_TABLET ],
			'T301':										[ 'Velocity Micro', 'Cruz T301', TYPE_TABLET ],
			'Vibo-A688':								[ 'FIH', 'Vibo A688' ],
			'Videocon-V7500':							[ 'Videocon', 'V7500' ],
			'GTablet':									[ 'ViewSonic', 'gTablet', TYPE_TABLET ],
			'GtabComb':									[ 'ViewSonic', 'gTablet', TYPE_TABLET ],
			'TeamDRH ICS for GTablet':					[ 'ViewSonic', 'gTablet', TYPE_TABLET ],
			'ViewPad7':									[ 'ViewSonic', 'ViewPad 7', TYPE_TABLET ],
			'ViewPad 10e':								[ 'ViewSonic', 'ViewPad 10e', TYPE_TABLET ],
			'VTAB1008':									[ 'Vizio', 'VTAB1008', TYPE_TABLET ],
			'VTAB3010':									[ 'Vizio', 'VTAB3010', TYPE_TABLET ],
			'VOTO W5300':								[ 'VOTO', 'W5300' ],
			'xPAD-70':									[ 'WayteQ', 'xPAD-70', TYPE_TABLET ],
			'xTAB-70':									[ 'WayteQ', 'xTAB-70', TYPE_TABLET ],
			'WellcoM-A99':								[ 'WellcoM', 'A99' ],
			'N12':										[ 'Window', 'N12', TYPE_TABLET ],
			'N12R':										[ 'Window', 'N12R', TYPE_TABLET ],
			'N50':										[ 'Window', 'N50', TYPE_TABLET ],
			'N50DT':									[ 'Window', 'N50DT', TYPE_TABLET ],
			'N50GT':									[ 'Window', 'N50GT', TYPE_TABLET ],
			'N50GT A':									[ 'Window', 'N50GT-A', TYPE_TABLET ],
			'N70':										[ 'Window', 'N70', TYPE_TABLET ],
			'N70 DUAL CORE':							[ 'Window', 'N70 Dual Core', TYPE_TABLET ],
			'N80':										[ 'Window', 'N80', TYPE_TABLET ],
			'N90':										[ 'Window', 'N90', TYPE_TABLET ],
			'N90 DUAL CORE2!':							[ 'Window', 'N90 Dual Core', TYPE_TABLET ],
			'N101 DUAL CORE2!':							[ 'Window', 'N101 Dual Core', TYPE_TABLET ],
			'N612':										[ 'Wishway', 'N612' ],
			'AT-AS43D':									[ 'Wolfgang', 'AT-AS43D' ],
			'M12':										[ 'Wopad', 'M12', TYPE_TABLET ],
			'WM8650':									[ 'WonderMedia', 'WM8650', TYPE_TABLET ],
			'MI-ONE':									[ 'Xiaomi', 'MI-ONE' ],
			'MI 1S':									[ 'Xiaomi', 'MI-ONE S' ],
			'MI 1SC':									[ 'Xiaomi', 'MI-ONE SC' ],
			'MI-ONE C1':								[ 'Xiaomi', 'MI-ONE C1' ],
			'MI-ONE Plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
			'mione plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
			'MI-TWO':									[ 'Xiaomi', 'MI-TWO' ],
			'Q07CL01':									[ 'XVision', 'Q07', TYPE_TABLET ],
			'N6':										[ 'Yarvik', '210 Tablet', TYPE_TABLET ],
			'EMR1879':									[ 'Yidong', 'EMR1879', TYPE_TABLET ],
			'yusun W702':								[ 'Yusun', 'W702' ],
			'YX-YUSUN E80':								[ 'Yusun', 'E80' ],
			'zt180':									[ 'Zenithink', 'ZT-180', TYPE_TABLET ],
			'Jaguar7':									[ 'ZiiLabs', 'Jaguar 7', TYPE_TABLET ],
			'Ziss Ranger HD':							[ 'Ziss', 'Ranger HD' ],
			'ZTE Libra':								[ STRINGS_ZTE, 'Libra' ],
			'ZTE T T9':									[ STRINGS_ZTE, 'Light Tab T9', TYPE_TABLET ],
			'V9':										[ STRINGS_ZTE, 'Light Tab V9', TYPE_TABLET ],
			'V9e+':										[ STRINGS_ZTE, 'Light Tab 2', TYPE_TABLET ],
			'V9A':										[ STRINGS_ZTE, 'Light Tab 2', TYPE_TABLET ],
			'Light Tab 2W':								[ STRINGS_ZTE, 'Light Tab 2', TYPE_TABLET ],
			'Light Tab 2':								[ STRINGS_ZTE, 'Light Tab 2', TYPE_TABLET ],
			'V9C':										[ STRINGS_ZTE, 'Light Tab 3', TYPE_TABLET ],
			'V55':										[ STRINGS_ZTE, 'Optik', TYPE_TABLET ],
			'Acqua':									[ STRINGS_ZTE, 'Acqua' ],
			'ZTE Blade':								[ STRINGS_ZTE, 'Blade' ],
			'a5':										[ STRINGS_ZTE, 'Blade' ],
			'Blade S':									[ STRINGS_ZTE, 'Blade S' ],			
			'Skate':									[ STRINGS_ZTE, 'Skate' ],
			'ZTE Skate':								[ STRINGS_ZTE, 'Skate' ],
			'X500':										[ STRINGS_ZTE, 'X500 Score' ],
			'ZTE X500':									[ STRINGS_ZTE, 'X500 Score' ],
			'ZTE C X500':								[ STRINGS_ZTE, 'X500 Score' ],
			'ZTE C N600!':								[ STRINGS_ZTE, 'N600' ],
			'ZTE C N606':								[ STRINGS_ZTE, 'N606' ],
			'ZTE C N700':								[ STRINGS_ZTE, 'N700' ],
			'ZTE U N720':								[ STRINGS_ZTE, 'N720' ],
			'ZTE C R750':								[ STRINGS_ZTE, 'R750' ],
			'ZTE C N760':								[ STRINGS_ZTE, 'N760' ],
			'ZTE V768':									[ STRINGS_ZTE, 'V768 Concord' ],
			'ZTE N788':									[ STRINGS_ZTE, 'N788' ],
			'ZTE V788!':								[ STRINGS_ZTE, 'V788 Kis' ],
			'ZTE U788!':								[ STRINGS_ZTE, 'U788 Kis' ],
			'ZTE U795':									[ STRINGS_ZTE, 'U795' ],
			'ZTE T U802':								[ STRINGS_ZTE, 'U802' ],
			'RacerII':									[ STRINGS_ZTE, 'U806 Racer II' ],
			'ZTE T U806':								[ STRINGS_ZTE, 'U806 Racer II' ],
			'E810':										[ STRINGS_ZTE, 'E810' ],
			'ZTE T U812':								[ STRINGS_ZTE, 'U812' ],
			'ZTE GV821':								[ STRINGS_ZTE, 'V821' ],
			'ZTE T U830':								[ STRINGS_ZTE, 'U830' ],		
			'ZTE Racer':								[ STRINGS_ZTE, 'X850 Racer' ],
			'MTC 916':									[ STRINGS_ZTE, 'X850 Racer' ],
			'Racer':									[ STRINGS_ZTE, 'X850 Racer' ],
			'ZTE U X850':								[ STRINGS_ZTE, 'X850 Racer' ],
			'ZTE U V852':								[ STRINGS_ZTE, 'V852 Dreamer' ],
			'ZTE N855D':								[ STRINGS_ZTE, 'N855D' ],
			'ZTE U V856':								[ STRINGS_ZTE, 'V856 Mimosa Mini' ],
			'ZTE V856':									[ STRINGS_ZTE, 'V856 Mimosa Mini' ],
			'ZTE U V857':								[ STRINGS_ZTE, 'V857' ],
			'N860':										[ STRINGS_ZTE, 'N860 Warp' ],
			'ZTE U? X876!':								[ STRINGS_ZTE, 'X876 Raise' ],
			'ZTE V877!':								[ STRINGS_ZTE, 'V877' ],
			'N880':										[ STRINGS_ZTE, 'N880 Blade' ],
			'ZTE C N880!':								[ STRINGS_ZTE, 'N880 Blade' ],
			'U880':										[ STRINGS_ZTE, 'U880 Blade' ],
			'ZTE ?U880!':								[ STRINGS_ZTE, 'U880 Blade' ],
			'ZTE T ?U880!':								[ STRINGS_ZTE, 'U880 Blade' ],
			'V880':										[ STRINGS_ZTE, 'V880 Blade' ],
			'ZTE (U )?V880!':							[ STRINGS_ZTE, 'V880 Blade' ],
			'ZTE U(V)880+':								[ STRINGS_ZTE, 'V880 Blade' ],
			'Blade(-V880|-opda)?$!':					[ STRINGS_ZTE, 'V880 Blade' ],
			'ZTE N880E':								[ STRINGS_ZTE, 'N880E' ],
			'ZTE N882E':								[ STRINGS_ZTE, 'N882E' ],
			'BLADEII':									[ STRINGS_ZTE, 'V881 Blade II' ],
			'Blade2':									[ STRINGS_ZTE, 'V881 Blade II' ],
			'ZTE U V881':								[ STRINGS_ZTE, 'V881 Blade II' ],			
			'ZTE ?U885!':								[ STRINGS_ZTE, 'U885' ],
			'ZTE V889!':								[ STRINGS_ZTE, 'V889' ],
			'ZTE T ?U900!':								[ STRINGS_ZTE, 'U900' ],	
			'ZTE N910':									[ STRINGS_ZTE, 'N910 Anthem' ],
			'ZTE C X920':								[ STRINGS_ZTE, 'X920' ],
			'ZXY-ZTE-C X920':							[ STRINGS_ZTE, 'X920' ],
			'ZTE U930':									[ STRINGS_ZTE, 'U930 Grand X' ],
			'ZTE Grand X':								[ STRINGS_ZTE, 'U930 Grand X' ],
			'Grand X In':								[ STRINGS_ZTE, 'U930 Grand X' ],
			'ZTE (U )?V960!':							[ STRINGS_ZTE, 'V960 Skate' ],
			'ZTE T ?U960!':								[ STRINGS_ZTE, 'U960 Skate' ],
			'ZTE U960s2':								[ STRINGS_ZTE, 'U960s2' ],
			'ZTE N970':									[ STRINGS_ZTE, 'N970 Grand X' ],
			'ZTE U970':									[ STRINGS_ZTE, 'U970 Grand X' ],
			'ZTE V970':									[ STRINGS_ZTE, 'Z970 Grand X' ],
			'ZTE U985':									[ STRINGS_ZTE, 'U985 Grand Era' ],
			'ZTE Roamer':								[ STRINGS_ZTE, 'Z990 Roamer ' ],
			'ZTE Z990!':								[ STRINGS_ZTE, 'Z990 Roamer' ],
			'003Z':										[ STRINGS_ZTE, 'Softbank 003Z' ],
			'008Z':										[ STRINGS_ZTE, 'Softbank 008Z' ],
			'009Z':										[ STRINGS_ZTE, 'Softbank Star7' ],
			'ZP100':									[ 'Zopo', 'ZP100' ],
			'ZP300':									[ 'Zopo', 'ZP300' ],
			'ZP500':									[ 'Zopo', 'ZP500' ],
	
			/* Telecom provider branded devices */
			'i-mobile i691':							[ 'i-Mobile', 'i691' ],
			'i-mobile i695':							[ 'i-Mobile', 'i695' ],
			'i-mobile i858':							[ 'i-Mobile', 'i858' ],
			'i-mobile 3G 8500':							[ 'i-Mobile', '3G 8500' ],
			'i-mobile i-style 3':						[ 'i-Mobile', 'i-Style 3' ],	
			'i-mobile i-style Q1':						[ 'i-Mobile', 'i-Style Q1' ],						
			'i-mobile i-STYLE Q2':						[ 'i-Mobile', 'i-Style Q2' ],			
			'i-mobile i-STYLE Q2 DUO':					[ 'i-Mobile', 'i-Style Q2 Duo' ],	
			'i-mobile i-STYLE Q6':						[ 'i-Mobile', 'i-Style Q6' ],						
			'i-mobile I-Note':							[ 'i-Mobile', 'i-Note', TYPE_TABLET ],
	
			'Optimus Boston':							[ 'Optimus', 'Boston' ],							/* Gigabyte GSmart G1305 */
			'Optimus San Francisco':					[ 'Optimus', 'San Francisco' ],						/* ZTE Blade */
			'Optimus Monte Carlo':						[ 'Optimus', 'Monte Carlo' ],						/* ZTE Skate */
			
			'Orange Boston':							[ 'Orange', 'Boston' ],								/* Gigabyte GSmart G1305 */
			'Orange Monte Carlo':						[ 'Orange', 'Monte Carlo' ],						/* ZTE Skate */
			'San Francisco':							[ 'Orange', 'San Francisco' ],						/* ZTE Blade */
			'San Francisco for Orange':					[ 'Orange', 'San Francisco' ],						/* ZTE Blade */
			'Orange San Francisco':						[ 'Orange', 'San Francisco' ],						/* ZTE Blade */
			
			'MOVE':										[ 'T-Mobile', 'MOVE' ],								/* Alcatel One Touch 908 */
			'T-Mobile G1':								[ 'T-Mobile', 'G1' ],								/* HTC Dream */
			'T-Mobile G2':								[ 'T-Mobile', 'G2' ],								/* HTC Desire Z */
			'T-Mobile G2 Touch':						[ 'T-Mobile', 'G2' ],								/* HTC Desire Z */
			'LG-P999':									[ 'T-Mobile', 'G2x' ],								/* LG Optimus 2X */
			'LG-E739':									[ 'T-Mobile', 'myTouch' ],							/* LG E739 */
			'T-Mobile myTouch 3G':						[ 'T-Mobile', 'myTouch 3G'],						/* HTC Magic */
			'T-Mobile myTouch 3G Slide':				[ 'T-Mobile', 'myTouch 3G Slide' ],					/* HTC Espresso */
			'T-Mobile Espresso':						[ 'T-Mobile', 'myTouch 3G Slide' ],					/* HTC Espresso */
			'HTC myTouch 3G Slide':						[ 'T-Mobile', 'myTouch 3G Slide' ],					/* HTC Espresso */
			'T-Mobile myTouch 4G':						[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
			'HTC Glacier':								[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
			'HTC Panache':								[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
			'My ?Touch ?4G$!':							[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
			'HTC My ?Touch ?4G$!':						[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
			'HTC myTouch 4G Slide':						[ 'T-Mobile', 'myTouch 4G Slide' ],					/* HTC Doubleshot */
			'myTouch 4G Slide':							[ 'T-Mobile', 'myTouch 4G Slide' ],					/* HTC Doubleshot */
			'T-Mobile myTouch Q':						[ 'T-Mobile', 'myTouch Q' ],						/* Huawei U8730 */
			'LG-C800':									[ 'T-Mobile', 'myTouch Q' ],
			'Pulse Mini':								[ 'T-Mobile', 'Pulse Mini' ],						/* Huawei U8110 */
			
			'Vodafone 845':								[ 'Vodafone', '845 Nova' ],							/* Huawei U8100 */
			'Vodafone 858':								[ 'Vodafone', '858 Smart' ],						/* Huawei U8160 */
			'Vodafone 945':								[ 'Vodafone', '945' ],								/* ZTE Joe */
			'Vodafone Smart II':						[ 'Vodafone', 'Smart II' ],
			'SmartTab10':								[ 'Vodafone', 'SmartTab 10', TYPE_TABLET ]				/* ZTE Web Tab 10 */
		};
			
		var TIZEN_MODELS = {
			'GT-I9500':									[ STRINGS_SAMSUNG, 'GT-I9500' ]
		}

		var TOUCHWIZ_MODELS = {
			'GT-S3370C':								[ STRINGS_SAMSUNG, 'Corby 3G' ],
			'GT-S36(50|53)!':							[ STRINGS_SAMSUNG, 'Corby' ],
			'GT-S3850':									[ STRINGS_SAMSUNG, 'Corby II' ],
			'GT-S52(30|33)!':							[ STRINGS_SAMSUNG, 'Star' ],
			'GT-S5260':									[ STRINGS_SAMSUNG, 'Star II' ],
			'GT-S5560':									[ STRINGS_SAMSUNG, 'Marvel' ],
			'GT-S5620!':								[ STRINGS_SAMSUNG, 'Monte' ],
			'GT-S5680':									[ STRINGS_SAMSUNG, 'GT-S5680' ],
			'GT-S7550':									[ STRINGS_SAMSUNG, 'Blue Earth' ],
			'GT-S80(00|03)!':							[ STRINGS_SAMSUNG, 'Jet' ],
			'SGH-F480':									[ STRINGS_SAMSUNG, 'Tocco' ],
			'SGH-T528g':								[ STRINGS_SAMSUNG, 'Straight Talk' ],
			'GT-B3410':									[ STRINGS_SAMSUNG, 'Star Qwerty' ],
			'GT-B5310':									[ STRINGS_SAMSUNG, 'Corby Pro' ],
			'GT-B7722':									[ STRINGS_SAMSUNG, 'Star Duos' ],
			'GT-C6712':									[ STRINGS_SAMSUNG, 'Star II Duos' ]
		}
		
		var BADA_MODELS = {
			'GT- ?S52(50|53)!':							[ STRINGS_SAMSUNG, 'Wave 525' ],
			'GT-S5330':									[ STRINGS_SAMSUNG, 'Wave 533' ],
			'GT-S5380!':								[ STRINGS_SAMSUNG, 'Wave Y' ],
			'GT-S57(50|53)!':							[ STRINGS_SAMSUNG, 'Wave 575' ],
			'GT-S72(30|33)!':							[ STRINGS_SAMSUNG, 'Wave 723' ],
			'GT-S7250!':								[ STRINGS_SAMSUNG, 'Wave M' ],
			'GT-S8500!':								[ STRINGS_SAMSUNG, 'Wave' ],
			'GT-S8530':									[ STRINGS_SAMSUNG, 'Wave II' ],
			'GT-S8600':									[ STRINGS_SAMSUNG, 'Wave 3' ],
			'SHW-M410':									[ STRINGS_SAMSUNG, 'Wave 3' ]
		}
		
		var BREW_MODELS = {
			'Coolpad D508':								[ STRINGS_COOLPAD, 'D508' ],
			'Coolpad E600':								[ STRINGS_COOLPAD, 'E600' ],
			'SCH-F839':									[ STRINGS_SAMSUNG, 'SCH-F839' ]
		}

		var WINDOWS_MOBILE_MODELS = {
			'DX900':									[ STRINGS_ACER, 'Tempo DX900' ],
			'F900':										[ STRINGS_ACER, 'Tempo F900' ],
			'Coolpad F800':								[ STRINGS_COOLPAD, 'F800' ],
			'garmin-asus-Nuvifone-M10':					[ 'Garmin-Asus', 'Nuvifone M10' ],
			'HP iPAQ 510':								[ 'HP', 'iPAQ 510' ],
			'((HTC )?HD mini|.*T5555)!':				[ STRINGS_HTC, 'HD mini' ],
			'((HTC )?HD2|.*T8585)!':					[ STRINGS_HTC, 'HD2' ],
			'T-Mobile LEO':								[ STRINGS_HTC, 'HD2' ],
			'dopodT5588':								[ STRINGS_HTC, 'Hengshan' ],
			'(HTC Mega|.*T3333)!':						[ STRINGS_HTC, 'Mega' ],
			'(HTC Snap|.*S521)!':						[ STRINGS_HTC, 'Snap' ],
			'(HTC Touch2|.*T33(20|33|35))!':			[ STRINGS_HTC, 'Touch 2' ],
			'(HTC Touch Diamond2|.*T5353)!':			[ STRINGS_HTC, 'Touch Diamond 2' ],
			'(HTC Touch Diamond|.*P3700)!':				[ STRINGS_HTC, 'Touch Diamond' ],
			'(HTC Touch HD2|.*T8585)!':					[ STRINGS_HTC, 'Touch HD2' ],
			'(HTC Touch HD|.*T82(82|83))!':				[ STRINGS_HTC, 'Touch HD' ],
			'(HTC Touch Pro2|.*T73(73|80))!':			[ STRINGS_HTC, 'Touch Pro 2' ],
			'HTC TyTN II':								[ STRINGS_HTC, 'TyTN II' ],
			'GT-B7300':									[ STRINGS_SAMSUNG, 'Omnia Lite' ],
			'GT-B7610':									[ STRINGS_SAMSUNG, 'Omnia Pro' ],
			'GT-I8000!':								[ STRINGS_SAMSUNG, 'Omnia 2' ],
			'M1i': 										[ STRINGS_SONY_ERICSSON, 'M1i Aspen' ]
		}		

		var WINDOWS_PHONE_MODELS = {
			'Allegro':									[ STRINGS_ACER, 'Allegro' ],
			'M310':										[ STRINGS_ACER, 'Allegro' ],
			'Galaxy6':									[ STRINGS_ASUS, 'Galaxy 6' ],
			'Venue Pro':								[ 'Dell', 'Venue Pro' ],
			'IS12T':									[ 'Fujitsu Toshiba', 'IS12T' ],
			'USCCHTC-PC93100':							[ STRINGS_HTC, 'Arrive' ],
			'Gold':										[ STRINGS_HTC, 'Gold' ],
			'HD2':										[ STRINGS_HTC, 'HD2' ],
			'LEO':										[ STRINGS_HTC, 'HD2' ],
			'(HD7|.*T92(92|95|96))!':					[ STRINGS_HTC, 'HD7' ],
			'(7 Pro|.*T75(75|76))!':					[ STRINGS_HTC, '7 Pro' ],
			'((7 )?Mozart|.*T86(97|98))!':				[ STRINGS_HTC, '7 Mozart' ],
			'PD67100':									[ STRINGS_HTC, '7 Mozart' ], 
			'((7 )?Trophy|.*T8686)!':					[ STRINGS_HTC, 'Trophy' ],
			'mwp6985':									[ STRINGS_HTC, 'Trophy' ],
			'PC40100':									[ STRINGS_HTC, 'Trophy' ],
			'Touch-IT Trophy':							[ STRINGS_HTC, 'Trophy' ],
			'(Radar|.*C110e)!':							[ STRINGS_HTC, 'Radar' ],
			'Mazaa':									[ STRINGS_HTC, 'Mazaa' ], 
			'Mondrian':									[ STRINGS_HTC, 'Mondrian' ],
			'(Schubert|.*T9292)!':						[ STRINGS_HTC, 'Schubert' ],
			'Spark':									[ STRINGS_HTC, 'Spark' ],
			'.*T8788!':									[ STRINGS_HTC, 'Surround' ],
			'.*X310e!':									[ STRINGS_HTC, 'Titan' ],
			'PI39100':									[ STRINGS_HTC, 'Titan' ],
			'PI86100':									[ STRINGS_HTC, 'Titan II' ],
			'Ultimate':									[ STRINGS_HTC, 'Ultimate' ],
			'HTC6990LVW':								[ STRINGS_HTC, '8X' ],
			'HUAWEI Ascend W1!':						[ STRINGS_HUAWEI, 'Ascend W1' ],
			'GW910':									[ STRINGS_LG, 'Optimus 7' ],
			'LG-E-?900!':								[ STRINGS_LG, 'Optimus 7 E900' ],
			'LG-E906':									[ STRINGS_LG, 'Jil Sander' ],
			'LG-C900!':									[ STRINGS_LG, 'Optimus 7Q' ],
			'Lumia 510!':								[ 'Nokia', 'Lumia 510' ],
			'Lumia 610!':								[ 'Nokia', 'Lumia 610' ],
			'(Lumia |Nokia )?710!':						[ 'Nokia', 'Lumia 710' ],
			'Lumia 719':								[ 'Nokia', 'Lumia 719' ],
			'(Lumia |Nokia )?800!':						[ 'Nokia', 'Lumia 800' ],
			'SeaRay':									[ 'Nokia', 'Lumia 800' ],
			'Lumia 820!':								[ 'Nokia', 'Lumia 820' ],
			'(Lumia |Nokia )?900!':						[ 'Nokia', 'Lumia 900' ],
			'Lumia 920!':								[ 'Nokia', 'Lumia 920' ],
			'XXX':										[ 'Nokia', 'prototype' ],
			'GT-i8700':									[ STRINGS_SAMSUNG, 'Omnia 7' ],
			'GT-I8350!':								[ STRINGS_SAMSUNG, 'Omnia W' ],
			'GT-S7530':									[ STRINGS_SAMSUNG, 'Omnia M' ],
			'SGH-i667':									[ STRINGS_SAMSUNG, 'Focus 2' ],
			'SGH-i677':									[ STRINGS_SAMSUNG, 'Focus Flash' ],
			'SGH-i707':									[ STRINGS_SAMSUNG, 'Taylor' ],
			'SGH-i917!':								[ STRINGS_SAMSUNG, 'Focus' ],
			'SGH-i937!':								[ STRINGS_SAMSUNG, 'Focus S' ],
			'OM(NI|IN)A ?7!':							[ STRINGS_SAMSUNG, 'Omnia 7' ],
			'Taylor':									[ STRINGS_SAMSUNG, 'Taylor' ],
			'CETUS':									[ STRINGS_SAMSUNG, 'Cetus' ],
			'I917':										[ STRINGS_SAMSUNG, 'Cetus' ],
			'S606':										[ 'TCL', 'Horizon S606' ],
			'TSUNAGI':									[ 'Toshiba', 'Tsunagi' ],
			'N880e!':									[ STRINGS_ZTE, 'N880e' ],
			'V965W':									[ STRINGS_ZTE, 'V965W Tania' ],
			'Tania':									[ STRINGS_ZTE, 'V965W Tania' ]
		};
		
		var BLACKBERRY_MODELS = {
			'9600':			'Bold',
			'9650':			'Bold',
			'9700':			'Bold',
			'9780':			'Bold',
			'9790':			'Bold',
			'9900':			'Bold',
			'9930':			'Bold',
			'8300':			'Curve',
			'8310':			'Curve',
			'8320':			'Curve',
			'8330':			'Curve',
			'8350i':		'Curve',
			'8520':			'Curve',
			'8530':			'Curve',
			'8900':			'Curve',
			'9220':			'Curve',
			'9300':			'Curve',
			'9310':			'Curve',
			'9320':			'Curve',
			'9330':			'Curve',
			'9350':			'Curve',
			'9360':			'Curve',
			'9370':			'Curve',
			'9380':			'Curve',
			'8100':			'Pearl',
			'8110':			'Pearl',
			'8120':			'Pearl',
			'8130':			'Pearl',
			'8220':			'Pearl',
			'8230':			'Pearl',
			'9100':			'Pearl',
			'9105':			'Pearl',
			'9530':			'Storm',
			'9550':			'Storm',
			'9670':			'Style',
			'9800':			'Torch',
			'9810':			'Torch',
			'9850':			'Torch',
			'9860':			'Torch',
			'9630':			'Tour',
			'9981':			'Porsche P'
		};
				
		return DeviceModels;
	})();
	
	
	
 	var Version = function() { this.initialize.apply(this, Array.prototype.slice.call(arguments)) };
	Version.prototype = {
		initialize: function(v) {
			this.original = v.value || null;
			this.alias = v.alias || null;
			this.details = v.details || null;
			this.builds = typeof v.builds != 'undefined' ? v.builds : true;

			this.major = 0;
			this.minor = 0;
			this.revision = '';
			this.build = '';
			this.type = '';
						
			var match;
			if (match = /([0-9]+)(?:\.([0-9]+))?(?:\.([0-9]+))?(?:\.([0-9]+))?(?:([ab])([0-9]+))?/.exec(this.original)) {
				if (typeof match[1] != 'undefined') {
					this.major = match[1];
				}

				if (typeof match[2] != 'undefined') {
					this.minor = match[2];
				}

				if (typeof match[3] != 'undefined') {
					this.revision = match[3];
				}

				if (typeof match[4] != 'undefined') {
					this.build = match[4];
				}

				if (typeof match[5] != 'undefined') {
					switch(match[5]) {
						case 'a':	this.type = 'alpha'; break;
						case 'b':	this.type = 'beta'; break;
					}

					if (typeof match[6] != 'undefined') {
						this.build = match[6];
					}
				}
			}
		},
		
		is: function(v) {
			var compare = new Version({ value: v });
			return this.valueOf() == compare.valueOf();
		},
		
		isOlder: function(v) {
			var compare = new Version({ value: v });
			return this.valueOf() < compare.valueOf();
		},
		
		isNewer: function(v) {
			var compare = new Version({ value: v });
			return this.valueOf() > compare.valueOf();
		},
		
		valueOf: function() {
			return parseFloat('' + this.major + '.' + ('0000' + this.minor).slice(-4));
		},
		
		toString: function() {
			if (this.alias)
				return this.alias;

			var version = '';

			if (this.major || this.minor) {
				var v = [];
				v.push(this.major);
				if (this.minor != '' && this.minor != null) v.push(this.minor);
				if (this.revision != '' && this.revision != null) v.push(this.revision);
				if (this.type == '' && this.build) v.push(this.build);
				if (this.details < 0) v.splice(this.details, 0 - this.details);
				if (this.details > 0) v.splice(this.details, v.length - this.details);
				
				if (!this.builds) {
					for (var i = 0; i < v.length; i++) {
						if (v[i] > 999) {
							v.splice(i, 1);
							i--;
						}					
					}
				}
				
				version = v.join('.');
			
				if (this.type != '') version += this.type[0] + (this.build ? this.build : '');
			}

			return version;
		}
	}
		
 	var Detected = function() { this.initialize.apply(this, arguments) };
	Detected.prototype = {
		initialize: function(ua, options) {
			this.options = {
				useFeatures:		options && options.useFeatures || false,
				detectCamouflage:	options && options.detectCamouflage || false
			}

			this.browser = { 'stock': true, 'hidden': false, 'channel': '' };	
			this.engine = {};	
			this.os = {};	
			this.device = { 'type':	'desktop', 'identified': false };
			
			this.camouflage = false;
			this.features = [];
			
			this.detect(ua);
		},
		
		isX: function() {
			var valid = true;
			var x = arguments[0];
			
			if (arguments.length >= 2) {
				valid = valid && this[x].name == arguments[1];
			}
			
			if (arguments.length >= 4 && typeof this[x].version != 'undefined' && valid) {
				var v1 = 0 + this[x].version;
				var v2 = 0 + new Version({ value: arguments[3] });
				switch (arguments[2]) {
					case '<':	valid = valid && v1 < v2; break;
					case '<=':	valid = valid && v1 <= v2; break;
					case '=':	valid = valid && v1 == v2; break;
					case '>':	valid = valid && v1 > v2; break;
					case '>=':	valid = valid && v1 >= v2; break;
				}
			}
			
			return valid;
		},
		
		isBrowser: function() { var a = Array.prototype.slice.call(arguments); a.unshift('browser'); return this.isX.apply(this, a); },
		isEngine: function() { var a = Array.prototype.slice.call(arguments); a.unshift('engine'); return this.isX.apply(this, a); },
		isOs: function() { var a = Array.prototype.slice.call(arguments); a.unshift('os'); return this.isX.apply(this, a); },
				
		isType: function() {
			var valid = false;
			for (var a = 0; a < arguments.length; a++) valid = valid || arguments[a] == this.device.type;
			return valid;
		},		
				
		detect: function(ua) {

			/****************************************************
			 *		Unix
			 */
		
			if (ua.match('Unix')) {
				this.os.name = 'Unix';
			}
			
			/****************************************************
			 *		FreeBSD
			 */
		
			if (ua.match('FreeBSD')) {
				this.os.name = 'FreeBSD';
			}
			
			/****************************************************
			 *		OpenBSD
			 */
		
			if (ua.match('OpenBSD')) {
				this.os.name = 'OpenBSD';
			}
			
			/****************************************************
			 *		NetBSD
			 */
		
			if (ua.match('NetBSD')) {
				this.os.name = 'NetBSD';
			}
			
			/****************************************************
			 *		SunOS
			 */
		
			if (ua.match('SunOS')) {
				this.os.name = 'Solaris';
			}
			
			/****************************************************
			 *		Linux
			 */
		
			if (ua.match('Linux')) {
				this.os.name = 'Linux';

				if (ua.match('CentOS')) {
					this.os.name = 'CentOS';
					if (match = /CentOS\/[0-9\.\-]+el([0-9_]+)/.exec(ua)) {
						this.os.version = new Version({ value: match[1].replace(/_/g,'.') });
					}
				}

				if (ua.match('Debian')) {
					this.os.name = 'Debian';
				}
				
				if (ua.match('Fedora')) {
					this.os.name = 'Fedora';
					if (match = /Fedora\/[0-9\.\-]+fc([0-9]+)/.exec(ua)) {
						this.os.version = new Version({ value: match[1] });
					}
				}

				if (ua.match('Gentoo')) {
					this.os.name = 'Gentoo';
				}
				
				if (ua.match('Kubuntu')) {
					this.os.name = 'Kubuntu';
				}
				
				if (ua.match('Mandriva Linux')) {
					this.os.name = 'Mandriva';
					if (match = /Mandriva Linux\/[0-9\.\-]+mdv([0-9]+)/.exec(ua)) {
						this.os.version = new Version({ value: match[1] });
					}
				}

				if (ua.match('Mageia')) {
					this.os.name = 'Mageia';
					if (match = /Mageia\/[0-9\.\-]+mga([0-9]+)/.exec(ua)) {
						this.os.version = new Version({ value: match[1] });
					}
				}

				if (ua.match('Red Hat')) {
					this.os.name = 'Red Hat';
					if (match = /Red Hat[^\/]*\/[0-9\.\-]+el([0-9_]+)/.exec(ua)) {
						this.os.version = new Version({ value: match[1].replace(/_/g,'.') });
					}
				}

				if (ua.match('Slackware')) {
					this.os.name = 'Slackware';
				}
				
				if (ua.match('SUSE')) {
					this.os.name = 'SUSE';
				}
				
				if (ua.match('Turbolinux')) {
					this.os.name = 'Turbolinux';
				}
				
				if (ua.match('Ubuntu')) {
					this.os.name = 'Ubuntu';
					if (match = /Ubuntu\/([0-9.]*)/.exec(ua)) {
						this.os.version = new Version({ value: match[1] });
					}
				}
			}		

			/****************************************************
			 *		iOS
			 */
		
			if (ua.match('iPhone( Simulator)?;') || ua.match('iPad;') || ua.match('iPod;')) {
				this.os.name = 'iOS';
				this.os.version = new Version({ value: '1.0'});
									
				if (match = /OS (.*) like Mac OS X/.exec(ua)) {
					this.os.version = new Version({ value: match[1].replace(/_/g,'.') });
				}					
				
				/* 
					Sometimes Apple releases beta versions that still have the old version number, 
					but they do have an updated AppleWebKit version. Below are the first version of 
					iOS in which each version of AppleWebkit is shipped. If the reported version is
					lower than the version expected from the AppleWebKit version, it is an early beta.

				if (match = /AppleWebKit\/([0-9.]*)/.exec(ua)) {
					var build = parseVersion(match[1]);
					if (build >= 420.10) this.result.os.version = Math.max(this.result.os.version, 1.1)		// 1.1
					if (build >= 525.18) this.result.os.version = Math.max(this.result.os.version, 2.0)		// 2.0
					if (build >= 528.18) this.result.os.version = Math.max(this.result.os.version, 3.0)		// 3.0 - 3.1
					if (build >= 531.21) this.result.os.version = Math.max(this.result.os.version, 3.2)		// 3.2
					if (build >= 532.90) this.result.os.version = Math.max(this.result.os.version, 4.0)		// 4.0 - 4.1
					if (build >= 533.17) this.result.os.version = Math.max(this.result.os.version, 4.2)		// 4.2 - 4.3
					if (build >= 534.32) this.result.os.version = Math.max(this.result.os.version, 5.0)		// 5.0
				}
				*/
			
				if (ua.match('iPhone Simulator;')) {
					this.device.type = 'emulator';
				} 
				else if (ua.match('iPod;')) {
					this.device.type = 'media';
					this.device.manufacturer = 'Apple';
					this.device.model = 'iPod Touch';
				} 
				else if (ua.match('iPhone;')) {
					this.device.type = TYPE_MOBILE;
					this.device.manufacturer = 'Apple';
					this.device.model = 'iPhone';
				} 
				else {
					this.device.type = TYPE_TABLET;
					this.device.manufacturer = 'Apple';
					this.device.model = 'iPad';
				}
				
				this.device.identified = true;
			}				
			
			/****************************************************
			 *		MacOS X
			 */
		
			else if (ua.match('Mac OS X')) {
				this.os.name = 'Mac OS X';
																			
				if (match = /Mac OS X (10[0-9\._]*)/.exec(ua)) {
				    this.os.version = new Version({ value: match[1].replace(/_/g,'.') });
				}					
			}

			/****************************************************
			 *		Windows
			 */
		
			if (ua.match('Windows')) {
				this.os.name = 'Windows';

				if (match = /Windows NT ([0-9]\.[0-9])/.exec(ua)) {
					this.os.version = parseVersion(match[1]);
					
					switch(match[1]) {
						case '6.2':		if (ua.match('; ARM;')) 
											this.os.version = new Version({ value: match[1], alias: 'RT' }); 
										else
											this.os.version = new Version({ value: match[1], alias: '8' }); 
										break;
										
						case '6.1':		this.os.version = new Version({ value: match[1], alias: '7' }); break;
						case '6.0':		this.os.version = new Version({ value: match[1], alias: 'Vista' }); break;
						case '5.2':		this.os.version = new Version({ value: match[1], alias: 'Server 2003' }); break;
						case '5.1':		this.os.version = new Version({ value: match[1], alias: 'XP' }); break;
						case '5.0':		this.os.version = new Version({ value: match[1], alias: '2000' }); break;
						default:		this.os.version = new Version({ value: match[1], alias: 'NT ' + this.os.version });
					}
				}
				
				if (ua.match('Windows 95') || ua.match('Win95') || ua.match('Win 9x 4.00')) {
					this.os.version = new Version({ value: '4.0', alias: '95' });
				}

				if (ua.match('Windows 98') || ua.match('Win98') || ua.match('Win 9x 4.10')) {
					this.os.version = new Version({ value: '4.1', alias: '98' });
				}

				if (ua.match('Windows ME') || ua.match('WinME') || ua.match('Win 9x 4.90')) {
					this.os.version = new Version({ value: '4.9', alias: 'ME' });
				}

				if (ua.match('Windows XP') || ua.match('WinXP')) {
					this.os.name = new Version({ value: '5.1', alias: 'XP' });
				}

				if (ua.match('WPDesktop')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version({ value: '8.0', details: 2 });
					this.device.type = TYPE_MOBILE;
				}
				
				if (ua.match('WP7')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version({ value: '7', details: 1 });
					this.device.type = TYPE_MOBILE;
					this.browser.mode = 'desktop';
				}

				if (ua.match('Windows CE') || ua.match('WinCE') || ua.match('WindowsCE')) {
					if (ua.match(' IEMobile')) {
						this.os.name = 'Windows Mobile';

						if (ua.match(' IEMobile 8')) {
							this.os.version = new Version({ value: '6.5', details: 2 });
						}
	
						if (ua.match(' IEMobile 7')) {
							this.os.version = new Version({ value: '6.1', details: 2 });
						}
	
						if (ua.match(' IEMobile 6')) {
							this.os.version = new Version({ value: '6.0', details: 2 });
						}
					}
					else {
						this.os.name = 'Windows CE';
						
						if (match = /WindowsCEOS\/([0-9.]*)/.exec(ua)) {
							this.os.version = new Version({ value: match[1], details: 2 });
						}
						
						if (match = /Windows CE ([0-9.]*)/.exec(ua)) {
							this.os.version = new Version({ value: match[1], details: 2 });
						}
					}
										
					this.device.type = TYPE_MOBILE;
				}

				if (ua.match('Windows Mobile')) {
					this.os.name = 'Windows Mobile';
					this.device.type = TYPE_MOBILE;
				}
				
				if (match = /WindowsMobile\/([0-9.]*)/.exec(ua)) {
					this.os.name = 'Windows Mobile';
					this.os.version = new Version({ value: match[1], details: 2 });
					this.device.type = TYPE_MOBILE;
				}
				
				if (match = /Windows Phone ([0-9.]*)/.exec(ua)) {
					if (parseInt(match[1], 10) < 7) {
	 					this.os.name = 'Windows Mobile';
					} else {
						this.os.name = 'Windows Phone';
					}
	
					this.os.version = new Version({ value: match[1], details: 2 });
					this.device.type = TYPE_MOBILE;
				}
				
				if (ua.match('Windows Phone')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version({ value: ua.match(/Windows Phone (?:OS )?([0-9.]*)/)[1], details: 2 });

					if (this.os.version < 7) {
						this.os.name = 'Windows Mobile';
					}

					if (match = /IEMobile\/[^;]+;(?: ARM; Touch; )?([^;]+); ([^;]+)[;|\)]/.exec(ua)) {
						this.device = DeviceModels.identify('wp', match[2]);
						
						if (!this.device.identified) {
							this.device.manufacturer = match[1];
							this.device.model = match[2];
						}
					}						

					if (this.device.manufacturer == 'Microsoft' && this.device.model == 'XDeviceEmulator') {
						this.device.manufacturer = null;
						this.device.model = null;
						this.device.type = 'emulator';
						this.device.identified = true;
					}
				}
			}

			/****************************************************
			 *		Android
			 */
		
			if (ua.match('Android')) {
				this.os.name = 'Android';
				this.os.version = null;

				if (match = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(ua.replace('-update', '.'))) {
					this.os.version = new Version({ value: match[1], details: 3 })
				}

				if (match = /Android [0-9][0-9].[0-9][0-9].[0-9][0-9]\(([^)]+)\);/.exec(ua.replace('-update', '.'))) {
					this.os.version = new Version({ value: match[1], details: 3 })
				}	
				
				if (ua.match('Android Eclair')) {
					this.os.version = new Version({ value: '2.0', details: 3 });
				}

				if (this.os.version < 2) {
					if (ua.match('Build/CUPCAKE')) this.os.version = new Version({ value: 1.5, details: 3 });
					if (ua.match('Build/DONUT')) this.os.version = new Version({ value: 1.6, details: 3 });
					if (ua.match('Build/ECLAIR')) this.os.version = new Version({ value: 2.0, details: 3 });
					if (ua.match('Build/FROYO')) this.os.version = new Version({ value: 2.2, details: 3 });
					if (ua.match('Build/GINGERBREAD')) this.os.version = new Version({ value: 2.3, details: 3 });
				}
					

				this.device.type = TYPE_MOBILE;
				if (this.os.version >= 3) this.device.type = TYPE_TABLET;
				if (this.os.version >= 4 && ua.match(TYPE_MOBILE)) this.device.type = TYPE_MOBILE;

				if (match = /Eclair; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?) Build\/([^\/]*)\//.exec(ua)) {
				    this.device.model = match[1];
				}
				
				else if (match = /; ([^;]*[^;\s])\s+Build/.exec(ua)) {
				    this.device.model = match[1];
				}		
				
				else if (match = /[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; ([^;]*[^;\s]);\s+Build/.exec(ua)) {
				    this.device.model = match[1];
				}		
				
				else if (match = /\(([^;]+);U;Android\/[^;]+;[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(ua)) {
				    this.device.model = match[1];
				}		
				
				else if (match = /;\s?([^;]+);\s?[0-9]+\*[0-9]+;\s?CTC\/2.0/.exec(ua)) {
				    this.device.model = match[1];
				}		
				
				else if (match = /Android [^;]+; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; )?([^)]+)\)/.exec(ua)) {
				    if (! ua.match(/[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?/)) {
				    	this.device.model = match[1];
					}
				}	

				
				/* Sometimes we get a model name that starts with Android, in that case it is a mismatch and we should ignore it */
				if (this.device.model && this.device.model.substring(0,7) == 'Android') {
					this.device.model = null;
				}
				
				if (this.device.model) {
					this.device = DeviceModels.identify('android', this.device.model);
				}
				
				if (ua.match('HP eStation'))	{ this.device.manufacturer = 'HP'; this.device.model = 'eStation'; this.device.type = TYPE_TABLET; this.device.identified = true; }
				if (ua.match('Pre\/1.0')) 		{ this.device.manufacturer = 'Palm'; this.device.model = 'Pre'; this.device.identified = true; }
				if (ua.match('Pre\/1.1')) 		{ this.device.manufacturer = 'Palm'; this.device.model = 'Pre Plus'; this.device.identified = true; }
				if (ua.match('Pre\/1.2')) 		{ this.device.manufacturer = 'Palm'; this.device.model = 'Pre 2'; this.device.identified = true; }
				if (ua.match('Pre\/3.0')) 		{ this.device.manufacturer = 'HP'; this.device.model = 'Pre 3'; this.device.identified = true; }
				if (ua.match('Pixi\/1.0')) 		{ this.device.manufacturer = 'Palm'; this.device.model = 'Pixi'; this.device.identified = true; }
				if (ua.match('Pixi\/1.1')) 		{ this.device.manufacturer = 'Palm'; this.device.model = 'Pixi Plus'; this.device.identified = true; }
				if (ua.match('P160UN?A?\/1.0')) { this.device.manufacturer = 'HP'; this.device.model = 'Veer'; this.device.identified = true; }
			}



			/****************************************************
			 *		Aliyun OS
			 */
		
			if (ua.match('Aliyun')) {
				this.device.type = TYPE_MOBILE;

				this.os.name = 'Aliyun OS';
				this.os.version = null;

				if (match = /YunOs ([0-9.]+)/.exec(ua)) {
					this.os.version = new Version({ value: match[1], details: 3 })
				}

				if (match = /AliyunOS ([0-9.]+)/.exec(ua)) {
					this.os.version = new Version({ value: match[1], details: 3 })
				}

				if (match = /; ([^;]*[^;\s])\s+Build/.exec(ua)) {
				    this.device.model = match[1];
				}		

				if (this.device.model) {
					this.device = DeviceModels.identify('android', this.device.model);
				}
			}

			if (ua.match('Android')) {
				if (match = /Android v(1.[0-9][0-9])_[0-9][0-9].[0-9][0-9]-/.exec(ua)) {
					this.os.name = 'Aliyun OS';
					this.os.version = new Version({ value: match[1], details: 3 })
				}
	
				if (match = /Android (1.[0-9].[0-9].[0-9]+)-R?T/.exec(ua)) {
					this.os.name = 'Aliyun OS';
					this.os.version = new Version({ value: match[1], details: 3 })
				}
			}
			


			/****************************************************
			 *		Google TV
			 */
		
			if (ua.match('GoogleTV')) {
				this.os.name = 'Google TV';
				
				if (ua.match('Chrome/5.')) {
					this.os.version = new Version({ value: '1' });
				}

				if (ua.match('Chrome/11.')) {
					this.os.version = new Version({ value: '2' });
				}

				this.device.type = TYPE_TELEVISION;
			}

			/****************************************************
			 *		WoPhone
			 */
		
			if (ua.match('WoPhone')) {
				this.os.name = 'WoPhone';
																			
				if (match = /WoPhone\/([0-9\.]*)/.exec(ua)) {
				    this.os.version = new Version({ value: match[1] });
				}					

				this.device.type = TYPE_MOBILE;
			}

			/****************************************************
			 *		BlackBerry
			 */
		
			if (ua.match('BlackBerry') && !ua.match('BlackBerry Runtime for Android Apps')) {
				this.os.name = 'BlackBerry OS';
				
				if (!ua.match('Opera')) {
					if (match = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(ua)) {
						this.device.model = match[1];
						this.os.version = new Version({ value: match[2], details: 2 });
					}
					
					if (match = /; BlackBerry ([0-9]*);/.exec(ua)) {
						this.device.model = match[1];
					}

					if (match = /Version\/([0-9.]*)/.exec(ua)) {
						this.os.version = new Version({ value: match[1], details: 2 });
					}
					
					if (this.os.version >= 10) {
						this.os.name = 'BlackBerry';
					}
					
					if (typeof this.device.model != 'undefined') {
						this.device.model = DeviceModels.identify('blackberry', this.device.model);
					} else {
						this.device.model = 'BlackBerry';
					}
				} else {
					this.device.model = 'BlackBerry';
				}

				this.device.manufacturer = 'RIM';
				this.device.type = TYPE_MOBILE;
				this.device.identified = true;
			}
			
			if (match = /\(BB(1[^;]+); ([^\)]+)\)/.exec(ua)) {
				this.os.name = 'BlackBerry';
				this.os.version = new Version({ value: match[1], details: 2 });

				this.device.manufacturer = 'RIM';
				this.device.model = 'BlackBerry ' + match[2];
				this.device.type = ua.match('Mobile') ? TYPE_MOBILE : TYPE_TABLET;
				this.device.identified = true;

				if (match = /Version\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1], details: 2 });
				}
			}
				
			/****************************************************
			 *		BlackBerry PlayBook
			 */
		
			if (ua.match('RIM Tablet OS')) {
				this.os.name = 'BlackBerry Tablet OS';
				this.os.version = new Version({ value: ua.match(/RIM Tablet OS ([0-9.]*)/)[1], details: 2 });

				this.device.manufacturer = 'RIM';
				this.device.model = 'BlackBerry PlayBook';
				this.device.type = TYPE_TABLET;
				this.device.identified = true;
			}

			else if (ua.match('PlayBook')) {
				if (match = /Version\/(10[0-9.]*)/.exec(ua)) {
					this.os.name = 'BlackBerry';
					this.os.version = new Version({ value: match[1], details: 2 });

					this.device.manufacturer = 'RIM';
					this.device.model = 'BlackBerry PlayBook';
					this.device.type = TYPE_TABLET;
					this.device.identified = true;
				}
			}

			/****************************************************
			 *		WebOS
			 */
		
			if (ua.match('(?:web|hpw)OS')) {
				this.os.name = 'webOS';
				this.os.version = new Version({ value: ua.match(/(?:web|hpw)OS\/([0-9.]*)/)[1] });

				if (ua.match(TYPE_TABLET)) 
					this.device.type = TYPE_TABLET;
				else
					this.device.type = TYPE_MOBILE;

				this.device.manufacturer = ua.match('hpwOS') ? 'HP' : 'Palm';
				if (ua.match('Pre\/1.0')) this.device.model = 'Pre';
				if (ua.match('Pre\/1.1')) this.device.model = 'Pre Plus';
				if (ua.match('Pre\/1.2')) this.device.model = 'Pre2';
				if (ua.match('Pre\/3.0')) this.device.model = 'Pre3';
				if (ua.match('Pixi\/1.0')) this.device.model = 'Pixi';
				if (ua.match('Pixi\/1.1')) this.device.model = 'Pixi Plus';
				if (ua.match('P160UN?A?\/1.0')) this.device.model = 'Veer';
				if (ua.match('TouchPad\/1.0')) this.device.model = 'TouchPad';
				
				if (ua.match('Emulator\/') || ua.match('Desktop\/')) {
					this.device.type = 'emulator';
					this.device.manufacturer = null;
					this.device.model = null;
				}

				this.device.identified = true;
			}
				
			/****************************************************
			 *		S60
			 */
		
			if (ua.match('Symbian') || ua.match('Series[ ]?60') || ua.match('S60;')) {
				this.os.name = 'Series60';
				
				if (ua.match('SymbianOS/9.1')  && !ua.match('Series60')) {
					this.os.version = new Version({ value: '3.0' });
				}
							
				if (match = /Series60\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				if (match = /Nokia([^\/;]+)[\/|;]/.exec(ua)) {
					if (match[1] != 'Browser') {
						this.device.manufacturer = 'Nokia';
						this.device.model = match[1];
						this.device.identified = true;
					}
				}

				if (match = /Vertu([^\/;]+)[\/|;]/.exec(ua)) {
					this.device.manufacturer = 'Vertu';
					this.device.model = match[1];
					this.device.identified = true;
				}
				
				if (match = /Symbian; U; ([^;]+); [a-z][a-z]\-[a-z][a-z]/i.exec(ua)) {
					this.device.manufacturer = 'Nokia';
					this.device.model = match[1];
					this.device.identified = true;
				}

				if (match = /Samsung\/([^;]*);/.exec(ua)) {
					this.device.manufacturer = STRINGS_SAMSUNG;
					this.device.model = match[1];
					this.device.identified = true;
				}

				this.device.type = TYPE_MOBILE;
			}
				
			/****************************************************
			 *		S40
			 */
		
			if (ua.match('Series40')) {
				this.os.name = 'Series40';

				if (match = /Nokia([^\/]+)\//.exec(ua)) {
					this.device.manufacturer = 'Nokia';
					this.device.model = match[1];
					this.device.identified = true;
				}

				this.device.type = TYPE_MOBILE;
			}
			
			/****************************************************
			 *		MeeGo
			 */
		
			if (ua.match('MeeGo')) {
				this.os.name = 'MeeGo';
				this.device.type = TYPE_MOBILE;

				if (match = /Nokia([^\)]+)\)/.exec(ua)) {
					this.device.manufacturer = 'Nokia';
					this.device.model = match[1];
					this.device.identified = true;
				}
			}
			
			/****************************************************
			 *		Maemo
			 */
		
			if (ua.match('Maemo')) {
				this.os.name = 'Maemo';
				this.device.type = TYPE_MOBILE;

				if (match = /(N[0-9]+)/.exec(ua)) {
					this.device.manufacturer = 'Nokia';
					this.device.model = match[1];
					this.device.identified = true;
				}
			}
			
			/****************************************************
			 *		Tizen
			 */
		
			if (ua.match('Tizen')) {
				this.os.name = 'Tizen';

				if (match = /Tizen[\/ ]([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				this.device.type = TYPE_MOBILE;

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					if (match[1] != 'Linux') {
						this.device = DeviceModels.identify('tizen', match[2]);

						if (!this.device.identified) {
							this.device.manufacturer = match[1];
							this.device.model = match[2];
						}
					}						
				}
			}
			
			/****************************************************
			 *		Bada
			 */
		
			if (ua.match('[b|B]ada')) {
				this.os.name = 'Bada';

				if (match = /[b|B]ada\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				this.device.type = TYPE_MOBILE;

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					this.device = DeviceModels.identify('bada', match[2]);
					
					if (!this.device.identified) {
					    this.device.manufacturer = match[1];
					    this.device.model = match[2];
					}
				}
			}
			
			/****************************************************
			 *		Brew
			 */
		
			if (ua.match(/BREW/i) || ua.match('BMP; U')) {
				this.os.name = 'Brew';
				this.device.type = TYPE_MOBILE;

				if (match = /BREW; U; ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				else if (match = /;BREW\/([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				
				if (match = /\(([^;]+);U;REX\/[^;]+;BREW\/[^;]+;(?:.*;)?[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(ua)) {
					this.device = DeviceModels.identify('brew', match[1]);
					
					if (!this.device.identified) {
					    this.device.model = match[1];
					}
				}
			}			
			
			/****************************************************
			 *		MTK
			 */
		
			if (ua.match(/\(MTK;/)) {
				this.os.name = 'MTK';
				this.device.type = TYPE_MOBILE;
			}			

			/****************************************************
			 *		CrOS
			 */
		
			if (ua.match('CrOS')) {
				this.os.name = 'Chrome OS';
				this.device.type = 'desktop';
			}			
			
			/****************************************************
			 *		Joli OS
			 */
		
			if (ua.match('Joli OS')) {
				this.os.name = 'Joli OS';
				this.device.type = 'desktop';

				if (match = /Joli OS\/([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}
			}			
			
			/****************************************************
			 *		Haiku
			 */
		
			if (ua.match('Haiku')) {
				this.os.name = 'Haiku';
				this.device.type = 'desktop';
			}			
			
			/****************************************************
			 *		QNX
			 */
		
			if (ua.match('QNX')) {
				this.os.name = 'QNX';
				this.device.type = TYPE_MOBILE;
			}			
			
			/****************************************************
			 *		OS/2 Warp
			 */
		
			if (ua.match('OS\/2; Warp')) {
				this.os.name = 'OS/2 Warp';
				this.device.type = 'desktop';

				if (match = /OS\/2; Warp ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}
			}			
			
			/****************************************************
			 *		Grid OS
			 */
		
			if (ua.match('Grid OS')) {
				this.os.name = 'Grid OS';
				this.device.type = TYPE_TABLET;

				if (match = /Grid OS ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}
			}			
			
			/****************************************************
			 *		AmigaOS
			 */
		
			if (ua.match(/AmigaOS/i)) {
				this.os.name = 'AmigaOS';
				this.device.type = 'desktop';

				if (match = /AmigaOS ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

			}			
			
			/****************************************************
			 *		MorphOS
			 */
		
			if (ua.match(/MorphOS/i)) {
				this.os.name = 'MorphOS';
				this.device.type = 'desktop';

				if (match = /MorphOS ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

			}			
			
			/****************************************************
			 *		Kindle
			 */
		
			if (ua.match('Kindle') && ! ua.match('Fire')) {
				this.os.name = '';

				this.device.manufacturer = 'Amazon';
				this.device.model = 'Kindle';
				this.device.type = TYPE_EREADER;

				if (ua.match('Kindle\/2.0')) this.device.model = 'Kindle 2';
				if (ua.match('Kindle\/3.0')) this.device.model = 'Kindle 3 or later';

				this.device.identified = true;
			}

			/****************************************************
			 *		NOOK
			 */
		
			if (ua.match('nook browser')) {
				this.os.name = 'Android';
				
				this.device.manufacturer = 'Barnes & Noble';
				this.device.model = 'NOOK';
				this.device.type = TYPE_EREADER;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Bookeen
			 */
		
			if (ua.match('bookeen\/cybook')) {
				this.os.name = '';
				
				this.device.manufacturer = 'Bookeen';
				this.device.model = 'Cybook';
				this.device.type = TYPE_EREADER;
				
				if (ua.match('Orizon')) {
					this.device.model = 'Cybook Orizon';
				}			

				this.device.identified = true;
			}

			/****************************************************
			 *		Sony Reader
			 */
		
			if (ua.match('EBRD1101')) {
				this.os.name = '';
				
				this.device.manufacturer = 'Sony';
				this.device.model = 'Reader';
				this.device.type = TYPE_EREADER;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		iRiver
			 */
		
			if (ua.match('Iriver ;')) {
				this.os.name = '';
				
				this.device.manufacturer = 'iRiver';
				this.device.model = 'Story';
				this.device.type = TYPE_EREADER;
				
				if (ua.match('EB07')) {
					this.device.model = 'Story HD EB07';
				}			

				this.device.identified = true;
			}

			/****************************************************
			 *		Nintendo
			 *
			 *		Opera/9.30 (Nintendo Wii; U; ; 3642; en)
			 *		Opera/9.30 (Nintendo Wii; U; ; 2047-7; en)
			 *		Opera/9.50 (Nintendo DSi; Opera/507; U; en-US)
			 *		Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7455.US
			 *		Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7455.EU
			 *		Mozilla/5.0 (Nintendo WiiU) AppleWebKit/534.52 (KHTML, like Gecko) NX/2.1.0.8.8 Version/1.0.0.6760.JP
			 */
		
			if (ua.match('Nintendo Wii')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'Wii';
				this.device.type = 'gaming';
				this.device.identified = true;
			}
			
			if (ua.match('Nintendo Wii ?U')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'Wii U';
				this.device.type = 'gaming';
				this.device.identified = true;
			}
			
			if (ua.match('Nintendo DSi')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'DSi';
				this.device.type = 'gaming';
				this.device.identified = true;
			}
			
			if (ua.match('Nintendo 3DS')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = '3DS';
				this.device.type = 'gaming';

				if (match = /Version\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				this.device.identified = true;
			}

			/****************************************************
			 *		Sony Playstation
			 *
			 *		Mozilla/4.0 (PSP (PlayStation Portable); 2.00)
			 *
			 *		Mozilla/5.0 (PlayStation Vita 1.00) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.50) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.51) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.52) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.60) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.61) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *		Mozilla/5.0 (PlayStation Vita 1.80) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
			 *
			 *		Mozilla/5.0 (PLAYSTATION 3; 1.00)
			 *		Mozilla/5.0 (PLAYSTATION 3; 2.00)
			 *		Mozilla/5.0 (PLAYSTATION 3; 3.55)
			 *		Mozilla/5.0 (PLAYSTATION 3 4.11) AppleWebKit/531.22.8 (KHTML, like Gecko)
			 *		Mozilla/5.0 (PLAYSTATION 3 4.10) AppleWebKit/531.22.8 (KHTML, like Gecko)
			 *
			 *		Mozilla/5.0 (PlayStation 3) SonyComputerEntertainmentEurope/531.3 (NCell) NuantiMeta/2.0
			 */
		
			if (ua.match('PlayStation Portable')) {
				this.os.name = '';

				this.device.manufacturer = 'Sony';
				this.device.model = 'Playstation Portable';
				this.device.type = 'gaming';
				this.device.identified = true;
			}

			if (ua.match('PlayStation Vita')) {
				this.os.name = '';

				if (match = /PlayStation Vita ([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				this.device.manufacturer = 'Sony';
				this.device.model = 'PlayStation Vita';
				this.device.type = 'gaming';
				this.device.identified = true;
			}

			if (ua.match(/PlayStation 3/i)) {
				this.os.name = '';

				if (match = /PLAYSTATION 3;? ([0-9.]*)/.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				this.device.manufacturer = 'Sony';
				this.device.model = 'Playstation 3';
				this.device.type = 'gaming';
				this.device.identified = true;
			}


			/****************************************************
			 *		XBox
			 *
			 *		Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Xbox)
			 */
		
			if (ua.match(/Xbox\)$/)) {
				this.os.name = '';
				this.os.version = null;

				this.device.manufacturer = 'Microsoft';
				this.device.model = 'Xbox 360';
				this.device.type = 'gaming';
				this.device.identified = true;
			}



			/****************************************************
			 *		Panasonic Smart Viera
			 *
			 *		Mozilla/5.0 (FreeBSD; U; Viera; ja-JP) AppleWebKit/535.1 (KHTML, like Gecko) Viera/1.2.4 Chrome/14.0.835.202 Safari/535.1
			 */
		
			if (ua.match('Viera')) {
				this.os.name = '';
				this.device.manufacturer = 'Panasonic';
				this.device.model = 'Smart Viera';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}


			/****************************************************
			 *		Sharp AQUOS TV
			 *
			 *		Mozilla/5.0 (DTV) AppleWebKit/531.2  (KHTML, like Gecko) AQUOSBrowser/1.0 (US00DTV;V;0001;0001)
			 *		Mozilla/5.0 (DTV) AppleWebKit/531.2+ (KHTML, like Gecko) Espial/6.0.4 AQUOSBrowser/1.0 (CH00DTV;V;0001;0001)
			 *		Opera/9.80 (Linux armv6l; U; en) Presto/2.8.115 Version/11.10 AQUOS-AS/1.0 LC-40LE835X
			 */
		
			if (ua.match('AQUOSBrowser') || ua.match('AQUOS-AS')) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_SHARP;
				this.device.model = 'Aquos TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}


			/****************************************************
			 *		Samsung Smart TV
			 *
			 *		Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV; Maple2012) AppleWebKit/534.7 (KHTML, like Gecko) SmartTV Safari/534.7
			 *		Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV) AppleWebKit/531.2+ (KHTML, like Gecko) WebBrowser/1.0 SmartTV Safari/531.2+
			 */

			if (ua.match('SMART-TV')) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_SAMSUNG;
				this.device.model = 'Smart TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;

				if (match = /Maple([0-9]*)/.exec(ua)) {
					this.device.model += ' ' + match[1]; 
				}
			}

			/****************************************************
			 *		Sony Internet TV
			 *
			 *		Opera/9.80 (Linux armv7l; U; InettvBrowser/2.2(00014A;SonyDTV115;0002;0100) KDL-46EX640; CC/USA; en) Presto/2.8.115 Version/11.10
			 *		Opera/9.80 (Linux armv7l; U; InettvBrowser/2.2(00014A;SonyDTV115;0002;0100) KDL-40EX640; CC/USA; en) Presto/2.10.250 Version/11.60
			 *		Opera/9.80 (Linux armv7l; U; InettvBrowser/2.2(00014A;SonyDTV115;0002;0100) N/A; CC/USA; en) Presto/2.8.115 Version/11.10
			 *		Opera/9.80 (Linux mips; U; InettvBrowser/2.2 (00014A;SonyDTV115;0002;0100) ; CC/JPN; en) Presto/2.9.167 Version/11.50
			 *		Opera/9.80 (Linux mips; U; InettvBrowser/2.2 (00014A;SonyDTV115;0002;0100) AZ2CVT2; CC/CAN; en) Presto/2.7.61 Version/11.00
			 *		Opera/9.80 (Linux armv6l; Opera TV Store/4207; U; (SonyBDP/BDV11); en) Presto/2.9.167 Version/11.50
			 *		Opera/9.80 (Linux armv6l ; U; (SonyBDP/BDV11); en) Presto/2.6.33 Version/10.60
			 *		Opera/9.80 (Linux armv6l; U; (SonyBDP/BDV11); en) Presto/2.8.115 Version/11.10
			 */

			if (ua.match('SonyDTV|SonyBDP|SonyCEBrowser')) {
				this.os.name = '';
				this.device.manufacturer = 'Sony';
				this.device.model = 'Internet TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}

			/****************************************************
			 *		Philips Net TV
			 *
			 *		Opera/9.70 (Linux armv6l ; U; CE-HTML/1.0 NETTV/2.0.2; en) Presto/2.2.1
			 *		Opera/9.80 (Linux armv6l ; U; CE-HTML/1.0 NETTV/3.0.1;; en) Presto/2.6.33 Version/10.60
			 *		Opera/9.80 (Linux mips; U; CE-HTML/1.0 NETTV/3.0.1; PHILIPS-AVM-2012; en) Presto/2.9.167 Version/11.50
			 *		Opera/9.80 (Linux mips ; U; HbbTV/1.1.1 (; Philips; ; ; ; ) CE-HTML/1.0 NETTV/3.1.0; en) Presto/2.6.33 Version/10.70
			 *		Opera/9.80 (Linux i686; U; HbbTV/1.1.1 (; Philips; ; ; ; ) CE-HTML/1.0 NETTV/3.1.0; en) Presto/2.9.167 Version/11.50
			 */

			if (ua.match('NETTV\/')) {
				this.os.name = '';
				this.device.manufacturer = 'Philips';
				this.device.model = 'Net TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		LG NetCast TV
			 *
			 *		Mozilla/5.0 (DirectFB; Linux armv7l) AppleWebKit/534.26+ (KHTML, like Gecko) Version/5.0 Safari/534.26+ LG Browser/5.00.00(+mouse+3D+SCREEN+TUNER; LGE; GLOBAL-PLAT4; 03.09.22; 0x00000001;); LG NetCast.TV-2012
			 *		Mozilla/5.0 (DirectFB; Linux armv7l) AppleWebKit/534.26+ (KHTML, like Gecko) Version/5.0 Safari/534.26+ LG Browser/5.00.00(+SCREEN+TUNER; LGE; GLOBAL-PLAT4; 01.00.00; 0x00000001;); LG NetCast.TV-2012
			 *		Mozilla/5.0 (DirectFB; U; Linux armv6l; en) AppleWebKit/531.2  (KHTML, like Gecko) Safari/531.2  LG Browser/4.1.4( BDP; LGE; Media/BD660; 6970; abc;); LG NetCast.Media-2011
			 *		Mozilla/5.0 (DirectFB; U; Linux 7631; en) AppleWebKit/531.2  (KHTML, like Gecko) Safari/531.2  LG Browser/4.1.4( NO_NUM; LGE; Media/SP520; ST.3.97.409.F; 0x00000001;); LG NetCast.Media-2011
			 *		Mozilla/5.0 (DirectFB; U; Linux 7630; en) AppleWebKit/531.2  (KHTML, like Gecko) Safari/531.2  LG Browser/4.1.4( 3D BDP NO_NUM; LGE; Media/ST600; LG NetCast.Media-2011
			 *		(LGSmartTV/1.0) AppleWebKit/534.23 OBIGO-T10/2.0
			 */

			if (match = /LG NetCast\.(?:TV|Media)-([0-9]*)/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_LG;
				this.device.model = 'NetCast TV ' + match[1];
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}

			if (match = /LGSmartTV/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_LG;
				this.device.model = 'Smart TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Toshiba Smart TV
			 *
			 *		Mozilla/5.0 (Linux mipsel; U; HbbTV/1.1.1 (; TOSHIBA; DTV_RL953; 56.7.66.7; t12; ) ; ToshibaTP/1.3.0 (+VIDEO_MP4+VIDEO_X_MS_ASF+AUDIO_MPEG+AUDIO_MP4+DRM+NATIVELAUNCH) ; en) AppleWebKit/534.1 (KHTML, like Gecko)
			 *		Mozilla/5.0 (DTV; TSBNetTV/T32013713.0203.7DD; TVwithVideoPlayer; like Gecko) NetFront/4.1 DTVNetBrowser/2.2 (000039;T32013713;0203;7DD) InettvBrowser/2.2 (000039;T32013713;0203;7DD)
			 *		Mozilla/5.0 (Linux mipsel; U; HbbTV/1.1.1 (; TOSHIBA; 40PX200; 0.7.3.0.; t12; ) ; Toshiba_TP/1.3.0 (+VIDEO_MP4+AUDIO_MPEG+AUDIO_MP4+VIDEO_X_MS_ASF+OFFLINEAPP) ; en) AppleWebKit/534.1 (KHTML, like Gec
			 */

			if (ua.match('Toshiba_?TP\/') || ua.match('TSBNetTV\/')) {
				this.os.name = '';
				this.device.manufacturer = 'Toshiba';
				this.device.model = 'Smart TV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		NetRange MMH 
			 */

			if (ua.match('NETRANGEMMH')) {
				this.os.name = '';
				this.os.version = null;
				this.browser.name = '';
				this.browser.version = null;
				this.device.model = 'NetRange MMH';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}

			/****************************************************
			 *		MachBlue XT
			 */

			if (match = /mbxtWebKit\/([0-9.]*)/.exec(ua)) {
				this.os.name = '';
				this.browser.name = 'MachBlue XT'
				this.browser.version = new Version({ value: match[1], details: 2 });
				this.device.type = TYPE_TELEVISION;
			}

			if (ua == 'MachBlue') {
				this.os.name = '';
				this.browser.name = 'MachBlue XT'
				this.device.type = TYPE_TELEVISION;
			}

			

			/****************************************************
			 *		Motorola KreaTV
			 */

			if (match = /Motorola KreaTV STB/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_MOTOROLA;
				this.device.model = 'KreaTV';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}

			/****************************************************
			 *		ADB
			 */

			if (match = /\(ADB; ([^\)]+)\)/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'ADB';
				this.device.model = (match[1] != 'Unknown' ? match[1].replace('ADB','') + ' ' : '') + 'IPTV receiver';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}

			/****************************************************
			 *		MStar
			 */

			if (ua.match(/Mstar;OWB/)) {
				this.os.name = '';
				this.device.manufacturer = 'MStar';
				this.device.model = 'PVR';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
				
				this.browser.name = 'Origyn Web Browser';
			}
			
			/****************************************************
			 *		TechniSat
			 */

			if (match = /\TechniSat ([^;]+);/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'TechniSat';
				this.device.model = match[1];
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Technicolor
			 */

			if (match = /\Technicolor_([^;]+);/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'Technicolor';
				this.device.model = match[1];
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Winbox Evo2
			 */

			if (match = /Winbox Evo2/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'Winbox';
				this.device.model = 'Evo2';
				this.device.type = TYPE_TELEVISION;
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Roku
			 */

			if (match = /^Roku\/DVP-([0-9]+)/.exec(ua)) {
				this.device.manufacturer = 'Roku';
				this.device.type = TYPE_TELEVISION;
				
				switch (match[1]) {
					case '2000':	this.device.model = 'HD'; break;
					case '2050':	this.device.model = 'XD'; break;
					case '2100':	this.device.model = 'XDS'; break;
					case '2400':	this.device.model = 'LT'; break;
					case '3000':	this.device.model = '2 HD'; break;
					case '3050':	this.device.model = '2 XD'; break;
					case '3100':	this.device.model = '2 XS'; break;
				}

				this.device.identified = true;
			}
			
			if (match = /HbbTV\/1.1.1 \([^;]*;\s*([^;]*)\s*;\s*([^;]*)\s*;/.exec(ua)) {
				var vendorName = match[1].trim();
				var modelName = match[2].trim();
				
				if (!this.device.manufacturer && vendorName != '' && vendorName != 'vendorName') {
					switch(vendorName) {
						case 'LG Electronics':	this.device.manufacturer = 'LG'; break;
						case 'LGE':				this.device.manufacturer = 'LG'; break;
						case 'TOSHIBA':			this.device.manufacturer = 'Toshiba'; break;
						case 'smart':			this.device.manufacturer = 'Smart'; break;
						case 'tv2n':			this.device.manufacturer = 'TV2N'; break;
						default:				this.device.manufacturer = vendorName;
					}

					if (!this.device.model && modelName != '' && modelName != 'modelName') {
						switch(modelName) {
							case 'GLOBAL_PLAT3':	this.device.model = 'NetCast TV'; break;
							case 'GLOBAL_PLAT4':	this.device.model = 'NetCast TV'; break;
							case 'SmartTV2012':		this.device.model = 'Smart TV 2012'; break;
							case 'videoweb':		this.device.model = 'Videoweb'; break;
							default:				this.device.model = modelName;
						}
						
						if (vendorName == 'Humax') {
							this.device.model = this.device.model.toUpperCase();
						}
	
						this.device.identified = true;
						this.os.name = '';
					}
				}

				this.device.type = TYPE_TELEVISION;
			}
			
			/****************************************************
			 *		Detect type based on common identifiers
			 */

			if (ua.match('InettvBrowser')) {
				this.device.type = TYPE_TELEVISION;
			}

			if (ua.match('MIDP')) {
				this.device.type = TYPE_MOBILE;
			}
			
			/****************************************************
			 *		Try to detect any devices based on common
			 *		locations of model ids
			 */

			if (!this.device.model && !this.device.manufacturer) {
				var candidates = [];
			
				if (!ua.match(/^(Mozilla|Opera)/)) if (match = /^(?:MQQBrowser\/[0-9\.]+\/)?([^\s]+)/.exec(ua)) {
					match[1] = match[1].replace(/_TD$/, '');
					match[1] = match[1].replace(/_CMCC$/, '');
					match[1] = match[1].replace(/[_ ]Mozilla$/, '');
					match[1] = match[1].replace(/ Linux$/, '');
					match[1] = match[1].replace(/ Opera$/, '');
					match[1] = match[1].replace(/\/[0-9].*$/, '');
					
					candidates.push(match[1]);
				}
			
				if (match = /[0-9]+x[0-9]+; ([^;]+)/.exec(ua)) {
					candidates.push(match[1]);
				}
			
				if (match = /[0-9]+X[0-9]+ ([^;\/\(\)]+)/.exec(ua)) {
					candidates.push(match[1]);
				}

				if (match = /Windows NT 5.1; ([^;]+); Windows Phone/.exec(ua)) {
					candidates.push(match[1]);
				}

				if (match = /\) PPC; (?:[0-9]+x[0-9]+; )?([^;\/\(\)]+)/.exec(ua)) {
					candidates.push(match[1]);
				}

				if (match = /\(([^;]+); U; Windows Mobile/.exec(ua)) {
					candidates.push(match[1]);
				}

				if (match = /Vodafone\/1.0\/([^\/]+)/.exec(ua)) {
					candidates.push(match[1]);
				}

				if (match = /\ ([^\s]+)$/.exec(ua)) {
					candidates.push(match[1]);
				}
				
				if (match = /^([a-z0-9\.\_\+\/ ]+) Linux/i.exec(ua)) {
					candidates.push(match[1]);
				}
				
				for (var i = 0; i < candidates.length; i++) {
					if (!this.device.model && !this.device.manufacturer) {
						var result = false;
						
						if (this.os.name == 'Android') {
							var device = DeviceModels.identify('android', candidates[i]);
							if (device.identified) {
								result = true;

								this.device = device;
							}
						}
	
						if (!this.os.name || this.os.name == 'Windows' || this.os.name == 'Windows Mobile' || this.os.name == 'Windows CE') {
							var device = DeviceModels.identify('wm', candidates[i]);
							if (device.identified) {
								result = true;

								this.device = device;

								if (this.os.name != 'Windows Mobile') {
									this.os.name = 'Windows Mobile';
									this.os.version = null;
								}
							}
						}
					}
	
					if (!result) {
						if (match = /^GIONEE-([^\s]+)/.exec(candidates[i])) {
							this.device.manufacturer = 'Gionee';
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
						
						if (match = /^HTC_?([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_HTC;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
						
						if (match = /^HUAWEI-([^\/]*)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_HUAWEI;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /(?:^|\()LGE?(?:\/|-|_|\s)([^\s]*)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_LG;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /^MOT-([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_MOTOROLA;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /^Motorola_([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_MOTOROLA;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /^Nokia([^\/]+)(?:\/|$)/.exec(candidates[i])) {
							this.device.manufacturer = 'Nokia';
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
							
							if (!this.os.name) {
								this.os.name = 'Series40';
							}
						}

						if (match = /^Pantech([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = 'Pantech';
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /^SonyEricsson([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_SONY_ERICSSON;
							this.device.model = DeviceModels.cleanup(match[1]);
							this.device.type = TYPE_MOBILE;
							this.device.identified = true;
						}
		
						if (match = /^SAMSUNG-([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_SAMSUNG;
							this.device.model = match[1];
							this.device.type = TYPE_MOBILE;
							
							if (this.os.name == 'Bada') {
								this.device = DeviceModels.identify('bada', this.device.model);
							}
							
							else if (match = /Jasmine\/([0-9.]*)/.exec(ua)) {
								var version = match[1];
								
								this.device = DeviceModels.identify('touchwiz', this.device.model);
								if (this.device.identified) {
									this.os.name = 'Touchwiz';
									this.os.version = new Version({ value: '2.0' });
								}
							}
				
							else if (match = /Dolfin\/([0-9.]*)/.exec(ua)) {
								this.device = DeviceModels.identify('bada', this.device.model);
								if (this.device.identified) {
									this.os.name = 'Bada';
									
									switch(version) {
										case '2.0':		this.os.version = new Version({ value: '1.0' }); break;						
										case '2.2':		this.os.version = new Version({ value: '1.2' }); break;							
										case '3.0':		this.os.version = new Version({ value: '2.0' }); break;					
									}	
								}
								
								else {
									this.device = DeviceModels.identify('touchwiz', this.device.model);
									if (this.device.identified) {
										this.os.name = 'Touchwiz';
			
										switch(version) {
											case '1.0':		this.os.version = new Version({ value: '1.0' }); break;						
											case '1.5':		this.os.version = new Version({ value: '2.0' }); break;							
											case '2.0':		this.os.version = new Version({ value: '3.0' }); break;					
										}	
									}
								}
							}
							
							if (!this.device.identified) {
								this.device.model = DeviceModels.cleanup(this.device.model);
							}
						}
					}
				}
			}
			

			if (match = /\((?:LG[-|\/])(.*) (?:Browser\/)?AppleWebkit/.exec(ua)) {
				this.device.manufacturer = STRINGS_LG;
				this.device.model = match[1];
				this.device.type = TYPE_MOBILE;
				this.device.identified = true;
			}

			if (match = /^Mozilla\/5.0 \((?:Nokia|NOKIA)(?:\s?)([^\)]+)\)UC AppleWebkit\(like Gecko\) Safari\/530$/.exec(ua)) {
				this.device.manufacturer = 'Nokia';
				this.device.model = match[1];
				this.device.type = TYPE_MOBILE;
				this.device.identified = true;
				
				this.os.name = 'Series60';
			}





			/****************************************************
			 *		Safari
			 */
		
			if (ua.match('Safari')) {
				if (this.os.name == 'iOS') {
					this.browser.stock = true;
					this.browser.hidden = true;
					this.browser.name = 'Safari';
					this.browser.version = null;
				}
				
				if (this.os.name == 'Mac OS X' || this.os.name == 'Windows') {
					this.browser.name = 'Safari';
					this.browser.stock = this.os.name == 'Mac OS X';

					if (match = /Version\/([0-9\.]+)/.exec(ua)) {
						this.browser.version = new Version({ value: match[1] });
					}		

					if (ua.match(/AppleWebKit\/[0-9\.]+\+/)) {
						this.browser.name = 'WebKit Nightly Build';
						this.browser.version = null;
					}
				}
			}

			/****************************************************
			 *		Internet Explorer
			 */
		
			if (ua.match('MSIE')) {
				this.browser.name = 'Internet Explorer';
				
				if (ua.match('IEMobile') || ua.match('Windows CE') || ua.match('Windows Phone') || ua.match('WP7') || ua.match('WPDesktop')) {
					this.browser.name = 'Mobile Internet Explorer';
				}

				if (match = /MSIE ([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Opera
			 */
		
			if (ua.match(/Opera/i)) {
				this.browser.stock = false;
				this.browser.name = 'Opera';

				if (match = /Opera[\/| ]([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}

				if (match = /Version\/([0-9.]*)/.exec(ua)) {
					if (parseFloat(match[1]) >= 10) {
						this.browser.version = new Version({ value: match[1] });
					} else {
						this.browser.version = null;
					}
				}
				
				if (this.browser.version && ua.match('Edition Labs')) {
					this.browser.channel = 'Labs';
				}
				
				if (this.browser.version && ua.match('Edition Next')) {
					this.browser.channel = 'Next';
				}
				
				if (ua.match('Opera Tablet')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = TYPE_TABLET;
				}
				
				if (ua.match('Opera Mobi')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = TYPE_MOBILE;
				}

				if (match = /Opera Mini;/.exec(ua)) {
					this.browser.name = 'Opera Mini';
					this.browser.version = null;
					this.browser.mode = 'proxy';
					this.device.type = TYPE_MOBILE;
				}
				
				if (match = /Opera Mini\/(?:att\/)?([0-9.]*)/.exec(ua)) {
					this.browser.name = 'Opera Mini';
					this.browser.version = new Version({ value: match[1], details: -1 });
					this.browser.mode = 'proxy';
					this.device.type = TYPE_MOBILE;
				}
				
				if (this.browser.name == 'Opera' && this.device.type == TYPE_MOBILE) {
					this.browser.name = 'Opera Mobile';
					
					if (ua.match(/BER/)) {
						this.browser.name = 'Opera Mini';
						this.browser.version = null;
					}
				}

				if (ua.match('InettvBrowser')) {
					this.device.type = TYPE_TELEVISION;
				}

				if (ua.match('Opera TV') || ua.match('Opera-TV')) {
					this.browser.name = 'Opera';
					this.device.type = TYPE_TELEVISION;
				}
				
				if (ua.match('Linux zbov')) {
					this.browser.name = 'Opera Mobile';
					this.browser.mode = 'desktop';
				
					this.device.type = TYPE_MOBILE;

					this.os.name = null;
					this.os.version = null;
				}
				
				if (ua.match('Linux zvav')) {
					this.browser.name = 'Opera Mini';
					this.browser.version = null;
					this.browser.mode = 'desktop';

					this.device.type = TYPE_MOBILE;
				
					this.os.name = null;
					this.os.version = null;
				}
			}

			/****************************************************
			 *		Firefox
			 */
		
			if (ua.match('Firefox')) {
				this.browser.stock = false;
				this.browser.name = 'Firefox';

				if (match = /Firefox\/([0-9ab.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
				
				if (this.browser.version.type == 'alpha') {
					this.browser.channel = 'Aurora';
				}

				if (this.browser.version.type == 'beta') {
					this.browser.channel = 'Beta';
				}
				
				if (ua.match('Fennec')) {
					this.device.type = TYPE_MOBILE;
				}
				
				if (ua.match('Mobile; rv')) {
					this.device.type = TYPE_MOBILE;
				}

				if (ua.match('Tablet; rv')) {
					this.device.type = TYPE_TABLET;
				}
				
				if (this.device.type == TYPE_MOBILE || this.device.type == TYPE_TABLET) {
					this.browser.name = 'Firefox Mobile';
				}
			}

			if (ua.match('Namoroka')) {
				this.browser.stock = false;
				this.browser.name = 'Firefox';

				if (match = /Namoroka\/([0-9ab.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
				
				this.browser.channel = 'Namoroka';
			}

			if (ua.match('Shiretoko')) {
				this.browser.stock = false;
				this.browser.name = 'Firefox';

				if (match = /Shiretoko\/([0-9ab.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
				
				this.browser.channel = 'Shiretoko';
			}
			
			if (ua.match('Minefield')) {
				this.browser.stock = false;
				this.browser.name = 'Firefox';

				if (match = /Minefield\/([0-9ab.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
				
				this.browser.channel = 'Minefield';
			}
			
			if (ua.match('Firebird')) {
				this.browser.stock = false;
				this.browser.name = 'Firebird';

				if (match = /Firebird\/([0-9ab.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}
			
			/****************************************************
			 *		SeaMonkey
			 */
		
			if (ua.match('SeaMonkey')) {
				this.browser.stock = false;
				this.browser.name = 'SeaMonkey';

				if (match = /SeaMonkey\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Netscape
			 */
		
			if (ua.match('Netscape')) {
				this.browser.stock = false;
				this.browser.name = 'Netscape';

				if (match = /Netscape[0-9]?\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Konqueror
			 */
		
			if (ua.match('[k|K]onqueror/')) {
				this.browser.name = 'Konqueror';

				if (match = /[k|K]onqueror\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Chrome
			 */
		
			if (match = /(?:Chrome|CrMo|CriOS)\/([0-9.]*)/.exec(ua)) {
				this.browser.stock = false;
				this.browser.name = 'Chrome';
				this.browser.version = new Version({ value: match[1] });

				if (this.os.name == 'Android') {
					switch (match[1].split('.', 3).join('.')) {
						case '16.0.912':
							this.browser.channel = 'Beta';
							break;
						case '18.0.1025':
							this.browser.version.details = 1;
							break;
						default:	
							this.browser.channel = 'Nightly';
							break;
					}
				}
								
				else {
					switch (match[1].split('.', 3).join('.')) {
						case '0.2.149':
						case '0.3.154':
						case '0.4.154':
						case '1.0.154':
						case '2.0.172':
						case '3.0.195':
						case '4.0.249':
						case '4.1.249':
						case '5.0.375':
						case '6.0.472':
						case '7.0.517':
						case '8.0.552':
						case '9.0.597':
						case '10.0.648':
						case '11.0.696':
						case '12.0.742':
						case '13.0.782':
						case '14.0.835':
						case '15.0.874':
						case '16.0.912':
						case '17.0.963':
						case '18.0.1025':
						case '19.0.1084':
						case '20.0.1132':
						case '21.0.1180':
						case '22.0.1229':
							if (this.browser.version.minor == 0) 
								this.browser.version.details = 1;
							else
								this.browser.version.details = 2;
								
							break;
						default:	
							this.browser.channel = 'Nightly';
							break;
					}
				}
			}
			
			/****************************************************
			 *		Chrome Frame
			 */
		
			if (ua.match('chromeframe')) {
				this.browser.stock = false;
				this.browser.name = 'Chrome Frame';

				if (match = /chromeframe\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Chromium
			 */
		
			if (ua.match('Chromium')) {
				this.browser.stock = false;
				this.browser.channel = '';
				this.browser.name = 'Chromium';

				if (match = /Chromium\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		BrowserNG
			 */
		
			if (ua.match('BrowserNG')) {
				this.browser.name = 'Nokia Browser';

				if (match = /BrowserNG\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1], details: 3, builds: false });
				}
			}

			/****************************************************
			 *		Nokia Browser
			 */
		
			if (ua.match('NokiaBrowser')) {
				this.browser.name = 'Nokia Browser';

				if (match = /NokiaBrowser\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1], details: 3 });
				}
			}
			
			/****************************************************
			 *		Nokia Xpress
			 *
			 *		Mozilla/5.0 (X11; Linux x86_64; rv:5.0.1) Gecko/20120822 OSRE/1.0.7f
			 */
			
			if (ua.match('OSRE')) {
				this.browser.name = 'Nokia Xpress';
				this.browser.mode = 'proxy';

				if (match = /OSRE\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1], details: 3 });
				}

				this.os.name = 'Windows Phone';
				this.device.type = TYPE_MOBILE;
			}
			
			
			/****************************************************
			 *		MicroB
			 */
		
			if (ua.match('Maemo[ |_]Browser')) {
				this.browser.name = 'MicroB';

				if (match = /Maemo[ |_]Browser[ |_]([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1], details: 3 });
				}
			}
			

			/****************************************************
			 *		NetFront
			 */
		
			if (ua.match('Net[fF]ront')) {
				this.browser.name = 'NetFront';
				this.device.type = TYPE_MOBILE;

				if (match = /NetFront\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}

				if (ua.match('InettvBrowser')) {
					this.device.type = TYPE_TELEVISION;
				}
			}
			
			/****************************************************
			 *		Silk
			 */
		
			if (ua.match('Silk')) {
				if (ua.match('Silk-Accelerated')) {
					this.browser.name = 'Silk';

					if (match = /Silk\/([0-9.]*)/.exec(ua)) {
						this.browser.version = new Version({ value: match[1], details: 2 });
					}
					
					if (match = /; ([^;]*[^;\s])\s+Build/.exec(ua)) {
						this.device = DeviceModels.identify('android', match[1]);
					}		

					if (!this.device.identified) {
						this.device.manufacturer = 'Amazon';
						this.device.model = 'Kindle Fire';
						this.device.type = TYPE_TABLET;
						this.device.identified = true;
					}
					
					if (this.os.name != 'Android') {
						this.os.name = 'Android';
						this.os.version = null;
					}
				}
			}

			/****************************************************
			 *		Dolfin
			 */
		
			if (ua.match('Dolfin')) {
				this.browser.name = 'Dolfin';

				if (match = /Dolfin\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}


			/****************************************************
			 *		Iris
			 */
		
			if (ua.match('Iris')) {
				this.browser.name = 'Iris';

				this.device.type = TYPE_MOBILE;
				this.device.model = null;
				this.device.manufacturer = null;

				this.os.name = 'Windows Mobile';
				this.os.version = null;

				if (match = /Iris\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
				
				if (match = / WM([0-9]) /.exec(ua)) {
					this.os.version = new Version({ value: match[1] + '.0' });
				} else {
					this.browser.mode = 'desktop';
				}
			}

			/****************************************************
			 *		Jasmine
			 */
		
			if (ua.match('Jasmine')) {
				this.browser.name = 'Jasmine';

				if (match = /Jasmine\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Boxee
			 */
		
			if (ua.match('Boxee')) {
				this.browser.name = 'Boxee';
				this.device.type = TYPE_TELEVISION;

				if (match = /Boxee\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		LG Browser
			 */
			if (match = /LG Browser\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'LG Browser';
				this.browser.version = new Version({ value: match[1], details: 2 });
				this.device.type = TYPE_TELEVISION;
			}
			
			/****************************************************
			 *		Espial
			 */
		
			if (ua.match('Espial')) {
				this.browser.name = 'Espial';
				
				this.os.name = '';
				this.os.version = null;

				if (this.device.type != TYPE_TELEVISION) {
					this.device.type = TYPE_TELEVISION;
					this.device.model = null;
					this.device.manufacturer = null;
				}
				
				if (match = /Espial\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		ANT Galio
			 */
			if (match = /ANTGalio\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'ANT Galio';
				this.browser.version = new Version({ value: match[1], details: 3 });
				this.device.type = TYPE_TELEVISION;
			}
			
			/****************************************************
			 *		NetFront NX
			 */
			if (match = /NX\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'NetFront NX';
				this.browser.version = new Version({ value: match[1], details: 2 });
				if (match = /DTV/i.exec(ua)) {
					this.device.type = TYPE_TELEVISION;
				} else if (match = /mobile/i.exec(ua)) {
					this.device.type = TYPE_MOBILE;
				} else {
					this.device.type = 'desktop';
				} 

				this.os.name = null;
				this.os.version = null;
			}
			
			/****************************************************
			 *		Obigo
			 */
		
			if (ua.match(/Obigo/i)) {
				this.browser.name = 'Obigo';

				if (match = /Obigo\/([0-9.]*)/i.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}

				if (match = /Obigo\/([A-Z])([0-9.]*)/i.exec(ua)) {
					this.browser.name = 'Obigo ' + match[1];
					this.browser.version = new Version({ value: match[2] });
				}

				if (match = /Obigo-([A-Z])([0-9.]*)\//i.exec(ua)) {
					this.browser.name = 'Obigo ' + match[1];
					this.browser.version = new Version({ value: match[2] });
				}
			}

			/****************************************************
			 *		UC Web
			 */
		
			if (ua.match('UCWEB')) {
				this.browser.stock = false;
				this.browser.name = 'UC Browser';
				
				if (match = /UCWEB([0-9]*[.][0-9]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1], details: 3 });
				}

				if (this.os.name == 'Linux') {
					this.os.name = '';
				}
				
				this.device.type = TYPE_MOBILE;

				if (match = /^IUC \(U;\s?iOS ([0-9\.]+);/.exec(ua)) {
					this.os.name = 'iOS';
					this.os.version = new Version({ value: match[1] });
				}
				
				if (match = /^JUC \(Linux; U; ([0-9\.]+)[^;]*; [^;]+; ([^;]*[^\s])\s*; [0-9]+\*[0-9]+\)/.exec(ua)) {
					this.os.name = 'Android';
					this.os.version = new Version({ value: match[1] });

					this.device = DeviceModels.identify('android', match[2]);
				}
			}

			if (ua.match(/\) UC /)) {
				this.browser.stock = false;
				this.browser.name = 'UC Browser';
			}

			if (match = /UCBrowser\/([0-9.]*)/.exec(ua)) {
				this.browser.stock = false;
				this.browser.name = 'UC Browser';
				this.browser.version = new Version({ value: match[1], details: 2 });
			}
						
			/****************************************************
			 *		NineSky
			 */
		
			if (match = /Ninesky(?:-android-mobile(?:-cn)?)?\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'NineSky';
				this.browser.version = new Version({ value: match[1] });

				if (this.os.name != 'Android') {
					this.os.name = 'Android';
					this.os.version = null;
					
					this.device.manufacturer = null;
					this.device.model = null;
				}
			}

			/****************************************************
			 *		Skyfire
			 */
		
			if (match = /Skyfire\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'Skyfire';
				this.browser.version = new Version({ value: match[1] });

				this.device.type = TYPE_MOBILE;

				this.os.name = 'Android';
				this.os.version = null;
			}
			
			/****************************************************
			 *		Dolphin HD
			 */
		
			if (match = /DolphinHDCN\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'Dolphin';
				this.browser.version = new Version({ value: match[1] });

				this.device.type = TYPE_MOBILE;

				if (this.os.name != 'Android') {
					this.os.name = 'Android';
					this.os.version = null;
				}
			}	

			if (match = /Dolphin\/(?:INT|CN)/.exec(ua)) {
				this.browser.name = 'Dolphin';
				this.device.type = TYPE_MOBILE;
			}	

			/****************************************************
			 *		QQ Browser
			 */
		
			if (match = /(M?QQBrowser)\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'QQ Browser';
				
				var version = match[2];
				if (version.match(/^[0-9][0-9]$/)) version = version[0] + '.' + version[1];
				
				this.browser.version = new Version({ value: version, details: 2 });
				this.browser.channel = ''
				
				if (!this.os.name && match[1] == 'QQBrowser') {
					this.os.name = 'Windows';
				}
			}	

			/****************************************************
			 *		iBrowser
			 */
		
			if (match = /(iBrowser)\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'iBrowser';
				
				var version = match[2];
				if (version.match(/[0-9][0-9]/)) version = version[0] + '.' + version[1];
				
				this.browser.version = new Version({ value: version, details: 2 });
				this.browser.channel = ''
			}	

			/****************************************************
			 *		Puffin
			 */
		
			if (match = /Puffin\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'Puffin';
				this.browser.version = new Version({ value: match[1], details: 2 });

				this.device.type = TYPE_MOBILE;

				if (this.os.name == 'Linux') {
					this.os.name = null;
					this.os.version = null;
				}
			}	

			/****************************************************
			 *		Midori
			 */
		
			if (match = /Midori\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'Midori';
				this.browser.version = new Version({ value: match[1] });

				if (this.os.name != 'Linux') {
					this.os.name = 'Linux';
					this.os.version = null;
				}

				this.device.manufacturer = null;
				this.device.model = null;
				this.device.type = 'desktop';
			}	

			if (match = /midori$/.exec(ua)) {
				this.browser.name = 'Midori';
			}
			
			
			/****************************************************
			 *		Others
			 */

			var browsers = [
				{ name: 'AdobeAIR', 			regexp: /AdobeAIR\/([0-9.]*)/ },
				{ name: 'Awesomium', 			regexp: /Awesomium\/([0-9.]*)/ },
				{ name: 'Bsalsa Embedded',		regexp: /EmbeddedWB ([0-9.]*)/ },
				{ name: 'Canvace',				regexp: /Canvace Standalone\/([0-9.]*)/ },
				{ name: 'Ekioh', 				regexp: /Ekioh\/([0-9.]*)/ },
				{ name: 'JavaFX', 				regexp: /JavaFX\/([0-9.]*)/ },
				{ name: 'GFXe', 				regexp: /GFXe\/([0-9.]*)/ },
				{ name: 'LuaKit',	 			regexp: /luakit/ },
				{ name: 'Titanium', 			regexp: /Titanium\/([0-9.]*)/ },
				{ name: 'OpenWebKitSharp',		regexp: /OpenWebKitSharp/ },
				{ name: 'Prism',	 			regexp: /Prism\/([0-9.]*)/ },
				{ name: 'Qt', 					regexp: /Qt\/([0-9.]*)/ },
				{ name: 'QtEmbedded', 			regexp: /QtEmbedded/ },
				{ name: 'QtEmbedded', 			regexp: /QtEmbedded.*Qt\/([0-9.]*)/ },
				{ name: 'RhoSimulator', 		regexp: /RhoSimulator/ },
				{ name: 'UWebKit', 				regexp: /UWebKit\/([0-9.]*)/ },
				
				{ name: 'PhantomJS',	 		regexp: /PhantomJS\/([0-9.]*)/ },
				{ name: 'Google Web Preview',	regexp: /Google Web Preview/ },

				{ name: 'Google Earth', 		regexp: /Google Earth\/([0-9.]*)/ },
				{ name: 'EA Origin',			regexp: /Origin\/([0-9.]*)/ },
				{ name: 'SecondLife', 			regexp: /SecondLife\/([0-9.]*)/ },
				{ name: 'Valve Steam', 			regexp: /Valve Steam/ },

				{ name: 'Songbird', 			regexp: /Songbird\/([0-9.]*)/ },
				{ name: 'Thunderbird', 			regexp: /Thunderbird\/([0-9.]*)/ },

				{ name: '360 Extreme Explorer', regexp: /QIHU 360EE/ },
				{ name: '360 Safe Explorer', 	regexp: /QIHU 360SE/ },
				{ name: '360 Phone Browser', 	regexp: /360 Android Phone Browser \(V([0-9.]*)\)/ },
				{ name: '360 Phone Browser', 	regexp: /360 Aphone Browser \(Version ([0-9.]*)\)/ },
				{ name: 'ABrowse', 				regexp: /Abrowse ([0-9.]*)/ },
				{ name: 'Abrowser', 			regexp: /Abrowser\/([0-9.]*)/ },
				{ name: 'arora', 				regexp: /[Aa]rora\/([0-9.]*)/ },
				{ name: 'Avant Browser',		regexp: /Avant TriCore/ },
				{ name: 'Baidu Browser', 		regexp: /M?BaiduBrowser\/([0-9.]*)/i },
				{ name: 'Baidu Browser', 		regexp: /BdMobile\/([0-9.]*)/i },
				{ name: 'Baidu Browser', 		regexp: /FlyFlow\/([0-9.]*)/, details: 2 },
				{ name: 'Baidu Browser', 		regexp: /BIDUBrowser[ \/]([0-9.]*)/ },
				{ name: 'Camino', 				regexp: /Camino\/([0-9.]*)/ },
				{ name: 'Canure',				regexp: /Canure\/([0-9.]*)/, details: 3 },
				{ name: 'CometBird', 			regexp: /CometBird\/([0-9.]*)/ },
				{ name: 'Comodo Dragon', 		regexp: /Comodo_Dragon\/([0-9.]*)/, details: 2 },
				{ name: 'Conkeror', 			regexp: /[Cc]onkeror\/([0-9.]*)/ },
				{ name: 'CoolNovo', 			regexp: /(?:CoolNovo|CoolNovoChromePlus)\/([0-9.]*)/, details: 3 },
				{ name: 'ChromePlus', 			regexp: /ChromePlus(?:\/([0-9.]*))?$/, details: 3 },
				{ name: 'Daedalus',				regexp: /Daedalus ([0-9.]*)/, details: 2 },
				{ name: 'Demobrowser', 			regexp: /demobrowser\/([0-9.]*)/ },
				{ name: 'Doga Rhodonit',		regexp: /DogaRhodonit/ },
				{ name: 'Dooble', 				regexp: /Dooble(?:\/([0-9.]*))?/ },
				{ name: 'Dorothy', 				regexp: /Dorothy$/ },
				{ name: 'DWB', 					regexp: /dwb(?:-hg)?(?:\/([0-9.]*))?/ },
				{ name: 'GNOME Web', 			regexp: /Epiphany\/([0-9.]*)/ },
				{ name: 'FireWeb', 				regexp: /FireWeb\/([0-9.]*)/ },
				{ name: 'Flock', 				regexp: /Flock\/([0-9.]*)/, details: 3 },
				{ name:	'Galeon',				regexp: /Galeon\/([0-9.]*)/, details: 3 },
				{ name: 'Helium', 				regexp: /HeliumMobileBrowser\/([0-9.]*)/ },
				{ name: 'Hive Explorer', 		regexp: /HiveE/ },
				{ name: 'iCab', 				regexp: /iCab\/([0-9.]*)/ },
				{ name: 'Iceape', 				regexp: /Iceape\/([0-9.]*)/ },
				{ name: 'IceCat', 				regexp: /IceCat ([0-9.]*)/ },
				{ name: 'Iceweasel', 			regexp: /Iceweasel\/([0-9.]*)/ },
				{ name: 'InternetSurfboard', 	regexp: /InternetSurfboard\/([0-9.]*)/ },
				{ name: 'Iron', 				regexp: /Iron\/([0-9.]*)/, details: 2 },
				{ name: 'Isis',					regexp: /BrowserServer/ },
				{ name: 'Jumanji',				regexp: /jumanji/ },
				{ name: 'Kazehakase',			regexp: /Kazehakase\/([0-9.]*)/ },
				{ name: 'KChrome',				regexp: /KChrome\/([0-9.]*)/, details: 3 },
				{ name: 'K-Meleon',				regexp: /K-Meleon\/([0-9.]*)/ },
				{ name: 'Leechcraft',			regexp: /Leechcraft(?:\/([0-9.]*))?/, details: 2 },
				{ name: 'Lightning',			regexp: /Lightning\/([0-9.]*)/ },
				{ name: 'Lunascape', 			regexp: /Lunascape[\/| ]([0-9.]*)/, details: 3 },
				{ name: 'iLunascape', 			regexp: /iLunascape\/([0-9.]*)/, details: 3 },
				{ name: 'Intermec Browser', 	regexp: /Intermec\/([0-9.]*)/, details: 2 },
				{ name: 'MaCross Mobile',		regexp: /MaCross\/([0-9.]*)/ },
				{ name: 'Maxthon', 				regexp: /Maxthon[\/ ]([0-9.]*)/, details: 3 },
				{ name: 'Mercury Browser',		regexp: /Mercury\/([0-9.]*)/ },
				{ name: 'MiniBrowser',			regexp: /MiniBr?owserM\/([0-9.]*)/ },
				{ name: 'MiniBrowser',			regexp: /MiniBrowserMobile\/([0-9.]*)/ },
				{ name: 'MixShark', 			regexp: /MixShark\/([0-9.]*)/ },
				{ name: 'Motorola WebKit',		regexp: /MotorolaWebKit(?:\/([0-9.]*))?/, details: 3 },
				{ name: 'NetFront LifeBrowser',	regexp: /NetFrontLifeBrowser\/([0-9.]*)/ },
				{ name: 'Netscape Navigator', 	regexp: /Navigator\/([0-9.]*)/, details: 3 },
				{ name:	'Odyssey',				regexp: /OWB\/([0-9.]*)/ },
				{ name: 'OmniWeb', 				regexp: /OmniWeb/ },
				{ name:	'OneBrowser',			regexp: /OneBrowser\/([0-9.]*)/ },
				{ name:	'Orca',					regexp: /Orca\/([0-9.]*)/ },
				{ name:	'Open Sankoré',			regexp: /Open-Sankore\/([0-9.]*)/ },
				{ name: 'Origyn',				regexp: /Origyn Web Browser/ },
				{ name: 'Palemoon', 			regexp: /Pale[mM]oon\/([0-9.]*)/ },
				{ name: 'Phantom', 				regexp: /Phantom\/V([0-9.]*)/ },
				{ name: 'Polaris',	 			regexp: /Polaris\/v?([0-9.]*)/i, details: 2 },
				{ name: 'Qihoo 360',			regexp: /QIHU THEWORLD/ },
				{ name: 'QtCreator',			regexp: /QtCreator\/([0-9.]*)/ },
				{ name: 'QtQmlViewer',			regexp: /QtQmlViewer/ },
				{ name: 'QtTestBrowser',		regexp: /QtTestBrowser\/([0-9.]*)/ },
				{ name: 'QtWeb',				regexp: /QtWeb Internet Browser\/([0-9.]*)/ },
				{ name: 'QupZilla', 			regexp: /QupZilla\/([0-9.]*)/ },
				{ name: 'Roccat',	 			regexp: /Roccat\/([0-9]\.[0-9.]*)/ },
				{ name: 'Raven for Mac', 		regexp: /Raven for Mac\/([0-9.]*)/ },
				{ name: 'rekonq', 				regexp: /rekonq/ },
				{ name: 'RockMelt', 			regexp: /RockMelt\/([0-9.]*)/, details: 2 },
				{ name: 'Sleipnir', 			regexp: /Sleipnir\/([0-9.]*)/, details: 3 },
				{ name: 'SMBrowser', 			regexp: /SMBrowser/ },
				{ name: 'Sogou Explorer', 		regexp: /SE 2.X MetaSr/ },
				{ name: 'Snowshoe',				regexp: /Snowshoe\/([0-9.]*)/, details: 2 },
				{ name: 'Sputnik', 				regexp: /Sputnik\/([0-9.]*)/i, details: 3 },
				{ name: 'Stainless',			regexp: /Stainless\/([0-9.]*)/ },
				{ name: 'SunChrome', 			regexp: /SunChrome\/([0-9.]*)/ },
				{ name: 'Surf', 				regexp: /Surf\/([0-9.]*)/ },
				{ name: 'TaoBrowser',			regexp: /TaoBrowser\/([0-9.]*)/, details: 2 },
				{ name: 'TaomeeBrowser', 		regexp: /TaomeeBrowser\/([0-9.]*)/, details: 2 },
				{ name:	'TazWeb',				regexp: /TazWeb/ },
				{ name: 'Uzbl', 				regexp: /^Uzbl/ },
				{ name: 'Viera', 				regexp: /Viera\/([0-9.]*)/ },
				{ name: 'Villanova', 			regexp: /Villanova\/([0-9.]*)/, details: 3 },
				{ name: 'Wavelink Velocity', 	regexp: /Wavelink Velocity Browser\/([0-9.]*)/, details: 2 },
				{ name: 'WebPositive', 			regexp: /WebPositive/ },
				{ name: 'WebRender', 			regexp: /WebRender/ },
				{ name: 'Wyzo', 				regexp: /Wyzo\/([0-9.]*)/, details: 3 },
				{ name: 'Yandex Browser',		regexp: /YaBrowser\/([0-9.]*)/, details: 2 },
				{ name: 'Zetakey',				regexp: /Zetakey Webkit\/([0-9.]*)/ },
				{ name: 'Zetakey',				regexp: /Zetakey\/([0-9.]*)/ }
			]

			for (var b = 0; b < browsers.length; b++) {
				if (match = browsers[b].regexp.exec(ua)) {
					this.browser.name = browsers[b].name;
					this.browser.channel = '';
					this.browser.stock = false;
					
					if (match[1]) {
						this.browser.version = new Version({ value: match[1], details: browsers[b].details || null }); 
					} else {
						this.browser.version = null;
					}
				}
			}




			/****************************************************
			 *		WebKit
			 */
	
			if (match = /WebKit\/([0-9.]*)/i.exec(ua)) {
				this.engine.name = 'Webkit';
				this.engine.version = new Version({ value: match[1] });
			}

			if (match = /Browser\/AppleWebKit([0-9.]*)/i.exec(ua)) {
				this.engine.name = 'Webkit';
				this.engine.version = new Version({ value: match[1] });
			}		

			/****************************************************
			 *		KHTML
			 */
		
			if (match = /KHTML\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'KHTML';
				this.engine.version = new Version({ value: match[1] });
			}

			/****************************************************
			 *		Gecko
			 */
		
			if (/Gecko/.exec(ua) && ! /like Gecko/i.exec(ua)) {
				this.engine.name = 'Gecko';
				
				if (match = /; rv:([^\)]+)\)/.exec(ua)) {
					this.engine.version = new Version({ value: match[1] });
				}
			}

			/****************************************************
			 *		Presto
			 */
		
			if (match = /Presto\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'Presto';
				this.engine.version = new Version({ value: match[1] });
			}

			/****************************************************
			 *		Trident
			 */
		
			if (match = /Trident\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'Trident';
				this.engine.version = new Version({ value: match[1] });
				
				if (this.browser.name == 'Internet Explorer') {
					if (parseVersion(this.engine.version) == 6 && parseFloat(this.browser.version) < 10) {
						this.browser.version = new Version({ value: '10.0' });
						this.browser.mode = 'compat';
					}

					if (parseVersion(this.engine.version) == 5 && parseFloat(this.browser.version) < 9) {
						this.browser.version = new Version({ value: '9.0' });
						this.browser.mode = 'compat';
					}

					if (parseVersion(this.engine.version) == 4 && parseFloat(this.browser.version) < 8) {
						this.browser.version = new Version({ value: '8.0' });
						this.browser.mode = 'compat';
					}
				}

				if (this.os.name == 'Windows Phone') {
					if (parseVersion(this.engine.version) == 6 && parseFloat(this.os.version) < 8) {
						this.os.version = new Version({ value: '8.0' });
					}

					if (parseVersion(this.engine.version) == 5 && parseFloat(this.os.version) < 7.5) {
						this.os.version = new Version({ value: '7.5' });
					}
				}
			}
			

			/****************************************************
			 *		Corrections
			 */
		
			if (this.os.name == 'Android' && this.browser.stock) {
				this.browser.hidden = true;
			}

			if (this.os.name == 'Aliyun OS' && this.browser.stock) {
				this.browser.hidden = true;
			}
			
			if (this.os.name == 'iOS' && this.browser.name == 'Opera Mini') {
				this.os.version = null;
			}	
			
			if (this.browser.name == 'Midori' && this.engine.name != 'Webkit') {
				this.engine.name = 'Webkit';
				this.engine.version = null;
			}
			
			if (this.device.type == TYPE_TELEVISION && this.browser.name == 'Opera') {
				this.browser.name = 'Opera Devices';
				switch (true) {
					case this.engine.version.is('2.12'):	this.browser.version = new Version({ value: 3.4 }); break;
					case this.engine.version.is('2.11'):	this.browser.version = new Version({ value: 3.3 }); break;
					case this.engine.version.is('2.10'):	this.browser.version = new Version({ value: 3.2 }); break;
					case this.engine.version.is('2.9'):		this.browser.version = new Version({ value: 3.1 }); break;
					case this.engine.version.is('2.8'):		this.browser.version = new Version({ value: 3.0 }); break;
					case this.engine.version.is('2.7'):		this.browser.version = new Version({ value: 2.9 }); break;
					case this.engine.version.is('2.6'):		this.browser.version = new Version({ value: 2.8 }); break;
					case this.engine.version.is('2.4'):		this.browser.version = new Version({ value: 10.3 }); break;
					case this.engine.version.is('2.3'):		this.browser.version = new Version({ value: 10 }); break;
					case this.engine.version.is('2.2'):		this.browser.version = new Version({ value: 9.7 }); break;
					case this.engine.version.is('2.1'):		this.browser.version = new Version({ value: 9.6 }); break;
					default:	this.browser.version = null;
				}
				
				this.os.name = null;
				this.os.version = null;
			}
			
			
			/****************************************************
			 *		Camouflage
			 */
			 
			if (this.options.detectCamouflage) {

				if (match = /Mac OS X 10_6_3; ([^;]+); [a-z]{2}-(?:[a-z]{2})?\)/.exec(ua)) {
					this.browser.name = '';
					this.browser.version = null;
					this.browser.mode = 'desktop';
					
					this.os.name = 'Android';
					this.os.version = null;
				
					this.engine.name = 'Webkit';
					this.engine.version = null;
	
					this.device = DeviceModels.identify('android', match[1]);

					this.features.push('foundDevice');
				}

				if (match = /Linux Ventana; [a-z]{2}-[a-z]{2}; (.+) Build/.exec(ua)) {
					this.browser.name = '';
					this.browser.version = null;
					this.browser.mode = 'desktop';
					
					this.os.name = 'Android';
					this.os.version = null;
				
					this.engine.name = 'Webkit';
					this.engine.version = null;
	
					this.device = DeviceModels.identify('android', match[1]);

					this.features.push('foundDevice');
				}

				if (this.browser.name == 'Safari') {
					if (this.os.name != 'iOS' && /AppleWebKit\/([0-9]+.[0-9]+)/i.exec(ua)[1] != /Safari\/([0-9]+.[0-9]+)/i.exec(ua)[1]) {
						this.features.push('safariMismatch');
						this.camouflage = true;			
					}
	
					if (this.os.name == 'iOS' && ! ua.match(/^Mozilla/)) {
						this.features.push('noMozillaPrefix');
						this.camouflage = true;			
					}

					if (! /Version\/[0-9\.]+/.exec(ua)) {
						this.features.push('noVersion');
						this.camouflage = true;			
					}
				}
				
				if (this.browser.name == 'Chrome'){
					if (! /(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/.exec(ua)) {
						this.features.push('wrongVersion');
						this.camouflage = true;			
					}
				}


				if (this.options.useFeatures) {
					/* If it claims not to be Trident, but it is probably Trident running camouflage mode */
					if (window.ActiveXObject) {
						this.features.push('trident');		
		
						if (typeof this.engine.name != 'undefined' && this.engine.name != 'Trident') {
							this.camouflage = typeof this.browser.name == 'undefined' || this.browser.name != 'Maxthon';			
						}	
					}
				
					/* If it claims not to be Opera, but it is probably Opera running camouflage mode */
					if (window.opera) {
						this.features.push('presto');		
		
						if (typeof this.engine.name != 'undefined' && this.engine.name != 'Presto') {
							this.camouflage = true;			
						}	

						if (this.browser.name == 'Internet Explorer') {
							this.camouflage = true;			
						}
					}
					
					/* If it claims not to be Gecko, but it is probably Gecko running camouflage mode */
					if ('getBoxObjectFor' in document || 'mozInnerScreenX' in window) {
						this.features.push('gecko');		
		
						if (typeof this.engine.name != 'undefined' && this.engine.name != 'Gecko') {
							this.camouflage = true;			
						}	
						
						if (this.browser.name == 'Internet Explorer') {
							this.camouflage = true;			
						}
					}
					
					/* If it claims not to be Webkit, but it is probably Webkit running camouflage mode */
					if ('WebKitCSSMatrix' in window || 'WebKitPoint' in window || 'webkitStorageInfo' in window || 'webkitURL' in window) {
						this.features.push('webkit');		
		
						if (typeof this.engine.name != 'undefined' && this.engine.name != 'Webkit') {
							this.camouflage = true;			
						}	

						if (this.browser.name == 'Internet Explorer') {
							this.camouflage = true;			
						}
					}
					
					
					
					/* If it claims to be Safari and uses V8, it is probably an Android device running camouflage mode */
					if (this.engine.name == 'Webkit' && ({}.toString).toString().indexOf("\n") === -1) {
						this.features.push('v8');		

						if (this.browser != null && this.browser.name == 'Safari') {
							this.camouflage = true;	
						}	
					}
	
	
	
					/* If we have an iPad that is not 768 x 1024, we have an imposter */
					if (this.device.model == 'iPad') {
						if ((screen.width != 0 && screen.height != 0) && (screen.width != 768 && screen.height != 1024) && (screen.width != 1024 && screen.height != 768)) {
							this.features.push('sizeMismatch');
							this.camouflage = true;			
						}				
					}
					
					/* If we have an iPhone or iPod that is not 320 x 480, we have an imposter */
					if (this.device.model == 'iPhone' || this.device.model == 'iPod') {
						if ((screen.width != 0 && screen.height != 0) && (screen.width != 320 && screen.height != 480) && (screen.width != 480 && screen.height != 320)) {
							this.features.push('sizeMismatch');
							this.camouflage = true;			
						}				
					}
					
					
					if (this.os.name == 'iOS' && this.os.version) {
					
						if (this.os.version.isOlder('4.0') && 'sandbox' in document.createElement('iframe')) {
							this.features.push('foundSandbox');
							this.camouflage = true;			
						}
						
						if (this.os.version.isOlder('4.2') && 'WebSocket' in window) {
							this.features.push('foundSockets');
							this.camouflage = true;			
						}
	
						if (this.os.version.isOlder('5.0') && !!window.Worker) {
							this.features.push('foundWorker');
							this.camouflage = true;			
						}

						if (this.os.version.isNewer('2.1') && !window.applicationCache) {
							this.features.push('noAppCache');
							this.camouflage = true;			
						}
					}
					
					if (this.os.name != 'iOS' && this.browser.name == 'Safari' && this.browser.version) {
					
						if (this.browser.version.isOlder('4.0') && !!window.applicationCache) {
							this.features.push('foundAppCache');
							this.camouflage = true;			
						}
					
						if (this.browser.version.isOlder('4.1') && !!(window.history && history.pushState)) {
							this.features.push('foundHistory');
							this.camouflage = true;			
						}
					
						if (this.browser.version.isOlder('5.1') && !!document.documentElement.webkitRequestFullScreen) {
							this.features.push('foundFullscreen');
							this.camouflage = true;			
						}
					
						if (this.browser.version.isOlder('5.2') && 'FileReader' in window) {
							this.features.push('foundFileReader');
							this.camouflage = true;			
						}
					}
				}
			}
		},
		
		toString: function() {
			var prefix = this.camouflage ? 'an unknown browser that imitates ' : '';
			var browser = os = device = engine = '';
			
			browser += (this.browser.name ? this.browser.name + (this.browser.channel ? ' ' + this.browser.channel : '') + (this.browser.version ? ' ' + this.browser.version.toString() : '') : '');
			os += (this.os.name ? this.os.name + (this.os.version ? ' ' + this.os.version.toString() : '') : '');
			engine += (typeof this.engine.name != 'undefined' && this.engine.name ? this.engine.name : '') ;
			
			if (this.device.identified)			
				device += (typeof this.device.manufacturer != 'undefined' && this.device.manufacturer ? this.device.manufacturer + ' ' : '') + (typeof this.device.model != 'undefined' && this.device.model ? this.device.model : '');
			else
				device += (typeof this.device.model != 'undefined' && this.device.model ? 'unrecognized device (' + this.device.model + ')' : '');
			
			if (!device && !os && this.device.type == TYPE_TELEVISION) {
				device = TYPE_TELEVISION;
			}
		
			if (!device && this.device.type == 'emulator') {
				device = 'emulator';
			}
		
			if (browser && os && device) {
				return prefix + browser + ' on a ' + device + ' running ' + os;
			}
		
			else if (browser && !os && device) {
				return prefix + browser + ' on a ' + device;
			}
		
			else if (browser && os && !device) {
				return prefix + browser + ' on ' + os;
			}
		
			else if (!browser && os && device) {
				return prefix + 'a ' + device + ' running ' + os;
			}
		
			else if (browser && !os && !device) {
				return prefix + browser;
			}
		
			else if (!browser && !os && device) {
				return prefix + 'a ' + device;
			}
		
			else if (this.device.type == 'desktop' && os && engine != '' && !device) {
				return 'an unknown browser based on ' + engine + ' running on ' + os;
			}
		
			else if (this.browser.stock && os && !device) {
				return os;
			}
		
			else if (this.browser.stock && engine != '' && !device) {
				return 'an unknown browser based on ' + engine;
			}
		
			else {
				return 'an unknown browser';
			}
		}
	};

	function parseVersion(version) {
		version = version.toString();
		var components = version.split('.');
		var major = components.shift();
		return parseFloat(major + '.' + components.join(''));
	}


	return Detected;
})();	

