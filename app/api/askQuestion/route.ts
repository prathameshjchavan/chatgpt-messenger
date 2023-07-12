import query from "@/lib/queryApi";
import { serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { prompt, chatId, model, session } = await request.json();

		if (!prompt) {
			return NextResponse.json(
				{ answer: "Please provide a prompt!" },
				{ status: 400 }
			);
		}

		if (!chatId) {
			return NextResponse.json(
				{ answer: "Please provide a valid chat ID!" },
				{ status: 400 }
			);
		}

		// ChatGPT query
		const response = await query(prompt, model);

		// const message: Message = {
		// 	text: response || "ChatGPT was unable to find an answer for that!",
		// 	createdAt: serverTimestamp(),
		// 	user: {},
		// };

		return NextResponse.json("Hello World", { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
