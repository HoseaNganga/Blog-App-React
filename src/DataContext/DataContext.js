import { useState, useEffect, createContext } from "react";
import Axios from "../Axios/Axios";
import { useNavigate } from "react-router-dom";
import useTimeStamp from "../Hooks/useTimeStamp";
import { toast } from "react-hot-toast";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const getTimeStamp = useTimeStamp();
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await Axios.get(`/blogs`);
        if (resp && resp.data) setBlogs(resp.data);
      } catch (err) {
        setFetchError(err.response.statusText);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  useEffect(() => {
    const filteredItems = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResult(filteredItems.reverse());
  }, [blogs, searchValue]);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!newDescription || !newTitle) {
      return;
    }
    const idNumber = parseInt(blogs[blogs.length - 1].id) + 1;
    const id = JSON.stringify(blogs.length ? idNumber : 1);
    const newBlogItem = {
      id,
      title: newTitle,
      description: newDescription,
      checked: false,
      timeStamp: getTimeStamp,
    };
    const addBlogPromise = new Promise(async (resolve, reject) => {
      try {
        const resp = await Axios.post(`/blogs`, newBlogItem);
        if (resp) {
          const newBlogItems = [...blogs, resp.data];
          setBlogs(newBlogItems);
          setNewDescription("");
          setNewTitle("");
          navigate("/");
          resolve();
        }
      } catch (err) {
        const error = err.response ? err.response.statusText : "Network Error";
        reject();
        setFetchError(error);
      }
    });
    toast.promise(addBlogPromise, {
      loading: "Blog is being Created..",
      success: "Blog Created Successfully",
      error: "Error..Blog Not Created",
    });
  };

  const handleDelete = async (id) => {
    try {
      const deletePromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await Axios.delete(`/blogs/${id}`);
            const newBlogItems = blogs.filter((blog) => blog.id !== id);
            setBlogs(newBlogItems);
            navigate("/");
            resolve();
          } catch (err) {
            setFetchError(err);
            reject();
          }
        }, 1000);
      });
      toast.promise(deletePromise, {
        loading: "Loading...",
        success: "Post deleted successfully",
        error: "Error..Post Not Deleted",
      });
    } catch (err) {
      const error = err.response ? err.response.statusText : "Network Error";
      setFetchError(error);
    }
  };

  const handleCheck = async (id) => {
    const newBlogItems = blogs.map((blog) =>
      blog.id === id ? { ...blog, checked: !blog.checked } : blog
    );
    const updatedBlogItem = newBlogItems.find((blog) => blog.id === id);

    try {
      const checkedPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const resp = await Axios.patch(`/blogs/${id}`, {
              checked: updatedBlogItem.checked,
            });
            setBlogs(blogs.map((blog) => (blog.id === id ? resp.data : blog)));
            navigate("/");
            resolve();
          } catch (err) {
            const error = err.response
              ? err.response.statusText
              : "Network Error";
            setFetchError(error);
            reject();
          }
        }, 1000);
      });
      toast.promise(checkedPromise, {
        loading: "Loading...",
        success: "Checked successfully added..",
        error: "Error..Checked not added",
      });
    } catch (err) {
      const error = err.response ? err.response.statusText : "Network Error";
      setFetchError(error);
    }
  };

  const handleEdit = async (id) => {
    const newBlogItems = blogs.map((blog) =>
      blog.id === id
        ? {
            ...blog,
            title: editTitle,
            description: editDescription,
            timeStamp: getTimeStamp,
          }
        : blog
    );
    const updatedBlogItem = newBlogItems.find((blog) => blog.id === id);

    try {
      const editPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const resp = await Axios.patch(`/blogs/${id}`, {
              title: updatedBlogItem.title,
              description: updatedBlogItem.description,
              timeStamp: updatedBlogItem.timeStamp,
            });
            setBlogs(blogs.map((blog) => (blog.id === id ? resp.data : blog)));
            setEditDescription("");
            setEditTitle("");
            navigate("/");
            resolve();
          } catch (err) {
            const error = err.response
              ? err.response.statusText
              : "Network Error";
            setFetchError(error);
            reject();
          }
        }, 1000);
      });
      toast.promise(editPromise, {
        loading: "Loading...",
        success: "Post successfully updated",
        error: "Error..Post not Edited",
      });
    } catch (err) {
      const error = err.response ? err.response.statusText : "Network Error";
      setFetchError(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <DataContext.Provider
      value={{
        blogs,
        setBlogs,
        getTimeStamp,
        navigate,
        newTitle,
        setNewTitle,
        newDescription,
        setNewDescription,
        searchValue,
        setSearchValue,
        searchResult,
        setSearchResult,
        editTitle,
        setEditTitle,
        editDescription,
        setEditDescription,
        fetchError,
        setFetchError,
        isLoading,
        setIsLoading,
        handleAddBlog,
        handleDelete,
        handleCheck,
        handleEdit,
        handleCancel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
