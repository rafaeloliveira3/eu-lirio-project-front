import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage"
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "eu-lirio-a72ff.firebaseapp.com",
  projectId: "eu-lirio-a72ff",
  storageBucket: "eu-lirio-a72ff.appspot.com",
  messagingSenderId: "591621268285",
  appId: "1:591621268285:web:1a4a6a511f5a9847afdb54",
  measurementId: "G-FBZT10B0D4"
};

const app = initializeApp(firebaseConfig);

export const uploadImage =  async (image, name) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, `profile/${name + v4()}`)
    
  await uploadBytes(imageRef, image)
  return await getDownloadURL(imageRef)
}
