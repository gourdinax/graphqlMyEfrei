-- CreateTable
CREATE TABLE `_classesTocours` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_classesTocours_AB_unique`(`A`, `B`),
    INDEX `_classesTocours_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_classesTocours` ADD CONSTRAINT `_classesTocours_A_fkey` FOREIGN KEY (`A`) REFERENCES `classes`(`idClasses`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_classesTocours` ADD CONSTRAINT `_classesTocours_B_fkey` FOREIGN KEY (`B`) REFERENCES `cours`(`idCours`) ON DELETE CASCADE ON UPDATE CASCADE;
