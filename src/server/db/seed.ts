async function seed() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  console.timeEnd("🧹 Cleaned up the database...");

  console.timeEnd(`🌱 Database has been seeded`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
