<?php
require_once __DIR__.'/functions.php';
require_once dirname(__DIR__).'/includes/db.php';
$data  = file_get_contents( 'php://input' );
$data  = json_decode( $data, true );
$email = $data['email'];
$otp1   = $data['otp'];
if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL )) {
	http_response_code( 422 );
	exit();
}
if ( $otp1 < 100000 || $otp1 > 999999 ) {
	http_response_code( 202 );
	exit();
}
try {
	$stmt = $con->prepare( 'SELECT otp, is_activated FROM `subscribers` WHERE email = ?' );
	$stmt->bind_param( 's', $email );
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result( $otp, $is_activated );
	$stmt->fetch();
	$otp1  = intval( $otp1 );
	$otp     = intval( $otp );	
	$numRows = $stmt->num_rows;
	if ( $numRows === 0) {
		http_response_code( 404 );
		exit();
	} elseif ($is_activated === 1) {
		http_response_code(201);
		exit();
	} else {
		if ($otp1 !== $otp) {
			http_response_code( 202 );
			exit();
		} else {
			$stmt = $con->prepare( 'UPDATE `subscribers` SET is_activated = 1 WHERE email = ?' );
			$stmt->bind_param( 's', $email );
			$stmt->execute();
			$stmt->close();
			http_response_code( 200 );
			exit();
		}
	}
} catch (\Throwable $th) {
	http_response_code( 500 );
	exit();
}