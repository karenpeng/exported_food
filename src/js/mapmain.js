import {map, updateMap} from './view/map.js'

window.addEventListener('message', (e) =>{
  //console.log(e.data)
  //document.getElementById('test').innerHTML = e.origin+' said: '+e.data
  let info = JSON.parse(e.data)
  console.dir(info.data)
  
  map(info)

}, false)