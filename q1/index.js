const express = require('express');
const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// POST endpoint to calculate average
app.post('/average', (req, res) => {
    const nums = req.body.numbers;

    // Validate input
    if (!Array.isArray(nums) || nums.length === 0) {
        return res.status(400).send('Please provide a non-empty array of numbers');
    }

    // Calculate sum
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }

    // Calculate average
    const average = sum / nums.length;

    res.send('Average is: ' + average.toFixed(2));
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
