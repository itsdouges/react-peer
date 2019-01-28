# react-peer

[![NPM version](http://img.shields.io/npm/v/react-peer.svg?style=flat-square)](https://www.npmjs.com/package/react-peer)
[![NPM downloads](http://img.shields.io/npm/dm/react-peer.svg?style=flat-square)](https://www.npmjs.com/package/react-peer)
[![Build Status](http://img.shields.io/travis/madou/react-peer/master.svg?style=flat-square)](https://travis-ci.org/madou/react-peer)

Send state to peers as easy as a setState() 🎣👪.

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

### useRecievePeerState<TState>(peerBrokerId: string, opts?: { brokerId?: string }): [TState | undefined, boolean];

Will recieve peer state **eventually** from a peer identified using `peerBrokerId`.

`opts.brokerId` is optionally used when you already have a broker id generated.

```js
import { useRecievePeerState } from 'react-peer';

const App = () => {
  const [state, isConnected] = useRecievePeerState('swjg3ls4bq000000');
};
```
