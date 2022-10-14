import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import './parentProduct.css'
import Navbar from './Navbar';
import ImagePage from './ImagePage';
import FetchApi from './FetchApi';
import About from './About';

const pages = ['HOME', 'PRODUCTS', 'ABOUT US','CONTACT US','FAQS'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ParentProduct() {
  
  return (
  <div>
    <Navbar/>
    <ImagePage/>
    <FetchApi />
    <About/>
  </div>
)
}

export default ParentProduct