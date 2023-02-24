import { HubConnectionBuilder } from "@microsoft/signalr";
let tokenBearerStr = localStorage.getItem("token");

class NotificationHub {
    constructor() {
        this.client = new HubConnectionBuilder()
            .withUrl(`${process.env.VUE_APP_BACKEND}:26812/notificationHub`, {
                accessTokenFactory: () => tokenBearerStr 
            })
            .withAutomaticReconnect()
            .build();
    }
    
    start() {
        this.client.start();
    }
}

export default new NotificationHub();