import http from "http";
import { IncomingMessage, ServerResponse } from "http";

export class ExpressFromBehind {
  private static instance: ExpressFromBehind;
  private middlewares: {
    (req: IncomingMessage, res: ServerResponse): void;
  }[] = [];
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  private consructor() {}

  public static getInstance(): ExpressFromBehind {
    if (!ExpressFromBehind.instance) {
      ExpressFromBehind.instance = new ExpressFromBehind();
    }
    return ExpressFromBehind.instance;
  }

  private run(req: IncomingMessage, res: ServerResponse) {
    this.middlewares.forEach((middleware) => {
      middleware(req, res);
    });
  }

  public createServer() {
    this.server = http.createServer((req, res) => {
      this.run(req, res);
    });
  }

  public addController(
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.server.on("request", callback);
  }

  public addMiddleware(
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.middlewares.push(callback);
  }

  public listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }
}
