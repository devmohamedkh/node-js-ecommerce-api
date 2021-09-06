const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");
const orderServise = require("../utils/service/orderServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.createOrder = async (req, res) => {
  try {
    const cart = await cartServise.getCart(req.userId);

    const ProductsIOutOfStocke = await productServise.isProductsInStoke(
      cart.items
    );
    if (ProductsIOutOfStocke)
      return res.status(200).json(
        successResponse(
          {
            name: ProductsIOutOfStocke.productId.name,
            desc: "the prodect is out of stock",
          },
          "order filler",
          200
        )
      );
    const order = await orderServise.creatOrders(cart.items, req.userId);

    await productServise.updateProductsQuantityInStoke(cart.items);

    await cartServise.emptyCart();

    return res
      .status(200)
      .send({ message: "Order created successfully!", order });
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("unable to create order", 400));
  }
};

// don
exports.getOrder = async (req, res) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    return res
      .status(200)
      .json(successResponse(cart, "get cart Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get cart", 400));
  }
};

// exports.canselOrder = async (req, res) => {
//   try {
//     const cartEmpty = await cartServise.emptyCart();

//     if (!cartEmpty)
//       return res
//         .status(404)
//         .json(errorResponse("cart empty unSuccessfully", 404));

//     return res
//       .status(200)
//       .json(successResponse(cartEmpty, "cart empty Successfully!", 201));
//   } catch (error) {
//     console.log(error);

//     return res
//       .status(400)
//       .json(errorResponse("Could not empty the cart ", 400));
//   }
// };

// exports.RemoveProductfromeOrder = async (req, res) => {
//   try {
//     const deletedproduct = await cartServise.RemoveProductfromeCart(
//       req.userId,
//       req.params.id
//     );

//     if (!deletedproduct)
//       return res.status(404).json(errorResponse("product not deleted", 404));

//     return res
//       .status(200)
//       .json(
//         successResponse(deletedproduct, "delete product Successfully!", 201)
//       );
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json(errorResponse("Could not delete products ", 400));
//   }
// };
