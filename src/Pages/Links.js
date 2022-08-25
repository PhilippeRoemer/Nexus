import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp, Firestore, increment, getDoc } from "firebase/firestore";

function Links() {
    const [links, setLinks] = useState([]);
    const [background, setBackground] = useState([]);
    const [title, setTitle] = useState("");

    const { linkID } = useParams();

    useEffect(() => {
        const getLinks = async () => {
            const data = await getDocs(collection(db, "generated_links", linkID, "links"));
            setLinks(data.docs[0].data().linkList);
        };
        getLinks();

        const getDocInfo = async () => {
            const docRef = doc(db, "generated_links", linkID);
            const docData = await getDoc(docRef);

            setBackground(docData.data().background);
            setTitle(docData.data().title);
        };
        getDocInfo();
    }, []);

    return (
        <div className={"container backgroundColor" + background}>
            <div>
                <div className="logoContainer">
                    <h1 className="logo">Nexus</h1>
                </div>
            </div>
            <div className="linkContainer">
                <h1 className="linkTitle">{title}</h1>
                {links.map((link, index) => {
                    return (
                        <>
                            {link.link.slice(0, 8) === "https://" ? (
                                <a href={link.link} target="_blank" rel="noreferrer">
                                    <div key={index} className="links">
                                        {link.title === "" ? link.link : link.title}
                                    </div>
                                </a>
                            ) : (
                                <a href={"https://" + link.link} target="_blank" rel="noreferrer">
                                    <div key={index} className="links">
                                        {link.title === "" ? link.link : link.title}
                                    </div>
                                </a>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export { Links };
