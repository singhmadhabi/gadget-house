import { useCallback, useState } from "react";

import instance from "../utils/api";
import { URLS } from "../constants";

const useUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const list = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(URLS.USERS);
      setData(data?.data?.data);
      return data.data.data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await instance.post(URLS.USERS, payload);
      setData(data?.data);
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const getById = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await instance.get(`${URLS.USERS}/${id}`);
      return data.data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = async (id, payload) => {
    try {
      setLoading(true);
      const { data } = await instance.delete(`${URLS.USERS}/${id}`, {
        data: payload,
      });
      await list();
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const block = async (id, payload) => {
    try {
      setLoading(true);
      const { data } = await instance.patch(
        `${URLS.USERS}/status/${id}`,
        payload
      );
      await list();
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, payload) => {
    try {
      setLoading(true);
      const { data } = await instance.put(`${URLS.USERS}/profile`, payload);
      setData(data?.data);
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    block,
    create,
    list,
    getById,
    remove,
    update,
  };
};

export default useUsers;