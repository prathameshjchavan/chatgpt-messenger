interface Message {
	text: string;
	createdAt: admin.firestore.Timestamp;
	user: {
		_id: string;
		name: string;
		avatar: string;
	};
}

interface ModelResponseBody {
	modelOptions: Option[];
}

interface Option {
	value: string;
	label: string;
}
