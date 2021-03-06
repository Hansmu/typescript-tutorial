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

// const res = fetch('www.potato.öö').then(json => json.json());
// const existentValue = res ?? 'Kartul'; // Nullish coalescing. If the value is null or undefined, then it gets set to this string.

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

// The decorator gets run once the JS engine detects the declaration. Doesn't actually get run when a new object is created, but rather when the class definition is encountered.
function Logger(constructor: Function) { // The name doesn't matter. It gets run when the object is detected, but the constructor is just a local variable name.
    // Can mark it as _:Function when you don't care about the incoming parameter.
    console.log('Object has been constructed via the logger');
}

function LoggerCustom(logString: string) {
    // the new keyword can be used to say that the object that we're extending can be newed. ...args: any[] to declare a signature that accepts whatever amount of parameters.
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) { // What the decorator receives depends on where you're adding the decorator. When adding it to a class, then it receives a constructor.
        console.log(logString + ': the object has been constructed using the custom logger');
        // A decorator can return a new declaration of the class. Or overwrite the constructor method
        // Now the actions gets triggered when the actual object is constructed, instead of being called on the class definition declaration.
        return class extends originalConstructor { // Don't have to extend, but then what's the point? Going to lose everything of the original class otherwise.
            // _ is a reserved keyword in TS, means that you know that there is a variable, but you don't plan on using it.
            constructor(..._: any[]) { // Add the same ...args.any[] here, as it's the same as the above class.
                super();
                console.log('The name I have is: ' + this.name);
            }
        }
    }
}

// target prints the prototype of our object. propertyName prints the name of our property.
// the field decorator is executed when your class definition is registered by Javascript.
// the field names do not matter.
// Returning something here doesn't matter. TS will ignore it.
// Field decorators could be used for validation. You register the ones with a validation decorator, set the conditions, save them into some global variable,
// then trigger validations based on the saved object.
function FieldLogger(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!', target, propertyName);
}

// Target is the prototype, name is the method name, the descriptor is different depending if it's added to a setter/getter or a regular method. A setter/getter displays setter and getter in the descriptor. This is from JS, not TS.
function MethodLogger(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method logging here for parameters: ', {target, name, descriptor});

}

// The name is not the name of the parameter, but the name of the method. Position is which parameter it is in the method, its index among the parameters.
function ParameterLogger(target: any, name: string | Symbol, position: number) {
    console.log('Triggering parameter decorator.', {target, name, position});
}

console.log('------------------------------- CREATING DECORATED OBJECT EXAMPLE HERE -------------------------------')

// The decorators run bottom up. So LoggerCustom runs first.
@Logger
@LoggerCustom('LOG THIS!')
class Entity {
    @FieldLogger
    name = 'Bob';
    @FieldLogger
    title: string;

    constructor(title: string) {
        this.title = title;
        console.log('Creating person object...')
    }

    @MethodLogger
    sayHello(@ParameterLogger additionalText: string) {
        console.log('Saying hello');
    }
}

const pers = new Entity('Mr');

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() { // Adding a getter gives us the ability to perform some extra logic before the method is called.
            // A getter is essentially just a value property but with extra logic being run before.
            const boundFunction = originalMethod.bind(this); // Since it's inside of a getter method, then `this` will always refer to the one that's calling the getter,
            // which has to be the original class. A getter adds an extra layer between the method and the caller. The caller of the getter method will always be the specific
            // method to which it belongs, while the caller of the original method can be whoever. this will never be overwritten in this context.
            return boundFunction;
        }
    };

    return adjDescriptor;
}

class Printer {
    private _message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this._message);
    }
}

const p = new Printer();

const printerButton = document.querySelector('#clicky');
printerButton?.addEventListener('click', p.showMessage); // When doing this, we lose the this reference, as we're passing the method reference without its proper context.
// A fix would be to use p.showMessage.bind(p);