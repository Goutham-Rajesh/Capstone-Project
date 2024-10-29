import './App.css'
import UserLoggedIn from './pages/UserLoggedIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route path="/ChitFund" element={<UserLoggedIn/>} />
        </Routes>
      </Router>
    </div>
    </>
   
  );
}

export default App
