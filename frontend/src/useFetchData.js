import { useState, useEffect } from 'react';

const useFetchData = (collectionName) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(collectionName, {
                    method: 'GET',
                    headers: 
                        { 
                            "Content-Type": "application/json" ,
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                });

                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }

                const actualData = await res.json();
                setData(actualData);
            } catch (error) {
                setError(error.message);
            }
        };

        getData();
    }, [collectionName]);

    return { data, error };
}

export default useFetchData;