import { useState, useEffect, useCallback } from 'react';

const useFetchData = (collectionName) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const getData = useCallback(async () => {
        try {
            const res = await fetch(collectionName, {
                method: 'GET',
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const actualData = await res.json();

            if (!res.ok) {
                alert("Data not found");
            }
            setData(actualData);
        } catch (error) {
            setError(error.message);
        }
    }, [collectionName]);

    useEffect(() => {
        getData();
    }, [getData]);

    return { data, error, refetch: getData };
}

export default useFetchData;