import { app } from "./app.js";
import { connetDB } from "./data/database.js";

connetDB();

app.listen(5000, () => {
  console.log(
    `server is working ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`
  );
});
