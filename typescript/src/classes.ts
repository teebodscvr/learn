abstract class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(private readonly id: string, private  name: string){
    }


   abstract getName(this: Department): string;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    getId(): string {
       return this.id;
    }

}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]){
        super(id, 'IT');
    }

    getName(this: ITDepartment): string {
        if(true) {
            return 'Heyy'
        }
    }
}

const dep = new ITDepartment('My ID', ['Ambrose']);

console.log(dep)

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        
        throw new Error('No report found');
    }

    set mostRecentReport(mostRecentReport: string) {
        this.addReport(mostRecentReport);
    }
 
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getnstance (id: string, reports: string[]): AccountingDepartment {
        if(this.instance) { // OR: AccountingDepartment.instance
            return this.instance;
        }

        this.instance = new AccountingDepartment(id, reports); // The new keyword of the instantiation of the class's instance is valid because we have created a private constructor; meaning that
        // the constructor/new can be called within the class.

        return this.instance;
    }


    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    getName(this: AccountingDepartment): string {
        return 'I am retuning something totally diff';
    }

    addEmployee(employee: string): void {
        if(employee === 'Thabo') {
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

accDep.getName

console.log(Department.fiscalYear);

accDep.mostRecentReport = 'The flippin recent';

console.log(accDep.mostRecentReport);
console.log(accDep.getName());

accDep.printEmployeeInformation();