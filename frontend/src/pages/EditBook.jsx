import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ bookname: "", author: "", description: "", image: "", price: "" });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/getBooks/${id}`);
        setData(res.data.book);
      } catch (error) {
        console.error("There was an error fetching the book data!", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/api/v1/updateBooks/${id}`, data);
      alert("Book updated successfully");
      navigate("/books");
    } catch (error) {
      console.error("There was an error updating the book!", error);
    }
  };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center" style={{ minHeight: "91.5vh" }}>
      <div className="container p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Book Name</label>
            <input type="text" className="form-control" name="bookname" value={data.bookname} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Author</label>
            <input type="text" className="form-control" name="author" value={data.author} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Description</label>
            <input type="text" className="form-control" name="description" value={data.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Image</label>
            <input type="text" className="form-control" name="image" value={data.image} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Price</label>
            <input type="number" className="form-control" name="price" value={data.price} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
