import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users/current`;

export const enroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/courses/${courseId}/enroll`
  );
  return data;
};

export const unenroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/courses/${courseId}/enroll`
  );
  return data;
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/enrollments`
  );
  return data;
};
