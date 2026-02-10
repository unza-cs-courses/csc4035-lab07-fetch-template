/**
 * Lab 7: Fetch API - Visible Test Suite
 * CSC4035 Web Programming and Technologies
 *
 * These tests run on every push via GitHub Actions.
 * Additional hidden tests will run after the deadline.
 *
 * DO NOT MODIFY THIS FILE
 * Run with: npm test
 */

// Mock DOM environment
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
    <div class="container">
        <section class="search-section">
            <input type="text" id="search-input" placeholder="Search users...">
            <button id="search-btn">Search</button>
            <button id="load-users-btn">Load All Users</button>
        </section>
        <div id="error-container" class="error-container hidden">
            <span id="error-message"></span>
            <button id="error-close" class="close-btn">&times;</button>
        </div>
        <div id="loading" class="loading hidden">
            <div class="spinner"></div>
            <span>Loading...</span>
        </div>
        <section id="users-container" class="users-grid"></section>
        <section class="create-post-section">
            <h2>Create New Post</h2>
            <form id="post-form">
                <input type="number" id="post-user-id" min="1" max="10" required>
                <input type="text" id="post-title" required>
                <textarea id="post-body" rows="4" required></textarea>
                <button type="submit" id="submit-post-btn">Create Post</button>
            </form>
            <div id="post-result" class="post-result hidden"></div>
        </section>
        <section id="posts-section" class="posts-section hidden">
            <h2>Posts by <span id="posts-user-name"></span></h2>
            <button id="close-posts-btn" class="close-btn">&times;</button>
            <div id="posts-container" class="posts-container"></div>
        </section>
    </div>
