import { useEffect, useState } from 'react';
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
      <h1>Blog</h1>
      <Blog posts={posts} />
    </>
  );
}

export default App;
