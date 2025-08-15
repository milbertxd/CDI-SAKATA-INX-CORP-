import React, { useState, useEffect } from 'react';

import { Award } from 'lucide-react';



const countryData = {

 USA: {

  img: '/usa.jpg',

  flag: '/usa-flag.webp',

  style: { top: '40%', left: '12%' },

  info: [

   {

    name: 'THE INX GROUP LTD. (Holding Company)',

    link: 'https://www.inxinternational.com/',

    city: 'Chicago',

    address: '150 North Martingale Road Suite 700, Schaumburg, IL 60173, U.S.A.',

    tel: '+1-800-631-7956',

   },

   {

    name: 'INX INTERNATIONAL COATINGS AND ADHESIVES CO.',

    link: 'https://www.inxinternational.com/',

    city: 'Leland',

    address: 'PO Box 1080, 1901 Popular St. NE, Leland, NC 28451, U.S.A.',

    tel: '+1-910-371-3184',

   },

  ],

 },

 Canada: {

  img: '/canada.jpg',

  flag: '/canada-flag.png',

  style: { top: '28%', left: '15%' },

  info:

   {

    name: 'INX INTERNATIONAL INK CORP.',

    link: '#',

    city: 'Montreal',

    address: '1247 National St., Terrebonne, Quebec J6W 6H8, CANADA',

    tel: '+1-450-477-9145',

   },

 

 },

 Brazil: {

  img: '/brazil.jpg',

  flag: '/brazil-flag.png',

  style: { top: '70%', left: '22%' },

  info:

   {

    name: 'INX DO BRASIL LTDA.',

    link: '#',

    city: 'Sao Paulo',

    address: 'R. João Antônio de Souza, 131 - São Bernardo do Campo, São Paulo, CEP 09790-420, BRAZIL',

    tel: '+55-11-4127-4599',

   },

 

 },

 UK: {

  img: '/uk.jpg',

  flag: '/uk-flag.webp',

  style: { top: '30%', left: '40%' },

  info:

   {

    name: 'INX EUROPE LTD. (Holding Company)',

    link: '#',

    city: 'Manchester',

    address: 'Hilltop Road, Hareshill Distribution Park, Off Hareshill Road, Heywood, Lancashire, OL10 2TW, ENGLAND',

    tel: '+44-1706-695-150',

   },

 

 },

 France: {

  img: '/buildings/france.jpg',

  flag: '/france-flag.png',

  style: { top: '38%', left: '39%' },

  info:

   {

    name: 'INX INTERNATIONAL FRANCE SAS',

    link: '#',

    city: 'Paris',

    address: 'Paris, FRANCE',

    tel: '',

   },

  

 },

 Germany: {

  img: '/germany.jpg',

  flag: '/germany-flag.png',

  style: { top: '36%', left: '42%' },

  info:

   {

    name: 'A.M. Ramp & Co. GmbH',

    link: '#',

    city: 'Frankfurt',

    address: 'Lorsbacher Straße 28, 65817 Eppstein/Taunus, GERMANY',

    tel: '+49-6198-3040',

   },

  

 },

 Italy: {

  img: '/italy.jpg',

  flag: '/italy-flag.png',

  style: { top: '44%', left: '43%' },

  info:

   {

    name: 'INX DIGITAL ITALY S.R.L.',

    link: '#',

    city: 'Milan',

    address: 'Piazza della Libertà, 2, 21013 Gallarate (VA), ITALY',

    tel: '+39-0331-1261350',

   },

  

 },

 Spain: {

  img: '/spain.jpg',

  flag: '/spain-flag.png',

  style: { top: '40%', left: '37%' },

  info:

   {

    name: 'SAKATA INX ESPANA, S.A.',

    link: '#',

    city: 'Barcelona',

    address: 'C/Mercaders, 24-26, 08184 Palau-Solita i Plegamans, Barcelona, SPAIN',

    tel: '+34-93-864-8122',

   },

  

 },

 Czech: {

  img: '/czech.jpg',

  flag: '/czech-flag.webp',

  style: { top: '41%', left: '47%' },

  info:

   {

    name: 'INX DIGITAL CZECH, A.S.',

    link: '#',

    city: 'Prague',

    address: 'VGP Park Do Čertous 2621/13 Hall I2, 193 00 Prague 20 Horní Počernice, CZECH REPUBLIC',

    tel: '+420-326-374-900',

   },

 

 

 },

 Philippines: {

  img: '/cd-building.jpg',

  flag: '/philippines.svg',

  style: { top: '53%', right: '5%' },

  info: {

   name: 'CDI SAKATA INX CORP.',

   location: 'Cavite',

   address: 'Linares Extension, Gateway Business Park, Brgy. Javalera, General Trias, Cavite, PHILIPPINES',

   tel: '+63-46-894-4057',

   link: 'https://www.cdisakata.com/'

  }

 },

 China: {

  img: '/china.jpg',

  flag: '/china-flag.webp',

  style: { top: '38%', left: '60%' },

  info: [

   {

    name: 'SAKATA INX SHANGHAI CO., LTD.',

    link: '#',

    city: 'Shanghai',

    address: '2001 Hui Bin Road, Qingpu Industrial Zone, Shanghai 201707, CHINA',

    tel: '+86-21-5986-8088',

    img: '/china.jpg' 

   },

   {

    name: 'SAKATA INX (ZHONGSHAN) CORP.',

    link: '#',

    city: 'Zhongshan, Guangdong Province',

    address: 'No. 9, Jiehong Road, Shazai Chemical Industry Park, Minzhong Town, Zhongshan City, Guangdong Province 528441, CHINA',

    tel: '+86-760-8555-1692',
    img: '/china2.jpg' // Added image for Zhongshan building

   },

  ],

 },

 Taiwan: {

  img: '/taiwan.jpg',

  flag: '/taiwan-flag.webp',

  style: { top: '45%', left: '70%' },

  info: [

   {

    name: 'TAIWAN SAKATA INX CORP.',

    link: '#',

    city: 'Taipei',

    address: '9F., No. 9-5, Sec. 3, Nangang Rd., Nangang Dist., Taipei, TAIWAN',

    tel: '+886-2-2536-5087',

   },

  ],

 },

 India: {

  img: '/india1.jpg',

  flag: '/india-flag.webp',

  style: { top: '40%', left: '55%' },

  info: [

   {

    name: 'SAKATA INX (INDIA) PRIVATE LTD.',

    link: '#',

    city: 'New Delhi',

    address: 'D-17, Infocity Phase II Sector-33, Gurugram, Haryana, INDIA',

    tel: '+91-124-4803300',
    img: 'india1.jpg' 

   },

   {

    name: 'Panoli',

    link: '#',

    city: 'Panoli',

    address: 'U-2, GIDC, Panoli Industrial Estate, Distt-Bharuch-394116 Panoli Ankleshwar (Gujarat), INDIA',

    tel: '',
     img: 'india2.jpg'

   },

   {

    name: 'Bhiwadi',

    link: '#',

    city: 'Bhiwadi',

    address: 'B 1245-1246, RIICO Industrial Area, Ghatali, Bhiwadi - 301 019, Rajasthan, INDIA',

    tel: '+91-1493-245900',
     img: 'india3.jpg'

   },

  ],

 },

 Thailand: {

  img: '/thailand.jpg',

  flag: '/thailand-flag.png',

  style: { top: '55%', left: '68%' },

  info: [

   {

    name: 'ETERNAL SAKATA INX CO., LTD.',

    link: '#',

    city: 'Bangkok • Phetkasem',

    address: '16 Soi Leabfungtai 1, Phetkasem Road, Nongkham, Bangkok 10160, THAILAND',

    tel: '+66-2806-4341',
    img: 'thailand.jpg' // Added image for Thailand building

   },

   {

    name: 'Bangkok • Sinsakhon',

    link: '#',

    city: 'Bangkok • Sinsakhon',

    address: '30/35 Moo 1, Khok Kham, Mueang Samut Sakhon District, Samut Sakhon 74000, THAILAND',

    tel: '',
    img: 'thailand1.jpg'

   },

  ],

 },

 Cambodia: {

  img: '/cambodia.jpg',

  flag: '/cambodia-flag.webp',

  style: { top: '55%', left: '73%' },

  info: [

   {

    name: 'SAKATA INX (CAMBODIA) CO., LTD.',

    link: '#',

    city: 'Phnom Penh',

    address: 'Unit 6, Plot No. P2-078 & 079, Royal Group Phnom Penh SEZ, Phnom Penh, CAMBODIA',

    tel: '+855-99-322414',

   },

  ],

 },

 Vietnam: {

  img: '/vietnam.jpg', // Ho Chi Minh building

  flag: '/vietnam-flag.png',

  style: { top: '50%', left: '75%' },

  info: [

   {

    name: 'SAKATA INX VIETNAM CO., LTD.',

    link: '#',

    city: 'Ho Chi Minh',

    address: 'No. 33 Tu Do Avenue, Viet Nam – Singapore Industrial Park,Thuan Giao Ward, Ho Chi Minh City, VIETNAM',

    tel: '+84-274-3767811',

    img: '/vietnam.jpg', // Ho Chi Minh building image

   },

   {

    name: 'Hanoi',

    link: '#',

    city: 'Hanoi',

    address: 'So 3, Duong 11, KCN do thi va, Dich vu VSIP Bac Ninh, Phuong Phu Chan, TP Tu Son, Tinh Bac Ninh, VIETNAM',

    tel: '',

    img: '/hanoi.jpg', // Hanoi building image

   },

  ],

 },

 Malaysia: {

  img: '/malaysia.jpg',

  flag: '/malaysia-flag.svg',

  style: { top: '60%', left: '70%' },

  info: [

   {

    name: 'SAKATA INX ASIA HOLDINGS SDN. BHD. (Holding Company)',

    link: '#',

    city: 'Kuala Lumpur',

    address: 'Suite B-05-03, Plaza Mont Kiara No 2, Jalan 1/70C, Mont Kiara, Kuala Lumpur, MALAYSIA',

    tel: '',

   },

   {

    name: 'SAKATA INX (MALAYSIA) SDN. BHD.',

    link: '#',

    city: 'Kuala Lumpur',

    address: 'Lot 65, Jalan Teluk Gadung 27/93, Seksyen 27, 40000 Shah Alam, Selangor Darul Ehsan, MALAYSIA',

    tel: '+60-3-5191-8878',

   },

  ],

 },

 Indonesia: {

  img: '/indonesia.jpg',

  flag: '/indonesia-flag.png',

  style: { top: '70%', left: '80%' },

  info:

   {

    name: 'PT. SAKATA INX INDONESIA',

    link: '#',

    city: 'Jakarta',

    address: 'Wisma Indochem 7th Floor, JL. Pantai Indah Kapuk Boulevard Kav. SSB/E Jakarta 14470, INDONESIA',

    tel: '+62-21-569-48-580',

   },

 

 },

 Japan: {

  img: '/japan.jpg',

  flag: '/japan-flag.webp',

  style: { top: '35%', left: '86%' },

  info: {

   name: 'Sakata INX Corporation',

   link: 'https://www.inx.co.jp/english',

   city: 'Osaka',

   address: 'Urabannet Midosuji Building, 4-2-13 Awajimachi, Chuo-ku, Osaka-shi, Osaka 541-0047',

   tel: '+81-6-6447-5811',

  }

 },

 Bangladesh: {

  img: '/building.jpg',

  flag: '/bangladesh-flag.webp',

  style: { top: '42%', left: '62%' },

  info: {

   name: 'SAKATA INX (BANGLADESH) PRIVATE LTD.',

   link: '#',

   city: 'Dhaka',

   address: 'Plot No.17, 18 & 19, Meghna Industrial Economic Zone, Tipordi, Mograpara, Sonargaon, District: Narayanganj-1441, BANGLADESH',

   tel: '+880-1713-086526',

  }

 },

};



