import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	organization: "org-7UkcTeYewZgOTlGmnAWxg3f7",
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
