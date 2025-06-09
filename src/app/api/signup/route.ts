import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { username, email, password, phone } = data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'username, email and password are required' },
        { status: 400 }
      );
    }

    // Path to JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');


    // Read current users
    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    // Append new user
    users.push({ username, email, password, phone: phone || '' });

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User saved successfully' }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'Something went wrong', details: err.message },
      { status: 500 }
    );
  }
}
