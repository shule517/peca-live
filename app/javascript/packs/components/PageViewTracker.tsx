import React, { Component } from 'react';
import {Route, withRouter} from "react-router-dom";
import ReactGA from "react-ga";

class PageViewTracker extends Component {
  componentWillMount() {
    ReactGA.initialize('UA-46281082-3');
  }

  componentDidUpdate() {
    this.track();
  }

  track() {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return <Route children={this.props.children}/>
  }
}

export default withRouter(PageViewTracker);
