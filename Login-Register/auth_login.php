<?php
    require_once('connect.php');
    $message="";
    $message1="";

    if(isset($_POST['submit']))
    {
        
        $eid = $_POST['eid'];
        $pass = $_POST['pwd'];
       
        if(!(empty($eid) && empty($pass)))
        {
            $eid_err = " SELECT * from auth_register where eid = '$eid' and pass = '$pass'";
            $id = mysqli_query($connect, $eid_err);
            $eid_count = mysqli_num_rows($id);
            
            if($eid_count > 0)
            {
                session_start();
                $_SESSION["eid"] = $eid;
                $_SESSION["pass"] = $pass;
                
                header("location: ../Main/Auth Dashboard/auth_dashboard.php?eid=$eid");
                
            }
            else
            {
                $message= "Please Check your Employee ID and Password ";
                
            }
        } 
    }

?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth Login</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <link rel="stylesheet" href="user_login.css">
    <!-- <link rel="stylesheet" href="style1.css"> -->
    <link href="./auth_register.php">
</head>
<body>

    <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form action="./auth_login.php" method="POST">
                <h1>Sign in</h1>
                <div class="infield">
                    <input type="text" placeholder="Employee ID" name="eid" required/>
                    <label></label>
                </div>
                
                <div class="infield">
                    <input type="password" placeholder="Password" name="pwd" required/>
                    <label></label>
                </div>
                <div class='message' style=color:#ff2770><?php echo"$message";?></div>
                <button type="submit" name="submit">Sign In</button>
                
                <button id="btn"><a href="./auth_register.php">Sign Up</a></button>
            </form>
        </div>
        <div class="overlay-container" id="overlayCon">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button>Sign Up</button>   
                </div>
            </div>
            <a href="./auth_register.php"><button id="overlayBtn"></button></a>
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>