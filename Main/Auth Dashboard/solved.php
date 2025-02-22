<?php
    require_once("connect.php");
    require '../Complaint Form/vendor/autoload.php';

    session_start();

    $eid = $_SESSION['eid'];
    //$cid = $_GET['cid'];

    use Cloudinary\Configuration\Configuration;

    Configuration::instance([
        'cloud' => [
          'cloud_name' => 'duavd91zv', 
          'api_key' => '725351681223852', 
          'api_secret' => '5PqvZcgCv_0-uY2R6FzJ6HlTm9U'
        ],
        'url' => [
          'secure' => true
        ]
    ]);

    use Cloudinary\Api\Upload\UploadApi;

    $sql = "SELECT * FROM auth_register WHERE eid = '$eid'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_assoc($result);
    
    $category = $row['category'];
    $dept = $row['department'];
    $state = $row['state'];
    $city = $row['city'];
    
    $sql1 = "SELECT * FROM complaint WHERE category = '$category' AND dept = '$dept' AND state = '$state' AND city = '$city' ";
    $result1 = mysqli_query($connect,$sql1);

    while ($fetch = mysqli_fetch_array($result1)){
        $cid = $fetch['cid'];
    }

    $img =  ( isset($_POST['img']) == TRUE ) ? $_POST['img'] :  '';

    if(isset($_POST['submit'])) {


    function compressImageToSize($source, $targetSizeInMB = 1) {
        $targetBytes = $targetSizeInMB * 1024 * 1024;
        $qualities = [90, 80, 70, 60, 50, 40, 30, 20, 10];
        $maxWidth = 2048; // Max starting width
    
        foreach ($qualities as $quality) {
            // Resize and compress
            $image = imagecreatefromstring(file_get_contents($source));
            $origWidth = imagesx($image);
            $origHeight = imagesy($image);
            
            // Calculate proportional resize
            $ratio = $maxWidth / $origWidth;
            $newWidth = $maxWidth;
            $newHeight = $origHeight * $ratio;
            
            $resized = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
            
            // Save temporary compressed image
            $tempFile = tempnam(sys_get_temp_dir(), 'compressed_');
            imagejpeg($resized, $tempFile, $quality);
            
            // Check file size
            $fileSize = filesize($tempFile);
            
            if ($fileSize <= $targetBytes) {
                return $tempFile;
            }
            
            // Clean up
            imagedestroy($image);
            imagedestroy($resized);
            unlink($tempFile);
            
            // Reduce max width for next iteration
            $maxWidth *= 0.8;
        }
        
        return false; // Could not compress to target size
    }

    if (isset($_FILES['img']) && $_FILES['img']['error'] == UPLOAD_ERR_OK) {
        $compressedImage = compressImageToSize($_FILES['img']['tmp_name']);
        
        if ($compressedImage) {
            // Upload compressed image to Cloudinary
            $data = (new UploadApi())->upload($compressedImage);

            $secure = $data['secure_url'];

            print_r($data);
            print_r($secure);

            // $update_sql = "UPDATE complaint SET status = 'Solved', solved_url = ? WHERE cid = ?";
            // $stmt = mysqli_prepare($connect, $update_sql);
            // mysqli_stmt_bind_param($stmt, "ss", $secure_url, $cid);
            // $result = mysqli_stmt_execute($stmt);

            
            // Delete temporary file
            unlink($compressedImage);
        }
    }
     
    else {
        echo "Error: No file uploaded or there was an upload error.";
        exit; // Stop execution if there's an error
    }

    // $sql = "INSERT INTO solved_img (cid, eid, solved_url) VALUES ('$cid', '$eid', '$secure')";
    // $result = mysqli_query($connect, $sql);

    $sql = "UPDATE `complaint` SET solved_url = '$secure' WHERE `cid` = '$cid'";
    $result = mysqli_query($connect, $sql);

    $sql = "UPDATE `complaint` SET status = 'Solved' WHERE `cid` = '$cid'";
    $result = mysqli_query($connect, $sql);

    if($result) {
        header("Location: ../Auth Dashboard/auth_dashboard.php?eid=$eid&cid=$cid");
        exit();
    } else {
        echo "Error updating complaint";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="solved.css">
    <link rel="stylesheet" href="solved_media_queries.css">
    <title>Upload Solved Image</title>
</head>
<body>
    <h1 class="title">Upload the Image of Complaint Solved</h1>
    <form action="solved.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="img" id="img" accept=".pdf, .png, .jpeg, .jpg, .docx">
        <button type="submit" name="submit">Upload Solved Image</button>
    </form>
</body>
</html>