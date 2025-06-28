<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index2.css">
    <link rel="stylesheet" href="media_queries.css">
    <script src="script.js"></script>
    <title>Infra-Alert</title>

    <!--=============== REMIXICONS ===============-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" crossorigin="">
</head>
<body>

    <!-- Navigation Bar Start -->
    
    <nav class="nav-bar">
        <div class="nav-logo">
            <img src="../Main/media/logo.png" alt="Logo">
        </div>
        <!-- Top Navbar (visible on larger screens) -->
        <ul class="nav-links">
            <a href="#"><li><i class="ri-home-2-line"></i> Home</li></a>
            <a href="#about"><li><i class="ri-information-line"></i> About </li></a>
            <a href="#dept"><li><i class="ri-building-2-line"></i> Department </li></a>
            <a href="#contact"><li><i class="ri-phone-line"></i> Contact</li></a>
            <a href="../Login-Register/user_login.php"><li><i class="ri-user-line"></i> User Login</li></a>
            <a href="../Login-Register/auth_login.php"><li><i class="ri-admin-line"></i> Auth Login</li></a>
            <!-- Logout Button -->
        </ul>
        <div class="nav-toggle">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>

    <!-- Navigation Bar End -->

    <!-- Hero Section Start -->
    <section class="hero-section">
        <!-- <div class="hero-content">
            <h1>Welcome to Our Crowdsourced Problem Reporting Platform</h1>
            <p>Your voice matters! Report issues and help us improve our community.</p>
        </div> -->
        <img src="../Main/media/hero2.png" alt="Hero Poster" class="hero-image">
    </section>
    <!-- Hero Section End -->

    <!-- Start of About Section -->
    <section class="about-section" id="about">
        <h2 class="about-title">About Us</h2>
        <div class="container">
            <div class="content">
                <p>Infra-Alert is a community-driven platform that empowers citizens to directly report and track municipal infrastructure issues. 
                    With just a few clicks, users can raise complaints about street lights, home electricity, potholes, and garbage collection. 
                    Our innovative system connects residents with local departments, ensuring swift resolution and creating a more responsive, 
                    transparent municipal service ecosystem. We believe in transforming urban challenges into collaborative solutions, 
                    one report at a time.</p>
            </div>
            <div class="image-container">
                <img src="../Main/media/about.jpg" alt="About">
            </div>
        </div>
    </section>
    <!-- End of About Section -->

    <!-- Start of Main Section -->

    <section class="dept-section" id="dept">
        <h1 class="welcome-title">
            <span style="color: white;">Departments</span>
        </h1>
        <div class="container">
            <div class="home-content">
                <h2 class="dept-title">Home Electricity</h2>
                <p>Through Infra-Alert, residents can effortlessly report electrical issues directly to the responsible government departments. 
                    Our platform simplifies the process of highlighting power-related problems, 
                    facilitating swift communication and efficient resolution of home electricity concerns.</p>
            </div>
            <div class="home-image-container">
                <img src="../Main/media/home.jpg" alt="About">
            </div>
        </div>

        <div class="container">
            <div class="street-image-container">
                <img src="../Main/media/street.jpg" alt="About">
            </div>
            <div class="street-content">
                <h2 class="dept-title">Street Electricity</h2>
                <p>Infra-Alert provides a streamlined platform for reporting street light issues. 
                    Users can easily log concerns about malfunctioning or damaged street lights, 
                    enabling municipal authorities to quickly identify and address infrastructure problems, 
                    ensuring community safety and well-being.</p>
            </div>
        </div>

        <div class="container">
            <div class="home-content">
                <h2 class="dept-title">Potholes</h2>
                <p>Infra-Alert offers citizens a direct channel to report road damages and potholes. 
                    By providing a user-friendly interface, we enable residents to notify municipal authorities about infrastructure issues, 
                    promoting responsive and transparent urban maintenance.</p>
            </div>
            <div class="home-image-container">
                <img src="../Main/media/pothole.jpg" alt="About">
            </div>
        </div>

        <div class="container">
            <div class="street-image-container">
                <img src="../Main/media/garbage1.jpg" alt="About">
            </div>
            <div class="street-content">
                <h2 class="dept-title">Garbage</h2>
                <p>Our platform allows residents to easily report garbage collection and disposal issues. 
                    Infra-Alert serves as a crucial communication bridge between citizens and municipal services, 
                    helping to maintain a clean and healthy urban environment.</p>
            </div>
        </div>
    </section>

    <section class="contact-section" id="contact">
        <h2 class="contact-title">Contact Us</h2>
        <div class="contact-container">
            <div class="contact-info">
                <div class="contact-detail">
                    <i class="ri-map-pin-line"></i>
                    <p>Tilakwadi, Belagavi, Karnataka, India</p>
                </div>
                <div class="contact-detail">
                    <i class="ri-phone-line"></i>
                    <p>+91 9380122673</p>
                </div>
                <div class="contact-detail">
                    <i class="ri-mail-line"></i>
                    <p>support@infra-alert.com</p>
                </div>
                <div class="contact-detail">
                    <i class="ri-time-line"></i>
                    <p>Monday - Friday: 9 AM to 5 PM</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
    <div class="footer-container">
        <div class="footer-column">
            <h3>Infra-Alert</h3>
            <p>Empowering citizens to report and resolve municipal infrastructure issues.</p>
        </div>
        
        <div class="footer-column">
            <h3>Connect With Us</h3>
            <div class="social-icons">
                <a href="#"><i class="ri-facebook-line"></i></a>
                <a href="#"><i class="ri-twitter-line"></i></a>
                <a href="#"><i class="ri-instagram-line"></i></a>
                <a href="#"><i class="ri-linkedin-line"></i></a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 Infra-Alert. All Rights Reserved.</p>
    </div>
</footer>


</body>

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
</html>