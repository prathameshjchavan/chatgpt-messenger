import NewChat from "./NewChat";

const Sidebar = () => {
	return (
		<div className="p-2 flex flex-col">
			<div className="flex-1">
				<div>
					<NewChat />

					<div>{/* Model Selection */}</div>

					{/* Map through the ChatRows */}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
