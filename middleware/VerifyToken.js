import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == "") return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = {
      userId: decoded.userId,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      gender: decoded.gender,
      email: decoded.email,
      role: decoded.role,
      nohp: decoded.nohp,
      birthday: decoded.birthday,
      country: decoded.country,
      province: decoded.province,
      city: decoded.city,
      address: decoded.address,
      postalcode: decoded.postalcode,
      pictures: decoded.pictures,
    };
    req.email = decoded.email;
    req.role = decoded.role;
    req.firstname = decoded.firstname;
    req.lastname = decoded.lastname;
    req.gender = decoded.gender;
    req.nohp = decoded.nohp;
    req.birthday = decoded.birthday;
    req.country = decoded.country;
    req.province = decoded.province;
    req.city = decoded.city;
    req.address = decoded.address;
    req.postalcode = decoded.postalcode;
    req.pictures = decoded.pictures;
    next();
  });
};
