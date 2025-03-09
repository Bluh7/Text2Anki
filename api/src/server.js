import app from "./app.js";
import config from "./config/config.js";

const { PORT } = config;

const appServer = app
  .listen(PORT, err => {
    if (err) console.log(err);

    const currentPort = appServer.address().port;

    console.log(`http://localhost:${currentPort}`);
  })
  .on("error", err => {
    if (err.code === "EADDRINUSE") {
      const portBeingUsed = err.port;
      const newPort = portBeingUsed + 1;

      console.log(`Port ${portBeingUsed} is busy, trying with port ${newPort}`);
      console.log(newPort);
      appServer.listen(newPort);
    } else {
      console.log(err);
      process.exit(1);
    }
  });
