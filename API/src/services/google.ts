import axios from 'axios';

export async function getUserInfo(id_token: string): Promise<any> {
  try {
    const response = await axios({
      method: 'get',
      url: `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
      headers: {}
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw { message: error.response?.data.error };
    } else {
      throw { message: error };
    }
  }
}
