##applicationCore Object Methods##
###applicationCore.loadData(mapdata)###
this loads external map data into the application for access by the rest of the library 

**Associated input:** 
- mapdata (object/array) see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)
    - map (object) - closed cells
    - start (object) - start token object collection
    - place (object) - place object collection
    - person (object) - person object collection- t

**Associated output:**
- localStorage.setItem("mapdata"); / false

###applicationCore.loadGrid(data)###
loads data for closed cells in astar object

**Associated input:** 
- data (object/array) - this is can be object/json of array or pure array
  
**Associated output:** 
- this.mapdata["map"] (object) - this is an interanl object created witht he loadData method

###applicationCore.getFromLocalData()###

this checks local storage for map data then returns saved map data or false 

**Reads from:** 
- localStorage.getItem("mapdata")

**Associated input:** 
- none

**Associated output:**
- returns localStorage.getItem("mapdata"); / false

###applicationCore.construct(mapdata)###
this master function takes inputed map data and then runs all data constuct methods

**Associated input:** 
- mapdata (object/array) see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)
    - map (object) - closed cells
    - start (object) - start token object collection
    - place (object) - place object collection
    - person (object) - person object collection- t

**Associated output:**
- this.loadData(mapdata) (method) - sets matdata property
- this.astarcore.genGrid(); (method) - generates astar cell object grid
- this.loadGrid(); (method) - loads closed cells into astar cell object grid
- this.setStartData(); (method) - sets startdata person data property
- this.setPlaceData(); (method) - sets placedata person data property
- this.setPersonData(); (method) - sets persondata person data property

###applicationCore.setStart(start,type)###
this processes the start input and start type and runs the right method based on the combnation

**Reads from:** 
- this.startdata (object) 
- this.placedata (object)
- this.persondata (object)

**Associated input:** 
- start (string) - alpha numeric string
- type (string/options) - a set of predefined alpha numeric strings
    - code
    - person
    - place

**Associated output:**
Based on type input:
- code - this.startFromData(start); (method) - use this.startdata to set start cell
- person - this.setPersonAs(start,"start"); (method) - use this.persondata to set start cell
- place - this.findPlaceByID(start,"start"); (method) - usethis.placedata to set start cell

###applicationCore.setTarget(target,type)###
this processes the target input and target type and runs the right method based on the combnation

**Reads from:** 
- this.startdata (object) 
- this.placedata (object)
- this.persondata (object)

**Associated input:** 
- start (string) - alpha numeric string
- type (string/options) - a set of predefined alpha numeric strings
    - code
    - person
    - place

**Associated output:**
Based on type input:
- code - this.startFromData(start); (method) - use this.startdata to set target cell
- type - this.findClosest(target); - uses this.placedata and a set start cell to find the closest lcoation of a type as the target cell
- person - this.setPersonAs(start,"target"); (method) - use this.persondata to set target cell
- place - this.findPlaceByID(start,"target"); (method) - use this.placedata to set target cell
