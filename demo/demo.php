<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Datalous Object Testing</title>
<link rel="stylesheet" type="text/css" href="core.css"/>
<script src="https://code.jquery.com/jquery.js"></script>
<script type="text/javascript" src="js/a_starobject.js"></script><!-- core pathfinding javascript -->
<script type="text/javascript" src="js/mapdataobjects.js"></script><!-- datamaniputlation and core applciation code -->
<script type="text/javascript" src="js/urlobject.js"></script><!--  Query string code -->
<script type="text/javascript" src="js/reporter.js"></script>
 <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
 <script src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/applicationruntime.js"></script><!-- Interface and data load javascript -->
<?php require("grid.php"); 
$map = new mapmaker('grid');
$url = basename($_SERVER['PHP_SELF']);
?>
</head>

<body> 
<nav class="navbar navbar-default" role="navigation">
  <div class="container">
   <ul class="nav navbar-nav">
   <li class="navbar-brand">Datalous Mapping</p>
   <li> <button id="clearpath" type="button" class="btn btn-default navbar-btn btn-danger"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This button clears alls all paths and flags from the map" data-title='Clear Map'></span> Clear Map</button></li>
   <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-info-sign infopoint" data-content="These url functions that demonstrate how the mapping functionality can be accessed solely through query strings." data-title='URL Functions'></span> URL Functions <b class="caret"></b></a>
          <ul class="dropdown-menu">
          	<li><a href="<?php echo $url;?>?start=a1&stype=code">Find Start Token A1</a></li>
            <li><a href="<?php echo $url;?>?start=tom+good&stype=person">Find Tom Good</a> </li>
            <li> <a href="<?php echo $url;?>?start=Sarah+Smith&stype=person&target=tom+good&ttype=person">Find A Path Between Sarah Smith and Tom Good</a></li>
            <li> <a href="<?php echo $url;?>?start=a2&stype=code&stype=person&target=mens&ttype=type">Find The Closest Mens Bathroom To Tom Good</a></li>
          </ul><!--/dropdown-menu-->
    </li><!--/dropdown-->
    <li></li>
     <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-info-sign infopoint" data-content="These options allow the highlighting  or hiding of all each map object types, this shows you all the available choice for mapping" data-title='Show All Functions'></span> Show All<b class="caret"></b></a>
          <ul class="dropdown-menu">
          	<li><a class='showall' href="#" data-type='start' data-action="show">Show All Start Locations</a></li>
            <li><a class='showall' href="#" data-type='pepole' data-action="show">Show All People</a></li>
          	<li><a class='showall' href="#" data-type='mens' data-action="show">Show All Mens Room</a></li>
            <li><a class='showall' href="#" data-type='womens' data-action="show">Show All Womens Room</a></li>
            
          </ul><!--/dropdown-menu-->
    </li><!--/dropdown-->
    <li><a class="showpeopletable" href="#"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This option will show a table of all the people saved in the application database. This table also has controls to  assign a person as the start, target, place a pin in their location and run the pathfinding if both a target and start has been chosen " data-title='Show People Table'></span> Show People Table</a></li>
    <li><a class="showstarttable" href="#"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This option will show a table of all the tokens saved in the application database. This table also has controls to  assign a token as the start, target, place a pin in it's location and run the pathfinding if both a target and start has been chosen" data-title='Show Token Table'></span> Show Token Table</a></li>
    <li><a class="showpplacetable" href="#"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This option will show a table of all the places saved in the application database. This table also has controls to  assign a place as the start, target, place a pin in it's location and run the pathfinding if both a target and start has been chosen. Use the URL option to run the find the closest function" data-title='Show Place Table'></span> Show Place Table</a></li>
      </ul><!--/nav navbar-nav-->
  </div>
</nav>
<div id="map" class="container">
    <?php $map->gengrid(72,152);  ?>
</div> 

