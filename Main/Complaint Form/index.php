<?php
require 'vendor/autoload.php';
use Cloudinary\Api\Upload\UploadApi;

use Cloudinary\Configuration\Configuration;

Configuration::instance([
    'cloud' => [
      'cloud_name' => 'duavd91zv', 
      'api_key' => '725351681223852', 
      'api_secret' => '5PqvZcgCv_0-uY2R6FzJ6HlTm9U'],
    'url' => [
      'secure' => true]]);

$data = (new UploadApi())->upload('../media/logo.jpg');
echo $data['secure_url'];
?>