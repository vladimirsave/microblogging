import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjbEmABoTf2nIWk9TjC71yD5NW4WRB9fw",
  authDomain: "tweets-ab266.firebaseapp.com",
  projectId: "tweets-ab266",
  storageBucket: "tweets-ab266.appspot.com",
  messagingSenderId: "894408324899",
  appId: "1:894408324899:web:7c64c28382b1b869fa3e96"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app);

export const mediaCollection = collection(db, "media");

export async function uploadImage(file) {
  const storageRef = ref(storage, '/media/' + Math.random() + file.name);

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
}

export function addMediaDoc(url, caption) {
  return addDoc(mediaCollection, {
    imageUrl: url,
    caption,
    updatedAt: new Date(),
  });
}

export {app, db, auth}

