// LINK FOR GENERATING INDEX.HTML

const generateHTML = require('./src/generateHTML');

// TEAM PROFILE
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// NODE MODULES - FILESYSTEM AND INQUIRER 
const fs = require('fs'); 
const inquirer = require('inquirer');

// TEAM ARRAY
const teamArray = []; 

// START MANAGER PROMPTS
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Team Manager?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("The Manager 's name is required.");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Manager's ID?",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("The Manager 's ID is required.")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Manager 's Email?",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('An email address is required.')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Manager 's Office Number?",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('An office number is required.')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log(`
    =================================
    ADD EMPLOYEES TO THE TEAM PROFILE
    =================================
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Choose the employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Name of the employee?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("The employee 's name is required.");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Employee's ID?",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("The employee's ID is required!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Employee's email?",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('An email address is required.')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Employee's github username?",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("The employee's github username is required")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "The intern's school?",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("The intern's school is required.!")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        // DATA FOR EMPLOYEE TYPE

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};


// FUNCTION TO GENERATE HTML FILE 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // IF THERE IS AN ERROR
        if (err) {
            console.log(err);
            return;
        // WHEN THE PROFILE HAS BEEN CREATED
        } else {
            console.log("Your team profile has been successfully created! Please check index.html")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });