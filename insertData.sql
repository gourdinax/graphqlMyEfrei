INSERT INTO `parcours` (`idParcours`, `nomParcours`) VALUES
(1, 'Dev Manager Full Stack'),
(2, 'Sécurité');

INSERT INTO `matieres` (`idMatieres`, `nomMatieres`) VALUES
(1, 'GraphQl'),
(2, 'Communication'),
(3, 'Anglais');


INSERT INTO `formateurs` (`idFormateurs`, `nomFormateurs`, `prenomFormateurs`) VALUES
(1, 'Bissor', 'Melvin'),
(2, 'Bendenoun', 'Ethan'),
(3, 'Sharma', 'Nupur');

INSERT INTO `classes` (`idClasses`, `nomClasses`, `idParcours`) VALUES
(1, 'DEV-2', 1),
(2, 'SECU-1', 2),
(3, 'DEV-1', 1);

INSERT INTO `eleves` (`idEleves`, `nomEleves`, `prenomEleves`, `idClasses`) VALUES
(3, 'Poisson', 'Hyacinthe', 2),
(4, 'Jova', 'Thomas', 3),
(5, 'Codomier', 'Corentin', 3);

INSERT INTO `notes` (`idNotes`, `note`, `idMatieres`, `idEleves`) VALUES
(3, 12, 2, 3),
(4, 13, 1, 4),
(5, 14, 3, 5);

INSERT INTO `cours` (`idCours`, `idFormateurs`, `idMatieres`, `dateDebut`, `dateFin`, `lieu`) VALUES
(1, 1, 1, '2023-02-20 14:30:00.000', '2023-02-20 17:30:00.000', 'Monod -  707'),
(2, 2, 2, '2024-01-01 00:00:00.000', '2024-01-01 00:00:00.000', 'Gorki - K013'),
(3, 3, 3, '2025-01-01 00:00:00.000', '2025-01-01 00:00:00.000', 'Gorki - K003');

INSERT INTO `_classestocours` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 1);

INSERT INTO `_matierestoparcours` (`A`, `B`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2);
