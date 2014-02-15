<?php
include 'dbconnect.php';

$mapdata["map"] = mapData();
$mapdata["start"] = startData();
$mapdata["place"] = placeData();
$mapdata["person"] = personData();

/*$fp = fopen('data.php', 'w');
fwrite($fp, json_encode($mapdata));
fclose($fp);*/

$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($mapdata));
fclose($fp);

echo json_encode($mapdata);


function mapData()
{
$mapquery = "SELECT `closed` FROM savedfloors WHERE `floornum` = 2"; //query for saved map
$savedclosed = mysql_query($mapquery);
$savedmap = mysql_result($savedclosed,0);

return $savedmap;
}//end map data

function startData()
{
$startquery = "select * from sLocations"; //start query
$savedstartlocations = mysql_query($startquery);	
   if (mysql_num_rows($savedstartlocations) == 0)
		echo "error";//load fail
	else
		while ($row = mysql_fetch_array($savedstartlocations, MYSQL_ASSOC)) {
			$x = $row["x"];
			$y = $row["y"];
			$scode = $row["code"];
			$keydirection = $row["keydirect"];	
			$key = $row["key"];		
			
	$startlist[$scode] = array(
	"x" => $x, "y" => $y,"keydirection" => $keydirection, "id" => $key
    );
	     }//end while
		 
		 return $startlist;
}//end  place data

function placeData()
{
$placequery = "SELECT * from places"; //query for places
$savedplace = mysql_query($placequery);
   if (mysql_num_rows($savedplace) == 0)
		echo "error";//load fail
	else
		while ($row = mysql_fetch_array($savedplace, MYSQL_ASSOC)) {
			$x = $row['x'];
			$y = $row['y'];
			$placetype = $row['type'];
			$kind = $row['kind'];
			$key = $row['id'];
			
			$place = array(
				"name" => $name, "placetype" => $placetype, "x" => $x, "y" => $y, "id" => $key
				);
				
			if($placetype=="bathroom")//gnerate name for kind vars
			{
				if ($kind == "m"){ 
				$name="Mens room";
				$mens[ ]= $place;
				}
				
				if ($kind == "w"){ 
				$name="Womens room";
				$womens[ ]=$place;
				}
				
				if ($kind == 'all'){
				$name="Unisex bathroom";
				$mens[ ]= $place;
				$womens[ ]=$place;
				}
			}
			
			if($placetype=="water")
			{
				$name="Water Fountain";
				array_push($water, $place);
			}
			
			if($placetype=="info")
			{
				$name="info center";
				array_push($info, $place);
			}
			
			if($placetype=="exit")
			{
				$name="Exit";
				array_push($exits, $place);
			}
	     }//end place while
		 
		 $placelist["mens"] = $mens;
		 $placelist["womens"] = $womens; 
		 $placelist["exits"] = $exits;
         $placelist["info"] = $info;
         $placelist["water"] =$water;
		 
		 return $placelist;
}//end place data

function personData()
{
$locquery = "select * from eLocations"; //query for saved lcoations tabel
$savedlocations = mysql_query($locquery);


   if (mysql_num_rows($savedlocations) == 0)
		echo "error";//load fail
	else
		while ($row = mysql_fetch_array($savedlocations, MYSQL_ASSOC)) {
			$rname = $row["name"];
			$rlname = $row["lname"];
			$rdepartment = $row["department"];
			$rtype = $row["type"];
			$rx = $row["x"];
			$ry = $row["y"];
			
			$name = strtolower($rname);
			$lname = strtolower($rlname);
			
			
			$peoplelist[$name." ".$lname] = array(
			 'name'=>$name." ".$lname,"fname" => $rname, "lname" => $rlname, "department" => $rdepartment, "position" => $rtype, "x" => $rx, "y" => $ry
			);
	     }//end person while


return $peoplelist;
}//end persondata


function writejson(){


}

?>
