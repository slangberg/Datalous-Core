

#Datalous Javascript Mapping And Path-finding Library#

This application is a  prototype the Datalous javascript object based location mapping and path finding library, it is a sample of of some of the core mapping functionality available . The Datalous  library is  application will place flags on predefined locations that are read from a mySQL  database and then plot the shortest path between these locations. In this version the pathfinder algorithm is simple aStar implementation but in future versions this will be updated to a more robust third party pathfinding. This initial prototype focus on the the data retrieval and simple method based interaction with the data. The library itself consists of 5 different control objects that can be either be used individually or can be extended into one master application object. The objects include:

- **astarCore:** This object is controls all pathfinding function along with grid management and marking. The actual core path finding code is from http://en.literateprograms.org/A*_search_(JavaScript) but the control infrastructure  is all custom

- **applicationCore:** this object  assigns the astarCore object for use by the library as well as manage and assigns external data to itself, local storage and other extended objects. It also controls the selection of what methods to run with inputed start and target data

- **personData:** this object  assigns and parses the people map data objects. While while called people in this prototype these objects are  unique  locations with multiple classification properties. Next update will change to multiobject name space  

- **startData:** this object  assigns and parses the start token map data objects. While while called start tokens in this prototype these objects are  unique  locations  with a sole unique name or alphanumeric string. Next update will change to token name space  

- **placeData:** this object  assigns and parses  the place map data objects. These objects  are  non-unique locations that can be classified by a master type, however each type can have subsets types. In addition each individual location object  has a unique alphanumeric id along with other properties
