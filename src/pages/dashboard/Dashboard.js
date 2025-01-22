

import axios from "axios";
import React, { useEffect, useState } from "react";

export const  Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getdata")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
      });
  }, []);

  return (
    <div className="table-container">
      <h1>Product List</h1>
      




      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Product Details</th>
            <th>Product Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.productDetails}</td>
                <td>{item.productAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
