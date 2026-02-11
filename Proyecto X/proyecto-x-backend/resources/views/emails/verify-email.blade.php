<!DOCTYPE html>
<html>
<head>
    <title>Verificación de correo</title>
</head>
<body>
    <h1>Hola {{ $name }},</h1>
    <p>Gracias por registrarte en Proyecto X.</p>
    <p>Tu código de verificación es:</p>
    <h2 style="font-size: 32px; letter-spacing: 8px; text-align: center;">{{ $code }}</h2>
    <p>Este código expira en 10 minutos.</p>
    <p>Si no solicitaste esto, ignora el mensaje.</p>
</body>
</html>