import Peer from 'peerjs';
let peer: Peer | null = null
export const usePeer = () => {
    if (peer === null) {
        peer = new Peer({
            host: useRuntimeConfig().public.SERVER_HOST,
            port: +useRuntimeConfig().public.PEER_SERVER_PORT,
            path: '/peerjs'
        })
        peer.on('open', (id) => {
            console.log("peer_id:" + id);
        })
        peer.on('error', (error) => {
            console.log("Peer连接出错：", error);
        })
    }
    return {
        peer,
    }
}