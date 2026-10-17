/**
 * Central Business Configuration for Teeth Care Dental Clinic
 * 
 * IMPORTANT:
 * All details here reflect verified public listing data for the clinic in Gulshan-e-Iqbal, Karachi.
 * Fields marked unconfirmed or null must be verified directly with clinic management before updating.
 * Never invent doctor credentials, WhatsApp numbers, or unverified claims.
 */

export interface OperatingHoursDay {
  day: string;
  dayUrdu: string;
  hours: string | null;
  hoursUrdu: string | null;
  isVerified: boolean;
  notes?: string;
}

export interface DentalTreatment {
  id: string;
  name: string;
  nameUrdu: string;
  category: 'preventive' | 'restorative' | 'cosmetic' | 'orthodontics' | 'surgical';
  shortDescription: string;
  shortDescriptionUrdu: string;
  detailedInfo: string;
  pricingNote: string;
  isAvailable: boolean; // Confirmed by clinic
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  qualifications: string;
  role: string;
  photoUrl: string | null;
  pmdcRegistration: string | null; // Pakistan Medical & Dental Council registration if verified
}

export interface BusinessConfig {
  clinicName: string;
  clinicNameUrdu: string;
  category: string;
  address: {
    shop: string;
    block: string;
    area: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    fullAddressUrdu: string;
  };
  contact: {
    phoneFormatted: string;
    phoneRaw: string;
    whatsappNumber: string | null; // Keep null until verified. Example: "923361879257"
    email: string | null; // Keep null until verified
  };
  maps: {
    googleListingUrl: string;
    googleMapsEmbedUrl: string;
  };
  reputation: {
    googleRating: number;
    reviewCount: number;
    reviewCountDisplay: string;
    isVerified: boolean;
  };
  operatingHours: OperatingHoursDay[];
  operatingHoursNotice: {
    en: string;
    ur: string;
  };
  team: {
    isVerified: boolean;
    members: TeamMember[];
    neutralNotice: {
      en: string;
      ur: string;
    };
  };
  treatments: DentalTreatment[];
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
  };
  disclaimer: {
    en: string;
    ur: string;
  };
}

