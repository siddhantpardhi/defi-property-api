const express = require("express");
const { PropertyController } = require("../controllers/PropertyController");
const {
  validate,
  validateQuery,
  createPropertySchema,
  updatePropertySchema,
  propertyQuerySchema,
} = require("../middlewares/validation");

const router = express.Router();

// Create a property
router.post(
  "/",
  validate(createPropertySchema),
  PropertyController.create
);

// Get all properties (with optional filtering and pagination)
router.get(
  "/",
  validateQuery(propertyQuerySchema),
  PropertyController.getAll
);

// Get property by ID
router.get(
  "/:id",
  PropertyController.getById
);

// Update a property
router.put(
  "/:id",
  validate(updatePropertySchema),
  PropertyController.update
);

// Delete a property
router.delete(
  "/:id",
  PropertyController.delete
);

module.exports = router;
