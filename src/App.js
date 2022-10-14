import logo from './logo.svg';
import './App.css';
import ParentProduct from './components/ParentProduct';
import { Route, Routes } from 'react-router-dom';
import ViewProduct from './components/ViewProduct';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <Routes>
          <Route path='/' element={<ParentProduct />} />
          <Route path='/viewDetails' element={<ViewProduct />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
