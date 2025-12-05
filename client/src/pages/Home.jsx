import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import react icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoBulbOutline } from "react-icons/io5";
//Reference : https://cloudinary.com/guides/web-performance/5-ways-to-import-images-in-react-bonus-automation-method
import myImage from "../assets/suggestions/illustration-empty.svg";
import buttonData from "../buttonData.js";
//import components
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

export default function Home() {
  //Create a variable category and setter function using useState
  const [suggestions, setSuggestions] = useState([]);
  //Create a variable count and setter function using useState
  const [count, setCount] = useState(0);
  //Create a variable url and setter function using useState
  const [url, setUrl] = useState("/api/get-all-suggestions");
  //Create a variable click and setter function using useState
  const [click, setClick] = useState([true, false, false, false, false, false]);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const bulbIcon = <IoBulbOutline />;
  let buttonNavJsx = (
    <>
      {buttonData.map((item, i) => (
        <Button
          className={click[item.index] ? "clicked" : "child2-button"}
          text={item.text}
          handleClick={() => handleClick(item.url, item.index)}
          key={"index_" + i}
        />
      ))}
    </>
  );

  let handleClick = (newUrl, index) => {
    setUrl(newUrl);
    // 1. Change all the values in click to false for all indices except index
    let result = click.map((_, i) => {
      if (i != index) {
        return false;
      }
      return true;
    });
    console.log("result", result);
    setClick(result);
  };

  let noFeedbackScreen = (
    <div className="feedbacks-div">
      <img src={myImage} alt="person with magnifying glass" />
      <h2> There is no feedback yet.</h2>
      <p> Got a suggestion? Found a bug that needs to be squashed? </p>
      <p> We love hearing about new ideas to improve our app.</p>
      <p>
        <Link className="feedback-link" to="/feedback">
          + Add Feedback
        </Link>
      </p>
    </div>
  );
  let feedbackScreen = (
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
  );

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
            <Button
              className="hamburger-menu"
              // Reference : https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb
              handleClick={() => setIsMenuActive(!isMenuActive)}
              text={<RxHamburgerMenu />}
            />
          </div>
          <div className={`child2 ${isMenuActive ? "active" : "inactive"}`}>
            {buttonNavJsx}
          </div>
        </div>
        <div className="item2">
          <header>
            <h2>
              {bulbIcon}
              {count} Suggestions
            </h2>
            <p>
              <Link className="feedback-link" to="/feedback">
                + Add Feedback
              </Link>
            </p>
          </header>
          {count ? feedbackScreen : noFeedbackScreen}
        </div>
      </div>
    </>
  );
}
