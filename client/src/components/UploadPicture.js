import * as React from 'react';
import $ from 'jquery';

export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      lat: null,
      lng: null,
      b64: null,
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
    if (event.target.files && event.target.files[0]) {
      const FR = new FileReader();
      FR.addEventListener('load', (e) => {
        this.state.b64 = e.target.result;
        // img = e.target.result;
      });
      FR.readAsDataURL(event.target.files[0]);
    }
  }

  onClickHandler = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    this.validateForm();
  }

  validateForm = () => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:7000/api/users',
      success(result) {
        console.log('Success', result);
      },
      data: {
        lat: this.state.lat,
        lng: this.state.lng,
        b64: this.state.b64,
      },
    });
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
