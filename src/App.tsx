import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ValorantHub from './pages/ValorantHub'; // <--- IMPORTANTE: Importe o Hub
import CS2Hub from './pages/CS2Hub';

function App() {
  return (
    <Routes>
      {/* Rota da Página Principal (O Direcionador) */}
      <Route path="/" element={<Landing />} />
      
      {/* Rota do Valorant (O Botão agora funciona!) */}
      <Route path="/valorant" element={<ValorantHub />} />
      
      {/* O CS2 a gente ainda vai criar, então por enquanto 
          vou deixar ele mandando de volta pra Landing pra não dar erro */}
      <Route path="/cs2" element={<CS2Hub />} />
    </Routes>
  );
}

export default App;