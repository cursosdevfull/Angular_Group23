"use strict";
/* const operator1 = 10;
const operator2 = 20;

function sum(op1: number, op2: number): number {
  return op1 + op2;
}

const result = sum(operator1, operator2);
console.log("Result", result); */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*function Component(target: Function) {
  console.log("Logging");
  console.log(target);

  const div = document.getElementById("app")!;
  div.innerText = "Hola mundo";
}*/
function Component(parameter) {
    return (target) => {
        const username = new target().username;
        const el = document.querySelector(parameter.selector);
        const h1 = document.createElement("h1");
        h1.innerText = "Hello World";
        const btn = document.createElement("button");
        btn.innerText = "Alert";
        btn.addEventListener("click", () => alert(username));
        el.append(h1);
        el.append(btn);
    };
}
let Person = class Person {
    constructor() {
        this.username = "Jason";
        console.log("Creating a person object");
    }
};
Person = __decorate([
    Component({
        selector: "#app",
    }),
    __metadata("design:paramtypes", [])
], Person);
const person = new Person();
//# sourceMappingURL=index.js.map