"use client";

import { Fragment } from "react";
import { Toaster } from "react-hot-toast";

const ClientProvider = () => {
	return (
		<Fragment>
			<Toaster position="top-right" />
		</Fragment>
	);
};

export default ClientProvider;
