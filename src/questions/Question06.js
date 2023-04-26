import { useEffect, useState } from "react";

/*Create a React component that calls the habit tracker api and display only the habits which are unarchived with heading “Unarchived”. Create a show archive button and on click of show archive button show the archive habits and hide the unarchives. Change the heading of the page to “Archived” when the button is clicked. */
export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/habits") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            habits: [
              {
                title: "Drinking enough water",
                desc: "Aim to drink 5-6L of water each day to stay hydrated",
                daysFollowed: 7,
                daysSkipped: 3,
                archived: false
              },
              {
                title: "Exercise",
                desc:
                  "Track your workouts and aim to exercise a certain number of days per week",
                daysFollowed: 10,
                daysSkipped: 4,
                archived: true
              },
              {
                title: "Meditation",
                desc:
                  "Track your daily meditation practice and try to increase the length of your sessions over time",
                daysFollowed: 30,
                daysSkipped: 7,
                archived: true
              },
              {
                title: "Gratitude",
                desc: "Write down something you are grateful for each day",
                daysFollowed: 11,
                daysSkipped: 5,
                archived: false
              },
              {
                title: "Saving Money",
                desc:
                  "Track your expenses and set a goal to save a certain amount of money each month",
                daysFollowed: 40,
                daysSkipped: 15,
                archived: false
              }
            ]
          }
        });
      } else {
        reject({
          status: 404,
          message: "Habits not found."
        });
      }
    }, 2000);
  });
};

export function HabitTracker() {
  const [data, setData] = useState([]);
  const [isArchived, setArchived] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/habits");
      setData(response.data.habits);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{!isArchived ? "Un Archieved" : "Archieved"}</h1>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {data
          .filter((item) => item.archived === isArchived)
          .map(({ title, desc, daysFollowed, daysSkipped }) => (
            <li>
              <h3>{title}</h3>
              <p>{desc}</p>
              <p>
                <strong>Days Followed:</strong>
                {daysFollowed}
              </p>
              <p>
                <strong>Days Skipped:</strong>
                {daysSkipped}
              </p>
              <hr />
            </li>
          ))}
      </ul>
      <button onClick={() => setArchived(!isArchived)}>Show archives</button>
    </div>
  );
}
