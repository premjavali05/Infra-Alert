<?php
    require_once('connect.php');
    require './vendor/autoload.php';

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

    $name =  ( isset($_POST['name']) == TRUE ) ? $_POST['name'] :  '';
    $date =  ( isset($_POST['date']) == TRUE ) ? $_POST['date'] :  '';
    $state =  ( isset($_POST['state']) == TRUE ) ? $_POST['state'] :  '';
    $category =  ( isset($_POST['category']) == TRUE ) ? $_POST['category'] :  '';
    $dept =  ( isset($_POST['dept']) == TRUE ) ? $_POST['dept'] :  '';
    $city =  ( isset($_POST['city']) == TRUE ) ? $_POST['city'] : '';
    $district =  ( isset($_POST['district']) == TRUE ) ? $_POST['district'] :  '';
    $desc =  ( isset($_POST['description']) == TRUE ) ? $_POST['description'] :  '';
    $img_url =  ( isset($_POST['img_url']) == TRUE ) ? $_POST['img_url'] :  '';
    

    session_start();
    $name = $_GET['name'];
    $category = $_GET['category'];
    $phno = $_SESSION['phno'];

    // print_r($_POST['formData']);

    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $date = $_POST['date'];
        $state = $_POST['state'];
        $category = $_POST['category'];
        $dept = $_POST['dept'];
        $city = $_POST['city'];
        $district = $_POST['district'];
        $desc = $_POST['description']; 

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

        if (isset($_FILES['img_url']) && $_FILES['img_url']['error'] == UPLOAD_ERR_OK) {
            $compressedImage = compressImageToSize($_FILES['img_url']['tmp_name']);
            
            if ($compressedImage) {
                // Upload compressed image to Cloudinary
                $data = (new UploadApi())->upload($compressedImage);

                $secure_url = $data['secure_url'];
                
                // Delete temporary file
                unlink($compressedImage);
            }
        }
         
        else {
            echo "Error: No file uploaded or there was an upload error.";
            exit; // Stop execution if there's an error
        }

        function generateNextComplaintID($connect) {
            $query = "SELECT MAX(cid) AS last_cid FROM complaint";
            $result = mysqli_query($connect, $query);
            $row = mysqli_fetch_assoc($result);
            
            // If no previous complaints, start with C101
            if (empty($row['last_cid'])) {
                return 'C101';
            }
            
            // Extract the numeric part and increment
            $lastNumber = intval(substr($row['last_cid'], 1));
            $nextNumber = $lastNumber + 1;
            
            return 'C' . $nextNumber;
        }

        $cid = generateNextComplaintID($connect);
        
        $sql = "INSERT INTO complaint (cid, phno, name, date, state, category, dept, city, district, description, img_url) VALUES ('$cid', '$phno', '$name', '$date', '$state', '$category', '$dept', '$city', '$district', '$desc', '$secure_url')";
        $result = mysqli_query($connect, $sql);

        if ($result) {
            header("location: ../success.php?phno=$phno&name=$name&img_url=$secure_url");
            echo "Complaint submitted successfully";
        }
        else {
            echo "Error submitting complaint";
        }
        
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complaint Form</title>
    <link rel="stylesheet" href="form1.css">
    <link rel="stylesheet" href="complaint_media_queries.css">
    <!-- Include jQuery from a CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!--=============== REMIXICONS ===============-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" crossorigin="">
    <script src="complaint1.js"></script>
