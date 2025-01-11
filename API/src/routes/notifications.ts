import { Router } from "express";
import { checkActiveSession,parsePagination } from "../middleware";
import { getNotificationsWithFilter, getUserNotification, markAsRead, sendNotifications } from "../controllers/notifications";


export default (router:Router)=>{
    router.post('/api/v1/send_notification',checkActiveSession,sendNotifications);
    router.get('/api/v1/user/notifications',checkActiveSession,parsePagination,getUserNotification);
    router.put('/api/v1/notification/:notificationId/read',checkActiveSession,markAsRead)
    router.get('/api/v1/notifications',checkActiveSession,parsePagination,getNotificationsWithFilter);
}
