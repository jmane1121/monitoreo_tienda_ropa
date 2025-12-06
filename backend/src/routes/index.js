import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import productoRoutes from "./productoRoutes.js";
import inventarioRoutes from "./inventarioRoutes.js";
import maquilaRoutes from "./maquilaRoutes.js";

export default (app) => {
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/productos", productoRoutes);
    app.use("/inventario", inventarioRoutes);
    app.use("/maquila", maquilaRoutes);
};
