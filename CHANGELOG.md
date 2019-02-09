# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [0.2.6][] - 2019-02-10

### Changed

- Updated README
- Set peer dep of `react` and `react-dom` to `>=16.3.0`

## [0.2.5][] - 2019-02-10

### Changed

- Loosened `react` and `react-dom` peer dependency - now if you want to use the custom hooks make sure to have `^16.8.0`, else anything from `^16.3.0` is fine for the component usage

## [0.2.4][] - 2019-02-02

### Added

- Errors are now exposed in the components and hooks

## [0.2.3][] - 2019-02-02

### Changed

- Use `useEffect` over `useLayoutEffect` for deferred performance reasons

## [0.2.2][] - 2019-02-02

### Fixed

- `usePeerState()` now correctly sends the current state instead of initial state when a new peer connects

## [0.2.1][] - 2019-01-29

### Added

- `PeerStateProvider` and `ReceivePeerState` components to be used when react hooks aren't available for the consumer

## [0.2.0][] - 2019-01-28

### Changed

- BREAKING CHANGE: Renamed `useRecievePeerState` to `useReceivePeerState`, and all mentions of it across the codebase

## [0.1.3][] - 2019-01-28

### Added

- `sideEffects: true` to packagejson to enable code splitting
- Put `peerjs` behind a dynamic import to enable codesplitting in modern es-module environments

## [0.1.2][] - 2019-01-28

### Changed

- Increased size limit by 0.01KB
- Ignore dist folder from repo

## [0.1.1][] - 2019-01-28

### Fixed

- `usePeerState()` not being able to store more than the latest peer connection

## [0.1.0][] - 2019-01-28

- initial release

<!-- prettier-ignore -->
[Unreleased]: https://github.com/madou/react-peer/compare/v0.2.6...HEAD
[0.2.6]: https://github.com/madou/react-peer/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/madou/react-peer/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/madou/react-peer/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/madou/react-peer/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/madou/react-peer/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/madou/react-peer/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/madou/react-peer/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/madou/react-peer/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/madou/react-peer/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/madou/react-peer/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/madou/react-peer/tree/v0.1.0
