<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Recuperación de contraseña</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <table width="500" cellpadding="0" cellspacing="0" 
                       style="background:#ffffff; border-radius:10px; padding:40px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                    <tr>
                        <td align="center">
                            <h2 style="margin:0; color:#333;">
                                Hola {{ $name }},
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px 0;">
                            <p style="font-size:16px; color:#555; margin:0;">
                                Recibimos una solicitud para restablecer tu contraseña.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <p style="font-size:14px; color:#888;">
                                Usa el siguiente código para continuar:
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px 0;">
                            <div style="
                                display:inline-block;
                                padding:15px 30px;
                                background:#f0f3ff;
                                border-radius:8px;
                                font-size:28px;
                                letter-spacing:8px;
                                font-weight:bold;
                                color:#4f46e5;
                            ">
                                {{ $code }}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <p style="font-size:14px; color:#888;">
                                Este código expirará en <strong>10 minutos</strong>.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-top:20px;">
                            <p style="font-size:13px; color:#aaa;">
                                Si no solicitaste este cambio, puedes ignorar este mensaje.
                            </p>
                        </td>
                    </tr>

                </table>

                <p style="font-size:12px; color:#bbb; margin-top:20px;">
                    © {{ date('Y') }} Tu Empresa. Todos los derechos reservados.
                </p>

            </td>
        </tr>
    </table>

</body>
</html>
