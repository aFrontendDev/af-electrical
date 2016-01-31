
<?PHP
  // form handler
    //$to = "blackledge22@gmail.com, a.blackledge@building-blocks.com";
    $to = "contact@af-electrical-services.co.uk";
    $from = $_REQUEST['contact_email_input'];
    $name = $_REQUEST['name_input'];
    $headers = "From: $from";
    $subject = "Someone has contacted you from the AF Electrical contact form.";

    $fields = array();
    $fields{"name_input"} = "name";
    $fields{"contact_email_input"} = "email";
    $fields{"contact_number_input"} = "phone";
    $fields{"contact_service_select"} = "service";
    $fields{"contact_service_info_text"} = "message";

  //   $name = $_POST['name_input'];
  //   $phone = $_POST['contact_number_input'];
  //   $email = $_POST['contact_email_input'];
  //   $service = $_POST['contact_service_select'];
  //   $message = $_POST['contact_service_info_text'];

    $body = "Contact form details:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

    //$send = mail($to, $subject, $body, $headers);

    if (empty($_POST["name_input"]) || empty($_POST["contact_number_input"]) || empty($_POST["contact_service_select"]) || empty($_POST["contact_service_info_text"]) ) {
      echo "There was a problem at our end or your required fields were empty"; // failure message
    } else {
  		mail($to, $subject, $body) or die('Error sending Mail'); //This method sends the mail.
  		echo "Your email was sent! Thankyou"; // success message
    }
?>

<a href="/">Back to AF Electrical Services</a>

