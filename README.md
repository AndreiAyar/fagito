# Fagito – Dynamic Recipe Pricing App

Fagito is a SvelteKit-powered application for recipe management with real-time ingredient pricing. It leverages a modern serverless architecture and integrates multiple AWS services to provide accurate, up-to-date cost calculations for recipes based on live product prices.

## Features

- **Dynamic Recipe Pricing:**  
  Calculates the cost per portion for recipes using real-time crawled data from grocery websites. Ingredient quantities (e.g., grams of flour or sugar) are factored into the price calculation.

- **Real-Time Data Crawling:**  
  Utilizes AWS Lambda and Puppeteer-based crawlers to fetch live product prices. Asynchronous crawling is managed via AWS SQS and API Gateway, with results stored in AWS RDS.

- **Serverless Architecture:**  
  Integrates AWS Lambda, SQS, API Gateway, S3, and RDS for scalable, cost-effective, and highly available backend services.

- **Custom Recipe Editor:**  
  Authenticated users can add and edit recipes using a rich text editor (Editor.js), supporting embedded images, tables, and lists.

- **User Authentication & Management:**  
  Secure user registration and login, with personalized recipe and grocery management.

- **Responsive UI:**  
  Styled with Tailwind CSS and Skeleton UI for a modern, mobile-friendly interface.

- **Testing:**  
  End-to-end tests are implemented using Cypress to ensure reliability and consistent user experience.

## Technical Stack

- **Frontend:** SvelteKit, Tailwind CSS, Skeleton UI, Editor.js
- **Backend:** Prisma ORM, PostgreSQL (AWS RDS), AWS Lambda, SQS, API Gateway, S3
- **Web Crawling:** Puppeteer (via AWS Lambda)
- **Authentication:** Custom logic with Prisma
- **Testing:** Cypress

## Key Code Features

- **Live Price Calculation:**  
  The backend fetches and updates grocery prices in real-time, storing price history and enabling accurate recipe cost breakdowns.

- **Ingredient Management:**  
  Users can search, add, and manage groceries, with each product linked to live vendor data and price history.

- **Recipe Management:**  
  Recipes are linked to users and ingredients, supporting drafts, publishing, and editing with a rich editor.

- **Scalable Data Model:**  
  See [`prisma/schema.prisma`](prisma/schema.prisma) for the full relational data model, including users, groceries, posts (recipes), vendors, and price history.

## Getting Started

1. **Install dependencies:**  
   ```sh
   npm install
   ```

2. **Set up environment variables:**  
   Copy `.env.example` to `.env` and configure your database and AWS credentials.

3. **Run database migrations:**  
   ```sh
   npx prisma migrate dev
   ```

4. **Start the development server:**  
   ```sh
   npm run dev
   ```

5. **Run tests:**  
   ```sh
   npm run test
   ```

## Folder Structure

- `src/` – SvelteKit routes, components, and stores
- `prisma/` – Prisma schema and migrations
- `cypress/` – Cypress end-to-end tests
- `static/` – Static assets

---

For more details, see the code and comments throughout the project.