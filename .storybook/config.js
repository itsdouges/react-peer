import { configure } from '@storybook/react';

const req = require.context('../test', true, /.*story\.tsx$/);

configure(() => req.keys().forEach(req), module);
