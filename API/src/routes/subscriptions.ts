import { checkActiveSession } from "../middleware";
import { createSubscriptionPlan, subscriptionPlans, updateSubscriptionPlan } from "../controllers/subscriptionPlan";
import { Router } from "express";



export default (router:Router) => {
    router.get('/api/v1/subscription/plans', subscriptionPlans);
    router.post('/api/v1/subscription/create_plan',checkActiveSession,createSubscriptionPlan);
    router.post('/api/v1/subscription/:uuid/update',checkActiveSession,updateSubscriptionPlan)
}