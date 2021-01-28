import ApiSource from "../../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../../utils/auth/cookie-helper";
import { SignatureCookieHelper } from "../../utils/auth/signature-cookie-helper";
import cookieSignature from 'cookie-signature';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    const { email, password  } = req.body;
    
    if (!email || !password) {
      res.status(404).send('');
      return;
    }

    let response;
     try {
      response = await ApiSource.login(email, password);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
      return;
    }
    let data = response.data.user_data;

    const user = {
      name:  data.name,
      email:  data.email,
      role:  data.role
    };

    let userSignature = SignatureCookieHelper.signCookie(cookieSignature, JSON.stringify(user));
    let tokenSignature =  SignatureCookieHelper.signCookie(cookieSignature, data.token);

    CookieHelper.setTokenCookie(cookies, tokenSignature, data.expires_at);
    CookieHelper.setUserCookie(cookies, userSignature, data.expires_at);
    
    res.status(response.status).json(response.data);
  } else {
    res.status(404).send('');
  }
}

