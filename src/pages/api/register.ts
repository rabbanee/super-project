import ApiSource from "@data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "@utils/auth/cookie-helper";
import { CookieSignatureHelper } from "@utils/auth/cookie-signature-helper";
import cookieSignature from 'cookie-signature';
import { User } from "@interface/User";

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    const { name, email, password, role, passwordConfirmation, grade } = req.body;
    const token = cookies.get('token');
    let tokenUnsign =  CookieSignatureHelper.unsignCookie(token);
    
    let response;
     try {
      response = await ApiSource.register(name, email, role, password, passwordConfirmation, grade, tokenUnsign);
    } catch (error) {
      console.log(error.response.data);
      res.status(error.response.status).json(error.response.data);
      return;
    }
    res.status(response.status).json(response.data);
  } else {
    res.status(404).send('');
  }
}

