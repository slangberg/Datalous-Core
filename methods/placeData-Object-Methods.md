##placeData Object Methods##
###placeData.setStartData(data)###
this sets this.placedata data either from this.mapdata are passed in data 

**Reads from:** 
- this.mapdata.place (object/array) place object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated input:** 
- data (object/array) (object/array) place object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated output:**
- this.placedata (object/array) place object collection

###placeData.setPlaceAs(id, setas)### 
uses id input to set an place object as the start or target, or returns the found place object

**Reads from:** 
- this.placedata (object) 
**Associated input:** 
- id (string) - alpha numeric string used to match place object id code 
- type (string/options) - a set of predefined alpha numeric strings
    - start
    - target
    - find
  
**Associated output:** 
Based on type input:
- start - astarcore.setStart(); (method) - uses found objects x and y to set a start location
- target - astarcore.setTarget(); (method) - uses found objects x and y to set a target location
- find - returns '''this.placedata[type][object]'''(object)

###placeData.findClosest(type)### 
loops through all place data to find place object that match type that has the shortest path to set start

**Reads from:** 
- this.placedata (object)
- this.astarCore.start (object)

**Associated input:** 
- type (string/options) - a set of predefined alpha numeric strings
    - mens
    - womens
    - water
    - info
    - exits

**Associated output:** 
- returns '''this.placedata[type][shorestindex]'''(object)

###placeData.markAll(type,flagtype)### 
marks all cells that contain a place token type object

**Reads from:** 
- this.placedata (object) 
  
**Associated input:** 
- type (string/options) - a set of predefined alpha numeric strings
    - mens
    - womens
    - water
    - info
    - exits
- flagtype (string/options) - a set of predefined alpha numeric strings to pic what flag type
	- start: class='flag' images/start.png
	- target: class='flag' images/end.png
	- place: class='flag' images/place.png
	- person: class='flag' images/start.png
	- blue: class='flag' images/startloc.png
    
**Associated output:** 
- this.astarcore.markGrid() (method) - puts a place flag in selected cell


###placeData.clearAll()### 
clears html of all cells that contain a place token type object

**Reads from:** 
- this.placedata (object) 

**Associated input:** 
- type (string/options) - a set of predefined alpha numeric strings
    - mens
    - womens
    - water
    - info
    - exits
  
**Associated output:** 
- this.astarcore.clearTile() (method) - clears all html in selected cell
