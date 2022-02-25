import './App.css';
import {useState, useEffect} from "react";

const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`

function App() {
  // define the initial state
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/wux9nfcl36wb/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.pageCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  // return statement and JSX template.
  return (
    <div className="App">
      <header className="App-header">
        <img src={page.logo.url} className="App-logo" alt="logo" />
        <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;
