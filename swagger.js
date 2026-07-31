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

  components: {
    schemas: {
      Game: {
        type: "object",
        required: [
          "title",
          "genre",
          "platform",
          "releaseYear",
          "developer",
          "console",
          "rating",
          "multiplayer",
        ],
        properties: {
          title: {
            type: "string",
            example: "Minecraft",
          },
          genre: {
            type: "string",
            example: "Sandbox",
          },
          platform: {
            type: "string",
            example: "Multiple Platforms",
          },
          releaseYear: {
            type: "integer",
            example: 2011,
          },
          developer: {
            type: "string",
            example: "Mojang Studios",
          },
          console: {
            type: "string",
            example: "Xbox Series X",
          },
          rating: {
            type: "number",
            example: 9,
          },
          multiplayer: {
            type: "boolean",
            example: true,
          },
        },
      },

      Developer: {
        type: "object",
        required: ["name", "country", "foundedYear", "headquarters", "website"],
        properties: {
          name: {
            type: "string",
            example: "Mojang Studios",
          },
          country: {
            type: "string",
            example: "Sweden",
          },
          foundedYear: {
            type: "integer",
            example: 2009,
          },
          headquarters: {
            type: "string",
            example: "Stockholm, Sweden",
          },
          website: {
            type: "string",
            example: "https://www.minecraft.net",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
