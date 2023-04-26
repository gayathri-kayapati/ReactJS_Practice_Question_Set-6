import { useEffect, useState } from "react";

/*Create a React component that calls the todo api and display the todos in an unordered list and show the todos as a list. The todo should display a heading with a little description of what that todo is about. Under that, it should display all the tasks to be done as a list. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/todos") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            todos: [
              {
                title: "Go Outside",
                desc: "Get some fresh air",
                todos: ["shopping", "cricket", "walking"]
              },
              {
                title: "Let's Work",
                desc: "Deadline closes in 3 days",
                todos: ["Feature update", "Team Meet", "Code Walkthrough"]
              },
              {
                title: "Home Work",
                desc: "To be done on priority",
                todos: ["Fix tap", "Wedding function"]
              }
            ]
          }
        });
      } else {
        reject({
          status: 404,
          message: "Todo list not found."
        });
      }
    }, 2000);
  });
};

export function TodoList() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/todos");
      setData(response.data.todos);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {data.map(({ title, desc, todos }) => (
          <li>
            <h1>
              {title}:{desc}
            </h1>
            <ol>
              {todos.map((todo) => (
                <li>{todo}</li>
              ))}
            </ol>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
