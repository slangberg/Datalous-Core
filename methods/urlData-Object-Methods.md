##urlData Object Methods##
###urlData.getUrlVar(variable)###
this gets passed in query string variable from current url 

**Reads from:** 
- window.location.href (DOM Object)

**Associated input:** 
- variable (string) - alpha numeric string used to match query varible 

**Associated output:**
- variable value (string) - alpha numeric string that was the value for input variable 

###urlData.runUrl()###
this gets all provided query string variables and passes it to the path finding functions then runs pathfinding if start and target found

**Reads from:** 
- window.location.href (DOM Object)

**Associated input:** 
- start (string) - alpha numeric string used to match person object 
- starttype (string) - alpha numeric string used to match person object 
- target (string) - alpha numeric string used to match person object 
- targettype (string) - alpha numeric string used to match person object 

**Associated output:**
- this.setStart(start,starttype); (method) - runs correct start data parser based on input
- this.setTarget(target,targettype); (method) - runs correct target data parser based on input
- this.astarcore.runAstar();
- this.astarcore.genPath();
