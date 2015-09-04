import React from 'react'
import {BigBrother} from './control/BigBrother.js'
import {allCats} from './dataModel/allCats.js'
import {allCnts} from './dataModel/allCnts.js'
import {allCntsName} from './dataModel/allCntsName.js'

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
  
  let allCntsData = allCnts(data)

  React.render(<BigBrother data={data} cats={cats} cnts={allCntsName(allCntsData)}
    allCats={allCats(data)} allCnts={allCntsData}/>, 
    document.getElementById('bigBrother'))
})