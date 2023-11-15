import { useEffect, useState } from "react"
import Section from "src/components/Section"
import makeRequest from "src/utils/api";

const DefaultList = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await makeRequest({ type: "country", method: "get", url: "" });
                res.then(data => setData(data))
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])

    return (
        <Section >

        </Section>
    )
}

export default DefaultList