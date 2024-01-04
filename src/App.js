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
        <Route path='/' element={<Products />} />
        <Route path='/allUserRecipes' element={<GetUserRecipe />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/:id' element={<ProductsPage />} />
        <Route path='/add' element={<AddRecipe />} />
        <Route path='/edit/:userId' element={<EditRecipe />} />
      </Routes>
    </div>
  );
}

export default App;