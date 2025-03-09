import { z } from "zod";

const fileNameSchema = z.object({
  fileName: z.string().min(1),
});

export default fileNameSchema;
