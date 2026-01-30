import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Outras rotas virão depois */}
    </Routes>
  );
}

export default App;