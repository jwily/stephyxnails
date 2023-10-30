import React from 'react';

function AllSubmissions({ submissions }) {

  console.log(submissions, 'hello')
  return (
    <div>
      <ul>
        {submissions.map((data, index) => (
          <li key={index}>{data}
          </li>

        ))}
      </ul>
    </div>
  );
}

export default AllSubmissions;