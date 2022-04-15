<?php

include 'mail.php';
$regexName = "/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'-]+$/";
$regexMail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/";
$regexMessage = "/^[0-9a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ',;()-]+$/";


if((isset($_POST['name']))&&(preg_match($regexName, $_POST['name']))){
    $name = $_POST['name'];
}
if((isset($_POST['mail']))&&(preg_match($regexMail, $_POST['mail']))){
    $mail = $_POST['mail'];
}
if((isset($_POST['subject']))&&(preg_match($regexMessage, $_POST['subject']))){
    $subject = $_POST['subject'];
}
if((isset($_POST['message']))&&(preg_match($regexMessage, $_POST['message']))){
    $message = $_POST['message'];
}

if(($name)&&($mail)&&($subject)&&($message)){
    $res= "merci ".$name." ton mail a été envoyé";
    echo json_encode($res);
    mail($AdresseMail, "Bonjour, ".$name, $message, "From: ".$mail);
}
?>