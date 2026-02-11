<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class VerifyEmailMail extends Mailable
{
    public string $name;
    public string $code;

    public function __construct(string $name, string $code)
    {
        $this->name = $name;
        $this->code = $code;
    }

    public function build()
    {
        return $this
            ->subject('Verifica tu correo – Proyecto X')
            ->view('emails.verify-email')
            ->with([
                'name' => $this->name,
                'code' => $this->code,
            ]);
    }
}
