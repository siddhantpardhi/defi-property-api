const request = require('supertest');
const { PropertyService, properties } = require('../models/Property');

// Import your Express app
const app = require('../index');

describe('Property API Tests', () => {
  // Clear properties array before each test
  beforeEach(() => {
    properties.length = 0;
  });

  describe('POST /api/properties', () => {
    test('should create a property with all required fields', async () => {
      const propertyData = {
        userId: '0123456789',
        userName: 'Ether',
        title: 'Beautiful House',
        address: '0x12312313213',
        price: 500000
      };

      const response = await request(app)
        .post('/api/properties')
        .send(propertyData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
      expect(response.body.data.title).toBe(propertyData.title);
      expect(response.body.data.price).toBe(propertyData.price);
    });

    test('should create property with all fields including optional', async () => {
      const propertyData = {
        userId: '9876543210',
        userName: 'CryptoUser',
        title: 'Modern Apartment',
        address: '123 Main Street',
        price: 350000,
        note: 'Fully furnished',
        status: 'available'
      };

      const response = await request(app)
        .post('/api/properties')
        .send(propertyData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.note).toBe(propertyData.note);
      expect(response.body.data.status).toBe(propertyData.status);
    });

    test('should return 400 if required field is missing', async () => {
      const propertyData = {
        userId: '0123456789',
        userName: 'Ether',
        address: '0x12312313213',
        price: 500000
        // title is missing
      };

      const response = await request(app)
        .post('/api/properties')
        .send(propertyData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    test('should return 400 if price is negative', async () => {
      const propertyData = {
        userId: '0123456789',
        userName: 'Ether',
        title: 'House',
        address: '0x12312313213',
        price: -100
      };

      const response = await request(app)
        .post('/api/properties')
        .send(propertyData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should return 400 if status is invalid', async () => {
      const propertyData = {
        userId: '0123456789',
        userName: 'Ether',
        title: 'House',
        address: '0x12312313213',
        price: 500000,
        status: 'invalid_status'
      };

      const response = await request(app)
        .post('/api/properties')
        .send(propertyData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/properties', () => {
    beforeEach(async () => {
      // Create some test properties
      PropertyService.create({
        userId: '0123456789',
        userName: 'Ether',
        title: 'House 1',
        address: 'Address 1',
        price: 500000,
        status: 'available'
      });

      PropertyService.create({
        userId: '0123456789',
        userName: 'Ether',
        title: 'House 2',
        address: 'Address 2',
        price: 600000,
        status: 'sold'
      });

      PropertyService.create({
        userId: '9876543210',
        userName: 'User2',
        title: 'House 3',
        address: 'Address 3',
        price: 700000,
        status: 'available'
      });
    });

    test('should get all properties', async () => {
      const response = await request(app)
        .get('/api/properties')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.properties).toHaveLength(3);
      expect(response.body.data.total).toBe(3);
    });

    test('should filter properties by status', async () => {
      const response = await request(app)
        .get('/api/properties?status=available')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.properties).toHaveLength(2);
      response.body.data.properties.forEach(property => {
        expect(property.status).toBe('available');
      });
    });

    test('should paginate properties with limit', async () => {
      const response = await request(app)
        .get('/api/properties?limit=2')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.properties).toHaveLength(2);
      expect(response.body.data.limit).toBe(2);
    });

    test('should paginate properties with limit and offset', async () => {
      const response = await request(app)
        .get('/api/properties?limit=1&offset=1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.properties).toHaveLength(1);
      expect(response.body.data.offset).toBe(1);
    });
  });

  describe('GET /api/properties/:id', () => {
    let createdProperty;

    beforeEach(() => {
      createdProperty = PropertyService.create({
        userId: '0123456789',
        userName: 'Ether',
        title: 'Test House',
        address: '0x12312313213',
        price: 500000
      });
    });

    test('should get property by ID', async () => {
      const response = await request(app)
        .get(`/api/properties/${createdProperty.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdProperty.id);
      expect(response.body.data.title).toBe('Test House');
    });

    test('should return 404 if property not found', async () => {
      const response = await request(app)
        .get('/api/properties/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Property not found');
    });
  });

  describe('PUT /api/properties/:id', () => {
    let createdProperty;

    beforeEach(() => {
      createdProperty = PropertyService.create({
        userId: '0123456789',
        userName: 'Ether',
        title: 'Test House',
        address: '0x12312313213',
        price: 500000
      });
    });

    test('should update property with single field', async () => {
      const response = await request(app)
        .put(`/api/properties/${createdProperty.id}`)
        .send({ price: 550000 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(550000);
      expect(response.body.data.updatedAt).toBeDefined();
      // Title should remain unchanged
      expect(response.body.data.title).toBe('Test House');
    });

    test('should update property with multiple fields', async () => {
      const response = await request(app)
        .put(`/api/properties/${createdProperty.id}`)
        .send({
          price: 600000,
          status: 'sold',
          note: 'Property sold'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(600000);
      expect(response.body.data.status).toBe('sold');
      expect(response.body.data.note).toBe('Property sold');
    });

    test('should return 404 if property not found', async () => {
      const response = await request(app)
        .put('/api/properties/999')
        .send({ price: 550000 })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Property not found');
    });

    test('should return 400 if price is invalid', async () => {
      const response = await request(app)
        .put(`/api/properties/${createdProperty.id}`)
        .send({ price: -100 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should return 400 if status is invalid', async () => {
      const response = await request(app)
        .put(`/api/properties/${createdProperty.id}`)
        .send({ status: 'invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/properties/:id', () => {
    let createdProperty;

    beforeEach(() => {
      createdProperty = PropertyService.create({
        userId: '0123456789',
        userName: 'Ether',
        title: 'Test House',
        address: '0x12312313213',
        price: 500000
      });
    });

    test('should delete property', async () => {
      const response = await request(app)
        .delete(`/api/properties/${createdProperty.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Property deleted successfully');

      // Verify property is deleted
      const getResponse = await request(app)
        .get(`/api/properties/${createdProperty.id}`)
        .expect(404);
    });

    test('should return 404 if property not found', async () => {
      const response = await request(app)
        .delete('/api/properties/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Property not found');
    });
  });
});