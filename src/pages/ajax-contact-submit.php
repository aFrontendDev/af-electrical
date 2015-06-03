<?PHP
  // form handler
  // if($_POST && isset($_POST['sendfeedback'], $_POST['name_input'], $_POST['contact_number_input'], $_POST['contact_email_input'], $_POST['contact_service_select'], $_POST['contact_service_info_text'])) {

  //   $name = $_POST['name_input'];
  //   $phone = $_POST['contact_number_input'];
  //   $email = $_POST['contact_email_input'];
  //   $service = $_POST['contact_service_select'];
  //   $message = $_POST['contact_service_info_text'];

  //   if(!$name) {
  //     $errorMsg = "Please enter your Name";
  //   } elseif(!$email || !preg_match("/^\S+@\S+$/", $email)) {
  //     $errorMsg = "Please enter a valid Email address";
  //   } elseif(!$message) {
  //     $errorMsg = "Please enter your comment in the Message box";
  //   } else {
  //     // send email and redirect
  //     $to = "blackledge22@gmail.com";
  //     if(!$subject) $subject = "Contact from website";
  //     $headers = "From: contactForm@af-electrical-services.co.uk" . "\r\n";
  //     mail($to, $subject, $message, $headers);
  //     //header("Location: http://www.example.com/thankyou.html");
  //     exit;
  //   }

  // }
?>

<?php

//   $name = $_POST['name_input'];
//   $phone = $_POST['contact_number_input'];
//   $email = $_POST['contact_email_input'];
//   $service = $_POST['contact_service_select'];
//   $message = $_POST['contact_service_info_text']

// $to = 'blackledge22@gmail.com';
// $subject = 'the subject';
// $message = 'FROM: '.$name.' Email: '.$email.'Message: '.$message;
// $headers = 'From: youremail@domain.com';

// if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
// mail($to, $subject, $message) or die('Error sending Mail'); //This method sends the mail.
// echo "Your email was sent!"; // success message
// }

?>


<?php

    $to = "contact@af-electrical-services.co.uk, blackledge22@gmail.com";
    $from = $_REQUEST['contact_email_input'];
    $name = $_REQUEST['name_input'];
    $headers = "From: $from";
    $subject = "You have a message.";

    $fields = array();
    $fields{"name"} = "name_input";
    $fields{"email"} = "contact_email_input";
    $fields{"phone"} = "contact_number_input";
    $fields{"message"} = "contact_service_info_text";

    $body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

    $send = mail($to, $subject, $body, $headers);

?>

1

