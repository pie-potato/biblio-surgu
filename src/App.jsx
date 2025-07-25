import './App.css';
import Header from './components/Header.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.jsx';
import NewsPage from './pages/News.jsx';
import SelectionsPage from './pages/SelectionsPage.jsx';
import AllNewsPage from './pages/AllNews.jsx';
import Footer from './components/Footer.jsx';
import Events from './pages/Events.jsx';
import Event from './pages/Event.jsx';
import VKR from './pages/VKR.jsx';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_BASE_NAME_URL}>
      <div className='main'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/pages/:page' element={<SelectionsPage />} />
            <Route path='/news/:id' element={<NewsPage />} />
            <Route path='/news' element={<AllNewsPage />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event/:id' element={<Event />} />
            <Route path='vkr' element={<VKR />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;