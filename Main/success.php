<?php
    require_once('./connect.php');

    session_start();
    $pno = $_SESSION['phno'];
    $img = $_GET['img_url'];

    $sql = "UPDATE `save_location` SET img_url = '$img' WHERE pno = '$pno' AND  img_url = '' ";

    $result = mysqli_query($connect, $sql);
    
    if ($result) {
        header("location: ./Dashboard/user_dashboard.php");
        echo "Complaint submitted successfully";
    }
    else {
        echo "Error submitting complaint";
    }

    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="c_form2.js"></script>
    <title>Document</title>
</head>
<body>
    <p>Hello </p>

</body>
</html>

