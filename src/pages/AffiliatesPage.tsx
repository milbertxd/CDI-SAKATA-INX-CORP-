import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Factory, 
  Globe, 
  MapPin, 
  Phone, 
  Award 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const headOfficesData = [
  {
    name: 'Osaka Head Office',
    city: 'Osaka',
    address: 'Urbannet Midosuji Building, 4-2-13 Awajimachi, Chuo-ku, Osaka-shi, Osaka 541-0047',
    tel: '+81-6-6447-5811',
    mapUrl: 'https://www.google.com/maps/place/%E3%82%A2%E3%83%BC%E3%83%90%E3%83%B3%E3%83%8D%E3%83%83%E3%83%88%E5%BE%A1%E5%A0%82%E7%AD%8B%E3%83%93%E3%83%AB/@34.6798369,135.4897797,2727m/data=!3m1!1e3!4m10!1m2!2m1!1sUrbannet+Midosuji+Building,+4-2-13+Awajimachi,+Chuo-ku,+Osaka-shi,+Osaka+541-0047!3m6!1s0x6000e70024a5c4ad:0x9b12f6fe965058fb!8m2!3d34.686653!4d135.5001831!15sClFVcmJhbm5ldCBNaWRvc3VqaSBCdWlsZGluZywgNC0yLTEzIEF3YWppbWFjaGksIENodW8ta3UsIE9zYWthLXNoaSwgT3Nha2EgNTQxLTAwNDdaTyJNdXJiYW5uZXQgbWlkb3N1amkgYnVpbGRpbmcgNCAyIDEzIGF3YWppbWFjaGkgY2h1byBrdSBvc2FrYSBzaGkgb3Nha2EgNTQxIDAwNDeSARBjb3Jwb3JhdGVfb2ZmaWNl4AEA!16s%2Fg%2F11vxyglt9x!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D',
    access: [
      '[Osaka Metro Midosuji Line] Take Exit 2 from Honmachi Station, and head north on Midosuji Avenue. (3 min. on foot)',
      '[Osaka Metro Midosuji Line, Keihan Main Line] Take Exit 13 from Yodoyabashi Station, and head south on Midosuji Avenue. (4 min. on foot)'
    ],
    image: '/japan.jpg'
  },
  {
    name: 'Tokyo Head Office',
    city: 'Tokyo',
    address: 'Nikkyohan Building, 1-4-25 Kohraku, Bunkyo-ku, Tokyo, 112-0004',
    tel: '+81-3-5689-6600',
    mapUrl: 'https://www.google.com/maps/search/Nikkyohan+Building,+1-4-25+Kohraku,+Bunkyo-ku,+Tokyo,+112-0004/@35.70329,139.75295,673m/data=!3m2!1e3!4b1!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D',
    access: [
      '[JR] Take the East Exit at Iidabashi Station, and head towards Suidobashi on Sotobori-dori Avenue. (6 min. on foot)',
      '[JR] Take the West Exit at Suidobashi Station, and head towards Iidabashi on Sotobori-dori Avenue. (6 min. on foot)',
      '[Tokyo Metro] Take Exit A1 at Iidabashi Station, and head towards Suidobashi on Sotobori-dori Avenue. (6 min. on foot)',
      '[Toei Oedo Line] Take Exit C2 at Iidabashi Station, and head towards Suidobashi on Sotobori-dori Avenue. (2 min. on foot)'
    ],
    image: '/Tokyo-Head.jpg'
  }
];

