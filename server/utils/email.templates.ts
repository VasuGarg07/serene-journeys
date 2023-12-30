import { BASE_URL } from "../configuration/config";

export const verifyEmailSubject = "Verify your Email Address";
export const verifyEmailBody = (token: string) => {
  return (`
  <div>
   <p style="margin-top:0;margin-bottom:20px">Click the link below to sign in to your Medium account.</p>
   <p style="margin-top:0;margin-bottom:20px">This link will expire in 6 hours and can only be used once.</p>
   <p style="margin-top:0;margin-bottom:20px"><a href="${BASE_URL}verify-email?token=${token}" target="_blank">Sign in to Story Sphere</a></p>
   <div style="font-size:14px">
      If the button above doesn’t work, paste this link into your web browser:
      <p style="margin-top:0;margin-bottom:20px">${BASE_URL}verify-email?token=${token}</p>
   </div>
   <div class="m_807911578132395757email-disclaimer" style="color:#b3b3b1;font-size:14px;margin-top:50px;margin-right:0;margin-bottom:50px;margin-left:0">If you did not make this request, you can safely ignore this email.</div>
</div>
  `);
} 