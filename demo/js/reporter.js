// JavaScript Document

//START DATA////////////////////////////////
function reporter()
{
this.kbSize = function( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
	
	kbytes = bytes/1024;
    return kbytes +" kb";
	}
	
	
	this.timers = {}
	this.startTimer=function(name)
	{
		
		function timer(name)
		{
		this.starttime = new Date();
		this.name = name;
		this.end=function(msg)
		  {
				  this.endtime = new Date();
				  var diff = this.endtime -  this.starttime; // time difference in milliseconds
				  if(diff<1000){
				  time = diff+" milisecs";
				  }
				  else{
				  secs=diff/1000;
				  time = secs+" secs";
				  }
				  
				  output = this.name+" done in : "+time;
				  if(msg){ 
				  this.msg = msg;
				  msg = " - "+msg;
				  output+=msg}
				  console.log(output);
				  return diff;
		  }
	  
		}//end imter object
		
		var timer = new timer(name);
		this.timers[name] = timer;
		
	}//endsetimter
	
	this.stopTimer=function(name,msg)
	{
		return this.timers[name].end(msg)
	}
}
//END OF START DATA///////////////////////
