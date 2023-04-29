import { useEffect, useState } from "react";

export const ModalEdit = ({props}) => {
    const [id, setId] = useState(null)

    useEffect(()=>{
        setId(props.id)
    },[props.id])
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                {/* {props.id} */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" id="btn">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
