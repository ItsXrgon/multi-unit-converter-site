import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './Hooks/ScrollToTop';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;