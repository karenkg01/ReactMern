const express = require("express"); //Framework to buildbackend applications with node.
const homepageRoutes = require("./routes/homepageRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const jsonwebtoken = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const extension = require("mime-types").extension;
const { loginRequired, adminRequired } = require("./controllers/middleware");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    /* generates a "unique" name - not collision proof but unique enough for small sized applications */
    let id = shortid.generate();
    /* need to use the file's mimetype because the file name may not have an extension at all */
    let ext = extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  },
});
const upload = multer({ storage: storage });

require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/shop');
mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const cors = require("cors");

const { addProduct } = require("./controllers/productController");
const { updateImageProfile } = require("./controllers/userController");

const app = express(); //this method does the same thing as http.createserver
const PORT = 8080;

app.use(cors());
app.use(express.json()); //to get to react you need to serve it with json data, strictly frontend
app.use(express.urlencoded({ extended: false }));

homepageRoutes(app); //This method calls the Routes function
userRoutes(app);
orderRoutes(app);
productRoutes(app);
cartRoutes(app);

app.use('/static', express.static('public'))

app.post("/api/v1/admin/products", upload.single("image"), addProduct);
app.post("/api/v1/profile/image", upload.single("image"), updateImageProfile);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));

module.exports = app;
