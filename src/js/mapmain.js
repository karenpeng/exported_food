import {map} from './view/map.js'

//map()

window.addEventListener('message', function(e){
  console.log(e.data)
  document.getElementById('test').innerHTML = e.origin+' said: '+e.data
}, false)