import { ExpressFromBehind } from "./src/ExpressFromBehind/ExpressFromBehind";

function controler0(req: any, res: any) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello");
  }
}

function controler1(req: any, res: any) {
  if (req.url === "/goodbye") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("goodbye");
  }
}

const newServer = ExpressFromBehind.getInstance();
newServer.addMiddleware(function middleware1(req, res) {
    console.log(req);
    
    console.log("error");
});

newServer.addMiddleware(function middleware2(req, res) {
  console.log("middleware2");
});

newServer.addMiddleware(function middleware3(req, res) {
  console.log("middleware3");
});
newServer.createServer();

newServer.addController(controler0);
newServer.addController(controler1);
newServer.listen(3000, () => {
  console.log(`server started on port: ${3000}`);
});
