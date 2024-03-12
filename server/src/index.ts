import {server} from "./start";

const PORT : number =  8080;

server.listen(PORT, () => {
    console.log("Listening to port " + PORT);
});