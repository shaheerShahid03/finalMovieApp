import React from "react";
import { useActiveGenreContext } from "../../context/activeGenreContext";
import { useMoviesDataContext } from "../../context/moviesDataContext";
import SearchBar from "../SearchBar/SearchBar";
import MoviesTable from "./MoviesTable";
import Pagination from "../Pagination/Pagination";
import ConfirmationModal from "../Modal/ConfirmationModal";
import EditMovie from "./EditMovie";

const Movies = () => {
  const [activeGenre, _handleActiveGenreChange] = useActiveGenreContext();
  const [moviesData, { handleMoviesDataChange }] = useMoviesDataContext();
  const [searchInput, setSearchInput] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("Ascending");
  const [directDeleteMovie, setDirectDeleteMovie] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState({
    isVisible: false,
    targetId: null,
  });
  const [editMovieDetails, setEditMovieDetails] = React.useState();
  const [showEditModal, setShowEditModal] = React.useState({
    isVisible: false,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [moviesPerPage] = React.useState(4);

  //////////// Filter by Genre ////////////
  const filterMovies = moviesData.filter((movie) => {
    if (activeGenre.id === "0") {
      // id: "0" means All Movies
      return movie.genre._id !== activeGenre.id;
    }
    return movie.genre._id === activeGenre.id;
  });

  //////////// Search ////////////
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  //////////// Sort ////////////
  const handleSortOrder = (colPath) => {
    orderBy === "Ascending"
      ? setOrderBy("Descending")
      : setOrderBy("Ascending");
    sortMovies(orderBy, colPath);
  };

  const sortMovies = (orderBy, colPath) => {
    if (colPath === "genre") {
      orderBy === "Ascending"
        ? moviesData.sort((prevMovie, nextMovie) =>
            prevMovie.genre.name > nextMovie.genre.name ? 1 : -1
          )
        : moviesData.sort((prevMovie, nextMovie) =>
            prevMovie.genre.name < nextMovie.genre.name ? 1 : -1
          );
      handleMoviesDataChange(moviesData);
      return;
    }

    orderBy === "Ascending"
      ? moviesData.sort((prevMovie, nextMovie) =>
          prevMovie[colPath] > nextMovie[colPath] ? 1 : -1
        )
      : moviesData.sort((prevMovie, nextMovie) =>
          prevMovie[colPath] < nextMovie[colPath] ? 1 : -1
        );

    handleMoviesDataChange(moviesData);
    return;
  };

  //////////// Delete ////////////
  const deleteMovie = (id) => {
    handleMoviesDataChange(moviesData.filter((movie) => movie._id !== id));
  };

  const handleDeleteMovie = (id) => {
    if (!directDeleteMovie) {
      setDeleteModal({
        isVisible: true,
        targetId: id,
      });
      return;
    }

    deleteMovie(id);
  };

  const handleBtnConfirmDelete = () => {
    deleteMovie(deleteModal.targetId);

    setDeleteModal({
      isVisible: false,
      targetId: null,
    });

    return;
  };

  const handleDirectDeleteMovieIsChecked = (event) => {
    if (event.target.checked) {
      setDirectDeleteMovie(true);
    }

    return;
  };

  const handleBtnCloseDeleteModal = () => {
    setDeleteModal({
      isVisible: false,
      targetId: null,
    });
    setDirectDeleteMovie(false);

    return;
  };

  //////////// Pagination ////////////
  const indexOfFirstMovie = currentPage * moviesPerPage - moviesPerPage;
  const indexOfLastMovie = currentPage * moviesPerPage - 1;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalMovies = filterMovies.length;

  const searchedFiltered = filterMovies.filter((movie) =>
    movie.title.toLowerCase().startsWith(searchInput.toLowerCase())
  );
  // paginating
  const moviesToShow = searchedFiltered.filter((_movie, index) => {
    if (index >= indexOfFirstMovie && index <= indexOfLastMovie) {
      return true;
    }

    return false;
  });

  //////////// Edit Movie ////////////
  const handleEditMovie = (movie) => {
    setEditMovieDetails(movie);

    setShowEditModal({
      isVisible: true,
    });
  };

  const handleCloseModal = () => {
    setShowEditModal({
      isVisible: false,
    });
  };

  ///////////////////////////////

  return (
    <>
      {filterMovies.length === 0 ? (
        <p className="mt-4 text-md-right text-center">
          No movies available in the database!
        </p>
      ) : (
        <>
          <p className="mt-4 text-md-right text-center">
            Showing {filterMovies.length} movies in the database.
          </p>

          <SearchBar
            placeholder="Search movie by title"
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
            handleClearInput={handleClearInput}
          />

          <MoviesTable
            moviesToShow={moviesToShow}
            orderBy={orderBy}
            handleSortOrder={handleSortOrder}
            handleDeleteMovie={handleDeleteMovie}
            handleEditMovie={handleEditMovie}
          />

          <Pagination
            itemsPerPage={moviesPerPage}
            totalItems={totalMovies}
            paginate={paginate}
            currentPage={currentPage}
          />

          <ConfirmationModal
            modalTitle="Delete Movie"
            modalDescription="Are you sure you want to delete this movie?"
            showModal={deleteModal}
            handleBtnClose={handleBtnCloseDeleteModal}
            handleBtnConfirm={handleBtnConfirmDelete}
            handleRememberIsChecked={handleDirectDeleteMovieIsChecked}
          />

          <EditMovie
            showModal={showEditModal}
            handleCloseModal={handleCloseModal}
            currentMovie={editMovieDetails}
          />
        </>
      )}
    </>
  );
};

export default Movies;
