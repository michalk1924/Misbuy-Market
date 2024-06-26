import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home'
import Items from './components/Items';
import Item from './components/ItemDetails';
import ErrorPage from './components/ErrorPage';
import AddItem from './components/AddItem';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CategoryItems from './components/CategoryItems'
import { Token } from './components/TokenProvider';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='home' element={<Home />} />
            <Route path='items'>
              <Route index element={<Items />} />
              <Route path=':category' element={<CategoryItems />}/>
              <Route path=':category/:itemId' element={<Item/>} />
              {/* </Route> */}
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