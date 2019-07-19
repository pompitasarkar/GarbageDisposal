import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { appLoadingStart, appLoadingEnd } from '../actions/app';
import GarbageDisposalMap from './GarbageDisposalMap/GarbageDisposalMap';
import UploadPicture from './UploadPicture';

class App extends Component {
  componentDidMount() {
    this.props.appLoadingEnd();
  }

  render() {
    const { loading, fetching, error } = this.props;

    return (
      <div className="component-app">
        {loading ? 'Loading' : 'Loaded'}
        <GarbageDisposalMap />
        <UploadPicture />
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
  fetching: app.fetching,
  error: app.error,
});

export default connect(
  null,
  { appLoadingStart, appLoadingEnd },
)(App);
