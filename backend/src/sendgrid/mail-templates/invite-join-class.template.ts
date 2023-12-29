import { MailDataRequired } from '@sendgrid/mail';
import { inviteListUserDto } from 'src/classroom/dto';

export const inviteJoinClassMail = (
  userEmail: inviteListUserDto,
  activationLink: string,
): MailDataRequired => {
  return {
    to: userEmail.userId.email, // change to userEmail if done
    subject: `Invitation to join my class in Drope Classroom`,
    from: 'thinhnguyent.2002@gmail.com', // should not change
    text: `Dear user,
      
    You have been invited to join ${userEmail.classId.className} Drope Classroom. Please follow the link below to join class:
  
    [Join] ${activationLink}
  
    If you did not make this request, you can ignore this email.
  
    Best regards,
    Drope Classroom`,
    html: `<h2>Dear ${userEmail.userId.email},</h2>
    <p>Thank you for registering with Drope Classroom. Please follow the link below to activate your account:</p>
    <p>${activationLink}</p>
    <p>If you did not make this request, you can ignore this email.</p>
    <p>Best regards,<br/>Drope Classroom</p>`,
  };
};
