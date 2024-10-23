import React from 'react';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const Home = () => {
  const { isLoading }  = useSelector((state) => state.auth);

  if(isLoading) return <Loader />;

  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}

export default Home;