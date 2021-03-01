import cookieSignature from 'cookie-signature';

export class CookieSignatureHelper {
  static unsignCookie(cookie : string) {
    return cookieSignature.unsign(cookie, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD)
  }
  static signCookie(cookie : string) {
    return cookieSignature.sign(cookie, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD)
  }
}