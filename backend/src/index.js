import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
});

app.get("/", (req, res) => {
  res.send("API is running...");
});