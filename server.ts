import express from 'express';
import cors from 'cors';
import { getUsers, getUserByEmail, createUser } from '@/app/lib/db/users';
import { compare } from 'bcrypt-ts';

const app = express();
app.use(express.json());
//app.use(cors({ origin: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',  credentials: true }));
app.use(cors());
// app.use(cors({
//     origin: process.env.NODE_ENV === 'production'
//         ? 'https://v0-smartfin-website-remake.vercel.app'
//         : 'http://localhost:3000',
//     methods: ['POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type']
// }));


// User endpoints
export const getUsersHandler = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const loginHandler = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isValid = await compare(password, user.password);

        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const { password: _, ...safeUser } = user;
        res.json(safeUser);
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Configure routes
app.get('/api/users', getUsersHandler);
app.post('/api/users', createUserHandler);
app.post('/api/auth/login', loginHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
