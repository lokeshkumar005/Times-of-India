import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App= () => {
  const  pageSize = 12;

  const [progress, setProgress] = useState();
 
    return (
      <div>
        <BrowserRouter>
        <LoadingBar color='#f11946' progress={progress} />
        <NavBar />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress}  key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress}  key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress}  key="general1" pageSize={pageSize} country="in" category="general"/>}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress}  key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress}  key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
          </Routes>
      </BrowserRouter>
      </div>
    )
  }

  export default App; 