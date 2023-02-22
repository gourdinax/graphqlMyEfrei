-- DropForeignKey
ALTER TABLE `eleves` DROP FOREIGN KEY `classes_ibfk_1`;

-- AlterTable
ALTER TABLE `eleves` MODIFY `idClasses` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `eleves` ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`idClasses`) REFERENCES `classes`(`idClasses`) ON DELETE SET NULL ON UPDATE RESTRICT;
