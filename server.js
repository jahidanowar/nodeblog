const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

app.listen(process.env.APP_PORT, () => {
  console.log(`App is running on port ${process.env.APP_PORT}`);
});
