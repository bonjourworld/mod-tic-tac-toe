<?php

	// create pdo
	$dbh = new PDO('mysql:host=localhost;dbname=[your DB name goes here ];charset=utf8', '[your DB user name goes here]', '[your DB password goes here]');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	// build sql statement
	$sql = "INSERT INTO `scores` (`name`, `colour`) VALUES (:name,:colour)";
	
	// prepare for sanitization
	$stmt = $dbh->prepare($sql);

	// bind parameters
	$stmt->bindParam(':name',$name);
	$stmt->bindParam(':colour',$colour);

	// get inputs from POST variables

	$name = strtoupper($_POST['name']);
	$colour = $_POST['colour'];

	// execute
	try {
		// execute
		$stmt->execute();
	} catch(PDOException $ex) {
		// display an error
		echo "$name";
    	echo "$colour";
    	echo $ex->getMessage();
	}
    header('Location:index.php');
	// Done!
	
?>