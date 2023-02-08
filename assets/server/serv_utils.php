<?php
    $obj = json_decode($_POST['jsonString']);

    switch ($obj->ope) {
        case 'lyric':
            $lyric = $obj->track;
            $root = "./../media/discografia/testi/";
            $fullpath = $root . $lyric . ".txt";
            $file = fopen($fullpath, "r") or die("Unable to open file!");
            echo fread($file, filesize($fullpath));
            fclose($file);
            break;
        case 'bio':
            $bio = file_get_contents('bio_chiara.txt');
            echo $bio;
            break;
        case 'mail':
            $nome = $obj->nome;
            $mail = $obj->mail;
            $messaggio = $obj->messaggio;
            if(empty($nome) || empty($mail) || empty($messaggio)) {
                if(empty($nome))
                    echo "-1";
                if(empty($mail))
                    echo "-2";
                if(empty($messaggio))
                    echo "-3";
            exit();
            }

            sendMail($nome, $mail, $messaggio);
            break;
    }  
    
    function sendMail($sender_nome, $sender_mail, $sender_messaggio) {
        $to = "info@chiaracasula.com, chiaramariacasula@gmail.com";
        //$to = "mauro.caporaso@gmail.com";
        $subject = "Hai ricevuto una messaggio dal tuo sito";
        $message =  "Nome: ".$sender_nome."\r\n"
                    ."Mail: ".$sender_mail."\r\n"
                    ."Messaggio:\r\n".$sender_messaggio;
        $headers = "From: ".$sender_mail;

        $mailRes = mail($to, $subject, $message, $headers);
        if(!$mailRes) {
            echo "-4";   
        } else {
            echo "0";
        }
    }
?>