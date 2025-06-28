<?php
    require_once('./connect.php');
    session_destroy();
    header("location: ../Home/index.php");
?>
