// using Manager constructor 
const Manager = require('../lib/Manager');

// creating Manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Stella', 82, 'stella.ling@outlook.com', 4);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Stella', 82, 'stella.ling@outlook.com');

    expect(manager.getRole()).toEqual("Manager");
}); 