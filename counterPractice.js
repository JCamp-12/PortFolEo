/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    
    const myObject = {
        count: init,
    };
    myObject.increment = function() {
        return myObject.count = myObject.count + 1
    };
    myObject.decrement = function() {
        return myObject.count = myObject.count - 1
    };
    myObject.reset = function() {
        return myObject.count = init
    };

    return myObject
};


const counter = createCounter(5)
console.log('counter', counter);
counter.increment(); // 6
console.log('counter', counter);
counter.reset(); // 5
console.log('counter', counter);
counter.decrement(); // 4
console.log('counter', counter);