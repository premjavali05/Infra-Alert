<?php
require_once('connect.php');
session_start();
$pno = $_SESSION['phno'];

    print_r($_POST['formData']);

    $form = json_decode($_POST['formData'], true);
     // Get phone number from POST data

    foreach ($form as $f) {
        $address = mysqli_real_escape_string($connect, $f['address']);
        $latitude = mysqli_real_escape_string($connect, $f['latitude']);
        $longitude = mysqli_real_escape_string($connect, $f['longitude']);

        $sql = "INSERT INTO save_location (pno, img_url, latitude, longitude, address) VALUES ('$pno', '', '$latitude', '$longitude', '$address')";
        $result = mysqli_query($connect, $sql);

        if (!$result) {
            echo "Error: " . mysqli_error($connect);
        }
    }
    echo "Location saved successfully";
?>