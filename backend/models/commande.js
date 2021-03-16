const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    id_seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
    },
    id_buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyers",
    },
    amount: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commande", commandeSchema);
