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


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route>
          <Route path="admin" element={<Layout />}>
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
