import axios from "axios";

class ApiSource {
  static async login(email, password) {
    const data = {
      email,
      password
    }
    return await axios(`${process.env.NEXT_PUBLIC_API_HOST}login`, data);
  }
}
export default ApiSource;