import { GoogleGenerativeAI } from '@google/generative-ai';

export const gemini = (() => {
    let genAI = undefined;
    let model = undefined;

    const instance = Object.freeze({
        config: {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json'
            // responseSchema: {
            //     type: 'object',
            //     properties: {
            //     location: { type: 'string' },
            //     characteristics: {
            //         type: 'string',
            //         enum: keywords.map(key => key.replace(/^"|"$/g, ''))
            //     },
            //     can_impact_logistics_operations: { type: 'boolean' },
            //     recommendation: { type: 'string' },
            //     severity: {
            //         type: 'string',
            //         enum: ['very high', 'high', 'medium', 'low']
            //     },
            //     id: { type: 'number' }
            //     }
            // }
        },

        init: function (key) {
            genAI = new GoogleGenerativeAI(key);
            model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
            return this;
        },

        evaluate: async function (cardDetail) {
            if (!model) throw Error('model not initialized!');

            const chatSession = model.startChat({ generationConfig: this.config });

            const staticPrompt = `this text has been picked from a business card via OCR, go though it and provide details such as person's Name, Company Name, Address, company email, person's email, phone number and designation in key value pairs in json format. Do not add more key value pairs, i want only key "company_name","person_name","website","email","contact_number","designation","fax_number","address","pin_code", and if there is multiple contact number put it in a single string with comma seprated and same for email also ${cardDetail}`;

            const result = await chatSession.sendMessage(staticPrompt);

            const textResult = result.response.text();

            return textResult;
        }
    });

    return instance;
})();
