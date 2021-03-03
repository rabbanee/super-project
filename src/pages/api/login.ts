import ApiSource from "../../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../../utils/auth/cookie-helper";
import { CookieSignatureHelper } from "@utils/auth/cookie-signature-helper";
import cookieSignature from 'cookie-signature';
import { User } from "@interface/User";

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    const { email, password, remember_me } = req.body;
    console.log(remember_me);
    
    let response;
     try {
      response = await ApiSource.login(email, password, remember_me);
    } catch (error) {
      console.log(error.response.data);
      res.status(error.response.status).json(error.response.data);
      return;
    }
    let data = response.data.user_data;

    const user: User = {
      name:  data.name,
      email:  data.email,
      role:  data.role,
      imageId: data.image_id,
    };

    let userSignature = CookieSignatureHelper.signCookie(JSON.stringify(user));
    let tokenSignature =  CookieSignatureHelper.signCookie(data.token);

    CookieHelper.setTokenCookie(cookies, tokenSignature, data.expires_at);
    CookieHelper.setUserCookie(cookies, userSignature, data.expires_at);
    console.log(response);
    res.status(response.status).json(response.data);
  } else {
    res.status(404).send('');
  }
}

