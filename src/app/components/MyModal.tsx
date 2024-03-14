import React from "react";
import { Button, Modal as BootstrapModal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  message: string;
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean;
}

const MyModal: React.FC<ModalProps> = ({
  message = "Etres-vous sûr de vouloir continuer ?",
  show = false,
  onHide,
  onConfirm,
  showCancelButton = true,
}) => {
  return (
    <BootstrapModal show={show} onHide={onHide} centered>
      <BootstrapModal.Body>{message}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        {showCancelButton && (
          <Button variant="outline-danger" onClick={onHide}>
            <FontAwesomeIcon icon={faTimes} /> Annuler
          </Button>
        )}
        <Button
          variant="success"
          onClick={onConfirm}
          className={!showCancelButton ? "mx-auto" : ""}
        >
          Confirmer
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default MyModal;
