require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const Moralis = require("./config/moralis");
const app = express();
const port = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/tokens", require("./routes/tokens"));
app.use("/tokenPrice", require("./routes/tokenPrice"));
app.use("/allowance", require("./routes/allowance"));
app.use("/transaction", require("./routes/transaction"));
app.use("/swap", require("./routes/swap"));

Moralis.then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
