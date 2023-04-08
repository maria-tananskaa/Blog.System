import { Navigation } from './components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blog } from './components/Blog/Blog';
import * as postService from './services/postService';
import { Post } from './components/Post/Post';
import { CreatePost } from './components/CreatePost/CreatePost';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login/Login';
import { PostProvider } from './contexts/PostContext';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll()
      .then(result => {
        setPosts(result);
      })
  }, []);

  return (
    <AuthProvider>
      <PostProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<Blog posts={posts} />} />
          <Route path='/posts/:postId' element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
        <Login></Login>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
