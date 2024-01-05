import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/ProductsPage/Products';
import ProductsPage from './components/ProductsPage/ProductsPage';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { useDispatch } from "react-redux";
import { login } from './redux/authSlice';
import AddRecipe from './components/UserRecipe/AddRecipe/AddRecipe';
import EditRecipe from './components/UserRecipe/EditRecipe/EditRecipe';
import GetUserRecipe from './components/UserRecipe/GetUserRecipe/GetUserRecipe';
import UserProductsPage from './components/UserRecipe/GetUserRecipe/UserProductsPage';
import YourProductsPage from './components/UserRecipe/YourRecipe/YourProductsPage'
import Home from './components/Home/Home';

function App() {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    dispatch(login(storedToken));
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allUserRecipes' element={<GetUserRecipe />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/:id' element={<ProductsPage />} />
        <Route path='/user/:id' element={<UserProductsPage />} />
        <Route path='/your/:id' element={<YourProductsPage />} />
        <Route path='/add' element={<AddRecipe />} />
        <Route path='/edit/:id' element={<EditRecipe />} />
      </Routes>
    </div>
  );
}

export default App;