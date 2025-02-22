<?php
    require_once('connect.php');
    $message="";
    $message1="";
    $message2="";
    
    $eid =  ( isset($_POST['eid']) == TRUE ) ? $_POST['eid'] :  '';
    $name =  ( isset($_POST['name']) == TRUE ) ? $_POST['name'] :  '';
    $phno =  ( isset($_POST['phno']) == TRUE ) ? $_POST['phno'] :  '';
    $em =  ( isset($_POST['email']) == TRUE ) ? $_POST['email'] :  '';
    $state =  ( isset($_POST['state']) == TRUE ) ? $_POST['state'] :  '';
    $category =  ( isset($_POST['category']) == TRUE ) ? $_POST['category'] :  '';
    $dept =  ( isset($_POST['dept']) == TRUE ) ? $_POST['dept'] :  '';
    $city =  ( isset($_POST['city']) == TRUE ) ? $_POST['city'] : '';
    $pass =  ( isset($_POST['pwd']) == TRUE ) ? $_POST['pwd'] :  '';

    if(!(empty($eid)))
    {
        $eid_err = " SELECT * from auth_register where eid = '$eid' ";
        $eq = mysqli_query($connect, $eid_err);
        $eid_count = mysqli_num_rows($eq);
    
        if($eid_count > 0)
        {
            $message1="Employee ID already exists";
        }
        else
        {   
            $sql = " INSERT INTO auth_register (eid, name, phno, email, state, category, department, city, pass) values ('$eid', '$name', '$phno', '$em', '$state', '$category', '$dept', '$city', '$pass')";
            $result = mysqli_query($connect, $sql);

            if($result)
            {
                header("location: ./auth_login.php");
            }
        }
    }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth Register</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     <link rel="stylesheet" href="auth_register1.css">
     <!-- <link rel="stylesheet" href="style.css"> -->
    <link href="./user_login.php">
    <link rel="stylesheet" href="auth_media_queries.css">
    <script src="./auth_register.js"></script>
</head>
<body>

    <div class="container1" id="container">
        <div class="form-container1 sign-up-container1">
            <form action="./auth_register.php" method="POST">
                <h1>Create Account</h1>
                <div class="infield1">
                    <input type="text" placeholder="Employee ID" name="eid" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="text" placeholder="Name" name="name" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="text" placeholder="Phone Number" name="phno" pattern="[0-9]{10}" required/>
                    <label></label>
                </div>
                <div class="infield1">
                    <input type="email" placeholder="Work Email" name="email" required/>
                    <label></label>
                </div>

                <label for="state">State</label>
                <select id="state" name="state" required>
                    <option value="">Select State</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="AR">Arunachal Pradesh</option>
                    <option value="AS">Assam</option>
                    <option value="BR">Bihar</option>
                    <option value="CG">Chhattisgarh</option>
                    <option value="GJ">Gujarat</option>
                    <option value="HR">Haryana</option>
                    <option value="HP">Himachal Pradesh</option>
                    <option value="JK">Jammu and Kashmir</option>
                    <option value="GA">Goa</option>
                    <option value="JH">Jharkhand</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="MN">Manipur</option>
                    <option value="ML">Meghalaya</option>
                    <option value="MZ">Mizoram</option>
                    <option value="NL">Nagaland</option>
                    <option value="OD">Odisha</option>
                    <option value="PB">Punjab</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="SK">Sikkim</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="TS">Telangana</option>
                    <option value="TR">Tripura</option>
                    <option value="UK">Uttarakhand</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="WB">West Bengal</option>
                    <option value="AN">Andaman and Nicobar Islands</option>
                    <option value="CH">Chandigarh</option>
                    <option value="DN">Dadra and Nagar Haveli</option>
                    <option value="DD">Daman and Diu</option>
                    <option value="DL">Delhi</option>
                    <option value="LD">Lakshadweep</option>
                    <option value="PY">Puducherry</option>
                </select>

                <label for="state">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="home_electricity">Home Electricity (Electricity Board)</option>
                    <option value="street_lights">Street Lights (Muncipal Corporation)</option>
                    <option value="potholes">Potholes (Muncipal Corporation)</option>
                    <option value="garbage">Garbage (Muncipal Corporation)</option>
                </select>

                <label for="department">Department</label>
                <select id="department" name="dept" required>
                    <option value="">Select Department</option>
                </select>

                <div class="infield1">
                    <input type="text" placeholder="City" name="city" required/>
                    <label></label>
                </div>

                <div class="infield1">
                    <input type="password" placeholder="Password" name="pwd" required/>
                    <label></label>
                </div>
                <div class='message' style=color:#ff2770><?php echo"$message1";?></div>
                <button type="submit">Sign Up</button>

                <button id="btn"><a href="./auth_login.php">Sign In</a></button>
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
            <a href="./auth_login.php"><button id="overlayBtn1"></button></a>
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>

