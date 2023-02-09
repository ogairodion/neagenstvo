<?php
if (!empty($_POST)) {
  $fio = $_POST['name'];
  $phone = $_POST['phone'];

  $fio = htmlspecialchars($fio);
  $phone = htmlspecialchars($phone);

  $fio = urldecode($fio);
  $phone = urldecode($phone);

  $fio = trim($fio);
  $phone = trim($phone);

  $email_to = "info@neagentstvo.bz";

  if (mail($email_to, "Заявка с сайта ", "ФИО: " . $fio . " \r\nТелефон: " . $phone, "From: neagenstvo@mail.ru \r\n")) {
    $output = '<div class="form__subtitle">Заявка отправлена! <br> Спасибо за Ваше обращение, мы свяжемся с Вами!</div>';
    die($output);
  } else {
    $output = '<div class="form__subtitle">Заявка не отправлена!</div>';
    die($output);
  }
}

