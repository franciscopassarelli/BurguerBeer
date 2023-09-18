<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $mail = $_POST['email'];
    $mensaje = $_POST['textarea'];

    $mensaje = "Este mensaje fue enviado por " . $nombre . ",\r\n";
    $mensaje .= "Su e-mail es: " . $mail . "\r\n";
    $mensaje .= "Mensaje: " . $mensaje . "\r\n";
    $mensaje .= "Enviado el " . date('d/m/Y', time());

    $para = 'franciscopassarelli7@gmail.com';
    $asunto = 'Este email fue enviado desde la web';
    $header = 'From: ' . $mail . "\r\n" .
              'Reply-To: ' . $mail . "\r\n" .
              'X-Mailer: PHP/' . phpversion();

    if (mail($para, $asunto, utf8_decode($mensaje), $header)) {
        header('Location: alerta.html');
    } else {
        echo "Error al enviar el correo.";
    }
}
?>
