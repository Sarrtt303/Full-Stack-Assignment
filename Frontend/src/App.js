import Signup from "./Pages/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    
   <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
    </Routes>
   </BrowserRouter>
    
  );
}

export default App;
