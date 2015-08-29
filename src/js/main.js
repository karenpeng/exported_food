import React from 'react'
import d3 from 'd3'
import BigBrother from './control/BigBrother.jsx'

//console.log(init)

d3.json('./rawData/test.json', function(error, json) {
  if (error) return console.log(error)
  console.log(json)

  React.render(<BigBrother data={json}/>, document.getElementById('bigBrother'))
});
