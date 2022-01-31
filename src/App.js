import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
// import pages
import About from './pages/about/About';
import Blog from './pages/blog/Blog';
import BlogArticle from './pages/blogArticle/BlogArticle';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
 const {user, authIsReady} = useAuthContext()
  return (
    <div className="App">
    {authIsReady &&(
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/" element={user ? <Dashboard /> : <Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={!user ? <Login />: <Dashboard />} />
          <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />
          <Route path="/create" element={user ? <Create /> : <Signup />} />
          <Route path="/blogarticles/:id" element={<BlogArticle />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
