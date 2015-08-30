# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 202.120.40.24 (MySQL 5.5.37-0ubuntu0.12.04.1-log)
# Database: community_server
# Generation Time: 2015-08-30 14:39:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table identification_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `identification_type`;

CREATE TABLE `identification_type` (
  `identification_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`identification_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `identification_type` WRITE;
/*!40000 ALTER TABLE `identification_type` DISABLE KEYS */;

INSERT INTO `identification_type` (`identification_type_id`, `type`, `description`)
VALUES
	(1,'居民身份证',NULL),
	(2,'普通护照',NULL),
	(3,'香港特别行政区护照',NULL),
	(4,'澳门特别行政区护照',NULL),
	(5,'台湾居民往来大陆通行证',NULL),
	(6,'港澳居民来往大陆通行证',NULL),
	(7,'其他证件',NULL);

/*!40000 ALTER TABLE `identification_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table information_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `information_type`;

CREATE TABLE `information_type` (
  `information_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`information_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `information_type` WRITE;
/*!40000 ALTER TABLE `information_type` DISABLE KEYS */;

INSERT INTO `information_type` (`information_type_id`, `type`, `desc`)
VALUES
	(1,'社区公告',NULL),
	(2,'社区活动',NULL),
	(3,'add_friend_apply','加好友申请'),
	(4,'friend_message','好友信息'),
	(5,'group_message','邻里圈信息'),
	(6,'circle_message','我的圈子信息');

/*!40000 ALTER TABLE `information_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table relation_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relation_type`;

CREATE TABLE `relation_type` (
  `relation_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`relation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `relation_type` WRITE;
/*!40000 ALTER TABLE `relation_type` DISABLE KEYS */;

INSERT INTO `relation_type` (`relation_type_id`, `type`, `desc`)
VALUES
	(1,'friend','好友关系'),
	(2,'circle','我的圈子关注关系');

/*!40000 ALTER TABLE `relation_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_type`;

CREATE TABLE `role_type` (
  `role_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`role_type_id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role_type` WRITE;
/*!40000 ALTER TABLE `role_type` DISABLE KEYS */;

INSERT INTO `role_type` (`role_type_id`, `type`)
VALUES
	(2,'业委会'),
	(5,'块长'),
	(1,'居委会'),
	(4,'居民'),
	(7,'普通党员'),
	(6,'楼组长'),
	(3,'物业');

/*!40000 ALTER TABLE `role_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table topic_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic_type`;

CREATE TABLE `topic_type` (
  `topic_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topic_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `topic_type` WRITE;
/*!40000 ALTER TABLE `topic_type` DISABLE KEYS */;

INSERT INTO `topic_type` (`topic_type_id`, `name`)
VALUES
	(1,'民议广场');

/*!40000 ALTER TABLE `topic_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_type`;

CREATE TABLE `user_type` (
  `user_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `table_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;

INSERT INTO `user_type` (`user_type_id`, `type`, `table_name`)
VALUES
	(1,'management','citizen_management'),
	(2,'service','citizen_service'),
	(3,'resident','citizen_resident');

/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
