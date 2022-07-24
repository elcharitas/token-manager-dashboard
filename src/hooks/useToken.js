import { useEffect, useState } from "react";
import logger from "react-hot-toast";
import { manager } from "src/utils";

const useToken = ({ method = "totalSupply", ...opts }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (method, ...params) => {
    const contract = await manager({ logger, ...opts });
    return await contract[method](...params);
  };

  useEffect(() => {
    if (opts.skip !== true && !loading) {
      setLoading(true);
      mutate(method, ...(opts.args || []))
        .then(setResult)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [opts.skip]);

  return { mutate, result, error };
};

export { useToken };
