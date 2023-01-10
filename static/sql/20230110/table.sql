-- fq.tms_essay definition

CREATE TABLE `tms_essay` (
                           `id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
                           `source_id` int NOT NULL COMMENT '新闻源id',
                           `essay_url` varchar(500) COLLATE utf8mb4_general_ci NOT NULL COMMENT '原文链接',
                           `title_zh` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
                           `title_en` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
                           `tags` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标签',
                           `publish_time` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发布时间',
                           `head_img` varchar(512) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '主图图片',
                           `imgs` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '所有图片',
                           `introduce_zh` text COLLATE utf8mb4_general_ci COMMENT '介绍',
                           `introduce_en` text COLLATE utf8mb4_general_ci COMMENT '介绍',
                           `type_id` int NOT NULL COMMENT '类型id',
                           `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                           `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                           `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文';


-- fq.tms_essay_section definition

CREATE TABLE `tms_essay_section` (
                                   `id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
                                   `essay_id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '译文ID',
                                   `section_order` int NOT NULL COMMENT '序号',
                                   `section_type` int NOT NULL COMMENT '段落类型(图片,文字)',
                                   `content` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
                                   `trans_content` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '翻译内容',
                                   `is_strong` int NOT NULL COMMENT '是否加强',
                                   `pic_caption` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '图片说明',
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文段落';


-- fq.tms_mapping definition

CREATE TABLE `tms_mapping` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `source_id` int NOT NULL COMMENT '来源',
                             `title` varchar(126) COLLATE utf8mb4_general_ci NOT NULL COMMENT '译文标题',
                             `publish_time` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '译文发布时间',
                             `head_img` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '译文主图',
                             `tags` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '译文标签',
                             `content` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '译文主体内容',
                             `text_type` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文本类型',
                             `text_content` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文本内容',
                             `img_type` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片类型',
                             `img_url` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片链接',
                             `img_caption` varchar(126) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片说明',
                             `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                             `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                             `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文字段映射';


-- fq.tms_source definition

CREATE TABLE `tms_source` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `name_zh` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称中文',
                            `name_en` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称英文',
                            `description` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '简介',
                            `cover_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面图片',
                            `official_website` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '官网地址',
                            `official_website_short` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '官网地址简写',
                            `type_id` int NOT NULL COMMENT '类型id',
                            `legal_flag` int NOT NULL DEFAULT '0' COMMENT '是否反华',
                            `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                            `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                            `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文来源';


-- fq.tms_source_type definition

CREATE TABLE `tms_source_type` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `type_name` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
                                 `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                                 `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                 `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='来源类型';


-- fq.tms_spider_link definition

CREATE TABLE `tms_spider_link` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `source_id` int NOT NULL COMMENT '来源',
                                 `url` varchar(64) COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
                                 `prefix` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '前缀',
                                 `type_id` int NOT NULL COMMENT '类型id',
                                 `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                                 `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                 `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文可爬链接';


-- fq.tms_spider_tag definition

CREATE TABLE `tms_spider_tag` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `source_id` int NOT NULL COMMENT '新闻源id',
                                `link_id` int NOT NULL COMMENT '链接id',
                                `mapping_id` int NOT NULL COMMENT '映射id',
                                `type_id` int NOT NULL COMMENT '类型id',
                                `tag` varchar(248) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签',
                                `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='译文可爬标签';


-- fq.tms_spider_url definition

CREATE TABLE `tms_spider_url` (
                                `id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
                                `source_id` int NOT NULL COMMENT '来源id',
                                `tag_id` int NOT NULL COMMENT '标签id',
                                `mapping_id` int NOT NULL COMMENT '映射id',
                                `url` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
                                `title` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
                                `title_zh` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
                                `type_id` int NOT NULL COMMENT '类型id',
                                `spider_flag` int NOT NULL DEFAULT '0' COMMENT '是否生成译文',
                                `del_flag` int NOT NULL DEFAULT '0' COMMENT '是否删除',
                                `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='已爬链接';
