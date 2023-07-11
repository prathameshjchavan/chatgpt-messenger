"use client";

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from "./NewChat";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";
import ChatRow from "./ChatRow";

const Sidebar = () => {
	const { data: session } = useSession();
	const [chats, loading, error] = useCollection(
		session && collection(db, "users", session.user?.email!, "chats")
	);

	return (
		<div className="p-2 flex flex-col h-screen">
			<div className="flex-1">
				<div>
					<NewChat />

					<div>{/* Model Selection */}</div>

					{/* Map through the ChatRows */}
					{chats?.docs.map((chat) => (
						<ChatRow key={chat.id} id={chat.id} />
					))}
				</div>
			</div>

			{session && (
				<img
					src={session.user?.image!}
					onClick={() => signOut()}
					className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50
			"
					alt={session.user?.name!}
				/>
			)}
		</div>
	);
};

export default Sidebar;
