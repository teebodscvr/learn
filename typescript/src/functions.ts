


const jm = (a: string, b: string) => {
    const cls = () => {
        console.log('I got you', a , b);
    };

    return cls;
}


const po = jm('t', 'h');


type func = () => number;
type func2 = Function

const t: func = (): number => {return 1}
const t2: func2 = (): number => {return 1}

console.log(t2());