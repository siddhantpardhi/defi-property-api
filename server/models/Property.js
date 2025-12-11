// Property model
class Property {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.userName = data.userName;
    this.title = data.title;
    this.address = data.address;
    this.price = data.price;
    this.note = data.note;
    this.status = data.status;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Remove sensitive data before sending to client (if needed)
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      userName: this.userName,
      title: this.title,
      address: this.address,
      price: this.price,
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Validate property data
  static validate(data) {
    const errors = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (!data.address || data.address.trim().length === 0) {
      errors.push("Address is required");
    }

    if (typeof data.price !== "number" || data.price <= 0) {
      errors.push("Price must be a positive number");
    }

    if (!data.userId || data.userId.trim().length === 0) {
      errors.push("UserId is required");
    }

    if (!data.userName || data.userName.trim().length === 0) {
      errors.push("UserName is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Property data storage (will be replaced with database)
const properties = [];

// Property service methods
class PropertyService {
  // Find property by ID
  static findById(id) {
    return properties.find((property) => property.id === parseInt(id));
  }

  // Get all properties (with optional status filter)
  static getAll(status = null) {
    let result = properties;
    
    // Filter by status if provided
    if (status) {
      result = properties.filter((property) => property.status === status);
    }
    
    return result.map((property) => property.toJSON());
  }

  // Create a new property
  static create(propertyData) {
    const validation = Property.validate(propertyData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const newProperty = new Property({
      id: properties.length + 1,
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    properties.push(newProperty);
    return newProperty;
  }

  // Update an existing property
  static update(id, updateData) {
    const propertyIndex = properties.findIndex(
      (property) => property.id === parseInt(id)
    );
    
    if (propertyIndex === -1) {
      throw new Error("Property not found");
    }

    // Validate price if it's being updated
    if (updateData.price !== undefined) {
      if (typeof updateData.price !== "number" || updateData.price <= 0) {
        throw new Error("Price must be a positive number");
      }
    }

    // Update the property instance directly (preserving methods)
    const property = properties[propertyIndex];
    Object.assign(property, updateData);
    property.updatedAt = new Date();

    return property;
  }

  // Delete a property
  static delete(id) {
    const propertyIndex = properties.findIndex(
      (property) => property.id === parseInt(id)
    );
    
    if (propertyIndex === -1) {
      throw new Error("Property not found");
    }

    return properties.splice(propertyIndex, 1)[0];
  }
}

module.exports = {
  Property,
  properties,
  PropertyService,
};