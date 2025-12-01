# 📘 Product Feedback API Documentation

Base URL: `https://product-feedback-app-tegr.onrender.com`

## Overview

| Resource      | Method | Endpoint                     | Description                                            |
| ------------- | ------ | ---------------------------- | ------------------------------------------------------ |
| `suggestions` | GET    | /get-all-suggestions         | Retrieves all suggestions from the database.           |
| `suggestions` | GET    | /get-suggestions-by-category | Retrieves the suggestion by category selected by user. |
| `suggestions` | POST   | /add-one-suggestion          | Adds a new suggestion to the database.                 |

---

### 🔹 GET `/get-all-suggestions`

**Description:** Retrieves all suggestions in the database system \*\*

**Example Request URL:**

```
https://product-feedback-app-tegr.onrender.com/get-all-suggestions
```

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Add tags for solutions",
    "description": "Easier for finding solutions based on task",
    "suggestion_type": "Enhancement"
  },
  {
    "id": 2,
    "title": "Add a dark theme option",
    "description": "It would help people who prefer darker themes and/or people who like to choose a theme based on their mood",
    "suggestion_type": "Feature"
  }
]
```

---

### 🔹 GET `/get-suggestions-by-category/:category`

**Description:** ** Retrieves the suggestion by category selected by user. **

**Example Request URL:**

```
https://product-feedback-app-tegr.onrender.com/get-suggestions-by-category/:category
```

**Example Response:**

```json
[
  {
    "id": 3,
    "title": "Fix add button",
    "description": "The add button is not working in the app",
    "suggestion_type": "Bugs"
  },
  {
    "id": 5,
    "title": "Preview images are not loading",
    "description": "Challenge preview images are missing when you apply a filter",
    "suggestion_type": "Bugs"
  }
]
```

---

### 🔹 POST `/add-one-suggestion`

**Description:** **Adds a new suggestion to the database.**

**Example Request URL:**

```
https://product-feedback-app-tegr.onrender.com/add-one-suggestion
```

**Example Request Body:**

```json
{
  "title": "Preview images are not loading",
  "suggestion": "Challenge preview images are missing when you apply a filter",
  "category": "Bugs"
}
```

**Example Response:**

```
Success, suggestion was added
```

---
