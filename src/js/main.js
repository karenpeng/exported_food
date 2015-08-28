import d3 from 'd3'

// d3.json("path/to/file.json", function(error, json) {
//   if (error) return console.warn(error);
//   data = json;
//   visualizeit();
// });

console.dir(d3)

import update from './graph.js'

//import datas from './../../data/test.json'
import datas from './../../data/data.js'
console.dir(datas)


var index = 0
d3.select('svg').on('click', function(){
    update(datas[index])
    index ++
    if(index > datas.length -1 ) index = 0
})
update(index)

// function getCatByYear(year){
//   year -=1999
//   for(var key in obj){
//     if(obj[key] typeof 'object'){
//       obj[key][year]
//     }
//   }
// }

