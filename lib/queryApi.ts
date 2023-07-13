import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
	const res = await openai
		.createChatCompletion({
			model,
			messages: [{ role: "user", content: prompt }],
			temperature: 0.8,
			top_p: 1,
			max_tokens: 1000,
			presence_penalty: 0,
			frequency_penalty: 0,
		})
		.then((res) => res.data.choices[0].message?.content)
		.catch(
			(error) =>
				`ChatGPT was unable to find an answer for that! (Error: ${error.message})`
		);

	return res;
};

export default query;
