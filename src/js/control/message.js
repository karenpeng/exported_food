export function sendData(json){
  let ifr = document.getElementById("ifr")
  let targetOrigin = ifr.src
  ifr.contentWindow.postMessage(JSON.stringify(json), targetOrigin)
}