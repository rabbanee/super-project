import axios from "axios";

class ApiSource {
  static async login(email : string, password : string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}login`, {
      email,
      password
    });
  }
  
  static async register(name : string, email : string, role: number,  password : string, cPassword: string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}register`, {
      name,
      email,
      role,
      password,
      c_password: cPassword
    });
  }

  static async getUser(token : string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}user`, { 
      headers: {'Authorization': `Bearer ${token}`}
    });
  }

  static async logout(token : string) {
    const data = null;
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}logout`, data,  { 
      headers: {'Authorization': `Bearer ${token}`}
    });
  }
}
export default ApiSource;