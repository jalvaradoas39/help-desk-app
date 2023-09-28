import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      description,
    };

    await axios
      .post(`${import.meta.env.VITE_ROOT_URL}/api/ticket/create`, formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.successMsg, { theme: 'colored' });
      })
      .catch((err) => {
        console.log('error');
        console.error(err);
        toast.error(err.response.data.errorMsg, { theme: 'colored' });
      });
  };

  return (
    <main>
      <div className="row bg-secondary">
        <div className="col">
          <div className="text-white rounded p-5">
            <ToastContainer />
            <h1>Help Desk</h1>
            <p>Support system ticket management</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center p-5 my-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <input
                type="name"
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter request issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Home;
