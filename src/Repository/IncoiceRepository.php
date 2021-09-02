<?php

namespace App\Repository;

use App\Entity\Incoice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Incoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Incoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Incoice[]    findAll()
 * @method Incoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IncoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Incoice::class);
    }

    // /**
    //  * @return Incoice[] Returns an array of Incoice objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Incoice
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
