import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { appLoadingStart, appLoadingEnd } from "../actions/app";
import GarbageDisposalMap from "../components/GarbageDisposalMap/GarbageDisposalMap";

class App extends Component {
  componentDidMount() {
    this.props.appLoadingEnd();
  }

  render() {
    const { loading, fetching, error } = this.props;
    console.log('sddjgh')

    return (
      <div className="component-app">
        {loading ? "Loading" : "Loaded"}
        <GarbageDisposalMap />
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
  fetching: app.fetching,
  error: app.error
});

export default connect(
  null,
  { appLoadingStart, appLoadingEnd }
)(App);
