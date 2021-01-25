import ApiSource from "../../data/api-source";
import { SignatureCookieHelper } from "../../utils/server/auth/signature-cookie-helper";
import cookieSignature from 'cookie-signature';
import Cookies from 'cookies'
import { CookieHelper } from "../../utils/server/auth/cookie-helper";

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
  
  let unsignToken = await SignatureCookieHelper.unsignCookie(cookieSignature, token);
  
  let response;
  try {
    response = await ApiSource.logout(unsignToken);
  } catch (error) {
    if (error.response.status === 401) {
      CookieHelper.resetCookie(cookies);
    }
    res.status(error.response.status).json(error.response.data);
    return;
  }
  CookieHelper.resetCookie(cookies);
  res.status(response.status).json(response.data);
}