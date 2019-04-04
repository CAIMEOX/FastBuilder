import { WSServer } from "mcpews";
import Session from "./src/session";

const server = new WSServer(11451);
console.log("Server started on port 11451");
server.on("client", ({ session }) => {
  Session.create(session);
});
