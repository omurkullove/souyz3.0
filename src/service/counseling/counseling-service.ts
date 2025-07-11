import type { IResponse } from "@my_types/main-types";
import { API } from "@src/axios";
import { requestHandler } from "../request-handler";

class CounselingService {
	async publicReception(data: FormData): Promise<IResponse> {
		return requestHandler(() => API.post("/org/counseling", data));
	}
}

export default new CounselingService();
