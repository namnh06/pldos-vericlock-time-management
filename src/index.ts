import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { findRecordIdToUpdateClockOut } from "./services/airtable";

const environment: string = process.env.NODE_ENV || "development";
dotenv.config({ path: `./.env.${environment}` });

const port: string | number = process.env.PORT || 3000;
const url: string = process.env.URL || "localhost";

const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(`Webhook Received: ${JSON.stringify(body)}`);

  try {
    if (body.end) {
      const recordId = await findRecordIdToUpdateClockOut(
        body.Root,
        body.EmployeeId,
        body.Start
      );
    }
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Webhook receiver listening at http://${url}:${port}`);
});
