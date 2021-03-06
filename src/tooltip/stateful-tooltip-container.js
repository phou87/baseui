/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StatefulContainer as StatefulPopoverContainer} from '../popover/index';
import baseDefaultProps from './default-props';
import type {StatefulTooltipContainerPropsT} from './types';

class StatefulContainer extends React.Component<
  StatefulTooltipContainerPropsT,
> {
  static defaultProps: $Shape<StatefulTooltipContainerPropsT> = {
    ...baseDefaultProps,
  };

  render() {
    return <StatefulPopoverContainer {...this.props} />;
  }
}

export default StatefulContainer;
