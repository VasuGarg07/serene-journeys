import './Blogs.styles.scss';
import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { BlogResponse } from '../../Utils/interfaces';
import { getAll } from '../../Utils/api.service';
import { BlogCard, BlogCardSkeleton } from '../../Components/BlogCard/BlogCard';

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        if (!response.data) {
          throw new Error('Failed to fetch data');
        }
        setBlogs(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='blogs-container padding full-vp-height full-width flex-centered-column'>
      {/* <TextField placeholder="Search..." className='search-field'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      >
      </TextField> */}

      <Box className="cards-container full-width" sx={{ flexGrow: 1, margin: 0 }}>
        {(loading || blogs.length < 1) ?
          <Stack spacing={2}>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
          </Stack>
          :
          <Stack spacing={2}>
            {blogs.map(blog => <BlogCard key={blog._id} post={blog} />)}
          </Stack>
        }
      </Box>
      <Box className="secondary" sx={{ margin: 0 }} />
    </div>
  )
}

export default Blogs