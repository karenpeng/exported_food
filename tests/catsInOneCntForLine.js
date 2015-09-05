import assert from 'assert'
import wholeData from '../data/json/data.json'
import {catsInOneCntForLine} from '../src/js/dataModel/catsInOneCntForLine.js'

describe('test catsInOneCntForLine\n', function(){
  describe('when given the whole data and a country name', function(){
    it('should return an array of objects containing all the cats the country have and its data array', function(done){
      const result = catsInOneCntForLine(wholeData, 'Canada')
      assert(result.length) === Object.keys(wholeData).length
      result.forEach((d)=>{
        assert(typeof d.name === 'string')
        assert(Object.prototype.toString.call(d.data) === '[object Array]')
      })   
      done()
    })
  })
})