const ClientsSection: React.FC = () => {

 const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

 const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

 const [modalVisible, setModalVisible] = useState(false);



 useEffect(() => {

  if (selectedCountry) setModalVisible(true);

  else setModalVisible(false);

 }, [selectedCountry]);



 return (

  <section id="global-presence" className="relative bg-gray-200 py-16">

   <div className="text-center mb-12">

    <div className="inline-flex items-center justify-center px-4 py-2 mb-4 border rounded-full text-blue-600 font-semibold border-blue-200 bg-blue-50">

     <Award className="w-4 h-4 mr-2" />

     <span>Our Clients</span>

    </div>

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Global Presence</h2>

    <p className="mt-4 text-gray-600 max-w-xl mx-auto">

     Delivering excellence worldwide through our strategic branches in:

    </p>

   </div>



   {/* World Map Image with Flags Positioned */}

   <div className="relative w-full max-w-6xl mx-auto px-7">

    <img

     src="/map2.svg"

     alt="World Map"

     className="w-full"

    />



    {/* Flags */}

    {Object.entries(countryData).map(([name, data]) => (

     <div

      key={name}

      className="absolute flex items-center gap-2 px-3 py-1 rounded-full shadow cursor-pointer" // removed bg-white

      style={data.style}

      onClick={() => setSelectedCountry(name)}

      onMouseEnter={() => setHoveredCountry(name)}

      onMouseLeave={() => setHoveredCountry(null)}

     >

      <img src={data.flag} alt={`${name} Flag`} className="w-6 h-4 rounded" />

      <span className="text-black font-medium">{name}</span>

      {/* Tooltip */}

      {hoveredCountry === name && (

       <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 flex items-center gap-3 min-w-[220px]">

        <img src={data.img} alt={`${name} Building`} className="w-16 h-16 object-cover rounded" />

        <div>

         <div className="font-bold text-blue-700">

          {Array.isArray(data.info) ? data.info[0].name : data.info.name}

         </div>

         <div className="text-sm text-gray-600">

          {Array.isArray(data.info) 
            ? data.info[0].city 
            : ((data.info as any).city || (data.info as any).location)
          }

         </div>

        </div>

       </div>

      )}

     </div>

    ))}



    {/* Modal Popup */}

    {selectedCountry && (

     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"

      style={{ opacity: modalVisible ? 1 : 0 }}

     >

      <div

       className={`bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full relative flex flex-col md:flex-row gap-6

        transform transition-all duration-300

        ${modalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}

      >

       <button

        className="absolute top-2 right-2 text-gray-700 hover:text-gray-700 text-xl"

        onClick={() => setSelectedCountry(null)}

        aria-label="Close"

       >

        &times;

       </button>

       <div className="flex-1 min-w-[260px] pr-4 text-gray-900">

        {Array.isArray(countryData[selectedCountry].info)

         ? countryData[selectedCountry].info.map((city, idx) => (

           <div key={idx} className="mb-6 flex gap-4">

            <div className="flex-1">

             <h3 className="text-xl font-bold mb-2">

              <a href={city.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">

               {city.name}

              </a>

             </h3>

             <span className="inline-block bg-blue-300 text-gray-700 px-2 py-1 rounded mb-2 font-semibold">{city.city}</span>

             <p className="mb-2">{city.address}</p>

             <p className="mb-2">TEL: {city.tel}</p>

            </div>

            {/* Individual city image */}

            {city.img && (

             <div className="flex-shrink-0">

              <img

               src={city.img}

               alt={`${city.city} Building`}

               className="rounded-lg shadow-lg w-48 h-48 object-cover border-2 border-blue-200"

              />

             </div>

            )}

           </div>

          ))

         : (

          <>

           <span className="inline-block bg-blue-300 text-gray-700 px-2 py-1 rounded mb-2 font-semibold">

            {countryData[selectedCountry].info.city || countryData[selectedCountry].info.location}

           </span>

           <h3 className="text-xl font-bold mb-2">

            <a href={countryData[selectedCountry].info.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">

             {countryData[selectedCountry].info.name}

            </a>

           </h3>

           <p className="mb-2">{countryData[selectedCountry].info.address}</p>

           <p className="mb-2">TEL: {countryData[selectedCountry].info.tel}</p>

          </>

         )

        }

       </div>

       {/* Main country image - only show if not array or no individual images */}

       {(!Array.isArray(countryData[selectedCountry].info) || 

         !countryData[selectedCountry].info.some(city => city.img)) && (

        <div className="flex-1 flex items-center justify-center">

         <img

          src={countryData[selectedCountry].img}

          alt={`${selectedCountry} Building`}

          className="rounded-xl shadow w-full max-w-xs object-cover"

         />

        </div>

       )}

      </div>

     </div>

    )}

   </div>

   {/* View All Affiliates Button */}
   <div className="mt-16 text-center">
    <a
     href="/affiliates"
     className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
     <Award className="w-5 h-5 mr-2" />
     View All Affiliates
    </a>
   </div>

  </section>

 );

};



export default ClientsSection;