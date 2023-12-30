import { Box, Stack } from '@mui/material';
import useSWR from 'swr';
import { BlogCard, BlogCardSkeleton } from '../../Components/BlogCard/BlogCard';
import { fetcher } from '../../Utils/api.service';
import { BlogResponse } from '../../Utils/interfaces';
import { urls } from '../../Utils/urls';
import './Blogs.styles.scss';

const Blogs = () => {

  const { data, error, isLoading } = useSWR<BlogResponse[]>(urls.blogListUrl, fetcher);

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
        {(isLoading || !data) ?
          <Stack spacing={2}>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
          </Stack>
          :
          <Stack spacing={2}>
            {data.map(blog => <BlogCard key={blog._id} post={blog} />)}
          </Stack>
        }
      </Box>
      <Box className="secondary" sx={{ margin: 0 }} />
    </div>
  )
}

export default Blogs