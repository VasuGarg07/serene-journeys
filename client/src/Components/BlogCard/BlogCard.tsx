import styled from "@emotion/styled";
import { Avatar, Chip, Skeleton, Typography } from "@mui/material";
import { BlogResponse } from "../../Utils/interfaces";
import { formatDate, userAvatar } from "../../Utils/utilities";
import './BlogCard.Styles.scss';
import { useNavigate } from "react-router-dom";


// Basic Card Styling
export const StyledBlogCard = styled("article")(({ theme }) => ({
  padding: "16px",
  boxSizing: "border-box",
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.24)',
  backgroundColor: "#ffffff",
}));


// Card Shimmer
export const BlogCardSkeleton = () => {
  return (
    <StyledBlogCard>
      <div className="flex-centered-container-vr fullwidth">
        <Skeleton variant="circular" width={32} height={32}></Skeleton>
        <Skeleton variant="text" sx={{ fontSize: '16px', flex: 1 }} />
      </div>
      <Skeleton variant="rounded" sx={{ height: '120px', flex: 1, margin: "12px 0 4px" }} />
      <Skeleton variant="text" sx={{ fontSize: '24px', flex: 1 }} />
      <div className="flex-centered-container-vr margin-8-vr">
        <Skeleton variant="rounded" sx={{ height: '20', borderRadius: "12px", width: "80px" }} />
        <Skeleton variant="rounded" sx={{ height: '20', borderRadius: "12px", width: "80px" }} />
        <Skeleton variant="rounded" sx={{ height: '20', borderRadius: "12px", width: "80px" }} />
      </div>
      <Skeleton variant="text" sx={{ fontSize: '14px', flex: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '14px', flex: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '14px', width: "80%" }} />

    </StyledBlogCard>
  )
}


// Card with data
export const BlogCard = ({ post }: { post: BlogResponse }) => {

  const navigate = useNavigate()

  return (
    <StyledBlogCard className="blog-card" onClick={() => navigate(`blog/${post._id}`)}>

      <div className="flex-centered-container-vr fullwidth">
        <Avatar {...userAvatar(post.user)} />
        <div>
          <Typography display="block" variant="button" style={{ lineHeight: 1 }}>{post.user.username || 'Anonymous'}</Typography>
          <Typography display="block" variant="caption">{formatDate(post.timeOfPost)}</Typography>
        </div>
      </div>

      <img src={post.imageLink} alt="postImage" className="full-width cover-image" />

      <Typography display="block" variant="body1" style={{ lineHeight: 1, fontWeight: 'bold' }}>
        {post.title}
      </Typography>

      <div className="flex-centered-container-vr margin-8-vr tags">

        {post.categories.map((cat) => (
          <Chip key={cat} className="tag" size="small" label={`#${cat}`} />
        ))}
      </div>

      <Typography display="block" variant="body2" className="description">{post.description}</Typography>
    </StyledBlogCard>
  )
}
