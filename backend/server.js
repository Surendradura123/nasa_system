const app = require("./src/app");
const config = require("./src/config/config");

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

// Log server startup
console.log("Server starting...");