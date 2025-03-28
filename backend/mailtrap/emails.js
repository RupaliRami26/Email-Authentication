import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]; // Structuring the recipient as an array with an object containing the email

  try {
    // Sending the email via mailtrapClient
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error('Error sending verification email', error);
    console.error('Full error details:', error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name, companyInfoName = "Auth") => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "c4239c8a-c8a3-4d82-875f-d473f92e2714",
      template_variables: {
        company_info_name: companyInfoName,
        name: name,
      }
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log('Error sending welcome email', error);
    console.error('Full error details:', error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail= async (email, resetURL) =>{
  const recipient =[{email}];

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
      category: "Password Reset",
    })
  }catch (error){
   console.error(`Error sending password reset email`, error);
   throw new Error(`Error sending password reset email : ${error}`);
  }
}

export const sendResetSuccessEmail= async(email) => {
  const recipient = [{email}];
  try{
    const response =await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  }catch(error) {
  console.error(`Error sending password reset success email`, error);
  throw new Error(`Error sending password reset success email : ${error}`);
  }
}