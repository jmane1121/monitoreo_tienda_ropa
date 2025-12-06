import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

async function adminSeeder() {
  try {
    const adminEmail = "admin@tienda.com";

    const exist = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (exist) {
      console.log("✔ El usuario admin ya existe");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("Admin123*", salt);

    await prisma.user.create({
      data: {
        nombre: "Administrador",
        email: adminEmail,
        password: hashed,
        role: "ADMIN",
      },
    });

    console.log("✔ Admin creado con éxito");
  } catch (error) {
    console.error("❌ Error creando admin:", error);
  } finally {
    process.exit();
  }
}

adminSeeder();
