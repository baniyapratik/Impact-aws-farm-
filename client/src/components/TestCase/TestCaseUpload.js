import React from 'react';
import { submitTest } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TestCaseUpload extends React.Component {
    state = {
        isUploading: false,
        file: ''
    }
    onSubmit(event){
        event.preventDefault();
        this.props.submitTest(this.state.file);
        
    }
    onFileChange(event){
        let file = event.target.files;
        console.log(file);
        if (file.length === 1) {
            this.setState({file: event.target.files[0]});
        }
       
    }
    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h5>Test Case Upload</h5>
                <label> Testcase Name</label>
                <input type="text" placeholder="test name" />
                <input type="file" onChange={this.onFileChange.bind(this)} />
                <button>Upload</button>
            </form>
        )
    }
}
export default connect(null, {submitTest})(withRouter(TestCaseUpload));