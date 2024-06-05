const nodemailer = require('nodemailer');
import moment from "moment";
import { Job, scheduleJob } from 'node-schedule';
import { ITodo } from '../models/todo';

const MAILID = process.env.MAILID!
const MAILPASS = process.env.MAILPASS!

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAILID,
    pass: MAILPASS,
  },
});

const sendEmail = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: MAILID,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log({ MAILID, MAILPASS })
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const jobs: { [key: string]: Job } = {};

export const scheduleEmailReminder = (email: string, todo: ITodo) => {
  if (todo.reminderTime && !todo.completed) {
    const job = scheduleJob(todo.reminderTime, () => {
      const subject = `Reminder: ${todo.title}`;
      const text = `You have a task due: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${moment(todo.dueDate).format('D/M/YYYY h:mm A')}`;
      sendEmail(email, subject, text);
    });
    jobs[todo.id] = job;
  }
};

export const cancelEmailReminder = (todoId: string) => {
  if (jobs[todoId]) {
    jobs[todoId].cancel();
    delete jobs[todoId];   
  }
};