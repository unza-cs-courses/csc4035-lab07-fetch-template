/**
 * Lab 7: Fetch API and Working with External APIs
 * CSC4035 Web Programming and Technologies
 *
 * Complete all TODO sections following the instructions.
 * Run tests with: npm test
 *
 * API Base URL: https://jsonplaceholder.typicode.com
 *
 * DO NOT modify the module.exports at the bottom.
 */

// API Base URL - JSONPlaceholder fake API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Store loaded users for filtering
let allUsers = [];


// ============================================
// TASK 1: Basic GET Requests
// ============================================

/**
 * Fetch all users from the API
 * @returns {Promise<Array>} Promise that resolves with array of users
 *
 * API Endpoint: GET /users
 * Expected response: Array of user objects
 */
async function fetchUsers() {
    // TODO:
    // 1. Use fetch() to make a GET request to `${API_BASE_URL}/users`
    // 2. Check if the response is ok (response.ok)
    //    - If not ok, throw an error with message "Failed to fetch users"
    // 3. Parse the JSON response using response.json()
    // 4. Store the result in the allUsers variable
    // 5. Return the array of users
    //
    // Hint: const response = await fetch(url);

    // YOUR CODE HERE
}

/**
 * Fetch a single user by ID
 * @param {number} userId - The user ID to fetch
 * @returns {Promise<Object>} Promise that resolves with user object
 *
 * API Endpoint: GET /users/:id
 */
async function fetchUser(userId) {
    // TODO:
    // 1. Validate userId is a positive number
    //    - If not, throw new Error("Invalid user ID")
    // 2. Use fetch() to make a GET request to `${API_BASE_URL}/users/${userId}`
    // 3. Check if response.ok
    //    - If not ok, throw new Error("User not found")
    // 4. Parse and return the JSON response

    // YOUR CODE HERE
}

/**
 * Fetch posts for a specific user
 * @param {number} userId - The user ID
 * @returns {Promise<Array>} Promise that resolves with array of posts
 *
 * API Endpoint: GET /users/:id/posts
 */
async function fetchUserPosts(userId) {
    // TODO:
    // 1. Use fetch() to make a GET request to `${API_BASE_URL}/users/${userId}/posts`
    // 2. Check if response.ok
    //    - If not ok, throw new Error("Failed to fetch posts")
    // 3. Parse and return the JSON response

    // YOUR CODE HERE
}


// ============================================
// TASK 2: Display Data in DOM
// ============================================

/**
 * Create a user card HTML element
 * @param {Object} user - User object from API
 * @returns {HTMLElement} The user card element
 *
 * User object structure:
 * {
 *   id: number,
 *   name: string,
 *   username: string,
 *   email: string,
 *   company: { name: string }
 * }
 */
function createUserCard(user) {
    // TODO:
    // 1. Create a div element
    // 2. Add class 'user-card' to it
    // 3. Set data-user-id attribute to user.id
    // 4. Set innerHTML to display user info:
    //    - h3 with user.name
    //    - p with class 'username' showing @username
    //    - p with class 'email' showing user.email
    //    - p with class 'company' showing user.company.name
    //    - button with class 'view-posts-btn' and text "View Posts"
    // 5. Return the element
    //
    // Example structure:
    // <div class="user-card" data-user-id="1">
    //   <h3>Leanne Graham</h3>
    //   <p class="username">@Bret</p>
    //   <p class="email">Sincere@april.biz</p>
    //   <p class="company">Romaguera-Crona</p>
    //   <button class="view-posts-btn">View Posts</button>
    // </div>

    // YOUR CODE HERE
}

/**
 * Display users in the users container
 * @param {Array} users - Array of user objects
 */
function displayUsers(users) {
    // TODO:
    // 1. Get the users container element by ID 'users-container'
    // 2. Clear the container (set innerHTML to empty string)
    // 3. Loop through users array
    // 4. For each user, create a user card and append to container
    //
    // Hint: Use createUserCard(user) for each user

    // YOUR CODE HERE
}

/**
 * Display posts in the posts container
 * @param {Array} posts - Array of post objects
 * @param {string} userName - Name of the user whose posts are displayed
 */
