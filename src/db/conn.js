const mongoose = require("mongoose");
var mongoDB = "mongodb+srv://madhupatel:madhu@cluster0.l5wjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedtopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
});
