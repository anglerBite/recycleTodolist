import { connectDb, disconnectDb } from "@/app/utils/database"
import { TaskModel } from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, {params}: {params: {id: string}}) => {
    try {
        await connectDb();
        const {content} = await req.json();
        const {id} = await params;
        const res = await TaskModel.findByIdAndUpdate({_id: id}, {content}, {new: true});
        await disconnectDb();
        return NextResponse.json(res, {status: 200});
    } catch {
        return NextResponse.json({message: '更新に失敗'}, {status: 500});
    }

}