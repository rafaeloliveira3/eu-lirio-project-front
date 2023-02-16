import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Register } from "./components/Register"
import { Step1 } from "./components/Register/Step1";
import { GlobalStyle } from "./styles/global";
 
export function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register/" element={<Register />}>
              <Route index={true} path="step1" element={<Step1 />} />
              <Route path="step2" element={<h1>Second</h1>}></Route>
            </Route>
          </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}
