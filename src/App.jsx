import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pazar from './pages/Pazar';
import Atolye from './pages/Atolye';
import Hakkimizda from './pages/Hakkimizda';
import SaticiOl from './pages/SaticiOl';
import SaticiAli from './pages/SaticiAli';
import SaticiZeynep from './pages/SaticiZeynep';
import Sepet from './pages/Sepet';
import Saticilar from './pages/Saticilar';
import Odeme from './pages/Odeme';
import SaticiDetay from './pages/SaticiDetay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pazar" element={<Pazar />} />
        <Route path="/atolye" element={<Atolye />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/saticilar" element={<Saticilar />} />
        <Route path="/satici/:id" element={<SaticiDetay />} />
        <Route path="/satici-ol" element={<SaticiOl />} />
        <Route path="/satici/ali" element={<SaticiAli />} />
        <Route path="/satici/zeynep" element={<SaticiZeynep />} />
        <Route path="/sepet" element={<Sepet />} />
        <Route path="/odeme" element={<Odeme />} />
      </Routes>
    </Router>
  );
}

export default App;
