CREATE TABLE user_account (
id INT PRIMARY KEY AUTO_INCREMENT,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
date_creation TIMESTAMP NOT NULL DEFAULT NOW(),
street VARCHAR(500),
city VARCHAR(255),
zip_code VARCHAR(10),
country VARCHAR(100),
image VARCHAR(500),
description VARCHAR(1000),
is_artist BOOLEAN NOT NULL DEFAULT FALSE,
is_admin BOOLEAN NOT NULL DEFAULT FALSE,
confidentiality BOOLEAN NOT NULL DEFAULT TRUE
);
INSERT INTO user_account (firstname, lastname, email, password, street, city, zip_code, country, image, description, is_artist, is_admin, confidentiality)
VALUES 
("Abolfazl", "Eslami", "abolfazl@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "10 rue des Arts", "Paris", "75001", "France", "/abolfazl-eslami.webp", "Artiste peintre contemporain, Abolfazl Eslami explore les émotions humaines à travers des toiles vibrantes et colorées. Son travail, influencé par la dualité des tons chauds et froids, invite le spectateur à une réflexion profonde sur la condition humaine et la beauté de l'instant présent. Passionné par l'expérimentation, il mêle techniques traditionnelles et approches modernes pour créer des œuvres uniques et expressives.
", TRUE, FALSE, TRUE),
("Charles", "Chen", "charles@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "22 avenue du Louvre", "Lyon", "69000", "France", "/charles-chen.webp", "Photographe passionné, Charles Chen capture la poésie du quotidien à travers son objectif. Il aime jouer avec la lumière et les contrastes pour révéler la beauté cachée des scènes urbaines et naturelles. Son regard sensible et sa maîtrise technique lui permettent de transmettre des émotions fortes, faisant de chaque cliché une invitation au voyage et à la contemplation.
", TRUE, FALSE, TRUE),
("Georges", "Wells", "georges@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "5 place Bellecour", "Lille", "59000", "France", "/georges-wells.webp", "Peintre dans l'âme, Georges Wells s'inspire de ses rêveries et de ses réflexions sur le monde pour créer des œuvres empreintes de douceur et de profondeur. Son univers artistique, à la fois onirique et réaliste, explore les thèmes de la solitude, de la pensée et de l'introspection. Il cherche à toucher le spectateur en dévoilant la richesse de l'intériorité humaine à travers des portraits et des scènes évocatrices.
", TRUE, FALSE, TRUE),
("Jakob", "Owens", "jakob@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "8 rue des Bouquinistes", "Marseille", "13000", "France", "/jakob-owens.webp", "Photographe totalement impressionnant, Jakob Owens immortalise des instants de vie avec une sensibilité rare. Ses photographies, souvent prises lors de voyages ou de balades en pleine nature, témoignent de son amour pour les paysages grandioses et les ambiances lumineuses. Il excelle dans l'art de saisir la magie d'un moment fugace, offrant ainsi des images puissantes et inspirantes.
", TRUE, FALSE, TRUE),
("Mahdi", "Mad", "mahdi@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "12 chemin des Dunes", "Nantes", "44000", "France", "/mad-mahdi.webp", "Photographe hors pair, Mahdi Mad se distingue par son approche artistique audacieuse et sa recherche constante de nouveaux points de vue. Il aime explorer les contrastes, jouer avec les ombres et la lumière pour créer des compositions originales et percutantes. Son travail, à la fois technique et émotionnel, invite à porter un regard neuf sur le monde qui nous entoure.
", TRUE, FALSE, TRUE),
("Sema", "Martin", "sema@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "7 allée des Cyprès", "Toulouse", "31000", "France", "/sema-martin.webp", "Dessin = ma passion. Sema Martin est une artiste dont le trait délicat et précis donne vie à des univers empreints de poésie. Inspirée par la nature et les émotions humaines, elle réalise des dessins qui racontent des histoires et suscitent l'imaginaire. Son style, à la fois doux et expressif, séduit par sa capacité à transmettre des sentiments profonds à travers la simplicité du crayon.
", TRUE, FALSE, TRUE),
("Gisèle", "Thomas", "gisele@example.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "3 impasse des Érables", "Bordeaux", "33000", "France", NULL, NULL, FALSE, FALSE, TRUE),
("Admin", "User", "admin@creanova.com", "$argon2i$v=19$m=16,t=2,p=1$WlExTEVQNFpnSDFnbWFDSQ$H7cDIOY5G3T+cd/tQFYt+w", "1 rue de l'Admin", "Paris", "75000", "France", NULL, NULL, FALSE, TRUE, TRUE);



CREATE TABLE artwork (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL, 
description VARCHAR(2000),
price DECIMAL(10, 2) NOT NULL,
image VARCHAR(500),
is_validated BOOLEAN DEFAULT FALSE,
sold BOOLEAN DEFAULT FALSE,
date_creation TIMESTAMP NOT NULL DEFAULT NOW(),
user_account_id INT NOT NULL,
FOREIGN KEY (user_account_id) REFERENCES user_account(id) ON DELETE CASCADE
);
INSERT INTO artwork (title, description, price, image, is_validated, sold, user_account_id)
VALUES 
("Amour pluvieux", "Huile sur toile aux tons chauds/froids.", 250.00, "/illustrated-watercolor.webp", TRUE, FALSE, 1),
("Soleil Sombre", "Les deux grands masques de l'humanité.", 180.00, "/abstract-painting.webp", TRUE, FALSE, 1),
("Rainbow abstrait", "Composition sablée pure.", 210.00, "/abstract-rainbow.webp", TRUE, FALSE, 1),
("Silence lourd", "Melancolie.", 150.00, "/pexels-jc.webp", TRUE, FALSE, 2),
("Visage fleurie", "Photo prise de nuit à Paris.", 230.00, "/pexels-cihan.webp", TRUE, FALSE, 2),
("Naissance", "Naissance nature.", 190.00, "/pexels-caiquethecreator.webp", TRUE, FALSE, 2),
("Rêverie", "Personnage plongé dans ses pensées.", 170.00, "/240_F_1.webp", TRUE, FALSE, 3),
("Pensive", "Personnage plongé dans l'abîme du sort de ce monde.", 140.00, "/240_F_12.webp", TRUE, FALSE, 3),
("Ensoleillé", "Plongée dans des tonalités sombres et contrastées, L'Éclipse Intérieure explore le tumulte de l'âme face à ses propres zones d'ombre. Entre abstraction et figuration, cette œuvre invite à un voyage introspectif, où la lumière peine à percer un voile dense de matières texturées. Le cercle central, obscurci comme une lune cachée, symbolise le cœur de l'émotion humaine, partiellement voilé mais toujours vibrant. Une peinture qui questionne l'équilibre fragile entre clarté et obscurité, entre surface et profondeur.", 195.00, "/240_F2.webp", TRUE, FALSE, 3),
("Perte de vue", "Immortalisation avec couché de soleil.", 260.00, "/pexels-christian.webp", TRUE, FALSE, 4),
("Nature débordante", "Quand l'Homme est entouré de nature.", 300.00, "/pexels-freestockpro.webp", TRUE, FALSE, 4),
("Silence bleu", "Solitude sublime.", 240.00, "/pexels-pixabay.webp", TRUE, FALSE, 4),
("Contraste", "Jeu d'ombres et de lumière.", 160.00, "/pexels-souvenirpixels.webp", TRUE, FALSE, 5),
("Éclosion", "Plaine.", 220.00, "/pexels-akos.webp", TRUE, FALSE, 5),
("Naissance", "Capture Népalaise.", 180.00, "/img_5.webp", TRUE, FALSE, 5),
("Brume du matin", "Hymne à la vie.", 210.00, "/claudio-schwarz.webp", TRUE, FALSE, 6),
("Famille doré", "Rencontre pure.", 200.00, "/boston-public.webp", TRUE, FALSE, 6),
("Portrait lumineux", "Sérénité de la nature.", 250.00, "/jakub-durian.webp", TRUE, FALSE, 6),
("Oeil envoutant", "Regard profond.", 200.00, "/eyesdraw.webp", TRUE, FALSE, 6);


CREATE TABLE category (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
is_sub_cat BOOLEAN DEFAULT TRUE
);
INSERT INTO category (name, is_sub_cat)
VALUES
("Peinture", FALSE),
("Photographie", FALSE),
("Dessin", FALSE),
("Paysage", TRUE),
("Abstrait", TRUE),
("Portrait", TRUE),
("Street", TRUE),
("Sport", TRUE),
("Figuratif", TRUE),
("Ville", TRUE),
("Nature", TRUE),
("Réaliste", TRUE);

CREATE TABLE artwork_category (
category_id INT NOT NULL,
artwork_id INT NOT NULL,
PRIMARY KEY (category_id, artwork_id),
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);
INSERT INTO artwork_category (category_id, artwork_id)
VALUES
(4, 1), (1, 1), (7, 1), (10, 1),
(1, 2), (11, 2),
(1, 3), (6, 3),
(2, 4), (9, 4),
(2, 5), (6, 5),
(2, 6), (6, 6), (8, 6),
(1, 7), (6, 7),
(1, 8), (6, 8),
(1, 9), (6, 9),
(2, 10), (11, 10),
(2, 11), (11, 11),
(2, 12), (11, 12),
(2, 13), (11, 13),
(2, 14), (11, 14),
(2, 15), (11, 15),
(3, 16), (5, 16),
(3, 17), (4, 17),
(3, 18), (5 ,18),
(3,19), (12,19);


CREATE TABLE favorite (
user_account_id INT NOT NULL,
artwork_id INT NOT NULL,
PRIMARY KEY (user_account_id, artwork_id),
FOREIGN KEY (user_account_id) REFERENCES user_account(id) ON DELETE CASCADE,
FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);
INSERT INTO favorite (user_account_id, artwork_id)
VALUES
(2, 1),
(4, 7),
(6, 14);

CREATE TABLE purchase (
user_account_id INT NOT NULL,
artwork_id INT NOT NULL,
date TIMESTAMP NOT NULL DEFAULT NOW(), 
means_of_payment VARCHAR(55) NOT NULL,
payment_validated BOOLEAN DEFAULT FALSE,
PRIMARY KEY (user_account_id, artwork_id),
FOREIGN KEY (user_account_id) REFERENCES user_account(id) ON DELETE CASCADE,
FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);
INSERT INTO purchase (user_account_id, artwork_id, means_of_payment, payment_validated)
VALUES
(4, 1, "Credit Card", TRUE),
(6, 5, "Credit card", TRUE);

CREATE TABLE news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  image VARCHAR(500),
  text VARCHAR(3000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INT NOT NULL,
  FOREIGN KEY (created_by) REFERENCES user_account(id) ON DELETE CASCADE
);

CREATE TABLE event (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(500),
  text VARCHAR(3000) NOT NULL,
  date VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INT NOT NULL,
  FOREIGN KEY (created_by) REFERENCES user_account(id) ON DELETE CASCADE
);

INSERT INTO news (title, image, text, created_by)
VALUES (
  "Actualité", "/new-marche-nocturne.webp",
  "Le 27 octobre 2025, venez découvrir notre exposition d'aquarelle sur les marchés nocturnes de Lyon.",
  8
);

INSERT INTO event (title, image, text, date, created_by)
VALUES
  ("Rencontre avec M. Brioul", "/rencontre.webp", "Venez à la rencontre de M. Brioul pour échanger sur les techniques d'utilisations.", "2025-09-28", 8),
  ("Atelier découverte photo", "/event-photo.webp", "Un atelier découverte, pour apprendre les techniques de base de la photographie.", "2025-09-05", 8);