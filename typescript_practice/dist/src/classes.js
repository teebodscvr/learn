"use strict";
class Department {
    constructor(name) {
        this.name = name;
        this.name = 'Thabo';
    }
    getName() {
        return this.name;
    }
}
const dep = new Department('Employee benefits');
console.log(dep);
