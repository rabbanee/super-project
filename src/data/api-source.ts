import axios from "axios";

class ApiSource {
  static async login(email : string, password : string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}login`, {
      email,
      password
    });
  }

  static async getUser(token : string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}user`, { 
      headers: {'Authorization' : token}
    });
  }
}
export default ApiSource;