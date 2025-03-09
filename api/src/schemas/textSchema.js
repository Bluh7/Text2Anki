import { z } from "zod";

const textSchema = z.object({
  text: z.string().min(70),
});

export default textSchema;