<div class="modal fade" id="persontablemodal" tabindex="-1" role="dialog" aria-labelledby="Display Results" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
        <h4 class="modal-title" id="myModalLabel">Available People Table</h4>
      </div><!--/modal-header-->
      <div class="modal-body">
          <table class="table" id="person-table" data-empty='true'>
             <thead><th>First Name</th><th>Last Name</th><th>Department</th><th>Position</th><th>Set Location Type</th><th><span class="glyphicon glyphicon-info-sign infopoint pepoleinfo" data-content="Use these buttons to  assign that row's object as the astar target, astar start or place a pin in its location. The application will only allow for one  selection of that type and any previous will be unselected even across tables" data-title='Assign Place As Buttons'></th></thead>
             <tbody>
             </tbody>
         </table>
      </div><!--/modal-body-->
       <div class="modal-footer">
        <a href="#" class="btn btn-primary btn-lg disabled runpathbtn" role="button"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This button will run the path finding function if a start and target have been selected from the tables or URL" data-title='Run Pathfinding Button'> Generate Path</a>
      </div>
    </div><!--/modal-content-->
  </div><!--/dialog-->
</div><!--/tablemodal-->



<div class="modal fade" id="starttablemodal" tabindex="-1" role="dialog" aria-labelledby="Display Results" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
        <h4 class="modal-title" id="myModalLabel">Available Tokens Table</h4>
      </div><!--/modal-header-->
      <div class="modal-body">
       <table class="table" id="start-table" data-empty='true'>
             <thead><th>Start Code</th><th>Set Location Type</th><th><span class="glyphicon glyphicon-info-sign infopoint tokeninfo" data-content="Use these buttons to  assign that row's object as the astar target, astar start or place a pin in its location. The application will only allow for one  selection of that type and any previous will be unselected even across tables" data-title='Assign Place As Buttons'></th></thead>
             <tbody>
             </tbody>
         </table>
             </div><!--/modal-body-->
              <div class="modal-footer">
        <a href="#" class="btn btn-primary btn-lg disabled runpathbtn" role="button"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This button will run the path finding function if a start and target have been selected from the tables or URL" data-title='Run Pathfinding Button'> Generate Path</a>
      </div>
    </div><!--/modal-content-->
  </div><!--/dialog-->
</div><!--/tablemodal-->


<div class="modal fade" id="placetablemodal" tabindex="-1" role="dialog" aria-labelledby="Display Results" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
        <h4 class="modal-title" id="myModalLabel">Available Places Table</h4>
      </div><!--/modal-header-->
      <div class="modal-body">
       <table class="table" id="place-table" data-empty='true'>
             <thead><th>Place Name</th><th>Place Type</th><th>Place ID</th><th>Set Location Type</th><th><span class="glyphicon glyphicon-info-sign infopoint locinfo" data-content="Use these buttons to  assign that row's object as the astar target, astar start or place a pin in its location. The application will only allow for one  selection of that type and any previous will be unselected even across tables" data-title='Assign Place As Buttons'></th></thead>
             <tbody>
             </tbody>
         </table>
             </div><!--/modal-body-->
              <div class="modal-footer">
       <a href="#" class="btn btn-primary btn-lg disabled runpathbtn" role="button"><span class="glyphicon glyphicon-info-sign infopoint" data-content="This button will run the path finding function if a start and target have been selected from the tables or URL" data-title='Run Pathfinding Button'> Generate Path</a>
      </div>
    </div><!--/modal-content-->
  </div><!--/dialog-->
</div><!--/tablemodal-->


<div class="modal fade" id="description" tabindex="-1" role="dialog" aria-labelledby="Display Results" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
        <h4 class="modal-title" id="myModalLabel">How This Sample Application Works</h4>
      </div><!--/modal-header-->
      <div class="modal-body">
This application is a  prototype the Datalous javascript object based location mapping and path finding library, it is a sample of of some of the core mapping functionality available . The Datalous  library is  application will place flags on predefined locations that are read from a mySQL  database and then plot the shortest path between these locations. In this version the pathfinder algorithm is simple aStar implementation but in future versions this will be updated to a more robust third party pathfinding. This initial prototype focus on the the data retrieval and simple method based interaction with the data. The library itself consists of 5 different control objects that can be either be used individually or can be extended into one master application object 

FOr Instruction on how to use this appliaction l
</div>
    </div><!--/modal-content-->
  </div><!--/dialog-->
</div><!--/tablemodal-->

</body>
</html>