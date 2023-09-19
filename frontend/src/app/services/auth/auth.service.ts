import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import axios from 'axios';
import { axiosAuth } from '../../config/AxiosAuth';

interface UserData {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  constructor() {}

  async SignInUser(userData: UserData): Promise<boolean> {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/login`,
        userData
      );
      const { token, userInfo }: { token: string; userInfo: User } = data;
      this.user = userInfo;
      localStorage.setItem('token', JSON.stringify(token));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async RegisterUser(userData: UserData): Promise<boolean> {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/register`,
        userData
      );
      const { token, userInfo }: { token: string; userInfo: User } = data;
      this.user = userInfo;
      localStorage.setItem('token', JSON.stringify(token));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async getAuthorization(): Promise<User | null> {
    if (localStorage.getItem('token')) {
      try {
        const { data }: { data: User } = await axiosAuth.get(
          `http://localhost:5000/auth`
        );
        this.user = data;
        return this.user;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
    return null;
  }

  SignOutUser(): null {
    this.user = null;
    localStorage.removeItem('token');
    return this.user;
  }
}
