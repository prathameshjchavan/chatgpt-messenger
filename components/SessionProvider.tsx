"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";

type Props = { children: ReactNode; session: Session | null };

const SessionProvider = ({ children, session }: Props) => {
	return <Provider session={session}>{children}</Provider>;
};

export default SessionProvider;
