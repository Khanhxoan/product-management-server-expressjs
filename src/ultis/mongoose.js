const multipleMongooseToObject = (mongooses) => {
    return mongooses.map((item) => item.toObject());
};

const mongooseToObject = (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
};

module.exports = { mongooseToObject, multipleMongooseToObject };
