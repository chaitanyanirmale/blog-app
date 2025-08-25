import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import Comments from './pages/admin/Comments.jsx'
import Login from './components/admin/Login.jsx'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx'

export default function App() {

  const {token} = useAppContext().value;
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route>
          <Route path="admin" element={token ? <Layout /> : <Login />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<AddBlog />} />
            <Route path="list" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

      </Routes>
    </div>
  )
}
