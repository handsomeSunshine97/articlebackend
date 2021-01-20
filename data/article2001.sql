/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : article2001

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-01-19 17:04:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT '' COMMENT '文章标题',
  `content` text COMMENT '文章内容',
  `cat_id` int(11) DEFAULT '0' COMMENT '文章所属分类',
  `author` varchar(100) DEFAULT '' COMMENT '发布作者',
  `
cover` varchar(200) DEFAULT '' COMMENT '文章的封面',
  `status` tinyint(4) DEFAULT NULL COMMENT '文章状态 0-未发布 1-已发布  2-审核中 ',
  `publish_date` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`art_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '' COMMENT '分类名称',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `add_date` datetime DEFAULT NULL COMMENT '分类的添加时间',
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT '' COMMENT '用户名',
  `password` char(32) DEFAULT '' COMMENT '密码',
  `avatar` varchar(200) DEFAULT '' COMMENT '头像图片的路径',
  `last_login_date` datetime DEFAULT NULL COMMENT '上一次登录时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
