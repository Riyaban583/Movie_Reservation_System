import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

socket.on("connect", () => {
  console.log("🔌 Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔌 Socket disconnected");
});

export default socket;