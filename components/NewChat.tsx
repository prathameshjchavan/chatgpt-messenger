"use client";

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NewChat = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const createNewChat = async () => {
		if (!session?.user?.email) return;

		const doc = await addDoc(
			collection(db, "users", session.user.email, "chats"),
			{ userId: session.user.email, createdAt: Timestamp.now() }
		);

		router.push(`/chat/${doc.id}`);
	};

	return (
		<div onClick={createNewChat} className="border-gray-700 border chatRow">
			<PlusIcon className="h-4 w-4" />
			<p>New Chat</p>
		</div>
	);
};

export default NewChat;
