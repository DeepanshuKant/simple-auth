import './App.css';

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'

import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Note from './pages/Note';


import store from './store'
import { loadUser } from './redux/actions/userAction';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Header />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />

          {/* If the user is authorized then only the notes route get navigated */}
          <Route exact path="/notes" element={<Note />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
