<?php
    require_once('connect.php');
    $message="";
    $message1="";
    $message2="";
    
    $name =  ( isset($_POST['name']) == TRUE ) ? $_POST['name'] :  '';
    $phno =  ( isset($_POST['phno']) == TRUE ) ? $_POST['phno'] :  '';
    $em =  ( isset($_POST['email']) == TRUE ) ? $_POST['email'] :  '';
    $pass =  ( isset($_POST['pwd']) == TRUE ) ? $_POST['pwd'] :  '';

    if(!(empty($phno)))
    {
        $em_err = " SELECT * from u_register where phno = '$phno' ";
        $eq = mysqli_query($connect, $em_err);
        $em_count = mysqli_num_rows($eq);
    
        if($em_count > 0)
        {
            $message1="Phone Number already exists";
        }
        else
        {   
            $sql = " INSERT INTO u_register (name, phno, email, pass) values ('$name', '$phno', '$em', '$pass')";
            $result = mysqli_query($connect, $sql);

            if($result)
            {
                header("location: ./user_login.php");
            }
        }
    }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Register</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     <link rel="stylesheet" href="user_register.css">
     <!-- <link rel="stylesheet" href="style.css"> -->
    <link href="./user_login.php">
</head>
<body>

    <div class="container1" id="container">
        <div class="form-container1 sign-up-container1">
            <form action="./user_register.php" method="POST">
                <h1>Create Account</h1>
                <div class="infield1">
                    <input type="text" placeholder="Name" name="name" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="text" placeholder="Phone Number" name="phno" pattern="[0-9]{10}" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="email" placeholder="Email" name="email" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="password" placeholder="Password" name="pwd" required/>
                    <label></label>
                </div>
                <div class='message' style=color:#ff2770><?php echo"$message1";?></div>
                <button type="submit">Sign Up</button>

                <button id="btn"><a href="./user_login.php">Sign In</a></button>
            </form>
        </div>
        <div class="overlay-container1" id="overlayCon">
            <div class="overlay1">
                <div class="overlay-panel1 overlay-left1">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button>Sign In</button>
                </div>
            </div>
            <a href="./user_login.php"><button id="overlayBtn1"></button></a>
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>

