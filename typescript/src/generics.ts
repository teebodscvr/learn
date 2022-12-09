
// Generics
type un = string | number;
const names: Array<string> = ['Thabo', 'Ambrose'];

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(
        () => {
            resolve('Done');
        }, 2000
    )
})

promise.then(
    (v) => {
        v.split
    }
)




// Custom generic type

function merge<T extends {}, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const merged = merge({name: 'Thabo'}, 4);
console.log(merged)

// Working with constraints using the 'extends' keyowrd of a generic type  
// Example: Making sure the generic types T & U below are of type oject so that we can use it with object.assign
// T extends object


function mergeWithConstraint<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedd = merge({name: 'Thabo'}, 4);

// more generics

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got not value';

    if(element.length === 1) {
        descriptionText = 'Got 1 elememt' + element.length
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' element';
    }

    return [element, descriptionText]
}

console.log(countAndDescribe('Hi there'));


// More contraints - Generics with keyof
// keyof creates a new type of a  literal union of its keys (of the object type keys) 'key1' | 'key2' | 'key3'


function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

extractAndConvert({name: ''}, 'name');


// Generic classes

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1 ) {
            return;
        }

        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>(); // We have specified the type the instance of the classe witll be working with, in this case a string
textStorage.addItem('Thabo');
textStorage.addItem('Ambrose');
textStorage.removeItem('Thabo');
console.log(textStorage.getItems());


const numberStorage = new DataStorage<number>();
const objetStorage = new DataStorage<object>();
const me = {name: 'Thabo'};
objetStorage.addItem(me);
objetStorage.addItem({name: 'Ambro'});
objetStorage.removeItem(me);

console.log(objetStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    complteUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.complteUntil = date;

    return courseGoal as CourseGoal;
}

const namess: Readonly<string[]> = ['Max', 'Sports'];
// namess.push('as')