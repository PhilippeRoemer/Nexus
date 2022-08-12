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
        <div>
            Link ID - {linkID}!<p>{title}</p>
            <p>{background}</p>
            {links.map((link, index) => {
                return (
                    <ul key={index}>
                        <li>
                            <a href={link.link}>{link.title}</a>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
}

export default Links;
