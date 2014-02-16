##startData Object Methods##
###startData.setStartData(data)###
this sets start data either from this.mapdata are passed in data 

**Reads from:** 
- this.mapdata.start (object/array) start token object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated input:** 
- data (object/array) (object/array) start token object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated output:**
- this.startdata (object/array) start token object collection

###startData.setStartAs(code,type)
uses code input to set an start token object as the start or target, or returns the found start token object

**Reads from:** 
- this.startdata (object) 
**Associated input:** 
- code (string) - alpha numeric string used to match start token object id code 
- type (string/options) - a set of predefined alpha numeric strings
    - start
    - target
    - find
  
**Associated output:** 
Based on type input:
- start - this.setStartAs(start 'start'); (method) - use this.startdata to set target cell
- target - this.setStartAs(start 'target'); - uses this.placedata and a set start cell to find the closest lcoation of a type as the target cell
- find - this.startdata[code] (object)


###startData.startFromXY(x,y)
sets astart start based on input x and y 

**Reads from:** 
- this.startdata (object) 
**Associated input:** 
- x (int) - start cells x value
- x (int) - start cells y value
  
**Associated output:** 
- this.astarcore.setStart() (method) - uses input x and y to set a start location - this.startFromData(start); (method) - use this.startdata to set target cell


###startData.showAllStart()
marks all cells that contain a start token object

**Reads from:** 
- this.startdata (object) 
  
**Associated output:** 
- this.astarcore.markGrid() (method) - puts a place flag in selected cell


###startData.hideAllStart()
clears all cells that contain a start token object

**Reads from:** 
- this.startdata (object) 
  
**Associated output:** 
- this.astarcore.clearTile() (method) - clears all html in selected cell