</body>
</html>
`, { url: 'http://localhost' });

global.document = dom.window.document;
global.window = dom.window;

// Mock fetch for Node.js testing
const mockUsers = [
    { id: 1, name: 'Alice', username: 'alice', email: 'alice@test.com', company: { name: 'AliceCo' } },
    { id: 2, name: 'Bob', username: 'bob', email: 'bob@test.com', company: { name: 'BobCo' } },
    { id: 3, name: 'Charlie', username: 'charlie', email: 'charlie@test.com', company: { name: 'CharlieCo' } }
];

const mockPosts = [
    { id: 1, userId: 1, title: 'First Post', body: 'This is the first post' },
    { id: 2, userId: 1, title: 'Second Post', body: 'This is the second post' }
];

global.fetch = async (url, options = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 10));

    if (url.includes('/users/999')) {
        return { ok: false, status: 404, json: async () => ({}) };
    }

    if (url.includes('/users/') && url.includes('/posts')) {
        const userId = parseInt(url.split('/users/')[1].split('/')[0]);
        const userPosts = mockPosts.filter(p => p.userId === userId);
        return { ok: true, json: async () => userPosts };
    }

    if (url.includes('/users/')) {
        const userId = parseInt(url.split('/users/')[1]);
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
            return { ok: true, json: async () => user };
        }
        return { ok: false, status: 404, json: async () => ({}) };
    }

    if (url.endsWith('/users')) {
        return { ok: true, json: async () => mockUsers };
    }

    if (url.endsWith('/posts') && options.method === 'POST') {
        const body = JSON.parse(options.body);
        return { ok: true, json: async () => ({ ...body, id: 101 }) };
    }

    return { ok: false, status: 404, json: async () => ({}) };
};

// Require the app module
const app = require('../../app');

// Test counter
let passed = 0;
let failed = 0;

async function test(name, fn) {
    try {
        await fn();
        console.log(`  PASS: ${name}`);
        passed++;
    } catch (e) {
        console.log(`  FAIL: ${name}`);
        console.log(`        Error: ${e.message}`);
        failed++;
    }
}

function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`Expected "${expected}", got "${actual}". ${message}`);
    }
}

function assertTrue(value, message = '') {
    if (value !== true) {
        throw new Error(`Expected true, got ${value}. ${message}`);
    }
}

function assertFalse(value, message = '') {
    if (value !== false) {
        throw new Error(`Expected false, got ${value}. ${message}`);
    }
}

function assertNotNull(value, message = '') {
    if (value === null || value === undefined) {
        throw new Error(`Expected non-null value. ${message}`);
    }
}

function assertRejects(promise, expectedMessage) {
    return promise
        .then(() => {
            throw new Error(`Expected promise to reject`);
        })
        .catch(err => {
            if (expectedMessage && !err.message.includes(expectedMessage)) {
                throw new Error(`Expected error containing "${expectedMessage}", got "${err.message}"`);
            }
        });
}

function resetDOM() {
    document.getElementById('users-container').innerHTML = '';
    document.getElementById('posts-container').innerHTML = '';
    document.getElementById('error-container').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('posts-section').classList.add('hidden');
    document.getElementById('post-result').classList.add('hidden');
    document.getElementById('post-result').textContent = '';
    app.setAllUsers([]);
}

async function runTests() {
    console.log('\n========================================');
    console.log('Lab 7: Fetch API');
    console.log('Visible Test Suite');
    console.log('========================================\n');

    // ============================================
    // Task 1 Tests: Basic GET Requests
    // ============================================
    console.log('--- Task 1: Basic GET Requests ---');
    resetDOM();

    await test('fetchUsers should return array of users', async () => {
        const users = await app.fetchUsers();
        if (!Array.isArray(users)) {
            throw new Error('Should return an array');
        }
        assertEqual(users.length, 3);
    });

    await test('fetchUser should return single user', async () => {
        const user = await app.fetchUser(1);
        assertEqual(user.name, 'Alice');
    });

    await test('fetchUser should throw for invalid ID', async () => {
        await assertRejects(app.fetchUser('abc'), 'Invalid user ID');
    });

    await test('fetchUser should throw for non-existent user', async () => {
        await assertRejects(app.fetchUser(999), 'not found');
    });

    await test('fetchUserPosts should return posts array', async () => {
        const posts = await app.fetchUserPosts(1);
        if (!Array.isArray(posts)) {
            throw new Error('Should return an array');
        }
        assertEqual(posts.length, 2);
    });

    // ============================================
    // Task 2 Tests: Display Data
    // ============================================
    console.log('\n--- Task 2: Display Data ---');
    resetDOM();

    await test('createUserCard should return a div element', () => {
        const card = app.createUserCard(mockUsers[0]);
        assertNotNull(card);
        assertEqual(card.tagName, 'DIV');
    });

    await test('createUserCard should have user-card class', () => {
        const card = app.createUserCard(mockUsers[0]);
        assertTrue(card.classList.contains('user-card'));
    });

    await test('createUserCard should have data-user-id attribute', () => {
        const card = app.createUserCard(mockUsers[0]);
        assertEqual(card.dataset.userId, '1');
    });

    await test('createUserCard should display user name', () => {
        const card = app.createUserCard(mockUsers[0]);
        const h3 = card.querySelector('h3');
        assertNotNull(h3);
        assertEqual(h3.textContent, 'Alice');
    });

    await test('displayUsers should add cards to container', () => {
        resetDOM();
        app.displayUsers(mockUsers);
        const container = document.getElementById('users-container');
        assertEqual(container.children.length, 3);
    });

    await test('displayPosts should show posts section', () => {
        resetDOM();
        app.displayPosts(mockPosts, 'Alice');
        const section = document.getElementById('posts-section');
        assertFalse(section.classList.contains('hidden'));
    });

    // ============================================
    // Task 3 Tests: Error Handling
    // ============================================
    console.log('\n--- Task 3: Error Handling ---');
    resetDOM();

    await test('showError should display error message', () => {
        app.showError('Test error');
        const container = document.getElementById('error-container');
        const message = document.getElementById('error-message');
        assertFalse(container.classList.contains('hidden'));
        assertEqual(message.textContent, 'Test error');
    });

    await test('hideError should hide error container', () => {
        app.showError('Test');
        app.hideError();
        const container = document.getElementById('error-container');
        assertTrue(container.classList.contains('hidden'));
    });

    await test('setLoading true should show loading', () => {
        app.setLoading(true);
        const loading = document.getElementById('loading');
        assertFalse(loading.classList.contains('hidden'));
    });

    await test('setLoading false should hide loading', () => {
        app.setLoading(true);
        app.setLoading(false);
        const loading = document.getElementById('loading');
        assertTrue(loading.classList.contains('hidden'));
    });

    await test('fetchWithErrorHandling should return result on success', async () => {
        resetDOM();
        const result = await app.fetchWithErrorHandling(
            async () => 'success',
            'Error message'
        );
        assertEqual(result, 'success');
    });

    await test('fetchWithErrorHandling should return null on error', async () => {
        resetDOM();
        const result = await app.fetchWithErrorHandling(
            async () => { throw new Error('test'); },
            'Error message'
        );
        assertEqual(result, null);
    });

    // ============================================
    // Task 4 Tests: POST Request
    // ============================================
    console.log('\n--- Task 4: POST Request ---');
    resetDOM();

    await test('createPost should return created post', async () => {
        const post = await app.createPost({
            userId: 1,
            title: 'Test Title',
            body: 'Test Body'
        });
        assertEqual(post.id, 101);
        assertEqual(post.title, 'Test Title');
    });

    await test('createPost should throw for missing fields', async () => {
        await assertRejects(
            app.createPost({ userId: 1, title: 'Test' }),
            'Missing required fields'
        );
    });

    await test('showPostResult should show success message', () => {
        resetDOM();
        app.showPostResult({ id: 1 }, true);
        const result = document.getElementById('post-result');
        assertFalse(result.classList.contains('hidden'));
        assertTrue(result.classList.contains('success'));
    });

    await test('showPostResult should show error message', () => {
        resetDOM();
        app.showPostResult(null, false);
        const result = document.getElementById('post-result');
        assertTrue(result.classList.contains('error'));
    });

    // ============================================
    // Task 5 Tests: Search/Filter
    // ============================================
    console.log('\n--- Task 5: Search/Filter ---');
    resetDOM();

    await test('filterUsers should return all users for empty term', () => {
        app.setAllUsers(mockUsers);
        const filtered = app.filterUsers('');
        assertEqual(filtered.length, 3);
    });

    await test('filterUsers should filter by name', () => {
        app.setAllUsers(mockUsers);
        const filtered = app.filterUsers('Alice');
        assertEqual(filtered.length, 1);
        assertEqual(filtered[0].name, 'Alice');
    });

    await test('filterUsers should be case-insensitive', () => {
        app.setAllUsers(mockUsers);
        const filtered = app.filterUsers('alice');
        assertEqual(filtered.length, 1);
    });

    await test('filterUsers should search username', () => {
        app.setAllUsers(mockUsers);
        const filtered = app.filterUsers('bob');
        assertEqual(filtered.length, 1);
        assertEqual(filtered[0].username, 'bob');
    });

    await test('filterUsers should search email', () => {
        app.setAllUsers(mockUsers);
        const filtered = app.filterUsers('charlie@test');
        assertEqual(filtered.length, 1);
    });

    // Summary
    console.log('\n========================================');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log(`Score: ${Math.round((passed / (passed + failed)) * 100)}%`);
    console.log('========================================\n');

    console.log('Note: This is your visible test score (40% of final grade).');
    console.log('Additional hidden tests will run after the deadline.\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Test suite error:', err);
    process.exit(1);
});
