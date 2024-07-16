import { BrowserRouter as Router, Route, Link, Routes }
    from "react-router-dom";
import './App.css';
import Signup from "./Pages/Signup";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        </Routes>
        </Router>
    </>
  );
}

export default App;
