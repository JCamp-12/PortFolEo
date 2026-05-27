// function counter() {
//     let count = 0;

//     return function() {
//         count++;
//         return count;
//     };
// }

// const increment = counter();
// console.log(increment()); // Output: 1
// console.log(increment()); // Output: 2






/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    console.log('val', val)
    let obj = {
        toBe: function(otherVal) {
            console.log('otherVal', otherVal)
            if (val === otherVal) {
                return true;
            } else {
                throw new Error('Not Equal');
            }
        },
        notToBe: function(otherVal){
            console.log('otherVal', otherVal)
            if (val !== otherVal) {
                return true;
            } else {
                throw new Error('Equal');
            }
        }
    };
    console.log(obj)
    return obj;
}

const result = expect(5); // true
// console.log(result); 
// if(expect(5).toBe(5)) {
//     console.log('Equal');
// }
 
 // true
//  expect(5).notToBe(5); // throws "Equal"