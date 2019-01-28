"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var peerjs_1 = require("peerjs");
var usePeerState = function (initialState, opts) {
    if (opts === void 0) { opts = { brokerId: '' }; }
    var _a = react_1.useState([]), connections = _a[0], setConnections = _a[1];
    var _b = react_1.useState(initialState), state = _b[0], setState = _b[1];
    var _c = react_1.useState(undefined), peer = _c[0], setPeer = _c[1];
    var _d = react_1.useState(opts.brokerId), brokerId = _d[0], setBrokerId = _d[1];
    react_1.useLayoutEffect(function () {
        var localPeer = new peerjs_1.default(opts.brokerId);
        setPeer(localPeer);
        localPeer.on('open', function () {
            if (brokerId !== localPeer.id) {
                setBrokerId(localPeer.id);
            }
        });
        localPeer.on('connection', function (conn) {
            setConnections([conn].concat(connections));
            // We want to immediately send the newly connected peer the current data.
            conn.on('open', function () {
                conn.send(state);
            });
        });
        return function () {
            peer && peer.destroy();
        };
    }, [opts.brokerId]);
    return [
        state,
        function (newState) {
            setState(newState);
            connections.forEach(function (conn) { return conn.send(newState); });
        },
        brokerId,
        connections,
    ];
};
exports.default = usePeerState;
