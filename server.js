const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve HTML file
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading page");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/append-files") {
    // Handle form submission
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { file1, file2 } = querystring.parse(body);

      const filePath1 = path.join(__dirname, file1);
      const filePath2 = path.join(__dirname, file2);

      // Check if first file exists
      if (!fs.existsSync(filePath1)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end(`Error: File "${file1}" does not exist.`);
      }

      // Read content from file1 and append to file2
      fs.readFile(filePath1, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end(`Error reading "${file1}": ${err.message}`);
        }

        fs.appendFile(filePath2, data, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end(`Error writing to "${file2}": ${err.message}`);
          }

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(
            `Successfully appended contents of "${file1}" to "${file2}".`
          );
        });
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
