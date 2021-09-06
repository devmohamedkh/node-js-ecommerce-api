const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// cartSchema.methods.addToCart = function (data) {
//   const cartProductIndex = this.items.findIndex((cp) => {
//     return cp.productId.toString() === data.productId.toString();
//   });
//   const updatedCartItems = [...this.items];

//   if (cartProductIndex >= 0) {
//     updatedCartItems[cartProductIndex].quantity = Number.parseInt(
//       data.quantity
//     );
//   } else {
//     updatedCartItems.push({
//       productId: data.productId,
//       quantity: Number.parseInt(data.quantity),
//     });
//   }
//   // const updatedCart = {
//   //   items: updatedCartItems,
//   // };
//   this.items = updatedCartItems;
//   return this.save();
// };

// cartSchema.methods.removeFromCart = function (productId) {
//   const updatedCartItems = this.items.filter((item) => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.items = updatedCartItems;
//   return this.save();
// };

// cartSchema.methods.clearCart = function () {
//   this.items = [];
//   return this.save();
// };
module.exports = mongoose.model("cart", cartSchema);
