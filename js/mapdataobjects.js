
  ///////////////////////////// IMPORTANT NOTICE THIS CODE IS STILL IN DEVOLPMENT AND IS LICENSED //////////////////////////////////////////
 // Datalous by Sam Langberg (samlangberg.com) is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License. //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Application shell//////////////////////////////// this code is the over all controls and data storgage controls all the other 
var applicationCore = function(core) {
   this.astarcore=core;//this holds all sastar object
   this.loadGrid=function(data)
	{
		if(!data)//this checks if the data has been sent as a ver or if it should use its stored map data
		{
			if(typeof this.mapdata["map"] !== "undefined")//checks to see if the data is avialble
			{
				this.closedata = eval(this.mapdata["map"]);//unpacks the jason
				this.astarcore.loadGrid(this.closedata);//send data to astar core
				console.log("closed data set from store");
			}
			
			else
			{
			console.error("no data for map");
			}
		}
		
		else
		{
			this.startdata=data;// uses passed in data as start data
			console.log("use input data for maps closed");		
		}
	}
	
	this.getFromLocalData=function()//this checks local storage for mao data then sets map data based on what it finds
	{
		if(typeof(Storage)!=="undefined")
		  {
			  if(localStorage.getItem("mapdata"))//check to see if map data is in local storage
			  {
				 var mapdata = JSON.parse(localStorage.getItem("mapdata"));//parses the jason local storage var
				 console.log("map data from local");
				 return mapdata;
			  }//end if has mapdata
			  
			  else
			  {
				  return false;
				  console.error("no local data for map");
			  }
		  }//edn if local
		  
		  else
		  {
			  return false;
			    console.error("no local local storage data for map");
		  }//end dle no lcoal
	}
	
	this.loadData=function(data,skiplocal)//another local data pareseer
	{
		if(typeof(Storage)!=="undefined" && skiplocal !== true)
		  {
				 this.mapdata = data;
				 localStorage.setItem("mapdata", JSON.stringify(data));
				 console.log("map data from input - now saved in local");
		  }//end if starge
		else
		  {
		  this.mapdata = data;
		  }//end else starage
		  
		 
			 
	}//loadData
	
	
	this.construct=function(mapdata)
	{
		var d = new Date();
		var n = d.toLocaleString();
		console.log("<----- Construct Start: " + n +" ------------->");//for devloper displays load dats
		if(typeof mapdata !== "undefined")
		{
		this.loadData(mapdata);//asgins map data to object peroepty
		this.astarcore.genGrid();//gnerates astar cell object grid
		this.loadGrid();//this loads the closed squares
		if(this.hasOwnProperty("setStartData")){this.setStartData();} else { console.error("Application has not been extended with place data");}//checks to see if method has been extend into app then runs it
		if(this.hasOwnProperty("setPlaceData")){this.setPlaceData();} else { console.error("Application has not been extended with place data");}//checks to see if method has been extend into app then runs it
		if(this.hasOwnProperty("setPersonData")){this.setPersonData();} else {console.error("Application has not been extended with person data");}//checks to see if method has been extend into app then runs it
		  console.log("<----- Construct End ------------->");
		}	
		
		else
		{
			console.error("construct fail no app data");
		}	
	}//construct
	
	
	this.setStart=function(start,type)//this processs the start data and start type data and runs the right method accrdingly
	{
		if(!type){ console.error("app set start fail: no start type"); return false;}//check to see no type throws error and restuns flase
		switch(type)
			{
			case "code":
			  this.setStartAs(start,"start");//this sets astar start from Token location code, check stokenData
			  console.log("- start set using startFromData");
			  break;
			case "person"://this sets astar start from person name, check personData
			  this.setPersonAs(start,"start");
			  console.log("- start set using setPersonAs");
			  break; 
			case "place":
			  this.setPlaceAs(start,"start");//this sets astar start from place id, check placeData
			  console.log("- start set using setPlaceAs");
			  break;
			default:
			  console.error("app set start fail: no vaild start type");//throw error if unsupported place type
			  return false;
			}
	}//end set start
	
	
	this.setTarget=function(target,type)//this processs the target data and start type data and runs the right method accrdingly
	{
			switch(type)
			{
			case "code":
			  this.setStartAs(target,"target");//this sets astar start from start location code, check startData
			  console.log("- start set using startFromData");
			  break;
			case "type"://this is for place type like mens bath, womens bath, exit
			  if(this.astarcore.foundstart)//can only process target  of type if start has been set
			  {
			  this.findClosest(target);//this sets astar target from place type then runs astar to find closest, check placeData
			  console.log("- target set using findClosest");
			  }
			  
			  else
			  {
				 console.error("set target error: can not find closest with no start");
			  }
			  break;
			case "person":
				console.log("t"+ target);
			  this.setPersonAs(target,"target");//sets person as target checl personData
			  console.log("- target set using setPersonAs");
			  break; 
			case "place":
			  this.setPlaceAs(target,"target");//sets palce as target checl personData
			  break;
			default:
			  console.error("set target error: not vaild target type");
			}
		}//end set target
		
		
		this.dataParser=function(data,input,flag)
		{
			if(typeof data !== "undefined")
			{
				switch(type)
				{
				case "start":
				  this.astarcore.setStart(data[input].y,data[input].x);
				  break;
				case "target":
				  this.astarcore.setTarget(data[input].y,data[input].x);
				  break;
				case "find": 
					this.astarcore.markGrid(data[input].y,data[input].x,flag);
				 break;
				default:
				  console.error("dataParser Failed: Not vaild type found"); return;
				}
				return data[input];//returns the found data for extracting other data in the application
			}
		}
		
	this.clearMap=function()//this processs the target data and start type data and runs the right method accrdingly
	{
	}
		
};//end app



