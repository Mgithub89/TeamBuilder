const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty arr to store employees
const employees = [];

// empty arr to stor id
const idArr = [];

//fun to validate email .
function Emailvalidation(email) {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if (valid) {
        return true;
    } else {
        console.log(".  Pls provide a valid email")
        return false;
    }
}

//fun to check id is not matching 
const idChecker = id => {
    if (idArr.includes(id)) {
        console.log("  id taken. please enter another id");
        return false
    }
    return true
}

//manager prompt questions
const managerPromptQ = () => inquirer.prompt([
    {
        type: "input",
        name: "managerName",
        message: "What is your manager name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is your manager id?",
        validate: idChecker
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager Email?",
        validate: Emailvalidation
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager office number?"
    }

]).then(response => {
    const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
    employees.push(manager);
    idArr.push(response.managerId);
});

// prompt to add a team
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
            // check response on teammemberChoice
            switch (response.teamMemberChoice) {
                // if engineer , run addEngineer()
                case "Engineer":
                    addEngineer();
                    break;
                // if intern , run addIntern()
                case "Intern":
                    addIntern();
                    break;
                default:
                    Team();
                    console.log("Thankyou");
            }
        })

// engineer prompt questions
const addEngineer = () => inquirer.prompt([
    {
        type: "input",
        name: "engineerName",
        message: "What is your engineer name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer id?",
        validate: idChecker
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer email?",
        validate: Emailvalidation
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer Github username?"
    }
]).then(response => {
    //creat a new engineer
    const engineer = new Engineer(response.engineerName, response.id, response.engineerEmail, response.engineerGithub)
    employees.push(engineer);
    idArr.push(response.id);
    addTeam();
})

//intern prompt questions
const addIntern = () => inquirer.prompt([
    {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
        validate: idChecker
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        validate: Emailvalidation
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
    }
]).then(response => {
    //creat a new intern
    const intern = new Intern(response.internName, response.id, response.internEmail, response.internSchool)
    employees.push(intern);
    idArr.push(response.id);
    //run addteam() again
    addTeam();
})

//Using async and await to make sure - the next function runs after the first function's.
const startQ = async () => {
    try {
        await managerPromptQ();

        await addTeam();
    } catch (e) {
        console.log(e);
    }
}
//call startQ function
startQ();

// fun to creat html file
const Team = () => {
    // Create the output directory if the output directory doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    //fs.writefile to creat html file by passing employees array
    fs.writeFile(outputPath, render(employees), function (err) {

        if (err) {
            console.log(err);
        }

        console.log("Success!");

    });
};


