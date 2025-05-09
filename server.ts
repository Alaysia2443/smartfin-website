import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors);

const dataPath = path.join(__dirname, 'data/users.json');

async function getUsersData() {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
}

async function saveUsersData(data: any) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// Get all users
app.get('/api/users', async (req, res) => {
    const data = await getUsersData();
    res.json(data.users);
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    const data = await getUsersData();
    const user = data.users.find((u: any) => u.id === Number(req.params.id));
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
});

// Create user (signup)
app.post('/api/users', async (req, res) => {
    const data = await getUsersData();
    const newUser = {
        id: Date.now(), // simple unique ID
        ...req.body
    };
    data.users.push(newUser);
    await saveUsersData(data);
    res.status(201).json(newUser);
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    const data = await getUsersData();
    const idx = data.users.findIndex((u: any) => u.id === Number(req.params.id));
    if (idx !== -1) {
        data.users[idx] = { ...data.users[idx], ...req.body };
        await saveUsersData(data);
        res.json(data.users[idx]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    const data = await getUsersData();
    const idx = data.users.findIndex((u: any) => u.id === Number(req.params.id));
    if (idx !== -1) {
        const deleted = data.users.splice(idx, 1);
        await saveUsersData(data);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Login endpoint (simple check)
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const data = await getUsersData();
    const user = data.users.find((u: any) => u.email === email && u.password === password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
