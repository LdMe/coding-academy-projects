<?php

namespace App\Repository;

use App\Entity\AddToFavorites;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method AddToFavorites|null find($id, $lockMode = null, $lockVersion = null)
 * @method AddToFavorites|null findOneBy(array $criteria, array $orderBy = null)
 * @method AddToFavorites[]    findAll()
 * @method AddToFavorites[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AddToFavoritesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AddToFavorites::class);
    }

    // /**
    //  * @return AddToFavorites[] Returns an array of AddToFavorites objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AddToFavorites
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
