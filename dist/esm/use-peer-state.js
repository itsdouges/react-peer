import { useLayoutEffect, useState } from 'react';
import Peer from 'peerjs';
const usePeerState = (initialState, opts = { brokerId: '' }) => {
    const [connections, setConnections] = useState([]);
    const [state, setState] = useState(initialState);
    const [peer, setPeer] = useState(undefined);
    const [brokerId, setBrokerId] = useState(opts.brokerId);
    useLayoutEffect(() => {
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);
        localPeer.on('open', () => {
            if (brokerId !== localPeer.id) {
                setBrokerId(localPeer.id);
            }
        });
        localPeer.on('connection', conn => {
            setConnections([conn, ...connections]);
            // We want to immediately send the newly connected peer the current data.
            conn.on('open', () => {
                conn.send(state);
            });
        });
        return () => {
            peer && peer.destroy();
        };
    }, [opts.brokerId]);
    return [
        state,
        (newState) => {
            setState(newState);
            connections.forEach(conn => conn.send(newState));
        },
        brokerId,
        connections,
    ];
};
export default usePeerState;