function displayPosts(posts, userName) {
    // TODO:
    // 1. Get the posts section element by ID 'posts-section'
    // 2. Get the posts container by ID 'posts-container'
    // 3. Get the user name span by ID 'posts-user-name'
    // 4. Set the user name span's textContent to userName
    // 5. Clear the posts container
    // 6. Loop through posts and create post items:
    //    - Create a div with class 'post-item'
    //    - Add h4 with post.title
    //    - Add p with post.body
    //    - Append to posts container
    // 7. Show the posts section (remove 'hidden' class)

    // YOUR CODE HERE
}


// ============================================
// TASK 3: Error Handling and Loading States
// ============================================

/**
 * Show an error message to the user
 * @param {string} message - Error message to display
 */
function showError(message) {
    // TODO:
    // 1. Get the error container by ID 'error-container'
    // 2. Get the error message span by ID 'error-message'
    // 3. Set the error message text
    // 4. Remove 'hidden' class from error container

    // YOUR CODE HERE
}

/**
 * Hide the error message
 */
function hideError() {
    // TODO:
    // 1. Get the error container by ID 'error-container'
    // 2. Add 'hidden' class to error container

    // YOUR CODE HERE
}

/**
 * Set the loading state
 * @param {boolean} isLoading - Whether to show or hide loading
 */
function setLoading(isLoading) {
    // TODO:
    // 1. Get the loading element by ID 'loading'
    // 2. If isLoading is true, remove 'hidden' class
    // 3. If isLoading is false, add 'hidden' class

    // YOUR CODE HERE
}

/**
 * Fetch with error handling wrapper
 * @param {Function} fetchFn - Async function to execute
 * @param {string} errorMessage - Error message to show on failure
 * @returns {Promise<any>} Result of fetchFn or null on error
 */
async function fetchWithErrorHandling(fetchFn, errorMessage) {
    // TODO:
    // 1. Call setLoading(true)
    // 2. Use try/catch to:
    //    - Call await fetchFn()
    //    - On success, call hideError() and return the result
    //    - On error, call showError with errorMessage and return null
    // 3. In finally block, call setLoading(false)
    //
    // Hint:
    // try {
    //   const result = await fetchFn();
    //   hideError();
    //   return result;
    // } catch (error) {
    //   showError(errorMessage);
    //   return null;
    // } finally {
    //   setLoading(false);
    // }

    // YOUR CODE HERE
}


// ============================================
// TASK 4: POST Request
// ============================================

/**
 * Create a new post via the API
 * @param {Object} postData - Post data { userId, title, body }
 * @returns {Promise<Object>} Promise that resolves with created post
 *
 * API Endpoint: POST /posts
 * Required headers: Content-Type: application/json
 */
async function createPost(postData) {
    // TODO:
    // 1. Validate postData has userId, title, and body
    //    - If any is missing, throw new Error("Missing required fields")
    // 2. Use fetch() to make a POST request to `${API_BASE_URL}/posts`
    // 3. Set the request options:
    //    - method: 'POST'
    //    - headers: { 'Content-Type': 'application/json' }
    //    - body: JSON.stringify(postData)
    // 4. Check if response.ok
    //    - If not ok, throw new Error("Failed to create post")
    // 5. Parse and return the JSON response
    //
    // Hint:
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData)
    // });

    // YOUR CODE HERE
}

/**
 * Show the result of creating a post
 * @param {Object} post - Created post object
 * @param {boolean} success - Whether creation was successful
 */
function showPostResult(post, success) {
    // TODO:
    // 1. Get the post result element by ID 'post-result'
    // 2. Remove 'hidden', 'success', and 'error' classes
    // 3. If success:
    //    - Add 'success' class
    //    - Set textContent to "Post created successfully! ID: {post.id}"
    // 4. If not success:
    //    - Add 'error' class
    //    - Set textContent to "Failed to create post"

    // YOUR CODE HERE
}


// ============================================
// TASK 5: Search/Filter Functionality
// ============================================

/**
 * Filter users by search term (client-side filtering)
 * @param {string} searchTerm - Term to search for
 * @returns {Array} Filtered array of users
 *
 * Search should match name, username, or email (case-insensitive)
 */
