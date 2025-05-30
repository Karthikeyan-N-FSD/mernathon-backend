const Wishlist = require("../model/wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [{ productId }],
      });
    } else {
      wishlist.items.push({ productId });
    }

    await wishlist.save();
    await wishlist.populate("items.productId");
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();
    await wishlist.populate("items.productId");
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
