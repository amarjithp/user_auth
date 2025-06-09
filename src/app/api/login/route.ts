import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'Something went wrong', details: err.message },
      { status: 500 }
    );
  }
}
