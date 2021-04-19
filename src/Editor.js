import React, { Component } from "react";
import './Editor.css';


// https://github.com/robertreppel/hello-react-firepad/blob/master/src/components/Editor.js
class Editor extends Component {
    componentDidMount() {
        //// Initialize Firebase.
        //// TODO: replace with your Firebase project configuration.
        const config = {
            apiKey: process.env.REACT_APP_firebaseApiKey,
            databaseURL: "https://firepad-with-agora-default-rtdb.firebaseio.com/",
        };
        window.firebase.initializeApp(config);
        //// Get Firebase Database reference.
        const firepadRef = this.getExampleRef();
        //// Create CodeMirror (with lineWrapping on).
        const codeMirror = window.CodeMirror(document.getElementById('firepad-container'), {
            lineNumbers: true,
            mode: 'javascript'
        });
        //// Create Firepad (with rich text toolbar and shortcuts enabled).
        window.Firepad.fromCodeMirror(firepadRef, codeMirror,
            {
                defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  const message = "Hello, world.";\n  console.log(message);\n}'
            });
    }

    // Helper to get hash from end of URL or generate a random one.
    getExampleRef() {
        let ref = window.firebase.database().ref();
        const hash = this.props.id
        if (hash) {
            ref = ref.child(hash);
            console.log({ref});
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;
    }

    render() {
        return (
            <div>
                <div id="firepad-container"/>
            </div>

        );
    }
}
export default Editor;
