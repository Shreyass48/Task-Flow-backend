const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

// Create task validation
const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(100),
    description: z.string().optional(),
    project: objectIdSchema,
    assignedTo: objectIdSchema.optional(),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    status: z.enum(["todo", "in-progress", "done"]).default("todo"),
    dueDate: z.coerce.date().optional(),
  }),
});

// Update task validation
const updateTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      title: z.string().trim().min(3).max(100).optional(),
      description: z.string().optional(),
      assignedTo: objectIdSchema.optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
      status: z.enum(["todo", "in-progress", "done"]).optional(),
      dueDate: z.coerce.date().optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field is required",
    ),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
