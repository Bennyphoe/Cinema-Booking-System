<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>


## Table Of Contents
- [About The Project](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Acknowledgments](#acknowledgments)



<!-- ABOUT THE PROJECT -->
<div id="about"></div>

## About The Project

### Cinema Booking System

The Cinema Booking System is a web application designed to mimic the functionality of an actual online booking system used by cinemas. Inspired by the Shaw Theatres' website, this application offers a comprehensive and user-friendly experience for booking movie tickets

### Project Aim

The main goal of this project is to simulate the user journey of booking seats for a movie showtime. Users can experience the full process of selecting a movie, choosing a showtime, and reserving seats. Additionally, the system provides an admin interface for managing the primary entities of a cinema, including movies, showtimes, and halls

### Built With
<div id="built-with"></div>

* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
* ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
* ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

 ```sh
   git clone https://github.com/Bennyphoe/Cinema-Booking-System.git
   cd Cinema-Booking-System
 ```

### Prerequisites

1. Git
2. Java Development Kit (JDK)
3. Node.js and npm (React)
4. Maven (build and manage the Spring Boot project dependencies)
5. MySQL (Database)
6. VSCode (Frontend IDE)
7. IntelliJ (Backend IDE)

### Installation

**Front End** <br>

1. Install NPM packages
   ```sh
   npm install
   ```
2. Run the application
    ```sh
   npm run dev
   ```
**Back End** <br>
1. Navigate to the backend directory
2. Configure your database settings in application.properties
3. Run the Application 
    ```sh
   ./mvnw spring-boot:run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Features

### As A Customer

1. **View Movies Currently Showing**

![Home_2](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/d5ba82a9-b0d0-4a10-8d4c-54de027c88aa)

> View Movies that are currently showing. Showing means that the current date is within the movie's start and end dates.
>
> Hovering over a movie displays details about the movie and also the option to "Buy" which navigates user to the showtimes page with selected movie as filter.

2. **View All Movies Showtimes**

![Showtimes](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/2bc07f3b-dc2e-43f4-a149-68b5185cd875)

> View the showtimes for currently showing movies. User can select a date 11 days from today to make a reservation in advance.
>
> If Today is selected, Showtimes displayed are slots after the current date time, for every other day, all showtimes are displayed.
>
> If no showtimes are available, user will be notified and asked to check other dates.

3. **View A Movie's Showtimes**

![Showtime-Selected-Movie](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/8d1554dc-96ec-4702-b829-6cfe81d8521f)

> User can filter the showtimes by Movie by selecting a movie in the dropdown.

4. **Select Seats**

![Seat-Selection-Page](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/ccc2db18-e821-4b37-b733-5c3a28ac2735)

> Upon clicking on a showtime, user is navigated to the Seat Selection Page.
>
> User can view Movie details and also the Seat configurations for the hall that the movie is screened. 

5. **Reserve Seats**

![Select-Seats](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/b148669a-e0a1-4ba3-af4b-71b909e5f1a6)

> User can select the seats they want to reserve, which will be highlighted in green indicating a selected seat.
>
> Selected Seats are displayed at the bottom section. User can enter an email and submit the reservation.
>
> If user is unsatisfied with the seat selection, user can reset.

![Reserved-seats](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/b265f7f0-a098-4828-a948-e5490d2cc8bc)

> Upon Reservation, the reserved seats are highlighted red to indicate its unavailable for booking.

---

### As An Admin

1. **Login As Admin**

![Login](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/ce5c91b4-d46f-4884-8430-b6f92ac8686f)

2. **Create New Admin**

![Register-New-Admin](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/e66ad6e5-5f6e-46d1-b4a4-88774e185abd)

> Register a New Admin for the application

3. **Create New Movie**

![Create-New-Movie](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/c51c7a6b-f202-430b-9846-257845865d1c)

> Validation checks are in place for Start Date and End Date on both Front End and Back End
> 
> User can upload an image but only the name before ".jpg" will be saved in the database. Images have to be saved manually as static files in App's File directory.

4. **View/Edit/Delete Movies**

![View-All-Movies](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/0be69523-6561-4966-ac23-6654988ef292)

![Edit-Movie](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/70bf9f1d-9073-4917-a4de-47dc91a63556)

> User can Edit a Movie's End Date, Rating and Active state. The active state is used as soft deletion to preserve relationships in database.
>
> User can Delete a Movie only if there are no showtimes attached to this movie

5. **Create New Hall**

![Create-Hall](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/bb042990-d03a-4086-98a2-d7fe6f1418e8)

> User can enter rows and cols which are used to generate the seat configurations for the hall. E.g. 5 rows & 6 cols results in a 5x6 configuration

6. **View/Edit/Delete Halls**

![View-All-Halls](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/9018016d-5937-4028-9a4c-14027123a572)

![Edit-Hall](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/3f8ace33-11ff-4418-8cfd-984e8e03f1cb)

> User can Edit a Hall's name and active state. The active state is used a soft deletion to preserve relationships in database
>
> User can Delete a Hall only if there are no showtimes attached to the hall

7. **Create New Showtime**

![Create-New-Showtime](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/e254b8af-a936-41ec-bb88-569f1ae13bfb)

![clash](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/748ce641-3704-4a3d-9b79-21bb5b0c82fb)

> A Showtime requires a movie, hall and a time.
>
> The Movies available for selection are active and currently showing movies
>
> The Halls available for selection are active halls. Upon selection of a hall, its scheduled showtimes are displayed to inform user for future showtimes so as to avoid clashing. Validation are done on both FE and BE.

8. **View/Delete Showtimes**

![View-All-Showtimes](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/c9b90563-3631-46fe-b895-d43e4043619a)

> User can delete a showtime that has not happen yet. All reservations attached to this showtime will be removed too.

9. **Logout**

![Home](https://github.com/Bennyphoe/Cinema-Booking-System/assets/48516318/f721de9a-b5a2-458c-889e-8e675bce4780)

> Upon Logging out, user is brought back to Home page.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Shaw Theatres Website](https://shaw.sg/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
