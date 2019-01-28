# react-peer

[![Build Status](https://travis-ci.org/madou/react-peer.svg?branch=master)](https://travis-ci.org/madou/react-peer)
[![npm](https://img.shields.io/npm/v/react-peer.svg)](https://www.npmjs.com/package/react-peer)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-peer.svg)](https://bundlephobia.com/result?p=react-peer)
[![Dev Dependencies](https://david-dm.org/madou/react-peer/status.svg)](https://david-dm.org/madou/react-peer)
[![Dev Dependencies](https://david-dm.org/madou/react-peer/peer-status.svg)](https://david-dm.org/madou/react-peer?type=peer)
[![Dev Dependencies](https://david-dm.org/madou/react-peer/dev-status.svg)](https://david-dm.org/madou/react-peer?type=dev)

Send state to peers as easy as a setState() ⚛🍐

Uses [peerjs](https://peerjs.com/) under the hood,
requires a version of react/react-dom which contain hooks - at the moment this is `16.8.0-alpha.1`.

## Installation

```bash
npm install react-peer
```

```bash
yarn add react-peer
```

## Usage

### usePeerState<TState>(initialState?: TState, opts?: { brokerId?: string }): [TState, Function, string, Peer.DataConnection[]];

Behaves as your regular `useState` hook,
but will **eventually** send data to any connected peers.
Peers can connect to you using the `brokerId` that is **eventually** returned.

`opts.brokerId` is optionally used when you already have a broker id generated.

```js
import { usePeerState } from 'react-peer';

const App = () => {
  const [state, setState, brokerId, connections] = usePeerState();

  setState({ message: 'hello' });
};
```

### useReceivePeerState<TState>(peerBrokerId: string, opts?: { brokerId?: string }): [TState | undefined, boolean];

Will receive peer state **eventually** from a peer identified using `peerBrokerId`.

`opts.brokerId` is optionally used when you already have a broker id generated.

```js
import { useReceivePeerState } from 'react-peer';

const App = () => {
  const [state, isConnected] = useReceivePeerState('swjg3ls4bq000000');
};
```
