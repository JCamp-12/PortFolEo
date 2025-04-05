



const log = debounce(console.log, 100);
log("a");
log("b");

setTimeout(() => log("c"), 50);
setTimeout(() => log("d"), 120);
