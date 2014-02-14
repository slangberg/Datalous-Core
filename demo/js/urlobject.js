//url DATA////////////////////////////////
function urlData()
{
this.pathgen = false;
this.urlread = false;
this.cleanurl = true;

this.getUrlVar= function(variable)
	{
	
       var urlsobj ={};
	   var full = window.location.href;
       var qstring = full.split("?");
	   if(qstring[1])
	   {
		   var vars = qstring[1].split("&");
		   for (var i=0;i<vars.length;i++) {
				   var pair = vars[i].split("=");
				   
				  urlsobj[pair[0]]=pair[1];
				  if(pair[0] == variable){return pair[1];}
		   }
		   return(false);
		   this.urlread = true;
	   }//end if qssting
	   //this.urlsobj = urlsobj;
	  // return urlsobj;
}

this.runUrl=function(calllback)
{
	console.log("<--------- start url read --------->");
	var start = this.getUrlVar("start");
	var starttype = this.getUrlVar("stype");
	var target = this.getUrlVar("target");
	var targettype = this.getUrlVar("ttype");
	var searchterm = this.getUrlVar("find");
	var searchscope = this.getUrlVar("scope");
	var searchaction = this.getUrlVar("action");
	
	if(start)
	{
		console.log("- url start found:"+ start);
		if(starttype)
		{
		this.cleanurl = false;
		this.setStart(start,starttype);
		console.log("- url start type found:"+ starttype);
		}
		
		else
		{
			 console.error("url error: no start type found");
		}
		
	}
	
	if(target)
	{
		console.log("- target found:"+ target);
		if(targettype)
		{
		this.cleanurl = false;
		console.log("- target type found:"+ targettype);
		this.setTarget(target,targettype);
		}
		
		else
		{
			 console.error("url error: not vaild target type");
		}
	}
	
	if(this.astarcore.foundstart && this.astarcore.foundtarget)
	{
		this.astarcore.runAstar();
		this.astarcore.genPath();
		this.pathgen = true}
	
	console.log("<--------- end url read --------->");
}//runUrl
}//END OF Url DATA///////////////////////
