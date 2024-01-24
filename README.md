![Cover](https://github.com/JTissot-Dev/ran-day/blob/resources-readme/readme-head.png?raw=true)

<br>

## About The Project

<br>
<br>
<div align="center">
  <img src="https://github.com/JTissot-Dev/ran-day/blob/resources-readme/readme-views.gif?raw=true" width="90%">
</div>
<br>
<br>
Task Planner is a project management application based on a kanban board and drag and drop fonctionnalities.
<br>


### Built With

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

* ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)

* ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
<br>

## Getting starded
The following instructions will show you how to run it in your local environment.

### Prerequisites
Set up:
* <a href="https://nodejs.org/dist/v16.17.1/"> Node.js 16.17.1 </a>
* <a href="https://www.apachefriends.org/fr/download.html"> XAMPP 8.2.12 </a>
* <a href="https://getcomposer.org/download/"> Composer 2.5.8 </a>

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/JTissot-Dev/task-planner.git
   ```
2. Move to the application directory
   ```sh
   cd task-planner
   ```
3. Install PHP dependancies
   ```sh
   composer install
   ```
4. Create .env file
   ```sh
   touch .env
   ```
5. Copy the content of .env.example file in .env file and adjust database variable to fit your MySQL configuration
   ```sh
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel # Name of your MySQL database
    DB_USERNAME=root # If you have define a username
    DB_PASSWORD= # If you have define a password
   ```
6. Launch database migration
   ```sh
    php artisan migrate
   ```
7. (optional) Create fake data in database
   ```sh
    php artisan db:seed
   ```
8. Now, the backend of the application is ready to run, you can start Laravel's local development server
   ```sh
    php artisan serve
   ```
9. Let's start the frontend installation, move to the react application directory
   ```sh
    cd react-task-planner
   ```
10. Install Node.js dependancies
       ```sh
        npm install
       ```
11. Create .env file
       ```sh
        touch .env
       ```
12. Copy the content of .env.example file in .env file
       ```sh
        VITE_API_BASE_URL=http://localhost:8000
       ```
13. At this point, the app should be properly installed on your device, now, you juste have to run Vite's development server
       ```sh
        npm run dev
       ```


## Usage

It's time to test the app !

### First connection

To access the app for the first time, just create an account from signup page
<br>
<br>
<div align="center">
  <img src="https://github.com/JTissot-Dev/task-planner/blob/resource-readme/readme-resources/Screen_signup.jpg?raw=true" width="90%">
</div>
<br>
<br>

## Contact

Jérôme Tissot - jerome.tissot@lamache.org