const affiliatesData = {
  Americas: [
    {
      country: 'USA',
      flag: '/usa-flag.webp',
      companies: [
        {
          name: 'THE INX GROUP LTD.',
          type: 'Holding Company',
          city: 'Chicago',
          address: '150 North Martingale Road Suite 700, Schaumburg, IL 60173, U.S.A.',
          tel: '+1-800-631-7956',
          link: 'https://www.inxinternational.com/',
          image: '/usa.jpg'
        },
        {
          name: 'INX INTERNATIONAL COATINGS AND ADHESIVES CO.',
          type: 'Manufacturing',
          city: 'Leland',
          address: 'PO Box 1080, 1901 Popular St. NE, Leland, NC 28451, U.S.A.',
          tel: '+1-910-371-3184',
          link: 'https://www.inxinternational.com/',
          image: ''
        }
      ]
    },
    {
      country: 'Canada',
      flag: '/canada-flag.png',
      companies: [
        {
          name: 'INX INTERNATIONAL INK CORP.',
          type: 'Manufacturing',
          city: 'Montreal',
          address: '1247 National St., Terrebonne, Quebec J6W 6H8, CANADA',
          tel: '+1-450-477-9145',
          link: '#',
          image: '/canada.jpg'
        }
      ]
    },
    {
      country: 'Brazil',
      flag: '/brazil-flag.png',
      companies: [
        {
          name: 'INX DO BRASIL LTDA.',
          type: 'Manufacturing',
          city: 'Sao Paulo',
          address: 'R. João Antônio de Souza, 131 - São Bernardo do Campo, São Paulo, CEP 09790-420, BRAZIL',
          tel: '+55-11-4127-4599',
          link: '#',
          image: '/brazil.jpg'
        }
      ]
    }
  ],
  Europe: [
    {
      country: 'United Kingdom',
      flag: '/uk-flag.webp',
      companies: [
        {
          name: 'INX EUROPE LTD.',
          type: 'Holding Company',
          city: 'Manchester',
          address: 'Hilltop Road, Hareshill Distribution Park, Off Hareshill Road, Heywood, Lancashire, OL10 2TW, ENGLAND',
          tel: '+44-1706-695-150',
          link: '#',
          image: '/uk.jpg'
        }
      ]
    },
    {
      country: 'Spain',
      flag: '/spain-flag.png',
      companies: [
        {
          name: 'SAKATA INX ESPANA, S.A.',
          type: 'Manufacturing',
          city: 'Barcelona',
          address: 'C/Mercaders, 24-26, 08184 Palau-Solita i Plegamans, Barcelona, SPAIN',
          tel: '+34-93-864-8122',
          link: '#',
          image: '/spain.jpg'
        }
      ]
    },
    {
      country: 'Germany',
      flag: '/germany-flag.png',
      companies: [
        {
          name: 'A.M. Ramp & Co. GmbH',
          type: 'Manufacturing',
          city: 'Frankfurt',
          address: 'Lorsbacher Straße 28, 65817 Eppstein/Taunus, GERMANY',
          tel: '+49-6198-3040',
          link: '#',
          image: '/germany.jpg'
        }
      ]
    },
    {
      country: 'Czech Republic',
      flag: '/czech-flag.webp',
      companies: [
        {
          name: 'INX DIGITAL CZECH, A.S.',
          type: 'Manufacturing',
          city: 'Prague',
          address: 'VGP Park Do Čertous 2621/13 Hall I2, 193 00 Prague 20 Horní Počernice, CZECH REPUBLIC',
          tel: '+420-326-374-900',
          link: '#',
          image: '/czech.jpg'
        }
      ]
    },
    {
      country: 'Italy',
      flag: '/italy-flag.png',
      companies: [
        {
          name: 'INX DIGITAL ITALY S.R.L.',
          type: 'Manufacturing',
          city: 'Milan',
          address: 'Piazza della Libertà, 2, 21013 Gallarate (VA), ITALY',
          tel: '+39-0331-1261350',
          link: '#',
          image: '/italy.jpg'
        }
      ]
    },
    {
      country: 'France',
      flag: '/france-flag.png',
      companies: [
        {
          name: 'INX INTERNATIONAL FRANCE SAS',
          type: 'Sales Office',
          city: 'Paris',
          address: 'Paris, FRANCE',
          tel: '',
          link: '#',
          image: ''
        }
      ]
    }
  ],
  Asia: [
    {
      country: 'Japan',
      flag: '/japan-flag.webp',
      companies: [
        {
          name: 'Sakata INX Corporation',
          type: 'Headquarters',
          city: 'Osaka',
          address: 'Urabannet Midosuji Building, 4-2-13 Awajimachi, Chuo-ku, Osaka-shi, Osaka 541-0047',
          tel: '+81-6-6447-5811',
          link: 'https://www.inx.co.jp/english',
          image: '/japan.jpg'
        }
      ]
    },
    {
      country: 'Philippines',
      flag: '/philippines.svg',
      companies: [
        {
          name: 'CDI SAKATA INX CORP.',
          type: 'Manufacturing',
          city: 'Cavite',
          address: 'Linares Extension, Gateway Business Park, Brgy. Javalera, General Trias, Cavite, PHILIPPINES',
          tel: '+63-46-894-4057',
          link: 'https://www.cdisakata.com/',
          image: '/cd-building.jpg'
        }
      ]
    },
    {
      country: 'China',
      flag: '/china-flag.webp',
      companies: [
        {
          name: 'SAKATA INX SHANGHAI CO., LTD.',
          type: 'Manufacturing',
          city: 'Shanghai',
          address: '2001 Hui Bin Road, Qingpu Industrial Zone, Shanghai 201707, CHINA',
          tel: '+86-21-5986-8088',
          link: 'http://inx-shanghai.com/Front_desk/',
          image: '/china.jpg'
        },
        {
          name: 'SAKATA INX (ZHONGSHAN) CORP.',
          type: 'Manufacturing',
          city: 'Zhongshan, Guangdong Province',
          address: 'No. 9, Jiehong Road, Shazai Chemical Industry Park, Minzhong Town, Zhongshan City, Guangdong Province 528441, CHINA',
          tel: '+86-760-8555-1692',
          link: '#',
          image: '/china1.jpg'
        }
      ]
    },
    {
      country: 'Taiwan',
      flag: '/taiwan-flag.webp',
      companies: [
        {
          name: 'TAIWAN SAKATA INX CORP.',
          type: 'Manufacturing',
          city: 'Taipei',
          address: '9F., No. 9-5, Sec. 3, Nangang Rd., Nangang Dist., Taipei, TAIWAN',
          tel: '+886-2-2536-5087',
          link: '#',
          image: '/taiwan.jpg'
        }
      ]
    },
    {
      country: 'India',
      flag: '/india-flag.webp',
      companies: [
        {
          name: 'SAKATA INX (INDIA) PRIVATE LTD.',
          type: 'Headquarters',
          city: 'New Delhi',
          address: 'D-17, Infocity Phase II Sector-33, Gurugram, Haryana, INDIA',
          tel: '+91-124-4803300',
          link: 'http://www.sakataindia.com/',
          image: '/india1.jpg'
        },
        {
          name: 'Panoli Plant',
          type: 'Manufacturing',
          city: 'Panoli',
          address: 'U-2, GIDC, Panoli Industrial Estate, Distt-Bharuch-394116 Panoli Ankleshwar (Gujarat), INDIA',
          tel: '',
          link: '#',
          image: '/india2.jpg'
        },
        {
          name: 'Bhiwadi Plant',
          type: 'Manufacturing',
          city: 'Bhiwadi',
          address: 'B 1245-1246, RIICO Industrial Area, Ghatali, Bhiwadi - 301 019, Rajasthan, INDIA',
          tel: '+91-1493-245900',
          link: '#',
          image: '/india3.jpg'
        }
      ]
    },
    {
      country: 'Thailand',
      flag: '/thailand-flag.png',
      companies: [
        {
          name: 'ETERNAL SAKATA INX CO., LTD.',
          type: 'Manufacturing',
          city: 'Bangkok • Phetkasem',
          address: '16 Soi Leabfungtai 1, Phetkasem Road, Nongkham, Bangkok 10160, THAILAND',
          tel: '+66-2806-4341',
          link: 'https://www.esiinx.com/TH/home.html',
          image: '/thailand.jpg'
        },
        {
          name: 'Bangkok • Sinsakhon Plant',
          type: 'Manufacturing',
          city: 'Bangkok • Sinsakhon',
          address: '30/35 Moo 1, Khok Kham, Mueang Samut Sakhon District, Samut Sakhon 74000, THAILAND',
          tel: '',
          link: '#',
          image: '/thailand1.jpg'
        }
      ]
    },
    {
      country: 'Cambodia',
      flag: '/cambodia-flag.webp',
      companies: [
        {
          name: 'SAKATA INX (CAMBODIA) CO., LTD.',
          type: 'Manufacturing',
          city: 'Phnom Penh',
          address: 'Unit 6, Plot No. P2-078 & 079, Royal Group Phnom Penh SEZ, Phnom Penh, CAMBODIA',
          tel: '+855-99-322414',
          link: '#',
          image: '/cambodia.jpg'
        }
      ]
    },
    {
      country: 'Vietnam',
      flag: '/vietnam-flag.png',
      companies: [
        {
          name: 'SAKATA INX VIETNAM CO., LTD.',
          type: 'Manufacturing',
          city: 'Ho Chi Minh',
          address: 'No. 33 Tu Do Avenue, Viet Nam – Singapore Industrial Park, Thuan Giao Ward, Ho Chi Minh City, VIETNAM',
          tel: '+84-274-3767811',
          link: 'http://inx.com.vn/',
          image: '/vietnam.jpg'
        },
        {
          name: 'Hanoi Plant',
          type: 'Manufacturing',
          city: 'Hanoi',
          address: 'So 3, Duong 11, KCN do thi va, Dich vu VSIP Bac Ninh, Phuong Phu Chan, TP Tu Son, Tinh Bac Ninh, VIETNAM',
          tel: '',
          link: '#',
          image: '/hanoi.jpg'
        }
      ]
    },
    {
      country: 'Malaysia',
      flag: '/malaysia-flag.svg',
      companies: [
        {
          name: 'SAKATA INX ASIA HOLDINGS SDN. BHD.',
          type: 'Holding Company',
          city: 'Kuala Lumpur',
          address: 'Suite B-05-03, Plaza Mont Kiara No 2, Jalan 1/70C, Mont Kiara, Kuala Lumpur, MALAYSIA',
          tel: '',
          link: '#',
          image: '/malaysia.jpg'
        },
        {
          name: 'SAKATA INX (MALAYSIA) SDN. BHD.',
          type: 'Manufacturing',
          city: 'Kuala Lumpur',
          address: 'Lot 65, Jalan Teluk Gadung 27/93, Seksyen 27, 40000 Shah Alam, Selangor Darul Ehsan, MALAYSIA',
          tel: '+60-3-5191-8878',
          link: 'http://sakatainx.com.my/',
          image: ''
        }
      ]
    },
    {
      country: 'Indonesia',
      flag: '/indonesia-flag.png',
      companies: [
        {
          name: 'PT. SAKATA INX INDONESIA',
          type: 'Manufacturing',
          city: 'Jakarta',
          address: 'Wisma Indochem 7th Floor, JL. Pantai Indah Kapuk Boulevard Kav. SSB/E Jakarta 14470, INDONESIA',
          tel: '+62-21-569-48-580',
          link: '#',
          image: '/indonesia.jpg'
        }
      ]
    },
    {
      country: 'Bangladesh',
      flag: '/bangladesh-flag.webp',
      companies: [
        {
          name: 'SAKATA INX (BANGLADESH) PRIVATE LTD.',
          type: 'Manufacturing',
          city: 'Dhaka',
          address: 'Plot No.17, 18 & 19, Meghna Industrial Economic Zone, Tipordi, Mograpara, Sonargaon, District: Narayanganj-1441, BANGLADESH',
          tel: '+880-1713-086526',
          link: '#',
          image: '/bangladesh.jpg'
        }
      ]
    }
  ]
};

