/* const operator1 = 10;
const operator2 = 20;

function sum(op1: number, op2: number): number {
  return op1 + op2;
}

const result = sum(operator1, operator2);
console.log("Result", result); */

/*function Component(target: Function) {
  console.log("Logging");
  console.log(target);

  const div = document.getElementById("app")!;
  div.innerText = "Hola mundo";
}*/

function Component(parameter: { selector: string }) {
  return (target: new (...args: any[]) => any) => {
    const username = new target().username;

    const el = document.querySelector(parameter.selector)!;
    const h1 = document.createElement("h1");
    h1.innerText = "Hello World";

    const btn = document.createElement("button");
    btn.innerText = "Alert";
    btn.addEventListener("click", () => alert(username));

    el.append(h1);
    el.append(btn);
  };
}

@Component({
  selector: "#app",
})
class Person {
  username = "Jason";

  constructor() {
    console.log("Creating a person object");
  }
}

const person = new Person();
