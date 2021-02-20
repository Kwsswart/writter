import React, {Component} from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Axios from "axios";
import Alert from "../error/Alert";


/**
 * Component to display text area for weet
 */

class AddWeet extends Component {
    state = {
        content: '',
        title: '',
        titleErr: '',
        contentErr: '',
        formErr: ''
    }
    apiKey = process.env.REACT_APP_TINY_API_KEY

    handleEditorChange = (content, editor) => {
        this.setState({content});
        if (this.state.content.length !== 0){
            this.setState({contentErr: ''});
        }
    }
    handleTitleChange = (e) => this.setState({
        title:e.target.value
    }, () =>{
        console.log(this.state.title.length)
        if (this.state.title.length !== 0){
            this.setState({titleErr: ''});
        }
    });


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.content.length === 0) {
            this.setState({contentErr: "You need to have written content!"});
            return;
        }
        if (this.state.title.length === 0) {
            this.setState({titleErr: "You need to have written a title!"});
            return;
        }

        Axios.post("/api/addweet", {
            title: this.state.title,
            content: this.state.content
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(r => {
            if (r.data.success) {
                window.location.reload();
            } else {
                this.setState({formErr: r.data.error});
            }
        });
    }

    
    render() {
        return (
            <div className="w3-modal w3-animate-opacity" id="addWeet">
                <div className="w3-modal-content w3-card">
                    <header className="w3-container w3-blue">
                        <span 
                        className="w3-button w3-display-topright w3-hover-none w3-hover-text-white"
                        onClick={() => {
                            document.getElementById("addWeet").style.display = "none";
                        }}>x</span>
                        <h2 style={{fontFamily: "Helvetica Neue"}}>Add Weet</h2>
                    </header>
                    <form className="w3-container" onSubmit={this.handleSubmit}>
                        {this.state.formErr.length > 0 && (
                            <Alert
                                message={this.state.formErr}
                            />
                        )}
                        <div className="w3-section">
                            <p>
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    className="w3-input w3-border w3-margin-bottom"
                                    onChange={this.handleTitleChange}
                                />
                                {this.state.titleErr.length > 0 && (
                                    <Alert
                                        message={this.state.titleErr}
                                    />
                                )}
                            </p>
                            <p>
                                <Editor
                                    initialValue="<p>Write your post here!</p>"
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        statusbar: false,
                                        toolbar_mode: "sliding",
                                        plugins: [
                                            'advlist autolink lists link image imagetools media emoticons preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                        'undo redo | formatselect | bold italic underline strikethrough | image anchor media | \
                                        alignleft aligncenter alignright alignjustify | \
                                        outdent indent | bulllist numlist | fullscreen preview | emoticons help',
                                        contextmenu: "bold italic underline indent outdent help"
                                    }}
                                    apiKey={this.apiKey}
                                    onEditorChange={this.handleEditorChange}
                                />
                                {this.state.contentErr.length > 0 && (
                                    <Alert
                                        message={this.state.contentErr}
                                    />
                                )}
                            </p>
                            <p>
                                <button type="submit" className="w3-button w3-blue">Post</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddWeet;