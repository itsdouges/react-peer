# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

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
[Unreleased]: https://github.com/madou/react-peer/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/madou/react-peer/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/madou/react-peer/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/madou/react-peer/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/madou/react-peer/tree/v0.1.0
