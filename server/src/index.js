// import express
import express from "express";
import pg from "pg";

//connecting to our PostgreSQL database , or db for short
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // use SSL encryption when connecting to the database to keep data safe in transit
});

//Declare a variable named app and call the express() function to create a new instance of express
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json()); // this server will receive and respond to requests with JSON data

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
}); //this method is turning on our server

app.get("/", (req, res) => {
  res.send("Hi, Server is ON!");
});

//Helper Functions

const getAllSuggestions = async () => {
  const data = await db.query("SELECT * FROM suggestions");
  console.log(data.rows);
  return data.rows;
};

const getSuggestionsByCategory = async (category) => {
  const data = await db.query(
    "SELECT * FROM suggestions WHERE suggestion_type = $1",
    [category]
  );
  console.log(data.rows);
  return data.rows;
};

const addOneSuggestion = async (title, description, category) => {
  await db.query(
    "INSERT INTO suggestions (title, description, suggestion_type) VALUES ($1,$2,$3)",
    [title, description, category]
  );
};

//API endpoints
// GET /get-all-suggestions: Return all the suggestions data
app.get("/get-all-suggestions", async (req, res) => {
  const results = await getAllSuggestions();
  res.json(results);
});

// GET /get-suggestions-by-category/:category: Return suggestions filtered by category
app.get("/get-suggestions-by-category/:category", async (req, res) => {
  const category = req.params.category;
  const results = await getSuggestionsByCategory(category);
  res.json(results);
});

// POST /add-one-suggestion: Save submitted form data
app.post("/add-one-suggestion", async (req, res) => {
  try {
    const { title, suggestion, category } = req.body;
    console.log("POST REQUEST :", req.body);

    if (!title || !suggestion || !category) {
      return res.status(400).send("Error : Missing required fields!");
    } else {
      //call helper function
      let result = await addOneSuggestion(title, suggestion, category);
      console.log(result);
      res.status(200).send("Success, suggestion was added");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
