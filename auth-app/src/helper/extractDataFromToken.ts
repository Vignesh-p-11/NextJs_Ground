import {NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken=(request:NextRequest)=>{
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}