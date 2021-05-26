import React, { useEffect, useState } from "react";

const Table = ({ peoples, page }) => {
  const [data, setData] = useState();

  const countPages = page * (10 / page) * (page - 1);

  useEffect(() => {
    const getDataFromLS = () => {
      if (localStorage.key === `page-${page}`) {
        setData(JSON.parse(localStorage.getItem(`page-${page}`)));
      } else {
        setData(peoples);
      }
    };
    getDataFromLS();
  }, [peoples]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" className="text-center">
              Height
            </th>
            <th scope="col" className="text-center">
              Mass
            </th>
            <th scope="col" className="text-center">
              Hair Color
            </th>
            <th scope="col" className="text-center">
              Skin Color
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((people, index) => (
            <tr key={index}>
              <th scope="row">{countPages + index + 1}</th>
              <td>{people.name}</td>
              <td className="text-center">{people.height}</td>
              <td className="text-center">{people.mass}</td>
              <td className="text-center">{people.hair_color}</td>
              <td className="text-center">{people.skin_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
