import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import components
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
export default function Home() {
  //Create a variable category and setter function using useState
  const [suggestions, setSuggestions] = useState([]);
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState("/api/get-all-suggestions");

  const getSuggestionsDataByCategory = async () => {
    try {
      //Fetch data from API and wait for it to finish.Save the value returned by the api call in a variable named 'response'.
      const response = await fetch(url); //Getting data from API takes time so we use the await keyword
      //Guard Clause Reference : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return; // Exit early //Reference : https://dev.to/muthuraja_r/using-guard-clauses-in-asyncawait-a-clean-coding-technique-for-readable-and-maintainable-code-367j
      }
      //convert response into JSON notation wait for this line ' await response.json();' to finish before we move to next line
      const data = await response.json();
      //print data on console
      console.log("data ", data);
      //Set data using the setter/updater function setSuggestions and passing on data
      setSuggestions(data);
      //Set count
      setCount(data.length);
    } catch (error) {
      console.log("Error Fetching API: " + error);
    }
  };

  //useEffect to fetch data
  useEffect(() => {
    getSuggestionsDataByCategory();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="item1">
          <div className="child1">
            <h1> My Company</h1>
            <p>Feedback board</p>
          </div>
          <div className="child2">
            <Button
              text="All"
              handleClick={() => setUrl("/api/get-all-suggestions")}
            />
            <Button
              text="UX"
              handleClick={() => setUrl("/api/get-suggestions-by-category/UX")}
            />
            <Button
              text="UI"
              handleClick={() => setUrl("/api/get-suggestions-by-category/UI")}
            />
            <Button
              text="Enhancement"
              handleClick={() =>
                setUrl("/api/get-suggestions-by-category/Enhancement")
              }
            />
            <Button
              text="Bug"
              handleClick={() => setUrl("/api/get-suggestions-by-category/Bug")}
            />
            <Button
              text="Feature"
              handleClick={() =>
                setUrl("/api/get-suggestions-by-category/Feature")
              }
            />
          </div>
        </div>
        <div className="item2">
          <header>
            <h2> {count} Suggestions</h2>
            <p>
              <Link className="feedback-link" to="/feedback">
                + Add Feedback
              </Link>
            </p>
          </header>
          <div className="feedbacks-div">
            {suggestions.map((item, index) => (
              <Card
                title={item.title}
                suggestion={item.description}
                category={item.suggestion_type}
                key={"item_" + index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
