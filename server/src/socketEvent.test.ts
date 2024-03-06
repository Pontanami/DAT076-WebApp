import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { app, io, server } from "./start";

describe("the server with WebSockets", () => {
    let clientSocket: ClientSocket;

    beforeAll((done) => {
        server.listen(8080, () => {
            console.log("Listening to port 8080");
            clientSocket = ioc("http://localhost:8080");
            clientSocket.on("connect", done);
        });
    })

    afterAll(() => {
        server.close();
        io.close();
        clientSocket.disconnect();
      });
    /*
    test("When client sends a join room message, the room is joined", (done) => {
        console.log("Starting test");
        clientSocket.emit("join_room", 1234);
        clientSocket.on('user_joined', () => {
            console.log("Received user_joined");
            done();
        })
        clientSocket.emit("alert_joined", 1234);
        setTimeout(() => {
            console.log("Failing");
            fail();
        }, 1000);
    })
})
/* function waitFor(socket: ServerSocket | ClientSocket, event: string) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe("my awesome project", () => {
  let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  let serverSocket: ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | ClientSocket<DefaultEventsMap, DefaultEventsMap>
  let clientSocket: ClientSocket<DefaultEventsMap, DefaultEventsMap>;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = ioc(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });
  /*
  test("emit_start_game_should", (done) => {
    clientSocket.on("join_room", (roomId) => {
      expect(roomId).toBe(1234);
      done();
    });
    serverSocket.emit("join_room", 1234);
  });
    
  test("should work with an acknowledgement", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });

  test("should work with emitWithAck()", async () => {
    serverSocket.on("foo", (cb) => {
      cb("bar");
    });
    const result = await clientSocket.emitWithAck("foo");
    expect(result).toBe("bar");
  });

  test("should work with waitFor()", () => {
    clientSocket.emit("join_room", 1234);

    serverSocket.on("join_room", (roomNr) => {
        expect(roomNr).toBe("hola");
    })


    waitFor(serverSocket, "baz");

    return 
  }); */
});