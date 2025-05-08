// Import necessary libraries
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const { Pool } = require('pg'); // Import Pool from node-postgres

// --- Express App Setup ---
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// --- Middleware ---
// Enable CORS for all origins (adjust in production for security)
app.use(cors());
// Middleware to parse JSON request bodies (if you need to handle POST/PUT later)
app.use(express.json());

// --- Database Connection Configuration ---
// IMPORTANT: Use environment variables in production!
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '159875321', // Make sure this is correct!
    port: 5432,
};

// Create a PostgreSQL connection pool
const pool = new Pool(dbConfig);

// --- app.js additions ---

const bcrypt = require('bcrypt'); // Import bcrypt
const saltRounds = 10; // Cost factor for hashing - higher is slower but more secure

// --- Existing code (pool definition, middleware, /developers route, etc.) ---

// --- REGISTER Route ---
app.post('/register', async (req, res) => {
    // 1. Get data from request body
    const { username, category, portfio, description, email, password } = req.body; // Assuming frontend sends these
    console.log("Register attempt:", { username, email }); // Don't log password

    // 2. Basic Validation (Add more robust validation as needed)
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    let client; // Define client outside try/catch for release in finally

    try {
        // 3. Check if username or email already exists
        client = await pool.connect(); // Get a client connection
        const checkSql = 'SELECT * FROM developrs WHERE username = $1 OR email = $2 LIMIT 1;';
        const checkResult = await client.query(checkSql, [username, email]);

        if (checkResult.rows.length > 0) {
            const existingUser = checkResult.rows[0];
            let conflictField = '';
            if (existingUser.username === username) {
                conflictField = 'Username';
            } else if (existingUser.email === email) {
                conflictField = 'Email';
            }
             console.log(`${conflictField} already exists: ${username}/${email}`);
            return res.status(409).json({ error: `${conflictField} already exists.` }); // 409 Conflict
        }

        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Password hashed for user: ${username}`);

        // 5. Insert the new user (developer)
        // Adjust column names (name, skill) as needed for your 'developrs' table
        // Assuming you might want username/email and maybe a default/placeholder skill for now
        const insertSql = `
            INSERT INTO developrs (username, category, portfio, description, email, password_hash)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, email;
        `;
        // Using username as name and 'pending' as skill for example:
        const insertValues = [username, category, portfio, description, email, hashedPassword];
        const insertResult = await client.query(insertSql, insertValues);

        console.log("User registered successfully:", insertResult.rows[0]);

        // 6. Send success response (don't send back the hash!)
        res.status(201).json({ // 201 Created
            message: 'Developer registered successfully!',
            developer: insertResult.rows[0] // Send back the created user info (minus password)
        });

    } catch (error) {
        console.error('Error during registration:', error.stack);
        res.status(500).json({ error: 'Internal server error during registration.' });
    } finally {
         if (client) {
            client.release(); // ALWAYS release the client
            console.log("Registration client released.");
         }
    }
});

// --- Login Route (Basic Example - Needs JWT/Sessions for real apps) ---
// This is a simplified example. Real login needs secure session/token handling.
app.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // Use 'identifier' for username or email
    console.log("Login attempt:", { identifier });

    if (!identifier || !password) {
        return res.status(400).json({ error: 'Username/email and password are required.' });
    }

     let client;

    try {
         client = await pool.connect();
        // Find user by username OR email
        const findSql = 'SELECT * FROM developrs WHERE username = $1 OR email = $1 LIMIT 1;';
        const findResult = await client.query(findSql, [identifier]);

        if (findResult.rows.length === 0) {
             console.log(`Login failed: User not found - ${identifier}`);
            return res.status(401).json({ error: 'Invalid credentials.' }); // Unauthorized
        }

        const user = findResult.rows[0];

        // Compare submitted password with stored hash
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            console.log(`Login successful for user: ${user.username}`);
            // **IMPORTANT:** In a real app, you'd create a session or JWT here
            // and send it back to the client.
            // For this example, just send success message and user info (minus hash)
            res.status(200).json({
                message: 'Login successful!',
                developer: {
                    id: user.id,
                    username: user.username,
                    category: user.category,
                    portfio: user.portfio,
                    description: user.description,
                    email: user.email
                    // Add other non-sensitive fields you want to send
                }
                // token: 'YOUR_GENERATED_JWT_HERE' // Example for JWT
            });
        } else {
             console.log(`Login failed: Incorrect password for user: ${user.username}`);
            return res.status(401).json({ error: 'Invalid credentials.' }); // Unauthorized
        }

    } catch (error) {
        console.error('Error during login:', error.stack);
        res.status(500).json({ error: 'Internal server error during login.' });
    } finally {
        if (client) {
             client.release();
             console.log("Login client released.");
        }
    }
});


app.get('/orders', async (req, res) => {
    // 1. Get userId from query parameters
    const { userId } = req.query;
    console.log("Fetching orders for userId:", userId);

    // 2. Validate userId
    if (!userId) {
        // It's debatable whether missing userId is 400 Bad Request or just results in empty list/401 Unauthorized
        // Let's return 400 for clarity here.
        return res.status(400).json({ error: 'userId query parameter is required.' });
    }

    let client;

    try {
        client = await pool.connect();
        // 3. Query orders based on developer_id (assuming your foreign key column is developer_id)
        //    Make sure the column name matches your actual 'orders' table schema!
        const findSql = 'SELECT * FROM orders WHERE developer_id = $1 ORDER BY start_date DESC;'; // Added ORDER BY
        const findResult = await client.query(findSql, [userId]);

        const orders = findResult.rows; // The array of orders

        console.log(`Found ${orders.length} orders for user: ${userId}`);

        // 4. Send the array of orders directly as JSON
        res.status(200).json(orders); // Send the array itself

    } catch (error) {
        console.error('Error fetching user orders:', error.stack);
        res.status(500).json({ error: 'Internal server error while fetching orders.' });
    } finally {
        if (client) {
            client.release();
            console.log("Orders fetch client released.");
        }
    }
});


// --- Route to Update Order Status ---
app.patch('/orders/:orderId/status', async (req, res) => {
    // 1. Extract parameters and request body data
    const { orderId } = req.params; // Get orderId from the URL path (:orderId)
    const { status: newStatus } = req.body; // Get the new status from the request body

    console.log(`Received status update request for order: ${orderId} to status: ${newStatus}`);

    // 2. Validate Input
    // Convert orderId to a number for database query/validation
    const orderIdNum = parseInt(orderId, 10);
    if (isNaN(orderIdNum)) {
        return res.status(400).json({ error: 'Invalid order ID format. Must be a number.' });
    }

    if (!newStatus) {
        return res.status(400).json({ error: 'New status is required in the request body.' });
    }

    // Optional but recommended: Validate against allowed statuses
    const allowedStatuses = ['Waiting', 'In Progress', 'Completed']; // Match your frontend STATUS_OPTIONS
    if (!allowedStatuses.includes(newStatus)) {
        return res.status(400).json({
            error: `Invalid status value provided. Allowed values are: ${allowedStatuses.join(', ')}`
        });
    }

    // 3. Database Interaction
    let client;
    try {
        client = await pool.connect();

        // Construct the UPDATE SQL query
        // IMPORTANT: Use the correct primary key column name from your 'orders' table.
        // Based on your SQL schema, the PK is 'order_number'. We assume orderId from the URL corresponds to this.
        const updateSql = `
            UPDATE orders
            SET status = $1
            WHERE order_number = $2
            RETURNING order_number, status; -- Return updated info to confirm
        `;
        const values = [newStatus, orderIdNum];

        // Execute the query
        const result = await client.query(updateSql, values);

        // 4. Check if any row was actually updated
        if (result.rowCount === 0) {
            // If rowCount is 0, no order with that order_number was found
            console.log(`Status update failed: Order ${orderIdNum} not found.`);
            return res.status(404).json({ error: `Order with ID ${orderIdNum} not found.` });
        }

        // 5. Send Success Response
        console.log(`Successfully updated status for order ${orderIdNum} to ${newStatus}`);
        res.status(200).json({
            message: 'Order status updated successfully!',
            updatedOrder: result.rows[0] // Send back the updated status info
        });

    } catch (error) {
        // 6. Handle Potential Errors
        console.error(`Database error updating status for order ${orderIdNum}:`, error.stack);
        res.status(500).json({ error: 'Internal server error while updating order status.' });
    } finally {
        // 7. Release the database client
        if (client) {
            client.release();
            console.log(`Status update client released for order ${orderIdNum}.`);
        }
    }
});


app.get('/api/developers', async (req, res) => {
    let client;
    try {
      client = await pool.connect();
      const result = await client.query('SELECT username, portfio, description, category FROM developrs');
      res.json(result.rows);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).send('Server error');
    }
  });
  


// --- Existing app.listen(...) and graceful shutdown ---

// --- Test Database Connection (Optional - Runs once on startup) ---
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client for connection test:', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release(); // Release client immediately
        if (err) {
            return console.error('Error executing test query:', err.stack);
        }
        console.log('Successfully connected to database. Server time:', result.rows[0].now);
    });
});


// --- API Routes ---

// Define a GET route to fetch all developers
app.get('/developers', async (req, res) => {
    console.log("Received request for /developers");
    try {
        // Define the SQL query
        // Selecting specific columns is generally better practice than SELECT *
        const sql = 'SELECT id, username, portfio, description, category FROM developrs ORDER BY created_at DESC;'; // Now includes id

        // Execute the query using the pool
        const result = await pool.query(sql);

        console.log("Successfully fetched developers data.");

        // Send the results back as JSON
        res.status(200).json(result.rows);

    } catch (error) {
        // Log the error on the server
        console.error('Error fetching developers:', error.stack);

        // Send an error response to the client
        res.status(500).json({ error: 'Failed to fetch developers from the database.' });
    }
});

// Define a basic root route (optional)
app.get('/', (req, res) => {
    res.send('Hello! This is the Developer API backend.');
});

// --- Add POST /orders endpoint ---
app.post('/contact', async (req, res) => {
    const { developer_id, name, description, budget, phone } = req.body;
    if (!developer_id || !name || !description || !budget || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    let client;
    try {
        client = await pool.connect();
        const insertSql = `
            INSERT INTO orders (developer_id, start_date, name, description, budget, phone)
            VALUES ($1, NOW(), $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [developer_id, name, description, budget, phone];
        const result = await client.query(insertSql, values);
        res.status(201).json({ message: 'Order created successfully!', order: result.rows[0] });
    } catch (error) {
        console.error('Error creating order:', error.stack);
        res.status(500).json({ error: 'Internal server error while creating order.' });
    } finally {
        if (client) client.release();
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
    console.log(`Access the developers endpoint at: http://localhost:${port}/developers`);
});


// --- Graceful Shutdown (Optional but Good Practice) ---
process.on('SIGINT', async () => {
    console.log("\nCaught interrupt signal (Ctrl+C). Shutting down gracefully.");
    try {
        await pool.end(); // Close the database pool
        console.log("Database pool closed.");
        process.exit(0); // Exit the process cleanly
    } catch (err) {
        console.error("Error during shutdown:", err.stack);
        process.exit(1); // Exit with an error code
    }
});