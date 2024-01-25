import { useEffect } from "react";
import { useState } from "react";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      const resInJSON = await response.json();
      setData(resInJSON);
    } catch (error) {
      console.log(error);
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageClick = (selPage) => {
    if (selPage >= 1 && selPage <= Math.ceil(data.length / 10))
      setPage(selPage);
  };

  return (
    <div className="employee__section">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(page * 10 - 10, page * 10).map((cur) => {
            return (
              <tr key={cur.id}>
                <td>{cur.id}</td>
                <td>{cur.name}</td>
                <td>{cur.email}</td>
                <td>{cur.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* button  */}
      <div className="btns">
        <button className="prevBtn" onClick={() => handlePageClick(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button className="nextBtn" onClick={() => handlePageClick(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
