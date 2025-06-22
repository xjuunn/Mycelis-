import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';

export function startPeerServer(port = 9000) {
    const app = express();
    const httpServer = createServer(app);

    const peerServer = ExpressPeerServer(httpServer, {
        path: '/',
    });

    app.use('/peerjs', peerServer);

    httpServer.listen(port, () => {
        console.log(`🫎  Peer 服务已在 ${port} 端口监听`);
    });

}