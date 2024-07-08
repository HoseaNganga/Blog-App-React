import Header from "./components/Header";
import DisplayBlogMain from "./components/DisplayBlogMain";
import NewBlog from "./components/NewBlog";
import BlogPage from "./components/BlogPage";
import EditBlog from "./components/EditBlog";
import About from "./components/About";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./DataContext/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<DisplayBlogMain />} />
          <Route path="/blog" element={<NewBlog />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
