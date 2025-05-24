const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Week 05",
        description: "Week 05 API"
    },
    host: "localhost:5050", // Change this later
    schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc)