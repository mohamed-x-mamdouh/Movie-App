import { Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div className="pattern" />

      <div className="relative z-10 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;