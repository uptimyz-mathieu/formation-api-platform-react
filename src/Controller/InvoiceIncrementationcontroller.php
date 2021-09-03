<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;

class InvoiceIncrementationcontroller
{
    /**
     * @var ObjectManager
     */
    private $manager;

    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }
    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono() + 1);

        $this->manager->flush();

        return $data;
    }
}