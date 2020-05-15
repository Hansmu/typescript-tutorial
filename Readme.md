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
* any (:any) - can just be whatever, kind of removes TypeScript's point
* unknown - can be used to say that you don't know what variable will be there, but that when it's used it should be checked. any is similar, but that would just cause TS to ignore whatever typing is happening.
* never - never says that your function will never return. That is, it will throw an error and the end of the function will never be reached. Such a method defaults to void with TS, as never is a newer feature,
but never could be a good thing to use to clearly define what your function is expected to do.

Union can be used to allow different types. (: number | string)

Literals can be used to limit a parameter to certain values.

Type alises can be used to make references to types easier.

A function's return type gets inferred by TypeScript. TS has the void return type available.

<h2>TypeScript Compiler</h2>

`tsc <filename>.ts --watch` or -w can be used to enter watch mode for a file.

Running `tsc --init` tells TS that the project and all of its subfolders should be managed by TS.
It creates a `tsconfig.json` file. After it is created `tsc -w` can be run so that it'd watch
the entire project.

TypeScript is aware of the value present and type checks around values. 
So instead of using `!` at the end of a potentially null value, you could 
also just use `if (val) blabla`. The exclamation mark is shorter, though, so if
you know that the value is present, then use that.