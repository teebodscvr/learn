interface AddFn {
    (a: number, b: number): number
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    age: number;

    greet(phrase: string): void;
}

// class Person implements Greetable {
//     constructor(public age: number, public name?: string){
//         if(name) {
//             this.name = name;
//         }
//     }
//     greet(phrase: string): void {
//         console.log(phrase + ' ' + this.name);
//     }

// }

// let user1 = new Person(78, 'Thabo');



// user1 = {
//     name: 'Thabo',
//     age: 12,
//     greet(phrase: string) {
//         console.log(phrase + ' ' + this.name);
//     }
// }

// user1.greet('Hi there - I am')