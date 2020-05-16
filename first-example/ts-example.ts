const button = document.querySelector("button");
const classButton = document.querySelector(".button");
const input1 = document.getElementById("num1")! as HTMLInputElement; // ! can be used to tell TypeScript that it will never be null. It will always find an element. as does type casting.
const input2 = <HTMLInputElement>document.getElementById("num2")!; // Not able to use JSX? Thnk that as is the only option there.

function addNums(num1: number, num2: number) {
    return num1 + num2;
}

button?.addEventListener("click", function() { // The optional property can be used for optional values. It can be used for chaining. potato?.variety?.color
    console.log(addNums(+input1.value, +input2.value));
});

if (classButton) {
    (classButton as HTMLInputElement).addEventListener('click', (e) => {
        console.log(e);
    });
}
