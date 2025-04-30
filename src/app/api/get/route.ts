import { connectDb, disconnectDb } from "@/app/utils/database";
import { TaskModel } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDb()
        const data = await TaskModel.find({});
        await disconnectDb();
        return NextResponse.json(data, {status: 200});
    } catch  {
        return NextResponse.json({message: '取得に失敗'}, {status: 500});
    }
}