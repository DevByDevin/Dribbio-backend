import mongoose, { Schema, Document } from 'mongoose';

// 定义 Activity 接口
export interface Activity extends Document {
  name: string;
  description: string;
  date: Date;
  location: string;
  participants: string[];
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

// 定义 Activity Schema
const ActivitySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    participants: {
      type: [String], // 存储参与者的 ID 或名称
      default: [],
    },
    creator: {
      type: String, // 创建者的 ID 或名称
      required: true,
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  }
);

// 导出 Activity 模型
export default mongoose.model<Activity>('Activity', ActivitySchema);
