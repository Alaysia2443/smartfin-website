import { NextResponse } from 'next/server';
import { dbPool } from '@/app/lib/db/db-config';

export const GET = async () => {
    console.log('Testing database connection');

    try {
        // test query
        const result = await dbPool.query('SELECT NOW() as time');
        console.log('Database connection successful:', result.rows[0]);

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            time: result.rows[0].time,
            environment: process.env.NODE_ENV,
            ssl_enabled: !!dbPool.options.ssl
        });
    } catch (error) {
        console.error('Database connection test failed:', error);

        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            environment: process.env.NODE_ENV,
            ssl_enabled: !!dbPool.options.ssl
        }, { status: 500 });
    }
};
