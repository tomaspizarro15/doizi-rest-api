let socketConnection;

module.exports = {
    init: (httpServer) => {
        socketConnection = require('socket.io')(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
        return socketConnection;
    },
    get: () => {
        if (socketConnection) {
            return socketConnection;
        }
    }
}