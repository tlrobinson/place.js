const app = require("express")();
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const Canvas = require("canvas");

const canvas = new Canvas(1000, 1000);
const ctx = canvas.getContext("2d");

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/draw", (req, res) => {
    ctx.fillStyle = req.body.color;
    ctx.fillRect(req.body.x, req.body.y, 10, 10);
    io.emit("pixel", req.body);
    res.end();
});
app.get("/board.png", (req, res) => {
    res.set("Content-Type", "image/png");
    canvas.pngStream().pipe(res);
});

server.listen(process.env["PORT"] || 3000);
