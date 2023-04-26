import { useEffect, useState } from "react";

/*Create a React component that calls the socialMedia profile api and when the page is loaded show details of the user and a button follow along with the name of the user on the button. On click of that increase the followers count by one and disable the button. */
export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/profile") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            profile: {
              name: "John",
              age: 30,
              gender: "male",
              email: "john@example.com",
              occupation: "Software Engineer",
              followers: 450,
              followedBy: 400
            }
          }
        });
      } else {
        reject({
          status: 404,
          message: "Profile not found."
        });
      }
    }, 2000);
  });
};

export function SocialMediaProfile() {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/profile");
      setData(response.data.profile);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    const newData = { ...data, followers: data.followers + 1 };
    setData(newData);
    setFlag(true);
  };

  return (
    <div>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {Object.keys(data).map((key) =>
          key === "name" ? (
            <h1>{data.name}</h1>
          ) : (
            <li>
              {/* <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> */}
              <strong>{key.replace(/^./, key[0].toUpperCase())}:</strong>
              {data[key]}
            </li>
          )
        )}
        <button onClick={clickHandler} disabled={flag}>
          Follow John
        </button>
      </ul>
    </div>
  );
}
