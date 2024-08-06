import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Pages/Dashboard/Dashboard"
import CategoryPage from "./components/Pages/CategoryPage/CategoryPage"
import BooksPage from "./components/Pages/BooksPage/BooksPage"
import AddBookPage from "./components/Pages/AddBookPage/AddBookPage"
import PublisherPage from "./components/Pages/PublisherPage/PublisherPage"
import AuthorPage from "./components/Pages/AuthorPage/AuthorPage"
import CommentsPage from "./components/Pages/CommentsPage/CommentsPage"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import { useState } from "react"


function App() {

  const [title, setTitle] = useState("داشبورد")

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><Dashboard /></>}></Route>
          <Route path="/categories" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><CategoryPage /></>}></Route>
          <Route path="/books" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><BooksPage /></>}></Route>
          <Route path="/addBook" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><AddBookPage /></>}></Route>
          <Route path="/publishers" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><PublisherPage /></>}></Route>
          <Route path="/authors" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><AuthorPage /></>}></Route>
          <Route path="/comments" element={<><Header title={title} /><Sidebar setTitle={setTitle} /><CommentsPage /></>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
