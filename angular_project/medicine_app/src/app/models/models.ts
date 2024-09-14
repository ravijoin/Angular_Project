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
  token: string;
  message?: string; // Optional property if the response contains a message

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



