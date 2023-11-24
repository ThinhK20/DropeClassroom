import { MailDataRequired } from '@sendgrid/mail';

export const activationAccountMail = (
  userEmail: string,
  activationLink: string,
): MailDataRequired => {
  return {
    to: 'nighlord13082002@gmail.com', // change to userEmail if done
    subject: 'Activate your account in Drope Classroom',
    from: 'thinhnguyent.2002@gmail.com', // should not change
    text: `Dear user,
      
    Thank you for registering with Drope Classroom. Please follow the link below to activate your account:
  
    [Activate Account] ${activationLink}
  
    If you did not make this request, you can ignore this email.
  
    Best regards,
    Drope Classroom`,
    html: `<h2>Dear ${userEmail},</h2>
    <p>Thank you for registering with Drope Classroom. Please follow the link below to activate your account:</p>
    <p><a href="${activationLink}">Activate Account</a></p>
    <p>If you did not make this request, you can ignore this email.</p>
    <p>Best regards,<br/>Drope Classroom</p>`,
  };
};
