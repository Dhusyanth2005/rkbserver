require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const HomeHero = require('../models/HomeHero');
const Work = require('../models/Work');
const AboutHero = require('../models/AboutHero');
const AboutLeadership = require('../models/AboutLeadership');
const Admin = require('../models/Admin');

const seedData = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await HomeHero.deleteMany({});
    await Work.deleteMany({});
    await AboutHero.deleteMany({});
    await AboutLeadership.deleteMany({});
    await Admin.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed HomeHero
    const hero = await HomeHero.create({
      video_light: {
        url: 'https://res.cloudinary.com/demo/video/upload/rkbsite/hero/rkbhero.mp4',
        public_id: 'rkbsite/hero/rkbhero',
        alt: 'R K B Builders hero background light mode',
      },
      video_dark: {
        url: 'https://res.cloudinary.com/demo/video/upload/rkbsite/hero/rkbherodark.mp4',
        public_id: 'rkbsite/hero/rkbherodark',
        alt: 'R K B Builders hero background dark mode',
      },
      poster: {
        url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/hero/poster.jpg',
        public_id: 'rkbsite/hero/poster',
        alt: 'R K B Builders hero background',
      },
    });
    console.log('✅ HomeHero seeded');

    // Seed Works
    const works = await Work.create([
      {
        id: 'thevar-residence',
        title: 'Thevar Residence',
        type: 'New Construction',
        year: 2019,
        locality: 'Saravanampatti',
        district: 'Coimbatore',
        description: 'A stunning independent house featuring modern architecture with traditional elements. The project showcases premium finishes, spacious interiors, and sustainable building practices.',
        thumbnail: {
          url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/thumbnail.jpg',
          public_id: 'rkbsite/works/thevar-residence/thumbnail',
          alt: 'Thevar Residence — completed project by R K B Builders',
        },
        meta: 'Independent House · Coimbatore',
        photos: [
          {
            label: 'Exterior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/exterior.jpg',
            public_id: 'rkbsite/works/thevar-residence/exterior',
            alt: 'Thevar Residence exterior view',
          },
          {
            label: 'Living Area',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/living.jpg',
            public_id: 'rkbsite/works/thevar-residence/living',
            alt: 'Thevar Residence living area',
          },
          {
            label: 'Facade Detail',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/facade.jpg',
            public_id: 'rkbsite/works/thevar-residence/facade',
            alt: 'Thevar Residence facade detail',
          },
          {
            label: 'Interior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/interior.jpg',
            public_id: 'rkbsite/works/thevar-residence/interior',
            alt: 'Thevar Residence interior',
          },
          {
            label: 'Evening View',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/thevar-residence/evening.jpg',
            public_id: 'rkbsite/works/thevar-residence/evening',
            alt: 'Thevar Residence evening view',
          },
        ],
        order: 1,
        published: true,
      },
      {
        id: 'krishna-complex',
        title: 'Krishna Commercial Complex',
        type: 'New Construction',
        year: 2021,
        locality: 'Gandhipuram',
        district: 'Coimbatore',
        description: 'A modern commercial complex with retail spaces and offices. Designed for optimal foot traffic and business visibility with contemporary facade and ample parking.',
        thumbnail: {
          url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/krishna-complex/thumbnail.jpg',
          public_id: 'rkbsite/works/krishna-complex/thumbnail',
          alt: 'Krishna Commercial Complex — completed project by R K B Builders',
        },
        meta: 'Commercial Complex · Coimbatore',
        photos: [
          {
            label: 'Exterior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/krishna-complex/exterior.jpg',
            public_id: 'rkbsite/works/krishna-complex/exterior',
            alt: 'Krishna Commercial Complex exterior',
          },
          {
            label: 'Facade Detail',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/krishna-complex/facade.jpg',
            public_id: 'rkbsite/works/krishna-complex/facade',
            alt: 'Krishna Commercial Complex facade',
          },
          {
            label: 'Interior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/krishna-complex/interior.jpg',
            public_id: 'rkbsite/works/krishna-complex/interior',
            alt: 'Krishna Commercial Complex interior',
          },
        ],
        order: 2,
        published: true,
      },
      {
        id: 'heritage-renovation',
        title: 'Heritage Bungalow Renovation',
        type: 'Renovation',
        year: 2022,
        locality: 'Race Course',
        district: 'Coimbatore',
        description: 'Careful restoration of a 1950s heritage bungalow preserving original architectural character while integrating modern amenities and structural reinforcements.',
        thumbnail: {
          url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/heritage-renovation/thumbnail.jpg',
          public_id: 'rkbsite/works/heritage-renovation/thumbnail',
          alt: 'Heritage Bungalow Renovation — completed project by R K B Builders',
        },
        meta: 'Heritage Renovation · Coimbatore',
        photos: [
          {
            label: 'Exterior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/heritage-renovation/exterior.jpg',
            public_id: 'rkbsite/works/heritage-renovation/exterior',
            alt: 'Heritage bungalow exterior after renovation',
          },
          {
            label: 'Living Area',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/heritage-renovation/living.jpg',
            public_id: 'rkbsite/works/heritage-renovation/living',
            alt: 'Heritage bungalow living area',
          },
          {
            label: 'Interior',
            url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/works/heritage-renovation/interior.jpg',
            public_id: 'rkbsite/works/heritage-renovation/interior',
            alt: 'Heritage bungalow interior details',
          },
        ],
        order: 3,
        published: true,
      },
    ]);
    console.log(`✅ ${works.length} Works seeded`);

    // Seed AboutHero
    const aboutHero = await AboutHero.create({
      portrait: {
        url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/about/tamilpriyan-hero.jpg',
        public_id: 'rkbsite/about/tamilpriyan-hero',
        alt: 'Er. R K B Tamilpriyan, Managing Director of R K B Builders',
      },
      name: 'Er. R K B Tamilpriyan',
      role: 'Civil Engineer & Urban Planner',
      philosophy_quote: 'Our primordial principle is to construct not just buildings, but lasting relationships built on trust, quality, and timeless craftsmanship.',
      philosophy_attr: '— Er. R K B Tamilpriyan, Managing Director',
    });
    console.log('✅ AboutHero seeded');

    // Seed AboutLeadership
    const leadership = await AboutLeadership.create({
      photo: {
        url: 'https://res.cloudinary.com/demo/image/upload/rkbsite/about/tamilpriyan-site.jpg',
        public_id: 'rkbsite/about/tamilpriyan-site',
        alt: 'Er. R K B Tamilpriyan, Managing Director of R K B Builders, on site with architectural plans',
      },
      name: 'Er. R K B Tamilpriyan',
      role: 'Civil Engineer & Urban Planner',
      credentials: [
        'B.E. — Civil Engineering',
        'M.Plan — Urban Planning',
        'Licensed & Govt. Registered Civil Engineer',
        'Associate Member, Institute of Town Planners India (ITPI)',
      ],
      bio: 'The fourth generation to lead R K B Builders, Er. Tamilpriyan pairs formal training in civil engineering and urban planning with a family practice that stretches back to 1940.',
    });
    console.log('✅ AboutLeadership seeded');

    // Seed Admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      name: 'Admin User',
    });
    console.log('✅ Admin user seeded (username: admin, password: admin123)');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - HomeHero: 1 document`);
    console.log(`   - Works: ${works.length} documents`);
    console.log(`   - AboutHero: 1 document`);
    console.log(`   - AboutLeadership: 1 document`);
    console.log(`   - Admin: 1 document`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();