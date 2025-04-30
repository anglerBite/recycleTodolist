import { connectDb } from "@/app/utils/database";
import { TaskModel } from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, {params}: {params: {id: string}}) => {
    try {
        await connectDb();
        const {id} = await params;
        await TaskModel.deleteOne({_id: id});
        return NextResponse.json({message: 'delete'}, {status: 200})
    } catch {
        return NextResponse.json({message: 'error'}, {status: 500})
    }
}