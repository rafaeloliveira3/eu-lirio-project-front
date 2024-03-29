import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getMetadata  } from "firebase/storage"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth"
import { v4 } from "uuid";
import { bytesFormatter } from "./formatters";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "eu-lirio-a72ff.firebaseapp.com",
  projectId: "eu-lirio-a72ff",
  storageBucket: "eu-lirio-a72ff.appspot.com",
  messagingSenderId: "591621268285",
  appId: "1:591621268285:web:1a4a6a511f5a9847afdb54",
  measurementId: "G-FBZT10B0D4"
}

const app = initializeApp(firebaseConfig)

const firebaseAuthErrors = {
  'auth/email-already-in-use': 'O email informado já está cadastrado!',
  'auth/internal-error' : 'Erro no servidor de autenticação',
  'auth/user-not-found' : 'Email e/ou senha incorretos',
  'auth/invalid-email' : 'Email Inválido!'
}

/* FIREBASE STORAGE */

export const uploadImage = async (image, name) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, `profile/${name + v4()}`)
    
  await uploadBytes(imageRef, image)
  return await getDownloadURL(imageRef)
}
export const deleteFile = async (downloadUrl) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, downloadUrl)

  await deleteObject(imageRef)
  .catch((err) => {
    console.log(err);
  })
  return true
}
export const uploadFile = async (file, name) => {
  const storage = getStorage(app)
  const documentRef = ref(storage, `file/${v4()+"||"+ name}`)

  await uploadBytes(documentRef, file)
  return await getDownloadURL(documentRef)
}
export const uploadCover = async (image, name) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, `cover/${name + v4()}`)
    
  await uploadBytes(imageRef, image)
  return await getDownloadURL(imageRef)
}
export const getFilesName = async (fileUrl) => {
  const storage = getStorage(app)
  const fileRef = ref(storage, fileUrl)

  return fileRef.name.split("||")[1]
}
export const getFileSize = async (fileUrl) => {
  if (fileUrl !== undefined) {
    const storage = getStorage(app)
    const fileRef = ref(storage, fileUrl)
    
    const metadata = await getMetadata(fileRef)
    return bytesFormatter(metadata.size)
  }
  return 0
}


/* FIREBASE AUTH */

export const registerUser =  async (email, password) => {
  const auth = getAuth(app)
  const user = await createUserWithEmailAndPassword(auth, email, password)
  .catch(err => { return {
    error : firebaseAuthErrors[err.code],
    code : err.code
  } })

  return user
}
export const userDelete = async () => {
  const auth = getAuth(app)
  const user = await deleteUser(auth.currentUser)
  .catch(err => { return err })

  return user
}
export const userLogin = async (email, password) => {
  const auth = getAuth(app)
  const user = await signInWithEmailAndPassword(auth, email, password)
  .catch(err => { 
    return {
      error: firebaseAuthErrors[err.code],
      code: err.code
  } })

  console.log(user);

  return user
}
export const currentUser = async () => {
  const auth = getAuth(app)
  return auth.currentUser
}