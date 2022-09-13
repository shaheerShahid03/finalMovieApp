/*

  Reusable Component
  
*/

import React from "react";
import { useGenresDataContext } from "../../context/genresDataContext";
import { Button, Modal, Form, Row, Col, FloatingLabel } from "react-bootstrap";

const MovieForm = ({
  modalTitle,
  modalBody,
  submitButton,
  showModal,
  title,
  genre,
  stock,
  rate,
  handleTitleChange,
  handleGenreChange,
  handleStockChange,
  handleRateChange,
  handleFormSubmit,
  handleCloseModal,
}) => {
  const [genresData, _handleGenresDataChange] = useGenresDataContext();
  return (
    <Modal
      show={showModal.isVisible}
      onHide={handleCloseModal}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{modalBody}</p>

        <Form onSubmit={handleFormSubmit}>
          <Row className="mt-4">
            <Form.Group as={Col}>
              <FloatingLabel label="Title">
                <Form.Control
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="title"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel label="Genre">
                <Form.Select value={genre} onChange={handleGenreChange}>
                  <option id="0" value="selectGenre">
                    Select Genre
                  </option>
                  {genresData.map((genre, index) => {
                    return (
                      <option key={genre._id} value={genre.name} id={genre._id}>
                        {genre.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel label="Stock">
                <Form.Control
                  type="number"
                  value={stock || ""}
                  onChange={handleStockChange}
                  placeholder="stock"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel label="Rate">
                <Form.Control
                  type="number"
                  value={rate || ""}
                  onChange={handleRateChange}
                  placeholder="rate"
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Button
            type="submit"
            className="d-grid mx-auto"
            style={{ padding: "10px 50px 10px 50px" }}
          >
            {submitButton}
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieForm;
