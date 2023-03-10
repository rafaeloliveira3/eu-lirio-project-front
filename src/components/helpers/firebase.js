import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage"
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "eu-lirio.firebaseapp.com",
  projectId: "eu-lirio",
  storageBucket: "eu-lirio.appspot.com",
  messagingSenderId: "452534834850",
  appId: "1:452534834850:web:b219c8baf10dcc70ede9fb"
};

const app = initializeApp(firebaseConfig);

export const uploadImage =  async (image, name) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, `profile/${name + v4()}`)
    
  await uploadBytes(imageRef, image)
  return await getDownloadURL(imageRef)
}
