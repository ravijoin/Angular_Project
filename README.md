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

     ![image](https://github.com/user-attachments/assets/fae60634-1630-4180-aa5d-162e052d9955)

2. **Login Page**: 
   - A login form for user authentication.
   -  All the fileds is having validation so please fill the correct information.
     
       ![image](https://github.com/user-attachments/assets/a61425de-5444-4e9d-92c1-064fa442cd12)

       While logging make sure to provide one value only for fields otherwise it will not be loggedin.
   
      ![image](https://github.com/user-attachments/assets/0e18d8ea-0a36-4255-ad21-a4270e86c97b)

3. **Dashboard Page**: 
   - Features a search input for finding medicines.
   - Retrieves and displays medicine data  and gives the count of the searched medicines.
  
    ![image](https://github.com/user-attachments/assets/547d4bb6-c533-4ac7-9297-e07a4ffdf062)

    For view all the data of medicine use scrollbar and add the medicines to the cart .
    ![image](https://github.com/user-attachments/assets/b6d2f555-c3e4-4966-b7dd-683668031e30)

  After adding medicines to the cart , inrcease the quantity of the medicines and proceed to checkout.

   ![image](https://github.com/user-attachments/assets/a942f833-d29c-456e-8c2c-bbcf2b3c3801)

4. **Checkout Page**: 
   - Will display detailed information about selected medicines and facilitate the checkout process.
   - Medicineid and Quantity will automatically patch in checkout form.

     ![image](https://github.com/user-attachments/assets/819a85bc-9893-4516-94b9-c8e13bccea3f)

    If medicine is not available search for the alternatives and update the cart.
   
    ![image](https://github.com/user-attachments/assets/0325b7a6-c159-4174-935c-905da404740b)

   After updating the cart and successfully filling the form ,it will be navigated to place order.
   
   ![image](https://github.com/user-attachments/assets/17dc0474-35ce-4fbf-8370-0f72e18d2fae)

5. **Order Placement**: 
   - Functionality to place orders for medicines based on the selected items and patient information.
   
     Order the medicine with its quantity
     
     ![image](https://github.com/user-attachments/assets/c47924e0-fedf-4eda-913d-fb3e904dfd03)

    After sucessfull ordering , it will navigate thank you page nad the cart will be cleared.

    ![image](https://github.com/user-attachments/assets/3bcb7d07-3b64-4548-bfc8-ec302294a0bb)


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
