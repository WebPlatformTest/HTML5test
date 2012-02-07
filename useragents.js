var UserAgents = (function(){
	
	var BADA_MODELS = {
		'SAMSUNG': {
			'SAMSUNG-GT-S5380':						[ 'Samsung', 'Wave Y' ],
			'SAMSUNG-GT-S7250':						[ 'Samsung', 'Wave M' ],
			'SAMSUNG-GT-S7233E':					[ 'Samsung', 'Wave 723' ],
			'SAMSUNG-GT-S8500':						[ 'Samsung', 'Wave' ],
			'SAMSUNG-GT-S8530':						[ 'Samsung', 'Wave II' ],
			'SAMSUNG-GT-S8600':						[ 'Samsung', 'Wave 3' ]
		}
	}
	
	var TIZEN_MODELS = {
		'SAMSUNG': {
			'SAMSUNG-GT-I9500':						[ 'Samsung', 'Galaxy S III' ]
		}
	}
	
	var WINDOWS_PHONE_MODELS = {
		'Asus': {
			'Galaxy6':								[ 'Asus', 'Galaxy 6' ]
		},
		
		'DELL': {
			'Venue Pro':							[ 'Dell', 'Venue Pro' ]
		},
		
		'FujitsuToshibaMobileCommun': {
			'IS12T':								[ 'Fujitsu Toshiba', 'IS12T' ]
		},
		
		'HTC': {
			'7 Mozart':								[ 'HTC', '7 Mozart' ],
			'7 Mozart T8698':						[ 'HTC', '7 Mozart' ],
			'T8697':								[ 'HTC', '7 Mozart' ],
			'HD7 T9292':							[ 'HTC', 'HD7' ],
			'T9295':								[ 'HTC', 'HD7' ],
			'7 Pro T7576':							[ 'HTC', '7 Pro' ],
			'mwp6985':								[ 'HTC', 'Trophy' ],
			'7 Trophy T8686':						[ 'HTC', 'Trophy' ],
			'Radar 4G':								[ 'HTC', 'Radar' ],
			'Radar C110e':							[ 'HTC', 'Radar' ],
			'Mondrian':								[ 'HTC', 'Mondrian' ], 
			'Schubert':								[ 'HTC', 'Schubert' ],
			'TITAN X310e':							[ 'HTC', 'Titan' ],
			'PI39100':								[ 'HTC', 'Titan' ],
			'Ultimate':								[ 'HTC', 'Ultimate' ]
		},
		
		'LG': {
			'GW910':								[ 'LG', 'Optimus 7' ],
			'LG-E900':								[ 'LG', 'Optimus 7 E900' ],
			'LG-E900h':								[ 'LG', 'Optimus 7 E900' ],
			'GW910':								[ 'LG', 'GW910' ],
			'LG-C900k':								[ 'LG', 'Quantum' ]
		},
		
		'NOKIA': {
			'Lumia 710':							[ 'Nokia', 'Lumia 710' ],
			'Lumia 719':							[ 'Nokia', 'Lumia 719' ],
			'Lumia 800':							[ 'Nokia', 'Lumia 800' ],
			'SeaRay':								[ 'Nokia', 'Lumia 800' ]
		},
		
		'SAMSUNG': {
			'GT-I8350':								[ 'Samsung', 'Omnia W' ],
			'SGH-i707':								[ 'Samsung', 'Taylor' ],
			'SGH-i917':								[ 'Samsung', 'Omnia 7' ],
			'SGH-I917':								[ 'Samsung', 'Omnia 7' ],
			'SGH-i917.':							[ 'Samsung', 'Focus' ],
			'SGH-i917R':							[ 'Samsung', 'Focus' ],
			'SGH-i937':								[ 'Samsung', 'Focus S' ],
			'OMNIA7':								[ 'Samsung', 'Omnia 7' ],
			'Taylor':								[ 'Samsung', 'Taylor' ]
		},

		'TOSHIBA': {
			'TSUNAGI':								[ 'Toshiba', 'Tsunagi' ]
		}
	};

	var ANDROID_MODELS = {
		'A100':										[ 'Acer', 'Iconia Tab A100' ],
		'A200':										[ 'Acer', 'Iconia Tab A200' ],
		'A500':										[ 'Acer', 'Iconia Tab A500' ],
		'A501':										[ 'Acer', 'Iconia Tab A501' ],
		'E310':										[ 'Acer', 'Liquid Mini' ],
		'Liquid MT':								[ 'Acer', 'Liquid MT' ],
		'Liquid':									[ 'Acer', 'Liquid' ],
		'one touch 906':							[ 'Alcatel', 'One Touch 906' ],
		'Telenor OneTouch':							[ 'Alcatel', 'One Touch 990' ],
		'Kindle Fire':								[ 'Amazon', 'Kindle Fire' ],
		'A80KSC':									[ 'Archos', 'Arnova 8' ],
		'A101B':									[ 'Archos', 'Arnova 10' ],
		'Archos5':									[ 'Archos', '5' ],
		'A70HB':									[ 'Archos', '7' ],
		'A70BHT':									[ 'Archos', '7' ],
		'A70CHT':									[ 'Archos', '7C' ],
		'A70S':										[ 'Archos', '70' ],
		'ARCHOS 101G9':								[ 'Archos', '101 G9' ],
		'A101IT':									[ 'Archos', '101 IT G9' ],
		'eeepc':									[ 'Asus', 'Eee Pc' ],
		'asus laptop':								[ 'Asus', 'Eee Pc' ],
		'Transformer TF101':						[ 'Asus', 'Eee Pad Transformer' ],
		'Transformer Prime TF201':					[ 'Asus', 'Eee Pad Transformer Prime' ],
		'NookColor':								[ 'Barnes & Noble', 'NOOK Color' ],
		'NOOK BNRV200':								[ 'Barnes & Noble', 'NOOK Color' ],
		'NOOK BNTV250':								[ 'Barnes & Noble', 'NOOK Tablet' ],
		'BNTV250':									[ 'Barnes & Noble', 'NOOK Tablet' ],
		'BM999':									[ 'Bmorn', 'BM999' ],
		'bcm7425':									[ 'Broadcom', 'BCM7425 mediaplayer' ],
		'IS11CA':									[ 'Casio', 'GzOne IS11CA' ],
		'CSL-MI410':								[ 'CSL', 'Spice MI410' ],
		'MID7024':									[ 'Coby', 'Kyros MID7024' ],
		'MID8024':									[ 'Coby', 'Kyros MID8024' ],
		'MID8125':									[ 'Coby', 'Kyros MID8125' ],
		'ZiiLABS ZiiO10 ':							[ 'Creative', 'ZiiO 10' ],
		'Dell Streak':								[ 'Dell', 'Streak' ],
		'001DL':									[ 'Dell', 'Streak' ],
		'Dell Streak 7':							[ 'Dell', 'Streak 7' ],
		'Dell Streak 10 Pro':						[ 'Dell', 'Streak 10 Pro' ],
		'DM009SH':									[ 'Disney Mobile', 'DM009SH' ],
		'Tablet-P27':								[ 'DracoTek', 'P27 Tablet' ],
		'ISW11F':									[ 'Fujitsu', 'Arrows Z' ],
		'F-05D':									[ 'Fujitsu', 'Arrows Z LTE' ],
		'F-01D':									[ 'Fujitsu', 'Arrows Tab' ],
		'F-12C':									[ 'Fujitsu', 'Globetrotter' ],
		'Nexus One':								[ 'Google', 'Nexus One' ],
		'Nexus S':									[ 'Google', 'Nexus S' ],
		'Google Nexus S':							[ 'Google', 'Nexus S' ],
		'Nexus S 4G':								[ 'Google', 'Nexus S 4G' ],
		'Dooderbutt-4.0.3-v1':						[ 'Google', 'Nexus S 4G' ],
		'Touchpad':									[ 'HP', 'TouchPad' ],
		'HP Touchpad':								[ 'HP', 'TouchPad' ],
		'HTC Amaze 4G':								[ 'HTC', 'Amaze 4G' ],
		'HTC ChaCha A810e':							[ 'HTC', 'ChaCha' ],
		'HTC Desire':								[ 'HTC', 'Desire' ],
		'Desire_A8181':								[ 'HTC', 'Desire' ],
		'HTC Desire-orange-LS':						[ 'HTC', 'Desire' ],
		'X06HT':									[ 'HTC', 'Desire' ],
		'HTC Desire 2.33.161.2':					[ 'HTC', 'Desire' ],
		'HTC Desire A8183 V2.26.841.2':				[ 'HTC', 'Desire' ],
		'HTC DesireHD':								[ 'HTC', 'Desire HD' ],
		'HTC DesireHD A9191':						[ 'HTC', 'Desire HD' ],
		'HTC Desire HD A9191':						[ 'HTC', 'Desire HD' ],
		'HTC-A9192/1.0':							[ 'HTC', 'Desire HD' ],
		'Desire HD':								[ 'HTC', 'Desire HD' ],
		'HTC Desire HD':							[ 'HTC', 'Desire HD' ],
		'001HT':									[ 'HTC', 'Desire HD' ],
		'HTC DesireHD-orange-LS':					[ 'HTC', 'Desire HD' ],
		'HTC Desire HD with Beats Audio':			[ 'HTC', 'Desire HD' ],
		'HTC Desire HD 3.13.161.3':					[ 'HTC', 'Desire HD' ],
		'HTC Desire S':								[ 'HTC', 'Desire S' ],
		'Desire S':									[ 'HTC', 'Desire S' ],
		'HTC DesireS S510e':						[ 'HTC', 'Desire S' ],
		'HTC DesireS S510b':						[ 'HTC', 'Desire S' ],
		'HTC Desire Z':								[ 'HTC', 'Desire Z' ],
		'HTC DesireZ A7272':						[ 'HTC', 'Desire Z' ],
		'SiRF Dream':								[ 'HTC', 'Dream' ],
		'HTC Dream':								[ 'HTC', 'Dream' ],
		'ADR6300':									[ 'HTC', 'Droid Incredible' ],
		'ADR6350':									[ 'HTC', 'Droid Incredible 2' ],
		'HTC S710d':								[ 'HTC', 'Droid Incredible 2' ],
		'HTC EVO 3D GSM':							[ 'HTC', 'EVO 3D' ],
		'HTC EVO 3D X515m':							[ 'HTC', 'EVO 3D' ],
		'Sprint APX515CKT':							[ 'HTC', 'EVO 3D' ],
		'PG86100':									[ 'HTC', 'EVO 3D' ],
		'PG8610000':								[ 'HTC', 'EVO 3D' ],
		'ISW12HT':									[ 'HTC', 'EVO 3D' ],
		'Sprint APA9292KT':							[ 'HTC', 'EVO 4G' ],
		'PC36100':									[ 'HTC', 'EVO 4G' ],
		'HTC X515E':								[ 'HTC', 'EVO 4G+' ],
		'Sprint APA7373KT':							[ 'HTC', 'EVO Shift 4G' ],
		'PG06100':									[ 'HTC', 'EVO Shift 4G' ],
		'ISW11HT':									[ 'HTC', 'EVO WiMax' ],
		'HTC Flyer P510e':							[ 'HTC', 'Flyer' ],
		'HTC Glacier':								[ 'HTC', 'Glacier' ],
		'HTC Gratia A6380':							[ 'HTC', 'Gratia' ],
		'HTC HD2':									[ 'HTC', 'HD2' ],
		'NexusHD2':									[ 'HTC', 'HD2' ],
		'Hero':										[ 'HTC', 'Hero' ],
		'HTC Hero':									[ 'HTC', 'Hero' ],
		'HTC HERO200':								[ 'HTC', 'Hero 200' ],
		'HTC Incredible S':							[ 'HTC', 'Incredible S' ],
		'HTC IncredibleS S710e':					[ 'HTC', 'Incredible S' ],
		'Incredible S':								[ 'HTC', 'Incredible S' ],
		'Inspire 4G':								[ 'HTC', 'Inspire 4G' ],
		'Legend':									[ 'HTC', 'Legend' ],
		'HTC Legend':								[ 'HTC', 'Legend' ],
		'Liberty':									[ 'HTC', 'Liberty' ],
		'HTC Liberty A6380':						[ 'HTC', 'Liberty' ],
		'HTC Magic':								[ 'HTC', 'Magic' ],
		'HTC Panache':								[ 'HTC', 'Panache' ],
		'HTC Pyramid':								[ 'HTC', 'Pyramid' ],
		'ADR6425LVW 4G':							[ 'HTC', 'Rezound 4G' ],
		'HTC Rhyme S510b':							[ 'HTC', 'Rhyme' ],
		'HTC Salsa C510e':							[ 'HTC', 'Salsa' ],	
		'HTC Sapphire':								[ 'HTC', 'Sapphire' ],
		'Sensation':								[ 'HTC', 'Sensation' ],
		'HTC Sensation':							[ 'HTC', 'Sensation' ],
		'HTC Sensation Z710e':						[ 'HTC', 'Sensation' ],
		'HTC Sensation Z710a':						[ 'HTC', 'Sensation' ],
		'HTC Sensation Z710E':						[ 'HTC', 'Sensation' ],
		'HTC Sensation Z715e':						[ 'HTC', 'Sensation XE' ],
		'HTC Z710t':								[ 'HTC', 'Sensation' ],
		'HTC Sensation 4G':							[ 'HTC', 'Sensation 4G' ],
		'Sensation 4G':								[ 'HTC', 'Sensation 4G' ],
		'HTC Z715e':								[ 'HTC', 'Sensation XE' ],
		'HTC Sensation Z710e with Beats Audio':		[ 'HTC', 'Sensation' ],
		'HTC SensationXE Beats Z715e':				[ 'HTC', 'Sensation XE' ],
		'HTC Sensation XE with Beats Audio':		[ 'HTC', 'Sensation XE' ],
		'HTC Sensation XE with Beats Audio Z715e':	[ 'HTC', 'Sensation XE' ],
		'HTC Sensation XL with Beats Audio X315e':	[ 'HTC', 'Sensation XL' ],
		'ADR6400L':									[ 'HTC', 'Thunderbolt 4G' ],
		'ADR6400L 4G':								[ 'HTC', 'Thunderbolt 4G' ],
		'ADR6425LVW':								[ 'HTC', 'Vigor' ],
		'HTC Vision':								[ 'HTC', 'Vision' ],
		'HTC Wildfire':								[ 'HTC', 'Wildfire' ],
		'HTC Wildfire A3333':						[ 'HTC', 'Wildfire' ],
		'HTC WildfireS':							[ 'HTC', 'Wildfire S' ],
		'HTC Wildfire S':							[ 'HTC', 'Wildfire S' ],
		'HTC Wildfire S A510e':						[ 'HTC', 'Wildfire S' ],
		'HTC WildfireS A510e':						[ 'HTC', 'Wildfire S' ],
		'HTC A510e':								[ 'HTC', 'Wildfire S' ],
		'HTC/WildfireS/1.33.161.2':					[ 'HTC', 'Wildfire S' ],
		'M865':										[ 'Huawei', 'M865' ],
		'C8150':									[ 'Huawei', 'IDEOS' ],
		'Ideos':									[ 'Huawei', 'IDEOS' ],
		'C8500':									[ 'Huawei', 'C8500' ],
		'C8600':									[ 'Huawei', 'C8600' ],
		'c8650':									[ 'Huawei', 'C8650' ],
		'C8650':									[ 'Huawei', 'C8650' ],
		'U8100':									[ 'Huawei', 'U8100' ],
		'U8110':									[ 'Huawei', 'U8110' ],
		'U8220':									[ 'Huawei', 'U8220' ],
		'U8300':									[ 'Huawei', 'U8300' ],
		'U8350':									[ 'Huawei', 'Boulder' ],
		'U8150':									[ 'Huawei', 'IDEOS' ],
		'U8180':									[ 'Huawei', 'IDEOS X1' ],
		'U8500':									[ 'Huawei', 'IDEOS X2' ],
		'U8510':									[ 'Huawei', 'IDEOS X3' ],
		'IDEOS S7':									[ 'Huawei', 'IDEOS S7' ],
		'IDEOS S7 Slim':							[ 'Huawei', 'IDEOS S7 Slim' ],
		'U8650':									[ 'Huawei', 'Sonic' ],
		'U8850':									[ 'Huawei', 'Vision' ],
		'U8800':									[ 'Huawei', 'IDEOS X5' ],
		'U8800Pro':									[ 'Huawei', 'U8800 Pro' ],
		'u8800pro':									[ 'Huawei', 'U8800 Pro' ],
		'U8860':									[ 'Huawei', 'Honor' ],
		'U9000':									[ 'Huawei', 'Ascend X' ],
		'HUAWEI-U9000':								[ 'Huawei', 'Ascend X' ],
		'HUAWEI MediaPad':							[ 'Huawei', 'MediaPad' ],
		'HUAWEI SONIC':								[ 'Huawei', 'Sonic' ],
		'HUAWEI T8300':								[ 'Huawei', 'T8300' ],
		'INFOBAR A01':								[ 'iida', 'INFOBAR A01' ],
		'ILT-MX100':								[ 'iRiver', 'Tab' ],
		'i-mobile 3G 8500':							[ 'i-Mobile', '3G 8500' ],
		'ISW11K':									[ 'Kyocera', 'Digno' ],
		'W700':										[ 'K-Touch', 'W700' ],
		'A1 07':									[ 'Lenovo', 'LePad' ],
		'3GW100':									[ 'Lenovo', 'LePhone' ],
		'3GW101':									[ 'Lenovo', 'LePhone' ],
		'Lenovo 3GW101':							[ 'Lenovo', 'LePhone' ],
		'Lenovo A60':								[ 'Lenovo', 'LePhone' ],
		'Lenovo A500':								[ 'Lenovo', 'LePhone' ],
		'ThinkPad Tablet':							[ 'Lenovo', 'ThinkPad Tablet' ],
		'Lenovo S1-37AH0':							[ 'Lenovo', 'S1-37AH0' ],
		'LG-GW620':									[ 'LG', 'GW620' ],
		'LG-LS855':									[ 'LG', 'Marquee' ],
		'LG-MS690':									[ 'LG', 'Optimus M' ],
		'LG-GT540':									[ 'LG', 'Optimus' ],
		'LG GT540 Swift':							[ 'LG', 'Optimus' ],
		'LG-E510':									[ 'LG', 'Optimus Hub' ],
		'LG-P350':									[ 'LG', 'Optimus Me' ],
		'LG-P350f':									[ 'LG', 'Optimus Me' ],
		'LG-P350g':									[ 'LG', 'Optimus Me' ],
		'LG-P500':									[ 'LG', 'Optimus One' ],
		'LG-P500h':									[ 'LG', 'Optimus One' ],
		'LG-P500h-parrot':							[ 'LG', 'Optimus One' ],
		'LG-P500/v20h':								[ 'LG', 'Optimus One' ],
		'LG-P503':									[ 'LG', 'Optimus One' ],
		'LG-P509':									[ 'LG', 'Optimus T' ],
		'LG-P698f':									[ 'LG', 'Optimus Net' ],
		'LG-P720':									[ 'LG', 'Optimus Chic' ],
		'LG-P920':									[ 'LG', 'Optimus 3D' ],
		'LG-SU760':									[ 'LG', 'Optimus 3D' ],
		'LG-P930':									[ 'LG', 'Nitro HD' ],
		'LG-P970':									[ 'LG', 'Optimus Black' ],
		'LG-P970/V10c':								[ 'LG', 'Optimus Black' ],
		'LG-SU660':									[ 'LG', 'Optimus 2X' ],
		'LG-P990':									[ 'LG', 'Optimus 2X Speed' ],
		'LG-LU5400':								[ 'LG', 'LG-LU5400' ],
		'LG-LU6200':								[ 'LG', 'Optimus Q2' ],
		'Optimus':									[ 'LG', 'Optimus' ],
		'Optimus 2X':								[ 'LG', 'Optimus 2X' ],
		'LG Optimus 2X':							[ 'LG', 'Optimus 2X' ],
		'GT540':									[ 'LG', 'Optimus GT540' ],
		'VM670':									[ 'LG', 'Optimus V' ],
		'LG-VM670':									[ 'LG', 'Optimus V' ],
		'L-01D':									[ 'LG', 'Optimus LTE' ],
		'L-07C':									[ 'LG', 'Optimus Bright' ],
		'LG-E730/V10b':								[ 'LG', 'Optimus Sol' ],
		'VS910 4G':									[ 'LG', 'Revolution 4G' ],
		'LG-P925/V10e':								[ 'LG', 'Thrill' ],
		'LG-V905R':									[ 'LG', 'Optimus G-Slate' ],
		'LG-V909':									[ 'LG', 'Optimus G-Slate' ],
		'L-06C':									[ 'LG', 'Optimus Pad' ],
		'T6':										[ 'Malata', 'Zpad T6' ],
		'MTK6516':									[ 'Mediatek', 'MTK6516' ],
		'LIFETAB P9514':							[ 'Medion', 'Lifetab' ],
		'M8':										[ 'Meizu', 'M8' ],
		'M9':										[ 'Meizu', 'M9' ],
		'meizu m9':									[ 'Meizu', 'M9' ],
		'MEIZU MX':									[ 'Meizu', 'MX' ],
		'MB300':									[ 'Motorola', 'BACKFLIP' ],
		'ME600':									[ 'Motorola', 'BACKFLIP' ],
		'Droid':									[ 'Motorola', 'Droid' ],
		'DROID2':									[ 'Motorola', 'Droid 2' ],
		'DROID2 GLOBAL':							[ 'Motorola', 'Droid 2' ],
		'DROID3':									[ 'Motorola', 'Droid 3' ],
		'DROID BIONIC 4G':							[ 'Motorola', 'Droid Bionic' ],
		'DROID RAZR':								[ 'Motorola', 'Droid RAZR' ],
		'DROID RAZR 4G':							[ 'Motorola', 'Droid RAZR' ],
		'DROIDX':									[ 'Motorola', 'Droid X' ],
		'ME811':									[ 'Motorola', 'Droid X' ],
		'MB860':									[ 'Motorola', 'ATRIX' ],
		'ME860':									[ 'Motorola', 'ATRIX' ],
		'Moto ME860':								[ 'Motorola', 'ATRIX' ],
		'MB200':									[ 'Motorola', 'CLIQ' ],
		'CLIQ':										[ 'Motorola', 'CLIQ' ],
		'MB611':									[ 'Motorola', 'CLIQ 2' ],
		'ME501':									[ 'Motorola', 'CLIQ XT' ],
		'MB525':									[ 'Motorola', 'DEFY' ],
		'MB526':									[ 'Motorola', 'DEFY+' ],
		'XT720':									[ 'Motorola', 'Milestone' ],
		'A853':										[ 'Motorola', 'Milestone' ],
		'Milestone':								[ 'Motorola', 'Milestone' ],
		'Motorola XT720':							[ 'Motorola', 'Milestone' ],
		'ME722':									[ 'Motorola', 'Milestone 2' ],
		'A953':										[ 'Motorola', 'Milestone 2' ],
		'MotoA953':									[ 'Motorola', 'Milestone 2' ],
		'Milestone X':								[ 'Motorola', 'Milestone X' ],
		'ME525':									[ 'Motorola', 'MOTO ME525' ],
		'MT810':									[ 'Motorola', 'MOTO MT810' ],
		'MT870':									[ 'Motorola', 'MOTO MT870' ],
		'XT702':									[ 'Motorola', 'MOTO XT702' ],
		'XT800':									[ 'Motorola', 'MOTO XT800' ],
		'XT882':									[ 'Motorola', 'MOTO XT882' ],
		'XT800W':									[ 'Motorola', 'MOTO Glam' ],
		'ME511':									[ 'Motorola', 'FLIPOUT' ],
		'ISW11M':									[ 'Motorola', 'PHOTON' ],
		'MB855':									[ 'Motorola', 'PHOTON 4G' ],
		'Motorola-XT502':							[ 'Motorola', 'QUENCH XT5' ],
		'XT910':									[ 'Motorola', 'RAZR' ],
		'MOT-XT910':								[ 'Motorola', 'RAZR' ],
		'XT300':									[ 'Motorola', 'SPICE' ],
		'Motorola Triumph':							[ 'Motorola', 'TRIUMPH' ],
		'Xoom':										[ 'Motorola', 'XOOM' ],
		'MZ505':									[ 'Motorola', 'XOOM Family Edition' ],
		'MZ600':									[ 'Motorola', 'XOOM 4G LTE' ],
		'MZ601':									[ 'Motorola', 'XOOM 3G' ],
		'MZ602':									[ 'Motorola', 'XOOM 4G LTE' ],
		'MZ603':									[ 'Motorola', 'XOOM 3G' ],
		'MZ604':									[ 'Motorola', 'XOOM WiFi' ],
		'MZ605':									[ 'Motorola', 'XOOM 3G' ],
		'MZ606':									[ 'Motorola', 'XOOM WiFi' ],
		'MZ607':									[ 'Motorola', 'XOOM 2 WiFi Media Edition' ],
		'MZ609':									[ 'Motorola', 'Droid XYBOARD 8.2' ],
		'MZ615':									[ 'Motorola', 'XOOM 2 WiFi' ],
		'MZ617':									[ 'Motorola', 'Droid XYBOARD 10.1' ],
		'XT701':									[ 'Motorola', 'XT701' ],
		'MTC 955':									[ 'MTC', '955' ],
		'Newpad':									[ 'Newsmy', 'Newpad' ],
		'N-04C':									[ 'NEC', 'MEDIAS N-04C' ],
		'N-06C':									[ 'NEC', 'MEDIAS N-06C' ],
		'Nokia N900':								[ 'Nokia', 'N900' ],
		'ONDA MID':									[ 'Onda', 'MID' ],
		'X903':										[ 'Oppo', 'X903' ],
		'IM-A690S':									[ 'Pantech', 'SKY' ],
		'IM-A730s':									[ 'Pantech', 'SKY Vega S' ],
		'IS06':										[ 'Pantech', 'SIRIUS α' ],
		'Mobii 7':									[ 'Point Of View', 'Mobii 7' ],
		'w10':										[ 'Ramos', 'W10' ],
		'T11AD':									[ 'Ramos', 'T11AD' ],
		'PlayBook':									[ 'RIM', 'BlackBerry PlayBook' ],
		'Galaxy Nexus':								[ 'Samsung', 'Galaxy Nexus' ],
		'GT-B5510':									[ 'Samsung', 'Galaxy Y Pro' ],
		'GT-I5500':									[ 'Samsung', 'Galaxy 5' ],
		'GT-I5500L':								[ 'Samsung', 'Galaxy 5' ],
		'GT-I5503':									[ 'Samsung', 'Galaxy 5' ],
		'GT-I5508':									[ 'Samsung', 'Galaxy 5' ],
		'GT-I5700':									[ 'Samsung', 'Galaxy Spica' ],
		'GT-I5800':									[ 'Samsung', 'Galaxy Apollo' ],
		'GT-I5801':									[ 'Samsung', 'Galaxy Apollo' ],
		'GT-I8150':									[ 'Samsung', 'Galaxy W' ],
		'GT-I9000':									[ 'Samsung', 'Galaxy S' ],
		'GT-I9000B':								[ 'Samsung', 'Galaxy S' ],
		'GT-I9000M':								[ 'Samsung', 'Galaxy S Vibrant' ],
		'GT-I9000T':								[ 'Samsung', 'Galaxy S' ],
		'GT-I9001':									[ 'Samsung', 'Galaxy S Plus' ],
		'GT-I9003':									[ 'Samsung', 'Galaxy SL' ],
		'GT-I9008':									[ 'Samsung', 'Galaxy S' ],
		'GT-I9088':									[ 'Samsung', 'Galaxy S' ],
		'GT-I9070':									[ 'Samsung', 'Galaxy GT-I9070' ],
		'GT-I9100':									[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100G':								[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100M':								[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100T':								[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100P':								[ 'Samsung', 'Galaxy S II' ],
		'GT-I9103':									[ 'Samsung', 'Galaxy R' ],
		'GT-I9220':									[ 'Samsung', 'Galaxy Note' ],
		'GT-I9500':									[ 'Samsung', 'Galaxy S III' ],
		'GT-N7000':									[ 'Samsung', 'Galaxy Note' ],
		'GT-P1000':									[ 'Samsung', 'Galaxy Tab' ],
		'GT-P1000L':								[ 'Samsung', 'Galaxy Tab' ],
		'GT-P1000T':								[ 'Samsung', 'Galaxy Tab' ],
		'GT-P1010':									[ 'Samsung', 'Galaxy Tab' ],
		'GT-P6200':									[ 'Samsung', 'Galaxy Tab 7.0 Plus' ],
		'GT-P6200L':								[ 'Samsung', 'Galaxy Tab 7.0 Plus' ],
		'GT-P6210':									[ 'Samsung', 'Galaxy Tab 7.0 Plus' ],
		'GT-P6800':									[ 'Samsung', 'Galaxy Tab 7.7' ],
		'GT-P7100':									[ 'Samsung', 'Galaxy Tab 10.1V' ],
		'GT-P7300':									[ 'Samsung', 'Galaxy Tab 8.9' ],
		'GT-P7300B':								[ 'Samsung', 'Galaxy Tab 8.9' ],
		'GT-P7310':									[ 'Samsung', 'Galaxy Tab 8.9' ],
		'GT-P7500':									[ 'Samsung', 'Galaxy Tab 10.1' ],
		'GT-P7500R':								[ 'Samsung', 'Galaxy Tab 10.1' ],
		'GT-P7501':									[ 'Samsung', 'Galaxy Tab 10.1N' ],
		'GT-P7510':									[ 'Samsung', 'Galaxy Tab 10.1' ],
		'GT-S5360':									[ 'Samsung', 'Galaxy Y' ],
		'GT-S5360B':								[ 'Samsung', 'Galaxy Y' ],
		'GT-S5570':									[ 'Samsung', 'Galaxy Mini' ],
		'GT-S5570L':								[ 'Samsung', 'Galaxy Mini' ],
		'GT-S5578':									[ 'Samsung', 'Galaxy Mini' ],
		'GT-S5660':									[ 'Samsung', 'Galaxy Gio' ],
		'GT-S5660M':								[ 'Samsung', 'Galaxy Gio' ],
		'GT-S5670':									[ 'Samsung', 'Galaxy Fit' ],
		'GT-S5820':									[ 'Samsung', 'Galaxy Ace' ],
		'GT-S5830':									[ 'Samsung', 'Galaxy Ace' ],
		'GT-S5830L':								[ 'Samsung', 'Galaxy Ace' ],
		'SCH-i569':									[ 'Samsung', 'Galaxy Gio' ],
		'SCH-I400':									[ 'Samsung', 'Continuum' ],
		'SCH-I500':									[ 'Samsung', 'Fascinate' ],
		'SCH-i509':									[ 'Samsung', 'Galaxy Y' ],
		'SCH-I510':									[ 'Samsung', 'Stealth V' ],
		'SCH-I510 4G':								[ 'Samsung', 'Droid Charge' ],
		'SCH-i579':									[ 'Samsung', 'Galaxy Ace' ],
		'SCH-I909':									[ 'Samsung', 'Galaxy S' ],
		'SCH-R720':									[ 'Samsung', 'Admire' ],
		'SGH-I727':									[ 'Samsung', 'Galaxy S II Skyrocket' ],
		'SGH-i727R':								[ 'Samsung', 'Galaxy S II' ],
		'SGH-I777':									[ 'Samsung', 'Galaxy S II' ],
		'SGH-I896':									[ 'Samsung', 'Galaxy S Captivate' ],
		'SGH-I897':									[ 'Samsing', 'Captivate' ],
		'SGH-I927':									[ 'Samsung', 'Captivate Glide' ],
		'SGH-I987':									[ 'Samsung', 'Galaxy Tab 7.0 '],
		'SGH-T499':									[ 'Samsung', 'Dart' ],
		'SGH-T959':									[ 'Samsung', 'Galaxy S Vibrant' ],
		'SGH-T959D':								[ 'Samsung', 'Galaxy S Fascinate 3G+' ],
		'SGH-T959P':								[ 'Samsung', 'Galaxy S Fascinate 4G' ],
		'SGH-T959V':								[ 'Samsung', 'Galaxy S 4G' ],
		'SGH-T989':									[ 'Samsung', 'Galaxy S II' ],
		'SGH-T989D':								[ 'Samsung', 'Galaxy S II X' ],
		'SHV-E160K':								[ 'Samsung', 'Galaxy Note' ],
		'SHV-E160S':								[ 'Samsung', 'Galaxy Note LTE' ],
		'SHW-M110S':								[ 'Samsung', 'Galaxy S' ],
		'SHW-M130L':								[ 'Samsung', 'Galaxy U' ],
		'SHW-M130K':								[ 'Samsung', 'Galaxy K' ],
		'SHW-M180L':								[ 'Samsung', 'Galaxy Tab' ],
		'SHW-M180S':								[ 'Samsung', 'Galaxy Tab' ],
		'SHW-M190S':								[ 'Samsung', 'Galaxy S Hoppin' ],
		'SHW-M250K':								[ 'Samsung', 'Galaxy S II' ],
		'SHW-M250L':								[ 'Samsung', 'Galaxy S II' ],
		'SHW-M250S':								[ 'Samsung', 'Galaxy S II' ],
		'SHW-M380S':								[ 'Samsung', 'Galaxy Tab 10.1' ],
		'SPH-D700':									[ 'Samsung', 'Galaxy S Epic 4G' ],
		'SPH-D710':									[ 'Samsung', 'Galaxy S II Epic 4G' ],
		'SPH-P100':									[ 'Samsung', 'Galaxy Tab' ],
		'SMT-i9100':								[ 'Samsung', 'SMT-i9100' ],
		'SC-01C':									[ 'Samsung', 'Galaxy Tab' ],
		'SC-01D':									[ 'Samsung', 'Galaxy Tab 10.1 LTE' ],
		'SC-02B':									[ 'Samsung', 'Galaxy S' ],
		'SC-02C':									[ 'Samsung', 'Galaxy S II' ],
		'SC-03D':									[ 'Samsung', 'Galaxy S II LTE' ],
		'I897':										[ 'Samsung', 'Captivate' ],
		'I7500':									[ 'Samsung', 'Galaxy' ],
		'I9000':									[ 'Samsung', 'Galaxy S' ],
		'YP-GB70':									[ 'Samsung', 'Galaxy Player' ],
		'YP-GS1':									[ 'Samsung', 'Galaxy S WiFi 3.6' ],
		'T959':										[ 'Samsung', 'Galaxy S Vibrant' ],
		'Galaxy S II':								[ 'Samsung', 'Galaxy S II' ],
		'SAMSUNG-SGH-I727':							[ 'Samsung', 'Galaxy S II Skyrocket' ],
		'SAMSUNG-SGH-I777':							[ 'Samsung', 'Galaxy S II' ],
		'SAMSUNG-SGH-I896':							[ 'Samsung', 'Captivate' ],
		'SAMSUNG-SGH-I897':							[ 'Samsung', 'Captivate' ],
		'SAMSUNG-SGH-I997':							[ 'Samsung', 'Galaxy S Infuse 4G' ],
		'SAMSUNG-SGH-I897/I897UCJF6':				[ 'Samsung', 'Captivate' ],
		'SAMSUNG GT-S5830/S5830BUKPE':				[ 'Samsung', 'Galaxy Ace' ],
		'SAMSUNG GT-S5570/S5570BUKS2':				[ 'Samsung', 'Galaxy Mini' ],
		'SAMSUNG-GT-P7500/P7500BUKG7':				[ 'Samsung', 'Galaxy Tab 10.1' ],
		'SAMSUNG GT-I9100/I9100BUKG2':				[ 'Samsung', 'Galaxy S II' ],
		'SAMSUNG GT-I9001/I9001BUKG1':				[ 'Samsung', 'Galaxy S Plus' ],
		'SAMSUNG GT-I9210/I9210XXKL5':				[ 'Samsung', 'Galaxy S II LTE' ],
		'GT-N7000-ORANGE/N7000XXKKA':				[ 'Samsung', 'Galaxy Note' ],
		'GT-I9100-ORANGE/I9100BVKJ4':				[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100-ORANGE/I9100BVKG2':				[ 'Samsung', 'Galaxy S II' ],
		'GT-I9100-ORANGE/I9100BVKH1':				[ 'Samsung', 'Galaxy S II' ],
		'GT-S5570-ORANGE/S5570BVKQ4':				[ 'Samsung', 'Galaxy Mini' ],
		'SH-03C':									[ 'Sharp', 'Lynx 3D' ],
		'SH-12C':									[ 'Sharp', 'Aquos' ],
		'SBM006SH':									[ 'Sharp', 'Aquos' ],
		'SBM102SH':									[ 'Sharp', 'Aquos 102SH' ],
		'IS12SH':									[ 'Sharp', 'Aquos IS12SH' ],
		'IS01':										[ 'Sharp', 'IS01' ],
		'IS03':										[ 'Sharp', 'IS03' ],
		'SH-01D':									[ 'Sharp', 'Aquos SH-01D' ],
		'SH-13C':									[ 'Sharp', 'Aquos SH-13C' ],
		'SBM003SH':									[ 'Sharp', 'Galapagos' ],
		'SBM005SH':									[ 'Sharp', 'Galapagos' ],
		'SH8268U':									[ 'Sharp', 'SH8268U' ],
		'SPX-5':									[ 'Simvalley', 'SPX-5' ],
		'SonyEricssonE10a':							[ 'Sony Ericsson', 'Xperia X10 Mini' ],
		'SonyEricssonE10i':							[ 'Sony Ericsson', 'Xperia X10 Mini' ],
		'SonyEricssonE15a':							[ 'Sony Ericsson', 'Xperia X8' ],
		'SonyEricssonE15i':							[ 'Sony Ericsson', 'Xperia X8' ],
		'SonyEricssonIS11S':						[ 'Sony Ericsson', 'Xperia Acro' ],
		'SonyEricssonSO-02C':						[ 'Sony Ericsson', 'Xperia Acro' ],
		'SonyEricssonLT15a':						[ 'Sony Ericsson', 'Xperia Arc' ],
		'SonyEricssonLT15i':						[ 'Sony Ericsson', 'Xperia Arc' ],
		'SonyEricssonLT15i-o':						[ 'Sony Ericsson', 'Xperia Arc' ],
		'SonyEricssonLT18i':						[ 'Sony Ericsson', 'Xperia Arc S' ],
		'SonyEricssonLT18iv':						[ 'Sony Ericsson', 'Xperia Arc S' ],
		'SonyEricssonMK16i':						[ 'Sony Ericsson', 'Xperia Pro' ],
		'SonyEricssonMT11i':						[ 'Sony Ericsson', 'Xperia Neo V' ],
		'SonyEricssonMT11iv':						[ 'Sony Ericsson', 'Xperia Neo V' ],
		'SonyEricssonMT15a':						[ 'Sony Ericsson', 'Xperia Neo' ],
		'SonyEricssonMT15i':						[ 'Sony Ericsson', 'Xperia Neo' ],
		'SonyEricssonMT15iv':						[ 'Sony Ericsson', 'Xperia Neo' ],
		'SonyEricssonR800a':						[ 'Sony Ericsson', 'Xperia Play' ],
		'SonyEricssonR800i':						[ 'Sony Ericsson', 'Xperia Play' ],
		'SonyEricssonSK17i':						[ 'Sony Ericsson', 'Xperia Mini Pro' ],
		'SonyEricssonSK17iv':						[ 'Sony Ericsson', 'Xperia Mini Pro' ],
		'SonyEricssonSO-01C':						[ 'Sony Ericsson', 'Xperia Arc' ],
		'SonyEricssonST15i':						[ 'Sony Ericsson', 'Xperia Mini' ],
		'SonyEricssonST18a':						[ 'Sony Ericsson', 'Xperia Ray' ],
		'SonyEricssonST18i':						[ 'Sony Ericsson', 'Xperia Ray' ],
		'SonyEricssonSO-03C':						[ 'Sony Ericsson', 'Xperia Ray' ],
		'SonyEricssonWT19i':						[ 'Sony Ericsson', 'Live with Walkman' ],
		'SonyEricssonU20a':							[ 'Sony Ericsson', 'Xperia X10 Mini Pro' ],
		'SonyEricssonU20i':							[ 'Sony Ericsson', 'Xperia X10 Mini Pro' ],
		'SonyEricssonX10i':							[ 'Sony Ericsson', 'Xperia X10' ],
		'SonyEricssonX10iv':						[ 'Sony Ericsson', 'Xperia X10' ],
		'SonyEricssonSO-01B':						[ 'Sony Ericsson', 'Xperia X10' ],
		'ST15i':									[ 'Sony Ericsson', 'Xperia Mini' ],
		'ST18i':									[ 'Sony Ericsson', 'Xperia Ray' ],
		'LT15i':									[ 'Sony Ericsson', 'Xperia Arc' ],
		'LT18a':									[ 'Sony Ericsson', 'Xperia Arc S' ],
		'LT18i':									[ 'Sony Ericsson', 'Xperia Arc S' ],
		'MT15a':									[ 'Sony Ericsson', 'Xperia Neo' ],
		'MT15i':									[ 'Sony Ericsson', 'Xperia Neo' ],
		'MT11i':									[ 'Sony Ericsson', 'Xperia Neo V' ],
		'R800i':									[ 'Sony Ericsson', 'Xperia Play' ],
		'SK17i':									[ 'Sony Ericsson', 'Xperia Mini Pro' ],
		'X8':										[ 'Sony Ericcson', 'Xperia X8' ],
		'E15i':										[ 'Sony Ericsson', 'Xperia X8' ],
		'E10i':										[ 'Sony Ericcson', 'Xperia X10 Mini' ],
		'U20i':										[ 'Sony Ericsson', 'Xperia X10 Mini Pro' ],
		'X10i':										[ 'Sony Ericcson', 'Xperia X10' ],
		'IS11S':									[ 'Sony Ericcson', 'Xperia Acro' ],
		'SO-01B': 									[ 'Sony Ericcson', 'Xperia X10' ],
		'SO-01C':									[ 'Sony Ericcson', 'Xperia Arc' ],
		'SO-02C':									[ 'Sony Ericsson', 'Xperia Acro' ],
		'SO-03C':									[ 'Sony Ericcson', 'Xperia Ray' ],
		'Sony Tablet P':							[ 'Sony', 'Tablet P' ],
		'Sony Tablet S':							[ 'Sony', 'Tablet S' ],
		'NW-Z1000Series':							[ 'Sony', 'Walkman' ],
		'P76TI':									[ 'Teclast', 'P76Ti' ],
		'T-01C':									[ 'Toshiba', 'Regza T-01C' ],
		'T-01D':									[ 'Toshiba', 'Regza T-01D' ],
		'IS04':										[ 'Toshiba', 'Regza IS04' ],
		'AT1S0':									[ 'Toshiba', 'Regza AT1S0' ],
		'AT100':									[ 'Toshiba', 'AT100' ],
		'MOVE':										[ 'T-Mobile', 'MOVE' ],
		'T-Mobile G2':								[ 'T-Mobile', 'G2' ],
		'LG-P999':									[ 'T-Mobile', 'G2x' ],
		'myTouch4G':								[ 'T-Mobile', 'myTouch 4G' ],
		'myTouch 4G Slide':							[ 'T-Mobile', 'myTouch 4G Slide' ],
		'T-Mobile myTouch 3G Slide':				[ 'T-Mobile', 'myTouch 3G Slide' ],
		'T301':										[ 'Velocity Micro', 'Cruz T301' ],
		'ViewPad7':									[ 'ViewSonic', 'ViewPad 7' ],
		'Vodafone 858':								[ 'Vodafone', '858 Smart' ],
		'WellcoM-A99':								[ 'WellcoM', 'A99' ],
		'N50DT':									[ 'Window', 'N50DT' ],
		'WM8650':									[ 'WonderMedia', 'WM8650' ],
		'MI-ONE':									[ 'Xiaomi', 'MI-ONE' ],
		'MI-ONE Plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
		'mione_plus':								[ 'Xiaomi', 'MI-ONE Plus' ],
		'N6':										[ 'Yarvik', '210 Tablet' ],
		'N50GT':									[ 'YuanDao', 'N50GT' ],
		'Jaguar7':									[ 'ZiiLabs', 'Jaguar 7' ],
		'ZTE-T U880':								[ 'ZTE', 'Blade' ],
		'Blade-opda':								[ 'ZTE', 'Blade' ],
		'Blade':									[ 'ZTE', 'Blade' ],
		'ZTE-BLADE':								[ 'ZTE', 'Blade' ],
		'ZTE-SKATE':								[ 'ZTE', 'Skate' ],
		'ZTE Racer':								[ 'ZTE', 'Racer' ],
		'ZTE-T U880':								[ 'ZTE', 'T-U880' ],
		'ZTE-U V880':								[ 'ZTE', 'U-V880' ],
		'ZTE-C R750':								[ 'ZTE', 'C-R750' ],
		'ZTE-C N760':								[ 'ZTE', 'C-N760' ],
		'ZTE GV821':								[ 'ZTE', 'G-V821' ]
	};
	
	var BLACKBERRY_MODELS = {
		'9600':			'Bold',
		'9650':			'Bold',
		'9700':			'Bold',
		'9780':			'Bold',
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
		'9300':			'Curve',
		'9330':			'Curve',
		'9350':			'Curve',
		'9360':			'Curve',
		'9370':			'Curve',
		'8100':			'Pearl',
		'8110':			'Pearl',
		'8120':			'Pearl',
		'8130':			'Pearl',
		'8220':			'Pearl',
		'8230':			'Pearl',
		'9100':			'Pearl',
		'9530':			'Storm',
		'9550':			'Storm',
		'9800':			'Torch',
		'9810':			'Torch',
		'9850':			'Torch',
		'9860':			'Torch',
		'9630':			'Tour'
	};

	
 	var Version = function() { this.initialize.apply(this, Array.prototype.slice.call(arguments)) };
	Version.prototype = {
		initialize: function(v, l) {
			this.literal = !!l;
			
			if (this.literal) {
				this.value = v;
			} else {
				if (match = /([0-9]+)(.([0-9]+))?(.([0-9]+))?/.exec(v)) {
					if (typeof match[1] != 'undefined') {
						this.major = match[1];
					}

					if (typeof match[3] != 'undefined') {
						this.minor = match[3];
					}

					if (typeof match[5] != 'undefined') {
						this.revision = match[5];
					}
				}
			}
		},
		
		valueOf: function() {
			if (this.literal)
				return this.value;
			else
				return parseFloat('' + this.major + '.' + this.minor);
		}
	}
		
 	var Detected = function(ua) { this.initialize(ua) };
	Detected.prototype = {
		initialize: function(ua) {
			this.browser = {
				'stock':	true,
				'hidden':	false
			};
				
			this.engine = {
			};
				
			this.os = {
			};
				
			this.device = {
				'type':		'desktop'
			};
			
			this.detect(ua);


			this.Android = this.engine.name != 'Presto' && this.engine.name != 'Gecko' && this.os.name == 'Android' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.iOS = this.engine.name != 'Presto' && this.os.name == 'iOS' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.WindowsPhone = this.os.name == 'Windows Phone' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.BlackBerry = this.os.name == 'BlackBerry OS' || this.os.name == 'BlackBerry Tablet OS' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;
			this.Meego = this.os.name == 'Meego' ? (typeof this.os.version != 'undefined' ? 0 + this.os.version : true): false;

			this.Opera = this.engine.name == 'Presto' ? (typeof this.browser.version != 'undefined' ? 0 + this.browser.version : true): false;
			this.Firefox = this.engine.name == 'Gecko' ? (typeof this.browser.version != 'undefined' ? 0 + this.browser.version : true): false;

			this.desktop = this.device.type == 'desktop';
			this.tablet = this.device.type == 'tablet';
			this.mobile = this.device.type == 'mobile';
			this.proxy = this.device.type == 'proxy';
		},
		
		detect: function(ua) {

			/****************************************************
			 *		FreeBSD
			 */
		
			if (ua.match('FreeBSD')) {
				this.os.name = 'FreeBSD';
			}
			
			/****************************************************
			 *		Linux
			 */
		
			if (ua.match('Linux')) {
				this.os.name = 'Linux';
			}		

			/****************************************************
			 *		iOS
			 */
		
			if (ua.match('iPhone;') || ua.match('iPad;') || ua.match('iPod;')) {
				this.os.name = 'iOS';
				this.os.version = new Version('1.0');
									
				if (match = /OS (.*) like Mac OS X/.exec(ua)) {
					this.os.version = new Version(match[1].replace(/_/g,'.'));
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
				
				this.device.manufacturer = 'Apple';
			
				if (ua.match('iPhone;') || ua.match('iPod;')) {
					this.device.type = 'mobile';
					
					if (ua.match('iPhone;'))
						this.device.model = 'iPhone';
					else
						this.device.model = 'iPod Touch';
				} else {
					this.device.type = 'tablet';
					this.device.model = 'iPad';
				}
			}				
			
			/****************************************************
			 *		MacOS X
			 */
		
			else if (ua.match('Mac OS X')) {
				this.os.name = 'Mac OS X';
																			
				if (match = /Mac OS X (10[0-9\._]*)/.exec(ua)) {
				    this.os.version = new Version(match[1].replace(/_/g,'.'));
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
						case '6.2':		this.os.version = new Version('8', true); break;
						case '6.1':		this.os.version = new Version('7', true); break;
						case '6.0':		this.os.version = new Version('Vista', true); break;
						case '5.2':		this.os.version = new Version('Server 2003', true); break;
						case '5.1':		this.os.version = new Version('XP', true); break;
						case '5.0':		this.os.version = new Version('2000', true); break;
						default:		this.os.version = new Version('NT ' + this.os.version, true);
					}
				}
				
				if (ua.match('Windows 95') || ua.match('Win95')) {
					this.os.version = new Version('95', true);
				}

				if (ua.match('Windows 98') || ua.match('Win98')) {
					this.os.version = new Version('98', true);
				}

				if (ua.match('Windows ME') || ua.match('WinME')) {
					this.os.version = new Version('ME', true);
				}

				if (ua.match('Windows XP') || ua.match('WinXP')) {
					this.os.name = new Version('XP', true);
				}

				if (ua.match('WP7')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version('7.0');
					this.device.type = 'mobile';
				}

				if (ua.match('Windows CE') || ua.match('WinCE')) {
					this.os.name = 'Windows Mobile';
					
					if (ua.match('IEMobile 8')) {
						this.os.version = new Version('6.5');
					}

					if (ua.match('IEMobile 7')) {
						this.os.version = new Version('6.1');
					}

					if (ua.match('IEMobile 6')) {
						this.os.version = new Version('6.0');
					}

					this.device.type = 'mobile';
				}

				if (ua.match('Windows Phone OS')) {
					this.os.name = 'Windows Phone';
					this.os.version = new Version(ua.match(/Windows Phone OS ([0-9.]*)/)[1]);

					if (this.os.version < 7) {
						this.os.name = 'Windows Mobile';
					}

					if (match = /IEMobile\/[^;]+; ([^;]+); ([^;]+)[;|\)]/.exec(ua)) {
						this.device.manufacturer = match[1];
						this.device.model = match[2];
					}						

					this.device.type = 'mobile';
										
					if (typeof WINDOWS_PHONE_MODELS[this.device.manufacturer] != 'undefined' && 
						typeof WINDOWS_PHONE_MODELS[this.device.manufacturer][this.device.model] != 'undefined') 
					{
						var manufacturer = this.device.manufacturer;
						var model = this.device.model;
						
						this.device.manufacturer = WINDOWS_PHONE_MODELS[manufacturer][model][0];
						this.device.model = WINDOWS_PHONE_MODELS[manufacturer][model][1];
					}
				}
			}

			/****************************************************
			 *		Android
			 */
		
			if (ua.match('Android')) {
				this.os.name = 'Android';

				if (match = /Android [AllPhone_]?([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1])
				}

				if (ua.match('Android Eclair')) {
					this.os.version = new Version('2.0');
				}

				if (match = /; ([^;]*)\s+Build/.exec(ua)) {
				    this.device.model = match[1];
				}					

				if (ua.match('Mobile'))
					this.device.type = 'mobile';
				else
					this.device.type = 'tablet';

				var model = cleanupModel(this.device.model);
				if (typeof ANDROID_MODELS[model] != 'undefined') {
					this.device.manufacturer = ANDROID_MODELS[model][0];
					this.device.model = ANDROID_MODELS[model][1];
				}
			}

			/****************************************************
			 *		Google TV
			 */
		
			if (ua.match('GoogleTV')) {
				this.os.name = 'Google TV';
				
				if (ua.match('Chrome/5.')) {
					this.os.version = new Version('1');
				}

				if (ua.match('Chrome/11.')) {
					this.os.version = new Version('2');
				}

				this.device.type = 'television';
			}

			/****************************************************
			 *		BlackBerry
			 */
		
			if (ua.match('BlackBerry')) {
				this.os.name = 'BlackBerry OS';
				
				if (!ua.match('Opera')) {
					if (match = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(ua)) {
						this.device.model = match[1];
						this.os.version = new Version(match[2]);
					}
					
					if (match = /; BlackBerry ([0-9]*);/.exec(ua)) {
						this.device.model = match[1];
					}

					if (match = /Version\/([0-9.]*)/.exec(ua)) {
						this.os.version = new Version(match[1]);
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
			}
				
			/****************************************************
			 *		BlackBerry PlayBook
			 */
		
			if (ua.match('RIM Tablet OS')) {
				this.os.name = 'BlackBerry Tablet OS';
				this.os.version = new Version(ua.match(/RIM Tablet OS ([0-9.]*)/)[1]);

				this.device.manufacturer = 'RIM';
				this.device.model = 'BlackBerry PlayBook';
				this.device.type = 'tablet';
			}
				
			/****************************************************
			 *		WebOS
			 */
		
			if (ua.match('[web|hpw]OS')) {
				this.os.name = 'webOS';
				this.os.version = new Version(ua.match(/[web|hpw]OS\/([0-9.]*)/)[1]);

				if (ua.match('tablet')) 
					this.device.type = 'tablet';
				else
					this.device.type = 'mobile';

				this.device.manufacturer = ua.match('hpwOS') ? 'HP' : 'Palm';
				if (ua.match('Pre\/1.0')) this.device.model = 'Pre';
				if (ua.match('Pre\/1.1')) this.device.model = 'Pre Plus';
				if (ua.match('Pre\/1.2')) this.device.model = 'Pre2';
				if (ua.match('Pre\/3.0')) this.device.model = 'Pre2';
				if (ua.match('Pixi\/1.0')) this.device.model = 'Pixi';
				if (ua.match('Pixi\/1.1')) this.device.model = 'Pixi Plus';
				if (ua.match('P160UNA\/1.0')) this.device.model = 'Veer';
				if (ua.match('TouchPad\/1.0')) this.device.model = 'TouchPad';
			}
				
			/****************************************************
			 *		S60
			 */
		
			if (ua.match('SymbianOS/9.1') || ua.match('Series[ ]?60')) {
				this.os.name = 'Series60';
				
				if (ua.match('SymbianOS/9.1')  && !ua.match('Series60')) {
					this.os.version = new Version('3.0');
				}
							
				if (match = /Series60\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

				if (match = /Nokia([^\/]+)\//.exec(ua)) {
					this.device.manufacturer = 'Nokia';
					this.device.model = match[1];
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
				}
			}
			
			/****************************************************
			 *		Tizen
			 */
		
			if (ua.match('Tizen')) {
				this.os.name = 'Tizen';

				if (match = /Tizen\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

				this.device.type = 'mobile';

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					this.device.manufacturer = match[1];
					this.device.model = match[2];
				}						

				if (typeof TIZEN_MODELS[this.device.manufacturer] != 'undefined' && 
					typeof TIZEN_MODELS[this.device.manufacturer][this.device.model] != 'undefined') 
				{
					var manufacturer = this.device.manufacturer;
					var model = this.device.model;
					
					this.device.manufacturer = TIZEN_MODELS[manufacturer][model][0];
					this.device.model = TIZEN_MODELS[manufacturer][model][1];
				}
			}
			
			/****************************************************
			 *		Bada
			 */
		
			if (ua.match('Bada')) {
				this.os.name = 'Bada';

				if (match = /Bada\/([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

				this.device.type = 'mobile';

				if (match = /\(([^;]+); ([^\/]+)\//.exec(ua)) {
					this.device.manufacturer = match[1];
					this.device.model = match[2];
				}						

				if (typeof BADA_MODELS[this.device.manufacturer] != 'undefined' && 
					typeof BADA_MODELS[this.device.manufacturer][this.device.model] != 'undefined') 
				{
					var manufacturer = this.device.manufacturer;
					var model = this.device.model;
					
					this.device.manufacturer = BADA_MODELS[manufacturer][model][0];
					this.device.model = BADA_MODELS[manufacturer][model][1];
				}
			}
			
			/****************************************************
			 *		Brew
			 */
		
			if (ua.match(/BREW/i)) {
				this.os.name = 'Brew';
				this.device.type = 'mobile';

				if (match = /BREW; U; ([0-9.]*)/i.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

			}			
			
			/****************************************************
			 *		CrOS
			 */
		
			if (ua.match('CrOS')) {
				this.os.name = 'Chrome OS';
				this.device.type = 'desktop';
			}			
			
			/****************************************************
			 *		Haiku
			 */
		
			if (ua.match('Haiku')) {
				this.os.name = 'Haiku';
				this.device.type = 'desktop';
			}			
			
			/****************************************************
			 *		Kindle
			 */
		
			if (ua.match('Kindle')) {
				this.os.name = '';

				this.device.manufacturer = 'Amazon';
				this.device.model = 'Kindle';
				this.device.type = 'tablet';

				if (ua.match('Kindle\/2.0')) this.device.model = 'Kindle 2';
				if (ua.match('Kindle\/3.0')) this.device.model = 'Kindle 3 or later';
			}

			/****************************************************
			 *		Nintendo
			 */
		
			if (ua.match('Nintendo Wii')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'Nintendo';
				this.device.type = 'television';
			}
			
			if (ua.match('Nintendo DSi')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = 'DSi';
			}
			
			if (ua.match('Nintendo 3DS')) {
				this.os.name = '';

				this.device.manufacturer = 'Nintendo';
				this.device.model = '3DS';
			}

			/****************************************************
			 *		Sony Playstation
			 */
		
			if (ua.match('Playstation Portable')) {
				this.os.name = '';

				this.device.manufacturer = 'Sony';
				this.device.model = 'Playstation Portable';
			}

			if (ua.match('Playstation Vita')) {
				this.os.name = '';

				if (match = /Playstation Vita ([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

				this.device.manufacturer = 'Sony';
				this.device.model = 'Playstation Vita';
			}

			if (ua.match(/Playstation 3/i)) {
				this.os.name = '';

				if (match = /PLAYSTATION 3; ([0-9.]*)/.exec(ua)) {
					this.os.version = new Version(match[1]);
				}

				this.device.manufacturer = 'Sony';
				this.device.model = 'Playstation 3';
				this.device.type = 'television';
			}





			/****************************************************
			 *		Safari
			 */
		
			if (ua.match('Safari') && (this.os.name == 'Mac OS X' || this.os.name == 'iOS' || this.os.name == 'Windows')) {
				this.browser.stock = this.os.name == 'iOS' || this.os.name == 'Mac OS X';
				this.browser.hidden = this.os.name == 'iOS';
				this.browser.name = 'Safari';
				
				if (match = /Version\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Internet Explorer
			 */
		
			if (ua.match('MSIE')) {
				this.browser.name = 'Internet Explorer';
				
				if (ua.match('IEMobile') || ua.match('WP7')) {
					this.browser.name = 'Mobile Internet Explorer';
				}

				if (match = /MSIE ([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Opera
			 */
		
			if (ua.match('Opera')) {
				this.browser.stock = false;
				this.browser.name = 'Opera';

				if (match = /Opera\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}

				if (match = /Version\/([0-9.]*)/.exec(ua)) {
					if (parseFloat(match[1]) >= 10) {
						this.browser.version = new Version(match[1]);
					} else {
						this.browser.version = null;
					}
				}
				
				if (ua.match('Opera Tablet')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = 'tablet';
				}
				
				if (ua.match('Opera Mobi')) {
					this.browser.name = 'Opera Mobile';
					this.device.type = 'mobile';
				}
				
				if (match = /Opera Mini\/([0-9.]*)/.exec(ua)) {
					this.browser.name = 'Opera Mini';
					this.browser.version = new Version(match[1]);
					this.device.type = 'proxy';
				}
			}

			/****************************************************
			 *		Firefox
			 */
		
			if (ua.match('Firefox')) {
				this.browser.stock = false;
				this.browser.name = 'Firefox';

				if (match = /Firefox\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}

				if (ua.match('Fennec')) {
					this.browser.name = 'Firefox Mobile';
					this.device.type = 'mobile';
				}
			}

			/****************************************************
			 *		SeaMonkey
			 */
		
			if (ua.match('SeaMonkey')) {
				this.browser.stock = false;
				this.browser.name = 'SeaMonkey';

				if (match = /SeaMonkey\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Konqueror
			 */
		
			if (ua.match('[k|K]onqueror/')) {
				this.browser.name = 'Konqueror';

				if (match = /[k|K]onqueror\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Chrome
			 */
		
			if (ua.match('Chrome')) {
				this.browser.stock = false;
				this.browser.name = 'Chrome';

				if (match = /Chrome\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Chromium
			 */
		
			if (ua.match('Chromium')) {
				this.browser.stock = false;
				this.browser.name = 'Chromium';

				if (match = /Chromium\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		BrowserNG
			 */
		
			if (ua.match('BrowserNG')) {
				this.browser.name = 'BrowserNG';

				if (match = /BrowserNG\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		NokiaBrowser
			 */
		
			if (ua.match('NokiaBrowser')) {
				this.browser.name = 'NokiaBrowser';

				if (match = /NokiaBrowser\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		NetFront
			 */
		
			if (ua.match('NetFront')) {
				this.browser.name = 'NetFront';

				if (match = /NetFront\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}
			
			/****************************************************
			 *		Silk
			 */
		
			if (ua.match('Silk')) {
				if (!ua.match('Playstation')) {
					this.browser.name = 'Silk';
	
					if (match = /Silk\/([0-9.]*)/.exec(ua)) {
						this.browser.version = new Version(match[1]);
					}
					
					this.device.manufacturer = 'Amazon';
					this.device.model = 'Kindle Fire';
					this.device.type = 'tablet';
					
					if (this.os.name != 'Android') {
						this.os.name = 'Android';
						this.os.version = null;
					}
				}
			}

			/****************************************************
			 *		QT
			 */
		
			if (ua.match('Qt')) {
				this.browser.stock = false;
				this.browser.name = 'Qt Browser';

				if (match = /Qt\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Dolfin
			 */
		
			if (ua.match('Dolfin')) {
				this.browser.name = 'Dolfin';

				if (match = /Dolfin\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Espial
			 */
		
			if (ua.match('Espial')) {
				this.browser.name = 'Espial';
				this.device.type = 'television';

				if (match = /Espial\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Others
			 */

			if (ua.match('Abrowser')) {
				this.browser.stock = false;
				this.browser.name = 'Abrowser';

				if (match = /Abrowser\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}			

			if (ua.match('arora')) {
				this.browser.stock = false;
				this.browser.name = 'Arora';

				if (match = /arora\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}			

			if (ua.match('Comodo_Dragon')) {
				this.browser.stock = false;
				this.browser.name = 'Comodo Dragon';

				if (match = /Comodo_Dragon\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('CoolNovo|CoolNovoChromePlus')) {
				this.browser.stock = false;
				this.browser.name = 'CoolNovo';

				if (match = /[CoolNovo|CoolNovoChromePlus]\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Epiphany')) {
				this.browser.stock = false;
				this.browser.name = 'Epiphany';

				if (match = /Epiphany\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Flock')) {
				this.browser.stock = false;
				this.browser.name = 'Flock';

				if (match = /Flock\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('IceCat')) {
				this.browser.stock = false;
				this.browser.name = 'IceCat';

				if (match = /IceCat ([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Iron')) {
				this.browser.stock = false;
				this.browser.name = 'Iron';

				if (match = /Iron\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Lunascape')) {
				this.browser.stock = false;
				this.browser.name = 'Lunascape';

				if (match = /Lunascape\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Maxthon')) {
				this.browser.stock = false;
				this.browser.name = 'Maxthon';

				if (match = /Maxthon\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Midori')) {
				this.browser.stock = false;
				this.browser.name = 'Midori';

				if (match = /Midori\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}
			
			if (ua.match('MQQBrowser')) {
				this.browser.stock = false;
				this.browser.name = 'QQ Browser';

				if (match = /MQQBrowser\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}			

			if (ua.match(/Obigo/i)) {
				this.browser.name = 'Obigo';

				if (match = /Obigo\/([0-9.]*)/i.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}

				if (match = /Obigo\/([A-Z])([0-9.]*)/i.exec(ua)) {
					this.browser.name = 'Obigo ' + match[1];
					this.browser.version = new Version(match[2]);
				}
			}

			if (ua.match('PaleMoon')) {
				this.browser.stock = false;
				this.browser.name = 'PaleMoon';

				if (match = /PaleMoon\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('QupZilla')) {
				this.browser.stock = false;
				this.browser.name = 'QupZilla';

				if (match = /QupZilla\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}
			
			if (ua.match('Raven for Mac')) {
				this.browser.stock = false;
				this.browser.name = 'Raven';

				if (match = /Raven for Mac\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('rekonq')) {
				this.browser.stock = false;
				this.browser.name = 'Rekonq';
			}

			if (ua.match('RockMelt')) {
				this.browser.stock = false;
				this.browser.name = 'RockMelt';

				if (match = /RockMelt\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('Skyfire')) {
				this.browser.stock = false;
				this.browser.name = 'Skyfire';

				if (match = /Skyfire\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			if (ua.match('UCWEB')) {
				this.browser.stock = false;
				this.browser.name = 'UC Web';

				if (match = /UCWEB([0-9]*[.][0-9]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}

				if (this.os.name == 'Linux') {
					this.os.name = '';
				}
			}

			if (ua.match('Valve Steam')) {
				this.browser.stock = false;
				this.browser.name = 'Valve Steam';
			}

			if (ua.match('WebPositive')) {
				this.browser.stock = true;
				this.browser.name = 'WebPositive';

				if (match = /WebPositive\/([0-9.]*)/.exec(ua)) {
					this.browser.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		WebKit
			 */
	
			if (match = /AppleWebKit\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'Webkit';
				this.engine.version = new Version(match[1]);
			}

			/****************************************************
			 *		KHTML
			 */
		
			if (match = /KHTML\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'KHTML';
				this.engine.version = new Version(match[1]);
			}

			/****************************************************
			 *		Gecko
			 */
		
			if (match = /Gecko\//.exec(ua)) {
				this.engine.name = 'Gecko';
				
				if (match = /; rv:([^\)]+)\)/.exec(ua)) {
					this.engine.version = new Version(match[1]);
				}
			}

			/****************************************************
			 *		Presto
			 */
		
			if (match = /Presto\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'Presto';
				this.engine.version = new Version(match[1]);
			}

			/****************************************************
			 *		Trident
			 */
		
			if (match = /Trident\/([0-9.]*)/.exec(ua)) {
				this.engine.name = 'Trident';
				this.engine.version = new Version(match[1]);
				
				if (this.browser.name == 'Internet Explorer') {
					if (parseVersion(this.engine.version) == 6 && parseFloat(this.browser.version) < 10) {
						this.browser.version = new Version('10.0');
						this.browser.mode = 'compat';
					}

					if (parseVersion(this.engine.version) == 5 && parseFloat(this.browser.version) < 9) {
						this.browser.version = new Version('9.0');
						this.browser.mode = 'compat';
					}

					if (parseVersion(this.engine.version) == 4 && parseFloat(this.browser.version) < 8) {
						this.browser.version = new Version('8.0');
						this.browser.mode = 'compat';
					}
				}

				if (this.os.name == 'Windows Phone') {
					if (parseVersion(this.engine.version) == 5 && parseFloat(this.os.version) < 7.5) {
						this.os.version = new Version('7.5');
						this.browser.mode = 'desktop';
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
			
			if (this.os.name == 'iOS' && this.browser.name == 'Safari') {
				this.browser.version = null;
			}

		},
		
		toString: function() {
			var browser = '' + (this.browser.name ? this.browser.name + (this.browser.version ? ' ' + this.browser.version : '') : '');
			var os = '' + (this.os.name ? this.os.name + (this.os.version ? ' ' + this.os.version : '') : '');
			var device = '' + (typeof this.device.manufacturer != 'undefined' ? this.device.manufacturer + ' ' : '') + (typeof this.device.model != 'undefined' ? this.device.model + ' ' : '');
		
			if (browser && os && device) {
				return browser + ' on a ' + device + ' running ' + os;
			}
		
			else if (browser && os && !device) {
				return browser + ' on ' + os;
			}
		
			else if (!browser && os && device) {
				return 'a ' + device + ' running ' + os;
			}
		
			else if (browser && !os && !device) {
				return browser;
			}
		
			else if (!browser && !os && device) {
				return 'a ' + device;
			}
		
			else {
				return 'an unknown browser';
			}
		}
	};

	function cleanupModel(s) {
		s = s.replace(/_/g, " ");
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

