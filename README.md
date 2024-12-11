
# ProjetD-axe2024

---

## Features

- **User Profiles**: Manage and view user-specific data.
- **Interactive Quizzes**: Participate in quizzes and gain insights.
- **Daily Draws**: Explore daily content or opportunities through a draw mechanism.
- **Collection Management**: Manage and showcase user collections.
  
---

## 🧰 Technologies Used

- **Frontend**: 
  ![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Backend**: 
  ![Node.js](https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-%23000000?style=for-the-badge&logo=prisma&logoColor=white)

- **Database**:
  ![SQL](https://img.shields.io/badge/SQL-%234479A1?style=for-the-badge&logo=sql&logoColor=white)


- **Tools**:
  ![.env](https://img.shields.io/badge/.env-%23000000?style=for-the-badge&logo=.env&logoColor=white)


---

## Setup Instructions

### Prerequisites

1. Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install the Prisma CLI if needed for database migrations.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/17Sx/ProjetD-axe2024.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ProjetD-axe2024
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory and filling it with the required keys.

### Database Setup

1. Ensure your database is running.
2. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

### Running the Project

1. Start the application:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

- **config/**: Configuration files for the project.
- **controllers/**: Backend logic and routing.
- **css/**: Stylesheets for the frontend.
- **middlewares/**: Middleware for request handling.
- **routes/**: API routes for the application.
- **views/**: HTML templates for rendering frontend pages.

