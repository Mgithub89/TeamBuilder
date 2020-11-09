const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerPromptQ = () => inquirer.prompt([
    {
        type: "input",
        name: "managerName",
        message: "What is your manager name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is your manager id?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager Email?"
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager office number?"
    }

])


const addTeam = () =>
    inquirer
        .prompt([
            {
                type: "list",
                name: "teamMemberChoice",
                message: "pls choose a team member you like to add",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team member"
                ]
            }
        ]).then(response => {
            switch (response.teamMemberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    Team();
                    console.log("Thankyou");
            }
        })

const addEngineer = () => inquirer.prompt([
    {
        type: "input",
        name: "engineerName",
        message: "What is your engineer name?"
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is your engineer id?"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer email?"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer Github username?"
    }
]).then(response => {
    const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
    employees.push(engineer);
    addTeam();
})

const addIntern = () => inquirer.prompt([
    {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
    },
    {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
    }
]).then(response => {
    const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
    employees.push(intern);
    addTeam();
})
const startQ = async () => {
    try {
        await managerPromptQ();
        await addTeam();
    } catch (e) {
        console.log(e);
    }
}
startQ();

// render(employees);

const Team = () => {
    fs.writeFile(outputPath, render(employees), function (err) {

        if (err) {
            console.log(err);
        }

        console.log("Success!");

    });
};

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
