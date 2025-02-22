<?php

$ServerName = 'localhost';
$UserName = 'root';
$Password = '';
$dbName = 'mini_project';  

$connect = mysqli_connect($ServerName, $UserName, $Password, $dbName);

if(!$connect)
{
    echo "Connection failed";
}

?>