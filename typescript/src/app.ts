

let userInput = true;

if(userInput) {
    console.log('Good')
}


const sum = (...numbers: number[]) => {
    console.log(numbers);
}

const addedNumbers = sum(2,4,5,6,8);


const person = {
    firstName: 'Thabo',
    age: 21
};


const {age, firstName: memberName} = person;

console.log(age, memberName)


