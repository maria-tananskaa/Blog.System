import { Navigation } from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import { Blog } from './components/Blog/Blog';
import { Post } from './components/Post/Post';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreateEditPost } from './components/CreateEditPost/CreateEditPost';
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
          <Route path="/createPost" element={<CreateEditPost />} />
          <Route path="/editPost/:postId" element={<CreateEditPost />} />
        </Routes>
      </PostProvider>
      <Login />
      <Register />

    </AuthProvider>
  );
}

export default App;
