import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {themes} from '@storybook/components';
import {withOptions, setOptions} from '@storybook/addon-options';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../src/styles';
import {LightTheme} from '../src/themes';
import {withInfo} from '@storybook/addon-info';
import {checkA11y} from '@storybook/addon-a11y';
import {withKnobs} from '@storybook/addon-knobs';

withOptions({
  name: 'baseui',
  url: 'https://github.com/uber-web/baseui',
});

setOptions({
  theme: {
    ...themes.normal,
    highlightColor: LightTheme.colors.primary,
    successColor: LightTheme.colors.positive,
    warningColor: LightTheme.colors.warning,
    failColor: LightTheme.colors.negative,
  },
});

const engine = new Styletron();

// automatically import all files ending in *.stories.js
const req = require.context(
  '../src',
  true,
  /^((?!template-component\/).)*.stories.js$/,
);
function loadStories() {
  require('../docs/pages/pages.js');
  req.keys().forEach(filename => req(filename));
}

// this should be first decorator to avoid extra code to be parsed here
addDecorator(withInfo);

addDecorator(withKnobs);
addDecorator(checkA11y);

// Add providers for theme and styletron
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
});

configure(loadStories, module);
