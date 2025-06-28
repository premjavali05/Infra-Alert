<?php
    require_once('connect.php');

    session_start();
    $name = $_GET['name'];
    $phno = $_SESSION['phno'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main_style1.css">
    <link rel="stylesheet" href="main_media_queries.css">
    <script src="script.js"></script>
    <title>Main</title>

    <!--=============== REMIXICONS ===============-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" crossorigin="">
</head>
<body>

    <!-- Navigation Bar Start -->
    
    <nav class="nav-bar">
        <div class="nav-logo">
            <img src="./media/logo.png" alt="Logo">
        </div>
        <!-- Top Navbar (visible on larger screens) -->
        <ul class="nav-links">
            <a href="#"><li><i class="ri-home-2-line"></i> Home</li></a>
            <a href="./Dashboard/user_dashboard.php?phno=<?php echo $phno?>&name=<?php echo $name?>"><li><i class="ri-dashboard-line"></i> Dashboard</li></a>
            <a href="./logout.php"><li><i class="ri-logout-box-r-line"></i> Logout</li></a>
            <!-- Logout Button -->
        </ul>
        <div class="nav-toggle">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>

    <!-- Navigation Bar End -->

    <!-- Start of Main Section -->

    <h1 class="welcome-title">
        <span style="color: white;">Welcome </span>
        <span class="name-color"><?php echo $name ?></span>
    </h1>
    <h2 class="welcome-dept">Choose the Department</h2>
    <div class="card-grid">
        
        <!-- Card 1 -->
        <div class="card-item">
            <img src="./media/home.jpg" alt="home_electricity" class="card-image">
            <h2>HOME ELECTRICITY</h2>
            <a href="./Complaint Form/complaint_form.php?name=<?php echo $name?>&category=home_electricity&phno=<?php echo $phno?>" class="complaint-link">Raise Complaint</a>
        </div>
        
        <!-- Card 2 -->
        <div class="card-item">
            <img src="./media/street.jpg" alt="streetlights" class="card-image">
            <h2>STREET LIGHTS</h2>
            <a href="./Complaint Form/complaint_form.php?name=<?php echo $name?>&category=street_lights" class="complaint-link">Raise Complaint</a>
        </div>
        
        <!-- Card 3 -->
        <div class="card-item">
            <img src="./media/pothole.jpg" alt="POTHOLES" class="card-image">
            <h2>POTHOLES</h2>
            <a href="./Complaint Form/complaint_form.php?name=<?php echo $name?>&category=potholes" class="complaint-link">Raise Complaint</a>
        </div>
        
        <!-- Card 4 -->
        <div class="card-item">
            <img src="./media/garbage1.jpg" alt="Garbage" class="card-image">
            <h2>GARBAGE</h2>
            <a href="./Complaint Form/complaint_form.php?name=<?php echo $name?>&category=garbage" class="complaint-link">Raise Complaint</a>
        </div>
        
    </div>
    <script src="script.js"></script>

    <script>
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