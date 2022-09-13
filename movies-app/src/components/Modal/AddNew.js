import React from "react";
import AddNewMovie from "../Movies/AddNewMovie";
import AddNewGenre from "../Genres/AddNewGenre";
import { ButtonGroup, Button, Modal, Row, Col } from "react-bootstrap";

const AddNew = ({
  modalTitle,
  modalBody,
  showModal,
  onClickBtnAddNew,
  handleCloseAddNewModal,
}) => {
  //////////// Movies Modal ////////////
  const [addNewMovieModal, setAddNewMovieModal] = React.useState({
    isVisible: false,
  });

  const onClickAddNewMovie = () => {
    setAddNewMovieModal({ isVisible: true });

    handleCloseAddNewModal();
  };

  const closeAddNewMovieModal = () => {
    setAddNewMovieModal({ isVisible: false });
  };

  //////////// Genre Modal ////////////
  const [addNewGenreModal, setAddNewGenreModal] = React.useState({
    isVisible: false,
  });

  const onClickAddNewGenre = () => {
    setAddNewGenreModal({ isVisible: true });

    handleCloseAddNewModal();
  };

  const closeAddNewGenreModal = () => {
    setAddNewGenreModal({ isVisible: false });
  };

  ///////////////////////////////////////
  return (
    <>
      <ButtonGroup className="d-flex mb-5">
        <Button onClick={onClickBtnAddNew}>Add New</Button>
      </ButtonGroup>
      <Modal
        show={showModal.isVisible}
        onHide={handleCloseAddNewModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p style={{ textAlign: "center" }}>{modalBody}</p>

          <Row className="mb-3">
            <Col>
              <Button
                className="d-grid mx-auto"
                style={{ padding: "10px 50px 10px 50px" }}
                onClick={onClickAddNewMovie}
              >
                Add New Movie
              </Button>
            </Col>
            <Col className="mb-3">
              <Button
                className="d-grid mx-auto"
                style={{ padding: "10px 50px 10px 50px" }}
                onClick={onClickAddNewGenre}
              >
                Add New Genre
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <AddNewGenre
        addNewGenreModal={addNewGenreModal}
        closeAddNewGenreModal={closeAddNewGenreModal}
      />
      <AddNewMovie
        addNewMovieModal={addNewMovieModal}
        closeAddNewMovieModal={closeAddNewMovieModal}
      />
    </>
  );
};

export default AddNew;
