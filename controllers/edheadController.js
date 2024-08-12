import EducationalHead from '../models/edhead.js';



export const getEducationalHeads = async (req, res) => {
  try {
    const educationalHeads = await EducationalHead.find();
    res.status(200).json(educationalHeads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEducationalHeadById = async (req, res) => {
  try {
    const educationalHead = await EducationalHead.findById(req.params.id);
    if (!educationalHead) return res.status(404).json({ message: 'Educational Head not found' });
    res.status(200).json(educationalHead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEducationalHead = async (req, res) => {
  try {
    const educationalHead = await EducationalHead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!educationalHead) return res.status(404).json({ message: 'Educational Head not found' });
    res.status(200).json(educationalHead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEducationalHead = async (req, res) => {
  try {
    const educationalHead = await EducationalHead.findByIdAndDelete(req.params.id);
    if (!educationalHead) return res.status(404).json({ message: 'Educational Head not found' });
    res.status(200).json({ message: 'Educational Head deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
