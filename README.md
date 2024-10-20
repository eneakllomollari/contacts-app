# Contacts Application with Real-Time Updates

This project is a concept for a contacts management system, featuring a React-based frontend with Tailwind CSS and a FastAPI-based backend with Redis support. It allows users to create, read, update, and delete contacts, with real-time updates for all connected users.

## Key Features

1. **CRUD Operations**: Users can create, read, update, and delete contacts with mandatory fields including first name, last name, email, and phone number. No two contacts can have the same email.
2. **Contact History**: The application provides a basic history of edits for each contact.
3. **Database Persistence**: Contacts are persisted in a PostgreSQL database.
4. **Simulated Slow Network**: The endpoint for creating a contact intentionally takes 20 seconds to respond, simulating a slow network or server load. This delay is designed to reduce system load by staggering the creation of new contacts, preventing a surge of requests that could overwhelm the server. This approach helps ensure the system remains responsive and stable under heavy usage.
5. **Real-Time Updates**: The application features basic real-time updates, enabling changes to contacts to be reflected immediately for all connected users.

## Frontend

The frontend is built using React and Tailwind CSS, providing a basic user interface for managing contacts. For more details, please refer to the [frontend README](contacts-app/README.md).

## Backend

The backend is built using FastAPI, offering a basic solution for managing contacts. It includes features such as RESTful API endpoints, WebSocket support, and database integration. For more details, please refer to the [backend README](contacts-backend/README.md).

## Setup and Installation

To set up and run the application, follow the instructions in the respective READMEs for the frontend and backend.

## Technologies Used

* Frontend: React, Tailwind CSS, WebSockets
* Backend: FastAPI, PostgreSQL, Redis, WebSockets

## Project Overview

This project is a concept for a contacts management system with real-time updates. It is intended to demonstrate a basic solution for managing contacts.

## Addressing the Specifications

This project addresses the specifications as follows:

* Specification 1: Contacts Application
	+ Create, read, update, and delete a list of contacts: Implemented using RESTful API endpoints and React frontend.
	+ Each contact must have a first name, last name, email, and phone number: Implemented using mandatory fields in the contact model.
	+ Users should be able to see the history of edits for each contact: Implemented using a basic history feature.
	+ Contacts should be persisted in the database: Implemented using PostgreSQL database integration.
	+ The endpoint for creating a contact should intentionally take 20 seconds to respond: Implemented using a simulated slow network response to reduce system load.
* Specification 2: Real-Time Updates
	+ Contacts can be updated from outside the application: Implemented using WebSockets for real-time communication.
	+ Implement real-time updates so that changes to contacts are reflected immediately for all connected users: Implemented using WebSockets, Redis, and real-time updates feature.

## Improving the Simulated Slow Network

While the 20-second delay helps reduce system load, it can be further optimized to improve the user experience. Some potential improvements include:

* Implementing a queuing system to handle contact creation requests, allowing the system to process requests in batches and reducing the load on the server.
* Introducing a caching layer to reduce the number of database queries, further alleviating system load.
* Utilizing an asynchronous processing approach to handle contact creation, enabling the system to respond to the user more quickly while still ensuring that the contact is created successfully.
* Implementing a load balancing strategy to distribute incoming requests across multiple servers, ensuring that no single server is overwhelmed and reducing the likelihood of system overload.

By incorporating these improvements, the system can better handle high volumes of traffic, providing a smoother user experience and ensuring that the system remains responsive and stable under heavy usage.


## Future Improvements

To further enhance the Contacts Application, several improvements can be considered:

1. **Unit and API Tests**: Implementing comprehensive unit tests for the frontend and backend components, as well as API tests to ensure the integrity of the API endpoints, would significantly improve the application's reliability and maintainability.
2. **Better API Documentation**: Enhancing the API documentation to include more detailed descriptions, request and response examples, and error handling information would make it easier for developers to integrate the API into their applications.
3. **Profile Picture**: Adding the ability to upload and display a profile picture for each contact would enrich the user experience and provide a more personal touch.
4. **Exporting Contacts**: Implementing a feature to export contacts in a CSV or vCard format would allow users to easily transfer their contacts to other devices or applications.
5. **Additional Fields**: Including more fields such as address, birthday, or notes would provide users with a more comprehensive contact management system.
6. **Multiple Phone Numbers/Emails**: Allowing users to add multiple phone numbers and email addresses for each contact would better reflect real-world scenarios where individuals often have multiple contact points.
7. **Authentication**: Implementing user authentication would enable features like contact ownership, access control, and personalized contact lists, significantly enhancing the application's functionality and security.
8. **Search and Filter**: Adding search and filter capabilities would make it easier for users to find specific contacts within their list, especially as the list grows.
9. **Pagination**: Implementing pagination would improve the application's performance by limiting the number of contacts loaded at once, making it more efficient for handling large contact lists.
10. **Real-Time Notifications**: Implementing real-time notifications for contact updates would ensure that users are informed immediately of any changes to their contacts' information.
11. **WebSockets in History Page**: Introducing WebSockets in the history page would enable real-time updates of contact history, providing users with a more dynamic and interactive experience.
12. **Rate Limiting**: Implementing rate limiting on API endpoints would prevent abuse and ensure the application's stability under high traffic or malicious activity, enhancing the overall security and performance of the application.
13. **Consistent Validation**: Implementing consistent validation across the application would ensure that user input is validated uniformly, preventing errors and inconsistencies. This would include validating user input for contact information, ensuring that required fields are filled, and checking for invalid or duplicate data.

By addressing these areas, the Contacts Application can be transformed into a more comprehensive, user-friendly, and feature-rich tool for managing contacts.


## Demo

### Main screens
![List of contacts](./demo/list.png?raw=true "List of Contacts")
![No contacts](./demo/no_contacts_page.png?raw=true "No contacts landing page")
![Adding new contact](./demo/add_new.png?raw=true "Adding new contact")
![History of changes](./demo/history.png?raw=true "History")


### API Docs
![Swagger docs](./demo/docs.png?raw=true "Swagger docs")
![Redoc docs](./demo/redoc.png?raw=true "Redoc docs")

### Demo video
![Demo video](./demo/demo.mov?raw=true "Demo")
