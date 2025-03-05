import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  sender: mongoose.Types.ObjectId;
  group?: mongoose.Types.ObjectId;
  recipients: mongoose.Types.ObjectId[];
  content: string;
  type: 'SMS' | 'GROUP' | 'DIRECT';
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
  twilioMessageSid?: string;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['SMS', 'GROUP', 'DIRECT'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SENT', 'DELIVERED', 'FAILED'],
    default: 'PENDING'
  },
  twilioMessageSid: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);