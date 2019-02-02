import * as React from 'react';
import { PeerStateProvider, ReceivePeerState } from '../src';

const App = () => {
  const [peerBrokerId, setPeerBrokerId] = React.useState('');
  const [state, setState] = React.useState('hello');

  const connectToPeer = (e: any) => {
    e.preventDefault();
    const brokerId = (document.getElementById('key') as HTMLInputElement).value;
    setPeerBrokerId(brokerId);
  };

  const sendDataToPeer = (e: any) => {
    e.preventDefault();
    const data = (document.getElementById('data') as HTMLInputElement).value;
    setState(data);
  };

  return (
    <div className="App">
      <PeerStateProvider value={state}>
        {({ brokerId, connections, error: stateErr }) => (
          <>
            <strong>PeerStateProvider</strong> <br />
            broker id: {brokerId} <br />
            local state: {JSON.stringify(state)} <br />
            connected peers: {JSON.stringify(connections.length)}
            <br />
            err: {JSON.stringify(stateErr)}
            <form onSubmit={sendDataToPeer}>
              <input id="data" />
              <button>send data</button>
            </form>
            <br />
            <strong>ReceivePeerState</strong> <br />
            <ReceivePeerState peerBrokerId={peerBrokerId}>
              {({ data, isConnected, error: recErr }) => (
                <>
                  connected: {JSON.stringify(isConnected)} <br />
                  received state: {JSON.stringify(data)} <br />
                  err: {JSON.stringify(recErr)}
                  <form onSubmit={connectToPeer}>
                    <input id="key" />
                    <button>connect</button>
                  </form>
                </>
              )}
            </ReceivePeerState>
          </>
        )}
      </PeerStateProvider>
    </div>
  );
};

export default App;
