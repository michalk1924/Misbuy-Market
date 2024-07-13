import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import WishList from './components/WishList';
import UserProducts from './components/UserProducts';
import { TokenProvider } from './components/TokenProvider';
import { UserProvider } from './components/UserProvider';

function App() {

  return (
    <>
      <UserProvider>
        <TokenProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<Navigate to='home' />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
                <Route path='newpassword' element={<NewPassword />} />
                <Route path='home' element={<Home />} />
                <Route path='users/:userId'>
                  <Route path='wishList' element={<WishList />} />
                  <Route path='myProducts' element={<UserProducts />} />
                </Route>
                <Route path='items'>
                  <Route index element={<Items />} />
                  <Route path=':category' element={<CategoryItems />} />
                  <Route path=':category/:itemId' element={<Item />} />
                  <Route path='addItem' element={<AddItem />} />
                </Route>
              </Route>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter >
        </TokenProvider>
      </UserProvider>
    </>
  )
}

export default App