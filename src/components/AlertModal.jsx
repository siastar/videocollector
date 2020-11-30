import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const AlertModal = props => {
  console.log("alertModal props:", props);
  let modalBody = (
    <>
      {/* <Button variant="primary" onClick={console.log("click")}> */}
      {/*   Launch demo modal */}
      {/* </Button> */}

      <Modal show={props.modalData.show} onHide={console.log("hide")}>
        <Modal.Header closeButton>
          <Modal.Title>alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalData.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.modalHandlers.shutAlertModal}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={console.log("hide")}> */}
          {/*   Save Changes */}
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
  return modalBody;
};
