import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  whoAmI,
  deleteUsers,
  updateUsers,
  getUsersBy,
  handleGetRoot,
} from "../controllers/HandlerUsers.js";
import {
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketById,
  HandlerBooked,
  getUserBooking,
} from "../controllers/HandlerTicket.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createAirport,
  deleteAirport,
  getAirport,
  getAirportBy,
  getAirportById,
  updateAirport,
} from "../controllers/HandleAirport.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookingBy,
  softDeleteBooking,
} from "../controllers/HandlerBooking.js";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  getWishlistbyid,
} from "../controllers/HandlerWishlist.js";
import {
  createPassanger,
  deletePassanger,
  getPassanger,
  getPassangerById,
  updatePassanger,
} from "../controllers/HandlerPassanger.js";
import {
  createFlight,
  deleteFlight,
  getFlight,
  getFlightBy,
  updateFlight,
} from "../controllers/HandlerFlight.js";
const router = express.Router();
const prefix = "/v1/api/";

//ROUTES FOR USERS
router.get(prefix, handleGetRoot);
router.get(prefix + "users", getUsers);
router.get(prefix + "users/:search", getUsersBy);
router.post(prefix + "register", Register);
router.post(prefix + "login", Login);
router.delete(prefix + "logout", verifyToken, Logout);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers);
router.put(prefix + "users/edit/:id", verifyToken, updateUsers);
router.get(prefix + "whoami", verifyToken, whoAmI);

//ROUTES FOR TICKETS
router.get(prefix + "tickets", verifyToken, getTicket);
router.post(prefix + "tickets", verifyToken, createTicket);
router.delete(prefix + "tickets/delete/:id", verifyToken, deleteTicket);
router.put(prefix + "tickets/edit/:id", verifyToken, updateTicket);
router.get(prefix + "tickets/:id", verifyToken, getTicketById);

//ROUTES FOR AIRPORT
router.get(prefix + "airports", verifyToken, getAirport);
router.get(prefix + "airports/:search", verifyToken, getAirportBy);
router.get(prefix + "airports/id/:id", verifyToken, getAirportById);
router.put(prefix + "airports/edit/:id", verifyToken, updateAirport);
router.delete(prefix + "airports/delete/:id", verifyToken, deleteAirport);
router.post(prefix + "airports", verifyToken, createAirport);

//ROUTES FOR BOOKING
router.get(prefix + "bookings", verifyToken, getBooking);
router.get(prefix + "bookings/:search", verifyToken, getBookingBy);
router.post(prefix + "bookings/create", verifyToken, createBooking);
router.delete(prefix + "bookings/delete/:id", verifyToken, softDeleteBooking);
router.delete(prefix + "bookings/deleted/:id", verifyToken, deleteBooking);

//ROUTER FOR PASSANGERS
router.get(prefix + "passanger", verifyToken, getPassanger);
router.get(prefix + "passanger/:id", verifyToken, getPassangerById);
router.put(prefix + "passanger/edit/:id", verifyToken, updatePassanger);
router.post(prefix + "passanger/create", verifyToken, createPassanger);
router.delete(prefix + "passanger/delete/:id", verifyToken, deletePassanger);

//ROUTES FOR WISHLIST
router.get(prefix + "wishlists", getWishlist);
router.get(prefix + "wishlists/:id", getWishlistbyid);
router.post(prefix + "wishlists/create", createWishlist);
router.delete(prefix + "wishlists/delete/:id", deleteWishlist);

//ROUTES FOR FLIGHT
router.get(prefix + "flight", verifyToken, getFlight);
router.get(prefix + "flight/:search", verifyToken, getFlightBy);
router.post(prefix + "flight/create", verifyToken, createFlight);
router.delete(prefix + "flight/delete/:id", verifyToken, deleteFlight);
router.put(prefix + "flight/edit/:id", verifyToken, updateFlight);

router.post(prefix + "book/:id", HandlerBooked);
router.get(prefix + "book/", getUserBooking);

// router.post(prefix + "admin/login", isAdmin);
// router.post(prefix + "superadmin/login", isSuperAdmin);
// router.get(prefix + "token", refreshToken);
// // endpoint untuk tambah admin yang bisa hanya superadminc
// router.post(prefix + "registrasi-admin", verifyToken, RegisterAdmin);

export default router;
