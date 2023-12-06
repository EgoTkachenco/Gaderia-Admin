import { useState, useEffect } from 'react';

const useTableAPIRequest = (
  request = async (params) => new Promise(),
  initialParams = { page: 0, limit: 10 }
) => {
  const [params, setParams] = useState(initialParams);
  const [data, setData] = useState(null);
  const [isFetch, setIsFetch] = useState(false);

  const onRequest = () => {
    setIsFetch(true);
    request(params)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsFetch(false);
      });
  };

  useEffect(() => {
    onRequest();
  }, [params]);

  return { data, params, setParams, isFetch, onRequest };
};

export default useTableAPIRequest;
