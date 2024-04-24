export default class UserModel {
  constructor() {
    this.firstName;
    this.lastName;
    this.dateOfBirth;
    this.age;
  }

  setUser(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.dateOfBirth = user.dateOfBirth;
    this.age = user.age;

    return this;
  }

  getUser() {
    return this.fillUserModel(this);
  }

  fillUserModel(user) {
    return {
      lastName: user.lastName,
      firstName: user.firstName,
      dateOfBirth: user.dateOfBirth,
      age: user.age,
    };
  }
}

export const mockUser = {
  lastName: 'Иванов',
  firstName: 'Иван',
  dateOfBirth: new Date('10.10.2000'),
  age: 24,
};
