import { MailDataRequired } from '@sendgrid/mail';

export const renewPasswordMail = (
  userEmail: string,
  renewPasswordLink: string,
): MailDataRequired => {
  return {
    to: userEmail, // change to userEmail if done
    subject: 'Password Renewal',
    from: 'thinhnguyent.2002@gmail.com', // should not change
    text: `Dear user,
      
        You have requested to renew your password. Please follow the link below to reset your password:
      
        [Reset Password] ${renewPasswordLink}
      
        If you did not make this request, you can ignore this email.
      
        Best regards,
        Drope Classroom`,
    html: `<h2>Dear ${userEmail},</h2>
        <p>You have requested to renew your password. Please follow the link below to reset your password:</p>
        <p><a href="${renewPasswordLink}">Reset Password</a></p>
        <p>If you did not make this request, you can ignore this email.</p>
        <p>Best regards,<br/>Drope Classroom</p>`,
  };
};
