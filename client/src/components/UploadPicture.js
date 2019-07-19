import * as React from 'react';

export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  componentDidMount() {

  }

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }

  onClickHandler = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button type="button" className="btn btn-success btn-block" onClick={() => this.onClickHandler()}>Upload</button>
      </div>
    );
  }
}
