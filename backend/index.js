const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// مسیر GET برای تست سرور
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// مسیر POST برای حدس عدد
app.post('/api/guess', (req, res) => {
    const { number } = req.body;
    attempts++;

    let message = "";
    if (number > secretNumber) {
        message = "عدد وارد شده بزرگتر است";
    } else if (number < secretNumber) {
        message = "عدد وارد شده کوچکتر است";
    } else {
        message = `آفرین! درست حدس زدی در ${attempts} تلاش`;
        // Reset بازی فقط بعد از حدس درست
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
    }

    res.json({ message, attempts });
});

// گوش دادن روی همه اینترفیس‌ها (برای دسترسی از شبکه)
app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));
