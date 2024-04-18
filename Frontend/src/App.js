import Signup from "./Pages/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from "./Pages/LoginPage"
import FinishPage from "./Pages/FinishPage";
import VerificationPage from "./Pages/VerificationPage";
import CloudinaryProfilePage from "./Pages/CloudinaryProfilePage";

function App() {
  return (
    
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/finish'  element={<FinishPage/>}></Route>
      <Route path='/verify' element={<VerificationPage/>}></Route>
      <Route path='/profile' element={<CloudinaryProfilePage/>}></Route>
    </Routes>
   </BrowserRouter>
    
  );
}

export default App;
