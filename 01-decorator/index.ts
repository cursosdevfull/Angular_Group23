/* const operator1 = 10;
const operator2 = 20;

function sum(op1: number, op2: number): number {
  return op1 + op2;
}

const result = sum(operator1, operator2);
console.log("Result", result); */

function Logger(target: Function) {
  console.log("Logging");
  console.log(target);
}

@Logger
class Person {
  name = "Jason";

  constructor() {
    console.log("Creating a person object");
  }
}

const person = new Person();
