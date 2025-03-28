import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();


export const mailtrapClient = new MailtrapClient({
   endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN  });

// Define the sender and recipients (to be within your Mailtrap inbox)
export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "rupali",
};



