# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 202.120.40.24 (MySQL 5.5.37-0ubuntu0.12.04.1-log)
# Database: community_server
# Generation Time: 2015-08-29 13:57:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
# 初始化community表
# ------------------------------------------------------------
DROP TABLE IF EXISTS `community`;

CREATE TABLE `community` (
	`community_id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(128) NOT NULL,
	`province_city_area` varchar(256) NOT NULL,
	`address` varchar(256) DEFAULT NULL,
	`db_host` varchar(128) NOT NULL,
	`db_user` varchar(128) NOT NULL,
	`db_password` varchar(128) NOT NULL,
	`db_port` varchar(10) NOT NULL,
	`db_name` varchar(128) NOT NULL,
	PRIMARY KEY (`community_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table apartment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `apartment`;

CREATE TABLE `apartment` (
  `apartment_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `serial_number` varchar(45) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  `area` float(20,2) DEFAULT NULL,
  PRIMARY KEY (`apartment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table attachment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attachment`;

CREATE TABLE `attachment` (
  `attachment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table building
# ------------------------------------------------------------

DROP TABLE IF EXISTS `building`;

CREATE TABLE `building` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`building_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table card
# ------------------------------------------------------------

DROP TABLE IF EXISTS `card`;

CREATE TABLE `card` (
  `card_id` varchar(255) NOT NULL,
  `card_owner` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL COMMENT '以分为计量单位的整数值',
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table citizen_management
# ------------------------------------------------------------

DROP TABLE IF EXISTS `citizen_management`;

CREATE TABLE `citizen_management` (
  `citizen_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `identification_type` varchar(255) DEFAULT NULL,
  `identification_value` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`citizen_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `citizen_management_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table citizen_resident
# ------------------------------------------------------------

DROP TABLE IF EXISTS `citizen_resident`;

CREATE TABLE `citizen_resident` (
  `citizen_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `identification_type` varchar(45) DEFAULT NULL,
  `identification_value` varchar(45) DEFAULT NULL,
  `marriage_status` varchar(45) DEFAULT NULL,
  `employment_status` varchar(45) DEFAULT NULL,
  `residence_category` varchar(45) DEFAULT NULL,
  `resident_status` varchar(45) DEFAULT NULL,
  `education_status` varchar(45) DEFAULT NULL,
  `politics_status` varchar(45) DEFAULT NULL,
  `migration_status` varchar(45) DEFAULT NULL,
  `income_status` varchar(45) DEFAULT NULL,
  `nation` varchar(45) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `relationship` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `apartment_id` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`citizen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table citizen_service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `citizen_service`;

CREATE TABLE `citizen_service` (
  `citizen_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `identification_type` varchar(255) DEFAULT NULL,
  `identification_value` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`citizen_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `citizen_service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table device
# ------------------------------------------------------------

DROP TABLE IF EXISTS `device`;

CREATE TABLE `device` (
  `device_id` varchar(255) NOT NULL,
  `device_type` varchar(255) NOT NULL,
  `public_key` varchar(512) NOT NULL,
  `private_key` varchar(512) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `mac_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  `group_id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table identification_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `identification_type`;

CREATE TABLE `identification_type` (
  `identification_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`identification_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table information
# ------------------------------------------------------------

DROP TABLE IF EXISTS `information`;

CREATE TABLE `information` (
  `information_id` bigint(64) NOT NULL AUTO_INCREMENT,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `content` text,
  `title` varchar(200) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  `information_type` int(11) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table information_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `information_type`;

CREATE TABLE `information_type` (
  `information_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`information_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table livingcard
# ------------------------------------------------------------

DROP TABLE IF EXISTS `livingcard`;

CREATE TABLE `livingcard` (
  `livingcard_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `house_number` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`livingcard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table mailbox
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mailbox`;

CREATE TABLE `mailbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(45) DEFAULT NULL,
  `to` varchar(45) DEFAULT NULL,
  `submited_date` varchar(45) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table merchant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `merchant`;

CREATE TABLE `merchant` (
  `merchant_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `merchant_name` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`merchant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table netcard
# ------------------------------------------------------------

DROP TABLE IF EXISTS `netcard`;

CREATE TABLE `netcard` (
  `netcard_id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `commuity_user_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`netcard_id`),
  KEY `user_ibfk_2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table partycard
# ------------------------------------------------------------

DROP TABLE IF EXISTS `partycard`;

CREATE TABLE `partycard` (
  `partycard_id` int(11) NOT NULL AUTO_INCREMENT,
  `relation` varchar(255) DEFAULT NULL,
  `party_branch` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `confirm_date` date DEFAULT NULL,
  `inspection_person` varchar(255) DEFAULT NULL,
  `application_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`partycard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `payment_id` varchar(255) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `card_id` varchar(255) NOT NULL COMMENT '卡号',
  `sum` int(11) NOT NULL COMMENT '以分为计量单位的整数值',
  `timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `balance` int(11) NOT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table relation_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relation_type`;

CREATE TABLE `relation_type` (
  `relation_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`relation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  KEY `role_type_id_idx` (`role_type_id`),
  CONSTRAINT `role_type_id` FOREIGN KEY (`role_type_id`) REFERENCES `role_type` (`role_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table role_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table role_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_type`;

CREATE TABLE `role_type` (
  `role_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`role_type_id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table second_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `second_goods`;

CREATE TABLE `second_goods` (
  `goods_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `imagePath` varchar(45) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tenement_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tenement_order`;

CREATE TABLE `tenement_order` (
  `order_id` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_name` varchar(100) DEFAULT NULL,
  `order_address` varchar(100) DEFAULT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(45) DEFAULT NULL,
  `stage` varchar(10) DEFAULT NULL,
  `serve_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tenement_serve_form
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tenement_serve_form`;

CREATE TABLE `tenement_serve_form` (
  `order_id` varchar(100) DEFAULT NULL,
  `serve_id` int(11) DEFAULT NULL,
  `serve_record` varchar(200) DEFAULT NULL,
  `user_score` int(11) DEFAULT NULL,
  `user_comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tenement_service_application
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tenement_service_application`;

CREATE TABLE `tenement_service_application` (
  `serve_id` int(11) NOT NULL,
  `real_name` varchar(100) DEFAULT NULL,
  `certification` varchar(100) DEFAULT NULL,
  `serve_time` varchar(100) DEFAULT NULL,
  `contact_address` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `stage` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`serve_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tenement_serviceman_manage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tenement_serviceman_manage`;

CREATE TABLE `tenement_serviceman_manage` (
  `serve_id` int(11) NOT NULL,
  `stage` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`serve_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table topic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic`;

CREATE TABLE `topic` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `desc` varchar(255) DEFAULT NULL,
  `vote_count` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `topic_type_id` int(11) DEFAULT NULL,
  `parent_topic_id` int(11) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`topic_id`),
  KEY `topic_type_id` (`topic_type_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`topic_type_id`) REFERENCES `topic_type` (`topic_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table topic_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic_option`;

CREATE TABLE `topic_option` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table topic_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic_type`;

CREATE TABLE `topic_type` (
  `topic_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topic_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table topic_vote
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic_vote`;

CREATE TABLE `topic_vote` (
  `vote_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`vote_id`),
  KEY `topic_id` (`topic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `topic_vote_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`),
  CONSTRAINT `topic_vote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `enabled` bit(1) NOT NULL DEFAULT b'1',
  `note` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `identity_number` varchar(255) DEFAULT NULL,
  `card_id` varchar(255) DEFAULT NULL COMMENT '卡号',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `user_type_id_idx` (`user_type_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_group`;

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_love_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_love_goods`;

CREATE TABLE `user_love_goods` (
  `user_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `stage` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_publish_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_publish_goods`;

CREATE TABLE `user_publish_goods` (
  `user_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `stage` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_relation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_relation`;

CREATE TABLE `user_relation` (
  `user_relation_id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` bigint(11) DEFAULT NULL,
  `followed_id` bigint(11) DEFAULT NULL,
  `relation_type_id` int(11) NOT NULL,
  PRIMARY KEY (`user_relation_id`),
  KEY `relation_type_id` (`relation_type_id`),
  CONSTRAINT `user_relation_ibfk_1` FOREIGN KEY (`relation_type_id`) REFERENCES `relation_type` (`relation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `description_detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_type`;

CREATE TABLE `user_type` (
  `user_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `table_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table work_report
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_report`;

CREATE TABLE `work_report` (
  `work_report_id` int(11) NOT NULL AUTO_INCREMENT,
  `citizen_id` int(11) DEFAULT NULL,
  `report_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`work_report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
