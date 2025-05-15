const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Amenities
  const amenitiesData = JSON.parse(fs.readFileSync('./src/data/amenities.json'));
  for (const amenity of amenitiesData.amenities) {
    await prisma.amenity.create({ data: amenity });
  }
  console.log('Amenities seeded');

  // Hosts
  const hostsData = JSON.parse(fs.readFileSync('./src/data/hosts.json'));
  for (const host of hostsData.hosts) {
    await prisma.host.create({ data: host });
  }
  console.log('Hosts seeded');

  // Users
  const usersData = JSON.parse(fs.readFileSync('./src/data/users.json'));
  for (const user of usersData.users) {
    await prisma.user.create({ data: user });
  }
  console.log('Users seeded');

  // Properties
  const propertiesData = JSON.parse(fs.readFileSync('./src/data/properties.json'));
  for (const property of propertiesData.properties) {
    await prisma.property.create({ data: property });
  }
  console.log('Properties seeded');

  // Bookings
  const bookingsData = JSON.parse(fs.readFileSync('./src/data/bookings.json'));
  for (const booking of bookingsData.bookings) {
    await prisma.booking.create({ data: booking });
  }
  console.log('Bookings seeded');

  // Reviews
  const reviewsData = JSON.parse(fs.readFileSync('./src/data/reviews.json'));
  for (const review of reviewsData.reviews) {
    await prisma.review.create({ data: review });
  }
  console.log('Reviews seeded');

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
