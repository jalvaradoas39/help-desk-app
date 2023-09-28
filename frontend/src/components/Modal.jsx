import { useState } from 'react';
import axios from 'axios';

const Modal = ({ ticket }) => {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      status,
      response,
    };

    await axios
      .put(
        `${import.meta.env.VITE_ROOT_URL}/api/ticket/${ticket._id}`,
        formData
      )
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log('error');
        console.error(err);
      });
  };

  return (
    <>
      {ticket && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Ticket # {ticket._id}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Name"
                      value={ticket.name}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="email"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Email"
                      value={ticket.email}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      id="inputState"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Request issue"
                      value={ticket.description}
                      disabled
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Your response"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <hr />
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
