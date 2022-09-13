import React from "react";
import GenresDataJSON from "../data/genres.json";

const CreateGenresDataContext = React.createContext(undefined);
const CreateGenresDataDispatchContext = React.createContext(undefined);

function GenresDataProvider({ children }) {
  const [genresData, setGenresData] = React.useState(GenresDataJSON);

  const handleGenresDataChange = (genresData) => {
    setGenresData(genresData);
  };

  return (
    <CreateGenresDataContext.Provider value={genresData}>
      <CreateGenresDataDispatchContext.Provider
        value={{ handleGenresDataChange }}
      >
        {children}
      </CreateGenresDataDispatchContext.Provider>
    </CreateGenresDataContext.Provider>
  );
}

const useCreateGenresDataContext = () => {
  const context = React.useContext(CreateGenresDataContext);

  if (context === undefined) {
    throw Error("useCreateGenresDataContext must be inside GenresDataProvider");
  }

  return context;
};

const useCreateGenresDataDispatchContext = () => {
  const context = React.useContext(CreateGenresDataDispatchContext);

  if (context === undefined) {
    throw Error(
      "useCreateGenresDataDispatchContext must be inside GenresDataProvider"
    );
  }

  return context;
};

const useGenresDataContext = () => {
  return [useCreateGenresDataContext(), useCreateGenresDataDispatchContext()];
};

export { GenresDataProvider, useGenresDataContext };
