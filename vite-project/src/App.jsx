import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
// import Home from './pages/home/Home';
import Login from './pages/login/Login';
import './App.css';
import Egs from './pages/egs/Egs';
import Cinegy from './pages/cinegy/Cinegy';
import Archive from './pages/archive/Archive';
import DndKitProvider from './context/DndProvider';

function App() {
  return (
    <div className="App">
      <DndKitProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/egs' element={<Egs />} />
            <Route path='/cinegy' element={<Cinegy />} />
            <Route path='/archive' element={<Archive />} />
          </Routes>
        </BrowserRouter>
      </DndKitProvider>

    </div>
  );
}

export default App;
