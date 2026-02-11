<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuevo contacto</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #2c3e50;">¡Nuevo mensaje de contacto!</h1>
    
    <p><strong>Nombre:</strong> {{ $datos['nombre'] ?? 'No especificado' }}</p>
    <p><strong>Email:</strong> {{ $datos['email'] ?? '' }}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space: pre-wrap;">{{ $datos['mensaje'] ?? '' }}</p>

    <hr>
    <p style="font-size: 12px; color: #777;">Enviado desde tu aplicación Laravel</p>
</body>
</html>