//START DATA////////////////////////////////
function startData()
{
	this.setStartData=function(data)
	{
		if(!data)
		{
			if(typeof this.mapdata["start"] !== "undefined")//checks to see if start map data exists then sets startdata
			{
				this.startdata=this.mapdata["start"];
			}
			
			else
			{
			console.error("no data for start");
			}
		}
		
		else
		{
			this.startdata=data;
			console.log("use data for start");		
		}
	}
	this.setStartAs=function(code,type)//sets start for uquie start location id code
	{	
		if(typeof this.mapdata["start"] !== "undefined")
			{
				switch(type)
				{
				case "start":
				  this.astarcore.setStart(this.startdata[code].y,this.startdata[code].x);
				  break;
				case "target":
				  this.astarcore.setTarget(this.startdata[code].y,this.startdata[code].x);
				  break;
				case "find": 
					this.astarcore.markGrid(this.startdata[code].y,this.startdata[code].x,'person');
				 break;
				default:
				  console.error("setStarAs Failed: Not vaild type found"); return;
				}
				return this.startdata[code];//returns the found data for extracting other data in the application
			}
		
	}//end setStatt
	
	this.startFromXY=function(x,y)//sets start from x or y cordinets
	{
		this.astarcore.setStart(x,y);
	}//end setStatt
	
	
	this.showAllStart=function()//this mark the grid for each start location
	{
	for (start in this.startdata)
			{
				this.astarcore.markGrid(this.startdata[start].x,this.startdata[start].y,'person');
			}
	}
	
	
	this.hideAllStart=function()//this will clear the grid for each start location
	{
	for (start in this.startdata)
			{
				this.astarcore.clearTile(this.startdata[start].x,this.startdata[start].y);
			}
	}
}
//END OF START DATA///////////////////////

//PLACE DATA////////////////////////////////
function placeData(core)
{
//this.astarcore=core;
this.data; 
this.setPlaceData=function(data)
{
	if(!data)//checks to see if data is passed in then sets startdata
		{
			if(typeof this.mapdata["place"] !== "undefined")//checks to see if palce map data exists then sets startdata
			{
				this.placedata=this.mapdata["place"];
			    console.log("place data set from store");

			}
			
			else
			{
			console.error("no data for place");
			}
		}
		
		else
		{
			this.placedata=data;
			console.log("use data for placedata");		
		}
}

this.setPlaceAs=function (id, setas)//find a place by a unquie id code
{
	for (x in this.placedata)//loops through all place data
	{
		var type = this.placedata[x];//extracts type
		for (locationtype in type)//loops through all of the places in that place type
		{
			if(type[locationtype]["id"] == id)//matches the proved id
			{
				if(setas)
				{
					switch(setas)//check to see if start ot target
						{
						case "start":
						  this.astarcore.setStart(type[locationtype].y,type[locationtype].x); 
						  break;
						case "target":
						  this.astarcore.setTarget(type[locationtype].y,type[locationtype].x); 
						  break; 
						case "find":
						  this.astarcore.markGrid(type[locationtype].y,type[locationtype].x,'place'); 
						  return type[locationtype];
						  break;
						  
						default:
						  console.error("setPlaceAs setas error: not vaild setas");
						}//swtich
				}//if set as
				
				return type[locationtype];
			}//if key = id
		}//for locationtype in type
	}//for (x in this.placedata
}//end findby id


this.findClosest=function (type)//find the closest location of a type
{
	var results=new Array();
	if(typeof this.mapdata["place"] === "undefined"){console.error("findMulti Failed: Not vaild place type");  return false;}//checks if vlaid palce type
	else{
		
		for (var i = 0; i < this.placedata[type].length; i++)//complie array of palce typew
		{	
		x = this.placedata[type][i].x
		y = this.placedata[type][i].y
		var result=[y,x];
		results.push(result);	
		}//end loop
		
		var shorestindex = this.astarcore.findClosest(results);//runs if start valiadation, an runs astar to all place then return the index of the loaction that is closet to start
		return this.placedata[type][shorestindex];
	}//end else
}//end findClosest

this.markAll=function (type,flagtype,starttag,content,endtag)//puts a flag in cells for  all loactions of a  type
{
	if(typeof this.mapdata["place"] === "undefined"){console.error("markAll Failed: Not vaild place type"); return false;}//end if
	else{
		for (var i = 0; i < this.placedata[type].length; i++)
		{
		x = this.placedata[type][i].x
		y = this.placedata[type][i].y
			if(flagtype !== "custom")
			{
				this.astarcore.markGrid(x,y,flagtype);
			}
			
			else
			{
				this.astarcore.markGridCustom(x,y,starttag,content,endtag);
			}
		}//end loop
	}//end else
}//end mark all


this.clearAll=function (type)//puts a flag in cells for  all loactions of a  type
{
	if(!this.placedata[type]){console.error("clearAll Failed: Not vaild place type"); return;}//end if
	else{
		for (var i = 0; i < this.placedata[type].length; i++)
		{
		x = this.placedata[type][i].x
		y = this.placedata[type][i].y
		this.astarcore.clearTile(x,y);
		}//end loop
	}//end else
}//end mark all

}
//END PLACE DATA///////////////////////

