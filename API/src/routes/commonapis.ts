import { Router } from "express";
import { checkActiveSession, parsePagination } from './../middleware';

// importing controllers
import { getMotherTongues, getReligious, getCast, getEducationDetails, getDhosamList, getReligiousPercentage, getUsersCount, getUsersCountChartData, getProfessions } from './../controllers/commonapis'
import { getSiteControll, updateSiteDetails } from "./../controllers/siteControll";

//  api route creation

export default (router: Router) => {
    router.get('/api/v1/mother_tongues', checkActiveSession, parsePagination, getMotherTongues);
    router.get('/api/v1/religious', checkActiveSession, parsePagination, getReligious);
    router.get('/api/v1/cast_list', checkActiveSession, parsePagination, getCast);
    router.get('/api/v1/education_list', checkActiveSession, parsePagination, getEducationDetails);
    router.get('/api/v1/dhosam_list', checkActiveSession, getDhosamList);
    router.get('/api/v1/religious-percentage', checkActiveSession, getReligiousPercentage);
    router.get('/api/v1/users_count', checkActiveSession, getUsersCount);
    router.get('/api/v1/users_count_chart',checkActiveSession, getUsersCountChartData);
    router.get('/api/v1/site_info',getSiteControll)
    router.put('/api/v1/siteControll/:id',checkActiveSession,updateSiteDetails)
    router.get('/api/v1/professions',checkActiveSession,parsePagination,getProfessions)
}