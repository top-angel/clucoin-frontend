import React from "react";
import Button from "./Button";

interface Props {
  loading?: boolean;
  onCancel: (e) => void;
  onSubmit: (e) => Promise<any>;
}

const ChangesModal = ({ loading, onCancel, onSubmit }: Props) => {
  return (
    <div className="changes-modal">
      <div className="Container">
        <div className="modal">
          <span>Careful - You have unsaved changes!</span>
          <div className="buttons">
            <button onClick={onCancel} className="reset-button">
              Reset
            </button>
            <Button onClick={onSubmit} loading={loading} type="submit">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangesModal;
