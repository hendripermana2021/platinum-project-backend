import express from "express";
import {
  getUsers,
  Register,
  LoginUsers,
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
  getTicketQuery,
} from "../controllers/HandlerTicket.js";
import pkg from "../uploadImage/HandlerFile.js";
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
  actionBooking,
  getBooking,
  getBookingBy,
  getBookingById,
  softDeleteBooking,
  getUserBooking,
  cancelBooking,
} from "../controllers/HandlerBooking.js";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  getWishlistbyid,
  getWishlistby,
} from "../controllers/HandlerWishlist.js";
import {
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
  getFlightById,
  updateFlight,
} from "../controllers/HandlerFlight.js";
import {
  BuyingTicket,
  getPayment,
  isPaymentBooking,
} from "../controllers/HandlerPayment.js";
const router = express.Router();
const prefix = "/v1/api/";
const { uploadPictures, getListFiles } = pkg;

//ROUTES FOR USERS
router.get(prefix, handleGetRoot);
router.get(prefix + "users", getUsers);
router.get(prefix + "users/:search", getUsersBy);
router.post(prefix + "register", Register);
router.post(prefix + "login", LoginUsers);
router.delete(prefix + "logout", verifyToken, Logout);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers);
router.put(prefix + "users/edit/:id", verifyToken, updateUsers);
router.get(prefix + "whoami", verifyToken, whoAmI);

//ROUTES FOR UPLOAD FILE
router.post(prefix + "upload", uploadPictures);
router.get(prefix + "profilepictures", getListFiles);

//ROUTES FOR TICKETS
router.get(prefix + "tickets", getTicket);
router.get(prefix + "tickets/search", getTicketQuery);
router.post(prefix + "tickets", verifyToken, createTicket);
router.delete(prefix + "tickets/delete/:id", verifyToken, deleteTicket);
router.put(prefix + "tickets/edit/:id", verifyToken, updateTicket);
router.get(prefix + "tickets/:id", getTicketById);

//ROUTES FOR AIRPORT
router.get(prefix + "airports", getAirport);
router.get(prefix + "airports/:search", getAirportBy);
router.get(prefix + "airports/byid/:id", getAirportById);
router.put(prefix + "airports/edit/:id", verifyToken, updateAirport);
router.delete(prefix + "airports/delete/:id", verifyToken, deleteAirport);
router.post(prefix + "airports", verifyToken, createAirport);

//ROUTES FOR BOOKING
router.get(prefix + "bookings", getBooking);
// router.get(prefix + "bookings/:search", getBookingBy);
router.get(prefix + "bookings/byid/:id", getBookingById);
router.get(prefix + "userbookings", getUserBooking);
router.delete(prefix + "bookings/delete/:id", softDeleteBooking);

//ROUTER FOR PASSANGERS
router.get(prefix + "passanger", getPassanger);
router.get(prefix + "passanger/:id", getPassangerById);
router.put(prefix + "passanger/edit/:id", updatePassanger);
router.delete(prefix + "passanger/delete/:id", deletePassanger);

//ROUTES FOR WISHLIST
router.get(prefix + "wishlists", verifyToken, getWishlist);
router.get(prefix + "wishlists/:id", verifyToken, getWishlistbyid);
// router.get(prefix + "wishlists/name/:search", getWishlistby);
router.post(prefix + "wishlists/create", verifyToken, createWishlist);
router.delete(prefix + "wishlists/delete/:id", deleteWishlist);

//ROUTES FOR FLIGHT
router.get(prefix + "flight", getFlight);
router.get(prefix + "flight/:search", getFlightBy);
router.get(prefix + "flight/byid/:id", getFlightById);
router.post(prefix + "flight/create", createFlight);
router.delete(prefix + "flight/delete/:id", deleteFlight);
router.put(prefix + "flight/edit/:id", updateFlight);

//API FOR ACTION BUYER
router.post(prefix + "booking", verifyToken, actionBooking);
router.get(prefix + "booking/payment/:id", verifyToken, isPaymentBooking);
router.get(prefix + "cancel/booking/:id", cancelBooking);

//API FOR TOKEN
router.get(prefix + "token", refreshToken);

//API FOR PAYMENT
router.get(prefix + "payments", verifyToken, getPayment);

export default router;
