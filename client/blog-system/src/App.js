import { Navigation } from './components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blog } from './components/Blog/Blog';
import * as postService from './services/postService';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll()
      .then(result => {
        setPosts(result);
      })
  }, []);

  return (
    <>
      <Navigation />
      <h1>Blog</h1>
      <Routes>
        <Route path='/' element={<Blog posts={posts} />} />
      </Routes>

    </>
  );
}

export default App;
