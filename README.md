# Microservices Project
A sample microservices architecture built with Express.js, MongoDB, and Docker. This project demonstrates a practical implementation of microservices, featuring an API Gateway that routes requests to specialized backend services.

## Architecture Overview

- **API Gateway** (port 3000): Central entry point that routes requests to appropriate services
- **User Service** (port 3001): Handles user management operations with its dedicated MongoDB
- **Product Service** (port 3002): Manages product data with its own MongoDB instance

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure
Here's the content for your README.md file:

```markdown
# Microservices Project

A sample microservices architecture built with Express.js, MongoDB, and Docker. This project demonstrates a practical implementation of microservices, featuring an API Gateway that routes requests to specialized backend services.

## Architecture Overview

- **API Gateway** (port 3000): Central entry point that routes requests to appropriate services
- **User Service** (port 3001): Handles user management operations with its dedicated MongoDB
- **Product Service** (port 3002): Manages product data with its own MongoDB instance

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
microservices-project/
│
├── api-gateway/              # API Gateway Service
│   ├── package.json          # Dependencies including express and http-proxy-middleware
│   ├── server.js             # Gateway logic and proxy configuration
│   └── Dockerfile            # Container configuration
│
├── user-service/             # User Management Service
│   ├── controllers/          # Business logic for user operations
│   │   └── userController.js
│   ├── models/               # Database models
│   │   └── userModel.js
│   ├── routes/               # API route definitions
│   │   └── userRoutes.js
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   ├── server.js             # Service entry point
│   └── Dockerfile
│
├── product-service/          # Product Management Service
│   ├── controllers/          # Business logic for product operations
│   │   └── productController.js
│   ├── models/               # Database models
│   │   └── productModel.js
│   ├── routes/               # API route definitions
│   │   └── productRoutes.js
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   ├── server.js             # Service entry point
│   └── Dockerfile
│
├── docker-compose.yml        # Multi-container orchestration
└── README.md                 # Project documentation
```

## Setup and Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/microservices-project.git
cd microservices-project
```

### Install dependencies (if developing locally)

```bash
# Install dependencies for each service
cd api-gateway
npm install

cd ../user-service
npm install

cd ../product-service
npm install
```

## Running the Application

### Using Docker Compose (Recommended)

1. Start all services with Docker Compose:

```bash
docker-compose up -d
```

This command builds and starts all services defined in docker-compose.yml, including:
- API Gateway on port 3000
- User Service on port 3001
- Product Service on port 3002
- MongoDB instances for each service

2. Check if all containers are running:

```bash
docker-compose ps
```

3. Stop all services:

```bash
docker-compose down
```

To remove volumes (delete all data):

```bash
docker-compose down -v
```

### Running Services Individually (Development)

For local development without Docker:

**API Gateway**:
```bash
cd api-gateway
npm run dev
```

**User Service**:
```bash
cd user-service
npm run dev
```

**Product Service**:
```bash
cd product-service
npm run dev
```

> Note: When running services individually, you'll need MongoDB installed locally or update connection strings to point to your MongoDB instances.

## API Endpoints

All requests go through the API Gateway at `http://localhost:3000`

### User Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/users` | Get all users |
| GET    | `/api/users/:id` | Get user by ID |
| POST   | `/api/users` | Create a new user |
| PUT    | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Product Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/products` | Get all products |
| GET    | `/api/products/:id` | Get product by ID |
| POST   | `/api/products` | Create a new product |
| PUT    | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Example Requests

### Create a user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get all users

```bash
curl -X GET http://localhost:3000/api/users
```

### Create a product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product",
    "price": 29.99,
    "category": "Electronics"
  }'
```

### Get all products

```bash
curl -X GET http://localhost:3000/api/products
```

## Troubleshooting

### Common Issues

1. **API Gateway Proxy Issues**
   - If POST requests through the API Gateway fail but direct requests to services work, check the proxy configuration in the API Gateway's server.js
   - The current implementation includes special handling for request bodies to ensure proper forwarding

2. **MongoDB Connection Errors**
   - Ensure MongoDB containers are running: `docker-compose ps`
   - Check the MongoDB connection strings in .env files
   - For local development, you may need to use `localhost` instead of container names

3. **Container Communication Issues**
   - All services must be on the same Docker network (specified in docker-compose.yml)
   - Container names in connection strings must match service names in docker-compose.yml

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs (continuous output)
docker-compose logs -f

# View logs for a specific service
docker-compose logs api-gateway
docker-compose logs user-service
docker-compose logs product-service
```

## Security Notes

- This is a development/demonstration setup and lacks production security features
- For production:
  - Add proper authentication and authorization
  - Implement HTTPS
  - Use environment variables for secrets
  - Add MongoDB authentication

## Future Enhancements

- Authentication service with JWT
- Service discovery
- Circuit breaker patterns
- Containerized development environment
- End-to-end testing suite

## License

MIT

