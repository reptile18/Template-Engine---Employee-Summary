class Employee {
  constructor(name, email) {
    this.id = Employee.lastId++;
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

Employee.lastId = 0;