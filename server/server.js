import express from "express"
import mongoose from "mongoose"
import { LoginDetails } from "./models/logindetails.js"
import { BookDetails } from "./models/bookdetails.js"
import { OrderDetails } from "./models/orderdetails.js"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/logindetails"
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))
app.use(cors())
app.use(bodyParser.json())

app.post('/', async (req, res) => {
    const { firstName, lastName, password } = req.body
    const l = await LoginDetails.findOne({ firstName, lastName, password })
    if (l) {
        res.status(409).json({ success: false, message: "Already available" })
    } else {
        const logindetails = new LoginDetails({ firstName, lastName, password, profit: 0 })
        await logindetails.save()
        res.status(201).json({ success: true, message: "User created successfully", id: logindetails._id })
    }
})

app.post('/login', async (req, res) => {
    const { firstName, lastName, password } = req.body
    const l = await LoginDetails.findOne({ firstName, lastName, password })
    if (l) {
        res.status(200).json({ success: true, message: "User Found", id: l._id })
    } else {
        res.status(404).json({ success: false, message: "Not found" })
    }
})
app.post('/getusername', async (req, res) => {
    const { userid } = req.body
    const l = await LoginDetails.findOne({ _id: userid })
    if (l) {
        res.status(200).json({ success: true, message: "User Found", name: l.firstName })
    } else {
        res.status(404).json({ success: false, message: "Not found" })
    }
})
app.post('/getsaledetails', async (req, res) => {
    try {
        const { userid } = req.body;
        const user = await LoginDetails.findById(userid);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const soldBooks = await OrderDetails.find({ Seller: userid }).select('Name Price cover Author Buyer');
        const unsoldBooks = await BookDetails.find({ Owner: userid }).select('Name Price cover Author');
        const getSoldBooksWithBuyer = async (soldBooks) => {
            const updatedBooks = [];
            for (const book of soldBooks) {
                const buyer = await LoginDetails.findById(book.Buyer).select('firstName');
                updatedBooks.push({
                    Buyer: buyer?.firstName || 'Unknown',
                    Name: book.Name,
                    Price: book.Price,
                    cover: book.cover,
                });
            }
            return updatedBooks;
        };
        const soldBooksWithBuyer = await getSoldBooksWithBuyer(soldBooks);
        const books = [...soldBooksWithBuyer, ...unsoldBooks];

        res.status(200).json({
            success: true,
            message: "User Found",
            name: user.firstName,
            books,
            profit: user.profit
        });
    } catch (error) {
        console.error("Error in /getsaledetails:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/buy', async (req, res) => {
    try {
        const b = req.body;
        const userId = b[0];
        b.shift();
        console.log(b)
        console.log("User ID:", userId);
        for (const item of b) {
            const { _id, Name, Price, cover } = item;
            const book = await BookDetails.findById(_id).select('Owner');
            console.log("Owner:", book.Owner)
            if (!book) return res.status(404).json({ success: false, message: "Book not found" });

            const user = await LoginDetails.findById(book.Owner);
            if (!user) return res.status(404).json({ success: false, message: "Owner not found" });
            console.log("User:", user.firstName)
            const orderdetails = new OrderDetails({
                Buyer: user,
                Name: Name,
                Price: Price,
                cover: cover,
                Seller: userId
            })
            await orderdetails.save();
            user.profit += Price;
            await user.save();
            await BookDetails.findByIdAndDelete(_id);
        }
        res.status(200).json({ success: true, message: "Books purchased successfully" });
    } catch (error) {
        console.error("Error in /buy route:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

app.post('/sell', async (req, res) => {
    try {
        const { Name, Price, Cover, Author, Owner } = req.body;
        const user = await LoginDetails.findById(Owner);
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        const bookdetails = new BookDetails({
            Name: Name,
            Price: Price,
            cover: Cover,
            Author: Author,
            Owner: user._id
        });
        await bookdetails.save();
        res.status(201).json({
            success: true,
            message: "Book listed successfully",
            book: {
                id: bookdetails._id,
                Name: bookdetails.Name,
                Price: bookdetails.Price,
                cover: bookdetails.cover,
                Author: bookdetails.Author,
                Owner: user.firstName
            }
        });

    } catch (error) {
        console.error("Error in /sell route:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

app.post('/getbooks', async (req, res) => {
    const { userid } = req.body;
    const allBooks = await BookDetails.find({ Owner: { $ne: userid } }).select('Name Price cover Author');
    res.status(201).json({ success: true, message: "Success!", books: allBooks });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
