const healthRoute = ({ app, client }) => {
  //GET request
  app.get("/velib", async (req, res) => {
    const userSession = await client.keys("*");
    const allDatas = await Promise.all(
      Object.entries(userSession).map(async (data) => {
        return client.hGetAll(data[1]);
      })
    );

    res.send(allDatas);
  });

  //POST request
  app.post("/create", async ({ body: { stationName, city } }, res) => {
    try {
      const id = Math.floor(Math.random() * 90000) + 10000;

      await client.hSet("velib:" + id, {
        idStation: "velib:" + id,
        stationName: stationName,
        stationOpen: "default",
        stationQuantity: "default",
        numberBornetteFree: "default",
        totalBikeFree: "default",
        mecanicBikeFree: "default",
        eletricBikeFree: "default",
        terminalPaiement: "default",
        returnVelib: "default",
        dataRefresh: "default",
        city: city,
      });

      return res.send("velib:" + id);
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });

  app.post("/edit", async ({ body: { id, stationName, city } }, res) => {
    try {
      const dataExist = await client.hGetAll("velib:" + id);

      if (dataExist) {
        await client.del("velib:" + id, function (err, response) {
          if (response == 1) {
            console.log("Deleted Successfully!");
          } else {
            console.log("Cannot delete");
          }
        });

        await client.hSet("velib:" + id, {
          idStation: Object.entries(dataExist)[0].slice(1).toString(),
          stationName: stationName ?? "",
          stationOpen: Object.entries(dataExist)[2].slice(1).toString(),
          stationQuantity: Object.entries(dataExist)[3].slice(1).toString(),
          numberBornetteFree: Object.entries(dataExist)[4].slice(1).toString(),
          totalBikeFree: Object.entries(dataExist)[5].slice(1).toString(),
          mecanicBikeFree: Object.entries(dataExist)[6].slice(1).toString(),
          eletricBikeFree: Object.entries(dataExist)[7].slice(1).toString(),
          terminalPaiement: Object.entries(dataExist)[8].slice(1).toString(),
          returnVelib: Object.entries(dataExist)[9].slice(1).toString(),
          dataRefresh: Object.entries(dataExist)[10].slice(1).toString(),
          city: city ?? "",
        });
      } else {
        res.status(403).send({ error: "Item not found" });
      }

      return res.send(dataExist);
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });

  app.post("/delete", async ({ body: { id } }, res) => {
    try {
      await client.del("velib:" + id, function (err, response) {
        if (response == 1) {
          console.log("Deleted Successfully!");
        } else {
          console.log("Cannot delete");
        }
      });

      return res.send("velib:" + id + " deleted !");
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });
};

export default healthRoute;
