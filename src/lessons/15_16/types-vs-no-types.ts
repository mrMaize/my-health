const b = {};

export default b;

/*
// valid
const anyVar: any = 1234567890;
const someValue = anyVar.map();
const anotherValue = anyVar.indeOf('i');

// primitive types
const a = 'string';
const b: string = 'this is also a string';

// not valid
const number: number = 1234;
console.log(number.indexOf('i'));
console.log(number.map());

// simple types
const bool: boolean = true;
const str: string = 'true';
const num: number = 123;

// also there are
const undef: undefined = undefined;
const nullVal: null = null;

// приведение типов
type TPerson = {
  name: string;
  lastName: string;
  age: number;
};

type TDog = {
  age: number;
};

const person: TPerson = {
  name: 'asdasd',
  lastName: 'asdad',
  age: 123,
};

// ошибки нет
const dog = person as TDog;
const dog2 = <TDog>person;

// complex types: arrays, objects and combinations


*/
