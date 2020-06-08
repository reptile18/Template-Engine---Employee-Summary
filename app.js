const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const validator = require("./lib/Validator");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function inquireEmployee() {
  return inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the employee's name: "
    },
    {
      name: "email",
      type: "input",
      message: "Enter the employee's email: ",
      validate: validator.checkEmail
    }
  ]);
}

function inquireManager() {
  return inquirer.prompt([
    {
      name: "officeNumber",
      type: "input",
      message: "Enter the manager's office number: ",
      validate: validator.checkPhone
    }
  ]);
}

function inquireEngineer() {
  return inquirer.prompt([
    {
      name: "github",
      type: "input",
      message: "Enter the engineer's github: "
    }
  ]);
}

function inquireIntern() {
  return inquirer.prompt([
    {
      name: "school",
      type: "input",
      message: "Enter the intern's school: "
    }
  ]);
}

function inquireChoice() {
  return inquirer.prompt([
    {
      name: "choice",
      type: "expand",
      message: "Select an option ",
      choices: [
        {
          name: "Add (e)ngineer",
          key: "e",
          value: "engineer"
        },
        {
          name: "Add (i)ntern",
          key: "i",
          value: "intern"
        },
        {
          name: "View all employees",
          key: "v",
          value: "view"
        },
        {
          name: "Done",
          key: "d",
          value: "done"
        }
      ]
    }
  ]);
}

async function main() {
  console.log("\n\t~~~~~ Starting Employee Summary ~~~~~\n\t");
  console.log("-> Start by entering the team's manager: \n")

  const employees = [];

  // Manager
  const employeeResponse = await inquireEmployee();
  const managerResponse = await inquireManager();
  const manager = new Manager(employeeResponse.name,Employee.lastID++,employeeResponse.email,managerResponse.officeNumber);

  employees.push(manager);

  console.log("\n-> Now enter the remaining employees: \n");

  let choice;
  do {
    ({choice} = await inquireChoice());
    if (choice === "done") {
      break;
    }
    else if (choice === "view") {
      console.log(`${employees.length} Employees: \n`);
      employees.forEach(employee => {
        let output = `[${employee.getId()}](${employee.constructor.name}) ${employee.getName()} [${employee.getEmail()}] `;
        if (employee instanceof Manager) {
          output += `office: ${employee.getOfficeNumber()}`
        }
        else if (employee instanceof Engineer) {
          output += `github: ${employee.getGithub()}`
        }
        else if (employee instanceof Intern) {
          output += `school: ${employee.getSchool()}`
        }
        console.log(output);
      });
      console.log("\n");
    }
    else if (choice === "engineer") {
      const employeeResponse = await inquireEmployee();
      const engineerResponse = await inquireEngineer();
      const engineer = new Engineer(employeeResponse.name, Employee.lastID++,employeeResponse.email,engineerResponse.github);
      employees.push(engineer);
    }
    else if (choice === "intern") {
      const employeeResponse = await inquireEmployee();
      const internResponse = await inquireIntern();
      const intern = new Intern(employeeResponse.name, Employee.lastID++, employeeResponse.email, internResponse.school);
      employees.push(intern);
    }

  } while(choice !== "done")

  const html = render(employees);
  fs.writeFileSync(outputPath,html);
  console.log("\n-> Employee summary page written to ./output/team.html\n");
}

main();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
