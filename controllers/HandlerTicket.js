import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { refreshToken } from "./RefreshToken.js";
import dummy from "../models/dummy.js";

const Ticket = db.Ticket;
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findAll({
      attributes: [
        "id",
        "id_airport",
        "arrival_id",
        "departure_date",
        "departure_time",
        "arrival_time",
        "passenger",
        "departure_terminal",
        "arrival_terminal",
        "price",
        "class",
        "plane_name",
        "oneway",
      ],
    });
    res.json(ticket);
  } catch (error) {
    console.log(error);
  }
};
