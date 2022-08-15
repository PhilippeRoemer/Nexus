import React from "react";
import "../App.css";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp, Firestore, increment, setDoc } from "firebase/firestore";

function Home() {
    const [randomURL, setRandomURL] = useState(null);
    const [pageTitle, setPageTitle] = useState("");
    const [selectedBackground, setSelectedBackground] = useState("1");

    const [linkList, setLinkList] = useState([
        { link: "", title: "" },
        { link: "", title: "" },
    ]);

    const URL_Generator = async () => {
        const linkID = Math.random().toString(36).substring(2, 10);
        const linkCollectionRef = collection(db, "generated_links", linkID, "links");
        const linkRef = doc(db, "generated_links", linkID);
        await setDoc(linkRef, { title: pageTitle, background: selectedBackground, created: Timestamp.now() });
        await addDoc(linkCollectionRef, { linkList });

        setRandomURL(linkID);
    };

    const addNewLink = () => {
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
            <div className="logoContainer">
                <h1 className="logo">Nexus</h1>
            </div>
            <div className="linkContainer">
                <div>
                    <h1>Page Title</h1>
                    <input type="text" placeholder="Title" onChange={(e) => setPageTitle(e.target.value)} />
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
                {linkList.length >= 4 ? null : <button onClick={addNewLink}>Add Link</button>}
                <div>
                    <input type="radio" id="1" name="background" value="1" onClick={() => setSelectedBackground("1")} /> <label for="1">1</label>
                    <br />
                    <input type="radio" id="2" name="background" value="2" onClick={() => setSelectedBackground("2")} /> <label for="2">2</label>
                    <br />
                    <input type="radio" id="3" name="background" value="3" onClick={() => setSelectedBackground("3")} /> <label for="3">3</label>
                </div>
                <button onClick={URL_Generator}>Create Link</button>
                {randomURL !== null ? (
                    <div>
                        <a href={"http://localhost:3000/" + randomURL} target="_blank" rel="noreferrer">
                            Open link in new tab
                        </a>
                        <p>Generated URL - https://####.com/{randomURL}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Home;
