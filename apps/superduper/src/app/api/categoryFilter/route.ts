// import express from 'express';
// const router = express.Router();

// router.get('/product', async (req, res) => {
//     try {
//       const product = await product.find({
//         category: {
//           $regex: req.params.category,
//           $options: "i"
//         }
//       });
//       res.json(product);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log(error.message);
//       } else {
//         console.log('Unknown error');
//       }
//       res.status(500).send('Server Error');
//     }
//   });
