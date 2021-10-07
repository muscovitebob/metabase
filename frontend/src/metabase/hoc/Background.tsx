/* eslint-disable react/prop-types */
import React, { Component } from "react";

export const withBackground = (className: string) => <T extends unknown>(ComposedComponent: React.ComponentType<T>) => {
  return class extends Component<T> {
    static displayName = "BackgroundApplicator";

    UNSAFE_componentWillMount() {
      document.body.classList.add(className);
    }

    componentWillUnmount() {
      document.body.classList.remove(className);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};

type Props<T> = T & {
  bgClassName: string;
}

import { connect } from "react-redux";
import { PLUGIN_SELECTORS } from "metabase/plugins";

export const withLogoBackground = <T extends unknown>(ComposedComponent: React.ComponentType<T>)  => {
  const mapStateToProps = (state, props) => ({
    bgClassName: PLUGIN_SELECTORS.getLogoBackgroundClass(state, props),
  });
  return connect(mapStateToProps)(
    class extends Component<Props<T>> {
      static displayName = "BackgroundApplicator";

      UNSAFE_componentWillMount() {
        document.body.classList.add(this.props.bgClassName);
      }

      componentWillUnmount() {
        document.body.classList.remove(this.props.bgClassName);
      }

      render() {
        // eslint-disable-next-line no-unused-vars
        const { bgClassName, ...props } = this.props;
        return <ComposedComponent {...props} />;
      }
    },
  );
};