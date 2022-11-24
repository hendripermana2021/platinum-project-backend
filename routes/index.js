import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  whoAmI,
  deleteUsers,
  updateUsers,
  getUsersById,
  handleGetRoot,
} from "../controllers/HandlerUsers.js";
import {
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketById,
} from "../controllers/HandlerTicket.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createAirport,
  deleteAirport,
  getAirport,
  getAirportById,
  updateAirport,
} from "../controllers/HandleAirport.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getBooking, getBookingById } from "../controllers/HandlerBooking.js";
import { getWishlist } from "../controllers/HandlerWishlist.js";
import { getHistory, getHistoryById } from "../controllers/HandlerHistory.js";
// import { getCars, getCarsById, createCars, updateCars, deleteCars, softDeleteCars } from "../controllers/HandlerCars.js"
const router = express.Router();
const prefix = "/v1/api/";
// import fs from "fs";
// import yaml from "js-yaml";

// const swaggerDocument = yaml.load(
//   fs.readFileSync("OpenAPICars-Users.yaml", "utf8")
// );
// import swaggerUI from "swagger-ui-express";

// router.use(
//   prefix + "api-docs",
//   swaggerUI.serve,
//   swaggerUI.setup(swaggerDocument)
// );
//ROUTES FOR USERS
router.get(prefix, handleGetRoot);
router.get(prefix + "users", getUsers);
router.get(prefix + "users/:id", getUsersById);
router.post(prefix + "register", Register);
router.post(prefix + "login", Login);
// router.post(prefix + "admin/login", isAdmin);
// router.post(prefix + "superadmin/login", isSuperAdmin);
router.delete(prefix + "logout", verifyToken, Logout);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers);
router.put(prefix + "users/edit/:id", verifyToken, updateUsers);
router.get(prefix + "whoami", verifyToken, whoAmI);

//ROUTES FOR TICKETS
router.get(prefix + "tickets", getTicket);
router.post(prefix + "tickets", createTicket);
router.delete(prefix + "tickets/delete/:id", deleteTicket);
router.put(prefix + "tickets/edit/:id", updateTicket);
router.get(prefix + "tickets/:id", getTicketById);

//ROUTES FOR AIRPORT
router.get(prefix + "airports", getAirport);
router.get(prefix + "airports/:id", getAirportById);
router.put(prefix + "airports/edit/:id", updateAirport);
router.delete(prefix + "airports/delete/:id", deleteAirport);
router.post(prefix + "airports", createAirport);

//ROUTES FOR BOOKING
router.get(prefix + "bookings", getBooking);
router.get(prefix + "bookings/:id", getBookingById);

//ROUTES FOR WISHLIST
router.get(prefix + "wishlists", getWishlist);

//ROUTES FOR HISTORY_PAYMENT
router.get(prefix + "history-payment", getHistory);
router.get(prefix + "history-payment/:id", getHistoryById);

// router.get(prefix + "token", refreshToken);

// // endpoint untuk tambah admin yang bisa hanya superadmin
// router.post(prefix + "registrasi-admin", verifyToken, RegisterAdmin);

// router.get(prefix + "cars", verifyToken, getCars);
// router.get(prefix + "cars/:id", verifyToken, getCarsById);
// router.post(prefix + "create/cars", verifyToken, createCars);
// router.put(prefix + "cars/edit/:id", verifyToken, updateCars);
// router.put(prefix + "cars/delete/:id", verifyToken, softDeleteCars);
// router.delete(prefix + "cars/list-delete/:id", verifyToken, deleteCars);

export default router;
