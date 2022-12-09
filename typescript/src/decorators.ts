// Decorators is used for Meta-programming
// ? Metaprogramming refers to a variety of ways a program has knowledge of itself or can manipulate itself.
// ? Instrument for writing code that is easier to use for other developers
// ? All about classes?????
// ? A decorator is a function, it is just a function you apply to something like a class (Mostly uppercase for function name first letter)
// ? The '@' is a special identifier that Typescript recognizes, the text after this should be a function name
// ? Decorators must have arguments, one(required) which should be the target(The constructor function of the decorated class)
// ? The number of a decorator's arguments depends on where you use the decorator - For decorators used with a class we get one arg
// ? Decorators execute when the class is defined not when instantiated. (When JavaScript defines the class) -- I think Angular used this to instantiate ...
// ? Component, Services, Derictives etc. classes in the background with use the users having to example do `new AppComponent`
// ? Decorators can return values like a class definition
// A first class decorator

// function Logger(personClass: any) {
//     console.log('Loggin...');
//     // console.log(personClass);

//     const person = new personClass();

//     console.log(person);
// }


// @Logger
// class Person {
//     name = 'Thabo'
//     constructor() {
//         console.log('Creating person object...');
//     }
// }


// Decorator factory
// ? Returns a decorator function that but allows us to configure it when we assign it as a decorator to something
// ? Needs to be executed as function with ()
// ? Why: No we can accept any arguments of our choice - With that, we customize the values our decorator uses when executing
// ? These custom/additional arguments passed to our decorator factory allows us to configure what the decorator does internally

function Logger(logString: string) {

    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}


// More usefully decorators


function WithTemplate(template: string, hookId: string) {
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) { // Type of constructor is any so that typescript does not think it is a normal function
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                console.log('rendering template');

                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = 'Hey ' + this.name;
                }

            }
        } // ! IMPORTANT TO NOTE: we return a new class that extends the orinal one. Meaning that, now this code will be run when the original class is instantiated
    };
}

@Logger('heyehe') // You can more than one decorator
@WithTemplate('<h1>My Person Object</h1>', 'app') // the execution is bottom up. And reverse for the factories them selves(to to bottom)
class Person {
    name = 'Thabo'
    constructor() {
        console.log('Creating person object...');
    }
}

// * You add decorators to add places other than the class itself. For exampel to propeties of class

function Log(target: any, properName: string | Symbol) {
    console.log('Propety decorator');
    console.log(target, properName);
}

function Log2(target: any, name: string, description: PropertyDescriptor) {
    console.log('Accessor decorator')
    console.log('target', target)
    console.log('name', name)
    console.log('description', description)
}

function Log3(target: any, name: string | Symbol, description: PropertyDescriptor) {
    console.log('Method decorator')
    console.log('target', target)
    console.log('name', name)
    console.log('description', description)

}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator')
    console.log('target', target)
    console.log('name', name)
    console.log('position', position)
}

class Product {
    @Log  // Property decorators receive the target prototype and the property name
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price');
        }

    }


    get price(): number {
        return this._price;
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this.price * (1 + tax)
    }
}


//? Decorators allows us to do behind the scenes for set up wok
//? Decorators are functions that execute when the class is defined not when it is instatiation
//? ExamplE: Setting up some code that should run when the class is defined like adding extra "meta data". storing
//? data about a class or property somewhere

// * Returning (and changing) a class in a class decorator

let ppp = new Person()

function Autobind(_: any, _2: string, description: PropertyDescriptor) {
    const originalMethod = description.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);

            return boundFn;
        }
    }

    return adjDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind
    showMessgae() {
        console.log(this.message);
    }
}

const p = new Printer()

const button = document.querySelector('button');

button?.addEventListener('click', p.showMessgae);

interface ValidateConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidateConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['required']
    };
}
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['positive']
    };
}
function validate(obj: any) {
    const objValidatroConfig = registeredValidators[obj.constructor.name];

    if (!objValidatroConfig) {
        return;
    }

    for (const prop in objValidatroConfig) {
        for (const validator of objValidatroConfig[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop];
                    break;
                case 'positive':
                    return obj[prop] > 0;
                    break;

                default:
                    break;
            }
        }
    }

    return true;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');

courseForm?.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('invalid inout');

        return;
    }
    console.log(createdCourse);
})