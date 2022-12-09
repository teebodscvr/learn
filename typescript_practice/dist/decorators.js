"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// More usefully decorators
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookEl = document.getElementById(hookId);
                console.log('rendering template');
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = 'Hey ' + this.name;
                }
            }
        }; // ! IMPORTANT TO NOTE: we return a new class that extends the orinal one. Meaning that, now this code will be run when the original class is instantiated
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Thabo';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('heyehe') // You can more than one decorator
    ,
    WithTemplate('<h1>My Person Object</h1>', 'app') // the execution is bottom up. And reverse for the factories them selves(to to bottom)
], Person);
// * You add decorators to add places other than the class itself. For exampel to propeties of class
function Log(target, properName) {
    console.log('Propety decorator');
    console.log(target, properName);
}
function Log2(target, name, description) {
    console.log('Accessor decorator');
    console.log('target', target);
    console.log('name', name);
    console.log('description', description);
}
function Log3(target, name, description) {
    console.log('Method decorator');
    console.log('target', target);
    console.log('name', name);
    console.log('description', description);
}
function Log4(target, name, position) {
    console.log('Parameter decorator');
    console.log('target', target);
    console.log('name', name);
    console.log('position', position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price');
        }
    }
    get price() {
        return this._price;
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log // Property decorators receive the target prototype and the property name
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
//? Decorators allows us to do behind the scenes for set up wok
//? Decorators are functions that execute when the class is defined not when it is instatiation
//? ExamplE: Setting up some code that should run when the class is defined like adding extra "meta data". storing
//? data about a class or property somewhere
// * Returning (and changing) a class in a class decorator
let ppp = new Person();
function Autobind(_, _2, description) {
    const originalMethod = description.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works';
    }
    showMessgae() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessgae", null);
const p = new Printer();
const button = document.querySelector('button');
button === null || button === void 0 ? void 0 : button.addEventListener('click', p.showMessgae);
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['required']
    };
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['positive']
    };
}
function validate(obj) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('invalid inout');
        return;
    }
    console.log(createdCourse);
});
