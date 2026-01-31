# Lab 7: Fetch API and Working with External APIs

**Course:** CSC4035 Web Programming and Technologies
**Estimated Time:** 2-2.5 hours
**Weight:** 1% of final grade

---

## Purpose

This lab teaches you to consume external REST APIs using the Fetch API. You will make HTTP requests, handle responses, process JSON data, and display dynamic content. These skills connect your frontend skills with real-world data sources.

---

## Learning Outcomes

By completing this lab, you will be able to:

1. Make GET requests using the Fetch API
2. Parse and process JSON response data
3. Handle API errors gracefully with user feedback
4. Make POST requests with JSON body data
5. Display API data dynamically in the DOM
6. Implement client-side search/filtering

---

## Setup

1. Clone this repository
2. Install dependencies: `npm install jsdom`
3. Open `index.html` in a browser to test manually
4. Complete the functions in `app.js`
5. Run tests with `npm test`

---

## Files

| File | Description |
|------|-------------|
| `index.html` | HTML structure for the User Directory |
| `styles.css` | CSS styles for the application |
| `app.js` | **Your code goes here** - Complete the TODO sections |
| `tests/visible/tests.js` | Automated tests (do not modify) |

---

## API Reference

We use JSONPlaceholder, a free fake REST API for testing.

**Base URL:** `https://jsonplaceholder.typicode.com`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users` | GET | Get all users |
| `/users/:id` | GET | Get single user by ID |
| `/users/:id/posts` | GET | Get posts for a user |
| `/posts` | POST | Create a new post |

---

## Tasks

### Task 1: Basic GET Requests (20 minutes)

Implement these fetch functions:
- `fetchUsers()` - Fetch all users from `/users`
- `fetchUser(userId)` - Fetch single user by ID
- `fetchUserPosts(userId)` - Fetch posts for a user

### Task 2: Display Data in DOM (25 minutes)

Implement display functions:
- `createUserCard(user)` - Create a user card element
- `displayUsers(users)` - Render all users to the page
- `displayPosts(posts, userName)` - Display user's posts

### Task 3: Error Handling and Loading States (20 minutes)

Implement UI feedback:
- `showError(message)` - Display error message
- `hideError()` - Hide error message
- `setLoading(isLoading)` - Show/hide loading indicator
- `fetchWithErrorHandling(fetchFn, errorMessage)` - Wrapper for safe fetching

### Task 4: POST Request (25 minutes)

Implement POST functionality:
- `createPost(postData)` - Send POST request to create a post
- `showPostResult(post, success)` - Display success/error result

### Task 5: Search/Filter Functionality (15 minutes)

Implement client-side search:
- `filterUsers(searchTerm)` - Filter users by name, username, or email

### Task 6: Event Handlers (20 minutes)

Implement and wire up event handlers, then uncomment the initialization code.

---

## Key Concepts

### Making a GET Request

```javascript
async function getData() {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return await response.json();
}
```

### Making a POST Request

```javascript
async function postData(data) {
    const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return await response.json();
}
```

### Error Handling Pattern

```javascript
async function safeFetch() {
    try {
        setLoading(true);
        const result = await fetchData();
        hideError();
        return result;
    } catch (error) {
        showError(error.message);
        return null;
    } finally {
        setLoading(false);
    }
}
```

---

## Running Tests

```bash
npm test
```

You should see output showing which tests pass (PASS) and fail (FAIL).

---

## Testing in Browser

1. Open `index.html` in your browser
2. Click "Load All Users" to fetch and display users
3. Click "View Posts" on a user card to see their posts
4. Use the search input to filter users
5. Fill out and submit the "Create Post" form
6. Check the browser console for any errors

---

## Grading

| Component | Weight |
|-----------|--------|
| Visible Tests | 40% |
| Hidden Tests | 30% |
| Code Quality | 20% |
| Academic Integrity | -10% if flagged |

### Visible Tests (This Lab)

The tests in `tests/visible/tests.js` run on every push. These cover basic functionality for each function.

### Hidden Tests

Additional tests run after the deadline covering:
- Network error handling
- Edge cases (empty responses, malformed data)
- Performance with large datasets
- Code style and best practices

---

## Submission

1. Complete all functions in `app.js`
2. Ensure `npm test` passes
3. Test manually in browser
4. Commit and push your changes
5. Check the Actions tab for test results

```bash
git add .
git commit -m "Complete Lab 7"
git push
```

---

## Tips

- Always check `response.ok` before parsing JSON
- Use async/await for cleaner code
- Always handle errors with try/catch
- The Fetch API doesn't throw on 404 errors - you must check `response.ok`
- Use `response.status` to get the HTTP status code
- Use template literals for building URLs: `` `${baseUrl}/users/${id}` ``

---

## Common Mistakes

1. **Not checking response.ok** - Fetch only throws on network errors
2. **Forgetting Content-Type header** - Required for POST with JSON body
3. **Not stringifying body** - Use `JSON.stringify()` for POST body
4. **Not handling errors** - Always use try/catch or .catch()
5. **Not waiting for JSON parsing** - `response.json()` returns a Promise

---

## Resources

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## Academic Integrity

- **Allowed:** Course materials, MDN, JSONPlaceholder docs
- **Allowed:** Discussing concepts with classmates
- **NOT Allowed:** Copying code from others
- **NOT Allowed:** Using AI to generate solutions
- **NOT Allowed:** Using axios or other HTTP libraries (use native fetch)

All submissions are checked with plagiarism detection tools.
