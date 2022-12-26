import express from "express";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('src/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// --> Add middleware --> https://aaryanadil.com/pass-socket-io-to-express-routes-in-files/ 
app.use((req, res, next) => { 
    req.io = io;
    next();
});

//----------------------- 
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//----------------------- 
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
server.on("error", (err) => console.log(err));

//----------------------- 
const io = new Server(server)

io.on('connection', (socket) => {
    //console.log(`Nueva conexión desde el id: ${socket.id}`);
    console.log(`New connection`);

    socket.on('disconnect', (socket) => {
        console.log(`Close connection`);
    })
})

