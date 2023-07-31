import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/home/Home.jsx"
import List from "./Pages/list/List.jsx"
import Hotel from "./Pages/hotel/Hotel.jsx"
import Login from './Pages/login/Login';


function App() {

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" 
        element={<Home />}>
      </Route>
    
      <Route path="/hotels"
        element={<List />}>
      </Route>
    
      <Route path="/hotel/:id"
        element={<Hotel />}>
      </Route>

      <Route path="/login"
        element={<Login />}>
      </Route>
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;
