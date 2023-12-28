import { useState, useEffect } from 'react';

const useTableAPIRequest = (
  request = async (params) => new Promise(),
  initialParams = {}
) => {
  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    ...initialParams,
  });
  const [data, setData] = useState(null);
  const [isNext, setIsNext] = useState(true);
  const [isFetch, setIsFetch] = useState(false);

  const onRequest = () => {
    setIsFetch(true);
    setIsNext(true);
    request(params)
      .then((res) => {
        setData(res.data.data);
        if (res.data.data.length < params.limit) setIsNext(false);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsFetch(false);
      });
  };

  const nextPage = () =>
    setParams((params) => ({ ...params, page: params.page + 1 }));
  const prevPage = () =>
    setParams((params) => ({ ...params, page: params.page - 1 }));

  const isPrev = params.page !== 0;

  useEffect(() => {
    onRequest();
  }, [params]);

  return {
    data,
    params,
    setParams,
    isFetch,
    onRequest,
    isNext,
    nextPage,
    prevPage,
    isPrev,
  };
};

export default useTableAPIRequest;
