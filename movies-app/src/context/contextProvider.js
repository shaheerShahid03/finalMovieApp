import React from "react";
import { AuthProvider } from "./authContext";
import { GenresDataProvider } from "./genresDataContext";
import { ActiveGenreProvider } from "./activeGenreContext";
import { MoviesDataProvider } from "./moviesDataContext";

export default function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <GenresDataProvider>
        <ActiveGenreProvider>
          <MoviesDataProvider>{children}</MoviesDataProvider>
        </ActiveGenreProvider>
      </GenresDataProvider>
    </AuthProvider>
  );
}
