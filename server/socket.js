import { Server } from "socket.io";
import express from "express";
import http from 'http';
import cookieParser from "cookie-parser";
import cookie from 'cookie'
import jwt from 'jsonwebtoken';
import User from "./modal/userModal.js";
import { log } from "console";
export const app = express();

app.use(cookieParser());
//parses incoming json requests
app.use(express.json())
app.use(express.urlencoded({extended : true}))



export const server = http.createServer(app);

export const io = new Server(server, {
    cors : {
      origin : ["http://localhost:5173", "https://chimlen.vercel.app", "https://chimlen.onrender.com"],
      credentials : true
    }
});

//to store the online users {userId : socket._id}
const onlineUsers = {}


io.on('connection', async (socket) => {
    console.log('a user connected : ', socket.id);
    const rawCookies = socket.handshake.headers.cookie;
    // to get the actual cookies from socket we have to parse it , why parse it if i have cookieParser package because cookieParser only works for http (normal REST endpoints),
    // socket.io handshake does not go through express Middleware(like cookieParser()), so the cookiees arent automatically parsed
    console.log('cookie of connected user : ',rawCookies)
    if(!rawCookies){
        return socket.disconnect(true)
    };

    // parsing cookeies normally
    const parsedCookies = cookie.parse(rawCookies);
    const token = parsedCookies.token;
    log('token from cookies : ', token)

   const decoded =  jwt.verify(token, process.env.JWT_SECRET);
   log('user token decoded : ', decoded)
   const user = await User.findOne({_id : decoded.id});
   log('user who connected socket : ' ,user)
    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)
    })
});


