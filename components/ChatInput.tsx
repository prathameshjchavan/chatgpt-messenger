"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = { chatId: string };

const ChatInput = ({ chatId }: Props) => {
	const [prompt, setPrompt] = useState("");
	const { data: session } = useSession();

	// TODO: use swr to get the model
	const { data: model } = useSWR("model", {
		fallbackData: "gpt-3.5-turbo",
	});

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt) return;

		const input = prompt.trim();

		setPrompt("");

		const message: Message = {
			text: input,
			createdAt: Timestamp.now(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar:
					session?.user?.image ||
					`https://ui-avatars.com/api?name=${session?.user?.name}`,
			},
		};

		await addDoc(
			collection(
				db,
				"users",
				session?.user?.email!,
				"chats",
				chatId,
				"messages"
			),
			message
		);

		const notification = toast.loading("ChatGPT is thinking...");

		// Toast notification
		await fetch("/api/askQuestion", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: input,
				chatId,
				model,
				session,
			}),
		}).then((res) => {
			// Toast notification to say successful!
			toast.success("ChatGPT has responded!", { id: notification });
		});
	};

	return (
		<div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
			<form onSubmit={sendMessage} className="p-5 space-x-5 flex">
				<input
					className="outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
					disabled={!session}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					placeholder="Type your message here..."
				/>

				<button
					className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
					disabled={!session || !prompt}
					type="submit"
				>
					<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
				</button>
			</form>

			<div className="sm:hidden">
				<ModelSelection />
			</div>
		</div>
	);
};

export default ChatInput;