function filterUsers(searchTerm) {
    // TODO:
    // 1. If searchTerm is empty, return allUsers
    // 2. Convert searchTerm to lowercase
    // 3. Filter allUsers where name, username, or email includes searchTerm
    // 4. Return filtered array
    //
    // Hint: Use filter and check if any field includes the term
    // user.name.toLowerCase().includes(term) || ...

    // YOUR CODE HERE
}


// ============================================
// TASK 6: Event Handlers and Initialization
// ============================================

/**
 * Handle loading users button click
 */
async function handleLoadUsers() {
    // TODO:
    // 1. Use fetchWithErrorHandling to call fetchUsers
    // 2. If users were returned, call displayUsers with the result

    // YOUR CODE HERE
}

/**
 * Handle search functionality
 */
function handleSearch() {
    // TODO:
    // 1. Get the search input value
    // 2. Call filterUsers with the search term
    // 3. Call displayUsers with the filtered results

    // YOUR CODE HERE
}

/**
 * Handle viewing posts for a user
 * @param {number} userId - User ID
 * @param {string} userName - User name
 */
async function handleViewPosts(userId, userName) {
    // TODO:
    // 1. Use fetchWithErrorHandling to call fetchUserPosts
    // 2. If posts were returned, call displayPosts with posts and userName

    // YOUR CODE HERE
}

/**
 * Handle post form submission
 * @param {Event} event - Form submit event
 */
async function handlePostSubmit(event) {
    // TODO:
    // 1. Prevent default form submission (event.preventDefault())
    // 2. Get values from form inputs:
    //    - userId from 'post-user-id'
    //    - title from 'post-title'
    //    - body from 'post-body'
    // 3. Create postData object
    // 4. Use fetchWithErrorHandling to call createPost
    // 5. Call showPostResult with the result
    // 6. If successful, reset the form

    // YOUR CODE HERE
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // TODO: Uncomment and complete these event listeners after implementing the handlers

    // Load users button
    // const loadUsersBtn = document.getElementById('load-users-btn');
    // if (loadUsersBtn) {
    //     loadUsersBtn.addEventListener('click', handleLoadUsers);
    // }

    // Search button
    // const searchBtn = document.getElementById('search-btn');
    // if (searchBtn) {
    //     searchBtn.addEventListener('click', handleSearch);
    // }

    // Search input (Enter key)
    // const searchInput = document.getElementById('search-input');
    // if (searchInput) {
    //     searchInput.addEventListener('keypress', (e) => {
    //         if (e.key === 'Enter') handleSearch();
    //     });
    // }

    // Post form submission
    // const postForm = document.getElementById('post-form');
    // if (postForm) {
    //     postForm.addEventListener('submit', handlePostSubmit);
    // }

    // Error close button
    // const errorClose = document.getElementById('error-close');
    // if (errorClose) {
    //     errorClose.addEventListener('click', hideError);
    // }

    // Close posts section
    // const closePostsBtn = document.getElementById('close-posts-btn');
    // if (closePostsBtn) {
    //     closePostsBtn.addEventListener('click', () => {
    //         document.getElementById('posts-section').classList.add('hidden');
    //     });
    // }

    // Event delegation for View Posts buttons
    // const usersContainer = document.getElementById('users-container');
    // if (usersContainer) {
    //     usersContainer.addEventListener('click', (e) => {
    //         if (e.target.classList.contains('view-posts-btn')) {
    //             const card = e.target.closest('.user-card');
    //             const userId = parseInt(card.dataset.userId);
    //             const userName = card.querySelector('h3').textContent;
    //             handleViewPosts(userId, userName);
    //         }
    //     });
    // }
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
}


// ============================================
// EXPORTS - DO NOT MODIFY
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_BASE_URL,
        // Task 1
        fetchUsers,
        fetchUser,
        fetchUserPosts,
        // Task 2
        createUserCard,
        displayUsers,
        displayPosts,
        // Task 3
        showError,
        hideError,
        setLoading,
        fetchWithErrorHandling,
        // Task 4
        createPost,
        showPostResult,
        // Task 5
        filterUsers,
        // Task 6
        handleLoadUsers,
        handleSearch,
        handleViewPosts,
        handlePostSubmit,
        // For testing
        getAllUsers: () => allUsers,
        setAllUsers: (users) => { allUsers = users; }
    };
}
