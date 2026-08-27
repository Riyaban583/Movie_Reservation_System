import app from "./app";
import "./config/env";
import "./lib/queue";
import "./workers/email.worker";

import { createServer } from "http";
import { initSocket } from "./lib/socket";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});