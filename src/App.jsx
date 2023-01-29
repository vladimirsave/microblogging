import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase/firebase';

import AppContext from './components/context/AppContext';
import AddNote from './components/AddNote';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
const tweetsUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';

const App = () => {
  const [tweetsFromServer, setTweetsFromServer] = useState([]);
  const [userNameNew, setUserNameNew] = useState('');
  const [displayTweets, setDisplayTweets] = useState([]);
  const notesCollection = collection(db, "Notes");
  const [currentUser, setCurrentInUser ] = useState (JSON.parse (localStorage.getItem('currentUser')) || false);

  useEffect(() => {
    async function initApp() {
      try {
        const allNotesSnapshotFromFirebase = await getDocs(notesCollection);
        const allNotesFromSnapshot = allNotesSnapshotFromFirebase.docs.map(note => {
          const newNotesFromSnap = {
            ...note.data(),
            id: note.id,
          };
          return newNotesFromSnap;
        });
        console.log(allNotesFromSnapshot);
        const allNotesFromSnapshotSorted = allNotesFromSnapshot.sort(function (a, b) {
          let dateA = new Date(a.date); let dateB = new Date(b.date); return dateB - dateA
        })
        setTweetsFromServer(allNotesFromSnapshotSorted);
      } catch (err) {
        console.error("Error recieve from server : ", err);
      }
    }
    initApp();
  }, []);

  const AddNotee = async (text) => {
    try {
      const date = new Date();
      const nameToSend = userNameNew;
      const dateFormated = date.toISOString();
      const addedNote = await addDoc(notesCollection, {
        content: text,
        userName: nameToSend,
        date: dateFormated
      });
      console.log(addedNote);
      console.log(addedNote.id);
      const newLocalTweet = { content: text, userName: nameToSend, date: dateFormated, id: addedNote.id }
      const localNewTweetsArray = [newLocalTweet, ...displayTweets];
      setDisplayTweets(localNewTweetsArray);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  useEffect(() => {

    if (tweetsFromServer.length) {
      console.log(tweetsFromServer);
      setDisplayTweets([...tweetsFromServer]);
    }
  }, [tweetsFromServer])

    useEffect(() => {
    const savedUserName = JSON.parse(
      localStorage.getItem('unic-key')
    );

    if (savedUserName) {
      setUserNameNew(savedUserName);
    }
    else {
      setUserNameNew('');
    }
  }, []);

  useEffect(() => {
    if (userNameNew.length > 0) {
      localStorage.setItem(
        'unic-key',
        JSON.stringify(userNameNew)
      );

    }
  }, [userNameNew]);



  return (
    <AppContext.Provider value={{ userNameNew, setUserNameNew, setCurrentInUser }}>
      <div>
        <div className='siteBar'>
          <div className='navigationBar'>
            <ul>
              <li>
                <Link to="/">Home</Link>

              </li>
              <li>
                <Link to="/user/">Profile</Link>
              </li>
              <li>
                <Link to="/login/">Login</Link>
              </li>

            </ul>
          </div>
        </div>
        <Routes>

          <Route path="/" element={ <PrivateRoute currentUser={currentUser}> <AddNote handleAddNote={AddNotee} tweetsFirsToProps={displayTweets} /> </PrivateRoute> } />

          <Route path="/user/" element={<Profile />} />

          <Route path="/login/" element={<Login />} />

          <Route path='/signup' element={<SignUp/>}></Route>

        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App