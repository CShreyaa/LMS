import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BooksSection = ({ data }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/deleteBook/${id}`);
      alert("Book deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/editBook/${id}`);
  };

  return (
    <div className="d-flex justify-content-around align-items-center flex-wrap">
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="m-3"
            style={{
              width: "200px",
              height: "350px",
              border: "3.5px solid black",
              borderRadius: "20px",
            }}
          >
            <div>
              <img
                style={{
                  width: "200px",
                  height: "210px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
                className="img-fluid"
                src={item.image}
                alt="/"
              />
            </div>
            <h6
              style={{ fontSize: "15px" }}
              className="px-2 my-1 text-dark"
            >
              {item.bookname.slice(0, 20)}...
            </h6>
            <b style={{ fontSize: "30px", color: "red" }} className="px-2">
              Rs. {item.price}
            </b>
            <div className="d-flex justify-content-around align-items-center my-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(item._id)}
              >
                UPDATE
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item._id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BooksSection;
