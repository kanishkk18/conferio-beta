// lib/nextAuthAdapter.ts
import axios from 'axios';
import { Adapter } from 'next-auth/adapters';
// import { User } from '../database/entities/user.entity';

export function ExpressAdapter(): Adapter {
  return {
    async createUser(user) {
      const response = await axios.post('http://localhost:8000/api/auth/create-user', user);
      return response.data;
    },
    async getUser(id) {
      const response = await axios.get(`http://localhost:8000/api/auth/user/${id}`);
      return response.data;
    },
    async getUserByEmail(email) {
      const response = await axios.get(`http://localhost:8000/api/auth/user?email=${email}`);
      return response.data;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const response = await axios.get(
        `http://localhost:8000/api/auth/account?provider=${provider}&providerAccountId=${providerAccountId}`
      );
      return response.data;
    },
    async updateUser(user) {
      const response = await axios.put(`http://localhost:8000/api/auth/user/${user.id}`, user);
      return response.data;
    },
    async deleteUser(userId) {
      await axios.delete(`http://localhost:8000/api/auth/user/${userId}`);
    },
    async linkAccount(account) {
      const response = await axios.post('http://localhost:8000/api/auth/account', account);
      return response.data;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await axios.delete(
        `http://localhost:8000/api/auth/account?provider=${provider}&providerAccountId=${providerAccountId}`
      );
    },
    async createSession({ sessionToken, userId, expires }) {
      const response = await axios.post('http://localhost:8000/api/auth/session', {
        sessionToken,
        userId,
        expires,
      });
      return response.data;
    },
    async getSessionAndUser(sessionToken) {
      const response = await axios.get(`http://localhost:8000/api/auth/session?sessionToken=${sessionToken}`);
      return response.data;
    },
    async updateSession({ sessionToken }) {
      const response = await axios.put(`http://localhost:8000/api/auth/session`, { sessionToken });
      return response.data;
    },
    async deleteSession(sessionToken) {
      await axios.delete(`http://localhost:8000/api/auth/session?sessionToken=${sessionToken}`);
    },
  };
}