// JavaScript Document

var astarcore=new astarCore(); 
var application =new applicationCore(astarcore);
var placedata=new placeData();
var startdata=new startData(); 
var pepoledata=new personData(); 
var urldata=new urlData();
var reporter=new reporter();
var App = $.extend({},urldata, application, placedata,startdata,pepoledata,reporter);

$(document).ready(function(e) {
App.startTimer("init");//check reporter

if(!App.getFromLocalData())//check to see if local data is present prevents uneessary data transfers
{
$.getJSON("sql/getmapdata.php",function(result)//this function gets map data from the database, outside the object to prevent jquery obj conflicts
	{
		App.construct(result);//check map dataobjects file
		App.runUrl();// runs the query string check - look at urldata
		App.stopTimer("init"," laod done from jason");
	}); 
}

else
{
	App.construct(App.getFromLocalData());//gets data from saved local data
	App.runUrl();
	App.stopTimer("init","load done from local");	
}


$('.infopoint').popover({trigger:'hover',placement:'bottom',delay: { show: 400, hide: 100 }});//actiavtes info point popovers


$(".showall").click(function() {//hides and shows all selected objects
	
	var action = $(this).data('action');
	var type = $(this).data('type');
	var text = $(this).text();
	
	switch(type)
  {
	case "pepole":
	if(action == 'show'){App.showAllPepole()}else{App.hideAllPepole()} 
	break;
	case "start":
	if(action == 'show'){App.showAllStart()}else{App.hideAllStart()} 	
	break;
	case "mens":
	if(action == 'show'){App.markAll('mens')}else{App.clearAll('mens')} 	
	break;
	case "womens":
	if(action == 'show'){App.markAll('womens')}else{App.clearAll('womens')} 	
	break;
	default:
	console.error("show error: not vaild type");
  }
  
	if(action == 'show'){
		$(this).data("action","hide");
		$(this).text(text.replace("Show","Hide"));
		} 
	else
	{
		$(this).data("action","show");
		$(this).text(text.replace("Hide","Show"));
	}
});


$('#clearpath').click(function() {//clears map of all possible data
	App.astarcore.clearPath(true);//true clears start
	App.hideAllStart();
	App.clearAll('mens');
	App.clearAll('womens');
	App.hideAllPepole();
});

$(".showpeopletable").click(function() {
	event.preventDefault();
	if($('#person-table').data("empty")==true){//check to see if table alrady has data
		for (person in App.persondata)//if not loops through all saved data and populates table with object data
		{
			var personob = App.persondata[person];
			$('#person-table > tbody:last').append('<tr><td>'+personob.fname +'</td><td>'+personob.lname +'</td><td>'+personob.department +'</td><td>'+personob.position +
			'</td><td>'+returnbtn(person,'person')+'</td><tr>');//uses function to retunr complext compex btn html with proper index data and type data
		}
		$( ".flagset li a" ).bind( "click", function() {setflagbtn($(this));});
		$('#person-table').data("empty",false);//sets table to not empty
		
	}
	
	$('#persontablemodal').modal('toggle');//toggle bootstrap modal
	
});


$(".showstarttable").click(function() {//see showpeopletable notes
	event.preventDefault();
	if($('#start-table').data("empty")==true){
			for (start in App.startdata)
			{
				$('#start-table > tbody:last').append('<tr><td>'+start+'</td><td>'+returnbtn(start,'startlocation')+'</td><tr>');
			}
			$( ".flagset li a" ).bind( "mousedown", function() {setflagbtn();});
			$('#start-table').data("empty",false);
			
	}
	$('#starttablemodal').modal('toggle');
	
});


$(".showpplacetable").click(function() {//see showpeopletable notes
	event.preventDefault();
	if($('#place-table').data("empty")==true){
			for (placetype in App.placedata)
			{
				var placetypeobj = App.placedata[placetype];
				for (place in placetypeobj){
					var placeobj = placetypeobj[place];
				$('#place-table > tbody:last').append('<tr><td>'+placeobj.name +'</td><td>'+placeobj.placetype +'</td><td>'+placeobj.id +'</td><td>'+returnbtn(placeobj.id,'place')+'</td><tr>');
				}
			}
			$( ".flagset li a" ).bind( "mousedown", function() {setflagbtn();});
			$('#place-table').data("empty",false);
			
	}
	$('#placetablemodal').modal('toggle');
	
});


});//end doc ready



function setflagbtn(){//this appys complex functilaity to the table btns
	event.preventDefault();
	event.stopPropagation();
	
	var target = $( event.currentTarget );
	var index = target.closest( '.btn-group' ).data('index');//gets the taget objs index property for finding it in parent data obj 
	var action = target.closest( '.btn-group' ).data('action');//gets the location type to assgin the target obj
	var parnetmodal =  target.closest( '.modal').attr('id');
	
   $('.setas'+target.data('type')).html('Set As&nbsp;&nbsp;&nbsp;').removeClass('setas'+target.data('type'));//check to see if another table obj has been set as the slected location type if found clears the old btn text and removes it identfy class
   target.closest( '.btn-group' ).find( '[data-bind="label"]' ).addClass('setas'+target.data('type'));//add location ideftying class to the current button label
   target.closest( '.btn-group' ).find( '[data-bind="label"]' ).html( target.html() ).end().children( '.dropdown-toggle' ).dropdown( 'toggle' );//add changes the current lables html to match choice

	
 switch(action)//runs the right application method based on the type of object chosen
  {
	case "person":
	App.setPersonAs(index,$target.data('type'));
	break;
	case "startlocation":
	App.setStartAs(index,$target.data('type'));
	break;
	case "place":
	App.setPlaceAs(index,$target.data('type'));
	break;
	default:
	console.error("setflagbtn error: not vaild action type");
  }
  
  
  activerunbtn(parnetmodal);
}//end setflagbtn


function activerunbtn(parnetmodal){//checks to see if there is a start and target for pathfinding if so actavtes run path button and bind run path code to it 
	event.preventDefault();
	if(App.astarcore.foundstart && App.astarcore.foundtarget){
	$('.runpathbtn').removeClass( "disabled" ); 
	$('.runpathbtn').bind( "mousedown", function() {	
		App.astarcore.runAstar();
		App.astarcore.genPath();
		$('#'+parnetmodal).modal('toggle');
		});
	}
	
	else{
		$('.runpathbtn').unbind( "click" );
		$('.runpathbtn').addClass( "disabled" ); 
	}
}

function returnbtn(index,action){//returns complex btn html with the proper type and index
	return '<div class="btn-group flagselect" data-index="'+index+'" data-action="'+action+'"><button type="button" class="btn btn-default dropdown-toggle flagtypeset" data-toggle="dropdown"><span data-bind="label">Set As&nbsp;&nbsp;&nbsp;</span> <span class="caret"></span></button><ul class="dropdown-menu flagset" role="menu"><li><a data-type="start" class="stdrop" href="#"><span class="glyphicon glyphicon-flag"></span> Start&nbsp;&nbsp;</a></li><li><a data-type="target" class="tadrop" href="#"><span class="glyphicon glyphicon-flag"></span> Target</a></li><li><a data-type="find" class="fidrop" href="#"><span class="glyphicon glyphicon-flag"></span> Show&nbsp;</a></li></ul></div>';
}

