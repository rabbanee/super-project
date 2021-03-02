import ApiSource from "../../data/api-source";
import { CookieSignatureHelper } from "@utils/auth/cookie-signature-helper";
import cookieSignature from 'cookie-signature';
import Cookies from 'cookies'
import { CookieHelper } from "../../utils/auth/cookie-helper";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(404).send('');
    return;
  } 
  
  const cookies = new Cookies(req, res);
  const token  = cookies.get('token');
  
  if (!token) {
    res.status(404).send('');
    return;
  }
  
  let unsignToken = await CookieSignatureHelper.unsignCookie(token);
  res.status(200).json(unsignToken);
}