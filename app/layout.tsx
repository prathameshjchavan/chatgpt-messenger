import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
	title: "ChatGPT Messenger",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body>
				<SessionProvider session={session}>
					{!session ? (
						<Login />
					) : (
						<div className="flex">
							<div className="bg-[#202123] max-w-xs overflow-y-auto h-screen md:min-w-[20rem]">
								<Sidebar />
							</div>

							{/* Client Provider - Notification */}
							<ClientProvider />

							<div className="bg-[#343541] flex-1">{children}</div>
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
