import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HooksApp from './hooks';
import ComponentsApp from './components';

storiesOf('react-peer', module)
  .add('hooks', () => <HooksApp />)
  .add('components', () => <ComponentsApp />);
