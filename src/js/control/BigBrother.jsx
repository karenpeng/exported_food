import React from 'react'
import Slider from './Slider.jsx'

import map from './../view/map.js'
import pie from './../view/pie.js'

let BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return{
      index: 14,
      cat: "Animals",
      subCat: "Bovine animals"
    }
  },
  componentDidMount: function(){
    var main = document.getElementsByClassName('main')[0]
    main.setAttribute('width', window.innerWidth-400 + 'px')
    pie(this.props.data[this.state.cat][this.state.subCat], this.state.index)
  },
  handleYear: function(year){
    this.setState({
      index: year - 1999
    })
  },
  handleCategory: function(){

  },
  render: function(){

    pie(this.props.data[this.state.cat][this.state.subCat], this.state.index)

    return(
      <div id="container">
        <div className="main-wrap">
          <section className="main">
            <svg></svg>
            <Slider handleYear={this.handleYear}></Slider>
          </section>
        </div>
        <section className="sub">??</section>
        <section className="aside">??</section>
      </div>
    )
  }
})

module.exports = BigBrother