export const businessData: BusinessConfig = {
  clinicName: "Teeth Care Dental Clinic",
  clinicNameUrdu: "ٹیتھ کیئر ڈینٹل کلینک",
  category: "Dental Clinic",

  address: {
    shop: "Shop 1",
    block: "Block 13C",
    area: "Gulshan-e-Iqbal",
    city: "Karachi",
    province: "Sindh",
    postalCode: "75300",
    country: "Pakistan",
    fullAddress: "Shop 1, Block 13C, Gulshan-e-Iqbal, Karachi, 75300, Pakistan",
    fullAddressUrdu: "شاپ نمبر 1، بلاک 13 سی، گلشن اقبال، کراچی، 75300، پاکستان",
  },

  contact: {
    phoneFormatted: "+92 336 1879257",
    phoneRaw: "+923361879257",
    // NOTE: WhatsApp number is unconfirmed. Do not assume telephone number is WhatsApp.
    whatsappNumber: null, 
    email: null,
  },

  maps: {
    googleListingUrl: "https://maps.app.goo.gl/hEQYKBbEUkpJcd7y5",
    // Clean OpenStreetMap / Google Maps coordinate embed for Gulshan-e-Iqbal Block 13C, Karachi
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.6652410887363!2d67.0858715!3d24.9102434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f4a9b2b2b2b%3A0x2897f1f51f5c6e88!2sTeeth%20Care%20Dental%20Clinic!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk",
  },

  reputation: {
    googleRating: 5.0,
    reviewCount: 15,
    reviewCountDisplay: "15+ verified Google reviews",
    isVerified: true,
  },

  operatingHours: [
    {
      day: "Monday",
      dayUrdu: "پیر",
      hours: "1:00 PM – 11:30 PM",
      hoursUrdu: "دوپہر 1:00 بجے تا رات 11:30 بجے",
      isVerified: true,
    },
    {
      day: "Tuesday",
      dayUrdu: "منگل",
      hours: "1:00 PM – 11:30 PM",
      hoursUrdu: "دوپہر 1:00 بجے تا رات 11:30 بجے",
      isVerified: true,
    },
    {
      day: "Wednesday",
      dayUrdu: "بدھ",
      hours: "1:00 PM – 11:30 PM",
      hoursUrdu: "دوپہر 1:00 بجے تا رات 11:30 بجے",
      isVerified: true,
    },
    {
      day: "Thursday",
      dayUrdu: "جمعرات",
      hours: "1:00 PM – 11:30 PM",
      hoursUrdu: "دوپہر 1:00 بجے تا رات 11:30 بجے",
      isVerified: true,
    },
    {
      day: "Friday",
      dayUrdu: "جمعہ",
      hours: "4:00 PM – 11:30 PM",
      hoursUrdu: "شام 4:00 بجے تا رات 11:30 بجے",
      isVerified: true,
      notes: "Opens after Friday afternoon prayers",
    },
    {
      day: "Saturday",
      dayUrdu: "ہفتہ",
      hours: "1:00 PM – 11:30 PM",
      hoursUrdu: "دوپہر 1:00 بجے تا رات 11:30 بجے",
      isVerified: true,
    },
    {
      day: "Sunday",
      dayUrdu: "اتوار",
      hours: null, // Unverified
      hoursUrdu: null,
      isVerified: false,
      notes: "Hours not verified. Please contact clinic directly.",
    },
  ],

  operatingHoursNotice: {
    en: "Operating hours are based on public business records. Please call the clinic at +92 336 1879257 before visiting to confirm today's schedule and practitioner availability.",
    ur: "اوقات کار عوامی کاروباری ریکارڈ پر مبنی ہیں۔ کلینک آنے سے پہلے برائے مہربانی +92 336 1879257 پر کال کر کے شیڈول کی تصدیق کر لیں۔",
  },

  team: {
    // DOCTOR INFORMATION IS UNCONFIRMED - Set isVerified to false and do not invent names.
    isVerified: false,
    members: [],
    neutralNotice: {
      en: "Practitioner details and roster schedules are currently pending direct verification with clinic administration. Please contact Teeth Care Dental Clinic at +92 336 1879257 to inquire about attending dental surgeons, credentials, and consultation timings.",
      ur: "ڈاکٹرز اور عملے کی تفصیلات فی الحال کلینک انتظامیہ سے براہ راست تصدیق کے عمل میں ہیں۔ کلینک میں موجود ڈینٹل سرجنز اور اوقات کے بارے میں جاننے کے لیے +92 336 1879257 پر رابطہ کریں۔",
    },
  },

  treatments: [
    {
      id: "consultation",
      name: "Dental Check-ups & Consultations",
      nameUrdu: "دانتوں کا معائنہ اور مشاورت",
      category: "preventive",
      shortDescription: "Comprehensive visual and diagnostic evaluation of teeth, gums, and oral health to identify potential issues early.",
      shortDescriptionUrdu: "دانتوں، مسوڑھوں اور منہ کی مجموعی صحت کا تفصیلی معائنہ تاکہ کسی بھی بیماری کی بروقت تشخیص کی جا سکے۔",
      detailedInfo: "Routine check-ups evaluate enamel health, gum condition, tartar buildup, and bite alignment. An open discussion allows you to ask questions about treatment choices.",
      pricingNote: "Contact clinic for consultation charges",
      isAvailable: true,
      iconName: "Stethoscope",
    },
    {
      id: "scaling-polishing",
      name: "Teeth Scaling & Polishing",
      nameUrdu: "دانتوں کی صفائی اور پالشنگ",
      category: "preventive",
      shortDescription: "Professional cleaning to remove plaque, hardened calculus (tartar), and surface stains from teeth surfaces.",
      shortDescriptionUrdu: "پلاک، سخت میل (ٹارٹر) اور دانتوں کی بیرونی سطح سے داغ دھبے صاف کرنے کے لیے پیشہ ورانہ ٹریٹمنٹ۔",
      detailedInfo: "Ultrasonic scaling removes deposits that standard brushing cannot reach, helping prevent gingivitis and supporting freshened breath.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Sparkles",
    },
    {
      id: "whitening",
      name: "Teeth Whitening",
      nameUrdu: "دانتوں کی چمک اور سفیدی",
      category: "cosmetic",
      shortDescription: "Cosmetic procedures designed to lighten staining from tea, coffee, smoking, or natural aging.",
      shortDescriptionUrdu: "چائے، کافی یا عمر کے اثرات سے پیلے پن کو ہلکا کرنے اور دانتوں کی قدرتی چمک بحال کرنے کے لیے کاسمیٹک پروسیس۔",
      detailedInfo: "Professional whitening procedures use controlled application suited to individual tooth sensitivity and enamel thickness.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Smile",
    },
    {
      id: "root-canal",
      name: "Root Canal Treatment (RCT)",
      nameUrdu: "روٹ کینال ٹریٹمنٹ",
      category: "restorative",
      shortDescription: "Therapy to treat infected or inflamed dental pulp, relieve toothache, and preserve natural tooth structure.",
      shortDescriptionUrdu: "دانت کے اندرونی انفیکشن یا سوزش کے علاج کے لیے، تاکہ قدرتی دانت کو نکالے بغیر محفوظ رکھا جا سکے۔",
      detailedInfo: "Involves clearing infected nerve pulp, disinfecting root canals, and sealing the chamber with biocompatible filling materials.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Activity",
    },
    {
      id: "fillings",
      name: "Dental Fillings (Composite / GIC)",
      nameUrdu: "دانتوں کی فلنگ (بھرائی)",
      category: "restorative",
      shortDescription: "Restoration of cavities or chipped enamel using tooth-colored composite or glass ionomer materials.",
      shortDescriptionUrdu: "کیویٹی یا ٹوٹے ہوئے دانت کے حصے کو دانت کے قدرتی رنگ والے میٹریل سے بھر کر بحال کرنا۔",
      detailedInfo: "Removes decay, cleans the cavity, and bonds restorative material to match natural tooth color and restore chewing function.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "ShieldCheck",
    },
    {
      id: "extraction",
      name: "Tooth Extraction",
      nameUrdu: "دانت نکالنا",
      category: "surgical",
      shortDescription: "Safe removal of severely damaged, unrestorable, or impacted wisdom teeth under local anesthesia.",
      shortDescriptionUrdu: "شدید متاثرہ، ناقابل مرمت یا عقل داڑھ کو جدید بے ہوشی کے طریقہ کار کے تحت بحفاظت نکالنا۔",
      detailedInfo: "Carried out with careful assessment and post-operative guidance to ensure proper clot formation and comfort during healing.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Scissors",
    },
    {
      id: "crowns-bridges",
      name: "Dental Crowns & Bridges",
      nameUrdu: "دانتوں کے کراؤن اور برجز",
      category: "restorative",
      shortDescription: "Custom-fitted caps to protect weakened teeth or fixed bridges to replace one or more missing teeth.",
      shortDescriptionUrdu: "کمزور دانتوں کی حفاظت کے لیے مضبوط کیپس یا غائب دانتوں کی جگہ پر لگائے جانے والے فکسڈ برجز۔",
      detailedInfo: "Precision crowns restore chewing strength after large fillings or root canal therapy, blending naturally with adjacent teeth.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Layers",
    },
    {
      id: "implants",
      name: "Dental Implants",
      nameUrdu: "ڈینٹل امپلانٹس",
      category: "surgical",
      shortDescription: "Titanium post anchors placed into the jawbone to permanently replace missing tooth roots and support crowns.",
      shortDescriptionUrdu: "جبڑے کی ہڈی میں لگائی جانے والی ٹائٹینیم بنیادیں جو مستقل دانت کا کام کرتی ہیں۔",
      detailedInfo: "Requires bone density assessment and imaging. Consult our clinic to learn if you are a candidate for implant restoration.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Anchor",
    },
    {
      id: "orthodontics",
      name: "Braces & Orthodontic Care",
      nameUrdu: "بریسز اور دانتوں کی سیدھ",
      category: "orthodontics",
      shortDescription: "Orthodontic assessment and alignment treatments to correct misaligned teeth, crowding, and bite issues.",
      shortDescriptionUrdu: "ٹیڑھے میڑھے دانتوں کو درست اور ہموار کرنے کے لیے آرتھوڈانٹک علاج۔",
      detailedInfo: "Includes evaluation of dental crowding, overbites, and spacing, guiding you through available brace appliances and timelines.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "Grid",
    },
    {
      id: "dentures",
      name: "Dentures & Tooth Replacement",
      nameUrdu: "بتیسی اور مصنوعی دانت",
      category: "restorative",
      shortDescription: "Removable complete or partial appliances engineered to restore chewing function, speech, and smile contour.",
      shortDescriptionUrdu: "ایک یا متعدد غائب دانتوں کے لیے ہٹائے جانے والے جزوی یا مکمل مصنوعی دانت۔",
      detailedInfo: "Custom impression-molded dentures tailored to your jaw shape and oral anatomy for comfortable daily wear.",
      pricingNote: "Contact clinic for pricing",
      isAvailable: true,
      iconName: "CheckCircle",
    },
  ],

  socialLinks: {
    facebook: null, // Not verified
    instagram: null, // Not verified
    youtube: null, // Not verified
  },

  disclaimer: {
    en: "Website information is provided solely for general informational purposes and is not a substitute for professional clinical diagnosis or in-person dental evaluation.",
    ur: "ویب سائٹ پر دی گئی معلومات صرف عمومی معلومات کی فراہمی کے لیے ہیں اور یہ کسی مستند ڈینٹسٹ کے معائنے یا طبی مشورے کا متبادل نہیں ہیں۔",
  },
};
