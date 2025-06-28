<?php
  require_once("connect.php");
  session_start();
  $eid = $_GET['eid'];
  $cid = $_GET['cid'];

  $sql = "SELECT * FROM auth_register WHERE eid = '$eid' ";
  $result = mysqli_query($connect, $sql);
  $row = mysqli_fetch_assoc($result);

  $category = $row['category'];
  $dept = $row['department'];
  $state = $row['state'];
  $city = $row['city'];

  $sql1 = "SELECT * FROM complaint WHERE category = '$category' AND dept = '$dept' AND state = '$state' AND city = '$city' AND status = 'Pending' AND cid = '$cid' ";
  $result1 = mysqli_query($connect,$sql1);
          
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="auth_dashboard2.css">
    <link rel="stylesheet" href="auth_dashboard_media_queries1.css">
    <title>Pending Filter</title>

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
            <a href="../Auth Dashboard/auth_dashboard.php"><li><i class="ri-home-2-line"></i> Home</li></a>
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
        <div class="search-bar">
            <h1>Complaint History</h1>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" class="filter-form">
              <input type="hidden" name="eid" value="<?php echo $eid?>">
              <input type="text" name="cid" placeholder="Enter Complaint ID">
              <button type="submit">Filter</button>
            </form>
        </div>

        <a href="auth_dashboard.php?eid=<?php echo $eid ?>"><button class="btn" id="approved-leaves">Complaints Pending</button></a>
        <a href="view_inprogress.php?eid=<?php echo $eid ?>"><button class="btn" id="approved-leaves">Complaints In Progress</button></a>
        <a href="view_solved.php?eid=<?php echo $eid ?>"><button class="btn" id="rejected-leaves">Complaints Solved</button></a>
        <a href="view_rejected.php?eid=<?php echo $eid ?>"><button class="btn" id="rejected-leaves">Complaints Rejected</button></a>

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
                <th>View</th>
                <th>Solved</th>
                <th>Rejected</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $sno = 1;
                while ($fetch = mysqli_fetch_array($result1))
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
                    echo "<td>" . '<a href = "../Dashboard/pdf.php?phno='.$fetch['phno']. '&' .'img_url='.$fetch['img_url'].'">' . '<button><i class="ri-link"></i></button>' . "</td>";
                    echo "<td>" . '<a href = "../Auth Dashboard/view.php?eid='.$eid. '&' .'cid='.$fetch['cid'].'">' . '<button><i class="ri-check-line"></i></button>' . "</td>";
                    echo "<td>" . '<a href = "./solved.php?eid='.$eid. '&' .'cid='.$fetch['cid'].'">' . '<button><i class="ri-check-double-line"></i></button>' . "</td>";
                    echo "<td>" . '<a href = "./reject.php?eid='.$eid. '&' .'cid='.$fetch['cid'].'">' . '<button><i class="ri-close-line"></i></button>' . "</td>";
                    echo "<td>" . $fetch['status'] . "</td>";
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

