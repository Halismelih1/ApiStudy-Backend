const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  console.log(req.body);
  try {
    const _todo = await todo.findOne({ name: req.body.name });
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "bu isimde kayıt mevcut!",
      });
    }
    const todoAdd = new todo(req.body);

    await todoAdd
      .save()
      .then(() => {
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "kayıt oluşturulurken hata oluştu :(" + err,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "sunucu kaynaklı hata !",
    });
  }
};

const todoGetAll = async (req, res) => {
  try {
    const todoGetAll = await todo.find({});
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "kayıtlar getirilemedi",
    });
  }
};

const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      return res.status(200).json({
        success: true,
        message: "güncelleme başarılı",
      });
    } else
      return res.status(400).json({
        success: false,
        message: "kayıt güncellenemedi!",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "kayıt güncellenemedi",
    });
  }
};

const todoDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await todo.findByIdAndRemove(id);
    if (deleteTodo) {
      return res.status(200).json({
        success: true,
        message: "silme işlemi başarılı",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "kayıt silinemedi",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "kayıt silinemedi!" + error,
    });
  }
};

const todoGetBy = async (req, res) => {
  const { id } = req.params;
  const todoGetBy = await todo.findById(id);

  if (todoGetBy) {
    return res.status(200).json(todoGetBy);
  } else {
    return res.status(404).json({
      success: false,
      message: "kayıt bulunamadı !",
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGetBy,
};
