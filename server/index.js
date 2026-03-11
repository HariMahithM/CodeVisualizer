const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const parseTrace = require("./traceParser");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req,res)=>{

    const code = req.body.code;

    const instrumented = instrumentCode(code);

    fs.writeFileSync("Main.java", instrumented);

    exec("javac Main.java && java Main",(err,stdout,stderr)=>{

        const steps = parseTrace(stdout);

        res.json({
            output: stdout,
            steps: steps
        });

    });

});

function instrumentCode(code){

    return code.replace(
        /int\s+(\w+)\s*=\s*([^;]+);/g,
        `int $1 = $2;\nSystem.out.println("TRACE:$1=" + $1);`
    );

}

app.listen(5000,()=>{
    console.log("server running");
});