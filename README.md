# 📝Product Feedback App

## 📌 Project Description & Purpose

This project is ** a place to give feedback about an app by providing suggestions to improve the UX/UI, add enhancement or a new feature. **

## 🚀 Live Site

Check out the app: https://product-feedback-app-by-rucha.netlify.app/

## 🖼️ Screenshots

Here is where you'll include a screenshot of your project to show it off!

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template.

1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes

## ✨ Features

This is what you can do on the app:

- **You can view all the suggestions.**
- **You can filter suggestions based on category.**
- **You can add a suggestion to the page using the feedback form.**

## 🛠️ Tech Stack

**Frontend**

- **Languages:** **HTML, CSS, JAVASCRIPT **
- **Framework:** **REACT**
- **Deployment:** **NETLIFY**

**Server/API**

- **Languages:** **Node.js**
- **Framework:** **Express.js**
- **Deployment:** **RENDER**

**Database**

- **Languages:** **postgresSQL**
- **Deployment:** **NEON**

## 🔹 API Documentation

These are the API endpoints I built:

1. GET `/get-all-suggestions`
2. GET `/get-suggestions-by-category/:category`
3. POST `/add-one-suggestion`

Learn more about the API endpoints here: [insert link to API documentation]

## 🗄️ Database Schema

Here’s the SQL I used to create my tables:

```sql
CREATE TABLE suggestions
(id SERIAL PRIMARY KEY,
	title VARCHAR,
	description VARCHAR,
	suggestion_type VARCHAR
);
```

## 💭 Reflections

**What I learned:I learned how to build a full stack app using REACT, Express and postgreSQL.**

**What I'm proud of: I am proud of building this app and adding suggestions in the database.**

**What challenged me: The styling part was slightly challenging for me.**

**Future ideas for how I'd continue building this project:**

1. Upvote Suggestions
2. Log in for Users
3. Implement multi-filtering

## 🙌 Credits & Shoutouts

Thanks to **Prof. Arianna** for **her instructions, guidance, and support during this project**!
And thanks to **Bakari** and **Makeba** for **their help and support during this project**!
