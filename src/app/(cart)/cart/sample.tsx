// list cart item
router.get("/cart/item/list", isBuyer, async (req, res) => {
    const cartItemList = await Cart.aggregate([
      {
        $match: { buyerId: req.loggedInUserId },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          name: { $first: "$productDetails.name" },
          brand: { $first: "$productDetails.brand" },
          price: { $first: "$productDetails.price" },
          image: { $first: "$productDetails.image" },
          sellerId: { $first: "$productDetails.sellerId" },
          productId: 1,
  
          orderedQuantity: 1,
          subTotal: {
            $multiply: [{ $first: "$productDetails.price" }, "$orderedQuantity"],
          },
        },
      },
    ]);
  
    let subTotalOfAllProducts = 0;
  
    cartItemList.forEach((item) => {
      subTotalOfAllProducts = subTotalOfAllProducts + item.subTotal;
    });
  
    const discount = 0.05 * subTotalOfAllProducts;
  
    const grandTotal = subTotalOfAllProducts - discount;
  
    return res.status(200).send({
      message: "success",
      cartItems: cartItemList,
      orderSummary: [
        { name: "sub total", value: subTotalOfAllProducts.toFixed(2) },
        { name: "discount", value: discount.toFixed(2) },
        { name: "grandTotal", value: grandTotal.toFixed(2) },
      ],
  
      grandTotal,
    });
  });