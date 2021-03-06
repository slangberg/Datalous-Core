##Datalous Javascript Mapping And Path-finding Library 2.0##

This application is a  prototype the Datalous javascript object based location mapping and path finding library, it is a sample of of some of the core mapping functionality available . The Datalous  library is  application will place flags on predefined locations that are read from a mySQL  database and then plot the shortest path between these locations. In this version the pathfinder algorithm is simple aStar implementation but in future versions this will be updated to a more robust third party pathfinding. This initial prototype focus on the the data retrieval and simple method based interaction with the data. The library itself consists of 5 different control objects that can be either be used individually or can be extended into one master application object. The objects include:

- **astarCore:** This object is controls all pathfinding function along with grid management and marking. The actual core path finding code is from http://en.literateprograms.org/A*_search_(JavaScript) but the control infrastructure  is all custom

- **applicationCore:** this object  assigns the astarCore object for use by the library as well as manage and assigns external data to itself, local storage and other extended objects. It also controls the selection of what methods to run with inputed start and target data

- **personData:** this object  assigns and parses the people map data objects. While while called people in this prototype these objects are  unique  locations with multiple classification properties. Next update will change to multiobject name space  

- **startData:** this object  assigns and parses the start token map data objects. While while called start tokens in this prototype these objects are  unique  locations  with a sole unique name or alphanumeric string. Next update will change to token name space  

- **placeData:** this object  assigns and parses  the place map data objects. These objects  are  non-unique locations that can be classified by a master type, however each type can have subsets types. In addition each individual location object  has a unique alphanumeric id along with other properties

## Setting up Datalous##
For Just the core library include these in you document head
```HTML
<script src="https://code.jquery.com/jquery.js"></script>
<script type="text/javascript" src="a_starobject.js"></script>
<script type="text/javascript" src="mapdataobjects.js"></script>
```
If you want the ability to run timers and get map kb loads also include 
```HTML
<script type="text/javascript" src="reporter.js"></script>
```

To Run the entire library you need to instainate all objects and extend them into a single one, in the next update this will be added to the contstruct function
```JavaScript
var astarcore=new astarCore(); 
var application =new applicationCore(astarcore);
var placedata=new placeData();
var startdata=new startData(); 
var pepoledata=new personData(); 
var urldata=new urlData();
var reporter=new reporter();
var App = $.extend({},urldata, application, placedata,startdata,pepoledata,reporter);
```

##Datalous Methods##
1. [applicationCore Object Methods](https://github.com/slangberg/Datalous-Core/blob/master/methods/startData-Object-Methods.md)
2. [startData Object Methods](https://github.com/slangberg/Datalous-Core/blob/master/methods/startData-Object-Methods.md)
3. [placeData Object Methods](https://github.com/slangberg/Datalous-Core/blob/master/methods/placeData-Object-Methods.md)
3. [urlData Object Methods](https://github.com/slangberg/Datalous-Core/blob/master/methods/urlData-Object-Methods.md)

##Datalous Map data Object Structure ##
```JavaScript
mapdata() = {
	map:[[y,x]];
	start: {
        a1: {
            x: 36,
            y: 37,
            id: 12,
        },
    }, 
    place: {
        mens: [
            {
                name: mens room,
                placetype: bathroom,
                x: 100,
                y: 50,
                id: 11
            }
        }. 
    person: {
        tom good: {
            name: tom good,
            fname: Tom,
            lname: Good,
            department: Administration,
            position: Dean,
            x: 119,
            y: 37
        }
    }
}
```