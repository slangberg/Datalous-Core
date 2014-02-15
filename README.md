

##Datalous Javascript Mapping And Path-finding Library##

This application is a  prototype the Datalous javascript object based location mapping and path finding library, it is a sample of of some of the core mapping functionality available . The Datalous  library is  application will place flags on predefined locations that are read from a mySQL  database and then plot the shortest path between these locations. In this version the pathfinder algorithm is simple aStar implementation but in future versions this will be updated to a more robust third party pathfinding. This initial prototype focus on the the data retrieval and simple method based interaction with the data. The library itself consists of 5 different control objects that can be either be used individually or can be extended into one master application object. The objects include:

- **astarCore:** This object is controls all pathfinding function along with grid management and marking. The actual core path finding code is from http://en.literateprograms.org/A*_search_(JavaScript) but the control infrastructure  is all custom

- **applicationCore:** this object  assigns the astarCore object for use by the library as well as manage and assigns external data to itself, local storage and other extended objects. It also controls the selection of what methods to run with inputed start and target data

- **personData:** this object  assigns and parses the people map data objects. While while called people in this prototype these objects are  unique  locations with multiple classification properties. Next update will change to multiobject name space  

- **startData:** this object  assigns and parses the start token map data objects. While while called start tokens in this prototype these objects are  unique  locations  with a sole unique name or alphanumeric string. Next update will change to token name space  

- **placeData:** this object  assigns and parses  the place map data objects. These objects  are  non-unique locations that can be classified by a master type, however each type can have subsets types. In addition each individual location object  has a unique alphanumeric id along with other properties

```JavaScript
map: [[65,35],[116,36],[116,35],[115,35],[114,35],[113,35],[112,35],[111,35],[110,35],[109,35],
    start: {
        lobby1: {
            x: 64,
            y: 33,
            keydirection: 3,
            id: null
        },
        a2: {
            x: 63,
            y: 18,
            keydirection: 2,
            id: null
        },
    },
    place: {
        mens: [
            {
                name: mens room,
                placetype: bathroom,
                x: 23,
                y: 50,
                id: 11
            },
            {
                name: Unisex bathroom,
                placetype: bathroom,
                x: 138,
                y: 66,
                id: 13
            },
            {
                name: mens room,
                placetype: bathroom,
                x: 112,
                y: 7,
                id: 15
            }
        ],
        womens: [
            {
                name: Womens room,
                placetype: bathroom,
                x: 58,
                y: 9,
                id: 9
            },
            {
                name: Womens room,
                placetype: bathroom,
                x: 23,
                y: 50,
                id: 11
            },
        ],
    },
    person: {
        tom good: {
            name: tom good,
            fname: Tom,
            lname: Good,
            department: Administration,
            position: Dean,
            x: 119,
            y: 37
        },
        sarah smith: {
            name: sarah smith,
            fname: Sarah,
            lname: Smith,
            department: Administration,
            position: Head Of Admissions,
            x: 56,
            y: 59
        }        }
    }
}
```