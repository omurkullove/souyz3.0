import { permanentRedirect } from "next/navigation";

const LegalCenter = () => {
	return permanentRedirect("/");

	// return <LegalCenterView />;
};

export default LegalCenter;
