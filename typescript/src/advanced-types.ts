
// Intersection
type Admin = {
    name: string;
    privileges: string[]
};

type Employee = {
    name: string;
    startDate?: Date;
};

type ElevatedEmployee = Admin & Employee; // Intersection type

const el: ElevatedEmployee = {
    name: 'Thabo',
    privileges: ['create-server'],
    startDate: new Date()
}


type Combinable = string | number; // Union type
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // Intersection type [Makes type the dominant or the type that occurs the most. In this case number because it appears Combinable & Numeric]

const u: Universal = 3;

// Type Guards


// function overloads

function addo(a: number, b: number): number;
function addo(a: string, b: string): string;
function addo(a: string, b: number): string;
function addo(a: number, b: string): string;
function addo(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string') { // Type guards - Because it allows us to utilize Union types adn still ensure 
        // our code runs correctly at run time

        return a.toString() + b.toString();  // return type as "string" because of the Combinable union type

    }

    return a + b; // return type as "number" because of the Combinable union type
}

const result = addo('Thabo', 233) as string;
console.log('RESS', result)

result.split(' ');

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformationn(emp: UnknownEmployee) {
//     console.log('Name', emp.name);
//     if('privileges' in emp) {
//         console.log('Privileges', emp.privileges)
//     }
// }

// printEmployeeInformationn(el);

// class Car {
//     drive() {
//         console.log('Driving....')
//     }
// }

// class Truck {
//     drive() {
//         console.log('Driving a truck...');
//     }

//     loadCargo(amount: number){
//         console.log('Loading cargo ...' + amount);
//     }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();


// function useVehicle(vehicle: Vehicle) {
//     vehicle.drive();
    
//     if(vehicle instanceof Truck) {
//         vehicle.loadCargo(2);
//     }
// }

// useVehicle(v1);
// useVehicle(v2);



// // Descriminated Unions - Makes implementing type guards easier - Available when working with object types


// interface Bird {
//     type?: 'bird';
//     flyingSpeed: number;
// }

// interface Horse {
//     type?: 'horse';
//     runningSpeed: number;
// }

// type Animal = Bird | Horse;


// function moveAnimal(animal: Animal) {
//     if('flyingSpeed' in animal) { // I need not to use the descriminated union property "type" from the interfaces - Maybe an improvement with typescript
//         console.log('Moving with speed' + animal.flyingSpeed);
//     }

//     if('runningSpeed' in animal) { // I need not to use the descriminated union property "type" from the interfaces - Maybe an improvement with typescript
//         console.log('Moving with speed' + animal.runningSpeed);
//     }
    
// }

// const anim1: Bird = {flyingSpeed: 2};
// const anim2: Horse = {runningSpeed: 23};

// moveAnimal(anim1);
// moveAnimal(anim2);

// // Typecasting


// const usrInput = <HTMLInputElement>document.getElementById('user-input')!;


// // usrInput.value = 'Hi there';

// // Index properties/types

// interface ErrorContainer { // Eg. {email: 'Not a valid email' }
//     [prop: string | number]: string // Index properties; I dont know the exact property name but I know the prop name is string with a string value
// }

// const errorBag: ErrorContainer = {
//     email: 'invallid email',
//     3: 'three is valid',
// };

// console.log(errorBag)

// // Function overloads


// Optional chaining


const fetchedUserData = {
    id: 'u1',
    name: 'Thabo',
    job: {title: 'CEO', description: 'My own company'}
}

console.log(fetchedUserData?.job.title);

const userInputt = undefined;

const storedData = userInputt ?? 'default';

console.log(storedData)
