import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import components
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
export default function Home() {
  //Create a variable category and setter function using useState
  const [category, setCategory] = useState("All");
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
    if (category === "All") {
      setUrl("/api/get-all-suggestions");
      getSuggestionsDataByCategory();
    } else {
      setUrl(`/api/get-suggestions-by-category/${category}`);
      //Call function getSuggestionsDataByCategory() that makes the API call
      getSuggestionsDataByCategory();
    }
  }, [category]);

  return (
    <>
      <div className="container">
        <div className="child1">
          <h1> My Company</h1>
          <h2>Feedback board</h2>
        </div>
        <div className="child2">
          <Button text="All" handleClick={() => setCategory("All")} />
          <Button text="UX" handleClick={() => setCategory("UX")} />
          <Button text="UI" handleClick={() => setCategory("UI")} />
          <Button
            text="Enhancement"
            handleClick={() => setCategory("Enhancement")}
          />
          <Button text="Bug" handleClick={() => setCategory("Bug")} />
          <Button text="Feature" handleClick={() => setCategory("Feature")} />
        </div>
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
    </>
  );
}
