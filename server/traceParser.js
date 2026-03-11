function parseTrace(output) {

    const lines = output.split("\n");

    let steps = [];
    let variables = {};

    lines.forEach(line => {

        if(line.startsWith("TRACE:")) {

            const data = line.replace("TRACE:", "");
            const [name,value] = data.split("=");

            variables[name] = value;

            steps.push({
                ...variables
            });

        }

    });

    return steps;
}

module.exports = parseTrace;