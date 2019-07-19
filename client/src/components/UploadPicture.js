import * as React from "react";
import { Component } from "react";

export default class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }

  onChangeHandler(e) {
    console.log(e.target.files[0]);
  }

  render() {
    return (
      <input type="file" name="file" onChange={this.onChangeHandler}/>
    );
  }
}
