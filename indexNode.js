const http = require("http");

const server = http.createServer((req, res) => {
  //   const unpacked = {
  //     url: req.url,
  //     method: req.method,
  //     headers: req.headers,
  //   };
  //   console.log(unpacked);
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("Hello World");
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the unicorns house");
  } else if (req.url === "/unicorns") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Our unicorns are fresh and healthy and fed organic code");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404! These are not the unicorns you are looking for");
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
