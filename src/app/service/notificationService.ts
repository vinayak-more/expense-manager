import { Injectable } from "@angular/core";
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

@Injectable({
    providedIn:'root'
})
export class NotificationService{

    public async init(){
        const options: ScheduleOptions = {
            notifications:[
                {
                    id:1,
                    title:'Reminder!!!',
                    body:'Did you forgot to add todays expenses?💸💰💵',
                    largeBody:'Did you forgot to add todays expenses?💸💰💵',
                    smallIcon: 'res://logo.png',
                    largeIcon: 'res://logo.png',
                    schedule:{
                        allowWhileIdle: true,
                        //every: 'second',
                        on:{
                            hour:21,
                            minute:0,
                            second:0,
                        }
                    }

                }
            ]
        }
        await LocalNotifications.schedule(options);
    }
}