</head>
<body>

    <!-- Navigation Bar Start -->
    
    <nav class="nav-bar">
        <div class="nav-logo">
            <img src="../media/logo.png" alt="Logo">
        </div>
        <!-- Top Navbar (visible on larger screens) -->
        <ul class="nav-links">
            <a href="../main.php?phno=<?php echo $phno?>&name=<?php echo $name?>"><li><i class="ri-home-2-line"></i> Home</li></a>
            <a href="../Dashboard/user_dashboard.php?phno=<?php echo $phno?>&name=<?php echo $name?>"><li><i class="ri-dashboard-line"></i> Dashboard</li></a>
            <a href="../logout.php"><li><i class="ri-logout-box-r-line"></i> Logout</li></a>
            <!-- Logout Button -->
        </ul>
        <div class="nav-toggle">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>

    <!-- Navigation Bar End -->

    <!-- Start of Form -->

    <div class="container">
        <h2>Complaint Form</h2>
        <form action="complaint_form.php" method="POST" enctype="multipart/form-data">

            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
    
    
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required>


            <label for="state">State</label>
            <select id="state" name="state" required>
                <option value="">Select State</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CG">Chhattisgarh</option>
                <option value="GJ">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="GA">Goa</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OD">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TS">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UK">Uttarakhand</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
            </select>
            
            <label for="category">Category</label>
            <input type="text" id="category" name="category" value="<?php echo $category?>" readonly>

            <label for="department">Department</label>
            <select id="department" name="dept" required>
                <option value="">Select Department</option>
            </select>
        
            <label for="city">City</label>
            <input type="text" id="city" name="city" required>

            <label for="district">District</label>
            <input type="text" id="district" name="district" required>
    
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" required></textarea>
    
            <label for="user">Take Photo:</label>
            <input type="file" id="img_url" name="img_url" accept="image/*" onchange="getLocation()">

            <input type="text" id="formData" name="formData" hidden>

            
    
            <button type="submit" name="submit">Submit</button>

            <p id="demo" style="color: #222;"></p>
            <div id="map"></div>
        </form>
    </div>

<script>
    const x = document.getElementById("demo");
        //const key = "AIzaSyDqwdA2Ph86RKCcu9DE_O_bIsDQTjwnmpk";

        //GeoLocation Scripts
        // function getLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(success);
        //     }
        //     else {
        //         console.log("Does not support GeoLocation API");
        //     }
        // }

        // function success(position) {
        // console.log(position);

        // const lat = position.coords.latitude;
        // const lng = position.coords.longitude;

        // const key = "AlzaSyPnCsyr3g3p7rnPaepwzRwpPtyXjApp9oq";
        // let url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => { 
        //             console.log(data)
        //             console.log(data.results[0].formatted_address)
        //     })

        // console.log(lat, lng);
        // }   

        function getLocation() {
            if (navigator.geolocation) {
                // Add options for more accurate location
                const options = {
                    enableHighAccuracy: true, // Request most accurate location
                    timeout: 10000,           // 10 seconds timeout
                    maximumAge: 0             // Always get fresh location
                };
                
                navigator.geolocation.getCurrentPosition(
                    success,   // Success callback
                    errorHandler,  // Error callback
                    options    // Options for more reliable geolocation
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported. Please enable location services.");
            }
        }
        
        function errorHandler(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Please grant location permissions to upload the image.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("Location request timed out. Please try again.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred with location services.");
                    break;
            }
        }

        function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    console.log(lat)

    const key = "AlzaSynxAmGjGc2-8m1BEoZ9Y8Owdigpjca6v8Y";
    let url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => { 
            const formattedAddress = data.results[0].formatted_address;
            console.log(formattedAddress);

            // Create a FormData object to send the address, latitude, and longitude
            const form = [];
            const formData = {};
            formData.address = formattedAddress;
            formData.latitude = lat;
            formData.longitude = lng;
            
            
            // Include the name and category from the form
            const name = document.getElementById('name').value;
            const category = document.getElementById('category').value;
            
            formData.name = name;
            formData.category = category;

            form.push(formData);

            console.log(form)

            console.log(formData);

            //Original Code
            $.ajax({
                url:`./save_location.php?name=${name}&category=${category}`,
                method: "post",
                data: { formData: JSON.stringify(form)
                },
                success: function(response) {
                    console.log(response);
                }
            })

            // Log formData for debugging

            
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            //     if (key = 'address' ) {
            //         let address = value
            //         console.log(address)
            //     }
            // }

            

            // // Send the data to the PHP script
            // fetch(`complaint_form.php?name=${name}&category=${category}`, {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => {
            //     console.log('Response status:', response.status);
            //     return response.text();
            // })
            // .then(result => {
            //     console.log('Data saved:', result);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        });
}


        document.addEventListener('DOMContentLoaded', () => {
            const navT = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');
    
            navT.addEventListener('click', () => {
                navLinks.classList.toggle('show'); // This toggles the 'show' class
                console.log(navLinks.classList); // Check the class list after toggling
                navT.classList.toggle('active');
            });
        });
    </script>
    
</body>
</html>