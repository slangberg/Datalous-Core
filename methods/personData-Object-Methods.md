##personData Object Methods##
###personData.setPersonData(data)###
this sets this.persondata data either from this.mapdata are passed in data 

**Reads from:** 
- this.mapdata.person (object/array) person object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated input:** 
- data (object/array) (object/array) person object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated output:**
- this.persondata (object/array) place object collection


###personData.createNameArray()###
creates an plain array of the person data index properties to be used in third party auto complete search functions
**Reads from:** 
- this.persondata (object) person object collection see example at [mapdatastructure.md](https://github.com/slangberg/Datalous-Core/blob/master/datastructure.md)

**Associated output:**
- this.namearray (array) an array of all index properties of this.persondata 

###personData.setPersonAs(name,action)### 
uses code input to set an start token object as the start or target, or returns the found start token object

**Reads from:** 
- this.persondata (object) 
**Associated input:** 
- name (string) - alpha numeric string used to match person object 
- type (string/options) - a set of predefined alpha numeric strings
    - start
    - target
    - find
  
**Associated output:** 
Based on type input:
- start - astarcore.setStart(); (method) - uses found objects x and y to set a start location
- target - astarcore.setTarget(); (method) - uses found objects x and y to set a target location
- find - this.person[name] (object)

###personData.createGroup(attribute,term)### 
This will create and return an object made of of pepole whos proived attribute matchs a provided term

**Reads from:** 
- this.persondata (object) 
**Associated input:** 
- attribute (string) - alpha numeric string used to match person object's property 
- term (string/options) - the desired value for the provided attribute
  
**Associated output:** 
- '''this.persondata[result]''' (object)
