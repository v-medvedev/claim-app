<?php

    ini_set('max_execution_time', 999);
	date_default_timezone_set('Europe/London');
	error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    // $params = $_GET;
    $action = 'getPDClaims';

     //Connect to db
    $dbName = "claims-db";              // <- Database name
    $hostname = "localhost";			// <- Localhost always
    $username = "root";			        // <- User Login
    $password = "";                     // <- User password
    
    $mysqli = new mysqli($hostname, $username, $password, $dbName);

    if ($action == 'getPDClaims') {
        $sql = "SELECT * FROM `pd-claims` ORDER BY id ASC";
        $result = $mysqli->query($sql);
        $records = [];			
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            $records[] = [
                'id' => intval($row['id']),
                'dateOfClaim' => $row['dateOfClaim'],
                'orderNo' => $row['orderNo'],
                'stockNumber' => $row['stockNumber'],
                'dispatchDate' => $row['dispatchDate'],
                'dateToClaimFrom' => $row['dateToClaimFrom'],
                'trackingNumber' => $row['trackingNumber'],
                'reasonForClaim' => $row['reasonForClaim'],
                'prepaidLabel' => $row['prepaidLabel'],
                'claimType' => $row['claimType'],
                'claimSubmitted' => $row['claimSubmitted'],
                'claimSubmittedDate' => $row['claimSubmittedDate'],
                'claimStatus' => $row['claimStatus']
            ];
            $i++;
            if ($i == 410) {
                break;
            }
        }
        // print_r($records);
        echo json_encode($records);
    }

    $mysqli->close();

?>