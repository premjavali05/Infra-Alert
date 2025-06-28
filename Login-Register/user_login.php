<?php
    require_once('connect.php');
    $message="";
    $message1="";

    if(isset($_POST['submit']))
    {
        
        $phno = $_POST['phno'];
        $pass = $_POST['pwd'];
       
        if(!(empty($phno) && empty($pass)))
        {
            $phno_err = " SELECT * from u_register where phno = '$phno' and pass = '$pass'";
            $ph = mysqli_query($connect, $phno_err);
            $phno_count = mysqli_num_rows($ph);

            $sql = "SELECT name from u_register WHERE phno = '$phno'";
            $result = mysqli_query($connect, $sql);
            $row = mysqli_fetch_assoc($result);
            $name = $row['name'];

            
            if($phno_count > 0)
            {
                session_start();
                $_SESSION["phno"] = $phno;
                $_SESSION["pass"] = $pass;
                
                header("location: ../Main/main.php?phno=$phno&name=$name");
                
            }
            else
            {
                $message= "Please Check your Phone Number and Password ";
                
            }
        } 
    }

?> 

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <link rel="stylesheet" href="user_login.css">
    <!-- <link rel="stylesheet" href="style1.css"> -->
    <link href="./user_register.php">
</head>
<body>

    <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form action="./user_login.php" method="POST">
                <h1>Sign in</h1>
                <div class="infield">
                    <input type="text" placeholder="Phone Number" name="phno" pattern="[0-9]{10}" required/>
                    <label></label>
                </div>
                
                <div class="infield">
                    <input type="password" placeholder="Password" name="pwd" required/>
                    <label></label>
                </div>
                <div class='message' style=color:#ff2770><?php echo"$message";?></div>
                <button type="submit" name="submit">Sign In</button>
                
                <button id="btn"><a href="./user_register.php">Sign Up</a></button>
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
            <a href="./user_register.php"><button id="overlayBtn"></button></a>
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>