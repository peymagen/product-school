import React from 'react';
// import Pageone from './pages/Pageone';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Acedmic from './components/Acedmic';
import Footer from './components/Footer';
import styles from './App.module.css'; 

const App = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <Acedmic />
      <Footer />
    </div>
    
  );
};


export default App;