# Smartsheet-Integration-Node

![tradinghours](https://user-images.githubusercontent.com/84505567/174243205-3994a12e-1aed-42a9-ae1d-e7f52959c6d6.png)



# Automation Engine for Smartsheet Data Processing

## Overview

This project automates the process of extracting, cleansing, and formatting data from Smartsheet to reduce manual intervention, improve accuracy, and streamline workflows. Previously, tasks were performed manually, including bulk data retrieval, local Excel sheet manipulations, and extensive Tableau Prep flows. This process was error-prone, repetitive, and inefficient.

## Solution

The automation engine solves these issues by leveraging cloud-based technologies to directly extract data from Smartsheet and process it on a cloud server. The final formatted data is then automatically delivered to stakeholders, minimizing manual effort and enhancing reliability.

## Key Features

- **Automated Data Extraction:** Retrieves data from Smartsheet using the Smartsheet API SDK for JavaScript.
- **Cloud-Based Processing:** Utilizes Node.js and MongoDB for efficient data processing and storage.
- **Dynamic Data Formatting:** Converts data into the required format as specified by stakeholders.
- **Email Notifications:** Sends processed data to stakeholders using Node Mailer integrated with Outlook SMTP provider.
- **Cloud Deployment:** Currently deployed on Heroku, with migration to AWS in progress for better scalability and performance.

## Tech Stack

- **Node.js:** JavaScript runtime environment used for server-side application development.
- **Smartsheet API SDK for JavaScript:** Provides programmatic access to Smartsheet data.
- **MongoDB:** NoSQL database used for storing and managing data.
- **Node Mailer:** Manages email sending functionality.
- **Heroku:** Cloud platform for deploying and managing applications (migration to AWS in progress).

## Getting Started

To get started with this project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kripu77/smartsheet-connect.git
   ```

2. **Install Dependencies:**
   ```bash
    npm install
   ```
3. Configure Environment Variables:
   - Create a .env file in the root directory of the project.
   - Add your Smartsheet API credentials and Outlook SMTP details to the .env file.

4. Run the application:
   ```bash
   npm start
   ```
