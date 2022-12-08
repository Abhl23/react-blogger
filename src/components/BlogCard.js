import { Link } from "react-router-dom";
import styles from "../styles/home.module.scss";

const BlogCard = ({ blog }) => {
  return (
    <Link to="/blog-detail" state={{ blog }} className={styles.blogCardLink}>
      <div className={styles.blogCard}>
        <div className={styles.imgContainer}>
          <img src={blog.urlToImage} alt="blog" />
        </div>
        <div className={styles.blogInfo}>
          <p className={styles.blogTitle}>{blog.title}</p>
          <p className={styles.blogDesc}>{blog.description}</p>
          <p className={styles.blogAuthor}>{`By ${blog.author}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
