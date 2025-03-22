<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Проверяем, были ли получены данные через POST-запрос
if (isset($_POST['name']) && isset($_POST['phone'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];

    // Настройка SMTP
    $mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8'; // Устанавливаем кодировку UTF-8

    try {
        // Настройки SMTP
        $mail->isSMTP();
        $mail->Host = 'mail.na-volne.by';  // Укажите SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'avlas08@na-volne.by'; // Ваш email
        $mail->Password = 'kN!R%TR48G3pv6v';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Настройки отправителя и получателя
        $mail->setFrom('avlas08@na-volne.by', 'САЙТ');
        $mail->addAddress('avlas08@mail.ru');
        $mail->addAddress('viacheslav@kukhta.by');

        // Тема и тело письма
        $mail->isHTML(true);
        $mail->Subject = 'Новое сообщение с сайта';
        $mail->Body = "
    <div style='font-size: 18px;'>
        <b>$name</b> просит перезвонить <br> <br>
        <b>Телефон: <a href='tel:$phone' text-decoration: none; color: #007bff;'>$phone</a></b>
    </div>
";
        // Отправка сообщения
        $mail->send();
        echo 'Сообщение отправлено успешно';
    } catch (Exception $e) {
        echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
    }
} else {
    echo 'Ошибка: не все данные были отправлены.';
}
?>