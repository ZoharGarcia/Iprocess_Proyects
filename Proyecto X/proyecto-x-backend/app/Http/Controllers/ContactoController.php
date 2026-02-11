<?php

namespace App\Http\Controllers;

use App\Mail\ContactoMailable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactoController extends Controller
{
    public function enviar(Request $request): RedirectResponse
{
    $datos = $request->validate([
        'nombre'  => 'required|string|max:100',
        'email'   => 'required|email|max:255',
        'mensaje' => 'required|string|max:5000',
    ]);

    // CAMBIO AQUÍ: usa ->send() en vez de ->queue()
    Mail::to('admin@tudominio.com')->send(new ContactoMailable($datos));

    return back()->with('success', '¡Mensaje enviado correctamente! Te responderemos pronto.');
}
}