type Combinable = number | string;
type Numeric = number | boolean;

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
    nickname?: string;
    role: [number, string]; // Push, however, can still be called on it.
    loves: Loves;
} = {
    name: 'Potato Bandit',
    age: 68,
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
    age?: number; // ? can be used to declare an optional value

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

type Admin = {
    // type: 'banana'; A hardcoded property can be used in a switch statement to determine if something is of a certain type?? Seems pointless. Why not just use different classes?? Anyway, called discriminated unions.
    name: string;
    privileges: string[];
};

type Employee = {
    // type: 'biscuit';
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // Can be used to combine types into one type. Has to have the values of both. The result is union.

const e1: ElevatedEmployee = {
    name: 'Bob',
    privileges: ['tickle'],
    startDate: new Date()
};

type Universal = Combinable & Numeric; // This, however, results in intersection.

function addValues(a: Combinable, b: Combinable, el: Person) {
    if (typeof a === 'string' || typeof b === 'string') { // Adding this is called a type guard. This is a regular JS call.
        return a.toString() + b.toString();
    }

    // In the case of an object and a certain type would have to be determined for type guards, then in can be used.
    // if ('startDate' in el) {
    //     return a;
    // }
    // However, a better case would be to use instanceof, which is also a vanilla JS operator.
    // if (el instanceof Bob) {
    //
    // }

    return a + b;
}

interface StringConstrainedObject {
    // id: number; // This cannot be done, as that would violate the definition down below, as the property id would have a number value
    [field: string]: string // It defines that an object can only have property keys that are strings and property values that are strings.
}

// The problem here is that when you call the method, then the caller won't know what the exact return type will be, only that it'll be Combinable.
// So you'll have to start casting when you're calling it. This can be fixed with "function overloading". Not really a function overload, more like declaring
// potential interfaces or something.
//function addTestValues(a: number): number // Can be used if the other value is optional
function addTestValues(a: number, b: number): number;
function addTestValues(a: string, b:string): string;
function addTestValues(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const res = fetch('www.potato.öö').then(json => json.json());
const existentValue = res ?? 'Kartul'; // Nullish coalescing. If the value is null or undefined, then it gets set to this string.

const names: Array<string> = [];

// Specific constraints can be set for the generic types by using extends. Can use the generics to define the return type as well.
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return {...objA, ...objB};
}

const newObj = merge({name: 'Max'}, {age: 182}); // The generic call can infer the types from the parameters that are passed in
// Can be super explicit and say merge<{name: string}, {age: number}>(.., ...); But there isn't any point really.

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { // keyof constraint can be used to make sure that the object has a certain key.
    return 'Value is: ' + obj[key];
}

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }
}

class PrimitiveDataStorage<T extends number | string | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }
}

const textStorage = new PrimitiveDataStorage<string>();
textStorage.addItem('Kartul');

interface CourseGoal {
    title: string;
    description: string;
}

function createCourseGoal(title: string, description: string): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; // A partial can be used to define your object with temporarily optional fields.
    courseGoal.title = title;
    courseGoal.description = description;
    return courseGoal as CourseGoal;
}

const moreNames: Readonly<string[]> = ['MAX', 'ANNA'];
// moreNames.push('Kartul'); Readonly can be used to say that the variable can no longer be changed. Can also be applied to objects.