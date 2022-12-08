import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { useAuth, useFormInput } from "../hooks";
import styles from "../styles/createblog.module.scss";

const CreateBlog = () => {
  const title = useFormInput("");
  const desc = useFormInput("");
  const content = useFormInput("");

  const [blogImage, setBlogImage] = useState(null);

  const [postingBlog, setPostingBlog] = useState(false);

  const { user } = useAuth();
  //   console.log("USER", user);

  const { addToast } = useToasts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPostingBlog(true);

    // check for input fields
    if (!title.value || !desc.value || !content.value || !blogImage) {
      setPostingBlog(false);

      return addToast("Fields cannot be left empty!", {
        appearance: "error",
      });
    }

    try {
      // Creates a reference and file name for the blog image
      const storageRef = await ref(storage, uuid());
      // uploads the blog image to cloud storage
      const uploadTask = uploadBytesResumable(storageRef, blogImage);

      uploadTask.on(
        (error) => {
          setPostingBlog(false);

          return addToast(error, {
            appearance: "error",
          });
        },
        () => {
          // gets the download URL of the uploaded blog image
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            // creates a document in blogs collection
            await setDoc(doc(db, "blogs", uuid()), {
              title: title.value,
              description: desc.value,
              content: content.value,
              author: user.displayName,
              urlToImage: downloadURL,
              publishedAt: new Date(),
              date: new Date().toLocaleDateString(),
            });

            navigate("/");
            setPostingBlog(false);
          });
        }
      );

      addToast("Blog Published!", {
        appearance: "success",
      });
    } catch (error) {
      setPostingBlog(false);

      addToast(error, {
        appearance: "error",
      });
    }
  };

  return (
    <div className={styles.createBlog}>
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label>Title</label>
          <input {...title} />
        </div>

        <div className={styles.formField}>
          <label>Description</label>
          <input {...desc} />
        </div>

        <div className={styles.formField}>
          <label>Content</label>
          <textarea {...content}></textarea>
        </div>

        <div className={styles.formField}>
          <input
            style={{ display: "none" }}
            type="file"
            id="blog-image"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
          <label className={styles.imageLabel} htmlFor="blog-image">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1837/1837512.png"
              alt="add-attachment"
            />
            <span>Add Blog Image</span>
          </label>
        </div>

        <button className="btn btn-primary" disabled={postingBlog}>
          {postingBlog ? "Posting Blog..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
