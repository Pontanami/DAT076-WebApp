import {io} from './start'

export function socketListener(){
    io.engine.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
      });

    io.on('connection', (socket) => {

        socket.on("join_room", (gamePin) => {
            console.log("Trying to join game: " + gamePin)
            socket.join(gamePin);
        });
        
        socket.on("alert_joined", (gamePin) => {
            console.log("Alert join game: " + gamePin)
            socket.to(gamePin).emit('user_joined')
        })
    
        socket.on("start_game", (data) =>{
            console.log(`Notify fetchRound for: ${data.gamePin} and gameId: ${data.gameId}`)
            socket.to(data.gamePin).emit("starting", data.gameId)
            //socket.emit("new_round", data)
        })
    
        socket.on("new_round", (data) =>{
            console.log(`Notify fetchRound for: ${data.gamePin} and gameId: ${data.gameId}`)
            socket.to(data.gamePin).emit("new_round_started", data.gameId);
        })
    
        socket.on("end_game", (gamePin) =>{
            console.log(`Notify endGame for: ${gamePin}`)
            socket.to(gamePin).emit("game_over");
        })
    });
}  
