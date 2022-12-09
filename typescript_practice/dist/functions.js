"use strict";
const jm = (a, b) => {
    const cls = () => {
        console.log('I got you', a, b);
    };
    return cls;
};
const po = jm('t', 'h');
const t = () => { return 1; };
const t2 = () => { return 1; };
console.log(t2());
