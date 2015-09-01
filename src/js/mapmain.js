import {makeMap, updateMap} from './view/map.js'

window.addEventListener('message', (e) =>{
  
  let info = JSON.parse(e.data)
  makeMap(info.data)

}, false)