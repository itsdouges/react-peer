import * as React from 'react';
import { usePeerState, useReceivePeerState } from '../src';

const App = () => {
  const [peerBrokerId, setPeerBrokerId] = React.useState('');
  const [state, setState, brokerId, connections] = usePeerState('hello');
  const [peerState, isConnected] = useReceivePeerState(peerBrokerId);

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
      <strong>usePeerState()</strong> <br />
      broker id: {brokerId} <br />
      local state: {JSON.stringify(state)} <br />
      connected peers: {JSON.stringify(connections.length)}
      <form onSubmit={sendDataToPeer}>
        <input id="data" />
        <button>send data</button>
      </form>
      <br />
      <strong>useReceivePeerState()</strong> <br />
      connected: {JSON.stringify(isConnected)} <br />
      received state: {JSON.stringify(peerState)} <br />
      <form onSubmit={connectToPeer}>
        <input id="key" />
        <button>connect</button>
      </form>
    </div>
  );
};

export default App;
