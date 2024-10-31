import Convert from "../models/Convert";

const conversionService = {
    saveConversion: (input, result, from, to) => {
        const conversion = new Convert(input, result, from, to);
        const conversions = localStorage.getItem('conversions') ? JSON.parse(localStorage.getItem('conversions')) : [];
        conversions.push(conversion.toJSON());
        localStorage.setItem('conversions', JSON.stringify(conversions));
    },

    getAllConversions: () => {
        const conversions = localStorage.getItem('conversions');
        if (!conversions) {
            return [];
        }
        const parsedConversions = JSON.parse(conversions);
        const convertList = parsedConversions.map(item => new Convert(item.input, item.result, item.from, item.to));
        return convertList;
    },

    deleteConversion: (index) => {
        const conversions = localStorage.getItem('conversions') ? JSON.parse(localStorage.getItem('conversions')) : [];
        conversions.splice(index, 1);
        localStorage.setItem('conversions', JSON.stringify(conversions));
    }
};

export default conversionService;

