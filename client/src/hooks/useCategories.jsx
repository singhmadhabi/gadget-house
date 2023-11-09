import { useCallback, useState } from "react";

import instance from "../utils/api";
import { URLS } from "../constants";

const useCategories = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const list = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(URLS.CATEGORIES);
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
      const { data } = await instance.post(URLS.CATEGORIES, payload);
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
      const { data } = await instance.get(`${URLS.CATEGORIES}/${id}`);
      return data.data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = async (id) => {
    try {
      setLoading(true);
      const { data } = await instance.delete(`${URLS.CATEGORIES}/${id}`);
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
      const { data } = await instance.put(`${URLS.CATEGORIES}/${id}`, payload);
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
    create,
    list,
    getById,
    remove,
    update,
  };
};

export default useCategories;