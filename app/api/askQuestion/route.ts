import admin from "firebase-admin";
import query from "@/lib/queryApi";
import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

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

		const response = await query(prompt, model);

		const message: Message = {
			text: response || "ChatGPT was unable to find an answer for that!",
			createdAt: admin.firestore.Timestamp.now(),
			user: {
				_id: "ChatGPT",
				name: "ChatGPT",
				avatar: "https://links.papareact.com/89k",
			},
		};

		await adminDb
			.collection("users")
			.doc(session.user.email)
			.collection("chats")
			.doc(chatId)
			.collection("messages")
			.add(message);

		return NextResponse.json({ answer: message.text }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
