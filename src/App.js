import React, { useState} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import NavBar from './component/NavBar';
import News from './component/News';
const App = () => {
  const [progress, setProgress] = useState(0)
  
 const setprogress =  (progress) =>{
  setProgress(progress)
}

  
    return (
      <Router>
        
        <div>
        <LoadingBar color='#f11946' progress={progress} height={4} />
          <NavBar />
   
      </div>

        <Routes>
          <Route exact path="/" element={<News setprogress={setprogress} key="general" pageSize={10} category="general"/>}/>
          <Route exact path="/business" element={<News setprogress={setprogress} key="business" pageSize={10} category="business"/>}/>
          <Route exact path="/entertainment" element={<News setprogress={setprogress} key="entertainment" pageSize={10} category="entertainment"/>}/>
          <Route exact path="/health" element={<News setprogress={setprogress} key="health" pageSize={10} category="health"/>}/>
          <Route exact path="/science" element={<News setprogress={setprogress} key="science" pageSize={10} category="science"/>}/>
          <Route exact path="/sports" element={<News setprogress={setprogress} key="sports" pageSize={10} category="sports"/>}/>
          <Route exact path="/technology" element={<News setprogress={setprogress} key="technology" pageSize={10} category="technology"/>}/>
                   
        </Routes>

      </Router>
      
    )
  }


export default App
