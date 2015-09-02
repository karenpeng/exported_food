import React from 'react'
import {BigBrother} from './control/BigBrother.js'
import {getAll} from './dataModel/getAll.js'

//brfs es6 problem
//https://github.com/substack/brfs/issues/39
var fs = require('fs')

fs.readFile('./data/json/data.json', 'utf8', (err, str) => {
  if(err) {
    console.log(err)
    return
  }
  let data = JSON.parse(str)
  console.dir(data)

  let cats = Object.keys(data)
  cats.unshift('All')//omg unshift returns the length of the array!!
  //countries, drilldown
  React.render(<BigBrother data={data} cats={cats} totals={getAll(data)}/>, document.getElementById('bigBrother'))
})