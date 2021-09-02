<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;



class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */

    private $encoder;

    public function  __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for($u = 0; $u < 10; $u++) {
            $user = new User();

            $chrono = 1;

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setPassword($hash);

            $manager->persist($user);

            for($c = 0; $c < mt_rand(5, 20); $c++) {
                $customer = new Customer();
                $customer->setFirstName($faker->firstName);
                $customer->setLastName($faker->lastName);
                $customer->setCompany($faker->company);
                $customer->setEmail($faker->email);
                $customer->setUser($user);


                $manager->persist($customer);

                for($i = 0; $i < mt_rand(3, 10); $i++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000));
                    $invoice->setSentAt($faker->dateTimeBetween('-6 months'));
                    $invoice->setStatus($faker->randomElement(['SEND', 'PAID', 'CANCELLED']));
                    $invoice->setCustomer($customer);
                    $invoice->setChrono($chrono);

                    $chrono++;

                    $manager->persist($invoice);
                }
            }
        }
        $manager->flush();
    }
}
