import { Server } from "socket.io";
import express from "express";
import http from 'http';
import cors from 'cors'
export const app = express();
//parses incoming json requests
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors({
  origin : ["http://localhost:5173", "https://chimlen.vercel.app", "https://chimlen.onrender.com"],
  credentials : true
}));

export const server = http.createServer(app);

export const io = new Server(server, {
    cors : {
      origin : ["http://localhost:5173", "https://chimlen.vercel.app", "https://chimlen.onrender.com"],
      credentials : true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected : ', socket.id);

    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)
    })
});


