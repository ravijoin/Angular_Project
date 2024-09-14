export interface User {

  first_name: string;
  last_name: string;
  dob: string;
  mobileNumber: string;
  zipcode: string;
  gender: string;
  blood_group:string;
  userType: UserType;
}


export interface RegisterResponse {
  token: string;
  message?: string;  // Optional property if the response contains a message
  // Add other properties if necessary
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

export interface BookCategory {
  id: number;
  category: string;
  subCategory: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  ordered: boolean;
  bookCategoryId: number;
  bookCategory: BookCategory;
}

export interface BooksByCategory {
  bookCategoryId: number;
  category: string;
  subCategory: string;
  books: Book[];
}

export interface Order {
  id: number;
  userId: number;
  userName: string | null;
  bookId: number;
  bookTitle: string;
  orderDate: string;
  returned: boolean;
  returnDate: string | null;
  finePaid: number;
}
