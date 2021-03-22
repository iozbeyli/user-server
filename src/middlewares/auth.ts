import { verify } from "jsonwebtoken";

const auth = (req: any, res: any, next: any) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    verify(token, secret || "secret", (err: any) => {
      if (err) {
        return res
          .status(403)
          .send({ message: "You are not authorised to perform this action." });
      }

      next();
    });
  } else {
    return res.status(401).send({ message: "Missing authentication." });
  }
};

export default auth;
