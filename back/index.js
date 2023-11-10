import { createClient } from "redis";
import fs from "fs";
import csv from "csv-parser";
import express from "express";
import allRoutes from "./src/routes/allRoutes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const port = 3000;

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

let data = await client.hGetAll("velib:16107");

if (Object.entries(data).length === 0) {
  fs.createReadStream("velib.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", async (row) => {
      await client.hSet("velib:" + Object.entries(row)[0].slice(1).toString(), {
        idStation: Object.entries(row)[0].slice(1).toString(),
        stationName: Object.entries(row)[1].slice(1).toString(),
        stationOpen: Object.entries(row)[2].slice(1).toString(),
        stationQuantity: Object.entries(row)[3].slice(1).toString(),
        numberBornetteFree: Object.entries(row)[4].slice(1).toString(),
        totalBikeFree: Object.entries(row)[5].slice(1).toString(),
        mecanicBikeFree: Object.entries(row)[6].slice(1).toString(),
        eletricBikeFree: Object.entries(row)[7].slice(1).toString(),
        terminalPaiement: Object.entries(row)[8].slice(1).toString(),
        returnVelib: Object.entries(row)[9].slice(1).toString(),
        dataRefresh: Object.entries(row)[10].slice(1).toString(),
        city: Object.entries(row)[11].slice(1).toString(),
      });
    })
    .on("end", () => {
      console.log("Import CSV OK :)");
      client.quit();
    });
}

allRoutes({ app, client });

app.listen(port, () => {
  console.log("App listening on port : " + port + " at " + new Date());
});
