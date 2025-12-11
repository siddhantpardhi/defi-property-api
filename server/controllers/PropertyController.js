const { PropertyService } = require('../models/Property');

class PropertyController {
  static async create(req, res) {
    try {
      const propertyData = req.body;
      const newProperty = PropertyService.create(propertyData);
      
      res.status(201).json({
        success: true,
        data: newProperty.toJSON()
      });
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create property'
      });
    }
  }

  static async getAll(req, res) {
    try {
      const { status, limit, offset } = req.query;
      
      let properties = PropertyService.getAll(status || null);
      
      const total = properties.length;
      if (limit !== undefined || offset !== undefined) {
        const start = offset || 0;
        const end = limit ? start + limit : properties.length;
        properties = properties.slice(start, end);
      }
      
      res.json({
        success: true,
        data: {
          properties,
          total,
          limit: limit ? parseInt(limit) : total,
          offset: offset ? parseInt(offset) : 0
        }
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch properties'
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const property = PropertyService.findById(id);
      
      if (!property) {
        return res.status(404).json({
          success: false,
          error: 'Property not found'
        });
      }
      
      res.json({
        success: true,
        data: property.toJSON()
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch property'
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedProperty = PropertyService.update(id, updateData);
      
      res.json({
        success: true,
        message: 'Property updated successfully',
        data: updatedProperty.toJSON()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      
      if (error.message === 'Property not found') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update property'
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      PropertyService.delete(id);
      
      res.json({
        success: true,
        message: 'Property deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      
      if (error.message === 'Property not found') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to delete property'
      });
    }
  }
}

module.exports = { PropertyController };