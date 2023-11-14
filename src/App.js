import "./App.css";
import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import axios from "axios";

// Lazy-loaded component for better code splitting
const CatList = lazy(() => import("./components/CatList"));

function App() {
  const [catList, setCatList] = useState([]);

  const fetchCatList = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json"
      );
      const data = response.data;
      renderCatList(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  // useEffect(() => {
  //   fetchCatList();
  // }, []);//throwing warning for empty [], so optimisation we can give the depedency array fetchCatList

  useEffect(() => {
    const fetchData = async () => {
      await fetchCatList();
    };
    fetchData();
  }, [fetchCatList]);

  const renderCatList = data => {
    const groupedCats = {};

    data.forEach(person => {
      if (person.pets) {
        person.pets
          .filter(pet => pet.type === "Cat")
          .forEach(cat => {
            const gender = person.gender.toLowerCase();
            groupedCats[gender] = groupedCats[gender] || [];
            groupedCats[gender].push(cat.name);
          });
      }
    });

    setCatList(groupedCats);
  };

  return (
    <div className="App">
      {/* Using Suspense for lazy-loaded component */}
      <Suspense fallback={<div>Loading...</div>}>
        <CatList catList={catList} />
      </Suspense>
    </div>
  );
}

export default App;
