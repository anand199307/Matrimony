// connect the route mongo config folde
import { getLocationInfo } from './services/locationData';
import { config, connectDb } from './config/config';
import { CountryModel, ICountry } from './models/country';
import { generateUUID, random } from './helpers/index';
import { IState, StateModel } from './models/state';
import { CityModel, ICity } from './models/city';
import * as fs from 'fs';
import { IZodiac, ZodiacModel } from './models/zodiac';
import { SubscriptionPlanModel } from './models/subscriptionPlan';
import { MothertonguesModel, MotherTongues } from './models/motherTongues';
import { ReligiousModel, CasteModal } from './models/religious';
import { EducationModel } from './models/education';
import { DhosamModal } from './models/dhosams';
import {SiteControll, SiteControllModel} from './models/siteControll';
import { Professions, ProfessionsModel } from './models/professions';
import {AuthSessionModel} from './models/auth_sessions'
import { UserModel } from './models/user';

const start = async () => {
  try {
    // console.log('Location Data insert starts ');
    await connectDb(config.mongo.url);
    const locationData = await getLocationInfo();
    console.log("location data", locationData)
    const states = await locationData.filter((item: any) => item['country_id'] === 101);
    console.log("states data", states)
    const countryData: ICountry = {
      name: 'India',
      code: 'IN',
      lat: '20.00000000',
      long: '77.00000000',
      region: 'Asia',
      currency: 'INR',
      currencySymbol: '₹',
      phoneCode: '91',
      numericCode: '356',
      externalId: 101,
      uuid: generateUUID()
    };
    let country = await CountryModel.findOne({ externalId: 101 }).exec();
    if (!country) {
      let countryObject = new CountryModel(countryData);
      country = await countryObject.save();
    }

    console.log(country);
    console.log(states.length);

    // INSERTING STATES

    for (let state of states) {
      let s = await StateModel.findOne({ externalId: state.id });
      if (!s) {
        // CREATE NEW STATE
        const stateData: IState = {
          name: state.name,
          code: state.state_code,
          lat: state.latitude,
          long: state.longitude,
          countryId: country.uuid,
          countryExternalId: country.externalId,
          externalId: state.id,
          uuid: generateUUID()
        };
        let stateObject = new StateModel(stateData);
        s = await stateObject.save();
      }
      console.log(s);

      // INSERTING STATE ENDS HERE

      // INSERTING COUNTRIES

      for (let city of state.cities) {
        let c = await CityModel.findOne({ externalId: city.id });
        if (!c) {
          const cityData: ICity = {
            name: city.name,
            externalId: city.id,
            stateId: s.uuid,
            stateExternalId: s.externalId,
            uuid: generateUUID(),
            lat: city.latitude,
            long: city.longitude
          };
          let cityObject = new CityModel(cityData);
          c = await cityObject.save();
        }
        console.log(c);
      }

      // INSERTING COUNTRIES ENDS HERE
    }

    // INSERT ZODIAC SIGN HERE
    const z = await ZodiacModel.find({});
    if (z.length === 0) {
      console.log('ZODIAC INSERTATION STARTS');
      const zodiacDataString: any = fs.readFileSync('zodiac.json', 'utf-8');
      const jsonData = JSON.parse(zodiacDataString);

      for (let list of jsonData.zodiac_star_list) {
        let z = await ZodiacModel.findOne({ name: list.zodiac_name });
        if (!z) {
          let star: any = [];
          for (let s of list.star_details) {
            star.push({ name: s.star_name });
          }
          const zodiacData: IZodiac = {
            name: list.zodiac_name,
            startDetails: star
          };
          let zodiacObject = new ZodiacModel(zodiacData);
          z = await zodiacObject.save();
          console.log(z);
        }
      }
    }

    // INSERT SUBSCRIPTION PLANS

    let sp = [
      {
        name: 'Silver',
        price: 3000,
        durationInMonths: 3,
        contactLimit:20,
        chatOption: false,
        horoscopeOtion: false,
        features: ['Sent Unlimited Message', 'View Upto 20 Contact Numbers',]
      },
      {
        name: 'Gold',
        price: 4500,
        durationInMonths: 3,
        contactLimit:30,
        chatOption: true,
        horoscopeOtion: false,
        features: ['Sent Unlimited Message', 'View Upto 30 Contact Numbers', 'Standout from other profiles',]
      },
      {
        name: 'Platinum',
        price: 6000,
        durationInMonths: 3,
        contactLimit:40,
        chatOption: true,
        horoscopeOtion: true,
        features: ['Sent Unlimited Message', 'View Upto 40 Contact Numbers', 'Standout from other profiles', 'Let Matches contact you directly']
      }
    ];

    for (let plan of sp) {
      let spData = await SubscriptionPlanModel.findOne({ name: plan.name });
      if (!spData) {
        await SubscriptionPlanModel.create({
          name: plan.name,
          price: plan.price,
          features: plan.features,
          durationInMonths: plan.durationInMonths,
          contactLimit:plan.contactLimit,
          chatOption:plan.chatOption,
          horoscopeOtion:plan.horoscopeOtion,
          uuid: generateUUID()
        });
      }
    }

    // INSERT SUBSCRIPTION PLANS ENDS HERE
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};


// INSERTING MOTHER TOUNGUES
const interLanguages = async () => {
  try {
    await connectDb(config.mongo.url);
    const languageData: any = fs.readFileSync('./jsondatas/langues.json', 'utf-8');
    const jsonData = JSON.parse(languageData);
    for (let languae of jsonData?.mother_tongue) {
      let res = await MothertonguesModel.findOne({ name: languae.text });
      if (!res) {
        const langData: MotherTongues = {
          name: languae.text,
          uuid: generateUUID()
        }
        let lanObject = new MothertonguesModel(langData);
        res = await lanObject.save();
      }
    }
    console.log(await MothertonguesModel.find({}))
    process.exit();

  } catch (error) {
    console.log("err", error)
    process.exit(1)
  }
}
// INSERTING MOTHER TOUNGUES
const insertReligious = async () => {
  try {
    await connectDb(config.mongo.url);
    const religiousData: any = fs.readFileSync('./jsondatas/religious.json', 'utf-8');
    const jsonData = JSON.parse(religiousData);
    for (let religion of jsonData?.religion) {
      let res = await ReligiousModel.findOne({ name: religion?.text });
      if (!res) {
        const religionData = {
          name: religion.text,
          uuid: generateUUID()
        };
        res = await ReligiousModel.create(religionData);
        console.log(res);
      }
    }
    process.exit();

  } catch (error) {
    console.log("err", error)
    process.exit(1)
  }
}
const insertCaste = async () => {
  try {
    await connectDb(config.mongo.url);
    const castJSON: any = fs.readFileSync('./jsondatas/cast.json', 'utf-8');
    const jsonData = JSON.parse(castJSON);
    for (let caste of jsonData?.caste) {
      let res = await CasteModal.findOne({ name: caste?.text });
      if (!res) {
        const castData = {
          name: caste.text,
          uuid: generateUUID()
        };
        res = await CasteModal.create(castData);
        console.log(res);
      }
    }
    process.exit();

  } catch (error) {
    console.log("err", error)
    process.exit(1)
  }
}

// INSERT EDUCATION DETAILS

const insertEducationData = async () => {
  try {
    await connectDb(config.mongo.url);
    const zodiacs = await EducationModel.find({});
    if (zodiacs?.length === 0) {
      const educationDataString = fs.readFileSync('./jsondatas/education.json', 'utf-8');
      const jsonData = JSON.parse(educationDataString);
      for (const { department, department_list } of jsonData.education) {
        const existingDepartment = await EducationModel.findOne({ name: department });
        if (!existingDepartment) {
          const departmentDetails = department_list.map((item: { text: String, fullform: String, uuid: string }) => (
            {
              short_name: item.text,
              full_name: item?.fullform,
              uuid: generateUUID()
            }));
          await new EducationModel({ department: department, uuid: generateUUID(), departmentDetails }).save();
        }
      }
    }
    console.log(await EducationModel.find({}))
    process.exit();
  } catch (error) {
    console.log("err", error);
    process.exit(1);
  }
};

//  INSERT DHOSAM LIST
export const insertDhoasams = async () => {
  try {
    await connectDb(config.mongo.url);
    const castJSON: any = fs.readFileSync('./jsondatas/dhosamlist.json', 'utf-8');
    const jsonData = JSON.parse(castJSON);
    for (let dhosams of jsonData?.dhosam_list) {
      let res = await DhosamModal.findOne({ name: dhosams?.name });
      if (!res) {
        const data = {
          name: dhosams?.name,
          uuid: generateUUID()
        };
        res = await DhosamModal.create(data);
        console.log(res);
      }
    }
    process.exit();
  } catch (error: any) {
    console.log("err", error);
    process.exit(1);
  }
}


export const siteConteoll = async () => {
   try {
    await connectDb(config.mongo.url);
    const response = await SiteControllModel.find({});
    if(response.length===0){
      const data : SiteControll ={
        // heroSection: {
        //   desktopImage: "https://storage.googleapis.com/royal-matrimoni/webSite/heroSection/desktop.png",
        //   mobileImage: "https://storage.googleapis.com/royal-matrimoni/webSite/heroSection/desktop.png",
        //   heroContent: "<h1>India's New Age<br> Matrimony App</h1><span>Find someone who you can easily connect with, Get married!</span>"
        // },
        // aboutUs: {
        //   aboutUsImage: "https://storage.googleapis.com/royal-matrimoni/webSite/aboutus.png",
        //   aboutUsContent: "<p>At Royal Matrimony, we believe that every person deserves to find a life partner who complements them perfectly, understands their aspirations, and shares their journey through the beautiful adventure of marriage. We are dedicated to creating a space where individuals can connect, discover, and build meaningful relationships that last a lifetime.</p><p>Founded with the vision of bringing happiness and harmony to people's lives, Royal Matrimony is committed to revolutionizing the way people find their life partners.</p>"
        // },
        stories:[],
        faq: [{
          id: random(5),
          question: "How to register on Royal Matrimony?",
          answer:"Register on Theroyalmatrimonial.com for free by providing necessary details. You can also register for free by downloading the Bharat Matrimony app from Play Store."
        },
        {
          id: random(5),
          question: "What are the features of  Royal Matrimony?",
          answer:"Search for matches by religion, city, community, education and many other specific parameters View complete profile details, photos, and contact matches you like Connect instantly with your matches through our Free Video Call feature Discover matches based on your horoscope."
        }
      ]
      }
      const res = await SiteControllModel.create(data)
      console.log(res)
      process.exit()
    }else{
      console.log("already site details are updates, Please try to update from admin protal")
      process.exit()
    }
   } catch (error) {
    console.log("error",error)
    process.exit()
   }
}

// INSERTING PROFESSIONS 
const intsertProfessions = async () => {
  try {
    await connectDb(config.mongo.url);
    const languageData: any = fs.readFileSync('./jsondatas/professions.json', 'utf-8');
    const jsonData = JSON.parse(languageData);
    for (let profession of jsonData?.profession_list) {
      let res = await ProfessionsModel.findOne({ name: profession.name });
      if (!res) {
        const professionData: Professions = {
          name: profession.name,
          uuid: generateUUID()
        }
        let lanObject = new ProfessionsModel(professionData);
        res = await lanObject.save();
      }
    }
    console.log(await ProfessionsModel.find({}))
    process.exit();

  } catch (error) {
    console.log("err", error)
    process.exit(1)
  }
}

// Delete sessoions
const deleteSessions = async () => {
  try {
    await connectDb('mongodb+srv://anandhakumar:pass1234@cluster0.zbdlwk0.mongodb.net/RoyalMatrimony?retryWrites=true&w=majority');
    const res = await AuthSessionModel.deleteMany({})
    console.log(res)
    process.exit();
  } catch (error) {
    console.log(error,"ddelte")
  }
}
const deleteUsers = async () => {
  try {
    await connectDb(config.mongo.url);
    const res = await UserModel.deleteMany({})
    console.log(res)
    process.exit();
  } catch (error) {
    console.log(error,"ddelte")
  }
}
// start();
// interLanguages();
// insertReligious();
// insertCaste();
// insertEducationData();
// insertDhoasams();
// siteConteoll()
// intsertProfessions()
deleteSessions()
// deleteUsers();