import { useState } from 'react'
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";


import './App.css'
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation.jsx";
import HomePage from './pages/HomePage/HomePage.jsx';
import MoviesPage from './pages/MoviesPage/MoviesPage.jsx';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import MovieCast from './components/MovieCast/MovieCast.jsx';
import MovieReviews from './components/MovieReviews/MovieReviews.jsx';


// const API_KEY = '3f558570f9406515e603e2277e2803a9';



function App() {
  

  return (

    <div className='body'>
     
       <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route
                path="reviews"
                element={<MovieReviews />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    
      
    </div>
  )
}

export default App
