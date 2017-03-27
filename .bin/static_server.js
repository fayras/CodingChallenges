const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const PORT = 8000;
const rootPath = process.argv[2] || process.cwd();

http.createServer(function(request, response) {

  let uri = url.parse(request.url).pathname;
  let filename = path.join(rootPath, uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(PORT);

console.log(`Static file server running at http://localhost:${PORT}/`);
