<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Получаем данные из POST-запроса
$name = $_POST['name'];
$phone = $_POST['phone'];

// Настройка SMTP
$mail = new PHPMailer(true);
try {
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';  // Укажите SMTP сервер
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com'; // Ваш email
    $mail->Password = 'your_password'; // Ваш пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Настройки отправителя и получателя
    $mail->setFrom('your_email@example.com', 'Your Name');
    $mail->addAddress('recipient@example.com', 'Receiver Name');

    // Тема и тело письма
    $mail->isHTML(true);
    $mail->Subject = 'Новое бронирование';
    $mail->Body = "Имя: $name<br>Телефон: $phone";

    // Отправка сообщения
    $mail->send();
    echo 'Сообщение отправлено успешно';
} catch (Exception $e) {
    echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
}
?>
