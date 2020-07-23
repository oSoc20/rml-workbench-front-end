import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

class DropzoneAreaSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    this.setState({
      files: files,
    });
    console.log(files);
  }
  render() {
    return (
      <DropzoneArea
        filesLimit={4}
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['.json', '.xml', '.csv']}
      />
    );
  }
}

export default DropzoneAreaSources;
