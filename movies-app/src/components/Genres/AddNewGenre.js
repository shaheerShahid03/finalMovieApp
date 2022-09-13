import React from "react";
import { useGenresDataContext } from "../../context/genresDataContext";
import { v4 as uuid } from "uuid";
import GenreForm from "../Modal/GenreForm";
import Toast from "../Toast/Toast";

const AddNewGenre = ({ addNewGenreModal, closeAddNewGenreModal }) => {
  const [genresData, { handleGenresDataChange }] = useGenresDataContext();
  const [genreName, setGenreName] = React.useState("");
  const [showNewGenreToast, setShowNewGenreToast] = React.useState(false);

  const handleGenreInputChange = (event) => {
    setGenreName(event.target.value);
  };

  const handleAddNewGenre = (event) => {
    // validating for empty input
    if (genreName === "") {
      alert("Genre name is missing, please enter correctly.");
      event.preventDefault();
      return;
    }

    const matchedGenre = genresData.filter((data) => {
      return data.name === genreName;
    });

    if (matchedGenre.length !== 0) {
      alert("Genre with the same name already exist.");
      event.preventDefault();
      return;
    }

    const unique_id = uuid().slice(0, 8);

    handleGenresDataChange([
      {
        name: genreName,
        _id: unique_id,
      },
      ...genresData,
    ]);

    closeAddNewGenreModal();
    setShowNewGenreToast(true);

    event.preventDefault();
  };

  //////////// Toast ////////////
  const closeShowNewGenreToast = () => setShowNewGenreToast(!showNewGenreToast);

  return (
    <>
      <GenreForm
        modalTitle="Create New Genre"
        modalBody="Enter the details to create a new Genre"
        submitButton="Create"
        showModal={addNewGenreModal}
        input={genreName}
        handleInputChange={handleGenreInputChange}
        handleFormSubmit={handleAddNewGenre}
        handleCloseModal={closeAddNewGenreModal}
      />
      <Toast
        showToast={showNewGenreToast}
        hideToast={closeShowNewGenreToast}
        toastBody="New Genre created successfully!"
      />
    </>
  );
};

export default AddNewGenre;
