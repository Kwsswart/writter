import React, {Component} from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Axios from "axios";


/**
 * Component to display text area for weet
 */

class AddWeet extends Component {
    state = {
        content: '',
        title: ''
    }
    apiKey = process.env.REACT_APP_TINY_API_KEY

    handleEditorChange = (content, editor) => {
        this.setState({content});
    }
    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, () =>{console.log(this.state)});
    handleTitleChange = this.handleChange('title');

    handleSubmit = (e) => {
        e.preventDefault();
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
            }
        })
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
                        <h2>Add Weet</h2>
                    </header>
                    <form className="w3-container" onSubmit={this.handleSubmit}>
                        <div className="w3-section">
                            <p>
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    className="w3-input w3-border w3-margin-bottom"
                                    onChange={this.handleTitleChange}
                                />
                            </p>
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