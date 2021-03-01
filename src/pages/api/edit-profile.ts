import ApiSource from "../../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../../utils/auth/cookie-helper";
import { CookieSignatureHelper } from "@utils/auth/cookie-signature-helper";
import cookieSignature from 'cookie-signature';
import { User } from "@interface/User";

export default async function handler(req: any, res: any) {
  if (req.method !== 'PUT') {
    res.status(404).send('');

  }
  const { name, email, image } = req.body;
  
  const cookies = new Cookies(req, res);
  let token =  CookieSignatureHelper.unsignCookie(cookies.get('token'));
  
  let response;
  try {
    response = await ApiSource.editProfile({
      name,
      email,
      image,
      token,
    });
  } catch (error) {
    console.log(error.response);
    res.status(error.response.status).json(error.response.data);
    return;
  }
  res.status(response.status).json(response.data);
  // console.log('hai', image);
}

