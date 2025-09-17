
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation for My App',
  },
  servers: [
    { url: 'http://localhost:3000' },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/app/api/**/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJSDoc(options);
