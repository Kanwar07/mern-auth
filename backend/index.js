import dotenv from "dotenv";
import { connectdb } from "./src/db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection failed!! Error: ", err);
  });
