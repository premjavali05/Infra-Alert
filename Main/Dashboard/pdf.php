<?php
    session_start();
    require_once("connect.php");
    require_once(__DIR__. '\fpdf184\font\helveticab.php');

    $phno = $_GET['phno'];
    $img_url = $_GET['img_url'];

    $sql = "SELECT * FROM complaint WHERE phno = '$phno' and img_url = '$img_url'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_assoc($result);

    $sql1 = "SELECT address FROM save_location WHERE pno = '$phno' and img_url = '$img_url' ";
    $result1=mysqli_query($connect,$sql1);
    $row1=mysqli_fetch_assoc($result1);
 
    require('fpdf.php');
    // $pdf=new FPDF();
    // $pdf->AddPage();
    // $pdf->SetFont("Arial",'B',16);
    // $pdf->Cell(0,20,'Complaint Form',0,1,'C');
    // $pdf->Cell(95,10,"Name : ",0,0);
    // $pdf->Cell(95,10,$row['name'],0,1);
    // $pdf->Cell(95,10,"Phone Number : ",0,0);
    // $pdf->Cell(95,10,$phno,0,1);
    // $pdf->Cell(95,10,"Date : ",0,0);
    // $pdf->Cell(95,10,$row['date'],0,1);
    // $pdf->Cell(95,10,"Category : ",0,0);
    // $pdf->Cell(95,10,$row['category'],0,1);
    // $pdf->Cell(95,10,"Department : ",0,0);
    // $pdf->Cell(95,10,$row['dept'],0,1);
    // $pdf->Cell(95,10,"Address : ",0,0);
    // $pdf->Cell(95,10,$row1['address'],0,1);
    // $pdf->MultiCell(95,10,"Description : ",0,0);
    // $pdf->SetFont("Arial", '', 12);
    // $pdf->MultiCell(0, 10, $row['description'], 0,'L');
    // $pdf->Cell(95,10,"Image : ",0,0);
    // $pdf->Cell(95,10,$img_url,0,1);

    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont("Arial", 'B', 16);
    $pdf->Cell(0, 20, 'Complaint Registration Form', 0, 1, 'C');

    // Set font for the details
    $pdf->SetFont("Arial", '', 12);



    // Create a table-like structure
    $pdf->Cell(50, 10, "Complaint ID:", 0, 0);
    $pdf->Cell(140, 10, $row['cid'], 0, 1);

    $pdf->Cell(50, 10, "Name:", 0, 0);
    $pdf->Cell(140, 10, $row['name'], 0, 1);

    $pdf->Cell(50, 10, "Phone Number:", 0, 0);
    $pdf->Cell(140, 10, $phno, 0, 1);

    $pdf->Cell(50, 10, "Date:", 0, 0);
    $pdf->Cell(140, 10, $row['date'], 0, 1);

    $pdf->Cell(50, 10, "Category:", 0, 0);
    $pdf->Cell(140, 10, $row['category'], 0, 1);

    $pdf->Cell(50, 10, "Department:", 0, 0);
    $pdf->Cell(140, 10, $row['dept'], 0, 1);

    $pdf->Cell(50, 10, "Address:", 0, 0);
    $pdf->MultiCell(140, 10, $row1['address'], 0, 'L');

    // Description with a MultiCell for wrapping text
    $pdf->Cell(50, 10, "Description:", 0, 0);
    $pdf->MultiCell(140, 10, $row['description'], 0, 'L');

    // Add Image URL
    $pdf->Cell(50, 10, "Image:", 0, 0);
    //$pdf->Cell(140, 10, $img_url, 0, 1);
    $pdf->Image($img_url, 60, $pdf->GetY(), 90, 0, '', '', '', false, 300, '', false, false, 0, false, false, false);
    $pdf->Output();

?>