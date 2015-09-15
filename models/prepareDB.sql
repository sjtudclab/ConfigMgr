CREATE DATABASE IF NOT EXISTS `server`;

CREATE TABLE IF NOT EXISTS `community` (
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


