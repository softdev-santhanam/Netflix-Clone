import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import Payment from "./components/Payment";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/index";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebase-config";
import { useEffect } from "react";

export default function App() {
  const user = useSelector(selectUser)

  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({ 
            uid: currentUser.uid,
            email: currentUser.email
          })
        );
      }
      else {
        dispatch(logout());
      }
    });
    return unsubscribe;
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/myList" element={<UserListedMovies />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}
