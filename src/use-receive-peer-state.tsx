import { useLayoutEffect, useState } from 'react';
import Peer from 'peerjs';

const useReceivePeerState = <TData extends {}>(
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

      import('peerjs').then(({ default: Peer }) => {
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);

        localPeer.on('open', () => {
          if (brokerId !== localPeer.id) {
            setBrokerId(localPeer.id);
          }

          const connection = localPeer.connect(peerBrokerId);

          connection.on('open', () => {
            connection.on('data', (receivedData: TData) => {
              // We want isConnected and data to be set at the same time.
              setState(receivedData);
              setIsConnected(true);
            });
          });

          connection.on('close', () => {
            setIsConnected(false);
          });
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

export default useReceivePeerState;
