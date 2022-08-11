import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
    const [randomURL, setRandomURL] = useState(null);

    const [linkList, setLinkList] = useState([
        { link: "", title: "" },
        { link: "", title: "" },
    ]);

    const URL_Generator = () => {
        setRandomURL(Math.random().toString(36).substring(2, 10));
    };

    const addNewLink = () => {
        console.log(linkList);
        setLinkList([...linkList, { link: "", title: "" }]);
    };

    const removeLink = (index) => {
        const list = [...linkList];
        list.splice(index, 1);
        setLinkList(list);
    };

    const URLchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...linkList];
        list[index][name] = value;
        setLinkList(list);
    };

    const URLtitleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...linkList];
        list[index][name] = value;
        setLinkList(list);
    };

    return (
        <div className="container">
            <h1>Nexus</h1>
            <div>
                <h1>Page Title</h1>
                <input type="text" placeholder="Title" />
            </div>
            {linkList.map((singleList, index) => (
                <div key={index}>
                    <h1>Link {index + 1}</h1>
                    <div className="inputContainer">
                        <div>
                            <div>
                                <label>Link:</label>
                                <input name="link" id="link" type="text" placeholder="https://" value={singleList.link} onChange={(e) => URLchange(e, index)} />{" "}
                            </div>
                            <div>
                                <label>Title:</label>
                                <input name="title" id="title" type="text" placeholder="(optional)" value={singleList.title} onChange={(e) => URLtitleChange(e, index)} />
                            </div>
                        </div>
                        <div>
                            {linkList.length > 2 ? (
                                <button onClick={() => removeLink(index)} className="removeLinkButton">
                                    X
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
            {linkList.length >= 4 ? null : <button onClick={addNewLink}>NEW LINKS</button>}

            <button onClick={URL_Generator}>Create Link</button>
            {randomURL !== null ? <p>Generated URL - https://####.com/{randomURL}</p> : null}
        </div>
    );
}

export default App;
