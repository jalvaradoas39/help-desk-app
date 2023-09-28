import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

function Admin() {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});
  const [id, setId] = useState('');

  const fetchTickets = async () => {
    await axios
      .get(`${import.meta.env.VITE_ROOT_URL}/api/ticket`)
      .then((res) => {
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTicketById = async () => {
    await axios
      .get(`${import.meta.env.VITE_ROOT_URL}/api/ticket/${id}`)
      .then((res) => {
        setTicket(res.data.ticket);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!tickets.length) {
      fetchTickets();
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchTicketById(id);
    }
  }, [id]);

  return (
    <main>
      <div className="row bg-secondary">
        <div className="col">
          <div className="text-white rounded p-5">
            <h1>Admin Dashboard</h1>
            <p>Support system ticket management</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center p-5 my-5">
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ticket #</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((t) => (
                  <tr key={t._id}>
                    <td scope="row">{t._id}</td>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.description.substr(1, 10)}...</td>
                    <td
                      className={`badge rounded-pill mt-2 ${
                        t.status === 'New' && 'bg-warning'
                      }  ${t.status === 'In Progress' && 'bg-info'} ${
                        t.status === 'Resolved' && 'bg-success'
                      }`}
                    >
                      {t.status}
                    </td>
                    <td>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setId(t._id)}
                      >
                        <i className="fa fa-edit fa-sm"></i>
                      </button>
                      {/* Modal */}
                      <Modal ticket={ticket} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Admin;
