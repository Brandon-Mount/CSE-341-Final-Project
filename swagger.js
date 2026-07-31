require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
});

const apiHost = process.env.API_HOST || "localhost:3000";
const apiProtocol = apiHost.includes("onrender.com") ? "https" : "http";

const doc = {
  info: {
    title: "Game Library API",
    description: "API for managing video games and game developers.",
    version: "1.0.0",
  },

  servers: [
    {
      url: `${apiProtocol}://${apiHost}`,
      description: apiHost.includes("onrender.com")
        ? "Render production server"
        : "Local development server",
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
