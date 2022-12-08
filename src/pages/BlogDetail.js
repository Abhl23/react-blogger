import { useLocation } from "react-router-dom";

import styles from "../styles/blogdetail.module.scss";

const BlogDetail = () => {
  const location = useLocation();

  const { blog } = location.state;

  if(!blog.date){
    blog.date=blog.publishedAt.substr(0,10).replaceAll('-', '/');
  }

  return (
    <div className={styles.blogContainer}>
        <div className={styles.blogHeader}>
            <div className={styles.blogInfo}>
                <span className={styles.blogAuthor}>{blog.author}</span>
                <span className={styles.blogTime}>{blog.date}</span>
                <h2 className={styles.blogHeading}>{blog.title}</h2>
                <p className={styles.blogSubHeading}>{blog.description}</p>
            </div>
            <div className={styles.blogImage} style={{backgroundImage: `url("${blog.urlToImage}")`}}></div>
        </div>
        <div className={styles.blogBody}>
            <p>{blog.content}</p>
        </div>
    </div>
  );
};

export default BlogDetail;
