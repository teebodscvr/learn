"use strict";
const names = ['Thabo', 'Ambrose'];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done');
    }, 2000);
});
promise.then((v) => {
    v.split;
});
// Custom generic type
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const merged = merge({ name: 'Thabo' }, 4);
console.log(merged);
// Working with constraints using the 'extends' keyowrd of a generic type  
// Example: Making sure the generic types T & U below are of type oject so that we can use it with object.assign
// T extends object
function mergeWithConstraint(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedd = merge({ name: 'Thabo' }, 4);
function countAndDescribe(element) {
    let descriptionText = 'Got not value';
    if (element.length === 1) {
        descriptionText = 'Got 1 elememt' + element.length;
    }
    else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' element';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there'));
// More contraints - Generics with keyof
// keyof creates a new type of a  literal union of its keys (of the object type keys) 'key1' | 'key2' | 'key3'
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
extractAndConvert({ name: '' }, 'name');
// Generic classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage(); // We have specified the type the instance of the classe witll be working with, in this case a string
textStorage.addItem('Thabo');
textStorage.addItem('Ambrose');
textStorage.removeItem('Thabo');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
const objetStorage = new DataStorage();
const me = { name: 'Thabo' };
objetStorage.addItem(me);
objetStorage.addItem({ name: 'Ambro' });
objetStorage.removeItem(me);
console.log(objetStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.complteUntil = date;
    return courseGoal;
}
const namess = ['Max', 'Sports'];
// namess.push('as')
