<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Mail\Mailable;

class VerifyEmailMail extends Mailable
{
    public User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

public function build()
{
    return $this
        ->from(config('mail.from.address'), config('mail.from.name'))
        ->subject('Código de verificación - Proyecto X')
        ->view('emails.verify-email')
        ->with([
            'user' => $this->user,
        ]);
}

}
