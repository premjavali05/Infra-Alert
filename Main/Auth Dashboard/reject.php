<?php
    require_once("connect.php");
    session_start();
    

    $eid = $_GET['eid'];
    $cid = $_GET['cid'];

    if (!isset($_SESSION['redirected'])) 
    {
        $_SESSION['redirected'] = true;

        $sql=" UPDATE complaint SET status = 'Rejected' WHERE cid = '$cid' AND status = 'Pending' ";
        $result=mysqli_query($connect,$sql);

        header("location: ../Auth Dashboard/auth_dashboard.php?eid=$eid");
        exit;
    } 
    else 
    {
        // We've already been redirected, so display the page
        unset($_SESSION['redirected']); // Reset the session variable
    }

?>
