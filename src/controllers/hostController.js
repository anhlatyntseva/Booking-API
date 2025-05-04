import * as hostService from '../services/hostService.js';

export const getAllHosts = async (req, res) => {
  try {
    const { name } = req.query;
    const hosts = await hostService.getAllHosts({ name });
    res.json(hosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHostById = async (req, res) => {
  try {
    const { id } = req.params;
    const host = await hostService.getHostById(id);
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.json(host);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHost = async (req, res) => {
  try {
    const data = req.body;
    const newHost = await hostService.createHost(data);
    res.status(201).json(newHost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedHost = await hostService.updateHost(id, data);
    res.json(updatedHost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHost = async (req, res) => {
  try {
    const { id } = req.params;
    await hostService.deleteHost(id);
    res.json({ message: 'Host deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};