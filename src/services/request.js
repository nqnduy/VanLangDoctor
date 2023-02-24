import axios from "axios";
import { UrlBackEnd } from "../constants/oidc-config";

const config = {
    baseURL: UrlBackEnd
}

class RequestService {
    axios;
    jwt_decode;
    constructor() {
        this.axios = axios.create(config)
    }
}

export default new RequestService();