# Contacts API

This is a FastAPI-based backend for a Contacts management system, designed to provide a robust and scalable solution for managing contacts. The system leverages PostgreSQL for database operations, Redis for real-time communication and data synchronization, and WebSockets for bi-directional communication between the server and connected clients.

## Project Overview

- **Project Name**: Contacts API
- **Version**: 1.0.0

## Features

- **PostgreSQL Database Integration**: Utilizes PostgreSQL for storing and managing contact data, ensuring data integrity and scalability.
- **RESTful API Endpoints**: Provides a comprehensive set of RESTful API endpoints for creating, reading, updating, and deleting contacts, ensuring easy integration with frontend applications.
- **Real-time Communication**: Employs Redis for real-time communication, enabling the system to broadcast contact changes to connected clients and maintain data consistency across all users.
- **WebSockets**: Utilizes WebSockets for bi-directional communication between the server and connected clients, enabling real-time updates and notifications.
- **Publish-Subscribe (Pub/Sub) Pattern**: Implements the Pub/Sub pattern using Redis to facilitate real-time data synchronization across all connected clients. When a contact is created, updated, or deleted, the server publishes a message to a Redis channel. All connected clients are subscribed to this channel, ensuring they receive the update instantly and can update their local contact list accordingly. This pattern enables real-time synchronization of contact data across all users, ensuring a consistent view of the contact list.

## Event Listeners and Pub/Sub Integration

The project uses event listeners in the `Contact` model to trigger the publication of contact changes to the Redis channel. Specifically, the `after_change` method is called after a contact is inserted, updated, or deleted. This method publishes a message to the `contact_changes` channel using the `publish_contact_change` function from the `redis_client` module.

The `redis_client` module establishes a connection to the Redis instance and sets up a Pub/Sub client. The `publish_contact_change` function publishes a message to the `contact_changes` channel, which is subscribed to by all connected clients. This ensures that any changes to contacts are instantly reflected across all users, maintaining a consistent view of the contact list.

## Authentication Note

For the sake of simplicity, authentication has not been implemented in this project. In a real-world scenario, authentication and authorization mechanisms would be essential to ensure that only authorized users can access and modify contact data.

## Setup

### Prerequisites

1. **Python Installation**: Ensure Python is installed on your system.
2. **Virtual Environment**: It is recommended to use a virtual environment to manage project dependencies.

### Installing Dependencies

1. Install the required dependencies using pip:
   ```
   pip install -r requirements.txt
   ```
   This command installs all the required dependencies specified in the `requirements.txt` file, including FastAPI, SQLAlchemy, Pydantic, and Python-dotenv, which are necessary for running the application.

   To install additional development dependencies, such as Flake8, Black, and Pytest, which are useful for testing and code formatting, run:
   ```
   pip install -r requirements-dev.txt
   ```

### Database Setup

1. **PostgreSQL Setup**: Create a new PostgreSQL database named `contacts_db`. You can do this using the following command:
   ```bash
psql -U postgres -c "CREATE DATABASE contacts_db;"
```
   Replace `postgres` with your actual PostgreSQL username.
2. **PostgreSQL Credentials**: Update the `.env` file with your PostgreSQL credentials:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/contacts_db
   ```
   Replace `user`, `password`, and `contacts_db` with your actual PostgreSQL credentials and database name.
3. **Redis Setup**: Ensure Redis is installed and running on your system. Update the `.env` file with your Redis URL:
   ```
   REDIS_URL=redis://localhost:6379
   ```
   This sets up the connection to your local Redis instance.

### Running the Application

To run the application, use the following command:
```bash
./start.sh
```
This command starts the FastAPI server, which listens for incoming requests and establishes WebSocket connections with clients.

### Code Quality Tools

To ensure code quality and consistency, the project uses the following tools:

1. **Black**: A code formatter that ensures consistent code style throughout the project. To run Black, use the following command:
   ```bash
black .
```
2. **Flake8**: A linter that checks for code errors and warnings. To run Flake8, use the following command:
   ```bash
flake8 .
```

### Documentation

API documentation is available at the following endpoints:

* **Swagger UI**: `/docs`
* **ReDoc**: `/redoc`

You can access these endpoints by visiting `http://localhost:8000/docs` or `http://localhost:8000/redoc` in your web browser.

### WebSocket Functionality

The project uses WebSockets to establish bi-directional communication between the server and connected clients. When a client connects to the WebSocket endpoint, the server broadcasts the current list of contacts to the client. The client can then receive real-time updates when contacts are created, updated, or deleted.

### Publish-Subscribe (Pub/Sub) Pattern

The project leverages Redis's Pub/Sub feature to implement real-time data synchronization across all connected clients. When a contact is created, updated, or deleted, the server publishes a message to a Redis channel. All connected clients are subscribed to this channel, ensuring they receive the update instantly and can update their local contact list accordingly. This pattern enables real-time synchronization of contact data across all users, ensuring a consistent view of the contact list.

### Overall Infrastructure

The project's infrastructure consists of the following components:

1. **FastAPI Server**: Handles incoming requests and establishes WebSocket connections with clients.
2. **PostgreSQL Database**: Stores and manages contact data.
3. **Redis**: Enables real-time communication between the server and connected clients, and facilitates data synchronization using the Pub/Sub pattern.
4. **WebSocket Endpoint**: Establishes bi-directional communication between the server and connected clients, enabling real-time updates and notifications.

By following these instructions, you can set up and run the Contacts API project, which provides a robust and scalable solution for managing contacts in real-time, ensuring data consistency across all users.

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

By addressing these areas, the Contacts Application can be transformed into a more comprehensive, user-friendly, and feature-rich tool for managing contacts.
