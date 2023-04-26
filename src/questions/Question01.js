import { useEffect, useState } from "react";

/*Create a React component that calls the product api and has the same number of buttons as the items in product. On Click of each button show the details of that card only. Example: In the below API we have three products and three buttons. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              {
                name: "Shoes",
                price: 3000,
                desc: "lorem ipsum dolor sit amit",
                src:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mcHL05r5Y92baAGWN1JF8HwxnE3f9FQlaw&usqp=CAU"
              },
              {
                name: "Tshirt",
                price: 500,
                inStock: false,
                desc: "lorem ipsum dolor sit amit",
                src:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGXUeKV3ZU2to3G2Mhc-fGbQdY5_12DBXNg&usqp=CAU"
              },
              {
                name: "Trekking Bag",
                price: 2000,
                inStock: true,
                desc: "lorem ipsum dolor sit amit",
                src:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSScuml8dCvYm-O3b_hPAW6Ekyk6V6rKJDq2Q&usqp=CAU"
              }
            ]
          }
        });
      } else {
        reject({
          status: 404,
          message: "Items list not found."
        });
      }
    }, 2000);
  });
};

export function Productitems() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState();
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      setData(response.data.products);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul style={{ listStyle: "none", display: "flex", margin: "20px" }}>
        {data.map(({ name, price, desc, src }) => (
          <li>
            <button onClick={() => setFlag(name)}>Show {name}</button>
            {flag === name && (
              <>
                <img src={src} alt="ProductImage" height={200} width={180} />
                <h3>{name}</h3>
                <p>
                  <strong>Price:</strong>
                  {price}
                </p>
                <p>
                  <strong>Description:</strong>
                  {desc}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
