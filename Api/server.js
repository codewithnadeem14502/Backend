import { app } from "./app.js";
import { connetDB } from "./data/database.js";

connetDB();

// console.log(process.env.PORT);

app.listen(5000, () => {
  console.log("server is working");
});
