import Parent from '../models/parent.js';

export const getParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.status(200).json({ message: 'Parent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
