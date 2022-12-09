"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    getId() {
        return this.id;
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    getName() {
        if (true) {
            return 'Heyy';
        }
    }
}
const dep = new ITDepartment('My ID', ['Ambrose']);
console.log(dep);
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    set mostRecentReport(mostRecentReport) {
        this.addReport(mostRecentReport);
    }
    static getnstance(id, reports) {
        if (this.instance) { // OR: AccountingDepartment.instance
            return this.instance;
        }
        this.instance = new AccountingDepartment(id, reports); // The new keyword of the instantiation of the class's instance is valid because we have created a private constructor; meaning that
        // the constructor/new can be called within the class.
        return this.instance;
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    getName() {
        return 'I am retuning something totally diff';
    }
    addEmployee(employee) {
        if (employee === 'Thabo') {
            console.warn(`cannot add ${employee} twice`);
            return;
        }
        this.employees.push(employee);
    }
}
const accDep = AccountingDepartment.getnstance('AccID', []);
const accDep2 = AccountingDepartment.getnstance('AccID2', []);
console.log(accDep, accDep2);
accDep.addReport('Balance sheet');
accDep.addEmployee('Tumi');
accDep.addEmployee('Thabo');
accDep.printReports();
accDep.getName;
console.log(Department.fiscalYear);
accDep.mostRecentReport = 'The flippin recent';
console.log(accDep.mostRecentReport);
console.log(accDep.getName());
accDep.printEmployeeInformation();
