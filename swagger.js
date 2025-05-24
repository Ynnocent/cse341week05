const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Week 05",
        description: "Week 05 API"
    },
    host: "https://cse341week05.onrender.com", // Change this later
    schemes: ["http","https"]
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc)