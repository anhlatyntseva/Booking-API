import * as propertyService from '../services/propertyService.js';

export const getAllProperties = async (req, res) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const filters = { location, pricePerNight, amenities };
    const properties = await propertyService.getAllProperties(filters);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await propertyService.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get property' });
  }
};

export const createProperty = async (req, res) => {
  const data = req.body;
  try {
    const newProperty = await propertyService.createProperty(data);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create property' });
  }
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedProperty = await propertyService.updateProperty(id, data);
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update property' });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await propertyService.deleteProperty(id);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete property' });
  }
};