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
    const responseInTextFormat = await response.text();
    console.log("response from post method: ", responseInTextFormat);
    if (responseInTextFormat === "Success, suggestion was added") {
      alert(
        "Thank you for your valuable feedback. Form Submitted successfully!"
      );
    } else {
      alert("Error submitting feedback! Sorry try again later!");
    }
  };
  //Declare an event handler arrow function handleChange to handle changes in form input
  const handleChange = (e) => {
    //this function handles changes in the form input and updates the value of formData with each and every keystroke
    const { name, value } = e.target;
    //set form data using the setter function setFormData
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Running handle submit function");
    //Send POST request to store form data in API on the server in function addOneSuggestion()
    await addOneSuggestion();
  };
  return (
    <div className="form-div">
      <a className="back-link" href="/">
        {backArrow} Go Back
      </a>
      <form>
        <fieldset>
          <legend>
            <IoAddCircleSharp className="circle-sharp" />
          </legend>
          <h2>Create New Feedback</h2>
          <div className="form-input-div">
            <label htmlFor="title">Feedback Title</label>
            <p>Add a short, descriptive headline</p>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-div">
            <label htmlFor="category">Category</label>
            <p>Choose a category for your feedback</p>
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
          </div>
          <div className="form-input-div">
            <label htmlFor="suggestion">Feedback Detail</label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              rows="4"
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons-div">
            <a className="cancel-button" href="/">
              Cancel
            </a>
            <Button
              className="submit-button"
              text="Add Feedback"
              handleClick={handleSubmit}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
