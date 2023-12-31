import { BookmarkBorder, CommentOutlined, DeleteOutline, EditOutlined, FavoriteBorder, Share } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../../Assets/Lotties/loading.json';
import NotFound from '../../Assets/notfound.png';
import LottieAnimation from '../../Components/Lottie/Lottie';
import { bookmarkBlog, fetcher } from '../../Utils/api.service';
import { BlogResponse } from '../../Utils/interfaces';
import { urls } from '../../Utils/urls';
import { formatDate, showNotification, stringToColor, userAvatar } from '../../Utils/utilities';
import './BlogDetails.styles.scss';
import { StorageHelper } from '../../Utils/storage.helper';
import { SEVERITY } from '../../Utils/enums';

const BlogDetails = () => {

  const { blogId } = useParams();
  const { data, error, isLoading } = useSWR<BlogResponse>(`${urls.singleBlogUrl}${blogId}`, fetcher);

  const userId = StorageHelper.userProfile!._id;

  const handleBookmark = async () => {
    try {
      const resp = await bookmarkBlog(userId, data!._id);
      showNotification(SEVERITY.Success, resp.data.message);
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return (
      <div className='error-container padding full-vp-height full-width flex-centered-column'>
        <img src={NotFound} alt="" />
        <Button variant='contained' disableElevation sx={{ background: '#6880e4', borderRadius: "1rem" }}>Blog Not Found</Button>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className='error-container padding full-vp-height full-width flex-centered-column'>
        <LottieAnimation lottie={Loading} />
        <Typography variant='h6'>Loading the post...</Typography>
      </div>
    )
  }

  return (
    <div className='blog-container full-vp-height full-width flex-centered-column'>
      <div className='cover-image full-width'>
        <img src={data.imageLink} alt={data.title} className='full-width full-height' />

        <div className='veil full-width full-height'>
          <div className='header display-flex full-width full-height'>
            <div className='tags flex-centered-container-vr'>
              {data.categories.map((val: string) => (
                <Chip key={val} label={val} size='small' className='tag' sx={{ background: stringToColor(val) }} />
              ))}
            </div>
            <div className='title'>{data.title}</div>
          </div>
        </div>
      </div>

      <div className='blog-details full-width'>
        <div className="flex-centered-container-vr fullwidth">
          <Avatar {...userAvatar(data.user)} />
          <div>
            <Typography display="block" variant="button" style={{ lineHeight: 1.3 }}>{data.user.username || 'Anonymous'}</Typography>
            <Typography display="block" variant="caption">{formatDate(data.timeOfPost)}</Typography>
          </div>
        </div>

        <div className='actions flex-centered-container margin-vr'>
          <Button variant="text" color='inherit' size='small'
            startIcon={<FavoriteBorder />}>
            <span className='label'>Like</span>
          </Button>
          <Button startIcon={<CommentOutlined />} variant="text" color='inherit' size='small'>
            <span className='label'>Comment</span>
          </Button>
          <Button variant="text" color='inherit' size='small'
            startIcon={<BookmarkBorder />} onClick={handleBookmark}>
            <span className='label'>Bookmark</span>
          </Button>
          <Button startIcon={<Share />} variant="text" color='inherit' size='small'>
            <span className='label'>Share</span>
          </Button>
        </div>

        <div>
          {data.description.split('\n\n').map((para, index) => (
            <div key={index}>
              <Typography display="inline-block" variant='body2' className='text-justify'>{para}</Typography>
              <br /><br />
            </div>
          ))}
        </div>
      </div >
    </div>
  )
}

export default BlogDetails
