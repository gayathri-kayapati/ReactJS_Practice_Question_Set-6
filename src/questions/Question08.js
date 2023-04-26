import { useEffect, useState } from "react";

/*Create a React component that calls the userProfile api and list the details of the user when the page loads. Create a button saying Update name and on click of that button, change the name of the user. */
export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/profile") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            profiles: {
              name: "John",
              age: 30,
              gender: "male",
              email: "john@example.com",
              occupation: "Software Engineer"
            }
          }
        });
      } else {
        reject({
          status: 404,
          message: "User Profile not found."
        });
      }
    }, 2000);
  });
};

export function UserProfiles() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/profile");
      setData(response.data.profiles);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateName = () => {
    const updatedName = { ...data, name: "Chinna" };
    setData(updatedName);
  };
  return (
    <div>
      <h1>User Profile</h1>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {Object.keys(data).map((key) => (
          <li>
            <strong>{key}:</strong>
            {data[key]}
          </li>
        ))}
      </ul>
      <button onClick={updateName}>Update name</button>
    </div>
  );
}
