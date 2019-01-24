import React, { Component } from 'react';
import axios from 'axios';

class UploadForm extends Component {
  handleUploadFile = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/api/Message', data).then((response) => {
      console.log(response); // do something with the response
    });
  }
    
    render() {
      return(
        <form >
          <input type="file" onChange={this.handleUploadFile} />
        </form>
      )
    }
}

export default UploadForm;