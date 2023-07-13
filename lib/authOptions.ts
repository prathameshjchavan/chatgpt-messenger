import GoogleProvider from "next-auth/providers/google";

const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
};

export default authOptions;
