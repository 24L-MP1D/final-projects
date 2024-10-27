import express from 'express'
const app = express();
app.use(express.json());
import { Request, Response } from "express";
import { postProduct } from "../model/postproductmodel";
import { algoliasearch } from 'algoliasearch'
const client = algoliasearch("MLKXEEH303", "8afc4b223bd36c4137f45360abf5dfb0")
const postproductscontroller = async (req: Request, res: Response) => {
    try {
       const { name, information, barCode,imageurl,price,leftquantity,category,subcategory,type,color,size,addTag} = req.body
      const postProducts = await postProduct.create({
        name: name,
        information: information,
        barCode: barCode,
        imageurl:imageurl,
        price:price,
        leftquantity:leftquantity,
        category:category,
        subcategory:subcategory,
        type:type,
        color:color,
        size:size,
        addTag:addTag,
      })
      const response = await client.saveObject({ indexName: 'ecommerce', body: { name: name, information: information, imageurl:imageurl, category:category, subcategory:subcategory, type:type, addTag:addTag}})
      console.log(response)
      res.status(200).send("Successfully created");
       } catch (error) {
       console.error(error)
      res.status(404).send("Could not create")
     }
      }

export {postproductscontroller}