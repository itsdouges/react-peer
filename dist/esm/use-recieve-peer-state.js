import { useLayoutEffect, useState } from 'react';
import Peer from 'peerjs';
const useRecievePeerState = (peerBrokerId, opts = { brokerId: '' }) => {
    const [state, setState] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);
    const [peer, setPeer] = useState(undefined);
    const [brokerId, setBrokerId] = useState(opts.brokerId);
    useLayoutEffect(() => {
        if (!peerBrokerId) {
            return;
        }
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);
        localPeer.on('open', () => {
            if (brokerId !== localPeer.id) {
                setBrokerId(localPeer.id);
            }
            const connection = localPeer.connect(peerBrokerId);
            connection.on('open', () => {
                setIsConnected(true);
                connection.on('data', (recievedData) => setState(recievedData));
            });
            connection.on('close', () => {
                setIsConnected(false);
            });
        });
        return () => {
            setIsConnected(false);
            peer && peer.destroy();
        };
    }, [peerBrokerId, opts.brokerId]);
    return [state, isConnected];
};
export default useRecievePeerState;
