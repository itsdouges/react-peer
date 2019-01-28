import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TestApp from './index';

storiesOf('react-peer', module).add('Default', () => <TestApp />);
