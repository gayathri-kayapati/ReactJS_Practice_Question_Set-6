import { useEffect, useState } from "react";

/*Create a React component that calls the video api and display all the details of the video on the screen. And on click of add label button, add a label property to the object and display the details on the screen */
export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/getvideo") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            videos: {
              title: "The Power of Habit",
              thumbnail: "https://picsum.photos/250/130",
              views: 1000000,
              likes: 50000
            }
          }
        });
      } else {
        reject({
          status: 404,
          message: "Video not found."
        });
      }
    }, 2000);
  });
};
export function DisplayVedioDetails() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/getvideo");
      setData(response.data.videos);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clickhandler = () => {
    const newData = { ...data, Label: "Self Motivational" };
    setData(newData);
  };
  return (
    <div>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {Object.keys(data).map((key, idx) =>
          key === "thumbnail" ? (
            <img src={data.thumbnail} alt="Video Thumbnail" />
          ) : key === "title" ? (
            <h1>{data.title}</h1>
          ) : (
            <li key={idx}>
              <strong>{key.replace(/^./, key[0].toUpperCase())}:</strong>
              {data[key]}
            </li>
          )
        )}
        <button onClick={clickhandler}>Add Label</button>
      </ul>
    </div>
  );
}
