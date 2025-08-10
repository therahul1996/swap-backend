const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DEX API",
      version: "1.0.0",
      description: "API documentation for DEX backend",
    },
    servers: [
      {
        url: "http://localhost:9001",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Scan route files for Swagger comments
};

module.exports = swaggerJsdoc(options);
