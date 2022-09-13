/*

  Reusable Component
  
*/

import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";

function MoviesAppToast({ showToast, hideToast, toastBody }) {
  const [position, _setPosition] = React.useState("top-end");

  return (
    <ToastContainer position={position}>
      <Toast show={showToast} onClose={hideToast}>
        <Toast.Header>
          <strong className="me-auto">Notification ~ Movies App</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{toastBody}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MoviesAppToast;
