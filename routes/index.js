import express from "express";
import {
  getUsers,
  Register,
  createAddress,
  Login,
  Logout,
  whoAmI,
  deleteUsers,
  updateUsers,
  deleteAddress,
  updateAddress,
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
import {
  getWishlist,
  getWishlistbyid,
} from "../controllers/HandlerWishlist.js";
import { getHistory, getHistoryById } from "../controllers/HandlerHistory.js";
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
router.post(prefix + "register", Register, createAddress);
router.post(prefix + "login", Login);
router.delete(prefix + "logout", verifyToken, Logout);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers, deleteAddress);
router.put(prefix + "users/edit/:id", verifyToken, updateUsers, updateAddress);
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
router.get(prefix + "wishlists/:id", getWishlistbyid);

//ROUTES FOR HISTORY_PAYMENT
router.get(prefix + "history-payment", getHistory);
router.get(prefix + "history-payment/:id", getHistoryById);

// router.post(prefix + "admin/login", isAdmin);
// router.post(prefix + "superadmin/login", isSuperAdmin);
// router.get(prefix + "token", refreshToken);
// // endpoint untuk tambah admin yang bisa hanya superadminc
// router.post(prefix + "registrasi-admin", verifyToken, RegisterAdmin);

export default router;
