import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home'
import Items from './components/Items';
import Item from './components/Item';
import ErrorPage from './components/ErrorPage';
import AddItem from './components/AddItem';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='home' element={<Home />} />
            <Route path='items'>
              <Route index element={<Items />} />
              <Route path=':itemId' element={<Item />} />
              <Route path='addItem' element={<AddItem />} />
            </Route>
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App