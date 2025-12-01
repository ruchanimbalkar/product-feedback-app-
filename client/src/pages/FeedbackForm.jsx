import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Button from "../components/Button";
export default function FeedbackForm() {
  let backArrow = <FaLongArrowAltLeft />;
  //Declare an emptyFormState variable of type object to reset the form data
  const emptyFormState = { title: "", suggestion: "", category: "" };
  //Declare a formData variable and assign it the value of the emptyFormState variable using useState. Also declare the setter/updater function setFormData
  const [formData, setFormData] = useState(emptyFormState);

  const addOneSuggestion = async () => {
    console.log("running addOneSuggestion() function");
    //Send a POST request to the API with base url and endpoint /add-one-suggestion with headers and body
    const response = await fetch("/api/add-one-suggestion", {
      method: "POST",
      //The content type header tells the server that we are sending JSON data
      headers: {
        "content-type": "application/json ",
      },
      //The request body contains the data to be stored
      body: JSON.stringify({
        title: formData.title,
        suggestion: formData.suggestion,
        category: formData.category,
      }),
    });
    //Guard Clause
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
      // Exit early
      return;
    }
    //Convert the response to JSON format using json method
    const responseInJSONFormat = await response.json();
    console.log("response from post method: ", responseInJSONFormat);
    //alert("Form Submitted successfully");
  };
  //Declare an event handler arrow function handleChange to handle changes in form input
  const handleChange = (e) => {
    //this function handles changes in the form input and updates the value of formData with each and every keystroke
    const { name, value } = e.target;
    //set form data using the setter function setFormData
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCancel = () => {
    //Reset the form and go to main page
    //resets the form to its initial state
    setFormData(emptyFormState);
  };
  const handleSubmit = async () => {
    console.log("Running handle submit function");
    //Send POST request to store form data in API on the server in function addOneSuggestion()
    await addOneSuggestion();
  };
  return (
    <>
      <a href="/">{backArrow} Go Back</a>
      <form>
        <fieldset>
          <legend>
            <IoAddCircleSharp />
          </legend>
          <h2>Create New Feedback</h2>
          <p>
            <label htmlFor="title">Feedback Title</label> Add a short,
            descriptive headline
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="category">Category</label>
            Choose a category for your feedback
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="UI">UI</option>
              <option value="UX">UX</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
            </select>
          </p>
          <p>
            <label htmlFor="suggestion">Feedback Detail</label> Include any
            specific comments on what should be improved, added, etc.
            <textarea
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              rows="4"
              onChange={handleChange}
            />
          </p>
          <Button text="Cancel" handleClick={handleCancel} />
          <Button text="Add Feedback" handleClick={handleSubmit} />
        </fieldset>
      </form>
    </>
  );
}
