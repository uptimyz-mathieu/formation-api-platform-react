<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface {

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::POST_WRITE]
        ];
    }
    public function encodePassword(ViewEvent $event) {
        $result = $event->getControllerResult();
        //dd($result);

        $method = $event->getRequest()->getMethod(); //POST, GET, PUT ect...

        if($result instanceof User && $method === "POST") {
            $hash = $this->encoder->encodePassword($result, $result->setPassword());
            $result->setPassword($hash);
        }
    }
}