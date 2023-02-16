-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 16 fév. 2023 à 10:22
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myefrei`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `idClasses` int(11) NOT NULL,
  `nomClasses` varchar(50) NOT NULL,
  `idParcours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`idClasses`, `nomClasses`, `idParcours`) VALUES
(1, 'DEV-2', 1),
(2, 'SECU-1', 2),
(3, 'DEV-1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `idCours` int(11) NOT NULL,
  `idFormateurs` int(11) NOT NULL,
  `idMatieres` int(11) NOT NULL,
  `dateDebut` datetime(3) NOT NULL,
  `dateFin` datetime(3) NOT NULL,
  `lieu` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`idCours`, `idFormateurs`, `idMatieres`, `dateDebut`, `dateFin`, `lieu`) VALUES
(1, 1, 1, '2023-02-20 14:30:00.000', '2023-02-20 17:30:00.000', 'Monod -  707'),
(2, 2, 2, '1970-01-01 00:00:00.000', '1970-01-01 00:00:00.000', 'Gorki - K013'),
(3, 3, 3, '1970-01-01 00:00:00.000', '1970-01-01 00:00:00.000', 'Gorki - K003');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `idEleves` int(11) NOT NULL,
  `nomEleves` varchar(50) NOT NULL,
  `prenomEleves` varchar(50) NOT NULL,
  `idClasses` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`idEleves`, `nomEleves`, `prenomEleves`, `idClasses`) VALUES
(3, 'Poisson', 'Hyacinthe', 2),
(4, 'Jova', 'Thomas', 3),
(5, 'Codomier', 'Corentin', 3);

-- --------------------------------------------------------

--
-- Structure de la table `formateurs`
--

CREATE TABLE `formateurs` (
  `idFormateurs` int(11) NOT NULL,
  `nomFormateurs` varchar(50) NOT NULL,
  `prenomFormateurs` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formateurs`
--

INSERT INTO `formateurs` (`idFormateurs`, `nomFormateurs`, `prenomFormateurs`) VALUES
(1, 'Bissor', 'Melvin'),
(2, 'Bendenoun', 'Ethan'),
(3, 'Sharma', 'Nupur');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `idMatieres` int(11) NOT NULL,
  `nomMatieres` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`idMatieres`, `nomMatieres`) VALUES
(1, 'GraphQl'),
(2, 'Communication'),
(3, 'Anglais');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `idNotes` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  `idMatieres` int(11) NOT NULL,
  `idEleves` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`idNotes`, `note`, `idMatieres`, `idEleves`) VALUES
(3, 12, 2, 3),
(4, 13, 1, 4),
(5, 14, 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `parcours`
--

CREATE TABLE `parcours` (
  `idParcours` int(11) NOT NULL,
  `nomParcours` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `parcours`
--

INSERT INTO `parcours` (`idParcours`, `nomParcours`) VALUES
(1, 'Dev Manager Full Stack'),
(2, 'Sécurité');

-- --------------------------------------------------------

--
-- Structure de la table `_classestocours`
--

CREATE TABLE `_classestocours` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_classestocours`
--

INSERT INTO `_classestocours` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `_matierestoparcours`
--

CREATE TABLE `_matierestoparcours` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_matierestoparcours`
--

INSERT INTO `_matierestoparcours` (`A`, `B`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0824ef4b-e9ab-44f6-9872-df3228f3079b', '147789295be62ab7378a4bbdcf347e6440af403833dd946a18b77df3c6676791', '2023-02-01 15:02:34.217', '20230201150233_first_migration', NULL, NULL, '2023-02-01 15:02:33.672', 1),
('5cf28f7e-8a5d-4705-9b4c-e65774ba82aa', '48527b2a3fe70c9980da1ee897ccb0bcac3166cfab52e633f77bd196e8b401b4', '2023-02-03 12:38:09.513', '20230203123808_', NULL, NULL, '2023-02-03 12:38:08.958', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`idClasses`),
  ADD KEY `idParcours` (`idParcours`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`idCours`),
  ADD KEY `idFormateurs` (`idFormateurs`),
  ADD KEY `idMatieres` (`idMatieres`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`idEleves`),
  ADD KEY `idClasses` (`idClasses`);

--
-- Index pour la table `formateurs`
--
ALTER TABLE `formateurs`
  ADD PRIMARY KEY (`idFormateurs`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`idMatieres`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`idNotes`),
  ADD KEY `idMatieres` (`idMatieres`),
  ADD KEY `idEleves` (`idEleves`);

--
-- Index pour la table `parcours`
--
ALTER TABLE `parcours`
  ADD PRIMARY KEY (`idParcours`);

--
-- Index pour la table `_classestocours`
--
ALTER TABLE `_classestocours`
  ADD UNIQUE KEY `_classesTocours_AB_unique` (`A`,`B`),
  ADD KEY `_classesTocours_B_index` (`B`);

--
-- Index pour la table `_matierestoparcours`
--
ALTER TABLE `_matierestoparcours`
  ADD UNIQUE KEY `_matieresToparcours_AB_unique` (`A`,`B`),
  ADD KEY `_matieresToparcours_B_index` (`B`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `idClasses` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `idCours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `idEleves` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `formateurs`
--
ALTER TABLE `formateurs`
  MODIFY `idFormateurs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `idMatieres` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `idNotes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `parcours`
--
ALTER TABLE `parcours`
  MODIFY `idParcours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `parcours_ibfk_1` FOREIGN KEY (`idParcours`) REFERENCES `parcours` (`idParcours`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `formateurs_ibfk_1` FOREIGN KEY (`idFormateurs`) REFERENCES `formateurs` (`idFormateurs`),
  ADD CONSTRAINT `matieres_ibfk_1` FOREIGN KEY (`idMatieres`) REFERENCES `matieres` (`idMatieres`) ON DELETE CASCADE;

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`idClasses`) REFERENCES `classes` (`idClasses`);

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`idEleves`) REFERENCES `eleves` (`idEleves`) ON DELETE CASCADE,
  ADD CONSTRAINT `matieres_ibfk_2` FOREIGN KEY (`idMatieres`) REFERENCES `matieres` (`idMatieres`) ON DELETE CASCADE;

--
-- Contraintes pour la table `_classestocours`
--
ALTER TABLE `_classestocours`
  ADD CONSTRAINT `_classesTocours_A_fkey` FOREIGN KEY (`A`) REFERENCES `classes` (`idClasses`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_classesTocours_B_fkey` FOREIGN KEY (`B`) REFERENCES `cours` (`idCours`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `_matierestoparcours`
--
ALTER TABLE `_matierestoparcours`
  ADD CONSTRAINT `_matieresToparcours_A_fkey` FOREIGN KEY (`A`) REFERENCES `matieres` (`idMatieres`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_matieresToparcours_B_fkey` FOREIGN KEY (`B`) REFERENCES `parcours` (`idParcours`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
