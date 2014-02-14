<?php
include 'dbconnect.php';

$type = $_POST["type"];

switch ($type) {
    case "closed":
			$query = "UPDATE savedfloors SET closed = '" . $_POST["data"] .  "' WHERE floornum=".$_POST["floornum"];
			$msg = "closed set";
			echo $msg;
        break;
		
		
		case "setplace":
			$query = "UPDATE savedfloors SET closed = '" . $_POST["data"] .  "' WHERE floornum=".$_POST["floornum"];
			$msg = "closed set";
			echo $msg;
        break;

}

if (!mysql_query($query))
  {
  $msg = mysql_error();
  }
  

mysql_close($cn);
?>
