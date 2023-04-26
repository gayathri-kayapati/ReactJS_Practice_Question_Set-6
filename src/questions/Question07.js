import { useEffect, useState } from "react";

/*Create a React component that calls the projects api and list all the projects when the page loads with titles and description. Create buttons saying “Show Details” for each project. On click of the button show title, description, technologies, completed of that project only. */
export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/projects") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            projects: [
              {
                title: "E-commerce Website",
                description:
                  "A fully functional e-commerce website with shopping cart and checkout functionality.",
                technologies: ["React", "Node.js", "Express", "MongoDB"],
                completed: false
              },
              {
                title: "Weather App",
                description:
                  "A web application that displays the current weather and forecast for a given location.",
                technologies: ["React", "Node.js", "OpenWeatherMap API"],
                completed: true
              },
              {
                title: "Task Manager",
                description:
                  "A web application that allows users to create, manage and track tasks.",
                technologies: ["Vue.js", "Firebase"],
                completed: false
              },
              {
                title: "Blog Website",
                description:
                  "A blog website that allows users to create, read, update and delete blog posts.",
                technologies: ["React JS", "MongoDB"],
                completed: true
              },
              {
                title: "Mobile Game",
                description:
                  "A mobile game developed for iOS and Android platforms.",
                technologies: ["Unity", "C#"],
                completed: false
              }
            ]
          }
        });
      } else {
        reject({
          status: 404,
          message: "Projects not found."
        });
      }
    }, 2000);
  });
};
export function ProjectsList() {
  const [data, setData] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/projects");
      setData(response.data.projects);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const showDetails = (title) => {
    let productDetails = data.filter((product) => product.title === title);
    setProjectDetails(productDetails);
  };
  return (
    <div>
      <h1>Projects</h1>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {data.map(({ title, description }) => (
          <li>
            <p>
              <strong>Name:</strong>
              {title}
            </p>
            <p>
              <strong>Description:</strong>
              {description}
            </p>
            <button onClick={() => showDetails(title)}>Show Details</button>
            <hr />
          </li>
        ))}
      </ul>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {projectDetails.map(
          ({ title, description, technologies, completed }) => (
            <li>
              <h1>Project Details</h1>
              <p>
                <strong>Title:</strong>
                {title}
              </p>
              <p>
                <strong>description:</strong>
                {description}
              </p>
              <p>
                <strong>technologies:</strong>
                {technologies}
              </p>
              <p>
                <strong>completed:</strong>
                {completed}
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
