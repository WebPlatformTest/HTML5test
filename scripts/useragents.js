var UserAgents = (function(){
		
	var STRINGS_ZTE = 'ZTE',
		STRINGS_TOSHIBA = 'Toshiba',
		STRINGS_TI = 'Texas Instruments',
		STRINGS_SAMSUNG = 'Samsung',
		STRINGS_SHARP = 'Sharp',
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
		STRINGS_BASED = ' based device';
	
	var TOUCHWIZ_MODELS = {
		'SAMSUNG': {
			'GT-S3370C':							[ STRINGS_SAMSUNG, 'Corby 3G' ],
			'GT-S3650':								[ STRINGS_SAMSUNG, 'Corby' ],
			'GT-S3653':								[ STRINGS_SAMSUNG, 'Corby' ],
			'GT-S3850':								[ STRINGS_SAMSUNG, 'Corby II' ],
			'GT-S5230':								[ STRINGS_SAMSUNG, 'Star' ],
			'GT-S5230W':							[ STRINGS_SAMSUNG, 'Star' ],
			'GT-S5233':								[ STRINGS_SAMSUNG, 'Star' ],
			'GT-S5260':								[ STRINGS_SAMSUNG, 'Star II' ],
			'GT-S5560':								[ STRINGS_SAMSUNG, 'Marvel' ],
			'GT-S5620':								[ STRINGS_SAMSUNG, 'Monte' ],
			'GT-S7550':								[ STRINGS_SAMSUNG, 'Blue Earth' ],
			'GT-S8000':								[ STRINGS_SAMSUNG, 'Jet' ],
			'GT-S8003':								[ STRINGS_SAMSUNG, 'Jet' ],
			'SGH-F480':								[ STRINGS_SAMSUNG, 'Tocco' ],
			'SGH-T528g':							[ STRINGS_SAMSUNG, 'Straight Talk' ],
			'GT-B3410':								[ STRINGS_SAMSUNG, 'Star Qwerty' ],
			'GT-B5310':								[ STRINGS_SAMSUNG, 'Corby Pro' ],
			'GT-B7722':								[ STRINGS_SAMSUNG, 'Star Duos' ],
			'GT-C6712':								[ STRINGS_SAMSUNG, 'Star II Duos' ]
		}
	}
	
	var BADA_MODELS = {
		'SAMSUNG': {
			'GT- S5250':							[ STRINGS_SAMSUNG, 'Wave 525' ],
			'GT-S5250':								[ STRINGS_SAMSUNG, 'Wave 525' ],
			'GT-S5253':								[ STRINGS_SAMSUNG, 'Wave 525' ],
			'GT-S5330':								[ STRINGS_SAMSUNG, 'Wave 533' ],
			'GT-S5380':								[ STRINGS_SAMSUNG, 'Wave Y' ],
			'GT-S5380D':							[ STRINGS_SAMSUNG, 'Wave Y' ],
			'GT-S5380K':							[ STRINGS_SAMSUNG, 'Wave Y' ],
			'GT-S5750E':							[ STRINGS_SAMSUNG, 'Wave 575' ],
			'GT-S5753E':							[ STRINGS_SAMSUNG, 'Wave 575' ],
			'GT-S7230B':							[ STRINGS_SAMSUNG, 'Wave 723' ],
			'GT-S7230E':							[ STRINGS_SAMSUNG, 'Wave 723' ],
			'GT-S7233E':							[ STRINGS_SAMSUNG, 'Wave 723' ],
			'GT-S7250':								[ STRINGS_SAMSUNG, 'Wave M' ],
			'GT-S7250D':							[ STRINGS_SAMSUNG, 'Wave M' ],
			'GT-S8500':								[ STRINGS_SAMSUNG, 'Wave' ],
			'GT-S8500C':							[ STRINGS_SAMSUNG, 'Wave' ],
			'GT-S8500R':							[ STRINGS_SAMSUNG, 'Wave' ],
			'GT-S8500T':							[ STRINGS_SAMSUNG, 'Wave' ],
			'GT-S8530':								[ STRINGS_SAMSUNG, 'Wave II' ],
			'GT-S8600':								[ STRINGS_SAMSUNG, 'Wave 3' ],
			'SHW-M410':								[ STRINGS_SAMSUNG, 'Wave 3' ]
		}
	}
	
	var TIZEN_MODELS = {
		'SAMSUNG': {
			'GT-I9500':								[ STRINGS_SAMSUNG, 'GT-I9500' ]
		}
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
		'HD mini T5555':							[ STRINGS_HTC, 'HD mini' ],
		'HTC HD mini':								[ STRINGS_HTC, 'HD mini' ],
		'HTC HD mini T5555':						[ STRINGS_HTC, 'HD mini' ],
		'HTC HD2':									[ STRINGS_HTC, 'HD2' ],
		'HTC HD2 T8585':							[ STRINGS_HTC, 'HD2' ],
		'HD2 T8585':								[ STRINGS_HTC, 'HD2' ],
		'T-Mobile LEO':								[ STRINGS_HTC, 'HD2' ],
		'dopodT5588':								[ STRINGS_HTC, 'Hengshan' ],
		'HTC Mega-T3333':							[ STRINGS_HTC, 'Mega' ],
		'HTC Snap S521':							[ STRINGS_HTC, 'Snap' ],
		'HTC Touch2 T3320':							[ STRINGS_HTC, 'Touch 2' ],
		'HTC Touch2 T3333':							[ STRINGS_HTC, 'Touch 2' ],
		'HTC Touch2 T3335':							[ STRINGS_HTC, 'Touch 2' ],
		'HTC P3700':								[ STRINGS_HTC, 'Touch Diamond' ],
		'HTC Touch Diamond2 T5353':					[ STRINGS_HTC, 'Touch Diamond 2' ],
		'HTC Touch HD T8282':						[ STRINGS_HTC, 'Touch HD' ],
		'HTC Touch HD T8283':						[ STRINGS_HTC, 'Touch HD' ],
		'HTC Touch HD2 T8585':						[ STRINGS_HTC, 'Touch HD2' ],
		'HTC Touch Pro2 T7373':						[ STRINGS_HTC, 'Touch Pro 2' ],
		'T7380':									[ STRINGS_HTC, 'Touch Pro 2' ],
		'HTC TyTN II':								[ STRINGS_HTC, 'TyTN II' ],
		'GT-B7300':									[ STRINGS_SAMSUNG, 'Omnia Lite' ],
		'GT-B7610':									[ STRINGS_SAMSUNG, 'Omnia Pro' ],
		'GT-i8000':									[ STRINGS_SAMSUNG, 'Omnia 2' ],
		'GT-I8000':									[ STRINGS_SAMSUNG, 'Omnia 2' ],
		'GT-I8000U':								[ STRINGS_SAMSUNG, 'Omnia 2' ],
		'M1i': 										[ STRINGS_SONY_ERICSSON, 'M1i Aspen' ]
	}

	var WINDOWS_PHONE_MODELS = {
		'Acer': {
			'Allegro':								[ STRINGS_ACER, 'Allegro' ],
			'M310':									[ STRINGS_ACER, 'Allegro' ]
		},
		
		'Asus': {
			'Galaxy6':								[ STRINGS_ASUS, 'Galaxy 6' ]
		},
		
		'DELL': {
			'Venue Pro':							[ 'Dell', 'Venue Pro' ]
		},
		
		'FujitsuToshibaMobileCommun': {
			'IS12T':								[ 'Fujitsu Toshiba', 'IS12T' ]
		},
		
		'HTC': {
			'7 Mozart':								[ STRINGS_HTC, '7 Mozart' ],
			'7 Mozart T8698':						[ STRINGS_HTC, '7 Mozart' ],
			'T8697':								[ STRINGS_HTC, '7 Mozart' ],
			'T8698':								[ STRINGS_HTC, '7 Mozart' ],
			'PD67100':								[ STRINGS_HTC, '7 Mozart' ], 
			'Mozart T8698':							[ STRINGS_HTC, '7 Mozart' ], 
			'Mozart':								[ STRINGS_HTC, '7 Mozart' ], 
			'USCCHTC-PC93100':						[ STRINGS_HTC, 'Arrive' ],
			'Gold':									[ STRINGS_HTC, 'Gold	' ],
			'HD2':									[ STRINGS_HTC, 'HD2' ],
			'HD7':									[ STRINGS_HTC, 'HD7' ],
			'HD7 T9292':							[ STRINGS_HTC, 'HD7' ],
			'T9295':								[ STRINGS_HTC, 'HD7' ],
			'T9296':								[ STRINGS_HTC, 'HD7' ],
			'HD7 Infinity':							[ STRINGS_HTC, 'HD7' ],
			'T7575':								[ STRINGS_HTC, '7 Pro' ],
			'7 Pro T7576':							[ STRINGS_HTC, '7 Pro' ],
			'mwp6985':								[ STRINGS_HTC, 'Trophy' ],
			'7 Trophy T8686':						[ STRINGS_HTC, 'Trophy' ],
			'7 Trophy':								[ STRINGS_HTC, 'Trophy' ],
			'PC40100':								[ STRINGS_HTC, 'Trophy' ],
			'Touch-IT Trophy':						[ STRINGS_HTC, 'Trophy' ],
			'Radar':								[ STRINGS_HTC, 'Radar' ],
			'Radar 4G':								[ STRINGS_HTC, 'Radar' ],
			'Radar C110e':							[ STRINGS_HTC, 'Radar' ],
			'Mazaa':								[ STRINGS_HTC, 'Mazaa' ], 
			'Mondrian':								[ STRINGS_HTC, 'Mondrian' ],
			'Schubert':								[ STRINGS_HTC, 'Schubert' ],
			'7 Schubert T9292':						[ STRINGS_HTC, 'Schubert' ],
			'Spark':								[ STRINGS_HTC, 'Spark' ],
			'T8788':								[ STRINGS_HTC, 'Surround' ],
			'TITAN X310e':							[ STRINGS_HTC, 'Titan' ],
			'X310e':								[ STRINGS_HTC, 'Titan' ],
			'PI39100':								[ STRINGS_HTC, 'Titan' ],
			'PI86100':								[ STRINGS_HTC, 'Titan II' ],
			'Ultimate':								[ STRINGS_HTC, 'Ultimate' ]
		},
		
		'LG': {
			'GW910':								[ STRINGS_LG, 'Optimus 7' ],
			'LG E-900':								[ STRINGS_LG, 'Optimus 7 E900' ],
			'LG-E900':								[ STRINGS_LG, 'Optimus 7 E900' ],
			'LG-E900h':								[ STRINGS_LG, 'Optimus 7 E900' ],
			'LG-C900':								[ STRINGS_LG, 'Optimus 7Q' ],
			'LG-C900B':								[ STRINGS_LG, 'Quantum' ],
			'LG-C900k':								[ STRINGS_LG, 'Quantum' ]
		},
		
		'nokia': {
			'SeaRay':								[ 'Nokia', 'Lumia 800' ],
			'800C':									[ 'Nokia', 'Lumia 800' ]
		},
		
		'NOKIA': {
			'710':									[ 'Nokia', 'Lumia 710' ],
			'Nokia 710':							[ 'Nokia', 'Lumia 710' ],
			'Lumia 710':							[ 'Nokia', 'Lumia 710' ],
			'Lumia 719':							[ 'Nokia', 'Lumia 719' ],
			'Lumia 800':							[ 'Nokia', 'Lumia 800' ],
			'800':									[ 'Nokia', 'Lumia 800' ],
			'Lumia 900':							[ 'Nokia', 'Lumia 900' ],
			'XXX':									[ 'Nokia', 'prototype' ]
		},
		
		'SAMSUNG': {
			'GT-I8350':								[ STRINGS_SAMSUNG, 'Omnia W' ],
			'GT-I8350T':							[ STRINGS_SAMSUNG, 'Omnia W' ],
			'SGH-i677':								[ STRINGS_SAMSUNG, 'Focus Flash' ],
			'SGH-i707':								[ STRINGS_SAMSUNG, 'Taylor' ],
			'SGH-i917':								[ STRINGS_SAMSUNG, 'Focus' ],
			'SGH-i917R':							[ STRINGS_SAMSUNG, 'Focus' ],
			'SGH-I917':								[ STRINGS_SAMSUNG, 'Focus' ],
			'SGH-i937':								[ STRINGS_SAMSUNG, 'Focus S' ],
			'OMNIA7':								[ STRINGS_SAMSUNG, 'Omnia 7' ],
			'OMINA7':								[ STRINGS_SAMSUNG, 'Omnia 7' ],
			'Taylor':								[ STRINGS_SAMSUNG, 'Taylor' ]
		},

		'TOSHIBA': {
			'TSUNAGI':								[ 'Toshiba', 'Tsunagi' ]
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
		'bcm7231':									[ 'Broadcom', 'BCM7231' + STRINGS_BASED, 'television' ],
		'bcm7425':									[ 'Broadcom', 'BCM7425' + STRINGS_BASED, 'television' ],
		'bcm7429':									[ 'Broadcom', 'BCM7429' + STRINGS_BASED, 'television' ],
		'imx50 rdp':								[ 'Freescale', 'i.MX50' + STRINGS_BASED ],
		'imx51 bbg':								[ 'Freescale', 'i.MX51' + STRINGS_BASED ],
		'imx53 loco':								[ 'Freescale', 'i.MX53' + STRINGS_BASED ],
		'imx53 mp204f3':							[ 'Freescale', 'i.MX53' + STRINGS_BASED ],
		'imx53 smd':								[ 'Freescale', 'i.MX53' + STRINGS_BASED ],
		'imx53 yeagle':								[ 'Freescale', 'i.MX53' + STRINGS_BASED ],
		'imx6q':									[ 'Freescale', 'i.MX6Q' + STRINGS_BASED ],
		'ODROID-A':									[ 'Hardkernel', 'ODROID-A developer tablet', 'tablet' ],
		'mfld dv10':								[ 'Intel', 'Medfield' + STRINGS_BASED ],
		'mfld dv20':								[ 'Intel', 'Medfield' + STRINGS_BASED ],
		'mfld lw00':								[ 'Intel', 'Medfield' + STRINGS_BASED ],
		'mfld pr2':									[ 'Intel', 'Medfield' + STRINGS_BASED ],
		'mfld pr3':									[ 'Intel', 'Medfield' + STRINGS_BASED ],
		'berlin bg2':								[ 'Marvell', 'Armada 1000' + STRINGS_BASED, 'television' ],
		'MStar Amber3':								[ 'MStar', 'Amber3' + STRINGS_BASED ],
		'Konka Amber3':								[ 'MStar', 'Amber3' + STRINGS_BASED ],
		'mt5396':									[ 'Mediatek', 'MT5396' + STRINGS_BASED, 'television' ],
		'bird75v2':									[ 'Mediatek', 'MT6575' + STRINGS_BASED ],
		'eagle75v1 2':								[ 'Mediatek', 'MT6575' + STRINGS_BASED ],
		'MBX DVBT reference board (c03ref)':		[ 'MXB', 'DVBT reference board', 'television' ],
		'NS2816':									[ 'Nufront', 'NuSmart 2816' + STRINGS_BASED ],
		'Ventana':									[ 'nVidia', 'Tegra Ventana development kit' ],
		'Cardhu':									[ 'nVidia', 'Tegra 3' + STRINGS_BASED ],
		'Panda':									[ 'Pandaboard', 'Development Kit' ],
		'pandaboard':								[ 'Pandaboard', 'Development Kit' ],
		'PandaBoard':								[ 'Pandaboard', 'Development Kit' ],
		'MSM':										[ STRINGS_QUALCOMM, 'Snapdragon' + STRINGS_BASED ],
		'msm7227 ffa':								[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
		'msm7627 surf':								[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
		'msm7627a':									[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
		'msm7627a sku1':							[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
		'msm7627a sku3':							[ STRINGS_QUALCOMM, 'Snapdragon S1' + STRINGS_BASED ],
		'msm7630 fusion':							[ STRINGS_QUALCOMM, 'Snapdragon S2' + STRINGS_BASED ],
		'msm7630 surf':								[ STRINGS_QUALCOMM, 'Snapdragon S2' + STRINGS_BASED ],
		'msm8660 cougar':							[ STRINGS_QUALCOMM, 'Snapdragon S3' + STRINGS_BASED ],
		'msm8660 surf':								[ STRINGS_QUALCOMM, 'Snapdragon S3' + STRINGS_BASED ],
		'msm8960':									[ STRINGS_QUALCOMM, 'Snapdragon S4' + STRINGS_BASED ],
		'rk2808sdk':								[ 'Rockchip', 'RK2808' + STRINGS_BASED ],
		'RK2818':									[ 'Rockchip', 'RK2818' + STRINGS_BASED ],
		'rk2818sdk':								[ 'Rockchip', 'RK2818' + STRINGS_BASED ],
		'Android-for-Rockchip-2818':				[ 'Rockchip', 'RK2818' + STRINGS_BASED ],
		'rk29sdk':									[ 'Rockchip', 'RK29' + STRINGS_BASED ],
		'Rk29sdk':									[ 'Rockchip', 'RK29' + STRINGS_BASED ],
		'rk30sdk':									[ 'Rockchip', 'RK30' + STRINGS_BASED ],
		's3c6410':									[ STRINGS_SAMSUNG, 'S3C6410' + STRINGS_BASED ],
		'smdk6410':									[ STRINGS_SAMSUNG, 'S3C6410' + STRINGS_BASED ],
		'SMDKC110':									[ STRINGS_SAMSUNG, 'Exynos 3110' + STRINGS_BASED ],
		'SMDKV210':									[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
		'S5PV210':									[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
		'sec smdkc210':								[ STRINGS_SAMSUNG, 'Exynos 4210' + STRINGS_BASED ],
		'SMDK4x12':									[ STRINGS_SAMSUNG, 'Exynos 4212 or 4412' + STRINGS_BASED ],
		'smp86xx':									[ 'Sigma', 'SMP86xx' + STRINGS_BASED, 'television' ],
		'sv8860':									[ 'Skyviia', 'SV8860' + STRINGS_BASED, 'television' ],
		'ste u8500':								[ 'ST Ericsson', 'Novathor U8500' + STRINGS_BASED ],
		'Telechips M801 Evaluation Board':			[ 'Telechips', 'M801' + STRINGS_BASED, 'television' ],
		'Telechips TCC8900 Evaluation Board':		[ 'Telechips', 'TCC8900' + STRINGS_BASED, 'television' ],
		'TCC8920 STB EV':							[ 'Telechips', 'TCC8920' + STRINGS_BASED, 'television' ],
		'OMAP':										[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
		'OMAP SS':									[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
		'LogicPD Zoom2':							[ STRINGS_TI, 'OMAP' + STRINGS_BASED ],
		'omap3evm':									[ STRINGS_TI, 'OMAP3' + STRINGS_BASED ],
		'Omap5sevm':								[ STRINGS_TI, 'OMAP5' + STRINGS_BASED ],
		'pnx8473 kiryung':							[ 'Trident', 'PNX8473' + STRINGS_BASED, 'television' ],
		
		/* Official Google development devices */
		'crespo':									[ 'Google', 'Nexus S' ],
		'Crespo':									[ 'Google', 'Nexus S' ],
		'Crespo4G':									[ 'Google', 'Nexus S' ],
		'Passion':									[ 'Google', 'Nexus One' ],
		'Bravo':									[ STRINGS_HTC, 'Desire' ],
		'dream':									[ STRINGS_HTC, 'Dream' ],
		'Vogue':									[ STRINGS_HTC, 'Touch' ],
		'Vendor Optimus':							[ STRINGS_LG, 'Optimus' ],
		'Stingray':									[ STRINGS_MOTOROLA, 'XOOM', 'tablet' ],
		'Wingray':									[ STRINGS_MOTOROLA, 'XOOM', 'tablet' ],
		'maguro':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'Maguro':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'Toro-VZW':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'blaze':									[ STRINGS_TI, 'Blaze Tablet', 'tablet' ],
		'Blaze':									[ STRINGS_TI, 'Blaze Tablet', 'tablet' ],
		'Blaze Tablet':								[ STRINGS_TI, 'Blaze Tablet', 'tablet' ],
		
		/* Middleware and emulators */
		'BlueStacks':								[ 'BlueStacks', 'App Player', 'desktop' ],
		'youwave custom':							[ 'Youwave', 'Android on PC', 'desktop' ],
		'BlackBerry Runtime for Android Apps':		[ 'RIM', 'BlackBerry (Android Runtime)', 'mobile' ],
		
		/* Regular devices */
		'A100':										[ STRINGS_ACER, 'Iconia Tab A100', 'tablet' ],
		'A101':										[ STRINGS_ACER, 'Iconia Tab A101', 'tablet' ],
		'A200':										[ STRINGS_ACER, 'Iconia Tab A200', 'tablet' ],
		'A500':										[ STRINGS_ACER, 'Iconia Tab A500', 'tablet' ],
		'A501':										[ STRINGS_ACER, 'Iconia Tab A501', 'tablet' ],
		'A510':										[ STRINGS_ACER, 'Iconia Tab A510', 'tablet' ],
		'A511':										[ STRINGS_ACER, 'Iconia Tab A511', 'tablet' ],
		'A700':										[ STRINGS_ACER, 'Iconia Tab A700', 'tablet' ],
		'Acer A800':								[ STRINGS_ACER, 'Iconia Tab A800', 'tablet' ],
		'E110':										[ STRINGS_ACER, 'beTouch E110' ],
		'E120':										[ STRINGS_ACER, 'beTouch E120' ],
		'E130':										[ STRINGS_ACER, 'beTouch E130' ],
		'E140':										[ STRINGS_ACER, 'beTouch E140' ],
		'E210':										[ STRINGS_ACER, 'beTouch E210' ],
		'E310':										[ STRINGS_ACER, 'Liquid mini' ],
		'E320':										[ STRINGS_ACER, 'Liquid Express' ],
		'E330':										[ STRINGS_ACER, 'Liquid Glow' ],
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
		'Liquid Mt':								[ STRINGS_ACER, 'Liquid mt' ],
		'Liquid MT':								[ STRINGS_ACER, 'Liquid mt' ],
		'Liquid Metal':								[ STRINGS_ACER, 'Liquid mt' ],
		'Stream':									[ STRINGS_ACER, 'Stream' ],
		'N700':										[ 'aigo', 'N700', 'tablet' ],
		'M801':										[ 'aigo', 'M801', 'tablet' ],
		'Novo7':									[ 'Ainovo', 'Novo7', 'tablet' ],
		'Novo7 Aurora':								[ 'Ainovo', 'Novo7 Aurora', 'tablet' ],
		'Novo7 Advanced':							[ 'Ainovo', 'Novo7 Advanced', 'tablet' ],
		'Novo7 Advanced2':							[ 'Ainovo', 'Novo7 Advanced 2', 'tablet' ],
		'Novo7 Basic':								[ 'Ainovo', 'Novo7 Basic', 'tablet' ],
		'Novo7 ELF':								[ 'Ainovo', 'Novo7 Elf', 'tablet' ],
		'Novo7 PALADIN':							[ 'Ainovo', 'Novo7 Paladin', 'tablet' ],
		'Novo8 Advanced':							[ 'Ainovo', 'Novo8 Advanced', 'tablet' ],
		'one touch 890':							[ STRINGS_ALCATEL, 'One Touch 890' ],
		'one touch 890D':							[ STRINGS_ALCATEL, 'One Touch 890' ],
		'one touch 891':							[ STRINGS_ALCATEL, 'One Touch 891' ],
		'ONE TOUCH 903':							[ STRINGS_ALCATEL, 'One Touch 903SHV-E170K' ],
		'one touch 906':							[ STRINGS_ALCATEL, 'One Touch 906' ],
		'one touch 908':							[ STRINGS_ALCATEL, 'One Touch 908' ],
		'one touch 908F':							[ STRINGS_ALCATEL, 'One Touch 908' ],
		'one touch 908S':							[ STRINGS_ALCATEL, 'One Touch 908' ],
		'one touch 910':							[ STRINGS_ALCATEL, 'One Touch 910' ],
		'one touch 918':							[ STRINGS_ALCATEL, 'One Touch 918' ],
		'one touch 918D':							[ STRINGS_ALCATEL, 'One Touch 918' ],
		'ONE TOUCH 918D':							[ STRINGS_ALCATEL, 'One Touch 918' ],
		'one touch 918M':							[ STRINGS_ALCATEL, 'One Touch 918' ],
		'one touch 918N':							[ STRINGS_ALCATEL, 'One Touch 918' ],
		'one touch 980':							[ STRINGS_ALCATEL, 'One Touch 980' ],
		'one touch 980A':							[ STRINGS_ALCATEL, 'One Touch 980' ],
		'one touch 981A':							[ STRINGS_ALCATEL, 'One Touch 981' ],
		'one touch 986':							[ STRINGS_ALCATEL, 'One Touch 986' ],
		'one touch 990':							[ STRINGS_ALCATEL, 'One Touch 990' ],
		'one touch 990A':							[ STRINGS_ALCATEL, 'One Touch 990' ],
		'one touch 991':							[ STRINGS_ALCATEL, 'One Touch 991' ],
		'one touch 991D':							[ STRINGS_ALCATEL, 'One Touch 991' ],
		'ONE TOUCH 993':							[ STRINGS_ALCATEL, 'One Touch 993' ],
		'one touch 995':							[ STRINGS_ALCATEL, 'One Touch 995' ],
		'Telenor OneTouch':							[ STRINGS_ALCATEL, 'One Touch 990' ],
		'OT 918':									[ STRINGS_ALCATEL, 'One Touch 918' ],
		'Venture':									[ STRINGS_ALCATEL, 'Venture' ],
		'Allwinner A10':							[ 'AllWinner', 'A10', 'tablet' ],
		'97FC':										[ 'AllWinner', 'A10 97FC', 'tablet' ],
		'Kindle Fire':								[ 'Amazon', 'Kindle Fire', 'tablet' ],
		'Amazon Kindle Fire':						[ 'Amazon', 'Kindle Fire', 'tablet' ],
		'AMD120':									[ 'AnyDATA', 'AnyTAB AMD120', 'tablet' ],
		'MW0811':									[ 'AOC', 'Breeze MW0811', 'tablet' ],
		'MW0821 V2.0':								[ 'AOC', 'Breeze MW0821', 'tablet' ],
		'MW0922':									[ 'AOC', 'Breeze MW0922', 'tablet' ],
		'Apanda A60':								[ 'Apanda', 'A60' ],
		'apanda-A60':								[ 'Apanda', 'A60' ],
		'A80KSC':									[ STRINGS_ARCHOS, 'Arnova 8', 'tablet' ],
		'AN7CG2':									[ STRINGS_ARCHOS, 'Arnova 7', 'tablet' ],
		'A101B':									[ STRINGS_ARCHOS, 'Arnova 10', 'tablet' ],
		'AN10BG2DT':								[ STRINGS_ARCHOS, 'Arnova 10 B', 'tablet' ],
		'AN10G2':									[ STRINGS_ARCHOS, 'Arnova 10 G2', 'tablet' ],
		'A32':										[ STRINGS_ARCHOS, '32', 'media' ],
		'A35DE':									[ STRINGS_ARCHOS, '35 Smart Home Phone' ],
		'A43':										[ STRINGS_ARCHOS, '43', 'media' ],
		'Archos5':									[ STRINGS_ARCHOS, '5', 'media' ],
		'A70H':										[ STRINGS_ARCHOS, '7', 'tablet' ],
		'A70HB':									[ STRINGS_ARCHOS, '7', 'tablet' ],
		'A70BHT':									[ STRINGS_ARCHOS, '7', 'tablet' ],
		'A70CHT':									[ STRINGS_ARCHOS, '7C', 'tablet' ],
		'A70S':										[ STRINGS_ARCHOS, '70', 'tablet' ],
		'A7EB':										[ STRINGS_ARCHOS, '70B', 'tablet' ],
		'ARCHOS 70it2':								[ STRINGS_ARCHOS, '70 IT 2', 'tablet' ],
		'ARCHOS 80G9':								[ STRINGS_ARCHOS, '80 G9', 'tablet' ],
		'ARCHOS 101G9':								[ STRINGS_ARCHOS, '101 G9', 'tablet' ],
		'A101IT':									[ STRINGS_ARCHOS, '101 IT', 'tablet' ],
		'ASTRI':									[ 'ASTRI', 'e-reader', 'ereader' ],
		'eeepc':									[ STRINGS_ASUS, 'Eee Pc' ],
		'asus laptop':								[ STRINGS_ASUS, 'Eee Pc' ],
		'ME171':									[ STRINGS_ASUS, 'Eee Pad MeMO', 'tablet' ],
		'Slider SL101':								[ STRINGS_ASUS, 'Eee Pad Slider', 'tablet' ],
		'EPAD':										[ STRINGS_ASUS, 'Eee Pad Transformer', 'tablet' ],
		'TF101':									[ STRINGS_ASUS, 'Eee Pad Transformer', 'tablet' ],
		'Transformer TF101':						[ STRINGS_ASUS, 'Eee Pad Transformer', 'tablet' ],
		'Transformer TF101G':						[ STRINGS_ASUS, 'Eee Pad Transformer', 'tablet' ],
		'TF201':									[ STRINGS_ASUS, 'Eee Pad Transformer Prime', 'tablet' ],
		'Transformer Prime TF201':					[ STRINGS_ASUS, 'Eee Pad Transformer Prime', 'tablet' ],
		'Transformer Prime':						[ STRINGS_ASUS, 'Eee Pad Transformer Prime', 'tablet' ],
		'Transformer Pad TF300T':					[ STRINGS_ASUS, 'Transformer Pad 300', 'tablet' ],
		'ASUS Transformer TF300T':					[ STRINGS_ASUS, 'Transformer Pad 300', 'tablet' ],
		'ASUS Transformer Pad TF300T':				[ STRINGS_ASUS, 'Transformer Pad 300', 'tablet' ],
		'ASUS Transformer Pad TF300TG':				[ STRINGS_ASUS, 'Transformer Pad 300', 'tablet' ],
		'ASUS Transformer Pad TF700T':				[ STRINGS_ASUS, 'Transformer Pad Infinity 700', 'tablet' ],
		'ASUS Transformer Pad TF700K':				[ STRINGS_ASUS, 'Transformer Pad Infinity 700', 'tablet' ],
		'ASUS Transformer TF700K':					[ STRINGS_ASUS, 'Transformer Pad Infinity 700', 'tablet' ],
		'PadFone':									[ STRINGS_ASUS, 'Padfone', 'tablet' ],
		'OMS TTD':									[ STRINGS_ASUS, 'Eee Pc T10' ],
		'ASUS T20':									[ STRINGS_ASUS, 'Eee Pc T20' ],
		'ETBW11AA':									[ STRINGS_ASUS, 'Tough' ],
		'AUX V900':									[ 'AUX', 'V900' ],
		'PICOpad-QGN':								[ 'Axioo', 'Picopad QGN', 'tablet' ],
		'NOOK':										[ STRINGS_BN, 'NOOK', 'ereader' ],
		'NookColor':								[ STRINGS_BN, 'NOOK Color', 'ereader' ],
		'NOOK BNRV200':								[ STRINGS_BN, 'NOOK Color', 'ereader' ],
		'NOOK BNRV300':								[ STRINGS_BN, 'NOOK Color', 'ereader' ],
		'NookTablet':								[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'Nook Tablet':								[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'NOOK BNTV250':								[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'NOOK BNTV250A':							[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'BNTV250':									[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'BNTV250A':									[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'NOOK Slate':								[ STRINGS_BN, 'NOOK Tablet', 'ereader' ],
		'BenWee 5100':								[ 'BenWee', '5100' ],
		'CA907AAC0G':								[ 'Besta', 'CA907AAC0G' ],
		'BM999':									[ 'Bmorn', 'BM999', 'tablet' ],
		'V11':										[ 'Bmorn', 'V11', 'tablet' ],
		'V99':										[ 'Bmorn', 'V99', 'tablet' ],
		'bq DaVinci':								[ 'bq', 'DaVinci', 'tablet' ],
		'CT704':									[ 'Carrefour', 'CT704', 'tablet' ],
		'CT1002':									[ 'Carrefour', 'CT1002', 'tablet' ],
		'Camangi-Mangrove7':						[ 'Camangi', 'Mangrove 7', 'tablet' ],
		'WS171':									[ 'Camangi', 'WebStation', 'tablet' ],
		'IS11CA':									[ 'Casio', 'GzOne IS11CA' ],
		'C771':										[ 'Casio', 'GzOne Commando' ],
		'CAT NOVA':									[ 'Cat', 'NOVA', 'tablet' ],
		'ARMM3V':									[ 'chinaleap', 'ARMM3V', 'tablet' ],
		'CIUS-7':									[ 'Cisco', 'Cius', 'tablet' ],
		'CIUS-7-AT':								[ 'Cisco', 'Cius', 'tablet' ],
		'CSL Spice MI300':							[ 'CSL', 'Spice MI300' ],
		'CSL-MI410':								[ 'CSL', 'Spice MI410' ],
		'MID1024':									[ 'Coby', 'Kyros MID1024', 'tablet' ],
		'MID1125':									[ 'Coby', 'Kyros MID1125', 'tablet' ],
		'MID1126':									[ 'Coby', 'Kyros MID1126', 'tablet' ],
		'MID7010':									[ 'Coby', 'Kyros MID7010', 'tablet' ],
		'MID7012':									[ 'Coby', 'Kyros MID7012', 'tablet' ],
		'MID7015':									[ 'Coby', 'Kyros MID7015', 'tablet' ],
		'MID7015A':									[ 'Coby', 'Kyros MID7015', 'tablet' ],
		'MID7016':									[ 'Coby', 'Kyros MID7016', 'tablet' ],
		'MID7020':									[ 'Coby', 'Kyros MID7020', 'tablet' ],
		'MID7022':									[ 'Coby', 'Kyros MID7022', 'tablet' ],
		'MID7024':									[ 'Coby', 'Kyros MID7024', 'tablet' ],
		'MID7025':									[ 'Coby', 'Kyros MID7025', 'tablet' ],
		'MID7127':									[ 'Coby', 'Kyros MID7127', 'tablet' ],
		'MID8024':									[ 'Coby', 'Kyros MID8024', 'tablet' ],
		'MID8125':									[ 'Coby', 'Kyros MID8125', 'tablet' ],
		'MID8127':									[ 'Coby', 'Kyros MID8127', 'tablet' ],
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
		'Coolpad W706':								[ STRINGS_COOLPAD, 'W706' ],
		'Coolpad W706+':							[ STRINGS_COOLPAD, 'W706' ],
		'Coolpad W708':								[ STRINGS_COOLPAD, 'W708' ],
		'W711':										[ STRINGS_COOLPAD, 'W711' ],
		'Coolpad 5210':								[ STRINGS_COOLPAD, '5210' ],
		'Coolpad 5820':								[ STRINGS_COOLPAD, '5820' ],
		'5832':										[ STRINGS_COOLPAD, '5832' ],
		'Coolpad 5832':								[ STRINGS_COOLPAD, '5832' ],
		'5855':										[ STRINGS_COOLPAD, '5855' ],
		'Coolpad 5860':								[ STRINGS_COOLPAD, '5860' ],
		'Coolpad 5860+':							[ STRINGS_COOLPAD, '5860' ],
		'5860':										[ STRINGS_COOLPAD, '5860' ],
		'Coolpad 5870':								[ STRINGS_COOLPAD, '5870' ],
		'Coolpad 7005':								[ STRINGS_COOLPAD, '7005' ],
		'7260':										[ STRINGS_COOLPAD, '7260' ],
		'Coolpad 7260':								[ STRINGS_COOLPAD, '7260' ],
		'Coolpad 8013':								[ STRINGS_COOLPAD, '8013' ],
		'Coolpad 8809':								[ STRINGS_COOLPAD, '8809' ],
		'Coolpad 8810':								[ STRINGS_COOLPAD, '8810' ],
		'8810':										[ STRINGS_COOLPAD, '8810' ],
		'Coolpad 8811':								[ STRINGS_COOLPAD, '8811' ],
		'Coolpad 9900':								[ STRINGS_COOLPAD, '9900' ],
		'ZiiO7':									[ 'Creative', 'ZiiO 7', 'tablet' ],
		'ZiiLABS ZiiO7':							[ 'Creative', 'ZiiO 7', 'tablet' ],
		'ZiiLABS ZiiO10 ':							[ 'Creative', 'ZiiO 10', 'tablet' ],
		'CUBE K8GT A':								[ 'Cube', 'K8GT A', 'tablet' ],
		'CUBE K8GT B':								[ 'Cube', 'K8GT B', 'tablet' ],
		'K8GT C':									[ 'Cube', 'K8GT C', 'tablet' ],
		'K8GT H':									[ 'Cube', 'K8GT H', 'tablet' ],
		'CUBE K8GT H':								[ 'Cube', 'K8GT H', 'tablet' ],
		'K8GT W':									[ 'Cube', 'K8GT W', 'tablet' ],
		'CUBE U8GT':								[ 'Cube', 'U8GT', 'tablet' ],
		'CUBE U9GT':								[ 'Cube', 'U9GT', 'tablet' ],
		'CUBE U9GT 2':								[ 'Cube', 'U9GT 2', 'tablet' ],
		'Cube U9GT2':								[ 'Cube', 'U9GT 2', 'tablet' ],
		'U9GT':										[ 'Cube', 'U9GT', 'tablet' ],
		'U9GT2 From moage.com':						[ 'Cube', 'U9GT 2', 'tablet' ],
		'N90 From moage.com':						[ 'Cube', 'U9GT 2', 'tablet' ],
		'U9GT S':									[ 'Cube', 'U9GT S', 'tablet' ],
		'U9GT S A':									[ 'Cube', 'U9GT SA', 'tablet' ],
		'U9GTS A':									[ 'Cube', 'U9GT SA', 'tablet' ],
		'U10GT 2':									[ 'Cube', 'U10GT 2', 'tablet' ],
		'U10GT S':									[ 'Cube', 'U10GT S', 'tablet' ],
		'U30GT-H':									[ 'Cube', 'U30GT H', 'tablet' ],
		'CUBE Q7PRO':								[ 'Cube', 'Q7 Pro', 'tablet' ],
		'CUBE Q7PRO J':								[ 'Cube', 'Q7 Pro', 'tablet' ],
		'Cydle M7 (v0005.04.03.12.ko)':				[ 'Cydle', 'M7 MultiPAD', 'tablet' ],
		'Dell Aero':								[ 'Dell', 'Aero' ],
		'Dell M01M':								[ 'Dell', 'Mini 5', 'tablet' ],
		'Dell Streak':								[ 'Dell', 'Streak', 'tablet' ],
		'001DL':									[ 'Dell', 'Streak', 'tablet' ],
		'101DL':									[ 'Dell', 'Streak Pro', 'tablet' ],
		'GS01':										[ 'Dell', 'Streak Pro', 'tablet' ],
		'Dell Streak Pro':							[ 'Dell', 'Streak Pro', 'tablet' ],
		'streak7':									[ 'Dell', 'Streak 7', 'tablet' ],
		'Dell Streak 7':							[ 'Dell', 'Streak 7', 'tablet' ],
		'Dell Streak 10 Pro':						[ 'Dell', 'Streak 10 Pro', 'tablet' ],
		'Dell V04B':								[ 'Dell', 'Streak V04B', 'tablet' ],
		'Dell Venue':								[ 'Dell', 'Venue' ],
		'Dell XCD35':								[ 'Dell', 'XCD35' ],
		'XCD35':									[ 'Dell', 'XCD35' ],
		'iDx7':										[ 'Digma', 'iDx7', 'tablet' ],
		'iDx10':									[ 'Digma', 'iDx10', 'tablet' ],
		'iDx10 3G':									[ 'Digma', 'iDx10', 'tablet' ],
		'DM009SH':									[ 'Disney Mobile', 'DM009SH' ],
		'DM010SH':									[ 'Disney Mobile', 'DM010SH' ],
		'DM012SH':									[ 'Disney Mobile', 'DM012SH' ],
		'F-08D':									[ 'Disney Mobile', 'F-08D' ],
		'P-05D':									[ 'Disney Mobile', 'P-05D' ],
		'Tablet-P27':								[ 'DracoTek', 'P27 Tablet', 'tablet' ],
		'edgejr':									[ 'EnTourage', 'Pocket eDGe', 'tablet' ],
		'l97D':										[ 'EPad', 'l97D', 'tablet' ],
		'M4301':									[ 'Eston', 'MID M4301', 'media' ],
		'P10AN':									[ 'Exper', 'Easypad P10AN', 'tablet' ],
		'FIH-F0X':									[ 'FIH', 'F0X' ],
		'Fly IQ260':								[ 'Fly', 'IQ260 BlackBird' ],
		'ISW11F':									[ 'Fujitsu', 'Arrows Z' ],
		'ISW13F':									[ 'Fujitsu', 'Arrows Z' ],
		'IS12F':									[ 'Fujitsu', 'Arrows ES' ],
		'F-01D':									[ 'Fujitsu', 'Arrows Tab LTE', 'tablet' ],
		'F-03D':									[ 'Fujitsu', 'Arrows Kiss' ],
		'F-05D':									[ 'Fujitsu', 'Arrows X LTE' ],
		'F-07D':									[ 'Fujitsu', 'Arrows μ' ],
		'F-10D':									[ 'Fujitsu', 'Arrows X F-10D' ],
		'F-12C':									[ 'Fujitsu', 'Globetrotter' ],
		'f12arc':									[ 'Fujitsu', 'F12arc' ],
		'M532':										[ 'Fujitsu', 'Stylistic M532', 'tablet' ],
		'Garminfone':								[ 'Garmin-Asus', 'Garminfone' ],
		'Garmin-Asus A10':							[ 'Garmin-Asus', 'Nuvifone A10' ],
		'Garmin-Asus A50':							[ 'Garmin-Asus', 'Nuvifone A50' ],
		'TPA60W':									[ 'Gateway', 'TPA60W', 'tablet' ],
		'Geeksphone ZERO':							[ 'Geeksphone', 'ZERO'],
		'gemei G2':									[ 'Gemei', 'G2', 'tablet' ],
		'Gemei G2':									[ 'Gemei', 'G2', 'tablet' ],
		'gemei G3':									[ 'Gemei', 'G3', 'tablet' ],
		'Gemei G9':									[ 'Gemei', 'G9', 'tablet' ],
		'GSmart G1317D':							[ 'Gigabyte', 'GSmart G1317D' ],
		'Gigabyte TB100':							[ 'Gigabyte', 'TB100', 'tablet' ],
		'GN105':									[ 'Gionee', 'GN105' ],		
		'GN200':									[ 'Gionee', 'GN200' ],		
		'GN205':									[ 'Gionee', 'GN205' ],
		'Google Ion':								[ 'Google', 'Ion' ],
		'Nexus One':								[ 'Google', 'Nexus One' ],
		'NexusOne':									[ 'Google', 'Nexus One' ],
		'HTC Nexus One':							[ 'Google', 'Nexus One' ],	
		'Nexus S':									[ 'Google', 'Nexus S' ],
		'Google Nexus S':							[ 'Google', 'Nexus S' ],
		'Nexus S 4G':								[ 'Google', 'Nexus S 4G' ],
		'Dooderbutt-4.0.3-v1':						[ 'Google', 'Nexus S 4G' ],
		'Nexus 7':									[ 'Google', 'Nexus 7', 'tablet' ],
		'Haier HW-W910':							[ 'Haier', 'HW-W910' ],
		'SN10T1':									[ 'HANNspree', 'HANNSpad SN10T1', 'tablet' ],
		'SN10T2':									[ 'HANNspree', 'HANNSpad SN10T2', 'tablet' ],
		'HannsComb':								[ 'HANNspree', 'HANNSpad', 'tablet' ],
		'X1':										[ 'HCL', 'ME X1', 'tablet' ],
		'MID Serails':								[ 'Herotab', 'C8', 'tablet' ],
		'MID Serials':								[ 'Herotab', 'C8', 'tablet' ],
		'COSMO DUO':								[ 'Hiscreen', 'Cosmo DUO', 'tablet' ],
		'HS-U8':									[ 'Hisense', 'U8' ],
		'HS-T92':									[ 'Hisense', 'T92' ],
		'HS-E860':									[ 'Hisense', 'E860' ],
		'HS-E910':									[ 'Hisense', 'E910' ],
		'HS-EG900':									[ 'Hisense', 'EG900' ],
		'HS-ET919':									[ 'Hisense', 'ET919' ],
		'EG968B':									[ 'Hisense', 'EG968B' ],
		'HKPHONE H8-3G':							[ 'HKPhone', 'H8 3G' ],
		'HOSIN U2':									[ 'Hosin', 'U2' ],
		'Touchpad':									[ 'HP', 'TouchPad', 'tablet' ],
		'HP Touchpad':								[ 'HP', 'TouchPad', 'tablet' ],
		'cm tenderloin':							[ 'HP', 'TouchPad', 'tablet' ],
		'aokp tenderloin':							[ 'HP', 'TouchPad', 'tablet' ],
		'HTC Amaze 4G':								[ STRINGS_HTC, 'Amaze 4G' ],		/* T-Mobile */
		'HTC Ruby':									[ STRINGS_HTC, 'Amaze 4G' ],
		'HTC Amaze 4G(Ruby)':						[ STRINGS_HTC, 'Amaze 4G' ],
		'Amaze 4G':									[ STRINGS_HTC, 'Amaze 4G' ],
		'HTC Aria':									[ STRINGS_HTC, 'Aria' ],			/* AT&T */
		'HTC Aria A6380':							[ STRINGS_HTC, 'Aria' ],			/* AT&T */
		'HTC Liberty A6380':						[ STRINGS_HTC, 'Aria' ],
		'HTC Liberty':								[ STRINGS_HTC, 'Aria' ],
		'HTC A6366':								[ STRINGS_HTC, 'Aria' ],
		'HTC Bee':									[ STRINGS_HTC, 'Bee' ],
		'HTC ChaCha':								[ STRINGS_HTC, 'ChaCha' ],
		'HTC ChaCha A810e':							[ STRINGS_HTC, 'ChaCha' ],
		'HTC ChaChaCha A810e':						[ STRINGS_HTC, 'ChaCha' ],
		'HTC A810e':								[ STRINGS_HTC, 'ChaCha' ],
		'HTC A9188':								[ STRINGS_HTC, 'Cullinan' ],
		'HTC Bravo':								[ STRINGS_HTC, 'Desire' ],
		'HTC Desire':								[ STRINGS_HTC, 'Desire' ],
		'HTC Desire A8181':							[ STRINGS_HTC, 'Desire' ],
		'HTC Desire A8183':							[ STRINGS_HTC, 'Desire' ],
		'HTC Desire Beats A8181':					[ STRINGS_HTC, 'Desire' ],
		'HTC Desire CDMA':							[ STRINGS_HTC, 'Desire' ],
		'HTC Desire SMS':							[ STRINGS_HTC, 'Desire' ],
		'HTC Desire S.M.S':							[ STRINGS_HTC, 'Desire' ],
		'HTC Desire C':								[ STRINGS_HTC, 'Desire C' ],
		'HTC DesireHD':								[ STRINGS_HTC, 'Desire HD' ],
		'HTC DesireHD A9191':						[ STRINGS_HTC, 'Desire HD' ],
		'HTC DesireHD A9192':						[ STRINGS_HTC, 'Desire HD' ],
		'HTC Desire HD A9191':						[ STRINGS_HTC, 'Desire HD' ],
		'HTC A9191':								[ STRINGS_HTC, 'Desire HD' ],
		'HTC A9191 for AT&T':						[ STRINGS_HTC, 'Desire HD' ],
		'HTC A9192':								[ STRINGS_HTC, 'Desire HD' ],
		'HTC Desire HD':							[ STRINGS_HTC, 'Desire HD' ],
		'HTC Desire HD with Beats Audio':			[ STRINGS_HTC, 'Desire HD' ],
		'HTC Desire S':								[ STRINGS_HTC, 'Desire S' ],
		'HTC DesireS':								[ STRINGS_HTC, 'Desire S' ],
		'HTC DesiresS':								[ STRINGS_HTC, 'Desire S' ],
		'HTC DesireS S510e':						[ STRINGS_HTC, 'Desire S' ],
		'HTC DesireS S510b':						[ STRINGS_HTC, 'Desire S' ],
		'HTC Desire S S510e':						[ STRINGS_HTC, 'Desire S' ],
		'HTC S510e':								[ STRINGS_HTC, 'Desire S' ],
		'HTC Desire Saga':							[ STRINGS_HTC, 'Desire S' ],
		'HTC Desire V':								[ STRINGS_HTC, 'Desire V' ],
		'HTC T328w':								[ STRINGS_HTC, 'Desire V' ],
		'HTC Desire VC':							[ STRINGS_HTC, 'Desire VC' ],
		'HTC T328d':								[ STRINGS_HTC, 'Desire VC' ],
		'HTC T328t':								[ STRINGS_HTC, 'Desire VT' ],
		'HTC Desire Z':								[ STRINGS_HTC, 'Desire Z' ],
		'HTC DesireZ':								[ STRINGS_HTC, 'Desire Z' ],	
		'HTC DesireZ A7272':						[ STRINGS_HTC, 'Desire Z' ],
		'HTC Desire Z A7272':						[ STRINGS_HTC, 'Desire Z' ],
		'HTC Vision':								[ STRINGS_HTC, 'Desire Z' ],
		'HTC A7275':								[ STRINGS_HTC, 'Desire Z' ],
		'HTC Dream':								[ STRINGS_HTC, 'Dream' ],
		'HTC S710d':								[ STRINGS_HTC, 'Droid Incredible 2' ],
		'HTC Incredible 2':							[ STRINGS_HTC, 'Droid Incredible 2' ],
		'HTC X515d':								[ STRINGS_HTC, 'EVO 3D' ],				/* Sprint */
		'HTC X515m':								[ STRINGS_HTC, 'EVO 3D' ],
		'HTC X515C':								[ STRINGS_HTC, 'EVO 3D' ],
		'HTC Evo 3D':								[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D':								[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D GSM':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D X515a':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D GSM X515m':						[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D X515m':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO 3D X515M':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO3D X515a':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC EVO3D X515m':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC Evo 3D X515m':							[ STRINGS_HTC, 'EVO 3D' ],
		'HTC Evo 3D with Beats Audio X515m':		[ STRINGS_HTC, 'EVO 3D' ],
		'HTC Evo 4G':								[ STRINGS_HTC, 'EVO 4G' ],
		'HTC EVO 4G':								[ STRINGS_HTC, 'EVO 4G' ],
		'HTC X515E':								[ STRINGS_HTC, 'EVO 4G+' ],
		'HTC EVO 4G+ For Sprint':					[ STRINGS_HTC, 'EVO 4G+' ],
		'HTC EVO 4G++ For Sprint':					[ STRINGS_HTC, 'EVO 4G+' ],
		'HTC C715c':								[ STRINGS_HTC, 'EVO Design 4G' ],
		'HTC Design 4G':							[ STRINGS_HTC, 'EVO Design 4G' ],		/* Sprint */
		'HTC EVO design 4G':						[ STRINGS_HTC, 'EVO Design 4G' ],
		'HTC EVO Design 4G':						[ STRINGS_HTC, 'EVO Design 4G' ],
		'HTC Evo Shift':							[ STRINGS_HTC, 'EVO Shift' ],
		'HTC EVO Shift 4G':							[ STRINGS_HTC, 'EVO Shift' ],
		'HTC A310e':								[ STRINGS_HTC, 'Explorer' ],
		'HTC Explorer':								[ STRINGS_HTC, 'Explorer' ],
		'HTC Explorer A310':						[ STRINGS_HTC, 'Explorer' ],
		'HTC Explorer A310b':						[ STRINGS_HTC, 'Explorer' ],
		'HTC Explorer A310e':						[ STRINGS_HTC, 'Explorer' ],
		'HTC P510e':								[ STRINGS_HTC, 'Flyer', 'tablet' ],
		'HTC Flyer':								[ STRINGS_HTC, 'Flyer', 'tablet' ],
		'HTC Flyer P510e':							[ STRINGS_HTC, 'Flyer', 'tablet' ],
		'HTC Flyer P512':							[ STRINGS_HTC, 'Flyer', 'tablet' ],
		'HTC Flyer P512 NA':						[ STRINGS_HTC, 'Flyer', 'tablet' ],
		'HTC P515E':								[ STRINGS_HTC, 'Flyer 4G', 'tablet' ],
		'HTC Gratia A6380':							[ STRINGS_HTC, 'Gratia' ],
		'HTC HD':									[ STRINGS_HTC, 'HD' ],
		'HTC HD2':									[ STRINGS_HTC, 'HD2' ],
		'HTC HD2 T8585':							[ STRINGS_HTC, 'HD2' ],
		'HTC HD2(Leo)':								[ STRINGS_HTC, 'HD2' ],
		'HTC HD7':									[ STRINGS_HTC, 'HD7' ],
		'HTC T9299+':								[ STRINGS_HTC, 'HD7' ],
		'HTC HD7 for Sprint':						[ STRINGS_HTC, 'HD7' ],
		'HTC HD7 4G T9299 For AT&T':				[ STRINGS_HTC, 'HD7' ],
		'HTC HD7 4G T9299+ For AT&T':				[ STRINGS_HTC, 'HD7' ],
		'HTC T9299+ For AT&T':						[ STRINGS_HTC, 'HD7' ],
		'HTC HD7S T9399+':							[ STRINGS_HTC, 'HD7s' ],
		'HTC HD7S T9899+':							[ STRINGS_HTC, 'HD7s' ],
		'HTC T9899+ For AT&T':						[ STRINGS_HTC, 'HD7s' ],
		'VitMod ExtraLite 1.6.5.fullodex for HTC HD7 Pro':		[ STRINGS_HTC, 'HD7 Pro' ],
		'HTC Hero':									[ STRINGS_HTC, 'Hero' ],
		'HTC HERO':									[ STRINGS_HTC, 'Hero' ],
		'HTC Hero CDMA':							[ STRINGS_HTC, 'Hero' ],
		'HTC HERO CDMA':							[ STRINGS_HTC, 'Hero' ],
		'HTC HERO200':								[ STRINGS_HTC, 'Hero 200' ],			/* Sprint */
		'HTC Hero S':								[ STRINGS_HTC, 'Hero S' ],				/* US Cellular */
		'HTC IMAGIO':								[ STRINGS_HTC, 'Imagio' ],
		'HTC Incredible':							[ STRINGS_HTC, 'Incredible' ],
		'HTC Incredible S710E':						[ STRINGS_HTC, 'Incredible S' ],
		'HTC S710e':								[ STRINGS_HTC, 'Incredible S' ],
		'HTC Incredible S':							[ STRINGS_HTC, 'Incredible S' ],
		'HTC Incredible S S710e':					[ STRINGS_HTC, 'Incredible S' ],
		'HTC Incredible S s710e':					[ STRINGS_HTC, 'Incredible S' ],
		'HTC IncredibleS S710e':					[ STRINGS_HTC, 'Incredible S' ],
		'HTC Incredible S with Beats Audio':		[ STRINGS_HTC, 'Incredible S' ],
		'HTC Vivo':									[ STRINGS_HTC, 'Incredible S' ],
		'HTC Innovation':							[ STRINGS_HTC, 'Innovation' ],
		'HTC Inspire 4G':							[ STRINGS_HTC, 'Inspire 4G' ],			/* AT&T */	
		'HTC HD7 Inspire 4G For Vodafone':			[ STRINGS_HTC, 'Inspire 4G' ],
		'HTC P715a':								[ STRINGS_HTC, 'Jetstream', 'tablet' ],
		'HTC Legend':								[ STRINGS_HTC, 'Legend' ],
		'HTC Magic':								[ STRINGS_HTC, 'Magic' ],
		'HTC Sapphire':								[ STRINGS_HTC, 'Magic' ],
		'HTC Lexikon':								[ STRINGS_HTC, 'Merge' ],
		'HTC One S':								[ STRINGS_HTC, 'One S' ],
		'HTC Z520e':								[ STRINGS_HTC, 'One S' ],
		'HTC One V':								[ STRINGS_HTC, 'One V' ],
		'HTC T320e':								[ STRINGS_HTC, 'One V' ],
		'HTC One X':								[ STRINGS_HTC, 'One X' ],
		'HTC S720e':								[ STRINGS_HTC, 'One X' ],
		'HTC Endeavour-LS':							[ STRINGS_HTC, 'One X' ],
		'HTC One XL':								[ STRINGS_HTC, 'One XL' ],
		'HTC X710a':								[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Raider':								[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Raider X710e':							[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Raider X710s':							[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Raider 4G X710e':						[ STRINGS_HTC, 'Raider 4G' ],
		'HTC PH39100':								[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Holiday':								[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Velocity 4G X710s':					[ STRINGS_HTC, 'Raider 4G' ],
		'HTC Rezound':								[ STRINGS_HTC, 'Rezound' ],
		'HTC Rhyme S510b':							[ STRINGS_HTC, 'Rhyme' ],				/* Verizon */
		'HTC S510b':								[ STRINGS_HTC, 'Rhyme' ],
		'HTC Bliss':								[ STRINGS_HTC, 'Rhyme' ],
		'HTC Bliss S510b':							[ STRINGS_HTC, 'Rhyme' ],
		'HTC Salsa C510e':							[ STRINGS_HTC, 'Salsa' ],	
		'HTC C510e':								[ STRINGS_HTC, 'Salsa' ],
		'HTC Z710a':								[ STRINGS_HTC, 'Sensation' ],
		'HTC Z710e':								[ STRINGS_HTC, 'Sensation' ],
		'HTC Z710t':								[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation':							[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710a':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710e':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710E':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710e For AT&T':				[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Z710e with Beats Audio':		[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation with Beats Audio Z710e':		[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation with Beats Audio':			[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation Taste':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Pyramid':								[ STRINGS_HTC, 'Sensation' ],
		'HTC Pyramid Z710a':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Pyramid Z710e':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation 4G':							[ STRINGS_HTC, 'Sensation' ],			/* T-Mobile */
		'HTC Sensation 4G with Beats Audio':		[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation G14':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Sensation G14 for AT&T':				[ STRINGS_HTC, 'Sensation' ],
		'HTC G14 sensation':						[ STRINGS_HTC, 'Sensation' ],
		'HTC Z715e':								[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation Z715e':						[ STRINGS_HTC, 'Sensation XE' ],
		'HTC SensationXE Beats':					[ STRINGS_HTC, 'Sensation XE' ],
		'HTC SensationXE Beats Z715a':				[ STRINGS_HTC, 'Sensation XE' ],
		'HTC SensationXE Beats Z715e':				[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE':							[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE Z715e':					[ STRINGS_HTC, 'Sensation XE' ],
		'HTC SensationXE Z715e':					[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE Beats':					[ STRINGS_HTC, 'Sensation XE' ],
		'HTC SensationXE with Beats Audio':			[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE with Beats Audio':		[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE with Beats Audio Z715a':	[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation Juredroid XE Beats Audio':	[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE with Beats Audio Z715e':	[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation XE With Beats Audio Z715e':	[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation 4G XE with Beats Audio':		[ STRINGS_HTC, 'Sensation XE' ],
		'HTC Sensation with Beats Audio Z715e':		[ STRINGS_HTC, 'Sensation XE' ],
		'HTC X315E':								[ STRINGS_HTC, 'Sensation XL' ],
		'HTC SensationXL Beats X315b':				[ STRINGS_HTC, 'Sensation XL' ],
		'HTC SensationXL Beats X315e':				[ STRINGS_HTC, 'Sensation XL' ],
		'HTC Sensation XL with Beats Audio X315b':	[ STRINGS_HTC, 'Sensation XL' ],
		'HTC Sensation XL with Beats Audio X315e':	[ STRINGS_HTC, 'Sensation XL' ],
		'HTC Runnymede':							[ STRINGS_HTC, 'Sensation XL' ],
		'HTC X315E':								[ STRINGS_HTC, 'Sensation XL' ],	
		'HTC G21':									[ STRINGS_HTC, 'Sensation XL' ],
		'HTC PH06130':								[ STRINGS_HTC, 'Status' ],
		'HTC Status':								[ STRINGS_HTC, 'Status' ],
		'HTC Tattoo':								[ STRINGS_HTC, 'Tattoo' ],
		'HTC TATTOO A3288':							[ STRINGS_HTC, 'Tattoo' ],
		'HTC click':								[ STRINGS_HTC, 'Tattoo' ],
		'HTC A9188':								[ STRINGS_HTC, 'Tianxi' ],
		'HTC X310e':								[ STRINGS_HTC, 'Titan' ],
		'HTC T7373':								[ STRINGS_HTC, 'Touch Pro II' ],
		'HTC ThunderBolt':							[ STRINGS_HTC, 'ThunderBolt'],			/* Verizon */
		'HTC Mecha':								[ STRINGS_HTC, 'ThunderBolt'],
		'HTC Velocity 4G':							[ STRINGS_HTC, 'Velocity 4G'],
		'HTC Wildfire':								[ STRINGS_HTC, 'Wildfire' ],			/* C-Spire */
		'HTC Wildfire A3333':						[ STRINGS_HTC, 'Wildfire' ],
		'HTC A3366':								[ STRINGS_HTC, 'Wildfire' ],
		'HTC A3380':								[ STRINGS_HTC, 'Wildfire' ],
		'HTC WildfireS':							[ STRINGS_HTC, 'Wildfire S' ],			/* T-Mobile, metroPCS, Virgin Mobile, US Cellular */
		'HTC Wildfire S':							[ STRINGS_HTC, 'Wildfire S' ],
		'Htc Wildfire s':							[ STRINGS_HTC, 'Wildfire S' ],
		'HTC Wildfire S A510e':						[ STRINGS_HTC, 'Wildfire S' ],
		'HTC Wildfire S A510b':						[ STRINGS_HTC, 'Wildfire S' ],
		'HTC WildfireS A510e':						[ STRINGS_HTC, 'Wildfire S' ],
		'HTC WildfireS A510b':						[ STRINGS_HTC, 'Wildfire S' ],
		'htc wildfire s a510e':						[ STRINGS_HTC, 'Wildfire S' ],
		'HTC Wildfire S A515c':						[ STRINGS_HTC, 'Wildfire S' ],
		'HTC A510a':								[ STRINGS_HTC, 'Wildfire S' ],
		'HTC A510e':								[ STRINGS_HTC, 'Wildfire S' ],
		'HTC A510c':								[ STRINGS_HTC, 'Wildfire S' ],
		'HTCX06HT':									[ STRINGS_HTC, 'Desire' ],
		'HTC A6390':								[ STRINGS_HTC, 'A6390' ],
		'HTC A8180':								[ STRINGS_HTC, 'A8180' ],
		'HTC PG762':								[ STRINGS_HTC, 'PG762' ],
		'HTC S715e':								[ STRINGS_HTC, 'S715e' ],
		'HTC Z510d':								[ STRINGS_HTC, 'Z510d' ],
		'HTC VLE U':								[ STRINGS_HTC, 'One S' ],
		'HTC VLE#U':								[ STRINGS_HTC, 'One S' ],
		'HTC VIE U':								[ STRINGS_HTC, 'One S' ],
		'HTC EVA UL':								[ STRINGS_HTC, 'One V' ],
		'HTC ENR U':								[ STRINGS_HTC, 'One X' ],
		'ENR U':									[ STRINGS_HTC, 'One X' ],
		'EndeavorU':								[ STRINGS_HTC, 'One X' ],
		'Liberty':									[ STRINGS_HTC, 'Aria' ],
		'Desire':									[ STRINGS_HTC, 'Desire' ],
		'Desire A8181':								[ STRINGS_HTC, 'Desire' ],
		'desire hd':								[ STRINGS_HTC, 'Desire HD' ],
		'Desire HD':								[ STRINGS_HTC, 'Desire HD' ],
		'Dedire HD':								[ STRINGS_HTC, 'Desire HD' ],
		'Desire Hd (ace)':							[ STRINGS_HTC, 'Desire HD' ],
		'Desire S':									[ STRINGS_HTC, 'Desire S' ],
		'DesireS':									[ STRINGS_HTC, 'Desire S' ],
		'Desire Saga':								[ STRINGS_HTC, 'Desire S' ],
		'Desire Z':									[ STRINGS_HTC, 'Desire Z' ],
		'Dream':									[ STRINGS_HTC, 'Dream' ],
		'Droid Incredible':							[ STRINGS_HTC, 'Droid Incredible' ],
		'EVO':										[ STRINGS_HTC, 'EVO' ],
		'Evo HD2':									[ STRINGS_HTC, 'EVO HD' ],
		'Evo 3D Beats X515m':						[ STRINGS_HTC, 'EVO 3D' ],
		'Evo 3D GSM':								[ STRINGS_HTC, 'EVO 3D' ],
		'EVO 3D X515m':								[ STRINGS_HTC, 'EVO 3D' ],
		'EVO3D X515m':								[ STRINGS_HTC, 'EVO 3D' ],
		'Evo 4G':									[ STRINGS_HTC, 'EVO 4G' ],
		'EVO 4G':									[ STRINGS_HTC, 'EVO 4G' ],
		'photon':									[ STRINGS_HTC, 'HD mini' ],
		'GinDream/GinMagic':						[ STRINGS_HTC, 'Dream' ],
		'HD2':										[ STRINGS_HTC, 'HD2' ],
		'HD7  Pro':									[ STRINGS_HTC, 'HD7 Pro' ],
		'Hero':										[ STRINGS_HTC, 'Hero' ],
		'HERO CDMA':								[ STRINGS_HTC, 'Hero' ],
		'HERO200':									[ STRINGS_HTC, 'Hero 200' ],
		'Incredible':								[ STRINGS_HTC, 'Droid Incredible' ],	/* Verizon */
		'Incredible 2':								[ STRINGS_HTC, 'Droid Incredible 2' ],	/* Verizon */
		'Incredible S':								[ STRINGS_HTC, 'Incredible S' ],
		'IncredibleS S710e':						[ STRINGS_HTC, 'Incredible S' ],
		'IncredibleS':								[ STRINGS_HTC, 'Incredible S' ],
		'Inspire HD':								[ STRINGS_HTC, 'Inspire 4G' ],
		'Inspire 4G':								[ STRINGS_HTC, 'Inspire 4G' ],
		'Legend':									[ STRINGS_HTC, 'Legend' ],
		'NexusHD2':									[ STRINGS_HTC, 'HD2' ],
		'Nexus HD2':								[ STRINGS_HTC, 'HD2' ],
		'Docomo HT-03A':							[ STRINGS_HTC, 'Magic' ],
		'MIUI.us Sensation 4G':						[ STRINGS_HTC, 'Sensation 4G' ],
		'SiRF Dream':								[ STRINGS_HTC, 'Dream' ],
		'Pyramid':									[ STRINGS_HTC, 'Sensation' ],
		'Sensation':								[ STRINGS_HTC, 'Sensation' ],
		'Sensation Z710e':							[ STRINGS_HTC, 'Sensation' ],
		'Sensation 4G':								[ STRINGS_HTC, 'Sensation' ],
		'Sensation 4g':								[ STRINGS_HTC, 'Sensation' ],
		'TripNiCE Pyramid':							[ STRINGS_HTC, 'Sensation' ],
		'SensationXE Beats Z715e':					[ STRINGS_HTC, 'Sensation XE' ],
		'SensationXL Beats X315e':					[ STRINGS_HTC, 'Sensation XL' ],
		'Click':									[ STRINGS_HTC, 'Tattoo' ],
		'Wildfire':									[ STRINGS_HTC, 'Wildfire' ],
		'Wildfire S':								[ STRINGS_HTC, 'Wildfire S' ],
		'Wildfire S A510e':							[ STRINGS_HTC, 'Wildfire S' ],
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
		'HTC S610d':								[ STRINGS_HTC, 'S610d' ],
		'ADR6200':									[ STRINGS_HTC, 'Droid Eris' ],
		'ADR6300':									[ STRINGS_HTC, 'Droid Incredible' ],
		'ADR6325VW':								[ STRINGS_HTC, 'Merge' ],	
		'ADR6330VW':								[ STRINGS_HTC, 'Rhyme' ],	
		'ADR6350':									[ STRINGS_HTC, 'Droid Incredible 2' ],
		'ADR6400L':									[ STRINGS_HTC, 'Thunderbolt 4G' ],
		'ADR6400L 4G':								[ STRINGS_HTC, 'Thunderbolt 4G' ],
		'ADR6410LVW 4G':							[ STRINGS_HTC, 'Fireball' ],
		'ADR6425LVW':								[ STRINGS_HTC, 'Rezound' ],
		'ADR6425LVW 4G':							[ STRINGS_HTC, 'Rezound' ],					/* Verizon */
		'Coquettish Red':							[ STRINGS_HTC, 'Rezound' ],
		'PB99400':									[ STRINGS_HTC, 'Droid Incredible' ],	
		'pcdadr6350':								[ STRINGS_HTC, 'Droid Incredible 2' ],
		'PC36100':									[ STRINGS_HTC, 'EVO 4G' ],
		'PG06100':									[ STRINGS_HTC, 'EVO Shift 4G' ],
		'PG41200':									[ STRINGS_HTC, 'EVO View 4G', 'tablet' ],
		'PG86100':									[ STRINGS_HTC, 'EVO 3D' ],
		'PG8610000':								[ STRINGS_HTC, 'EVO 3D' ],
		'PH44100':									[ STRINGS_HTC, 'EVO Design 4G' ],
		'PJ83100':									[ STRINGS_HTC, 'One X' ],
		'ISW11HT':									[ STRINGS_HTC, 'EVO 4G' ],
		'ISW12HT':									[ STRINGS_HTC, 'EVO 3D' ],
		'ISW13HT':									[ STRINGS_HTC, 'J' ],
		'USCCADR6275US Carrier ID 45':				[ STRINGS_HTC, 'Desire' ],
		'USCCADR6285US':							[ STRINGS_HTC, 'Hero S' ],
		'USCCADR6325US Carrier ID 45':				[ STRINGS_HTC, 'Merge' ],
		'MediaPad':									[ STRINGS_HUAWEI, 'MediaPad', 'tablet' ],
		'Huawei MediaPad':							[ STRINGS_HUAWEI, 'MediaPad', 'tablet' ],
		'HUAWEI MediaPad':							[ STRINGS_HUAWEI, 'MediaPad', 'tablet' ],
		'Huawei S7-312u':							[ STRINGS_HUAWEI, 'MediaPad', 'tablet' ],
		'MediaPad 10 FHD':							[ STRINGS_HUAWEI, 'MediaPad', 'tablet' ],
		'Huawei C8500':								[ STRINGS_HUAWEI, 'C8500' ],
		'Huawei C8500S':							[ STRINGS_HUAWEI, 'C8500' ],
		'Huawei C8600':								[ STRINGS_HUAWEI, 'C8600' ],
		'Huawei C8650':								[ STRINGS_HUAWEI, 'C8650' ],
		'Huawei C8650+':							[ STRINGS_HUAWEI, 'C8650' ],
		'Huawei C8800':								[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'Huawei C8810':								[ STRINGS_HUAWEI, 'Ascend G300' ],
		'Huawei C8812':								[ STRINGS_HUAWEI, 'Ascend C8812' ],
		'Huawei C8825D':							[ STRINGS_HUAWEI, 'Ascend G330C' ],
		'Huawei C8860E':							[ STRINGS_HUAWEI, 'Honor' ],
		'Huawei M835':								[ STRINGS_HUAWEI, 'M835' ],
		'Huawei M860':								[ STRINGS_HUAWEI, 'Ascend' ],
		'Huawei M921':								[ STRINGS_HUAWEI, 'M921' ],
		'Huawei S8520':								[ STRINGS_HUAWEI, 'S8520' ],
		'Huawei S8600':								[ STRINGS_HUAWEI, 'S8600' ],
		'Huawei T8300':								[ STRINGS_HUAWEI, 'T8300' ],
		'Huawei T8600':								[ STRINGS_HUAWEI, 'T8600' ],
		'Huawei U8220':								[ STRINGS_HUAWEI, 'U8220' ],
		'Huawei u8500':								[ STRINGS_HUAWEI, 'IDEOS X2' ],
		'Huawei U8815':								[ STRINGS_HUAWEI, 'Ascend G300' ],
		'Huawei U8850':								[ STRINGS_HUAWEI, 'Vision' ],
		'Huawei U8652':								[ STRINGS_HUAWEI, 'Sonic' ],
		'Huawei U8661':								[ STRINGS_HUAWEI, 'Sonic+' ],
		'Huawei U8800-51':							[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'Huawei U8818':								[ STRINGS_HUAWEI, 'Ascend G300' ],
		'Huawei U9000':								[ STRINGS_HUAWEI, 'Ascend X' ],
		'Huawei IDEOS U8500':						[ STRINGS_HUAWEI, 'IDEOS X2' ],
		'Huawei IDEOS U8650':						[ STRINGS_HUAWEI, 'Sonic' ],
		'Huawei IDEOS X3':							[ STRINGS_HUAWEI, 'IDEOS X3' ],
		'Huawei Ideos X5':							[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'Huawei Ideos X5 1.12.9(ret4rt)':			[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'Huawei SONIC':								[ STRINGS_HUAWEI, 'Sonic' ],
		'Huawei 8100-9':							[ STRINGS_HUAWEI, 'U8100' ],
		'FUSIONideos':								[ STRINGS_HUAWEI, 'IDEOS' ],
		'Gnappo Ideos':								[ STRINGS_HUAWEI, 'IDEOS' ],
		'Ideos':									[ STRINGS_HUAWEI, 'IDEOS' ],
		'IDEOS X5':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'Ideos S7':									[ STRINGS_HUAWEI, 'IDEOS S7', 'tablet' ],
		'IDEOS S7':									[ STRINGS_HUAWEI, 'IDEOS S7', 'tablet' ],
		'IDEOS S7 Slim':							[ STRINGS_HUAWEI, 'IDEOS S7', 'tablet' ],
		'Huawei S7':								[ STRINGS_HUAWEI, 'IDEOS S7', 'tablet' ],
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
		'UM840':									[ STRINGS_HUAWEI, 'Evolution' ],	
		'M860':										[ STRINGS_HUAWEI, 'Ascend' ],
		'M865':										[ STRINGS_HUAWEI, 'Ascend II' ],
		'M886':										[ STRINGS_HUAWEI, 'Glory' ],
		'C8150':									[ STRINGS_HUAWEI, 'IDEOS' ],
		'c8500':									[ STRINGS_HUAWEI, 'C8500' ],
		'C8500':									[ STRINGS_HUAWEI, 'C8500' ],
		'C8500S':									[ STRINGS_HUAWEI, 'C8500' ],
		'C8600':									[ STRINGS_HUAWEI, 'C8600' ],
		'c8650':									[ STRINGS_HUAWEI, 'C8650' ],
		'C8650':									[ STRINGS_HUAWEI, 'C8650' ],
		'c8800':									[ STRINGS_HUAWEI, 'C8800' ],
		'C8800':									[ STRINGS_HUAWEI, 'C8800' ],
		'c8810':									[ STRINGS_HUAWEI, 'Ascend G300C' ],
		'C8812':									[ STRINGS_HUAWEI, 'Ascend C8812' ],
		'S8600':									[ STRINGS_HUAWEI, 'S8600' ],
		'U8100':									[ STRINGS_HUAWEI, 'U8100' ],
		'U8110':									[ STRINGS_HUAWEI, 'U8110' ],
		'u8120':									[ STRINGS_HUAWEI, 'U8120' ],
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
		'u8650':									[ STRINGS_HUAWEI, 'Sonic' ],
		'U8650':									[ STRINGS_HUAWEI, 'Sonic' ],
		'U8650-1':									[ STRINGS_HUAWEI, 'Sonic' ],
		'U8660':									[ STRINGS_HUAWEI, 'Sonic' ],
		'u8800':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'U8800':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'U8800+':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'U8800X':									[ STRINGS_HUAWEI, 'IDEOS X5' ],
		'U8800pro':									[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
		'U8800PRO':									[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
		'U8800Pro':									[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
		'u8800pro':									[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
		'U8800 Pro':								[ STRINGS_HUAWEI, 'IDEOS X5 Pro' ],
		'U8815':									[ STRINGS_HUAWEI, 'Ascend G300' ],
		'U8818':									[ STRINGS_HUAWEI, 'Ascend G300' ],
		'U8820':									[ STRINGS_HUAWEI, 'Titan' ],
		'U8850':									[ STRINGS_HUAWEI, 'Vision' ],
		'u8860':									[ STRINGS_HUAWEI, 'Honor' ],
		'U8860':									[ STRINGS_HUAWEI, 'Honor' ],
		'U9000':									[ STRINGS_HUAWEI, 'Ascend X' ],
		'U9200':									[ STRINGS_HUAWEI, 'Ascend P1' ],
		'U9200-1':									[ STRINGS_HUAWEI, 'Ascend P1' ],
		'U9500':									[ STRINGS_HUAWEI, 'Ascend D1' ],
		'U9501L':									[ STRINGS_HUAWEI, 'Ascend D LTE' ],
		'U9510':									[ STRINGS_HUAWEI, 'Ascend D quad' ],
		'U9510E':									[ STRINGS_HUAWEI, 'Ascend D quad' ],
		'Comet':									[ STRINGS_HUAWEI, 'Comet' ],
		'GS02':										[ STRINGS_HUAWEI, 'Honor' ],
		'GS03':										[ STRINGS_HUAWEI, 'Ascend P1' ],
		'DroniX-0.5':								[ STRINGS_HUAWEI, 'U8180' ],
		'MTS-SP101':								[ STRINGS_HUAWEI, 'C8511' ],
		'TSP21':									[ STRINGS_HUAWEI, 'U8110' ],								
		'HYUNDAI H6':								[ 'Hyundai', 'Storm H6' ],
		'iBall Slide i7011':						[ 'iBall', 'Slide i7011' ],
		'NetTAB RUNE':								[ 'IconBit', 'NetTab Rune', 'tablet' ],
		'D70W':										[ 'Icoo', 'D70W', 'tablet' ],
		'D80':										[ 'Icoo', 'D80', 'tablet' ],
		'INFOBAR A01':								[ 'iida', 'INFOBAR A01' ],
		'M009F':									[ 'Infotmic', 'M009F' ],
		'AZ210A':									[ 'Intel', 'AZ210A' ],
		'AZ210B':									[ 'Intel', 'AZ210B' ],
		'AZ510':									[ 'Intel', 'AZ510' ],
		'greenridge':								[ 'Intel', 'Green Ridge', 'tablet' ],
		'INQ Cloud Touch':							[ 'INQ', 'Cloud Touch' ],
		'ILT-MX100':								[ 'iRiver', 'Tab', 'tablet' ],
		'IVIO_DE38':								[ 'Ivio', 'DE38' ],
		'JY-G2':									[ 'Jiayu', 'G2' ],
		'JXD S601WIFI':								[ 'JXD', 'S601 WIFI', 'media' ],
		'A2':										[ 'KakaTech', 'A2' ],
		'D91':										[ 'KK', 'D91', 'tablet' ],
		'K080':										[ 'Kobo', 'K080', 'ereader' ],
		'A106':										[ 'koobee', 'A160' ],
		'KPT A9':									[ 'KPT', 'A9' ],
		'EV-S100':									[ 'Kttech', 'Take EV-S100' ],
		'KM-S120':									[ 'Kttech', 'Take 2 KM-S120' ],
		'KM-S200':									[ 'Kttech', 'Take Janus KM-S200' ],
		'KM-S220':									[ 'Kttech', 'Take Tachy KM-S220' ],
		'Kyobo mirasol eReader':					[ 'Kyobo', 'eReader', 'ereader' ],
		'ISW11K':									[ 'Kyocera', 'Digno' ],
		'JC-KSP8000':								[ 'Kyocera', 'Echo' ],
		'KSP8000':									[ 'Kyocera', 'Echo' ],
		'Zio':										[ 'Kyocera', 'Zio' ],
		'C5155':									[ 'Kyocera', 'C5155' ],
		'C5170':									[ 'Kyocera', 'C5170' ],
		'M9300':									[ 'Kyocera', 'M9300' ],
		'K-Touch E619':								[ 'K-Touch', 'E619' ],
		'E800':										[ 'K-Touch', 'E800' ],
		'W606':										[ 'K-Touch', 'W606' ],
		'K-Touch W619':								[ 'K-Touch', 'W619' ],
		'K-Touch W650':								[ 'K-Touch', 'W650' ],
		'W700':										[ 'K-Touch', 'W700' ],
		'W800':										[ 'K-Touch', 'W800' ],
		'W806':										[ 'K-Touch', 'W806' ],
		'W808':										[ 'K-Touch', 'W808' ],
		'W810':										[ 'K-Touch', 'W810' ],
		'X900':										[ 'Lava', 'XOLO X900' ],
		'ThinkPad Tablet':							[ STRINGS_LENOVO, 'ThinkPad Tablet', 'tablet' ],
		'K1':										[ STRINGS_LENOVO, 'IdeaPad K1', 'tablet' ],
		'Ideapad S10-3T':							[ STRINGS_LENOVO, 'IdeaPad S10-3T', 'tablet' ],
		'S2005A-H':									[ STRINGS_LENOVO, 'S2005A' ],
		'IdeaTab S2007A-D':							[ STRINGS_LENOVO, 'IdeaTab S2007A', 'tablet' ],
		'IdeaTabV2007A':							[ STRINGS_LENOVO, 'IdeaTab V2007A', 'tablet' ],
		'IdeaTabV2007A-D-I':						[ STRINGS_LENOVO, 'IdeaTab V2007A', 'tablet' ],
		'IdeaTabV2010A':							[ STRINGS_LENOVO, 'IdeaTab V2010A', 'tablet' ],
		'IdeaTab A2107A-H':							[ STRINGS_LENOVO, 'IdeaTab V2107A', 'tablet' ],
		'A1 07':									[ STRINGS_LENOVO, 'LePad', 'tablet' ],
		'lepad 001b':								[ STRINGS_LENOVO, 'LePad', 'tablet' ],
		'lepad 001n':								[ STRINGS_LENOVO, 'LePad', 'tablet' ],
		'3GC101':									[ STRINGS_LENOVO, 'LePhone 3GC101' ],
		'Lenovo 3GC101':							[ STRINGS_LENOVO, 'LePhone 3GC101' ],
		'3GW100':									[ STRINGS_LENOVO, 'LePhone 3GW100' ],
		'Lenovo 3GW100':							[ STRINGS_LENOVO, 'LePhone 3GW100' ],
		'3GW101':									[ STRINGS_LENOVO, 'LePhone 3GW101' ],
		'Lenovo 3GW101':							[ STRINGS_LENOVO, 'LePhone 3GW101' ],
		'Lephone 3GW101':							[ STRINGS_LENOVO, 'LePhone 3GW101' ],
		'Lenovo A1-32AB0':							[ STRINGS_LENOVO, 'LePhone A1-32AB0' ],
		'Lenovo S1-37AH0':							[ STRINGS_LENOVO, 'LePhone S1-37AH0' ],
		'S1 37AHO':									[ STRINGS_LENOVO, 'LePhone S1-37AH0' ],
		'Lenovo S2-38AH0':							[ STRINGS_LENOVO, 'LePhone S2-38AH0' ],
		'Lenovo S2-38AT0':							[ STRINGS_LENOVO, 'LePhone S2-38AT0' ],
		'Lenovo A288t':								[ STRINGS_LENOVO, 'LePhone A288' ],
		'Lenovo A366t':								[ STRINGS_LENOVO, 'LePhone A366' ],
		'Lenovo A390e':								[ STRINGS_LENOVO, 'LePhone A390' ],
		'Lenovo A500':								[ STRINGS_LENOVO, 'LePhone A500' ],
		'Lenovo A520':								[ STRINGS_LENOVO, 'LePhone A520' ],
		'Lenovo A520GRAY':							[ STRINGS_LENOVO, 'LePhone A520' ],
		'Lenovo A668t':								[ STRINGS_LENOVO, 'LePhone A668' ],
		'Lenovo A698t':								[ STRINGS_LENOVO, 'LePhone A698' ],
		'Lenovo A750':								[ STRINGS_LENOVO, 'LePhone A750' ],
		'Lenovo A780':								[ STRINGS_LENOVO, 'LePhone A780' ],
		'Lenovo A789':								[ STRINGS_LENOVO, 'LePhone A789' ],
		'Lenovo A790e':								[ STRINGS_LENOVO, 'LePhone A790' ],
		'Lenovo K860':								[ STRINGS_LENOVO, 'LePhone K860' ],
		'Lenovo P70':								[ STRINGS_LENOVO, 'LePhone P70' ],
		'Lenovo P700':								[ STRINGS_LENOVO, 'LePhone P700' ],
		'Lenovo S850e':								[ STRINGS_LENOVO, 'S850' ],
		'Lenovo S880':								[ STRINGS_LENOVO, 'S880' ],
		'A30t':										[ STRINGS_LENOVO, 'A30t' ],
		'Lenovo A60':								[ STRINGS_LENOVO, 'A60' ],
		'Lenovo A65':								[ STRINGS_LENOVO, 'A65' ],
		'Lenovo A66t':								[ STRINGS_LENOVO, 'A66t' ],
		'Lenovo A68e':								[ STRINGS_LENOVO, 'A68e' ],
		'Lenovo K800':								[ STRINGS_LENOVO, 'K800' ],
		'IDEA TV T100':								[ STRINGS_LENOVO, 'IDEA TV', 'television' ],
		'IDEA TV K91':								[ STRINGS_LENOVO, 'IDEA TV', 'television' ],
		'TC970':									[ 'Le Pan', 'TC970', 'tablet' ],
		'LePanII':									[ 'Le Pan', 'II', 'tablet' ],
		'LG-C555':									[ STRINGS_LG, 'Optimus Chat' ],
		'LG-C555-parrot':							[ STRINGS_LG, 'Optimus Chat' ],
		'LG-C660':									[ STRINGS_LG, 'Optimus Pro' ],
		'LG-C660h':									[ STRINGS_LG, 'Optimus Pro' ],
		'LG-C729':									[ STRINGS_LG, 'DoublePlay' ],
		'LG-C800G':									[ STRINGS_LG, 'Eclypse' ],
		'LG-CX670':									[ STRINGS_LG, 'Optimus 3G' ],
		'LG-E400':									[ STRINGS_LG, 'Optimus L3' ],
		'LG-E400f':									[ STRINGS_LG, 'Optimus L3' ],
		'LG-E405f':									[ STRINGS_LG, 'Optimus L3 Dual' ],
		'LG-E510':									[ STRINGS_LG, 'Optimus Hub' ],
		'LG-E510f':									[ STRINGS_LG, 'Optimus Hub' ],
		'LG-E510g':									[ STRINGS_LG, 'Optimus Hub' ],
		'LG-E610':									[ STRINGS_LG, 'Optimus L5' ],
		'LG-E612':									[ STRINGS_LG, 'Optimus L5' ],
		'LG-E612g':									[ STRINGS_LG, 'Optimus L5' ],
		'LG-E615F':									[ STRINGS_LG, 'E615' ],
		'LG-E617G':									[ STRINGS_LG, 'E617' ],
		'LG-E720':									[ STRINGS_LG, 'Optimus Chic' ],
		'LG-E720b':									[ STRINGS_LG, 'Optimus Chic' ],
		'LG-E730':									[ STRINGS_LG, 'Optimus Sol' ],
		'LG-E970':									[ STRINGS_LG, 'Shine' ],
		'LG-F100L':									[ STRINGS_LG, 'Optimus Vu' ],
		'LG-F100S':									[ STRINGS_LG, 'Optimus Vu' ],
		'LG-F120K':									[ STRINGS_LG, 'Optimus LTE Tag' ],
		'LG-F120L':									[ STRINGS_LG, 'Optimus LTE Tag' ],
		'LG-F120S':									[ STRINGS_LG, 'Optimus LTE Tag' ],
		'LG-F160':									[ STRINGS_LG, 'Optimus LTE II' ],
		'LG-F160K':									[ STRINGS_LG, 'Optimus LTE II' ],
		'LG-F160L':									[ STRINGS_LG, 'Optimus LTE II' ],
		'LG-F160S':									[ STRINGS_LG, 'Optimus LTE II' ],
		'LG-F180L':									[ STRINGS_LG, 'Optimus G' ],
		'LG-F180S':									[ STRINGS_LG, 'Optimus G' ],
		'LG-GT540':									[ STRINGS_LG, 'Optimus' ],
		'LG-GT540f':								[ STRINGS_LG, 'Optimus' ],
		'LG-GT540 Swift':							[ STRINGS_LG, 'Optimus' ],
		'LG-GW620':									[ STRINGS_LG, 'GW620' ],
		'LG-KH5200':								[ STRINGS_LG, 'Andro-1' ],
		'LG-KU3700':								[ STRINGS_LG, 'Optimus One' ],
		'LG-KU5400':								[ STRINGS_LG, 'PRADA 3.0' ],
		'LG-KU5900':								[ STRINGS_LG, 'Optimus Black' ],
		'LG-L40G':									[ STRINGS_LG, 'L40G' ],
		'LG-LG855':									[ STRINGS_LG, 'Marquee' ],
		'LG-LS670':									[ STRINGS_LG, 'Optimus S' ],
		'LG-LS696':									[ STRINGS_LG, 'Optimus Elite' ],
		'LG-LS840':									[ STRINGS_LG, 'Viper 4G' ],
		'LG-LS855':									[ STRINGS_LG, 'Marquee' ],
		'LG-LS860':									[ STRINGS_LG, '"Cayenne"' ],
		'LG-LS970':									[ STRINGS_LG, '"Eclipse"' ],
		'LG-LU3000':								[ STRINGS_LG, 'Optimus Mach' ],
		'LG-LU3100':								[ STRINGS_LG, 'Optimus Chic' ],
		'LG-LU3700':								[ STRINGS_LG, 'Optimus One' ],
		'LG-LU5400':								[ STRINGS_LG, 'PRADA 3.0' ],
		'LG-LU6200':								[ STRINGS_LG, 'Optimus Q2' ],
		'LG-lu6200':								[ STRINGS_LG, 'Optimus Q2' ],
		'LG-LU6500':								[ STRINGS_LG, 'Optimus Note' ],
		'LG-LU6800':								[ STRINGS_LG, 'Optimus Big' ],
		'LG-LU8300':								[ STRINGS_LG, 'Optimus Pad LTE' ],
		'LG-LW690':									[ STRINGS_LG, 'Optimus C' ],
		'LG-LW770':									[ STRINGS_LG, 'LW770' ],
		'LG-MS690':									[ STRINGS_LG, 'Optimus M' ],
		'LG-MS770':									[ STRINGS_LG, 'MS770' ],
		'LG-MS840':									[ STRINGS_LG, 'Connect 4G' ],
		'LG-MS870':									[ STRINGS_LG, 'MS870' ],
		'LG-MS910':									[ STRINGS_LG, 'Esteem' ],
		'LG-MS695':									[ STRINGS_LG, 'Optimus M+' ],
		'LG P350':									[ STRINGS_LG, 'Optimus Me' ],
		'LG-P350':									[ STRINGS_LG, 'Optimus Me' ],
		'LG-P350f':									[ STRINGS_LG, 'Optimus Me' ],
		'LG-P350g':									[ STRINGS_LG, 'Optimus Me' ],
		'LG-P355':									[ STRINGS_LG, 'P355' ],
		'LG-P500':									[ STRINGS_LG, 'Optimus One' ],
		'LG-P500h':									[ STRINGS_LG, 'Optimus One' ],
		'LG-P500h-parrot':							[ STRINGS_LG, 'Optimus One' ],
		'LG-P503':									[ STRINGS_LG, 'Optimus One' ],
		'LG-P504':									[ STRINGS_LG, 'Optimus One' ],
		'LG-P505':									[ STRINGS_LG, 'Phoenix' ],
		'LG-P505R':									[ STRINGS_LG, 'Phoenix' ],
		'LG-P506':									[ STRINGS_LG, 'Thrive' ],
		'LG-P509':									[ STRINGS_LG, 'Optimus T' ],
		'LG-P690':									[ STRINGS_LG, 'Optimus Net' ],
		'LG-P693':									[ STRINGS_LG, 'P693' ],
		'LG-P698':									[ STRINGS_LG, 'Optimus Net' ],
		'LG-P698f':									[ STRINGS_LG, 'Optimus Net' ],
		'LG-P700':									[ STRINGS_LG, 'Optimus L7' ],
		'LG-P705':									[ STRINGS_LG, 'Optimus L7' ],
		'LG-P705f':									[ STRINGS_LG, 'Optimus L7' ],
		'LG-P705g':									[ STRINGS_LG, 'Optimus L7' ],
		'LG-P708g':									[ STRINGS_LG, 'P708' ],
		'LG-P720':									[ STRINGS_LG, 'Optimus Chic' ],
		'LG-P720h':									[ STRINGS_LG, 'Optimus Chic' ],
		'LG-P725':									[ STRINGS_LG, 'Optimus 3D Max' ],
		'LG-P760':									[ STRINGS_LG, 'P760' ],
		'LG-P769':									[ STRINGS_LG, 'P769' ],
		'LG-P860':									[ STRINGS_LG, 'P860' ],
		'LG-P870':									[ STRINGS_LG, 'P870' ],	
		'LG-P870F':									[ STRINGS_LG, 'P870' ],	
		'LG-P880':									[ STRINGS_LG, 'X3' ],
		'LG-P880g':									[ STRINGS_LG, 'X3' ],
		'LG-P895':									[ STRINGS_LG, 'P895' ],	
		'LG-P920':									[ STRINGS_LG, 'Optimus 3D' ],
		'LG-P920h':									[ STRINGS_LG, 'Optimus 3D' ],
		'LG-P925':									[ STRINGS_LG, 'Thrill' ],
		'LG-P925g':									[ STRINGS_LG, 'Thrill' ],
		'LG-P930':									[ STRINGS_LG, 'Nitro HD' ],
		'LG-P936':									[ STRINGS_LG, 'Optimus LTE' ],
		'LG-P940':									[ STRINGS_LG, 'PRADA 3.0' ],
		'LG-P970':									[ STRINGS_LG, 'Optimus Black' ],
		'LG-P970g':									[ STRINGS_LG, 'Optimus Black' ],
		'LG-P970h':									[ STRINGS_LG, 'Optimus Black' ],
		'LG-P990':									[ STRINGS_LG, 'Optimus 2X Speed' ],
		'LG-P990h':									[ STRINGS_LG, 'Optimus 2X Speed' ],
		'LG-P990hN':								[ STRINGS_LG, 'Optimus 2X Speed' ],
		'LG-P990H':									[ STRINGS_LG, 'Optimus 2X Speed' ],
		'LG-P993':									[ STRINGS_LG, 'Optimus 2X' ],
		'LG-SU540':									[ STRINGS_LG, 'PRADA 3.0' ],
		'LG-SU640':									[ STRINGS_LG ,'Optimus LTE' ],
		'LG-SU660':									[ STRINGS_LG, 'Optimus 2X' ],
		'LG-SU760':									[ STRINGS_LG, 'Optimus 3D' ],
		'LG-SU760-Kust':							[ STRINGS_LG, 'Optimus 3D' ],
		'LG-SU870':									[ STRINGS_LG, 'Optimus 3D Cube' ],
		'LG-SU880':									[ STRINGS_LG, 'Optimus EX' ],
		'LG-US670':									[ STRINGS_LG, 'Optimus U' ],
		'LG-US730':									[ STRINGS_LG, 'US730' ],
		'LG-V900':									[ STRINGS_LG, 'Optimus Pad', 'tablet' ],
		'LG-V905R':									[ STRINGS_LG, 'Optimus G-Slate', 'tablet' ],
		'LG-V909':									[ STRINGS_LG, 'Optimus G-Slate', 'tablet' ],
		'LG-VM670':									[ STRINGS_LG, 'Optimus V' ],
		'LG-VM696':									[ STRINGS_LG, 'Optimus Elite' ],
		'LG-VM701':									[ STRINGS_LG, 'Optimus Slider' ],
		'LG-VS660':									[ STRINGS_LG, 'Vortex' ],
		'LG-VS700':									[ STRINGS_LG, 'Enlighten' ],
		'LG-VS740':									[ STRINGS_LG, 'Ally' ],
		'LG-VS840':									[ STRINGS_LG, 'Connect 4G' ],
		'LG-VS910':									[ STRINGS_LG, 'Revolution' ],
		'lgp-970':									[ STRINGS_LG, 'Optimus Black' ],
		'E900':										[ STRINGS_LG, 'Optimus 7' ],
		'GT540':									[ STRINGS_LG, 'Optimus GT540' ],
		'GW620':									[ STRINGS_LG, 'GW620' ],
		'KU9500':									[ STRINGS_LG, 'Optimus Z' ],
		'LGC660':									[ STRINGS_LG, 'Optimus Pro' ],
		'LGL45C':									[ STRINGS_LG, 'Optimus Net' ],
		'LGL55C':									[ STRINGS_LG, 'Optimus Q' ],
		'LU2300':									[ STRINGS_LG, 'Optimus Q' ],	
		'LS670':									[ STRINGS_LG, 'Optimus S' ],
		'P940':										[ STRINGS_LG, 'PRADA 3.0' ],
		'P990':										[ STRINGS_LG, 'Optimus 2X Speed' ],
		'USCC-US730':								[ STRINGS_LG, 'US730' ],
		'USCC-US760':								[ STRINGS_LG, 'Genesis' ],
		'VM670':									[ STRINGS_LG, 'Optimus V' ],
		'VS840 4G':									[ STRINGS_LG, 'Connect 4G' ],
		'VS900-4G':									[ STRINGS_LG, 'VS900' ],
		'VS910 4G':									[ STRINGS_LG, 'Revolution 4G' ],
		'VS920 4G':									[ STRINGS_LG, 'Spectrum 4G' ],
		'VS930 4G':									[ STRINGS_LG, 'VS930' ],
		'VS950 4G':									[ STRINGS_LG, 'VS950' ],
		'L-01D':									[ STRINGS_LG, 'Optimus LTE' ],
		'L-02D':									[ STRINGS_LG, 'PRADA phone' ],
		'L-04C':									[ STRINGS_LG, 'Optimus Chat' ],
		'L-05D':									[ STRINGS_LG, 'Optimus it' ],
		'L-06C':									[ STRINGS_LG, 'Optimus Pad', 'tablet' ],
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
		'T6':										[ 'Malata', 'Zpad T6', 'tablet' ],
		'Malata SMBA1002':							[ 'Malata', 'Tablet SMB-A1002', 'tablet' ],
		'STM712HCZ':								[ 'Mediacom', 'SmartPad 712c', 'tablet' ],
		'STM803HC':									[ 'Mediacom', 'SmartPad 810c', 'tablet' ],
		'Mediacom 810C':							[ 'Mediacom', 'SmartPad 810c', 'tablet' ],
		'Smartpad810c':								[ 'Mediacom', 'SmartPad 810c', 'tablet' ],
		'SmartPad810c':								[ 'Mediacom', 'SmartPad 810c', 'tablet' ],
		'MP810C':									[ 'Mediacom', 'SmartPad 810c', 'tablet' ],
		'MP907C':									[ 'Mediacom', 'SmartPad 907c', 'tablet' ],
		'MTK6516':									[ 'Mediatek', 'MTK6516' ],
		'LIFETAB S9512':							[ 'Medion', 'Lifetab S9512', 'tablet' ],
		'LIFETAB P9514':							[ 'Medion', 'Lifetab P9514', 'tablet' ],
		'MD LIFETAB P9516':							[ 'Medion', 'Lifetab P9516', 'tablet' ],
		'MEDION LIFE P4310':						[ 'Medion', 'Life P4310' ],
		'M8':										[ 'Meizu', 'M8' ],
		'M9':										[ 'Meizu', 'M9' ],
		'M9-unlocked':								[ 'Meizu', 'M9' ],
		'meizu m9':									[ 'Meizu', 'M9' ],
		'MEIZU M9':									[ 'Meizu', 'M9' ],
		'MEIZU MX':									[ 'Meizu', 'MX' ],
		'M030':										[ 'Meizu', 'MX M030' ],
		'M032':										[ 'Meizu', 'MX M032' ],
		'Slidepad':									[ 'Memup', 'Slidepad', 'tablet' ],
		'A45':										[ 'Micromax', 'A45 Punk' ],
		'Micromax A50':								[ 'Micromax', 'A50 Ninja' ],
		'Micromax A60':								[ 'Micromax', 'Andro A60' ],
		'Micromax A70':								[ 'Micromax', 'Andro A70' ],
		'P300(Funbook)':							[ 'Micromax', 'Funbook P300', 'tablet' ],
		'AT735':									[ 'Moinstone', 'AT735', 'tablet' ],
		'A853':										[ STRINGS_MOTOROLA, 'Milestone' ],
		'A953':										[ STRINGS_MOTOROLA, 'Milestone 2' ],
		'A1680':									[ STRINGS_MOTOROLA, 'MOTO A1680' ],
		'ET1':										[ STRINGS_MOTOROLA, 'ET1 Enterprise Tablet', 'tablet' ],
		'MB200':									[ STRINGS_MOTOROLA, 'CLIQ' ],
		'MB300':									[ STRINGS_MOTOROLA, 'BACKFLIP' ],
		'MB501':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
		'MB502':									[ STRINGS_MOTOROLA, 'CHARM' ],
		'MB511':									[ STRINGS_MOTOROLA, 'FLIPOUT' ],
		'MB520':									[ STRINGS_MOTOROLA, 'BRAVO' ],
		'MB525':									[ STRINGS_MOTOROLA, 'DEFY' ],
		'MB525+':									[ STRINGS_MOTOROLA, 'DEFY' ],
		'MB525 for me':								[ STRINGS_MOTOROLA, 'DEFY' ],
		'MB526':									[ STRINGS_MOTOROLA, 'DEFY+' ],
		'MB611':									[ STRINGS_MOTOROLA, 'CLIQ 2' ],
		'MB612':									[ STRINGS_MOTOROLA, 'XPRT' ],
		'MB632':									[ STRINGS_MOTOROLA, 'PRO+' ],
		'MB855':									[ STRINGS_MOTOROLA, 'PHOTON 4G' ],
		'MB860':									[ STRINGS_MOTOROLA, 'ATRIX' ],
		'MB861':									[ STRINGS_MOTOROLA, 'ATRIX' ],
		'mb861':									[ STRINGS_MOTOROLA, 'ATRIX' ],
		'MB865':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
		'MB870':									[ STRINGS_MOTOROLA, 'Droid X2' ],
		'MB886':									[ STRINGS_MOTOROLA, 'DINARA' ],
		'ME501':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
		'ME511':									[ STRINGS_MOTOROLA, 'FLIPOUT' ],
		'me525':									[ STRINGS_MOTOROLA, 'MOTO ME525' ],
		'Me525':									[ STRINGS_MOTOROLA, 'MOTO ME525' ],
		'ME525':									[ STRINGS_MOTOROLA, 'MOTO ME525' ],
		'ME525+':									[ STRINGS_MOTOROLA, 'MOTO ME525' ],
		'ME600':									[ STRINGS_MOTOROLA, 'BACKFLIP' ],
		'ME632':									[ STRINGS_MOTOROLA, 'PRO+' ],
		'ME722':									[ STRINGS_MOTOROLA, 'Milestone 2' ],
		'ME811':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'ME860':									[ STRINGS_MOTOROLA, 'ATRIX' ],
		'ME863':									[ STRINGS_MOTOROLA, 'Milestone 3' ],
		'ME865':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
		'MT620':									[ STRINGS_MOTOROLA, 'MOTO MT620' ],
		'MT620t':									[ STRINGS_MOTOROLA, 'MOTO MT620' ],
		'MT716':									[ STRINGS_MOTOROLA, 'MOTO MT716' ],
		'MT810':									[ STRINGS_MOTOROLA, 'MOTO MT810' ],
		'MT870':									[ STRINGS_MOTOROLA, 'MOTO MT870' ],
		'MT917':									[ STRINGS_MOTOROLA, 'MT917' ],
		'MZ505':									[ STRINGS_MOTOROLA, 'XOOM Family Edition', 'tablet' ],
		'MZ600':									[ STRINGS_MOTOROLA, 'XOOM 4G LTE', 'tablet' ],
		'MZ601':									[ STRINGS_MOTOROLA, 'XOOM 3G', 'tablet' ],
		'MZ602':									[ STRINGS_MOTOROLA, 'XOOM 4G LTE', 'tablet' ],
		'MZ603':									[ STRINGS_MOTOROLA, 'XOOM 3G', 'tablet' ],
		'MZ604':									[ STRINGS_MOTOROLA, 'XOOM WiFi', 'tablet' ],
		'MZ605':									[ STRINGS_MOTOROLA, 'XOOM 3G', 'tablet' ],
		'MZ606':									[ STRINGS_MOTOROLA, 'XOOM WiFi', 'tablet' ],
		'MZ607':									[ STRINGS_MOTOROLA, 'XOOM 2 WiFi Media Edition', 'tablet' ],
		'MZ609':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 8.2', 'tablet' ],
		'MZ609 4G':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 8.2', 'tablet' ],
		'MZ615':									[ STRINGS_MOTOROLA, 'XOOM 2 WiFi', 'tablet' ],
		'MZ617':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 10.1', 'tablet' ],
		'MZ617 4G':									[ STRINGS_MOTOROLA, 'Droid XYBOARD 10.1', 'tablet' ],
		'WX435':									[ STRINGS_MOTOROLA, 'TRIUMPH WX435' ],
		'WX445':									[ STRINGS_MOTOROLA, 'CITRUS WX445' ],
		'XT300':									[ STRINGS_MOTOROLA, 'SPICE' ],
		'XT301':									[ STRINGS_MOTOROLA, 'MOTO XT301' ],
		'XT311':									[ STRINGS_MOTOROLA, 'FIRE' ],
		'XT316':									[ STRINGS_MOTOROLA, 'MOTO XT316' ],
		'XT319':									[ STRINGS_MOTOROLA, 'MOTO XT319' ],
		'XT320':									[ STRINGS_MOTOROLA, 'DEFY Mini' ],
		'XT321':									[ STRINGS_MOTOROLA, 'DEFY Mini' ],
		'XT500':									[ STRINGS_MOTOROLA, 'MOTO XT500' ],
		'xt-500':									[ STRINGS_MOTOROLA, 'MOTO XT500' ],
		'XT502':									[ STRINGS_MOTOROLA, 'QUENCH XT5' ],
		'XT530':									[ STRINGS_MOTOROLA, 'FIRE XT' ],
		'XT531':									[ STRINGS_MOTOROLA, 'FIRE XT' ],
		'XT532':									[ STRINGS_MOTOROLA, 'XT532' ],	
		'XT535':									[ STRINGS_MOTOROLA, 'DEFY' ],	
		'XT550':									[ STRINGS_MOTOROLA, 'XT550' ],	
		'XT556':									[ STRINGS_MOTOROLA, 'XT556' ],	
		'XT603':									[ STRINGS_MOTOROLA, 'ADMIRAL' ],
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
		'XT875':									[ STRINGS_MOTOROLA, 'Droid Bionic' ],
		'XT800':									[ STRINGS_MOTOROLA, 'MOTO XT800' ],
		'XT800+':									[ STRINGS_MOTOROLA, 'MOTO XT800' ],
		'XT800W':									[ STRINGS_MOTOROLA, 'MOTO Glam' ],
		'XT806':									[ STRINGS_MOTOROLA, 'MOTO XT806' ],
		'XT860':									[ STRINGS_MOTOROLA, 'Milestone 3' ],
		'XT862':									[ STRINGS_MOTOROLA, 'Droid 3' ],
		'XT882':									[ STRINGS_MOTOROLA, 'MOTO XT882' ],
		'XT883':									[ STRINGS_MOTOROLA, 'Milestone 3' ],
		'XT889':									[ STRINGS_MOTOROLA, 'XT889' ],
		'XT897':									[ STRINGS_MOTOROLA, 'Droid 4' ],
		'XT901':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'XT907':									[ STRINGS_MOTOROLA, 'Droid RAZR Mini' ],
		'XT910':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'XT910K':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'XT910S':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'XT910 4G':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'XT912':									[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'XT923':									[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
		'XT925':									[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
		'XT926':									[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'XT926 4G':									[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'XT928':									[ STRINGS_MOTOROLA, 'XT928' ],
		'Atrix 2':									[ STRINGS_MOTOROLA, 'ATRIX 2' ],
		'Atrix 4g':									[ STRINGS_MOTOROLA, 'ATRIX 4G' ],
		'Atrix 4G':									[ STRINGS_MOTOROLA, 'ATRIX 4G' ],
		'Atrix 4G ME860':							[ STRINGS_MOTOROLA, 'ATRIX 4G' ],
		'CLIQ':										[ STRINGS_MOTOROLA, 'CLIQ' ],
		'CLIQ XT':									[ STRINGS_MOTOROLA, 'CLIQ XT' ],
		'CLIQ2':									[ STRINGS_MOTOROLA, 'CLIQ 2' ],
		'Corvair':									[ STRINGS_MOTOROLA, 'Corvair', 'tablet' ],
		'DEFY':										[ STRINGS_MOTOROLA, 'DEFY' ],
		'Defy+':									[ STRINGS_MOTOROLA, 'DEFY+' ],
		'Defy Plus':								[ STRINGS_MOTOROLA, 'DEFY+' ],
		'Devour':									[ STRINGS_MOTOROLA, 'Devour' ],
		'Dext':										[ STRINGS_MOTOROLA, 'Dext' ],
		'Droid':									[ STRINGS_MOTOROLA, 'Droid' ],
		'DROID':									[ STRINGS_MOTOROLA, 'Droid' ],
		'DROID2':									[ STRINGS_MOTOROLA, 'Droid 2' ],
		'DROID2 GLOBAL':							[ STRINGS_MOTOROLA, 'Droid 2' ],
		'DROID2 Global':							[ STRINGS_MOTOROLA, 'Droid 2' ],
		'Droid2Global':								[ STRINGS_MOTOROLA, 'Droid 2' ],
		'DROID 2':									[ STRINGS_MOTOROLA, 'Droid 2' ],
		'DROID3':									[ STRINGS_MOTOROLA, 'Droid 3' ],
		'DROID4':									[ STRINGS_MOTOROLA, 'Droid 4' ],
		'DROID4 4G':								[ STRINGS_MOTOROLA, 'Droid 4' ],
		'DROID Pro':								[ STRINGS_MOTOROLA, 'Droid Pro' ],
		'DROID BIONIC':								[ STRINGS_MOTOROLA, 'Droid Bionic' ],
		'DROID BIONIC 4G':							[ STRINGS_MOTOROLA, 'Droid Bionic' ],
		'DROID BIONIC XT875 4G':					[ STRINGS_MOTOROLA, 'Droid Bionic' ],
		'DROIDRAZR':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'Droid Razr':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'DROID RAZR':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'DROID RAZR 4G':							[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'DROID SPYDER':								[ STRINGS_MOTOROLA, 'Droid RAZR' ],
		'DROID RAZR HD':							[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
		'DROID RAZR HD 4G':							[ STRINGS_MOTOROLA, 'Droid RAZR HD' ],
		'DroidX':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'DROIDX':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'droid x':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'Droid X':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'DROID X':									[ STRINGS_MOTOROLA, 'Droid X' ],
		'DROID X2':									[ STRINGS_MOTOROLA, 'Droid X2' ],
		'Electrify':								[ STRINGS_MOTOROLA, 'Electrify' ],
		'Milestone XT720':							[ STRINGS_MOTOROLA, 'Milestone' ],
		'Milestone Xt720':							[ STRINGS_MOTOROLA, 'Milestone' ],
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
		'XOOM':										[ STRINGS_MOTOROLA, 'XOOM', 'tablet' ],
		'Xoom':										[ STRINGS_MOTOROLA, 'XOOM', 'tablet' ],
		'XOOM 2':									[ STRINGS_MOTOROLA, 'XOOM 2', 'tablet' ],
		'XOOM 2 ME':								[ STRINGS_MOTOROLA, 'XOOM 2', 'tablet' ],
		'XOOM MZ606':								[ STRINGS_MOTOROLA, 'XOOM WiFi', 'tablet' ],
		'ISW11M':									[ STRINGS_MOTOROLA, 'PHOTON' ],
		'IS12M':									[ STRINGS_MOTOROLA, 'RAZR' ],
		'MOTWX435KT':								[ STRINGS_MOTOROLA, 'TRIUMPH' ],
		'X3-Ice MIUI XT720 Memorila Classics':		[ STRINGS_MOTOROLA, 'Milestone' ],
		'NABI-A':									[ 'Nabi', 'Kids tablet', 'tablet' ],
		'Newpad':									[ 'Newsmy', 'Newpad', 'tablet' ],
		'Newpad-K97':								[ 'Newsmy', 'Newpad K97', 'tablet' ],
		'Newpad P9':								[ 'Newsmy', 'Newpad P9', 'tablet' ],
		'M-PAD N8':									[ 'Newsmy', 'M-pad N8', 'tablet' ],
		'LT-NA7':									[ 'NEC', 'LT-NA7' ],
		'N-01D':									[ 'NEC', 'MEDIAS PP N-01D' ],
		'N-04C':									[ 'NEC', 'MEDIAS N-04C' ],
		'N-04D':									[ 'NEC', 'MEDIAS LTE N-04D' ],
		'N-05D':									[ 'NEC', 'MEDIAS ES N-05D' ],
		'N-06C':									[ 'NEC', 'MEDIAS WP N-06C' ],
		'N-06D':									[ 'NEC', 'MEDIAS Tab N-06D', 'tablet' ],
		'N-07D':									[ 'NEC', 'MEDIAS X N-07D' ],
		'101N':										[ 'NEC', 'MEDIAS CH Softbank 101N' ],
		'IS11N':									[ 'NEC', 'MEDIAS BR IS11N' ],
		'Nexian NX-A890':							[ 'Nexian', 'Journey' ],
		'NX-A891':									[ 'Nexian', 'Ultra Journey' ],
		'M726HC':									[ 'Nextbook', 'Premium 7', 'ereader' ],
		'NXM726HN':									[ 'Nextbook', 'Premium 7', 'ereader' ],
		'NXM803HD':									[ 'Nextbook', 'Premium 8', 'ereader' ],
		'DATAM803HC':								[ 'Nextbook', 'Premium 8', 'ereader' ],
		'NXM901':									[ 'Nextbook', 'Next 3', 'ereader'],
		'NGM Vanity Smart':							[ 'NGM', 'Vanity Smart' ],
		'Nokia N9':									[ 'Nokia', 'N9' ],
		'Nokia N900':								[ 'Nokia', 'N900' ],
		'Lumia800':									[ 'Nokia', 'Lumia 800' ],
		'Lumia 900':								[ 'Nokia', 'Lumia 900' ],
		'Notion Ink ADAM':							[ 'Notion Ink', 'ADAM', 'tablet' ],
		'P4D SIRIUS':								[ 'Nvsbl', 'P4D SIRIUS', 'tablet' ],
		'P4D Sirius':								[ 'Nvsbl', 'P4D SIRIUS', 'tablet' ],
		'EFM710A':									[ 'Oblio', 'Mint 7x', 'tablet' ],
		'ODYS-Xpress':								[ 'Odys', 'Xpress', 'tablet' ],
		'Olivetti Olipad 100':						[ 'Olivetti', 'Olipad 100', 'tablet' ],
		'OP110':									[ 'Olivetti', 'Olipad 110', 'tablet' ],
		'ONDA MID':									[ 'Onda', 'MID', 'tablet' ],
		'VX580A':									[ 'Onda', 'VX580A', 'tablet' ],
		'VX610A':									[ 'Onda', 'VX610A', 'tablet' ],
		'TQ150':									[ 'Onda', 'TQ150' ],
		'N2T':										[ 'ONN', 'N2T', 'tablet' ],
		'Renesas':									[ 'Opad', 'Renesas', 'tablet' ],
		'renesas emev':								[ 'Opad', 'Renesas', 'tablet' ],						
		'X903':										[ 'Oppo', 'Find Me X903' ],
		'X905':										[ 'Oppo', 'Find 3 X905' ],
		'OPPOX905':									[ 'Oppo', 'Find 3 X905' ],
		'X9015':									[ 'Oppo', 'Find X9015' ],
		'OPPOX9017':								[ 'Oppo', 'Finder X9017' ],
		'OPPOR807':									[ 'Oppo', 'Real R807' ],
		'OPPOT703':									[ 'Oppo', 'T703' ],
		'P-01D':									[ 'Panasonic', 'P-01D' ],
		'P-02D':									[ 'Panasonic', 'Lumix Phone' ],
		'P-04D':									[ 'Panasonic', 'Eluga' ],
		'P-07C':									[ 'Panasonic', 'P-07C' ],
		'dL1':										[ 'Panasonic', 'Eluga dL1' ],
		'101P':										[ 'Panasonic', 'Lumix Phone' ],
		'JT-H580VT':								[ 'Panasonic', 'BizPad 7', 'tablet' ],
		'JT-H581VT':								[ 'Panasonic', 'BizPad 10', 'tablet' ],
		'FZ-A1A':									[ 'Panasonic', 'Toughpad', 'tablet' ],
		'pandigital9hr':							[ 'Pandigital', '9HR', 'tablet' ],
		'pandigital9hr2':							[ 'Pandigital', '9HR2', 'tablet' ],
		'pandigitalopc1':							[ 'Pandigital', 'OPC1', 'tablet' ],
		'pandigitalopp1':							[ 'Pandigital', 'OPP1', 'tablet' ],
		'pandigitalp1hr':							[ 'Pandigital', 'p1hr', 'tablet' ],
		'IM-A600S':									[ STRINGS_PANTECH, 'SIRIUS α' ],
		'IM-A630K':									[ STRINGS_PANTECH, 'SKY Izar' ],
		'IM-A690L':									[ STRINGS_PANTECH, 'SKY' ],
		'IM-A690S':									[ STRINGS_PANTECH, 'SKY' ],
		'IM-A710K':									[ STRINGS_PANTECH, 'SKY Vega Xpress' ],
		'IM-A720L':									[ STRINGS_PANTECH, 'SKY Vega Xpress' ],
		'IM-A725L':									[ STRINGS_PANTECH, 'SKY Vega X+' ],
		'IM-A730s':									[ STRINGS_PANTECH, 'SKY Vega S' ],
		'IM-A730S':									[ STRINGS_PANTECH, 'SKY Vega S' ],
		'IM-A750K':									[ STRINGS_PANTECH, 'SKY Mirach A' ],
		'IM-A760S':									[ STRINGS_PANTECH, 'SKY Vega Racer' ],
		'IM-A770K':									[ STRINGS_PANTECH, 'SKY Vega Racer' ],
		'IM-A780L':									[ STRINGS_PANTECH, 'SKY Vega Racer' ],
		'IM-A800S':									[ STRINGS_PANTECH, 'SKY Vega LTE' ],
		'IM-A810K':									[ STRINGS_PANTECH, 'SKY Vega LTE M' ],
		'IM-A810S':									[ STRINGS_PANTECH, 'SKY Vega LTE M' ],
		'IM-A820L':									[ STRINGS_PANTECH, 'SKY Vega LTE EX' ],
		'IM-A830K':									[ STRINGS_PANTECH, 'SKY Vega Racer 2' ],
		'IM-A830L':									[ STRINGS_PANTECH, 'SKY Vega Racer 2' ],
		'IM-A830S':									[ STRINGS_PANTECH, 'SKY Vega Racer 2' ],
		'IM-A840S':									[ STRINGS_PANTECH, 'SKY Vega S5' ],
		'IM-A850K':									[ STRINGS_PANTECH, 'IM-A850K' ],	
		'IM-T100K':									[ STRINGS_PANTECH, 'SKY Vega No. 5', 'tablet' ],
		'IS06':										[ STRINGS_PANTECH, 'SIRIUS α' ],
		'ADR8995':									[ STRINGS_PANTECH, 'Breakout' ],
		'ADR8995 4G':								[ STRINGS_PANTECH, 'Breakout' ],
		'ADR910L 4G':								[ STRINGS_PANTECH, 'ADR910L' ],
		'PantechP4100':								[ STRINGS_PANTECH, 'Element', 'tablet' ],
		'PantechP8000':								[ STRINGS_PANTECH, 'Crossover' ],
		'PantechP8010':								[ STRINGS_PANTECH, 'P8010' ],
		'PantechP9060':								[ STRINGS_PANTECH, 'Pocket' ],
		'PantechP9070':								[ STRINGS_PANTECH, 'Burst' ],
		'SKY IM-A600S':								[ STRINGS_PANTECH, 'SIRIUS α' ],
		'SKY IM-A630K':								[ STRINGS_PANTECH, 'SKY Izar' ],
		'SKY IM-A650S':								[ STRINGS_PANTECH, 'SKY Vega' ],
		'IS11PT':									[ STRINGS_PANTECH, 'Mirach IS11PT' ],
		'PAT712W':									[ 'Perfeo', 'PAT712W', 'tablet' ],
		'X7G':										[ 'Pearl', 'Touchlet X7G', 'tablet' ],
		'FWS810':									[ 'PHICOMM', 'FWS810' ],
		'Philips PI5000':							[ 'Philips', 'PI5000', 'tablet' ],
		'PI7000':									[ 'Philips', 'PI7000', 'tablet' ],
		'Philips W626':								[ 'Philips', 'W626' ],
		'Philips W632':								[ 'Philips', 'W632' ],
		'MOMO':										[ 'Ployer', 'MOMO', 'tablet' ],
		'MOMO15':									[ 'Ployer', 'MOMO15', 'tablet' ],
		'PocketBook A7':							[ 'PocketBook', 'A7', 'tablet' ],
		'PocketBook A10':							[ 'PocketBook', 'A10', 'tablet' ],
		'Mobii 7':									[ 'Point Of View', 'Mobii 7', 'tablet' ],
		'PMP3384BRU':								[ 'Prestigio', 'Multipad 3384', 'tablet' ],
		'TB07FTA':									[ 'Positivo', 'TB07FTA', 'tablet' ],
		'QW TB-1207':								[ 'Qware', 'Pro3', 'tablet' ],
		'W6HD ICS':									[ 'Ramos', 'W6HD', 'tablet' ],
		'w10':										[ 'Ramos', 'W10', 'tablet' ],
		'W10':										[ 'Ramos', 'W10', 'tablet' ],
		'w10 v2.0':									[ 'Ramos', 'W10 v2.0', 'tablet' ],
		'W10 V2.0':									[ 'Ramos', 'W10 v2.0', 'tablet' ],
		'T11AD':									[ 'Ramos', 'T11AD', 'tablet' ],
		'T11AD.FE':									[ 'Ramos', 'T11AD', 'tablet' ],
		'PlayBook':									[ 'RIM', 'BlackBerry PlayBook', 'tablet' ],
		'RBK-490':									[ 'Ritmix', 'RBK-490', 'tablet' ],
		'A8HD':										[ 'Saayi', 'Dropad A8HD', 'tablet' ],
		'Galaxy Nexus':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'GT-B5330':									[ STRINGS_SAMSUNG, 'GT-B5330' ],
		'GT-B5510':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro' ],
		'GT-B5510B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro' ],
		'GT-B5510L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro' ],
		'GT-B5512':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Pro Duos' ],
		'GT-B7510':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pro' ],
		'GT-B7510L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pro' ],
		'GT-I5500':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5500B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5500L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5500M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5500-MR3':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5503':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5508':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 5' ],
		'GT-I5510':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 551' ],
		'GT-I5510L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 551' ],
		'GT-I5510M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 551' ],
		'GT-I5510T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' 551' ],
		'GT-I5700':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Spica' ],
		'GT-I5700L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Spica' ],
		'GT-I5800':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Apollo' ],
		'GT-I5800D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Apollo' ],
		'GT-I5800L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Apollo' ],
		'GT-I5801':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Apollo' ],
		'GT-I6500U':								[ STRINGS_SAMSUNG, 'Saturn' ],
		'GT-I8000':									[ STRINGS_SAMSUNG, 'Omnia 2' ],
		'GT-I8150':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' W' ],
		'GT-I8150B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' W' ],
		'GT-I8160':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace 2' ],
		'GT-I8160L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace 2' ],
		'GT-I8160P':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace 2' ],
		'GT-I8250':									[ STRINGS_SAMSUNG, 'GT-I8250' ],
		'GT-I8320':									[ STRINGS_SAMSUNG, 'H1' ],
		'GT-I8520':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Beam' ],
		'GT-I8530':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Beam' ],
		'GT-i9000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9000B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9000M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Vibrant' ],
		'GT-I9000T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9001':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Plus' ],
		'GT-I9003':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' SL' ],
		'GT-I9003L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' SL' ],
		'GT-I9008':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9008L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-I9010':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Giorgio Armani' ],
		'GT-I9018':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' GT-I9018' ],
		'GT-I9050':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' GT-I9050' ],
		'GT-I9070':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Advance' ],
		'GT-I9070P':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Advance' ],
		'GT-I9088':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'GT-i9100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9100G':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9100M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9100T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9100P':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9103':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' R' ],
		'GT-I9108':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'GT-I9210':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
		'GT-I9210T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
		'GT-I9220':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'GT-I9228':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'GT-I9250':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'GT-I9250 EUR XX':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'GT-I9300':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'GT-I9300T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'GT-I9303T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'GT-I9308':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'GT-I9500':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' GT-I9500' ],
		'GT-I9800':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' GT-I9800' ],
		'GT-N7000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'GT-N7000B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'GT-N7100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
		'GT-N7105':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
		'GT-N8000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note 10.1' ],
		'GT-N8010':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note 10.1' ],
		'GT-N8013':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note 10.1' ],
		'GT-P1000':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1000L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1000M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1000N':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1000T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1000 Tablet':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P1010':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GT-P3100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', 'tablet' ],
		'GT-P3100B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', 'tablet' ],
		'GT-P3110':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', 'tablet' ],
		'GT-P3113':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', 'tablet' ],
		'GT-P5100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (10.1)', 'tablet' ],
		'GT-P5110':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (10.1)', 'tablet' ],
		'GT-P5113':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (10.1)', 'tablet' ],
		'GT-P6200':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', 'tablet' ],
		'GT-P6200L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', 'tablet' ],
		'GT-P6201':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus N', 'tablet' ],
		'GT-P6210':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', 'tablet' ],
		'GT-P6211':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus N', 'tablet' ],
		'GT-P6800':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', 'tablet' ],
		'GT-P6810':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', 'tablet' ],
		'GT-P7100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1V', 'tablet' ],
		'GT-P7300':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'GT-P7300B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'GT-P7310':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'GT-P7320':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'GT-P7320T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'GT-P7500':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'GT-P7500D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'GT-P7500R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'GT-P7500V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'GT-P7501':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1N', 'tablet' ],
		'GT-P7510':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'GT-P7511':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1N', 'tablet' ],
		'GT-S5300':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pocket' ],
		'GT-S5302':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pocket Duos' ],
		'GT-S5360':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'GT-S5360B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'GT-S5360L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'GT-S5363':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'GT-S5367':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y TV' ],
		'GT-S5368':									[ STRINGS_SAMSUNG, 'GT-S5368' ],
		'GT-S5369':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'GT-S5570':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'GT-S5570B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'GT-S5570I':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'GT-S5570L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'GT-S5578':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'GT-S5660':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
		'GT-S5660M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
		'GT-S5660V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
		'GT-S5670':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Fit' ],
		'GT-S5670B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Fit' ],
		'GT-S5670L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Fit' ],
		'GT-S5690':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Xcover' ],
		'GT-S5690L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Xcover' ],
		'GT-S5820':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830C':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830D-parrot':							[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830i':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5830T':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5838':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S5839i':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'GT-S6102':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Duos' ],
		'GT-S6102B':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Duos' ],
		'GT-S6102E':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y Duos' ],
		'GT-S6500':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini 2' ],
		'GT-S6500D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini 2' ],
		'GT-S6702':									[ STRINGS_SAMSUNG, 'GT-S6702' ],
		'GT-S6802':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Duos' ],
		'GT-S7500':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Plus' ],
		'GT-S7500L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Plus' ],
		'GT-S7500W':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Plus' ],
		'GT-T959':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Vibrant' ],
		'SCH-i509':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Y' ],
		'SCH-i559':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Pop' ],
		'SCH-i569':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Gio' ],
		'SCH-i579':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'SCH-i589':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace Duos' ],
		'SCH-i705 4G':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 2 (7.0)', 'tablet' ],
		'SCH-i809':									[ STRINGS_SAMSUNG, 'SCH-i809' ],
		'SCH-i889':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SCH-i909':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'SCH-i919':									[ STRINGS_SAMSUNG, 'SCH-i919' ],
		'SCH-i929':									[ STRINGS_SAMSUNG, 'SCH-i929' ],
		'SCH-I100':									[ STRINGS_SAMSUNG, 'Gem' ],
		'SCH-I110':									[ STRINGS_SAMSUNG, 'Illusion' ],
		'SCH-I200':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Stellar' ],
		'SCH-I400':									[ STRINGS_SAMSUNG, 'Continuum' ],
		'SCH-I405':									[ STRINGS_SAMSUNG, 'Stratosphere' ],
		'SCH-I405 4G':								[ STRINGS_SAMSUNG, 'Stratosphere' ],
		'SCH-I405U':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Metrix' ],
		'SCH-I500':									[ STRINGS_SAMSUNG, 'Fascinate' ],
		'SCH-I510':									[ STRINGS_SAMSUNG, 'Stealth V' ],
		'SCH-I510 4G':								[ STRINGS_SAMSUNG, 'Droid Charge' ],
		'SCH-I515':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'SCH-I535':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SCH-I535 4G':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SCH-I619':									[ STRINGS_SAMSUNG, 'SCH-I619' ],
		'SCH-I779':									[ STRINGS_SAMSUNG, 'SCH-I779' ],
		'SCH-I800':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', 'tablet' ],
		'SCH-I815':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', 'tablet' ],
		'SCH-I815 4G':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', 'tablet' ],
		'SCH-I905':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SCH-I905 4G':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SCH-I909':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'SCH-I915':									[ STRINGS_SAMSUNG, 'SCH-I915' ],
		'SCH-I939':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SCH-M828C':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Precedent' ],
		'SCH-M828C[9096483449]':					[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Precedent' ],
		'SCH-R530U':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SCH-R680':									[ STRINGS_SAMSUNG, 'Repp' ],
		'SCH-R720':									[ STRINGS_SAMSUNG, 'Admire' ],
		'SCH-R730':									[ STRINGS_SAMSUNG, 'Transfix' ],
		'SCH-R760':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SCH-R820':									[ STRINGS_SAMSUNG, 'SCH-R820' ],
		'SCH-R880':									[ STRINGS_SAMSUNG, 'Acclaim' ],
		'SCH-R910':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Indulge 4G' ],
		'SCH-R915':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Indulge' ],
		'SCH-R920':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Attain 4G' ],
		'SCH-R930':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Aviator' ],
		'SCH-R940':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Lightray' ],
		'SCH-S720C':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Proclaim' ],
		'SCH-S735C':								[ STRINGS_SAMSUNG, 'SCH-S735' ],
		'SCH-W899':									[ STRINGS_SAMSUNG, 'SCH-W899' ],
		'SCH-W999':									[ STRINGS_SAMSUNG, 'SCH-W999' ],
		'SGH-I547':									[ STRINGS_SAMSUNG, 'SGH-I547' ],
		'SGH-I717':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SGH-I717D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SGH-I717M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SGH-I717R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SGH-I727':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Skyrocket' ],
		'SGH-i727R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SGH-I727R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SGH-I747':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SGH-I747M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SGH-I748':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SGH-I757':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Skyrocket HD' ],
		'SGH-I757M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II Skyrocket HD' ],
		'SGH-I777':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SGH-I9777':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SGH-I896':									[ STRINGS_SAMSUNG, 'Captivate' ],
		'SGH-I897':									[ STRINGS_SAMSUNG, 'Captivate' ],
		'SGH-I927':									[ STRINGS_SAMSUNG, 'Captivate Glide' ],
		'SGH-I927R':								[ STRINGS_SAMSUNG, 'Captivate Glide' ],
		'SGH-I957':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SGH-I957D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SGH-I957M':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SGH-I957R':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SGH-I987':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', 'tablet' ],
		'SGH-I997':									[ STRINGS_SAMSUNG, 'Infuse 4G' ],
		'SGH-I997R':								[ STRINGS_SAMSUNG, 'Infuse 4G' ],
		'SGH-I9000':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'SGH-S730G':								[ STRINGS_SAMSUNG, 'SGH-S730' ],
		'SGH-T499':									[ STRINGS_SAMSUNG, 'Dart' ],
		'SGH-T499V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'SGH-T499Y':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Mini' ],
		'SGH-T589':									[ STRINGS_SAMSUNG, 'Gravity Smart' ],
		'SGH-T589R':								[ STRINGS_SAMSUNG, 'Gravity Smart' ],
		'SGH-T679':									[ STRINGS_SAMSUNG, 'Exhibit II 4G' ],
		'SGH-T679M':								[ STRINGS_SAMSUNG, 'Exhibit II 4G' ],
		'SGH-T759':									[ STRINGS_SAMSUNG, 'Exhibit 4G' ],
		'SGH-T769':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Blaze 4G' ],
		'SGH-T839':									[ STRINGS_SAMSUNG, 'T-Mobile Sidekick' ],
		'SGH-T849':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0', 'tablet' ],
		'SGH-T859':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SGH-T869':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', 'tablet' ],
		'SGH-T879':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SGH-T959':									[ STRINGS_SAMSUNG, 'Vibrant' ],
		'SGH-T959D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Fascinate 3G+' ],
		'SGH-T959P':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Fascinate 4G' ],
		'SGH-T959V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S 4G' ],
		'SGH-T989':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SGH-T989D':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II X' ],
		'SGH-T999':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Blaze 4G' ],
		'SGH-T999V':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Blaze 4G' ],
		'SHV-E120K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II HD LTE' ],
		'SHV-E120L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II HD LTE' ],
		'SHV-E120S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II HD LTE' ],
		'SHV-E110S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II LTE' ],
		'SHV-E140K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SHV-E140S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SHV-E150S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.7', 'tablet' ],
		'SHV-E160K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note' ],
		'SHV-E160L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note LTE' ],
		'SHV-E160S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note LTE' ],
		'SHV-E170K':								[ STRINGS_SAMSUNG, 'SHV-E170K' ],
		'SHV-E170L':								[ STRINGS_SAMSUNG, 'SHV-E170L' ],
		'SHV-E210K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SHV-E210L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SHV-E210S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SHV-E250S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Note II' ],
		'SHW-M100S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' A' ],
		'SHW-M110S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'SHW-M130L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' U' ],
		'SHW-M130K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' K' ],
		'SHW-M180K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SHW-M180L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SHW-M180S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SHW-M180W':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SHW-M185S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SHW-M190S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S Hoppin' ],
		'SHW-M220L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Neo' ],
		'SHW-M240S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Ace' ],
		'SHW-M250K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SHW-M250L':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SHW-M250S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SHW-M300W':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SHW-M305W':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 8.9', 'tablet' ],
		'SHW-M340S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' M Style' ],
		'SHW-M380K':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SHW-M380S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SHW-M380W':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1', 'tablet' ],
		'SHW-M440S':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SMT-i9100':								[ STRINGS_SAMSUNG, 'SMT-I9100', 'tablet' ],
		'SPH-D600':									[ STRINGS_SAMSUNG, 'Conquer 4G' ],
		'SPH-D700':									[ STRINGS_SAMSUNG, 'Epic 4G' ],
		'SPH-D705':									[ STRINGS_SAMSUNG, 'Epic 4G 2' ],
		'SPH-D710':									[ STRINGS_SAMSUNG, 'Epic 4G Touch' ],
		'SPH-L700':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'SPH-L710':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S III' ],
		'SPH-M820':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Prevail' ],
		'SPH-M820-BST':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Prevail' ],
		'SPH-M580':									[ STRINGS_SAMSUNG, 'Replenish' ],
		'SPH-M900':									[ STRINGS_SAMSUNG, 'Moment' ],
		'SPH-M910':									[ STRINGS_SAMSUNG, 'Intercept' ],
		'SPH-M920':									[ STRINGS_SAMSUNG, 'Transform' ],
		'SPH-M930':									[ STRINGS_SAMSUNG, 'Transform Ultra' ],
		'SPH-M930BST':								[ STRINGS_SAMSUNG, 'Transform Ultra' ],
		'SPH-P100':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
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
		'GALAXY Tab':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'GALAXY NEXUS':								[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Nexus' ],
		'Vibrantmtd':								[ STRINGS_SAMSUNG, 'Vibrant' ],
		'SC-01C':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab', 'tablet' ],
		'SC-01D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 10.1 LTE', 'tablet' ],
		'SC-02B':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S' ],
		'SC-02C':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' S II' ],
		'SC-02D':									[ STRINGS_SAMSUNG, STRINGS_GALAXY + ' Tab 7.0 Plus', 'tablet' ],
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
		'SH-02D':									[ STRINGS_SHARP, 'Aquos slider SH-02D' ],
		'SH-03C':									[ STRINGS_SHARP, 'Lynx 3D' ],
		'SH-06D':									[ STRINGS_SHARP, 'Aquos SH-06D' ],
		'SH-09D':									[ STRINGS_SHARP, 'Aquos Zeta SH-09D' ],
		'SH-10B':									[ STRINGS_SHARP, 'Lynx' ],
		'SH-12C':									[ STRINGS_SHARP, 'Aquos' ],
		'SH-13C':									[ STRINGS_SHARP, 'Aquos f SH-13C' ],
		'SH80F':									[ STRINGS_SHARP, 'Aquos SH80F' ],
		'SH72x8U':									[ STRINGS_SHARP, 'SH72x8U' ],
		'SH8118U':									[ STRINGS_SHARP, 'SH8118U' ],
		'SH8128U':									[ STRINGS_SHARP, 'SH8128U' ],
		'SH8158U':									[ STRINGS_SHARP, 'SH8158U' ],
		'SH8188U':									[ STRINGS_SHARP, 'SH8188U' ],
		'SH8268U':									[ STRINGS_SHARP, 'SH8268U' ],
		'INFOBAR C01':								[ STRINGS_SHARP, 'INFOBAR C01' ],
		'SPX-5':									[ 'Simvalley', 'SPX-5' ],
		'SPX-5 3G':									[ 'Simvalley', 'SPX-5 3G' ],
		'SmartQ G7':								[ 'SmartQ', 'G7', 'tablet' ],
		'SmartQT7':									[ 'SmartQ', 'T7', 'tablet' ],
		'SmartQT10':								[ 'SmartQ', 'T10', 'tablet' ],
		'SmartQT15':								[ 'SmartQ', 'T15', 'tablet' ],
		'SmartQT19':								[ 'SmartQ', 'T19', 'tablet' ],
		'SmartQT20':								[ 'SmartQ', 'T20', 'tablet' ],
		'OMS1 6':									[ STRINGS_SONY_ERICSSON, 'A8i' ],
		'E10a':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
		'E10i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
		'E10iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
		'E15':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'E15a':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'E15i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'E15iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'E15i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'E16i':										[ STRINGS_SONY_ERICSSON, 'W8 Walkman' ],
		'LT11i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'LT15':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'LT15a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'LT15i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'LT15iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'LT15i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'LT18a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
		'LT18i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
		'LT18iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
		'LT18i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
		'LT22i':									[ 'Sony', STRINGS_XPERIA + ' P' ],
		'LT26i':									[ 'Sony', STRINGS_XPERIA + ' S' ],
		'LT26i-o':									[ 'Sony', STRINGS_XPERIA + ' S' ],
		'LT26w':									[ 'Sony', STRINGS_XPERIA + ' Acro S' ],
		'LT28at':									[ 'Sony', STRINGS_XPERIA + ' Ion' ],
		'LT28h':									[ 'Sony', STRINGS_XPERIA + ' Ion' ],
		'LT28i':									[ 'Sony', STRINGS_XPERIA + ' Ion' ],
		'LT29i':									[ 'Sony', STRINGS_XPERIA + ' GX' ],
		'SonyLT29i':								[ 'Sony', STRINGS_XPERIA + ' GX' ],
		'SonyLT30a':								[ 'Sony', STRINGS_XPERIA + ' Mint' ],
		'SonyLT30p':								[ 'Sony', STRINGS_XPERIA + ' Mint' ],
		'MK16a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Pro' ],
		'MK16i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Pro' ],
		'MT11a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'MT11i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'MT11iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'MT11i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'MT15a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'MT15i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'MT15iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'MT15i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'MT25i':									[ 'Sony', STRINGS_XPERIA + ' Neo L' ],
		'MT27i':									[ 'Sony', STRINGS_XPERIA + ' Sola' ],
		'R800a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'R800i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'R800iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'R800at':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'R800x':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'SK17a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini Pro' ],
		'SK17i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini Pro' ],
		'SK17iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini Pro' ],
		'SK17i-o':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini Pro' ],
		'ST15a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
		'ST15i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
		'ST17a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Active' ],
		'ST17i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Active' ],
		'ST18a':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'ST18i':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'ST18iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'ST18av':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'SonyST21':									[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'SonyST21i':								[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'SonyST21a2':								[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'SonyST21i2':								[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'ST21':										[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'ST21i':									[ 'Sony', STRINGS_XPERIA + ' Tipo' ],
		'SonyST23i':								[ 'Sony', STRINGS_XPERIA + ' Miro' ],
		'ST23i':									[ 'Sony', STRINGS_XPERIA + ' Miro' ],
		'ST25i':									[ 'Sony', STRINGS_XPERIA + ' U' ],
		'ST27i':									[ 'Sony', STRINGS_XPERIA + ' Go' ],
		'U20a':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
		'U20i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
		'U20iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
		'WT13i':									[ STRINGS_SONY_ERICSSON, 'Mix Walkman' ],
		'WT18i':									[ STRINGS_SONY_ERICSSON, 'Walkman' ],
		'WT19a':									[ STRINGS_SONY_ERICSSON, 'Live with Walkman' ],
		'WT19i':									[ STRINGS_SONY_ERICSSON, 'Live with Walkman' ],
		'WT19iv':									[ STRINGS_SONY_ERICSSON, 'Live with Walkman' ],
		'X8':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'X10':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'X10a':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'X10i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'X10iv':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'X10S':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'X10mini':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
		'X10 Mini':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini' ],
		'X10 Mini Pro':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10 Mini Pro' ],
		'Z1i':										[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'S51SE':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
		'IS11S':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro' ],
		'IS12S':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro HD' ],
		'SO-01B':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'SO-01C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'SO-01D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'SO-02C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro' ],
		'SO-02D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' NX' ],
		'SO-03C':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'SO-03D':									[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Acro HD' ],
		'SO-04D':									[ 'Sony', STRINGS_XPERIA + ' GX' ],
		'SO-05D':									[ 'Sony', STRINGS_XPERIA + ' SX' ],
		'XPERIA X8':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'Xperia X8':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X8' ],
		'Xperia X10':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X10' ],
		'Xperia ray':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'Xperia Ray':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Ray' ],
		'Xperia Arc':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc' ],
		'Xperia Arc S':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Arc S' ],
		'Xperia Mini':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Mini' ],
		'Xperia neo':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'Xperia Neo':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'XPERIA NEO':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo' ],
		'Xperia NeoV':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'Xperia Neo V':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Neo V' ],
		'Xperia Play':								[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' Play' ],
		'Sony Ericsson Xperia X1':					[ STRINGS_SONY_ERICSSON, STRINGS_XPERIA + ' X1' ],
		'SonyHayabusa':								[ 'Sony', STRINGS_XPERIA + ' Ion' ],
		'Hayabusa':									[ 'Sony', STRINGS_XPERIA + ' Ion' ],
		'nozomi':									[ 'Sony', STRINGS_XPERIA + ' S' ],
		'Sony Tablet P':							[ 'Sony', 'Tablet P', 'tablet' ],
		'Sony Tablet S':							[ 'Sony', 'Tablet S', 'tablet' ],
		'NWZ-Z1000Series':							[ 'Sony', 'Walkman Z', 'media' ],
		'NW-Z1000Series':							[ 'Sony', 'Walkman Z', 'media' ],
		'Spice Mi280':								[ 'Spice', 'Mi-280' ],
		'Spice Mi300':								[ 'Spice', 'Mi-300' ],
		'Spice Mi-310':								[ 'Spice', 'Mi-310' ],
		'Spice Mi-355':								[ 'Spice', 'Mi-355' ],
		'Spice Mi-425':								[ 'Spice', 'Mi-425' ],
		'SPICE Mi-720':								[ 'Spice', 'Mi-720' ],
		'A7272+':									[ 'Star', 'A7272+' ],
		'e1109 v73 gq1002 ctp':						[ 'Star', 'X18i' ],
		'TS1004T':									[ 'Surf 3Q', 'TS1004T', 'tablet' ],
		'SYTABEX7-2':								[ 'Sylvania', 'SYTABEX7', 'tablet' ],
		'KM-S200':									[ 'TAKE', 'Janus KM-S200' ],
		'TCL A860':									[ 'TCL' , 'A860' ],
		'TCL A906':									[ 'TCL' , 'A906' ],
		'TCL A909':									[ 'TCL' , 'A909' ],
		'TCL A919':									[ 'TCL' , 'A919' ],
		'TCL A990':									[ 'TCL' , 'A990' ],
		'TCL A996':									[ 'TCL' , 'A996' ],
		'TCL A998':									[ 'TCL' , 'A998' ],
		'TCL GENESEE E708':							[ 'TCL' , 'Genesee E708' ],
		'A10t(5DM3)':								[ 'Teclast', 'A10T', 'tablet' ],
		'P72':										[ 'Teclast', 'P72', 'tablet' ],
		'P76TI':									[ 'Teclast', 'P76Ti', 'tablet' ],
		'P81HD':									[ 'Teclast', 'P81HD', 'tablet' ],
		'P85(R8A1)':								[ 'Teclast', 'P85', 'tablet' ],
		'T720 SE':									[ 'Teclast', 'T720', 'tablet' ],
		'T760 from moage.com':						[ 'Teclast', 'T760', 'tablet' ],
		'tegav2':									[ 'Tegatech', 'TEGA v2', 'tablet' ],
		'TM-7025':									[ 'teXet', 'TM-7025', 'tablet' ],
		'MoFing':									[ 'Thomson', 'MoFing', 'tablet' ],
		'Ultimate10':								[ 'Tomtec', 'Ultimate10', 'tablet' ],
		'Thl V7':									[ 'THL', 'V7' ],
		'ThL V7':									[ 'THL', 'V7' ],
		'ThL V8':									[ 'THL', 'V8' ],
		'ThL V9':									[ 'THL', 'V9' ],
		'ThL V11':									[ 'THL', 'V11' ],
		'TSB CLOUD COMPANION;TOSHIBA AC AND AZ':	[ STRINGS_TOSHIBA, 'Dynabook AZ', 'desktop' ],
		'TOSHIBA AC AND AZ':						[ STRINGS_TOSHIBA, 'Dynabook AZ', 'desktop' ],
		'TOSHIBA FOLIO AND A':						[ STRINGS_TOSHIBA, 'Folio 100', 'tablet' ],
		'T-01C':									[ STRINGS_TOSHIBA, 'Regza T-01C' ],
		'T-01D':									[ STRINGS_TOSHIBA, 'Regza T-01D' ],
		'IS04':										[ STRINGS_TOSHIBA, 'Regza IS04' ],
		'IS11T':									[ STRINGS_TOSHIBA, 'Regza IS11T' ],
		'AT1S0':									[ STRINGS_TOSHIBA, 'Regza AT1S0' ],
		'Tostab03':									[ STRINGS_TOSHIBA, 'Regza AT100', 'tablet' ],
		'AT100':									[ STRINGS_TOSHIBA, 'Regza AT100', 'tablet' ],
		'AT200':									[ STRINGS_TOSHIBA, 'Regza AT200', 'tablet' ],
		'AT470':									[ STRINGS_TOSHIBA, 'Regza AT470', 'tablet' ],
		'AT570':									[ STRINGS_TOSHIBA, 'Regza AT570', 'tablet' ],
		'AT830':									[ STRINGS_TOSHIBA, 'Regza AT830', 'tablet' ],
		'Folio 100':								[ STRINGS_TOSHIBA, 'Folio 100', 'tablet' ],
		'folio100':									[ STRINGS_TOSHIBA, 'Folio 100', 'tablet' ],
		'THRiVE':									[ STRINGS_TOSHIBA, 'THRiVE', 'tablet' ],
		'Fantastic T3':								[ 'TWM', 'Fantastic T3' ],
		'M70014':									[ 'United Star Technology', 'M70014', 'tablet' ],
		'PS47':										[ 'Velocity Micro', 'Cruz PS47', 'tablet' ],
		'T301':										[ 'Velocity Micro', 'Cruz T301', 'tablet' ],
		'Vibo-A688':								[ 'FIH', 'Vibo A688' ],
		'Videocon-V7500':							[ 'Videocon', 'V7500' ],
		'GTablet':									[ 'ViewSonic', 'gTablet', 'tablet' ],
		'GtabComb':									[ 'ViewSonic', 'gTablet', 'tablet' ],
		'TeamDRH ICS for GTablet':					[ 'ViewSonic', 'gTablet', 'tablet' ],
		'ViewPad7':									[ 'ViewSonic', 'ViewPad 7', 'tablet' ],
		'ViewPad 10e':								[ 'ViewSonic', 'ViewPad 10e', 'tablet' ],
		'VTAB1008':									[ 'Vizio', 'VTAB1008', 'tablet' ],
		'VTAB3010':									[ 'Vizio', 'VTAB3010', 'tablet' ],
		'VOTO W5300':								[ 'VOTO', 'W5300' ],
		'xPAD-70':									[ 'WayteQ', 'xPAD-70', 'tablet' ],
		'xTAB-70':									[ 'WayteQ', 'xTAB-70', 'tablet' ],
		'WellcoM-A99':								[ 'WellcoM', 'A99' ],
		'N12':										[ 'Window', 'N12', 'tablet' ],
		'N12R':										[ 'Window', 'N12R', 'tablet' ],
		'N50':										[ 'Window', 'N50', 'tablet' ],
		'N50DT':									[ 'Window', 'N50DT', 'tablet' ],
		'N50GT':									[ 'Window', 'N50GT', 'tablet' ],
		'N50GT A':									[ 'Window', 'N50GT-A', 'tablet' ],
		'N70':										[ 'Window', 'N70', 'tablet' ],
		'N70 DUAL CORE':							[ 'Window', 'N70 Dual Core', 'tablet' ],
		'N80':										[ 'Window', 'N80', 'tablet' ],
		'N90':										[ 'Window', 'N90', 'tablet' ],
		'N90 DUAL CORE2 V12':						[ 'Window', 'N90 Dual Core', 'tablet' ],
		'N612':										[ 'Wishway', 'N612' ],
		'AT-AS43D':									[ 'Wolfgang', 'AT-AS43D' ],
		'M12':										[ 'Wopad', 'M12', 'tablet' ],
		'WM8650':									[ 'WonderMedia', 'WM8650', 'tablet' ],
		'MI-ONE':									[ 'Xiaomi', 'MI-ONE' ],
		'MI-ONE C1':								[ 'Xiaomi', 'MI-ONE C1' ],
		'MI-ONE Plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
		'mione plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
		'MI-TWO':									[ 'Xiaomi', 'MI-TWO' ],
		'Q07CL01':									[ 'XVision', 'Q07', 'tablet' ],
		'N6':										[ 'Yarvik', '210 Tablet', 'tablet' ],
		'EMR1879':									[ 'Yidong', 'EMR1879', 'tablet' ],
		'yusun W702':								[ 'Yusun', 'W702' ],
		'YX-YUSUN E80':								[ 'Yusun', 'E80' ],
		'zt180':									[ 'Zenithink', 'ZT-180', 'tablet' ],
		'Jaguar7':									[ 'ZiiLabs', 'Jaguar 7', 'tablet' ],
		'Ziss Ranger HD':							[ 'Ziss', 'Ranger HD' ],
		'ZTE Libra':								[ STRINGS_ZTE, 'Libra' ],
		'ZTE-T T9':									[ STRINGS_ZTE, 'Light Tab T9', 'tablet' ],
		'V9':										[ STRINGS_ZTE, 'Light Tab V9', 'tablet' ],
		'V9e+':										[ STRINGS_ZTE, 'Light Tab 2', 'tablet' ],
		'V9A':										[ STRINGS_ZTE, 'Light Tab 2', 'tablet' ],
		'Light Tab 2W':								[ STRINGS_ZTE, 'Light Tab 2', 'tablet' ],
		'Light Tab 2':								[ STRINGS_ZTE, 'Light Tab 2', 'tablet' ],
		'V9C':										[ STRINGS_ZTE, 'Light Tab 3', 'tablet' ],
		'V55':										[ STRINGS_ZTE, 'Optik', 'tablet' ],
		'Acqua':									[ STRINGS_ZTE, 'Acqua' ],
		'Blade':									[ STRINGS_ZTE, 'Blade' ],
		'Blade-V880':								[ STRINGS_ZTE, 'Blade' ],
		'ZTE-U V880':								[ STRINGS_ZTE, 'Blade' ],
		'Blade-opda':								[ STRINGS_ZTE, 'Blade' ],
		'ZTE-BLADE':								[ STRINGS_ZTE, 'Blade' ],
		'ZTE Blade':								[ STRINGS_ZTE, 'Blade' ],
		'ZTE V880':									[ STRINGS_ZTE, 'Blade' ],
		'ZTE-U(V)880+':								[ STRINGS_ZTE, 'Blade' ],
		'V880':										[ STRINGS_ZTE, 'Blade' ],
		'a5':										[ STRINGS_ZTE, 'Blade' ],
		'Blade2':									[ STRINGS_ZTE, 'Blade 2' ],
		'Blade S':									[ STRINGS_ZTE, 'Blade S' ],
		'X500':										[ STRINGS_ZTE, 'Score' ],
		'ZTE-X500':									[ STRINGS_ZTE, 'Score' ],
		'Skate':									[ STRINGS_ZTE, 'Skate' ],
		'ZTE Skate':								[ STRINGS_ZTE, 'Skate' ],
		'ZTE-Skate':								[ STRINGS_ZTE, 'Skate' ],
		'ZTE-SKATE':								[ STRINGS_ZTE, 'Skate' ],
		'ZTE-V960':									[ STRINGS_ZTE, 'Skate' ],
		'ZTE-U V960':								[ STRINGS_ZTE, 'Skate' ],
		'ZTE Racer':								[ STRINGS_ZTE, 'Racer' ],
		'ZTE-RACER':								[ STRINGS_ZTE, 'Racer' ],
		'MTC 916':									[ STRINGS_ZTE, 'Racer' ],
		'Racer':									[ STRINGS_ZTE, 'Racer' ],
		'RacerII':									[ STRINGS_ZTE, 'Racer 2' ],
		'RACERII':									[ STRINGS_ZTE, 'Racer 2' ],
		'ZTE Roamer':								[ STRINGS_ZTE, 'Roamer' ],
		'N860':										[ STRINGS_ZTE, 'Warp' ],
		'N880':										[ STRINGS_ZTE, 'Blade' ],
		'ZTE-T U802':								[ STRINGS_ZTE, 'T-U802' ],
		'ZTE-T U806':								[ STRINGS_ZTE, 'T-U806' ],
		'ZTE-T U812':								[ STRINGS_ZTE, 'T-U812' ],
		'ZTE-T U830':								[ STRINGS_ZTE, 'T-U830' ],
		'ZTE-T U880':								[ STRINGS_ZTE, 'T-U880' ],
		'ZTE T U880':								[ STRINGS_ZTE, 'T-U880' ],
		'ZTE-TU880':								[ STRINGS_ZTE, 'T-U880' ],	
		'ZTE-TU900':								[ STRINGS_ZTE, 'T-U900' ],	
		'ZTE-T U960':								[ STRINGS_ZTE, 'T-U960' ],
		'ZTE-TU960s':								[ STRINGS_ZTE, 'T-U960' ],
		'ZTE-T U960s':								[ STRINGS_ZTE, 'T-U960' ],
		'ZTE U N720':								[ STRINGS_ZTE, 'U-N720' ],
		'ZTE-U V856':								[ STRINGS_ZTE, 'U-V856' ],
		'ZTE-U V857':								[ STRINGS_ZTE, 'U-V857' ],
		'ZTE-U V881':								[ STRINGS_ZTE, 'U-V881' ],
		'ZTE-U X850':								[ STRINGS_ZTE, 'U-X850' ],
		'ZTE-U X876':								[ STRINGS_ZTE, 'U-X876' ],
		'ZTE-X876':									[ STRINGS_ZTE, 'U-X876' ],
		'ZTE-C R750':								[ STRINGS_ZTE, 'C-R750' ],
		'ZTE-C N600':								[ STRINGS_ZTE, 'C-N600' ],
		'ZTE-C N600+':								[ STRINGS_ZTE, 'C-N600' ],
		'ZTE-C N606':								[ STRINGS_ZTE, 'C-N606' ],
		'ZTE-C N700':								[ STRINGS_ZTE, 'C-N700' ],
		'ZTE-C N760':								[ STRINGS_ZTE, 'C-N760' ],
		'ZTE-C N880':								[ STRINGS_ZTE, 'C-N880' ],
		'ZTE-C N880S':								[ STRINGS_ZTE, 'C-N880' ],
		'ZTE-C N880s':								[ STRINGS_ZTE, 'C-N880' ],
		'ZTE-C X500':								[ STRINGS_ZTE, 'C-X500' ],
		'ZTE-C X920':								[ STRINGS_ZTE, 'C-X920' ],
		'ZXY-ZTE-C X920':							[ STRINGS_ZTE, 'C-X920' ],
		'ZTE GV821':								[ STRINGS_ZTE, 'G-V821' ],
		'ZTE N880E':								[ STRINGS_ZTE, 'N880E' ],
		'ZTE-N880E':								[ STRINGS_ZTE, 'N880E' ],
		'MIUI N880S':								[ STRINGS_ZTE, 'N880S' ],
		'ZTE N882E':								[ STRINGS_ZTE, 'N882E' ],
		'ZTE-N910':									[ STRINGS_ZTE, 'N910' ],
		'E810':										[ STRINGS_ZTE, 'E810' ],
		'u880':										[ STRINGS_ZTE, 'U880' ],
		'ZTE U880E':								[ STRINGS_ZTE, 'U880E' ],
		'U880':										[ STRINGS_ZTE, 'U880' ],
		'ZTE U885':									[ STRINGS_ZTE, 'U885' ],
		'ZTE U930':									[ STRINGS_ZTE, 'U930' ],
		'ZTE U970':									[ STRINGS_ZTE, 'U970' ],
		'ZTE V768':									[ STRINGS_ZTE, 'V768' ],
		'ZTE V788D':								[ STRINGS_ZTE, 'V788' ],
		'ZTE-V856':									[ STRINGS_ZTE, 'V856' ],
		'ZTE V877b':								[ STRINGS_ZTE, 'V877' ],
		'ZTE V889D':								[ STRINGS_ZTE, 'V889' ],
		'ZTE V970':									[ STRINGS_ZTE, 'Z970' ],
		'ZTE-Z990':									[ STRINGS_ZTE, 'Z990' ],
		'003Z':										[ STRINGS_ZTE, 'Softbank 003Z' ],
		'008Z':										[ STRINGS_ZTE, 'Softbank 008Z' ],
		'009Z':										[ STRINGS_ZTE, 'Softbank Star7' ],

		/* Telecom provider branded devices */
		'i-mobile i691':							[ 'i-Mobile', 'i691' ],
		'i-mobile i695':							[ 'i-Mobile', 'i695' ],
		'i-mobile i858':							[ 'i-Mobile', 'i858' ],
		'i-mobile 3G 8500':							[ 'i-Mobile', '3G 8500' ],
		'i-mobile I-Note':							[ 'i-Mobile', 'i-Note', 'tablet' ],

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
		'myTouch4G':								[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
		'My Touch 4G':								[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
		'HTC Mytouch 4G':							[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
		'HTC My Touch 4G':							[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
		'HTC mytouch4g':							[ 'T-Mobile', 'myTouch 4G' ],						/* HTC Glacier */
		'HTC myTouch 4G Slide':						[ 'T-Mobile', 'myTouch 4G Slide' ],					/* HTC Doubleshot */
		'myTouch 4G Slide':							[ 'T-Mobile', 'myTouch 4G Slide' ],					/* HTC Doubleshot */
		'T-Mobile myTouch Q':						[ 'T-Mobile', 'myTouch Q' ],						/* Huawei U8730 */
		'LG-C800':									[ 'T-Mobile', 'myTouch Q' ],
		'Pulse Mini':								[ 'T-Mobile', 'Pulse Mini' ],						/* Huawei U8110 */
		
		'Vodafone 845':								[ 'Vodafone', '845 Nova' ],							/* Huawei U8100 */
		'Vodafone 858':								[ 'Vodafone', '858 Smart' ],						/* Huawei U8160 */
		'Vodafone 945':								[ 'Vodafone', '945' ],								/* ZTE Joe */
		'Vodafone Smart II':						[ 'Vodafone', 'Smart II' ],
		'SmartTab10':								[ 'Vodafone', 'SmartTab 10', 'tablet' ]				/* ZTE Web Tab 10 */
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


			this.Android = this.engine.name != 'Presto' && this.engine.name != 'Gecko' && this.os.name == 'Android' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.iOS = this.engine.name != 'Presto' && this.os.name == 'iOS' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.WindowsPhone = this.os.name == 'Windows Phone' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.BlackBerry = this.os.name == 'BlackBerry' || this.os.name == 'BlackBerry OS' || this.os.name == 'BlackBerry Tablet OS' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.Meego = this.os.name == 'Meego' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;

			this.Presto = this.engine.name == 'Presto' ? (typeof this.engine.version != 'undefined' ? 0 + this.engine.version : true): false;
			this.Opera = this.engine.name == 'Presto' ? (typeof this.browser.version != 'undefined' ? 0 + this.browser.version : true): false;
			this.Firefox = this.engine.name == 'Gecko' ? (typeof this.browser.version != 'undefined' ? 0 + this.browser.version : true): false;
			this.Chrome = this.browser.name == 'Chrome' || this.browser.name == 'Chrome Frame' || this.browser.name == 'Chromium' ? (typeof this.browser.version != 'undefined' ? 0 + this.browser.version : true): false;

			this.desktop = this.device.type == 'desktop';
			this.tablet = this.device.type == 'tablet';
			this.mobile = this.device.type == 'mobile';
			this.proxy = this.device.type == 'proxy';
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
					this.device.type = 'mobile';
					this.device.manufacturer = 'Apple';
					this.device.model = 'iPhone';
				} 
				else {
					this.device.type = 'tablet';
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
						case '6.2':		this.os.version = new Version({ value: match[1], alias: '8' }); break;
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

				if (ua.match('WP7')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version({ value: '7.0', details: 2 });
					this.device.type = 'mobile';
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
										
					this.device.type = 'mobile';
				}

				if (ua.match('Windows Mobile')) {
					this.os.name = 'Windows Mobile';
					this.device.type = 'mobile';
				}
				
				if (match = /WindowsMobile\/([0-9.]*)/.exec(ua)) {
					this.os.name = 'Windows Mobile';
					this.os.version = new Version({ value: match[1], details: 2 });
					this.device.type = 'mobile';
				}
				
				if (ua.match('Windows Phone [0-9]')) {
					this.os.name = 'Windows Mobile';
					this.os.version = new Version({ value: ua.match(/Windows Phone ([0-9.]*)/)[1], details: 2 });
					this.device.type = 'mobile';
				}
				
				if (ua.match('Windows Phone OS')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version({ value: ua.match(/Windows Phone OS ([0-9.]*)/)[1], details: 2 });

					if (this.os.version < 7) {
						this.os.name = 'Windows Mobile';
					}

					if (match = /IEMobile\/[^;]+; ([^;]+); ([^;]+)[;|\)]/.exec(ua)) {
						this.device.manufacturer = match[1];
						this.device.model = match[2];
					}						

					this.device.type = 'mobile';
										
					var manufacturer = this.device.manufacturer;
					var model = cleanupModel(this.device.model);

					if (typeof WINDOWS_PHONE_MODELS[manufacturer] != 'undefined' && 
						typeof WINDOWS_PHONE_MODELS[manufacturer][model] != 'undefined') 
					{
						this.device.manufacturer = WINDOWS_PHONE_MODELS[manufacturer][model][0];
						this.device.model = WINDOWS_PHONE_MODELS[manufacturer][model][1];
						this.device.identified = true;
					}
					
					if (manufacturer == 'Microsoft' && model == 'XDeviceEmulator') {
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
					

				this.device.type = 'mobile';
				if (this.os.version >= 3) this.device.type = 'tablet';
				if (this.os.version >= 4 && ua.match('Mobile')) this.device.type = 'mobile';

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
					var model = cleanupModel(this.device.model);

					if (typeof ANDROID_MODELS[model] != 'undefined') {
						this.device.manufacturer = ANDROID_MODELS[model][0];
						this.device.model = ANDROID_MODELS[model][1];
						if (typeof ANDROID_MODELS[model][2] != 'undefined') this.device.type = ANDROID_MODELS[model][2];
						this.device.identified = true;
					}

					if (model == 'Emulator' || model == 'x86 Emulator' || model == 'x86 VirtualBox' || model == 'vm') {
						this.device.manufacturer = null;
						this.device.model = null;
						this.device.type = 'emulator';
						this.device.identified = true;
					}
				}
				
				if (ua.match('HP eStation'))	{ this.device.manufacturer = 'HP'; this.device.model = 'eStation'; this.device.type = 'tablet'; this.device.identified = true; }
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
		
			if (ua.match('AliyunOS')) {
				this.os.name = 'Aliyun OS';
				this.os.version = null;

				if (match = /AliyunOS ([0-9.]+)/.exec(ua)) {
					this.os.version = new Version({ value: match[1], details: 3 })
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

				this.device.type = 'television';
			}

			/****************************************************
			 *		WoPhone
			 */
		
			if (ua.match('WoPhone')) {
				this.os.name = 'WoPhone';
																			
				if (match = /WoPhone\/([0-9\.]*)/.exec(ua)) {
				    this.os.version = new Version({ value: match[1] });
				}					

				this.device.type = 'mobile';
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
						if (typeof BLACKBERRY_MODELS[this.device.model] != 'undefined') {
							this.device.model = 'BlackBerry ' + BLACKBERRY_MODELS[this.device.model] + ' ' + this.device.model;
						} else {
							this.device.model = 'BlackBerry ' + this.device.model;
						}
					} else {
						this.device.model = 'BlackBerry';
					}
				} else {
					this.device.model = 'BlackBerry';
				}

				this.device.manufacturer = 'RIM';
				this.device.type = 'mobile';
				this.device.identified = true;
			}
			
			if (match = /\(BB(1[^;]+); ([^\)]+)\)/.exec(ua)) {
				this.os.name = 'BlackBerry';
				this.os.version = new Version({ value: match[1], details: 2 });

				this.device.manufacturer = 'RIM';
				this.device.model = 'BlackBerry ' + match[2];
				this.device.type = ua.match('Mobile') ? 'mobile' : 'tablet';
				this.device.identified = true;
			}
				
			/****************************************************
			 *		BlackBerry PlayBook
			 */
		
			if (ua.match('RIM Tablet OS')) {
				this.os.name = 'BlackBerry Tablet OS';
				this.os.version = new Version({ value: ua.match(/RIM Tablet OS ([0-9.]*)/)[1], details: 2 });

				this.device.manufacturer = 'RIM';
				this.device.model = 'BlackBerry PlayBook';
				this.device.type = 'tablet';
				this.device.identified = true;
			}

			else if (ua.match('PlayBook')) {
				if (match = /Version\/(10[0-9.]*)/.exec(ua)) {
					this.os.name = 'BlackBerry';
					this.os.version = new Version({ value: match[1], details: 2 });

					this.device.manufacturer = 'RIM';
					this.device.model = 'BlackBerry PlayBook';
					this.device.type = 'tablet';
					this.device.identified = true;
				}
			}

			/****************************************************
			 *		WebOS
			 */
		
			if (ua.match('(?:web|hpw)OS')) {
				this.os.name = 'webOS';
				this.os.version = new Version({ value: ua.match(/(?:web|hpw)OS\/([0-9.]*)/)[1] });

				if (ua.match('tablet')) 
					this.device.type = 'tablet';
				else
					this.device.type = 'mobile';

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
		
			if (ua.match('Symbian') || ua.match('Series[ ]?60') || ua.match('S60')) {
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

				this.device.type = 'mobile';
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

				this.device.type = 'mobile';
			}
			
			/****************************************************
			 *		MeeGo
			 */
		
			if (ua.match('MeeGo')) {
				this.os.name = 'MeeGo';
				this.device.type = 'mobile';

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
				this.device.type = 'mobile';

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

				this.device.type = 'mobile';

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					if (match[1] != 'Linux') {
						this.device.manufacturer = match[1];
						this.device.model = match[2];
	
						if (typeof TIZEN_MODELS[this.device.manufacturer] != 'undefined' && 
							typeof TIZEN_MODELS[this.device.manufacturer][this.device.model] != 'undefined') 
						{
							var manufacturer = this.device.manufacturer;
							var model = cleanupModel(this.device.model);
							
							this.device.manufacturer = TIZEN_MODELS[manufacturer][model][0];
							this.device.model = TIZEN_MODELS[manufacturer][model][1];
							this.device.identified = true;
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

				this.device.type = 'mobile';

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					this.device.manufacturer = match[1];
					this.device.model = cleanupModel(match[2]);
				}						

				if (typeof BADA_MODELS[this.device.manufacturer] != 'undefined' && 
					typeof BADA_MODELS[this.device.manufacturer][this.device.model] != 'undefined') 
				{
					var manufacturer = this.device.manufacturer;
					var model = cleanupModel(this.device.model);
					
					this.device.manufacturer = BADA_MODELS[manufacturer][model][0];
					this.device.model = BADA_MODELS[manufacturer][model][1];
					this.device.identified = true;
				}
			}
			
			/****************************************************
			 *		Brew
			 */
		
			if (ua.match(/BREW/i) || ua.match('BMP; U')) {
				this.os.name = 'Brew';
				this.device.type = 'mobile';

				if (match = /BREW; U; ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				else if (match = /;BREW\/([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version({ value: match[1] });
				}

				
				if (match = /\(([^;]+);U;REX\/[^;]+;BREW\/[^;]+;(?:.*;)?[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(ua)) {
				    this.device.model = match[1];
				}

				if (this.device.model) {
					var model = cleanupModel(this.device.model);

					if (typeof BREW_MODELS[model] != 'undefined') {
						this.device.manufacturer = BREW_MODELS[model][0];
						this.device.model = BREW_MODELS[model][1];
						this.device.identified = true;
					}
				}
			}			
			
			/****************************************************
			 *		MTK
			 */
		
			if (ua.match(/\(MTK;/)) {
				this.os.name = 'MTK';
				this.device.type = 'mobile';
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
				this.device.type = 'mobile';
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
				this.device.type = 'tablet';

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
				this.device.type = 'ereader';

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
				this.device.type = 'ereader';
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Bookeen
			 */
		
			if (ua.match('bookeen\/cybook')) {
				this.os.name = '';
				
				this.device.manufacturer = 'Bookeen';
				this.device.model = 'Cybook';
				this.device.type = 'ereader';
				
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
				this.device.type = 'ereader';
				this.device.identified = true;
			}
			
			/****************************************************
			 *		iRiver
			 */
		
			if (ua.match('Iriver ;')) {
				this.os.name = '';
				
				this.device.manufacturer = 'iRiver';
				this.device.model = 'Story';
				this.device.type = 'ereader';
				
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
			 */
		
			if (ua.match('Nintendo Wii')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'Wii';
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
			 *		Panasonic Smart Viera
			 *
			 *		Mozilla/5.0 (FreeBSD; U; Viera; ja-JP) AppleWebKit/535.1 (KHTML, like Gecko) Viera/1.2.4 Chrome/14.0.835.202 Safari/535.1
			 */
		
			if (ua.match('Viera')) {
				this.os.name = '';
				this.device.manufacturer = 'Panasonic';
				this.device.model = 'Smart Viera';
				this.device.type = 'television';
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
				this.device.type = 'television';
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
				this.device.type = 'television';
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
				this.device.type = 'television';
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
				this.device.type = 'television';
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
				this.device.type = 'television';
				this.device.identified = true;
			}

			if (match = /LGSmartTV/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = STRINGS_LG;
				this.device.model = 'Smart TV';
				this.device.type = 'television';
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
				this.device.type = 'television';
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
				this.device.type = 'television';
				this.device.identified = true;
			}

			/****************************************************
			 *		MachBlue XT
			 */

			if (match = /mbxtWebKit\/([0-9.]*)/.exec(ua)) {
				this.os.name = '';
				this.browser.name = 'MachBlue XT'
				this.browser.version = new Version({ value: match[1], details: 2 });
				this.device.type = 'television';
			}

			/****************************************************
			 *		ADB
			 */

			if (match = /\(ADB; ([^\)]+)\)/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'ADB';
				this.device.model = (match[1] != 'Unknown' ? match[1].replace('ADB','') + ' ' : '') + 'IPTV receiver';
				this.device.type = 'television';
				this.device.identified = true;
			}

			/****************************************************
			 *		MStar
			 */

			if (ua.match(/Mstar;OWB/)) {
				this.os.name = '';
				this.device.manufacturer = 'MStar';
				this.device.model = 'PVR';
				this.device.type = 'television';
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
				this.device.type = 'television';
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Technicolor
			 */

			if (match = /\Technicolor_([^;]+);/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'Technicolor';
				this.device.model = match[1];
				this.device.type = 'television';
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Winbox Evo2
			 */

			if (match = /Winbox Evo2/.exec(ua)) {
				this.os.name = '';
				this.device.manufacturer = 'Winbox';
				this.device.model = 'Evo2';
				this.device.type = 'television';
				this.device.identified = true;
			}
			
			/****************************************************
			 *		Roku
			 */

			if (match = /^Roku\/DVP-([0-9]+)/.exec(ua)) {
				this.device.manufacturer = 'Roku';
				this.device.type = 'television';
				
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

				this.device.type = 'television';
			}
			
			/****************************************************
			 *		Detect type based on common identifiers
			 */

			if (ua.match('InettvBrowser')) {
				this.device.type = 'television';
			}

			if (ua.match('MIDP')) {
				this.device.type = 'mobile';
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

				for (var i = 0; i < candidates.length; i++) {
				
					if (!this.device.model && !this.device.manufacturer) {
						var model = cleanupModel(candidates[i]);
						var result = false;
						
						if (this.os.name == 'Android') {
							if (typeof ANDROID_MODELS[model] != 'undefined') {
								this.device.manufacturer = ANDROID_MODELS[model][0];
								this.device.model = ANDROID_MODELS[model][1];
								if (typeof ANDROID_MODELS[model][2] != 'undefined') this.device.type = ANDROID_MODELS[model][2];
								this.device.identified = true;
								
								result = true;
							}
						}
	
						if (!this.os.name || this.os.name == 'Windows' || this.os.name == 'Windows Mobile' || this.os.name == 'Windows CE') {
							if (typeof WINDOWS_MOBILE_MODELS[model] != 'undefined') {
								this.device.manufacturer = WINDOWS_MOBILE_MODELS[model][0];
								this.device.model = WINDOWS_MOBILE_MODELS[model][1];
								this.device.type = 'mobile';
								this.device.identified = true;
								
								if (this.os.name != 'Windows Mobile') {
									this.os.name = 'Windows Mobile';
									this.os.version = null;
								}
	
								result = true;
							}
						}
					}
	
					if (!result) {
						if (match = /^GIONEE-([^\s]+)/.exec(candidates[i])) {
							this.device.manufacturer = 'Gionee';
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
						
						if (match = /^HTC_?([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_HTC;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
						
						if (match = /^HUAWEI-([^\/]*)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_HUAWEI;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
		
						if (match = /(?:^|\()LGE?(?:\/|-|_|\s)([^\s]*)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_LG;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
		
						if (match = /^MOT-([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_MOTOROLA;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
		
						if (match = /^Motorola_([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_MOTOROLA;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
		
						if (match = /^Nokia([^\/]+)(?:\/|$)/.exec(candidates[i])) {
							this.device.manufacturer = 'Nokia';
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
							
							if (!this.os.name) {
								this.os.name = 'Series40';
							}
						}
		
						if (match = /^SonyEricsson([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_SONY_ERICSSON;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							this.device.identified = true;
						}
		
						if (match = /^SAMSUNG-([^\/_]+)(?:\/|_|$)/.exec(candidates[i])) {
							this.device.manufacturer = STRINGS_SAMSUNG;
							this.device.model = cleanupModel(match[1]);
							this.device.type = 'mobile';
							
							if (this.os.name == 'Bada') {
								var manufacturer = 'SAMSUNG';
								var model = cleanupModel(this.device.model);
								
								if (typeof BADA_MODELS[manufacturer] != 'undefined' && 
									typeof BADA_MODELS[manufacturer][model] != 'undefined') 
								{
									this.device.manufacturer = BADA_MODELS[manufacturer][model][0];
									this.device.model = BADA_MODELS[manufacturer][model][1];
									this.device.identified = true;
								}
							}
							
							else if (match = /Jasmine\/([0-9.]*)/.exec(ua)) {
								var version = match[1];
								var manufacturer = 'SAMSUNG';
								var model = cleanupModel(this.device.model);
								
								if (typeof TOUCHWIZ_MODELS[manufacturer] != 'undefined' && 
									typeof TOUCHWIZ_MODELS[manufacturer][model] != 'undefined') 
								{
									this.device.manufacturer = TOUCHWIZ_MODELS[manufacturer][model][0];
									this.device.model = TOUCHWIZ_MODELS[manufacturer][model][1];
									this.device.identified = true;
									
									this.os.name = 'Touchwiz';
									this.os.version = new Version({ value: '2.0' });
								}
							}
				
							else if (match = /Dolfin\/([0-9.]*)/.exec(ua)) {
								var version = match[1];
								var manufacturer = 'SAMSUNG';
								var model = cleanupModel(this.device.model);
								
								if (typeof BADA_MODELS[manufacturer] != 'undefined' && 
									typeof BADA_MODELS[manufacturer][model] != 'undefined') 
								{
									this.device.manufacturer = BADA_MODELS[manufacturer][model][0];
									this.device.model = BADA_MODELS[manufacturer][model][1];
									this.device.identified = true;
									
									this.os.name = 'Bada';
									
									switch(version) {
										case '2.0':		this.os.version = new Version({ value: '1.0' }); break;						
										case '2.2':		this.os.version = new Version({ value: '1.2' }); break;							
										case '3.0':		this.os.version = new Version({ value: '2.0' }); break;					
									}	
								}
		
								if (typeof TOUCHWIZ_MODELS[manufacturer] != 'undefined' && 
									typeof TOUCHWIZ_MODELS[manufacturer][model] != 'undefined') 
								{
									this.device.manufacturer = TOUCHWIZ_MODELS[manufacturer][model][0];
									this.device.model = TOUCHWIZ_MODELS[manufacturer][model][1];
									this.device.identified = true;
									
									this.os.name = 'Touchwiz';
		
									switch(version) {
										case '1.0':		this.os.version = new Version({ value: '1.0' }); break;						
										case '1.5':		this.os.version = new Version({ value: '2.0' }); break;							
										case '2.0':		this.os.version = new Version({ value: '3.0' }); break;					
									}	
								}
							}
						}
					}
				}
			}
			

			if (match = /\((?:LG[-|\/])(.*) (?:Browser\/)?AppleWebkit/.exec(ua)) {
				this.device.manufacturer = STRINGS_LG;
				this.device.model = match[1];
				this.device.type = 'mobile';
				this.device.identified = true;
			}

			if (match = /^Mozilla\/5.0 \((?:Nokia|NOKIA)(?:\s?)([^\)]+)\)UC AppleWebkit\(like Gecko\) Safari\/530$/.exec(ua)) {
				this.device.manufacturer = 'Nokia';
				this.device.model = match[1];
				this.device.type = 'mobile';
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
				
				if (ua.match('IEMobile') || ua.match('Windows CE') || ua.match('Windows Phone') || ua.match('WP7')) {
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
					this.browser.version.type = 'alpha';
					this.browser.channel = 'Labs';
				}
				
				if (this.browser.version && ua.match('Edition Next')) {
					this.browser.version.type = 'alpha';
					this.browser.channel = 'Next';
				}
				
				if (ua.match('Opera Tablet')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = 'tablet';
				}
				
				if (ua.match('Opera Mobi')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = 'mobile';
				}

				if (match = /Opera Mini;/.exec(ua)) {
					this.browser.name = 'Opera Mini';
					this.browser.version = null;
					this.browser.mode = 'proxy';
					this.device.type = 'mobile';
				}
				
				if (match = /Opera Mini\/(?:att\/)?([0-9.]*)/.exec(ua)) {
					this.browser.name = 'Opera Mini';
					this.browser.version = new Version({ value: match[1], details: -1 });
					this.browser.mode = 'proxy';
					this.device.type = 'mobile';
				}
				
				if (this.browser.name == 'Opera' && this.device.type == 'mobile') {
					this.browser.name = 'Opera Mobile';
					
					if (ua.match(/BER/)) {
						this.browser.name = 'Opera Mini';
						this.browser.version = null;
					}
				}

				if (ua.match('InettvBrowser')) {
					this.device.type = 'television';
				}

				if (ua.match('Opera TV') || ua.match('Opera-TV')) {
					this.browser.name = 'Opera';
					this.device.type = 'television';
				}
				
				if (ua.match('Linux zbov')) {
					this.browser.name = 'Opera Mobile';
					this.browser.mode = 'desktop';
				
					this.device.type = 'mobile';

					this.os.name = null;
					this.os.version = null;
				}
				
				if (ua.match('Linux zvav')) {
					this.browser.name = 'Opera Mini';
					this.browser.version = null;
					this.browser.mode = 'desktop';

					this.device.type = 'mobile';
				
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
					this.device.type = 'mobile';
				}
				
				if (ua.match('Mobile; rv')) {
					this.device.type = 'mobile';
				}

				if (ua.match('Tablet; rv')) {
					this.device.type = 'tablet';
				}
				
				if (this.device.type == 'mobile' || this.device.type == 'tablet') {
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
				this.device.type = 'mobile';

				if (match = /NetFront\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version({ value: match[1] });
				}

				if (ua.match('InettvBrowser')) {
					this.device.type = 'television';
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
					
					this.device.manufacturer = 'Amazon';
					this.device.model = 'Kindle Fire';
					this.device.type = 'tablet';
					this.device.identified = true;
					
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

				this.device.type = 'mobile';
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
				this.device.type = 'television';

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
				this.device.type = 'television';
			}
			
			/****************************************************
			 *		Espial
			 */
		
			if (ua.match('Espial')) {
				this.browser.name = 'Espial';
				
				this.os.name = '';
				this.os.version = null;

				if (this.device.type != 'television') {
					this.device.type = 'television';
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
				this.device.type = 'television';
			}
			
			/****************************************************
			 *		NetFront NX
			 */
			if (match = /NX\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'NetFront NX';
				this.browser.version = new Version({ value: match[1], details: 2 });
				if (match = /DTV/i.exec(ua)) {
					this.device.type = 'television';
				} else if (match = /mobile/i.exec(ua)) {
					this.device.type = 'mobile';
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
				
				this.device.type = 'mobile';

				if (match = /^IUC \(U;\s?iOS ([0-9\.]+);/.exec(ua)) {
					this.os.name = 'iOS';
					this.os.version = new Version({ value: match[1] });
				}
				
				if (match = /^JUC \(Linux; U; ([0-9\.]+)[^;]*; [^;]+; ([^;]*[^\s])\s*; [0-9]+\*[0-9]+\)/.exec(ua)) {
					var model = cleanupModel(match[2]);
	
					this.os.name = 'Android';
					this.os.version = new Version({ value: match[1] });

					if (typeof ANDROID_MODELS[model] != 'undefined') {
						this.device.manufacturer = ANDROID_MODELS[model][0];
						this.device.model = ANDROID_MODELS[model][1];
						if (typeof ANDROID_MODELS[model][2] != 'undefined') this.device.type = ANDROID_MODELS[model][2];
						this.device.identified = true;
					}					
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

				this.device.type = 'mobile';

				this.os.name = 'Android';
				this.os.version = null;
			}
			
			/****************************************************
			 *		Dolphin HD
			 */
		
			if (match = /DolphinHDCN\/([0-9.]*)/.exec(ua)) {
				this.browser.name = 'Dolphin';
				this.browser.version = new Version({ value: match[1] });

				this.device.type = 'mobile';

				if (this.os.name != 'Android') {
					this.os.name = 'Android';
					this.os.version = null;
				}
			}	

			if (match = /Dolphin\/INT/.exec(ua)) {
				this.browser.name = 'Dolphin';
				this.device.type = 'mobile';
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

				this.device.type = 'mobile';

				if (this.os.name == 'Linux') {
					this.os.name = null;
					this.os.version = null;
				}
			}	

			/****************************************************
			 *		360 Extreme Explorer
			 */
		
			if (ua.match('360EE')) {
				this.browser.stock = false;
				this.browser.name = '360 Extreme Explorer';
				this.browser.version = null;
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
			
			/****************************************************
			 *		Others
			 */

			var browsers = [
				{ name: 'AdobeAIR', 			regexp: /AdobeAIR\/([0-9.]*)/ },
				{ name: 'Awesomium', 			regexp: /Awesomium\/([0-9.]*)/ },
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

				{ name: 'Abrowser', 			regexp: /Abrowser\/([0-9.]*)/ },
				{ name: 'arora', 				regexp: /[Aa]rora\/([0-9.]*)/ },
				{ name: 'Baidu Browser', 		regexp: /M?BaiduBrowser\/([0-9.]*)/i },
				{ name: 'Baidu Browser', 		regexp: /BdMobile\/([0-9.]*)/i },
				{ name: 'Baidu Browser', 		regexp: /FlyFlow\/([0-9.]*)/, details: 2 },
				{ name: 'Camino', 				regexp: /Camino\/([0-9.]*)/ },
				{ name: 'Canure',				regexp: /Canure\/([0-9.]*)/, details: 3 },
				{ name: 'CometBird', 			regexp: /CometBird\/([0-9.]*)/ },
				{ name: 'Comodo Dragon', 		regexp: /Comodo_Dragon\/([0-9.]*)/, details: 2 },
				{ name: 'Conkeror', 			regexp: /[Cc]onkeror\/([0-9.]*)/ },
				{ name: 'CoolNovo', 			regexp: /(?:CoolNovo|CoolNovoChromePlus)\/([0-9.]*)/, details: 3 },
				{ name: 'ChromePlus', 			regexp: /ChromePlus(?:\/([0-9.]*))?$/, details: 3 },
				{ name: 'Daedalus',				regexp: /Daedalus ([0-9.]*)/, details: 2 },
				{ name: 'Demobrowser', 			regexp: /demobrowser\/([0-9.]*)/ },
				{ name: 'Dooble', 				regexp: /Dooble(?:\/([0-9.]*))?/ },
				{ name: 'Dorothy', 				regexp: /Dorothy$/ },
				{ name: 'DWB', 					regexp: /dwb(?:-hg)?(?:\/([0-9.]*))?/ },
				{ name: 'Epiphany', 			regexp: /Epiphany\/([0-9.]*)/ },
				{ name: 'FireWeb', 				regexp: /FireWeb\/([0-9.]*)/ },
				{ name: 'Flock', 				regexp: /Flock\/([0-9.]*)/, details: 3 },
				{ name:	'Galeon',				regexp: /Galeon\/([0-9.]*)/, details: 3 },
				{ name: 'Helium', 				regexp: /HeliumMobileBrowser\/([0-9.]*)/ },
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
				{ name: 'Maxthon', 				regexp: /Maxthon[\/ ]([0-9.]*)/, details: 3 },
				{ name: 'MiniBrowser',			regexp: /MiniBr?owserM\/([0-9.]*)/ },
				{ name: 'MiniBrowser',			regexp: /MiniBrowserMobile\/([0-9.]*)/ },
				{ name: 'MixShark', 			regexp: /MixShark\/([0-9.]*)/ },
				{ name: 'Motorola WebKit',		regexp: /MotorolaWebKit\/([0-9.]*)/, details: 3 },
				{ name: 'NetFront LifeBrowser',	regexp: /NetFrontLifeBrowser\/([0-9.]*)/ },
				{ name: 'Netscape Navigator', 	regexp: /Navigator\/([0-9.]*)/, details: 3 },
				{ name:	'Odyssey',				regexp: /OWB\/([0-9.]*)/ },
				{ name: 'OmniWeb', 				regexp: /OmniWeb/ },
				{ name:	'Orca',					regexp: /Orca\/([0-9.]*)/ },
				{ name: 'Origyn',				regexp: /Origyn Web Browser/ },
				{ name: 'Palemoon', 			regexp: /Pale[mM]oon\/([0-9.]*)/ },
				{ name: 'Phantom', 				regexp: /Phantom\/V([0-9.]*)/ },
				{ name: 'Polaris',	 			regexp: /Polaris\/v?([0-9.]*)/i, details: 2 },
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
				{ name: 'Viera', 				regexp: /Viera\/([0-9.]*)/ },
				{ name: 'Villanova', 			regexp: /Villanova\/([0-9.]*)/, details: 3 },
				{ name: 'Wavelink Velocity', 	regexp: /Wavelink Velocity Browser\/([0-9.]*)/, details: 2 },
				{ name: 'WebPositive', 			regexp: /WebPositive/ },
				{ name: 'WebRender', 			regexp: /WebRender/ },
				{ name: 'Wyzo', 				regexp: /Wyzo\/([0-9.]*)/, details: 3 },
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

			if (this.os.name == 'iOS' && this.browser.name == 'Opera Mini') {
				this.os.version = null;
			}	
			
			if (this.browser.name == 'Midori' && this.engine.name != 'Webkit') {
				this.engine.name = 'Webkit';
				this.engine.version = null;
			}
			
			if (this.device.type == 'television' && this.browser.name == 'Opera') {
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
	
					this.device.model = match[1];
					this.device.type = 'mobile';
	
					var model = cleanupModel(this.device.model);
					if (typeof ANDROID_MODELS[model] != 'undefined') {
						this.device.manufacturer = ANDROID_MODELS[model][0];
						this.device.model = ANDROID_MODELS[model][1];
						if (typeof ANDROID_MODELS[model][2] != 'undefined') this.device.type = ANDROID_MODELS[model][2];
						this.device.identified = true;
					}

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
	
					this.device.model = match[1];
					this.device.type = 'mobile';
	
					var model = cleanupModel(this.device.model);
					if (typeof ANDROID_MODELS[model] != 'undefined') {
						this.device.manufacturer = ANDROID_MODELS[model][0];
						this.device.model = ANDROID_MODELS[model][1];
						if (typeof ANDROID_MODELS[model][2] != 'undefined') this.device.type = ANDROID_MODELS[model][2];
						this.device.identified = true;
					}

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
			
			if (!device && !os && this.device.type == 'television') {
				device = 'television';
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

	function cleanupModel(s) {
		s = typeof s == 'undefined' ? '' : s;
	
		s = s.replace(/_TD$/, '');
		s = s.replace(/_CMCC$/, '');

		s = s.replace(/_/g, " ");
		s = s.replace(/^\s+|\s+$/g, "");
		s = s.replace(/\/[^/]+$/, "");
		s = s.replace(/\/[^/]+ Android\/.*/, "");

		s = s.replace(/^tita on /, '');
		s = s.replace(/^Android on /, '');
		s = s.replace(/^Android for /, '');
		s = s.replace(/^ICS AOSP on /, '');
		s = s.replace(/^Full AOSP on /, '');
		s = s.replace(/^Full Android on /, '');
		s = s.replace(/^Full Cappuccino on /, '');
		s = s.replace(/^Full MIPS Android on /, '');
		s = s.replace(/^Full Android/, '');

		s = s.replace(/^Acer ?/i, '');
		s = s.replace(/^Iconia Tab /, '');
		s = s.replace(/^Iconia /, '');
		s = s.replace(/^Ainol /, '');
		s = s.replace(/^Coolpad ?/i, 'Coolpad ');
		s = s.replace(/^ALCATEL /, '');
		s = s.replace(/^Alcatel OT-(.*)/, 'one touch $1');
		s = s.replace(/^YL-/, '');
		s = s.replace(/^Novo7 ?/i, 'Novo7 ');
		s = s.replace(/^GIONEE /, '');
		s = s.replace(/^HW-/, '');
		s = s.replace(/^Huawei[ -]/i, 'Huawei ');
		s = s.replace(/^SAMSUNG[ -]/i, '');
		s = s.replace(/^SonyEricsson/, '');
		s = s.replace(/^Lenovo Lenovo/, 'Lenovo');
		s = s.replace(/^LNV-Lenovo/, 'Lenovo');
		s = s.replace(/^Lenovo-/, 'Lenovo ');
		s = s.replace(/^(LG)[ _\/]/, '$1-');
		s = s.replace(/^(HTC.*)\s(?:v|V)?[0-9.]+$/, '$1');
		s = s.replace(/^(HTC)[-\/]/, '$1 ');
		s = s.replace(/^(HTC)([A-Z][0-9][0-9][0-9])/, '$1 $2');
		s = s.replace(/^(Motorola[\s|-])/, '')
		s = s.replace(/^(Moto|MOT-)/, '')
		
		s = s.replace(/-?(orange(-ls)?|vodafone|bouygues)$/i, '');
		s = s.replace(/http:\/\/.+$/i, '');

		s = s.replace(/^\s+|\s+$/g, "");

		return s;
	}
	
	function parseVersion(version) {
		version = version.toString();
		var components = version.split('.');
		var major = components.shift();
		return parseFloat(major + '.' + components.join(''));
	}


	return Detected;
})();	

