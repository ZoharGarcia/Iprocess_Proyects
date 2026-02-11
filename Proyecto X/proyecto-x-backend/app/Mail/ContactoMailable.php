<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactoMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $datos; // Puedes pasar datos desde el controlador

    public function __construct($datos = [])
    {
        $this->datos = $datos;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuevo mensaje de contacto',
        );
    }



    public function content(): Content
    {
        return new Content(
            view: 'emails.contacto',   // la vista Blade que crearás
            // text: 'emails.contacto-text',  // versión texto plano (opcional)
        );
    }

    // Opcional: adjuntos, tags, etc.
}