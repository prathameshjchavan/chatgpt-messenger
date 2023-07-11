type Props = {
	params: {
		id: string;
	};
};

const ChatPage = ({ params: { id } }: Props) => {
	return <div>Chat Page: {id}</div>;
};

export default ChatPage;
