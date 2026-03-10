const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {

    const code = req.body.code;

    fs.writeFileSync("Main.java", code);

    exec("javac Main.java && java Main", (error, stdout, stderr) => {

        if (error) {
            return res.json({
                output: stderr
            });
        }

        res.json({
            output: stdout
        });

    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});