import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

export async function POST(req: Request) {
  try {
    const { email, password, originalEmail } = await req.json();

    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((u: any) => u.email === originalEmail);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (email) users[userIndex].email = email;
    if (password) users[userIndex].password = password;

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User updated' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update', details: error.message }, { status: 500 });
  }
}
