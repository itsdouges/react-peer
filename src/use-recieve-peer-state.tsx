import { useLayoutEffect, useState } from 'react';
import Peer from 'peerjs';

const useRecievePeerState = <TData extends {}>(
  peerBrokerId: string,
  opts: { brokerId: string } = { brokerId: '' }
): [TData | undefined, boolean] => {
  const [state, setState] = useState<TData | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [brokerId, setBrokerId] = useState(opts.brokerId);

  useLayoutEffect(
    () => {
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
          connection.on('data', (recievedData: TData) => {
            // We want isConnected and data to be set at the same time.
            setState(recievedData);
            setIsConnected(true);
          });
        });

        connection.on('close', () => {
          setIsConnected(false);
        });
      });

      return () => {
        setIsConnected(false);
        peer && peer.destroy();
      };
    },
    [peerBrokerId, opts.brokerId]
  );

  return [state, isConnected];
};

export default useRecievePeerState;
