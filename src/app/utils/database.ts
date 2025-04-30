import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('接続成功');
    } catch(error) {
        console.log(error);
        throw new Error('接続失敗');
    }
}

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log('切断成功');
    } catch(error) {
        console.log(error);
        throw new Error('切断失敗');
    }
}