//PLACE DATA////////////////////////////////
function personData()
{
//this.astarcore=core;
this.nameArray=new Array();
this.setPersonData=function(data)
{
	if(!data)//checks to see if data is passed in then sets persondata
		{
			if(typeof this.mapdata["person"] !== "undefined") //checks to see if person map data exists then sets startdata
			{
			this.persondata=this.mapdata["person"];	
			console.log("person data set from store");
			}
			
			else
			{
			console.error("no data for persondata");
			}
		}
		
		else
		{
			this.persondata=data; //checks to see if person map data has been pased in then sets persondata
			console.log("use data for persondata");		
		}
}

this.createNameArray=function()
{
	for (property in this.persondata)//creates an plain array of the person data indexed vaule to ne used in third party aout complete search functions can use arry index to find data in objedt
	{
		this.nameArray.push(property);		
	}//end loop
	
	return this.nameArray;
}//createNameArray


this.setPersonAs=function (name,action)
{
	name = name.replace("+"," ");//cleans inputs of url encoded charcters
	name = name.replace("-"," ");//cleans inputs of url encoded charcters
	name = name.toLowerCase();//strips caps to make comparsions easyer
	
	if(!this.persondata[name]){console.error("locatePerson Failed: No Matching result found"); return false;}//if passed in name does not exits throws error treturns false
	else{
		this.curResult = this.persondata[name];//saves result as a object property for easy acesss	
		switch(action)
		{
		case "start":
		  this.astarcore.setStart(this.persondata[name].y,this.persondata[name].x);
		  break;
		case "target":
		  this.astarcore.setTarget(this.persondata[name].y,this.persondata[name].x);
		  break;
		case "find": 
			this.astarcore.markGrid(this.persondata[name].y,this.persondata[name].x,'person');
		 break;
		default:
		  console.error("setPersonAs Failed: Not vaild type found"); return;
		}
		
	}//end else
}//end setPersonAs



this.createGroup=function(attribute,term)//this will create and return an object made of of pepole whos proived attribute matchs a provied term
{
	var resultgroup = function() {};
	for (person in this.persondata)
	{
		if(this.persondata[person][attribute] == term)
		{
		resultgroup[person] = this.persondata[person];
		}
	}//end loop
	
	this.curResult = resultgroup;
	return resultgroup
}


	this.showAllPepole=function()//this mark the grid for each person
	{
	for (name in this.persondata)
			{
				this.astarcore.markGrid(this.persondata[name].y,this.persondata[name].x,'person');
			}
	}
	
	
	this.hideAllPepole=function()//this will clear the grid for each person
	{
	for (name in this.persondata)
			{
				this.astarcore.clearTile(this.persondata[name].x,this.persondata[name].y);
			}
	}
}
//END PLACE DATA///////////////////////


//PLACE DATA////////////////////////////////
function userData(core)
{
	this.getUserId=function(data)
	{
		if(typeof this.userid == "undefined"){
		this.userid =  Math.floor(Math.random() * 90000) + 10000;
		return this.userid;}
		
		else{
		return this.userid;}
	}
	
}
//END USER DATA///////////////////////