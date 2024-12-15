import sequelize from "./db.js";
(async () => {
    try {
        await sequelize.sync({ force: true }); // Use force: true only in development
        console.log("Database synced successfully!");
    }
    catch (error) {
        console.error("Error syncing database:", error);
    }
    finally {
        process.exit();
    }
})();
