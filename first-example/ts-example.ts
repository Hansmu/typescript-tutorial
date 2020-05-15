const button = document.querySelector("button");
const input1 = document.getElementById("num1")! as HTMLInputElement; // ! can be used to tell TypeScript that it will never be null. It will always find an element. as does type casting.
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
    return num1 + num2;
}

button.addEventListener("click", function() {
    console.log(add(+input1.value, +input2.value));
});
