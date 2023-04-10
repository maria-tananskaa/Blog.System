import { Navigation } from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import { Blog } from './components/Blog/Blog';
import { Post } from './components/Post/Post';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreatePost } from './components/CreatePost/CreatePost';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<Blog />} />
          <Route path='/posts/:postId' element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </PostProvider>
      <Login />
      <Register />

    </AuthProvider>
  );
}

export default App;
