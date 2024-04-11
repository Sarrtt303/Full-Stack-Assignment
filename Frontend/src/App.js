import Signup from "./Pages/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProfileForm from "./Pages/ProfileForm";
import Login from "./Pages/LoginPage"
import FinishPage from "./Pages/FinishPage";

function App() {
  return (
    
   <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<ProfileForm/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/finish' element={<FinishPage/>}></Route>
    </Routes>
   </BrowserRouter>
    
  );
}

export default App;
