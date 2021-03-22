import express from "express";
import { register } from "./routes";
import db from "./models";
const port = process.env.PORT || 8000;

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

db.sequelize.sync();

// registers routes
register(app);

// if nothing matches return html text
// must be registered after other routes
app.get("/*", (req, res) => {
  res.send(
    "<html><title>Exercise Two</title><body>Exercise two is running</body></html>"
  );
});

app.listen(port, () => {
  console.log(
    "Apollon Standalone Server listening at http://localhost:%s",
    port
  );
});
