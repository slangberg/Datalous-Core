function mapCreator()
{
	this.gridsize = 10;
	this.mapsource = 'map2.jpg';
	this.gridColor = "rgba(0,0,0,0.2)"
	this.mapReady = false;
	this.scanSensitivity =0;
	this.wallTargetColor = [250,250,250];
	this.wallPercent = 20;
	this.blockedCells = new Array();
	this.maplayer = new Kinetic.Layer({name:"maplayer"});
	this.gridlayer = new Kinetic.Layer({name:"gridlayer"});
	this.closedlayer = new Kinetic.Layer({name:"closedlayer"});
	this.objectlayer = new Kinetic.Layer({name:"objectlayer"});
	this.stage = new Kinetic.Stage({container: 'container', width: 0, height: 0 });
	this.stage.add(this.maplayer);
	this.stage.add(this.gridlayer);
	this.stage.add(this.closedlayer);
	this.stage.add(this.objectlayer);
	
	
	this.gridlayer.on('mousedown', function(evt) {
		var action = $("#clickaction").val();
        var targetcell = evt.targetNode;
		changeCell(targetcell,action);
      	});
	
	this.createMap = function(mapimg) {
			this.mapimgobject = new Kinetic.Image({x: 0,y: 0, image: mapimg});
			this.mapimgobject.src=this.mapsource
			this.mapReady = true;
			this.mapHeight = this.mapimgobject.getHeight();
			this.mapWidth = this.mapimgobject.getWidth();
			
			this.pixels = this.mapHeight*this.mapWidth;
			
			this.stage.setWidth(this.mapWidth)
			this.stage.setHeight(this.mapHeight)
			this.maplayer.add(this.mapimgobject);
			this.maplayer.draw();
			//this.stage.add(this.maplayer);
	}

	this.vaildGridSizes  = function(mapimg) {
		gh = getFactors(this.mapHeight);
		gw = getFactors(this.mapWidth);
		this.validgrids = new Array();
		if(gh.length > gw.length){
			longest = gh;
			shorest = gw;
		}
		else{
			shorest = gh;
			longest = gw;
		}
		
		 for(var i = 0; i < longest.length; i++){
			var potgrid = longest[i];
	
				 for(var y = 0; y < shorest.length; y++){
					 if(potgrid == shorest[y]){this.validgrids.push(potgrid); break; }
				 }
		 }
	}

	this.genGrid  = function() {
		this.gridHeight = this.mapHeight/this.gridsize;
		this.gridWidth = this.mapWidth/this.gridsize;
		var xpos = 0;
		var ypos = 0
		for(var y = 0; y <= this.gridHeight; y++) {
				  for(var x = 0; x <= this.gridWidth; x++) {
					    var idstring ="cell_"+y+"_"+x;
						var cellsize = this.gridsize;
						var cellstroke = this.gridColor;
						
						var cell = new Kinetic.Rect({x: xpos, y: ypos, width: cellsize, height: cellsize, stroke: cellstroke, strokeWidth: 1, id: idstring,cellx:x,celly:y,closed:false});
	
						this.gridlayer.add(cell);
						
						xpos+=this.gridsize;
				  }//end x
				  xpos = 0;
				   ypos+=this.gridsize;
				}//end y
				
				this.gridlayer.setAttr("gridHeight",this.gridHeight);
				this.gridlayer.setAttr("mapWidth",this.mapWidth);
				this.gridlayer.setAttr("gridsize",this.gridsize);
				this.gridlayer.setZIndex(2);
				this.gridlayer.draw();
				
				//this.stage.add(this.gridlayer);
	}//genGrid

		this.saveGrid=function()
		{
		  var datatosave = this.gridlayer.toJSON();
		  localStorage.setItem("gridobject", datatosave);

		  
		}//saveGrid
		
		
		this.saveClosed=function()
		{
		  var closed = new Array();
		  var datatosave = this.closedlayer.getChildren();
		  datatosave.each(function(cell, n) {
		 	x = cell.getAttr("cellx");
			y = cell.getAttr("celly");
			var result=[y,x];
			closed.push(result);	
		});
		
		console.log(closed);

			closeddata = JSON.stringify(closed);
			console.log(closeddata);
			localStorage.setItem("closedData",closeddata);
			
			$.post( "../sql/setmapdata.php", { type: "closed", data: closeddata, floornum: 1 })
			  .done(function(data) {
				alert( "Data Saved: " + data);
			  })
		  
		  
		}//saveClosed
		
		
		this.loadClosed=function()
		{
		  reporter.startTimer("loadClosed");
		  var closeddata = localStorage.getItem("closedData");
		  var closeddataarray = eval(closeddata);
		   for (var i = 0; i < closeddataarray.length; i++)
			{	
				var y = closeddataarray[i][0];
				var x = closeddataarray[i][1];
				
				 var targetcell = this.gridlayer.find('#cell_'+y+"_"+x)[0];
				 targetcell.setAttr("closed",true);
			   	 var clone = targetcell.clone({
					fill:"rgba(255,0,0,0.3)",
					stroke:"transparent",
					id:'closedcell_'+y+"_"+x
		  		});
				
				this.closedlayer.add(clone);
				this.closedlayer
			}//end loop
		  
		  		
				//this.stage.find('.closedlayer');
				this.closedlayer.setZIndex(1);
				this.closedlayer.draw();
				reporter.stopTimer("loadClosed");	

		}//loadClosed
		
		
		this.loadGrid=function()
		{
		  var savedata = localStorage.getItem("gridobject");
		  var gridlayer = Kinetic.Node.create(savedata, 'layer');
		  
		  console.log(gridlayer.getAttr("gridHeight"));
		  //this.gridHeight = gridlayer.getAttr("gridHeight");
		 // this.mapWidth = gridlayer.getAttr("mapWidth");
		  //this.gridsize = gridlayer.getAttr("gridsize");
		  
		  
		  this.gridlayer = gridlayer;
				this.stage.add(this.gridlayer);
				this.gridlayer.setZIndex(2);
				this.gridlayer.draw();		
				
		}//loadGrid

	this.processMap = function ()
	{
		
		
		var can = this.maplayer.getCanvas();
		var context = can.getContext();
		
		var xpos = 0;
		var ypos = 0
		var basedata = context.getImageData(xpos, ypos, this.gridsize, this.gridsize);
		var data = basedata.data;
		var pixelcount = data.length/4;
		console.log(pixelcount);
		//totalcell = this.gridHeight*this.gridWidth;
		//console.log("cells: "+totalcell);
		
		//console.log(totalcell*pixelcount);
		this.targetpercentnum = (this.wallPercent/ 100) * pixelcount;

		
		targetred = [this.wallTargetColor[0]-this.scanSensitivity,this.wallTargetColor[0]+this.scanSensitivity];
		//targetgreen = [this.wallTargetColor[1]-this.scanSensitivity,this.wallTargetColor[1]+this.scanSensitivity];
		//targetblue = [this.wallTargetColor[2]-this.scanSensitivity,this.wallTargetColor[2]+this.scanSensitivity];
	
		var check = new Array();
		for(var y = 0; y <= this.gridHeight; y++) {
				  for(var x = 0; x <= this.gridWidth; x++) {
					   	var cellimgdata = context.getImageData(xpos, ypos, this.gridsize, this.gridsize);
						var celldata = cellimgdata.data;
						
	  					var nottarget = 0;
						for(var i = 0, n = celldata.length; i < n; i += 4) {
						  var red = celldata[i];
						  var green = celldata[i + 1];
						  var blue = celldata[i + 2];
						  var alpha = celldata[i + 3];
						  
						   
						  //foundtargetred=(red >= targetred[0] || red <= targetred[1])?true:false;
						  //foundtargetgreen=(green >=  targetgreen[0] || green <=  targetgreen[1])?true:false;
						  //foundtargetblue=(blue >=  targetblue[0] || blue <=  targetblue[1])?true:false;
  
						  if(red < this.wallTargetColor[0] || green < this.wallTargetColor[1] || blue < this.wallTargetColor[2]){nottarget++}
						  
					
						
						}//for data.length
						
							//console.log("P: "+blockedpercent);
						
							
							
							if(nottarget > this.targetpercentnum) 
							{
								var cell = this.gridlayer.find('#cell_'+y+"_"+x)[0];
								cell.setAttr("closed",true);
								var clone = cell.clone({fill:"rgba(255,0,0,0.3)", stroke:"transparent", id:'closedcell_'+y+"_"+x});
								this.closedlayer.add(clone);
							}
							
						xpos+=this.gridsize;
				  }//end x
				  xpos = 0;
				   ypos+=this.gridsize;
				}//end y
				
				this.closedlayer.setZIndex(1);
				this.closedlayer.draw();
				
	}
	
	function changeCell(targetcell,action)
	{
		
		var layers = targetcell.getStage().getLayers().toArray();
		var closedlayer = layers[1];
		var y = targetcell.getAttr("celly");
		var x = targetcell.getAttr("cellx");
		var celly = targetcell.getAttr("y");
		var cellx = targetcell.getAttr("x");
		var offset = targetcell.getAttr("width")/2;
		var middlex = cellx+offset;
		var middley = celly+offset;
		var closed = targetcell.getAttr("closed");
		
	switch(action)
		{
			case "close":
			if(!closed){
			targetcell.setAttr("closed",true);
			
			 var clone = targetcell.clone({
				fill:"rgba(255,0,0,0.3)",
				stroke:"transparent",
				id:'closedcell_'+y+"_"+x
			  });
		  
			closedlayer.add(clone);
			closedlayer.draw();
		  }
		  
		  else
		  {
			  targetcell.setAttr("closed",false);
			  var closedcell = closedlayer.find('#closedcell_'+y+"_"+x)[0];
			  closedcell.destroy();
			  closedlayer.draw();
		  }
		  break;
		case "place":
		
		var tooltip = new Kinetic.Label({});
		 tooltip.add(new Kinetic.Tag({fill: 'black', pointerDirection: 'down', pointerWidth: 10, pointerHeight: 10, lineJoin: 'round' }));
		 tooltip.add(new Kinetic.Text({ text: 'Test Name', fontFamily: 'Calibri', fontSize: 13, padding: 3, fill: 'white', opacity: 1 }));
		 tooltipxoffset = tooltip.getAttr("width")/2;
		 tooltipyoffset = tooltip.getAttr("height")/2;
		 tooltip.setAttr('x',Math.round(middlex));
		 tooltip.setAttr('y',Math.round(middley));
		 objectlayer.add(tooltip);
		 objectlayer.draw();
	
		  break;
		default:
		 alert("error");
		}
		
		
  
	}

	/*function getFactors(integer){
	  var factors = [],
	  quotient = 0;
	
	  for(var i = 1; i <= integer; i++){
		quotient = integer/i;
	
		if(quotient === Math.floor(quotient)){
		  factors.push(i); 
		}
	  }
	  return factors;
	}*/
	
}//end of mapobject