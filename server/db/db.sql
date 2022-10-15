-- Customer Documents
CREATE TABLE `customer_documents` (
  `customer_documents_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(45) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `document_link` varchar(255) NOT NULL,
  `document_type` varchar(45) DEFAULT NULL,
  `document_size` int DEFAULT NULL,
  `folder_name` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_documents_id`,`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Folders

CREATE TABLE `user_folders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `folder_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Table

CREATE TABLE `users` (
  `id` int NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
