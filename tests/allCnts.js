import assert from 'assert'
import wholeData from '../data/json/data.json'
import {allCnts} from '../src/js/dataModel/allCnts.js'

describe('test allCnts\n', function(){
  describe('when given an object', function(){
    it('should return an array of object containing all the contries and its total value', function(done){
      const result = allCnts(wholeData)
      result.forEach((d)=>{
        assert(typeof d.name === 'string')
        assert(Object.prototype.toString.call(d.data) === '[object Array]')
        d.data.forEach((dd)=>{
          assert(typeof dd === 'number')
        })
      })
      done()
    })
  })
})