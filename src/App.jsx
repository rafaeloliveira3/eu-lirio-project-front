import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { GlobalStyle } from "./styles/global";
 
export function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}
