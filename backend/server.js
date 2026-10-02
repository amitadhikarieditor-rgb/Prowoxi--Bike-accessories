import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";

import {
    securityMiddleware,
    apiLimiter,
} from "./middleware/security.js";

import {
    errorHandler,
    notFound,
} from "./middleware/error.js";

import { requireAuth } from "./middleware/auth.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.set("trust proxy", 1);


app.use(securityMiddleware);


app.use(morgan("dev"));

app.use(
    "/api/webhooks",
    express.raw({
        type: "application/json",
    }),
    (req, res, next) => {
        req.rawBody = req.body;

        try {
            req.body = JSON.parse(
                req.body.toString("utf8")
            );

            next();
        } catch (error) {
            next(error);
        }
    }
);


app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
    })
);


app.use(cookieParser());


app.use("/api", apiLimiter);


app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        time: new Date().toISOString(),
    });
});


app.use("/api/auth", authRoutes);


app.use(
    "/api/products",
    requireAuth,
    productRoutes
);

app.use(
    "/api/cart",
    requireAuth,
    cartRoutes
);

app.use(
    "/api/wishlist",
    requireAuth,
    wishlistRoutes
);


app.use(
    "/api/reviews",
    reviewRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);


app.use(
    "/api/addresses",
    requireAuth,
    addressRoutes
);


app.use(
    "/api/notifications",
    requireAuth,
    notificationRoutes
);


app.use(
    "/api/admin",
    adminRoutes
);


app.use(
    "/api/webhooks",
    webhookRoutes
);


app.use(notFound);


app.use(errorHandler);
const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        app.listen(
    env.port,
    "0.0.0.0",
    () => {
        console.log(
            `ProWoxi API running on port ${env.port}`
        );
    }
);
    } catch (error) {
        console.error(
            "Failed to start ProWoxi API:",
            error
        );

        process.exit(1);
    }
};

startServer();