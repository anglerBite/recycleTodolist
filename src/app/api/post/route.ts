import { connectDb, disconnectDb } from "@/app/utils/database";
import { TaskModel } from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const {text} = await req.json();
        const newTask = await TaskModel.create({content: text});
        await disconnectDb();
        return NextResponse.json(newTask, {status: 200});
    } catch {
        return NextResponse.json({message: 'error'}, {status: 500});
    }
}