import {io} from './start'

export function socketListener(){
    io.engine.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
      });

    io.on('connection', (socket) => {

        socket.on("join_room", (gameId) => {
            console.log("Trying to join game: " + gameId)
            socket.join(gameId);
        });
        
        socket.on("alert_joined", (gameId) => {
            console.log("Alert join game: " + gameId)
            socket.to(gameId).emit('user_joined')
        })
    
        socket.on("start_game", (gameId) =>{
            console.log(`Notify fetchRound for: ${gameId}`)
            socket.to(gameId).emit("starting", gameId)
            //socket.emit("new_round", data)
        })
    
        socket.on("new_round", (gameId) =>{
            console.log(`Notify fetchRound for: ${gameId}`)
            socket.to(gameId).emit("new_round_started", gameId);
        })
    
        socket.on("end_game", (gameId) =>{
            console.log(`Notify endGame for: ${gameId}`)
            socket.to(gameId).emit("game_over");
        })

        socket.on("correct_answer", (data) =>{
            console.log(`Correct answer for: ${data.userId}`)
            socket.to(data.gameId).emit("correct_answer", data.userId);
        });
    });
}  
