![image](https://github.com/user-attachments/assets/8798007a-75ee-4653-8fbf-0eae9ad1c9d4)## Medicine_App

## Description
This project is a comprehensive Angular-based web application designed for managing medicine orders. It includes user authentication, medicine search, patient management, and order processing functionalities.

## Features
1. **Landing Page**: 
   - A fully functional landing page with a header, footer, and side-navigation menu.
   - Provides users with easy access to different sections of the application.
   - Implemented authenticatiion so that user after successfull login can view the dashboard otherwise not.
   - Login and Register button will remain disable when form is invalid
  
     ![image](https://github.com/user-attachments/assets/c1c3e291-beb9-4476-a9c1-867a2bb70a0c)



Fill the registration first if new to the application , all the fileds is having validation so please fill the correct information.

![image](https://github.com/user-attachments/assets/d7650dc2-ab14-46a1-8d15-34e8cdd4dd93)

2. **Login Page**: 
   - A login form for user authentication.
   - Currently, the API integration for user authentication is not operational, and further debugging is needed.
   - Will have 2 panels one is for admin and another is for patient.Admin can see all the users , approve its requests , apply fine on patient if needed.Patient can  order the instock medicines . This placed order is reviewed by the admin and after the aprooval , the email mail message will be send to the store and further delievery of the medicine will take place.

Fill the Login form if successfully registered .

   ![image](https://github.com/user-attachments/assets/615e5a1c-be15-4445-923d-ddc22f70a003)

   All the fileds is having validation so please fill the correct information.

   ![image](https://github.com/user-attachments/assets/38779a94-eb35-4a38-99c6-8fe8282f7340)

  While logging make sure to provide one value only for fields otherwise it will be looggedin.
   
   ![image](https://github.com/user-attachments/assets/0e18d8ea-0a36-4255-ad21-a4270e86c97b)

3. **Dashboard Page**: 
   - Features a search input for finding medicines.
   - Retrieves and displays medicine data  and gives the count of the searched medicines.
  
    ![image](https://github.com/user-attachments/assets/547d4bb6-c533-4ac7-9297-e07a4ffdf062)

    For view all the data of medicine use scrollbar and add the medicines to the cart .
    ![image](https://github.com/user-attachments/assets/b6d2f555-c3e4-4966-b7dd-683668031e30)

  After adding medicines to the cart , inrcease the quantity of the medicines and proceed to checkout.

   ![image](https://github.com/user-attachments/assets/a942f833-d29c-456e-8c2c-bbcf2b3c3801)


6. **Checkout Page**: 
   - In progress. As api is key required this message I'm getting in logging.
   - Will display detailed information about selected medicines and facilitate the checkout process.

7. **Order Placement**: 
   - In progress. As api is key required this message I'm getting in logging.
   - Functionality to place orders for medicines based on the selected items and patient information.
     
  Click on the order button and navigate to the Order page . 
     ![image](https://github.com/user-attachments/assets/b077aae6-bc77-4539-8b56-d65114cdefee)
   
  Order the medicine with its quantity (In progress).
    ![image](https://github.com/user-attachments/assets/6cacbb12-856b-4834-872d-06ebc0dbdf6e)




  

## Technologies Used
- **Angular 17**: Front-end framework
- **Angular Material**: UI components
- **Angular CLI**: Command-line interface for Angular
- **SCSS**: Styling
- **TypeScript**: Programming language

## Installation
Provide step-by-step instructions to set up the project locally. Include prerequisites and commands to install dependencies.

1. Clone the repository: https://github.com/ravijoin/angular_project.git
    ```bash
     https://github.com/ravijoin/angular_project.git
    ```
2. Navigate into the project directory:
    ```bash
    cd angular_project
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Application
Instructions to start the development server and view the application.

1. Start the development server:
    ```bash
    ng serve
    ```
2. Open your browser and navigate to `http://localhost:4200`.

## Usage
- **Landing Page**: Provides navigation to other parts of the application.
- **Login Page**: Allows users to authenticate. Note that API integration is currently not working.
- **Dashboard**: (In progress)Search for medicines and view results from the API.
- **Patient Management**: Add patients and use their data for ordering.
- **Checkout**: (In progress) View medicine details and proceed with the order.





## Acknowledgements


- [Angular](https://angular.io/) - The web framework used
- [Angular Material](https://material.angular.io/) - UI components
