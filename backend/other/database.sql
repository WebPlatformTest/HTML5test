CREATE TABLE `browserCompanies` (
  `id` varchar(24) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `browserDevices` (
  `id` char(24) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `browserFamilies` (
  `id` char(24) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `browserPlatforms` (
  `id` char(24) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `browserVariants` (
  `id` char(24) NOT NULL DEFAULT '',
  `name` varchar(128) DEFAULT NULL,
  `nickname` varchar(128) DEFAULT NULL,
  `company` varchar(128) DEFAULT NULL,
  `importance` int(2) DEFAULT '0',
  `kind` varchar(128) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL,
  `family` char(24) DEFAULT NULL,
  `platforms` varchar(128) DEFAULT NULL,
  `devices` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `browserVersions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `variant` varchar(32) DEFAULT NULL,
  `version` varchar(32) DEFAULT NULL,
  `grouped` varchar(128) DEFAULT NULL,
  `nickname` varchar(128) DEFAULT NULL,
  `details` varchar(128) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `release` date DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `listed` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `variant_version_type` (`variant`,`version`,`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=utf8;

CREATE TABLE `fingerprints` (
  `fingerprint` char(32) NOT NULL DEFAULT '',
  `version` tinyint(3) NOT NULL DEFAULT '0',
  `score` smallint(3) NOT NULL DEFAULT '0',
  `maximum` smallint(3) NOT NULL DEFAULT '0',
  `points` varchar(512) NOT NULL DEFAULT '',
  `results` varchar(10240) NOT NULL DEFAULT '',
  PRIMARY KEY (`fingerprint`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `indices` (
  `fingerprint` char(32) NOT NULL DEFAULT '',
  `score` int(11) NOT NULL,
  `humanReadable` char(128) NOT NULL DEFAULT '',
  `browserName` char(64) NOT NULL,
  `browserVersion` char(20) NOT NULL,
  `engineName` char(60) NOT NULL,
  `engineVersion` char(20) NOT NULL,
  `osName` char(64) NOT NULL,
  `osVersion` char(20) NOT NULL,
  `deviceManufacturer` char(60) NOT NULL,
  `deviceModel` char(64) NOT NULL,
  `deviceType` char(16) NOT NULL,
  `timestamp` datetime NOT NULL,
  `uniqueid` char(20) NOT NULL,
  PRIMARY KEY (`fingerprint`,`humanReadable`),
  KEY `timestamp` (`timestamp`) USING BTREE,
  KEY `browser` (`browserName`,`browserVersion`) USING BTREE,
  KEY `os` (`osName`,`osVersion`) USING BTREE,
  KEY `engine` (`engineName`,`engineVersion`) USING BTREE,
  KEY `device` (`deviceManufacturer`,`deviceModel`) USING BTREE,
  KEY `deviceModel` (`deviceModel`) USING BTREE,
  FULLTEXT KEY `humanReadable` (`humanReadable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `results` (
  `version` varchar(8) CHARACTER SET latin1 NOT NULL,
  `revision` int(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(16) CHARACTER SET latin1 NOT NULL,
  `uniqueid` varchar(20) CHARACTER SET latin1 NOT NULL,
  `score` int(11) NOT NULL,
  `maximum` int(11) NOT NULL DEFAULT '0',
  `browserName` varchar(64) CHARACTER SET latin1 NOT NULL,
  `browserChannel` varchar(20) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `browserVersion` varchar(20) CHARACTER SET latin1 NOT NULL,
  `browserVersionType` varchar(20) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `browserVersionMajor` varchar(8) CHARACTER SET latin1 NOT NULL DEFAULT '' COMMENT '		',
  `browserVersionMinor` varchar(8) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `browserVersionOriginal` varchar(20) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `browserMode` varchar(8) CHARACTER SET latin1 NOT NULL,
  `engineName` varchar(60) CHARACTER SET latin1 NOT NULL,
  `engineVersion` varchar(20) CHARACTER SET latin1 NOT NULL,
  `osName` varchar(64) CHARACTER SET latin1 NOT NULL,
  `osVersion` varchar(20) CHARACTER SET latin1 NOT NULL,
  `deviceManufacturer` varchar(60) CHARACTER SET latin1 NOT NULL,
  `deviceModel` varchar(64) CHARACTER SET latin1 NOT NULL,
  `deviceWidth` int(11) NOT NULL DEFAULT '0',
  `deviceHeight` int(11) NOT NULL DEFAULT '0',
  `deviceType` varchar(16) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `deviceIdentified` int(11) NOT NULL DEFAULT '0',
  `useragent` text CHARACTER SET latin1 NOT NULL,
  `useragentHeader` text NOT NULL,
  `useragentId` char(32) NOT NULL DEFAULT '',
  `humanReadable` varchar(128) CHARACTER SET latin1 DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `camouflage` int(11) DEFAULT NULL,
  `features` varchar(64) NOT NULL DEFAULT '',
  `headers` text NOT NULL,
  `fingerprint` varchar(32) NOT NULL DEFAULT '',
  `points` text,
  `results` text,
  PRIMARY KEY (`uniqueid`),
  UNIQUE KEY `uniqueid` (`uniqueid`),
  KEY `timestamp` (`timestamp`) USING BTREE,
  KEY `useragent` (`useragent`(20)) USING BTREE,
  KEY `version` (`version`,`revision`) USING BTREE,
  KEY `fingerprint` (`fingerprint`) USING BTREE,
  KEY `useragentHeader` (`useragentHeader`(20)) USING BTREE,
  KEY `useragentId` (`useragentId`) USING BTREE,
  KEY `osName` (`osName`) USING BTREE,
  KEY `osVersion` (`osVersion`) USING BTREE,
  KEY `browserName` (`browserName`) USING BTREE,
  KEY `deviceManufacturerModel` (`deviceManufacturer`,`deviceModel`) USING BTREE,
  KEY `deviceModel` (`deviceModel`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `scores` (
  `variant` varchar(32) DEFAULT NULL,
  `version` varchar(32) DEFAULT NULL,
  `release` decimal(5,2) DEFAULT '0.00',
  `fingerprint` char(32) DEFAULT NULL,
  UNIQUE KEY `variant_version_release` (`variant`,`version`,`release`) USING BTREE,
  KEY `fingerprint` (`fingerprint`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;