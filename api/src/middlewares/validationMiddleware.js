import { ZodError } from "zod";

const validateData = schema => {
  return (req, res, next) => {
    try {
      if (req.method === "POST") schema.parse(req.body);
      if (req.method === "GET") schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(issue => issue.message);
        return res.status(400).json({ errors: errorMessages });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default validateData;
