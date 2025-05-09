import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './pages/includes/navbar';
import GenerateInvoice from './pages/Invoice';
import AskingAiBot from './pages/AskingAiInvoice';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/generate-invoice" element={<GenerateInvoice />} />
            <Route path="/ai-bot" element={<AskingAiBot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
