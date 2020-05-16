type Combinable = number | string;

function add(n1: number, n2: number, isShowingResult: true, resultPhrase: string) {
    const sum = n1 + n2;
    isShowingResult && console.log(`${resultPhrase} ${sum}`);
    return sum;
}

const number1 = 5;
const number2 = 10;
const resultPhrase = 'Result is: ';

const result = add (number1, number2, true, resultPhrase);

// const person: {} = {name: 'Biscuit'}; Can be used to say that it's just any object. Also :object can be used.

enum Loves {
    BISCUITS, POTATOES
}

const person: {
    name: string;
    age: number;
    nickname: string;
    role: [number, string]; // Push, however, can still be called on it.
    loves: Loves;
} = {
    name: 'Potato Bandit',
    age: 68,
    nickname: '',
    role: [1, '10'],
    loves: Loves.BISCUITS
}

let activities: string[];
activities = ['Potato picking', 'Running from the cops'];

if (person.loves === Loves.BISCUITS) {
    console.log("Biscuits, yay!");
}

function print(val: Combinable, addString: 'someThing' | 'anotherThing'): void {
    console.log(val);
}

print(2, 'someThing');
print('2', 'anotherThing');

// Defining a void return type doesn't mean that the function passed in has to be a void return type. It's telling the caller that the value won't be used.
function someFunc(cb: (n: string) => void) {
    cb('bananas');
}

let functionReference: Function; // Can set any function equal to this
let functionTypeReference: (a: number, b: number) => number; // Function needs to match the defined signature

someFunc(val => {
    console.log(val);
    return val;
})

abstract class Unit {
    abstract unit(): void;
}

class Department extends Unit {
    private _name: string; // public is the default.

    // Readonly can be used to allow it to be set in only on initialization. Final would be the equivalent
    constructor(name: string, private readonly someDude: string, private id: number) { // Can define parameters with just private id: number instead of the constructor. Shorthand for the usual creating of a field and setting this.bla = bla;
        super();
        this._name = name;
    }

    describe(this: Department) { // this can be added to avoid losing the proper this reference. For example, if the function reference is passed to some custom object.
        console.log('The department is: ' + this.name); // Accessing the field via a getter is not done by calling a method, but just calling the property that matches the getter.
    }

    protected askParent() {
        console.log('Am parent');
    }

    static declareYourself() {
        console.log('IT IS I, DEPARTMENT.');
    }

    unit() {
        console.log('Potato');
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}

const dep = new Department('Biscuit controller', 'Bob', 202);
dep.describe();

class ITDepartment extends Department {
    constructor(id: number) {
        super('IT Department', 'Robbert', id);
    }

    describe() { // Can just overwrite by declaring the same signature
        super.askParent();
    }
}

Department.declareYourself();

interface Person { //Interfaces can extend each other. An interface can extend from multiple interfaces.
    name: string; // Interfaces can have variables.
    age: number;

    greet(): void;
}

class Bob implements Person {
    constructor(public name: string = 'Bob', public age: number = 28) {
    }

    greet() {
        console.log('Still saying hello')
    }
}

let per: Person;

per = {
    name: 'Bob',
    age: 20,
    greet() {
        console.log('Hello')
    }
};

per = new Bob();

// An interface can be declared as a function type. It'd be easier to declare a custom type, though.
interface AddFn {
    (a: number, b: number): number;
}
type AnotherAddFn = (a: number, b: number) => number;