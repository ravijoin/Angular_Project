export interface User {
  first_name: string;
  last_name: string;
  dob: string;
  mobileNumber: string;
  zipcode: string;
  gender: string;
  blood_group: string;
  userType: UserType;
}

export interface RegisterResponse {
  status_code:any,
  status_message:string,

}
export enum AccountStatus {
  UNAPROOVED,
  ACTIVE,
  BLOCKED,
}

export enum UserType {
  ADMIN,
  STUDENT,
}



