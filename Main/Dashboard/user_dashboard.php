<?php
  require_once("connect.php");
  session_start();
  $phno = $_SESSION['phno'];
  $name = $_GET['name'];
  $sql = "SELECT * FROM complaint WHERE phno = '$phno' ";
  $result = mysqli_query($connect,$sql);
          
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="user_dashboard1.css">
    <link rel="stylesheet" href="user_dashboard_media_queries.css">
    <script src="script.js"></script>
    <title>User Dashboard</title>

    <!--=============== REMIXICONS ===============-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" crossorigin="">
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
            <a href="#"><li><i class="ri-dashboard-line"></i> Dashboard</li></a>
            <a href="../logout.php"><li><i class="ri-logout-box-r-line"></i> Logout</li></a>
        </ul>
        <div class="nav-toggle">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>

    <!-- Dashboard Title -->
    <div class="dashboard-title">
        <h1>Complaint History</h1>
    </div>

    <!-- Table Section -->
    <table class="complaint-table">
        <thead>
            <tr>
                <th>S No</th>
                <th>C ID</th>
                <th>Date</th>
                <th>Phno</th>
                <th>Category</th>
                <th>Department</th>
                <th>State</th>
                <th>City</th>
                <th>PDF</th>
                <th>Status</th>
                <th>Solved Image</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $sno = 1;
                while ($fetch = mysqli_fetch_array($result))
                {
                    echo "<tr>";
                    echo "<td>". $sno ."</td>";
                    echo "<td>" . $fetch['cid'] . "</td>";
                    echo "<td>" . $fetch['date'] . "</td>";
                    echo "<td>" . $fetch['phno'] . "</td>";
                    echo "<td>" . $fetch['category'] . "</td>";
                    echo "<td>" . $fetch['dept'] . "</td>";
                    echo "<td>" . $fetch['state'] . "</td>";
                    echo "<td>" . $fetch['city'] . "</td>";
                    echo "<td>" . '<a href = "pdf.php?phno='.$fetch['phno']. '&' .'img_url='.$fetch['img_url'].'">' . '<button><i class="ri-link"></i></button>' . "</td>";
                    echo "<td>" . $fetch['status'] . "</td>";
                    echo "<td>" . (($fetch['status'] == 'Solved' && !empty($fetch['solved_url'])) 
                                    ? '<a href="' . htmlspecialchars($fetch['solved_url']) . '" target="_blank">' 
                                    . '<button><i class="ri-image-line"></i></button></a>' 
                                    : '') 
                        . "</td>";
                    echo "</tr>";
                   $sno = $sno + 1;
                }
            ?>
        </tbody>
    </table>

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
