CREATE DATABASE users;
use users;

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO user (username,email,password) VALUES ("ulmaa","ulmaaulambayar4@gmail.com","301da5a689d8430eaa67b92458d78497b39e3ecfece1ffe5643c9965")