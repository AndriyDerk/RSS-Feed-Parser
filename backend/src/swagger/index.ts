import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true, 
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the RSS Posts Parser',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/router/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
