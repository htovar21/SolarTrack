const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    // Verificar que el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar que el email no esté en uso por otro usuario
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
    }
    
    // Actualizar campos
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    
    await user.save();
    
    res.json({ 
      message: 'Usuario actualizado correctamente',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
}; 