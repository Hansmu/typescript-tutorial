<h1>TypeScript Tutorial Notes</h1>
In regular Javascript a string can be converted to a number by prefixing it with a +, so `+someNum`

Need to install the Typescript compiler to run Typescript.
After it's installed, can run `tsc file.ts` to compile to JavaScript.

Typescript files end with `.ts`.

Adding `!` after a query can be used to tell TypeScript that the value will always be present.

`as SomeType` can be used to type cast a variable.

Parameter mismatches give a compilation error.
Imports have to be on JS files as browsers don't know anything about TS.

TypeScript adds types, interfaces, generics and next-gen JS features as well.

<h2>Types</h2>
A benefit of TS is that the IDE will better know how to help you. Can suggest the type specific functions.

Core types supported by JS and TS:
* number that covers ints, floats etc (:number)
* string (:string)
* boolean (:boolean)
* objects (:object/:{})

TS helps only during development, it doesn't run during runtime.

TS does type inference, so can still use const, let if you assign a value to it.
If you're doing a declaration without assignment, then you should define a type using `let val: number;`
You get an error if you break inference and set a different type.

When creating an object, then TS infers the type to be the initial structure you set to it. You can also define the structure inline, however, for the most part there's no point in that.

TS specific types:
* Array (:string[], :number[], :any[])
* Tuple (:[number, string]) - defines that it should have a list with 2 elements only, first being a number, second being a string.
* Enum (enum {NEW, OLD})