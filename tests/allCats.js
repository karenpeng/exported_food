import assert from 'assert'
import wholeData from '../data/json/data.json'
import {allCats} from '../src/js/dataModel/allCats.js'

describe('test allCats\n', function(){
  describe('when given an object', function(){
    it('should return an array of object containing all the frist level keys and its total value', function(done){
      const result = allCats(wholeData)
      assert(result.length) === Object.keys(wholeData).length
      result.forEach((d)=>{
        assert(typeof d.name === 'string')
        assert(Object.prototype.toString.call(d.data) === '[object Array]')
      })   
      done()
    })
  })
})