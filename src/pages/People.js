import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

import Header from "../components/Header";
import Chart from "../components/Chart";
import Table from "../components/Table";

function reducer(state, action) {
  return action;
}

const People = () => {
  const [state, dispatch] = useReducer(reducer, {
    people: [],
    nav: {},
    page: 1,
    chart: [[], [], []],
  });
  const { people, nav, page, chart } = state;
  console.log(state);

  const [url, setUrl] = useState("https://swapi.dev/api/people");
  const [countPage, setCountPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const prev = () => {
    setUrl(nav.prev);
    setCountPage(countPage - 1);
  };

  const next = () => {
    setUrl(nav.next);
    setCountPage(countPage + 1);
  };

  console.log(countPage);

  useEffect(() => {
    const getPeople = async () => {
      try {
        if (localStorage.key !== `page-${countPage}`) {
          setLoading(true);
          const { data } = await axios.get(url, {
            headers: {
              "Content-type": "application/json",
            },
          });

          const peopleName = data.results.map((people) => {
            return people.name;
          });
          const peopleHeight = data.results.map((people) => {
            return people.height;
          });
          const peopleMass = data.results.map((people) => {
            return people.mass;
          });

          dispatch({
            people: data.results,
            nav: { next: data.next, prev: data.previous },
            page: countPage,
            chart: [peopleName, peopleHeight, peopleMass],
          });

          localStorage.setItem(
            `page-${countPage}`,
            JSON.stringify(data.results)
          );
          localStorage.setItem(
            `chart-${countPage}`,
            JSON.stringify([peopleName, peopleHeight, peopleMass])
          );

          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getPeople();
  }, [url]);

  return (
    <div>
      {loading && (
        <div className="loading">
          <h2>Loading ...</h2>
        </div>
      )}
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="people">
              <div className="header">
                <h3 className="title text-dark">All People</h3>
                <span className="font-weight-bold">Page {page}</span>
              </div>
              <Table peoples={people} page={page} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="chart">
              <Chart chart={chart} page={page} />
            </div>
          </div>
        </div>
        <div className="text-center mb-2">
          <span className="font-weight-bold">Page {page}</span>
        </div>
        <div className="navigation text-center">
          <button
            className="btn btn-sm btn-outline-primary mr-2"
            onClick={prev}
            disabled={nav?.prev == null ? true : false}>
            Prev
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={next}
            disabled={nav?.next == null ? true : false}>
            Next
          </button>
        </div>
      </div>
      <div className="footer mt-4 bg-dark py-4">
        <p className="text-center text-white m-0">
          Qlue Performa Indonesia Test @ Achmad Fajar 2021
        </p>
      </div>
    </div>
  );
};

export default People;
