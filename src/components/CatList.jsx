import React from "react";

const CatList = ({ catList }) => {
  return (
    <>
      <h1>Cat-List</h1>
      {Object.keys(catList).map(gender => (
        <div key={gender}>
          <h2>{gender.charAt(0).toUpperCase() + gender.slice(1)}</h2>
          <ul>
            {catList[gender].sort().map(cat => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default CatList;
