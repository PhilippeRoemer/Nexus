import React from "react";
import "../App.css";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp, Firestore, increment, setDoc } from "firebase/firestore";

function Home() {
    const [randomURL, setRandomURL] = useState(null);
    const [pageTitle, setPageTitle] = useState("");
    const [selectedBackground, setSelectedBackground] = useState("1");
    const [linkGenerated, setLinkGenerated] = useState(false);

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
        setLinkGenerated(true);
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

    const copyLink = () => {
        navigator.clipboard.writeText("https://philipperoemer.github.io/Nexus/" + randomURL);
        const tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied";
    };

    const resetCopyTooltip = () => {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Click to copy link";
    };

    return (
        <div className="container backgroundColor1">
            <div className="logoContainer">
                <h1 className="logo">Nexus</h1>
            </div>
            <div className="linkContainer">
                {linkGenerated === false ? (
                    <>
                        <div className="titleContainer">
                            <h1 className="pageTitle">Page Title</h1>
                            <div className="titleInputContainer">
                                <div className="prependInput">
                                    <span>Title</span>
                                </div>
                                <input type="text" placeholder="(Optional)" onChange={(e) => setPageTitle(e.target.value)} />
                            </div>
                        </div>
                        {linkList.map((singleList, index) => (
                            <div key={index}>
                                <h2>Link {index + 1}</h2>
                                <div className="inputContainer">
                                    <div>
                                        <div className="linkInputContainer">
                                            <div className="prependInput">
                                                <span>https://</span>
                                            </div>
                                            <input name="link" id="link" type="text" placeholder="www.google.com" value={singleList.link} onChange={(e) => URLchange(e, index)} />
                                        </div>

                                        <div className="titleInputContainer">
                                            <div className="prependInput">
                                                <span>Title</span>
                                            </div>
                                            <input name="title" id="title" type="text" placeholder="(optional)" value={singleList.title} onChange={(e) => URLtitleChange(e, index)} className="titleInput" />
                                        </div>
                                    </div>
                                    <div>
                                        {linkList.length > 2 ? (
                                            <div onClick={() => removeLink(index)} className="removeLinkButton">
                                                X
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {linkList.length >= 4 ? null : (
                            <div onClick={addNewLink} className="button">
                                Add Another Link
                            </div>
                        )}
                        <h2 className="backgroundTitle">Select a background</h2>
                        <div className="backgroundInputs">
                            <div>
                                <input type="radio" id="1" name="background" value="1" onClick={() => setSelectedBackground("1")} />{" "}
                                <label for="1">
                                    1<div className="backgroundContainer backgroundColor1"></div>
                                </label>
                            </div>

                            <div>
                                <input type="radio" id="2" name="background" value="2" onClick={() => setSelectedBackground("2")} />{" "}
                                <label for="2">
                                    2<div className="backgroundContainer backgroundColor2"></div>
                                </label>
                            </div>

                            <div>
                                <input type="radio" id="3" name="background" value="3" onClick={() => setSelectedBackground("3")} />{" "}
                                <label for="3">
                                    3<div className="backgroundContainer backgroundColor3"></div>
                                </label>
                            </div>
                        </div>
                        <div onClick={URL_Generator} className="button">
                            Create Link
                        </div>
                    </>
                ) : (
                    <div className="generatedItemInfo">
                        <h1 className="pageTitle">{pageTitle}</h1>
                        {linkList.map((link, index) => (
                            <div key={index}>
                                <h2>Link {index + 1}</h2>
                                <div className="inputContainer">
                                    <div>
                                        <div className="linkInputContainer">
                                            <p>
                                                <b>Link:</b> {link.link}
                                            </p>
                                        </div>
                                        {link.title === "" ? null : (
                                            <div className="titleInputContainer">
                                                <p>
                                                    <b>Title:</b> {link.title}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <h2>Selected Background</h2>
                        <div className="selectedBackground">
                            <div className={"backgroundContainer backgroundColor" + selectedBackground}></div>
                        </div>
                    </div>
                )}

                {randomURL !== null ? (
                    <div className="generatedURLContainer">
                        <a href={"https://philipperoemer.github.io/Nexus/" + randomURL} target="_blank" rel="noreferrer">
                            Open link in new tab
                        </a>
                        <p className="generatedURL">Generated URL - https://philipperoemer.github.io/Nexus/{randomURL}</p>
                        <div className="copyLinkButton tooltip" onClick={copyLink} onMouseOut={resetCopyTooltip}>
                            <span class="tooltiptext" id="myTooltip">
                                Click to copy link
                            </span>
                            Copy link
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export { Home };
