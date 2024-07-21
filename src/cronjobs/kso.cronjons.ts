import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import axios from "axios";

const getKsoProducts = async (): Promise<GeneralResponseInterface> => {
    const xmlAddress = "https://www.kabasakalonline.com/cimri.xml";

    // Fetch the XML data from the given address
    const response = await axios.get(xmlAddress, {
        headers: {
            "Content-Type": "application/xml",
        },
    });

    // Parse the XML data
    const xmlData = response.data;
    console.log(xmlData, "xmlData");

    return {
        success: true,
        message: "Products are fetched successfully",
        data: [],
    };
};

export { getKsoProducts };