const AffiliatesPage: React.FC = () => {
  const navigate = useNavigate();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Headquarters':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'Holding Company':
        return <Users className="w-5 h-5 text-purple-600" />;
      case 'Manufacturing':
        return <Factory className="w-5 h-5 text-green-600" />;
      case 'Sales Office':
        return <Globe className="w-5 h-5 text-orange-600" />;
      default:
        return <Building2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Headquarters':
        return 'bg-blue-100 text-blue-800';
      case 'Holding Company':
        return 'bg-purple-100 text-purple-800';
      case 'Manufacturing':
        return 'bg-green-100 text-green-800';
      case 'Sales Office':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalCompanies = () => {
    return Object.values(affiliatesData).reduce((total, region) => {
      return total + region.reduce((regionTotal, country) => regionTotal + country.companies.length, 0);
    }, 0) + headOfficesData.length;
  };

  const getTotalCountries = () => {
    return Object.values(affiliatesData).reduce((total, region) => total + region.length, 0) + 1;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Global Affiliates Network</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 relative overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/world.svg" 
            alt="World Map" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SAKATA INX Global Network
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover our comprehensive network of subsidiaries, affiliates, and partners spanning across 
            three continents, delivering excellence in printing inks and industrial chemicals worldwide.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white">{getTotalCompanies()}</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white">{getTotalCountries()}</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-blue-100">Continents</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white">60%</div>
              <div className="text-blue-100">Overseas Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Head Offices Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Head Offices Header */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
            <div className="flex items-center gap-4">
              <Building2 className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-2xl font-bold text-white">Head Offices</h3>
                <p className="text-blue-100">Corporate headquarters in Japan</p>
              </div>
            </div>
          </div>

          {/* Head Offices Content */}
          <div className="p-8">
            <div className="space-y-8">
              {headOfficesData.map((office, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Office Content - Left Side */}
                    <div className="flex-1 p-6">
                      {/* Office Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-600 p-3 rounded-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{office.name}</h4>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            Headquarters
                          </span>
                        </div>
                      </div>

                      {/* Office Details */}
                      <div className="space-y-4">
                        {/* Address */}
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 mb-1">{office.city}</div>
                            <div className="text-gray-600 text-sm">{office.address}</div>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <a 
                            href={`tel:${office.tel}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {office.tel}
                          </a>
                        </div>

                        {/* Access Information */}
                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Access Information
                          </h5>
                          <div className="space-y-2">
                            {office.access.map((accessInfo, accessIndex) => (
                              <div 
                                key={accessIndex}
                                className="text-sm text-gray-600 bg-white/60 rounded-lg p-3 border border-blue-100"
                              >
                                {accessInfo}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Map Button */}
                        <div className="pt-4">
                          <a 
                            href={office.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            View on Map
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Office Image - Right Side */}
                    <div className="lg:w-96 lg:flex-shrink-0">
                      <div className="h-full bg-white m-4 rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={office.image} 
                          alt={`${office.name} Building`}
                          className="w-full h-full min-h-[400px] lg:min-h-[500px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Affiliates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Global Affiliates Network</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our strategic partnerships and subsidiaries across the world, organized by region
          </p>
        </div>
        <div className="space-y-12">
          {Object.entries(affiliatesData).map(([region, countries]) => (
            <div key={region} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Region Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex items-center gap-4">
                  <Award className="w-8 h-8 text-white" />
                  <div>
                    <h4 className="text-2xl font-bold text-white">{region}</h4>
                    <p className="text-blue-100">
                      {countries.length} {countries.length === 1 ? 'country' : 'countries'} • {' '}
                      {countries.reduce((total, country) => total + country.companies.length, 0)} companies
                    </p>
                  </div>
                </div>
              </div>

              {/* Region Content */}
              <div className="p-6">
                <div className="space-y-8">
                  {countries.map((countryData, countryIndex) => (
                    <div key={countryIndex}>
                      {/* Country Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <img 
                          src={countryData.flag} 
                          alt={`${countryData.country} Flag`} 
                          className="w-8 h-6 rounded shadow" 
                        />
                        <h5 className="text-xl font-bold text-gray-900">{countryData.country}</h5>
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-sm text-gray-500">
                          {countryData.companies.length} {countryData.companies.length === 1 ? 'company' : 'companies'}
                        </span>
                      </div>

                      {/* Companies Grid */}
                      <div className="space-y-6">
                        {countryData.companies.map((company, companyIndex) => (
                          <div 
                            key={companyIndex} 
                            className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex flex-col lg:flex-row">
                              {/* Company Content - Left Side */}
                              <div className="flex-1 p-6">
                                {/* Company Header */}
                                <div className="flex items-start gap-3 mb-4">
                                  {getTypeIcon(company.type)}
                                  <div className="flex-1">
                                    <h6 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                                      {company.name}
                                    </h6>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(company.type)}`}>
                                      {company.type}
                                    </span>
                                  </div>
                                </div>

                                {/* Company Details */}
                                <div className="space-y-4">
                                  {/* Location */}
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-gray-900 mb-1">{company.city}</div>
                                      <div className="text-gray-600 text-sm">{company.address}</div>
                                    </div>
                                  </div>

                                  {/* Phone */}
                                  {company.tel && (
                                    <div className="flex items-center gap-3">
                                      <Phone className="w-5 h-5 text-gray-400" />
                                      <a 
                                        href={`tel:${company.tel}`}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                      >
                                        {company.tel}
                                      </a>
                                    </div>
                                  )}

                                  {/* Website */}
                                  {company.link && company.link !== '#' && (
                                    <div className="flex items-center gap-3">
                                      <Globe className="w-5 h-5 text-gray-400" />
                                      <a 
                                        href={company.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                      >
                                        Visit Website
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Company Image - Right Side */}
                              <div className="lg:w-80 lg:flex-shrink-0">
                                <div className="h-full bg-white m-4 rounded-xl overflow-hidden shadow-md">
                                  <img 
                                    src={company.image} 
                                    alt={`${company.name} Building`}
                                    className="w-full h-full min-h-[250px] lg:min-h-[300px] object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AffiliatesPage;