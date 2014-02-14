function astarCore()
{
this.grid=new Array();
this.opened=new Array();
this.tested=new Array();
this.path=new Array();
this.gridheight=72;//set as constant for testing
this.gridlength=152;//set as constant for testing
this.tableid="grid";//set as constant for testing
this.foundstart = false;
this.foundtarget = false;


this.testfunc=function(data)
{
	alert(data);
}

this.loadGrid=function(data)//this fucntion parses  the closed cell data into the pathfinding array and darkens the closed cells
{
	var mapsopend = data;
	for (var i=0;i<mapsopend.length;i++)
	{ 
	 var x = mapsopend[i][0];
	 var y = mapsopend[i][1];
	 
	 this.grid[y][x].blocked=true;//uses a method of the cell objects in the grid
	$("#"+this.grid[y][x].str()).css({"background":"rgba(0, 0, 0, 0.8)"});
	}
}

this.setStart=function(y,x, obj)//this sets the start for pathfind and marks the grid if no false is passed in
{
		if(this.foundstart){this.grid[this.starty][this.startx].clear();}
		this.startid=this.grid[y][x].str();
		this.startx=x;
		this.starty=y;
		this.start = this.grid[y][x];	//set start
		this.foundstart = true
		
		if(obj !== false)
		this.markGrid(x,y,"start");	
}
	
this.setTarget=function(y,x, obj)//this sets the target for pathfind and marks the grid if no false is passed in
	{
		if(this.foundtarget){this.grid[this.targety][this.targetx].clear();}
		this.targetid=this.grid[y][x].str();
		this.targetx=x;
		this.targety=y;
		this.target = this.grid[y][x];	//set target
		this.foundtarget = true;
		if(obj !== false)
		this.markGrid(x,y,"target");
	}

this.markGrid=function(x,y,flagtype)//this checks to see the flag type and inserts a flag into the selected grid item
{
	this.clearTile(x,y);
	
	switch(flagtype)
		{
		case "start":
		 flag = "<div class='flag demopoint' id='start'><img src='images/start.png'/></div>";
		  break;
		case "target":
		 flag = "<div class='flag' id='end'><img  src='images/end.png'/></div>";
		  break;
		  
		case "place":
		 flag = "<div class='flag' class='location'><img src='images/place.png'/></div>";
		 break;
		 
		 case "person":
		 flag = "<div class='flag' class='location'><img src='images/person.png'/></div>";
		 break;
		 
		 case "blue":
		 flag = "<div class='flag' class='location'><img src='images/startloc.png'/></div>";
		 break;
		default:
		 flag = "<div class='flag' class='location'><img src='images/place.png'/></div>";
		}

	this.grid[y][x].addFlag(flag);//uses a method of the pos cell objects in the grid
}

this.markGridCustom=function(x,y,starttag,content,endtag)//uses will insert any html into a table cell
{
	starttag = starttag || "";
	endtag = endtag || "";
	flag = start+content+end;
	this.grid[y][x].addFlag(flag);
}


this.clearTile= function(x,y)//this use a pos cell object method to clear all internal html from a table cell
{
  this.grid[y][x].clear();
}


/*NOTE: THIS PART OF THE CODE IS FROM  http://en.literateprograms.org/A*_search_(JavaScript)?action=history&offset=20071208162054 will be replaing it with */
this.genGrid=function ()//this use a pos cell object method to clear all internal html from a table cell
{
	var x, y;

	for(y=0; y<this.gridheight; ++y) {
		this.grid[y]=[];
		for(x=0; x<this.gridlength; ++x) {
			this.grid[y][x]=new pos(x, y);
		}
	}
	
}

//==============astar code


function pos(x, y) {
	this.x=x; this.y=y;
	this.cost=0;
	this.totalcost=0;
	this.blocked=false;
	this.closed=false;
	this.prev=null;

	this.str=function() {
		return "board_"+this.x+"_"+this.y;
	}
	this.equal=function(p) {return this.x==p.x && this.y==p.y;}
	
	this.addFlag=function(flag){$("#"+this.str()).append(flag);}
	this.clear=function(){$("#"+this.str()).html("");}
}

function opencell(p, cost, prev, tested, opened, targetx, targety, grid, start)
{	
	if(p.blocked) return null;
	
	
	if(prev && prev.prev && !prev.equal(start)) {
		if(p.x-prev.x != prev.x-prev.prev.x ||
			p.y-prev.y != prev.y-prev.prev.y) cost+=4;
	}

	var totalcost=parseFloat(cost)+14*(Math.abs(p.x-targetx)+Math.abs(p.y-targety));

	/* If position is already considered: check for better cost */
	if(p.totalcost!=0) {
		if(totalcost<p.totalcost) {
			var nn;
			for(nn=0; nn<opened.length; ++nn) {
				if(p.equal(opened[nn])) {
					opened.splice(nn, 1);
					break;
				}
			}
		} else return null;
	}

	p.cost=cost;
	p.prev=prev;
	p.totalcost=totalcost;
	
	tested.push(p);
	
	var n=0;
	for(n=0; n<opened.length; ++n) {
		if(p.totalcost<opened[n].totalcost) {
			opened.splice(n, 0, p);
			break;
		}
	}
	if(n>=opened.length)opened[n]=p;

	grid[p.y][p.x]=p;

	return p;
}

function openadjacent(p,tested,opened,targetx,targety,grid,start,gridlength,gridheight)
{
	var cost=grid[p.y][p.x].cost+10;
	if(p.x>0) opencell(grid[p.y][p.x-1],cost,p,tested,opened,targetx,targety,grid,start);
	if(p.y>0) opencell(grid[p.y-1][p.x],cost,p,tested,opened,targetx,targety,grid,start);
	if(p.y<(gridheight-1)) opencell(grid[p.y-(-1)][p.x],cost,p,tested,opened,targetx,targety,grid,start);
	if(p.x<(gridlength-1)) opencell(grid[p.y][p.x-(-1)],cost,p,tested,opened,targetx,targety,grid,start);
}

//////////////end astar
this.runAstar=function()
{
	if(!this.start){ console.error("No Start Set For Astar"); return false;}
	if(!this.target){ console.error("No Target Set For Astar"); return false;}

	var best;
	var n=0;
	best=opencell(this.start, 0, this.start, this.tested,this.opened,this.targetx,this.targety,this.grid,this.start);
	while(best && !best.equal(this.target)) {
		best.closed=true;
		this.opened.shift();
		openadjacent(best,this.tested,this.opened,this.targetx,this.targety,this.grid,this.start,this.gridlength,this.gridheight);

		if(this.opened.length>0) best=this.opened[0];
		else best=null;

		if(++n>10000) {best=null; break;}	/* Catch non-stop loops (should never happen) */
	}
	if(!best) {
		//logandsend(">>>>>>ERROR NO PATH" ,userid);
		nopath=true;
		return nopath;
	}

	/* Find way back */
	while(!best.equal(this.start)) {
		this.path.push(best);
		best=best.prev;
		if(!best) {
			alert("Core code malfunction check astar code for errors");	/* Should never happen */
			break;
		}//end of best path while
	}//end of best whil
	
	}


this.genPath=function()
{
	if(!this.path){ console.error("No Path Set"); return;}
		
	for (var i = 1; i < this.path.length; i++)
	{
		$("#"+this.path[i].str()).css({"background":"rgba(215, 44, 44, 0.7)","border-radius":"5px","margin":"4px"});
		//$("#"+this.path[i].str()).addClass("pathtile");
	}//end of loop

}//end of path


this.findClosest=function(locations){
	
	//if(!this.start){ console.error("No Start Set For Multi Path"); return false;}

	this.clearPath();
	for (var i=0;i<locations.length;i++)
	{ 
		 this.path=[];
		 
		 var y = locations[i][0];
		 var x = locations[i][1];
		 this.setTarget(y,x,"noflag");
		 this.runAstar();
		 
		 
		 if(i==0)
		 {
		 this.shorestlength=this.path.length;
		 this.shorestPath=this.path;
		 this.shorestPlace=0;
		 }
		 else
		 { 
			if(this.path.length<this.shorestlength)
			{
				this.shorestlength=this.path.length;
				this.shorestPath=this.path;
				this.shorestPlace=i;
			}
		 }
		 
		this.wipe()
	}//end of for 
	var fy = locations[this.shorestPlace][0];
	var fx = locations[this.shorestPlace][1];
	this.setTarget(fy,fx);
	this.path=this.shorestPath;
	return this.shorestPlace;
}

this.wipe= function()
{
	 for (var i = 0; i < this.tested.length; i++)
		{
			this.grid[this.tested[i].y][this.tested[i].x].cost=0;
			this.grid[this.tested[i].y][this.tested[i].x].prev=null;
			this.grid[this.tested[i].y][this.tested[i].x].closed=false;
			this.grid[this.tested[i].y][this.tested[i].x].totalcost=0;
		}	
		this.tested=[];
		this.opened=[];	 
}

this.clearPath=function(clearstart)//clears path and start and end points
{
	if(clearstart == true){
	$("#"+this.startid).html("")
	$("#"+this.startid).css({"background":"transparent","border-radius":"0px"});
	}
	
	for (var i = 0; i < this.path.length; i++)
		{
			$("#"+this.path[i].str()).html("")
			$("#"+this.path[i].str()).css({"background":"transparent","border-radius":"0px"});
		}
		
		this.path=[]; 
	$("#"+this.targetid).html("")
	$("#"+this.targetid).css({"background":"transparent","border-radius":"0px"});	
}//end clear path

}////////////////------end of object-----------//////////////////


