import axios from "axios";

class ApiSource {
  static async login(email : string, password : string, remember_me: string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}login`, {
      email,
      password,
      remember_me,
    });
  }
  
  static async editProfile(fd: object, token: any) {
    return await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}users`, fd, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }
  
  static async register(name : string, email : string, role: string,  password : string, passwordConfirmation: string, grade: string, token: string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}register`, {
      name,
      email,
      role,
      password,
      password_confirmation: passwordConfirmation,
      grade,
    },
    {
      headers:  {'Authorization': `Bearer ${token}`},
    }
    );
  }

  static async getUser(token : string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}user/detail`, { 
      headers: {'Authorization': `Bearer ${token}`}
    });
  }

  static async logout(token : string) {
    const data = null;
    return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}logout`, data,  { 
      headers: {'Authorization': `Bearer ${token}`}
    });
  }
  
  static async getPermissions(token: string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}permission`,  { 
      headers: {'Authorization': `Bearer ${token}`}
    });
  }
  
  static async getUnsignToken() {
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/unsign-token`);
  }
}

export default ApiSource;