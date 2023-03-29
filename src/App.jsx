import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Modal from "react-modal"
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Register } from "./components/Register"
import { Step1 } from "./components/Register/Step1";
import { Step2 } from "./components/Register/Step2";
import { SocialMedia } from "./components/SocialMedia"
import { Me } from "./components/SocialMedia/Me";
import { NotFound } from "./components/NotFound";
import { GlobalStyle } from "./styles/global";
import { Edit } from "./components/SocialMedia/Edit";
import { Users } from "./components/SocialMedia/Users";
import { NewPost } from "./components/SocialMedia/NewPost";
import { Choose } from "./components/SocialMedia/NewPost/Choose";
import { Books } from "./components/SocialMedia/NewPost/Book";
import { Short } from "./components/SocialMedia/NewPost/Short";
import { Feed } from "./components/SocialMedia/Feed";
import { Ebooks } from "./components/SocialMedia/Feed/Ebooks";
import { Shorts } from "./components/SocialMedia/Feed/Shorts";
import { UserPublications } from "./components/SocialMedia/UserPublications";
 
Modal.setAppElement('#root')

export function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register/" element={<Register />} >
              <Route path="step1" element={<Step1 />} />
              <Route path="step2" element={<Step2 />}></Route>
              <Route path="" element={<Navigate to="/register/step1" />}/>
            </Route>
            <Route path="/app/" element={<SocialMedia />}>
              <Route path="feed/" element={<Feed />}>
                <Route path="ebooks" element={<Ebooks />}/>
                <Route path="shorts" element={<Shorts />}/>
                <Route path="" element={<Navigate to="/app/feed/shorts" />}/>
              </Route>
              <Route path="me" element={<Me />}/>
              <Route path="edit" element={<Edit />} />
              <Route path="profile/:id" element={<Users />} />
              <Route path="profile/:id" element={<Users />} />
              <Route path="my-publications" element={<UserPublications />} />
              <Route path="short/:id" element={<h1>Teste</h1>} />
              <Route path="new/" element={<NewPost />}> 
                <Route path="choose" element={<Choose />}/>
                <Route path="short" element={<Short />}/>
                <Route path="book" element={<Books />}/>
                <Route path="" element={<Navigate to="/app/new/choose" />}/>
              </Route>
              <Route path="" element={<Navigate to="/app/feed" />}/>
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}
