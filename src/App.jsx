import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Register } from "./components/Register"
import { Redirect } from "./components/Register/Redirect";
import { Step1 } from "./components/Register/Step1";
import { Step2 } from "./components/Register/Step2";
import { SocialMedia } from "./components/SocialMedia"
import { Me } from "./components/SocialMedia/Me";
import { NotFound } from "./components/NotFound";
import { GlobalStyle } from "./styles/global";
import { Teste } from "./components/Test";
import { Edit } from "./components/SocialMedia/Edit";
import { Users } from "./components/SocialMedia/Users";
import { NewPost } from "./components/SocialMedia/NewPost";
import { AppRedirect } from "./components/SocialMedia/Redirect";
import { Choose } from "./components/SocialMedia/NewPost/Choose";
import { Books } from "./components/SocialMedia/NewPost/Book";
import { Short } from "./components/SocialMedia/NewPost/Short";
 
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
              <Route path="" element={<Redirect />}/>
            </Route>
            <Route path="/app/" element={<SocialMedia />}>
              <Route path="feed" element={<h1>Feed</h1>}/>
              <Route path="me" element={<Me />}/>
              <Route path="edit" element={<Edit />} />
              <Route path="profile/:id" element={<Users />} />
              <Route path="new/" element={<NewPost />}> 
                <Route path="choose" element={<Choose />}/>
                <Route path="short" element={<Short />}/>
                <Route path="book" element={<Books />}/>
                <Route path="" element={<Navigate to="/app/new/choose" />}/>
              </Route>
              <Route path="" element={<AppRedirect />}/>
            </Route>
            <Route path="/teste" element={<Teste />}/>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}
