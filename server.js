const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "./misc/.env" });

const app = express();

// Body Parsers
app.set("view engine", "ejs");
app.use(express.json());
// app.use(cors());

// const whitelist = ["https://link-glance.netlify.app", "http://localhost:3000"];
// const whitelist = ["https://link-glance.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("ORIGIN: ", origin);
    callback(null, true);
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error("Not allowed by CORS"));
    // }
  },
};
app.use(cors(corsOptions));

// routers
app.use("/auth", require("./routes/auth"));
// app.use("/urls", require("./routes/urls/urls"));
app.use("/bills", require("./routes/bills"));
app.use("/user_groups", require("./routes/user-groups"));
app.use("/", require("./routes/"));

app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
});
