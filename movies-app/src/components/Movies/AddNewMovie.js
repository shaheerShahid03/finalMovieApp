import React from "react";
import { useMoviesDataContext } from "../../context/moviesDataContext";
import { useGenresDataContext } from "../../context/genresDataContext";
import { v4 as uuid } from "uuid";
import MovieForm from "../Modal/MovieForm";
import Toast from "../Toast/Toast";

const AddNewMovie = ({ addNewMovieModal, closeAddNewMovieModal }) => {
  const [moviesData, { handleMoviesDataChange }] = useMoviesDataContext();
  const [genresData, _handleGenresDataChange] = useGenresDataContext();
  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [stock, setStock] = React.useState();
  const [rate, setRate] = React.useState();
  const [genreDetails, setGenreDetails] = React.useState();
  const [showNewMovieToast, setShowNewMovieToast] = React.useState(false);

  //////////// Input Change Handlers ////////////
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleGenreChange = (event) => {
    if (event.target.value === "selectGenre") {
      console.log("Please Select Genre");
      setGenre("");
      return;
    }

    setGenre(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  //////////// Finding Genre Details to insert movie.genre._id ////////////
  React.useEffect(() => {
    const matchedGenre = genresData.filter((obj) => {
      return obj.name === genre;
    });

    if (matchedGenre) {
      setGenreDetails(matchedGenre);
      return;
    }

    alert("no matching genre data");
  }, [genre]);

  //////////// Form Submit ////////////
  const handleAddNewMovie = (event) => {
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

    const unique_id = uuid().slice(0, 8); // generating unique_id for new movie

    handleMoviesDataChange([
      {
        _id: unique_id,
        title: title,
        genre: {
          _id: genreDetails[0]._id,
          name: genreDetails[0].name,
        },
        numberInStock: stock,
        dailyRentalRate: rate,
      },
      ...moviesData,
    ]);

    closeAddNewMovieModal();
    setShowNewMovieToast(true);

    event.preventDefault();
  };

  //////////// Toast ////////////
  const closeShowNewMovieToast = () => setShowNewMovieToast(!showNewMovieToast);

  return (
    <>
      <MovieForm
        modalTitle="Add New Movie"
        modalBody="Enter the details of the movie you want to add."
        submitButton="Add"
        showModal={addNewMovieModal}
        title={title}
        genre={genre}
        stock={stock}
        rate={rate}
        handleTitleChange={handleTitleChange}
        handleGenreChange={handleGenreChange}
        handleStockChange={handleStockChange}
        handleRateChange={handleRateChange}
        handleFormSubmit={handleAddNewMovie}
        handleCloseModal={closeAddNewMovieModal}
      />

      <Toast
        showToast={showNewMovieToast}
        hideToast={closeShowNewMovieToast}
        toastBody="New movie added successfully!"
      />
    </>
  );
};

export default AddNewMovie;
