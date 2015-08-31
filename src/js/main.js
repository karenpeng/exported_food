import React from 'react'
import {BigBrother} from './control/BigBrother.jsx'
import {getAll} from './dataModel/getAll.js'

loading()
let jqxhr = $.getJSON( "./data/json/data.json", function() {
})
.done(function(data) {
  finishLoading()
  console.dir(data)

  let cats = Object.keys(data)
  cats.unshift('All')//omg unshift returns the length of the array!!

  React.render(<BigBrother data={data} cats={cats} totals={getAll(data)}/>, document.getElementById('bigBrother'))
})
.fail(function(err) {
  console.dir(err)
})

function loading(){
  console.log('loading...')
}

function finishLoading(){
  console.log('data loaded:')
}