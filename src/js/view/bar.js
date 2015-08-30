import d3 from 'd3'

export function updateBar(data, index){
  const svg = d3.select('svg')

  const width = window.innerWidth - 40
  const height = window.innerHeight - 240

  svg
  .attr('width', width)
  .attr('height', height)

  const title = Object.keys(data)[0]

  const interval = width / data.length

  const h = d3.scale.linear()
  .range([0, height])
  .domain([0, 4000])

  let chart = svg.selectAll('g')
  .data(data, (d) => {
    let name = Object.keys(d)[0]
    return name
  })
  .attr('transform', (d, i) => {
     return 'translate('+ i * interval+', 0)'
   })

  //console.log(chart)

   let chartExit = chart
    .exit()
    .style('opacity', 1)
    .transition()
    .style('opacity', 0)
    .remove()
    
   let chartEnter = chart
    .enter()
    .append('g')
   .attr('transform', (d, i) => {
       return 'translate('+ i * interval+',0)'
     })
    
   chartEnter
    .append('rect')
   //.selectAll('rect')
    //console.dir(chartEnter)

   let rects = d3.selectAll('rect')
    .attr('width', interval)
    .attr('height', (d, i) =>{
      let key = Object.keys(d)[0]
      d[key].forEach( (dd, ii) => {
        let key = Object.keys(dd)[0]
        dd[key].forEach( (ddd, iii) => {
          console.log(ddd)
          return h(ddd)
        })
      })
      //console.log(d.value0, d.value)
      //return y(d.value2)
    })

    //.append('rect')
   //  .style('fill', (d) =>{
   //     return 'rgb(' + c(d.value) +',0,0)'
   //   })
   // .attr('y', (d) =>{
   //     return height - y(d.value2)
   // })

}




