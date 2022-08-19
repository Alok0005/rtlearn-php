<?php
$pwd = '';
$con = new mysqli( 'localhost', 'root', $pwd, 'rt' );
if ($con->connect_errno) {
	die( 'Connection failed: ' . $con->connect_error );
}
