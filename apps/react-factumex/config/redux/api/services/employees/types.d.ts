export interface IEmployee {
  id: number;
  name: string;
  last_name: string;
  birthday: number; // unix
}

export interface IEmployeesResponseData {
  employees: IEmployee[];
}
