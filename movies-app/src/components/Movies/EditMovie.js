import React from "react";
import { useMoviesDataContext } from "../../context/moviesDataContext";
import MovieForm from "../Modal/MovieForm";
import Toast from "../Toast/Toast";

const EditMovie = ({ currentMovie, showModal, handleCloseModal }) => {
  const [moviesData, { handleMoviesDataChange }] = useMoviesDataContext();
  const [movieDetails, setMovieDetails] = React.useState();
  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [stock, setStock] = React.useState();
  const [rate, setRate] = React.useState();
  const [showToast, setShowToast] = React.useState(false);

  ////////// creating a new state from currentMovie //////////
  React.useEffect(() => {
    if (showModal.isVisible) {
      setMovieDetails(currentMovie);
    }
  }, [showModal.isVisible === true]);

  ////////// setting states of form inputs //////////
  React.useEffect(() => {
    if (movieDetails) {
      setTitle(movieDetails.title);
      setGenre(movieDetails.genre.name);
      setStock(movieDetails.numberInStock);
      setRate(movieDetails.dailyRentalRate);
    }
  });

  ////////// Input Change Handlers  //////////
  const handleTitleChange = (event) => {
    setMovieDetails({ ...movieDetails, title: event.target.value });
  };

  const handleGenreChange = (event) => {
    if (event.target.value === "selectGenre") {
      alert("Please Select Genre");
      return;
    }

    setMovieDetails({
      ...movieDetails,
      genre: {
        name: event.target.value,
        _id: event.target[event.target.selectedIndex].id,
      },
    });
  };

  const handleStockChange = (event) => {
    setMovieDetails({ ...movieDetails, numberInStock: event.target.value });
  };

  const handleRateChange = (event) => {
    setMovieDetails({ ...movieDetails, dailyRentalRate: event.target.value });
  };

  ////////// Update Function  //////////
  const handleUpdate = (id, movie) => {
    const updatedMovie = moviesData.map((data) => {
      return data._id === id ? movie : data;
    });

    handleMoviesDataChange(updatedMovie);
  };

  const editFormSubmit = (event) => {
    // validating for empty inputs
    if (
      title === "" ||
      genre === "" ||
      stock === undefined ||
      stock === "" ||
      rate === undefined ||
      rate === ""
    ) {
      alert("Details are missing, please enter again.");
      event.preventDefault();
      return;
    }

    handleUpdate(movieDetails._id, movieDetails);

    setShowToast(true);
    handleCloseModal();

    event.preventDefault();
  };

  const hideEditMovieToast = () => setShowToast(!showToast);

  ////////////////////////////////////////////

  return (
    <>
      <MovieForm
        modalTitle="Edit Movie"
        modalBody="Edit the details of the movie you want."
        submitButton="Update"
        showModal={showModal}
        title={title}
        genre={genre}
        stock={stock}
        rate={rate}
        handleTitleChange={handleTitleChange}
        handleGenreChange={handleGenreChange}
        handleStockChange={handleStockChange}
        handleRateChange={handleRateChange}
        handleFormSubmit={editFormSubmit}
        handleCloseModal={handleCloseModal}
      />
      <Toast
        showToast={showToast}
        hideToast={hideEditMovieToast}
        toastBody="Movie updated successfully!"
      />
    </>
  );
};

export default EditMovie;
