import assert from 'assert'
import {subcatsInOneCat} from '../src/js/dataModel/subcatsInOneCat.js'

describe('test subcatsInOneCat', function(){
  describe('when given an object', function(){
    it('should return an array of keys except the first element is "All"', function(done){
      assert(subcatsInOneCat({
        a: 1,
        b: 2,
        c: 3
      })) === ['All','b', 'c']
      done()
    })
  })
})