## Medicine_App

## Description
This project is a comprehensive Angular-based web application designed for managing medicine orders. It includes user authentication, medicine search, patient management, and order processing functionalities.

## Features
1. **Landing Page**: 
   - A fully functional landing page with a header, footer, and side-navigation menu.Unable to make it fully responsive b/c of Api Key.
   - Provides users with easy access to different sections of the application.
  
     
![image](https://github.com/user-attachments/assets/380170a6-46a6-431f-b8cf-a9b74774c8f6)

Fill the registration first if new to the application , all the fileds is having validation so please fill the correct information.

![image](https://github.com/user-attachments/assets/d7650dc2-ab14-46a1-8d15-34e8cdd4dd93)

A snackbar will be displayed if successfully logged in .

![image](https://github.com/user-attachments/assets/b1de585a-4c4b-40c1-850c-f7795caa451a)



2. **Login Page**: 
   - A login form for user authentication.
   - Currently, the API integration for user authentication is not operational, and further debugging is needed.
   - Will have 2 panels one is for admin and another is for patient.Admin can see all the users , approve its requests , apply fine on patient if needed.Patient can  order the instock medicines . This placed order is reviewed by the admin and after the aprooval , the email mail message will be send to the store and further delievery of the medicine will take place.

Fill the Login form if successfully registered .

   ![image](https://github.com/user-attachments/assets/615e5a1c-be15-4445-923d-ddc22f70a003)

   All the fileds is having validation so please fill the correct information.

   ![image](https://github.com/user-attachments/assets/38779a94-eb35-4a38-99c6-8fe8282f7340)

   A snackbar will be displayed and patient will be logged in after successful aprooval by admin.
   
   ![image](https://github.com/user-attachments/assets/c6245af4-140d-4b1a-8028-8079ee992c24)




4. **Dashboard Page**: 
   - Features a search input for finding medicines.
   - Retrieves and displays medicine data from an external API. For now I have made static to search the medicine and also it will count the medicine when it is searched.
  
     ![image](https://github.com/user-attachments/assets/131566cb-c8fd-4267-9f80-79e8ed60dfe0)

   For now it is static list . But still from this we can calculate the counts of  medicine instock or not.

   ![image](https://github.com/user-attachments/assets/f6334dae-8645-498d-b72c-d363362df155)


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
