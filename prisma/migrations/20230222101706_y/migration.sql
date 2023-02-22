-- CreateTable
CREATE TABLE `eleves` (
    `idEleves` INTEGER NOT NULL AUTO_INCREMENT,
    `nomEleves` VARCHAR(50) NOT NULL,
    `prenomEleves` VARCHAR(50) NOT NULL,
    `idClasses` INTEGER NULL,

    INDEX `idClasses`(`idClasses`),
    PRIMARY KEY (`idEleves`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formateurs` (
    `idFormateurs` INTEGER NOT NULL AUTO_INCREMENT,
    `nomFormateurs` VARCHAR(50) NOT NULL,
    `prenomFormateurs` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idFormateurs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matieres` (
    `idMatieres` INTEGER NOT NULL AUTO_INCREMENT,
    `nomMatieres` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idMatieres`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cours` (
    `idCours` INTEGER NOT NULL AUTO_INCREMENT,
    `idFormateurs` INTEGER NULL,
    `idMatieres` INTEGER NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `lieu` VARCHAR(191) NOT NULL,

    INDEX `idFormateurs`(`idFormateurs`),
    INDEX `idMatieres`(`idMatieres`),
    PRIMARY KEY (`idCours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parcours` (
    `idParcours` INTEGER NOT NULL AUTO_INCREMENT,
    `nomParcours` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idParcours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `idClasses` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClasses` VARCHAR(50) NOT NULL,
    `idParcours` INTEGER NULL,

    INDEX `idParcours`(`idParcours`),
    PRIMARY KEY (`idClasses`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `idNotes` INTEGER NOT NULL AUTO_INCREMENT,
    `note` DOUBLE NOT NULL,
    `idMatieres` INTEGER NOT NULL,
    `idEleves` INTEGER NOT NULL,

    INDEX `idMatieres`(`idMatieres`),
    INDEX `idEleves`(`idEleves`),
    PRIMARY KEY (`idNotes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_matieresToparcours` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_matieresToparcours_AB_unique`(`A`, `B`),
    INDEX `_matieresToparcours_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_classesTocours` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_classesTocours_AB_unique`(`A`, `B`),
    INDEX `_classesTocours_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eleves` ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`idClasses`) REFERENCES `classes`(`idClasses`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `matieres_ibfk_1` FOREIGN KEY (`idMatieres`) REFERENCES `matieres`(`idMatieres`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `formateurs_ibfk_1` FOREIGN KEY (`idFormateurs`) REFERENCES `formateurs`(`idFormateurs`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `parcours_ibfk_1` FOREIGN KEY (`idParcours`) REFERENCES `parcours`(`idParcours`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `matieres_ibfk_2` FOREIGN KEY (`idMatieres`) REFERENCES `matieres`(`idMatieres`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`idEleves`) REFERENCES `eleves`(`idEleves`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `_matieresToparcours` ADD CONSTRAINT `_matieresToparcours_A_fkey` FOREIGN KEY (`A`) REFERENCES `matieres`(`idMatieres`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_matieresToparcours` ADD CONSTRAINT `_matieresToparcours_B_fkey` FOREIGN KEY (`B`) REFERENCES `parcours`(`idParcours`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_classesTocours` ADD CONSTRAINT `_classesTocours_A_fkey` FOREIGN KEY (`A`) REFERENCES `classes`(`idClasses`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_classesTocours` ADD CONSTRAINT `_classesTocours_B_fkey` FOREIGN KEY (`B`) REFERENCES `cours`(`idCours`) ON DELETE CASCADE ON UPDATE CASCADE;
