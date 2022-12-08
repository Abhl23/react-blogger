import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import BlogCard from "../components/BlogCard";
import { db } from "../firebase";
import styles from "../styles/home.module.scss";
import Loader from "../components/Loader";

const Home = () => {
  let [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"), (querySnapshot) => {
      const firebaseBlogs = [];

      const fetchBlogs = async () => {
        try {
          const response = await fetch(
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=ec19a36430494f9c82c9e3fa2cc8557e"
          );
          const data = await response.json();

          if (data.status === "ok") {
            setBlogs(
              [...firebaseBlogs, ...data.articles].sort(
                (a, b) => b.publishedAt - a.publishedAt
              )
            );
            setLoading(false);
            return;
          }

          throw new Error(data.message);
        } catch (error) {
          console.log("Error", error);
          addToast(error.message, {
            appearance: "error",
          });
        }
      };

      fetchBlogs();

      querySnapshot.forEach((doc) => {
        firebaseBlogs.unshift(doc.data());
      });
    });

    return () => {
      unsub();
    };
  }, [addToast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homeContainer}>
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} key={`blog-${index}`} />
      ))}
    </div>
  );
};

export default Home;
