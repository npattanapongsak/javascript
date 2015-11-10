/*
   Question : convert nested obj to plain obj (1 level deep object)
*/
var input = {
    "string":"it is string",
    "array":[1,2,3],
    "object":{name:1},
    "arrayInObj":{array:[4,5,6]},
    "objInArray": [{obj:2}]
}

var expected = {
  "string":"it is string",
  "array[0]":1,
  "array[1]":2,
  "array[2]":3,
  "object.name":1,
  "arrayInObj.array[0]":4,
  "arrayInObj.array[1]":5,
  "arrayInObj.array[2]":6,
  "objInArray[0].obj": 2 
}

// recursive helper function to generate plain object attribute
function helper(key,value,result){
  // check to see if this is array
  if(Object.prototype.toString.call(value)==='[object Array]'){
    var i =0;
    for(i=0;i<value.length;i++){
      helper(key+"["+i+"]",value[i],result);
    }
  }else if(typeof value ==="object" ){
    for(var name in value){
      if(value.hasOwnProperty(name)){
        helper(key+"."+name,value[name],result);  
      }
    }
  }else{    
    result[key]=value;  
  }
}

function plainObj(obj){
  var result ={};
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      helper(key,obj[key],result);    
    }
  }
  return result;
}

// helper function to compare expected and actual result
function compare(expected, result){
  for(var key in expected){
      if(expected.hasOwnProperty(key)){
        if(!result.hasOwnProperty(key) || result[key] !== expected[key]){   
          return false;
        }
      }
  }
  return true;
}
console.log(compare(expected,plainObj(input)));
