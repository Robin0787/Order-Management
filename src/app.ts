import cors from "cors";
import express, { Application, Request, Response } from "express";
import { router } from "./app/modules/user/user.route";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

app.use("/api/users", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome Here!",
  });
});

export default app;
