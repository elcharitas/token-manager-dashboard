import { useEffect, useState } from "react";
import { manager } from "src/utils";

const useToken = ({ method = "totalSupply", ...opts }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (method, ...params) => {
    const contract = await manager(opts);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.skip]);

  return { mutate, loading, result, error };
};

export { useToken };
