import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const xmlToJSON = (xml: string): any => {
    const parser = new XMLParser();
    return parser.parse(xml);
};

export { xmlToJSON };
