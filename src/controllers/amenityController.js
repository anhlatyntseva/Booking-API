import * as amenityService from '../services/amenityService.js';

export const getAllAmenities = async (req, res) => {
  try {
    const amenities = await amenityService.getAllAmenities();
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAmenityById = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await amenityService.getAmenityById(id);
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAmenity = async (req, res) => {
  try {
    const data = req.body;
    const newAmenity = await amenityService.createAmenity(data);
    res.status(201).json(newAmenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedAmenity = await amenityService.updateAmenity(id, data);
    res.json(updatedAmenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    await amenityService.deleteAmenity(id);
    res.json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};