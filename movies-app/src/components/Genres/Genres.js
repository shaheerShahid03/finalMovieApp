import React from "react";
import { useGenresDataContext } from "../../context/genresDataContext";
import { useActiveGenreContext } from "../../context/activeGenreContext";
import { Tab, ListGroup } from "react-bootstrap";

const Genres = () => {
  const [activeGenre, { handleActiveGenreChange }] = useActiveGenreContext();
  const [genresData, _handleGenresDataChange] = useGenresDataContext();
  const handleShowAllMovies = () => {
    handleActiveGenreChange({
      name: "All Movies",
      id: "0",
    });

    return;
  };

  const handleSelectGenre = (genre) => {
    handleActiveGenreChange({
      name: genre.name,
      id: genre._id,
    });

    return;
  };

  return (
    <Tab.Container id="genreListGroup" defaultActiveKey={activeGenre.name}>
      <ListGroup as="ul">
        <ListGroup.Item
          as="li"
          action
          href="All Movies"
          onClick={handleShowAllMovies}
          style={{ cursor: "pointer" }}
        >
          All Movies
        </ListGroup.Item>
        {genresData.map((genre) => {
          return (
            <ListGroup.Item
              as="li"
              key={genre._id}
              onClick={() => {
                handleSelectGenre(genre);
              }}
              action
              href={genre.name}
              style={{ cursor: "pointer" }}
            >
              {genre.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Tab.Container>
  );
};

export default Genres;
