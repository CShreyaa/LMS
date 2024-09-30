import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";  
import AddBooks from "./pages/AddBooks";
import EditBook from "./pages/EditBook";
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBooks' element={<AddBooks />} />
        <Route path='/editBook/:id' element={<EditBook />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
