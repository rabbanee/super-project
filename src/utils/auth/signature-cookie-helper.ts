export class SignatureCookieHelper {
  static unsignCookie(cookieSignature: any, cookie : string) {
    return cookieSignature.unsign(cookie, process.env.COOKIE_SIGNATURE_PASSWORD)
  }
  static signCookie(cookieSignature: any, cookie : string) {
    return cookieSignature.sign(cookie, process.env.COOKIE_SIGNATURE_PASSWORD)
  }
}