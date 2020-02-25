<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191211235502 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE movies_list_movie DROP FOREIGN KEY FK_953B8C9AF1D51DCC');
        $this->addSql('ALTER TABLE movies_list_user DROP FOREIGN KEY FK_E0B7C591F1D51DCC');
        $this->addSql('DROP TABLE movies_list');
        $this->addSql('DROP TABLE movies_list_movie');
        $this->addSql('DROP TABLE movies_list_user');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE movies_list (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, creation_date DATE DEFAULT NULL, last_modified DATE DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE movies_list_movie (movies_list_id INT NOT NULL, movie_id INT NOT NULL, INDEX IDX_953B8C9A8F93B6FC (movie_id), INDEX IDX_953B8C9AF1D51DCC (movies_list_id), PRIMARY KEY(movies_list_id, movie_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE movies_list_user (movies_list_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_E0B7C591A76ED395 (user_id), INDEX IDX_E0B7C591F1D51DCC (movies_list_id), PRIMARY KEY(movies_list_id, user_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE movies_list_movie ADD CONSTRAINT FK_953B8C9A8F93B6FC FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movies_list_movie ADD CONSTRAINT FK_953B8C9AF1D51DCC FOREIGN KEY (movies_list_id) REFERENCES movies_list (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movies_list_user ADD CONSTRAINT FK_E0B7C591A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movies_list_user ADD CONSTRAINT FK_E0B7C591F1D51DCC FOREIGN KEY (movies_list_id) REFERENCES movies_list (id) ON DELETE CASCADE');
    }
}
