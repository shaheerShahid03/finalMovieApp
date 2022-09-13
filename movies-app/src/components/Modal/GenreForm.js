/*

  Reusable Component
  
*/

import React from "react";
import { Button, Modal, Form, Row, Col, FloatingLabel } from "react-bootstrap";

const GenreForm = ({
  modalTitle,
  modalBody,
  submitButton,
  showModal,
  input,
  handleInputChange,
  handleFormSubmit,
  handleCloseModal,
}) => {
  return (
    <Modal
      show={showModal.isVisible}
      onHide={handleCloseModal}
      size="md"
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
              <FloatingLabel label="Genre Name">
                <Form.Control
                  type="text"
                  required
                  value={input}
                  onChange={handleInputChange}
                  placeholder="name"
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Button
            type="submit"
            className="d-grid mx-auto mt-4"
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

export default GenreForm;
