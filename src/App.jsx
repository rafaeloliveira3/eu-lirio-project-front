import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Register } from "./components/Register"
import { Redirect } from "./components/Register/Redirect";
import { Step1 } from "./components/Register/Step1";
import { Step2 } from "./components/Register/Step2";
import { Step3 } from "./components/Register/Step3";
import { NotFound } from "./components/NotFound";
import { GlobalStyle } from "./styles/global";
 
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
              <Route path="step3" element={<Step3 />}></Route>
              <Route path="" element={<Redirect />}/>
            </Route>

            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}
