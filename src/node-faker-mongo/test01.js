import faker from 'faker'
import mongoose from 'mongoose'

let db = mongoose.createConnection('mongodb://127.0.0.1:27017/faker');

db.on('error', (error) => {
  console.log(error)
})

let userSchema = new mongoose.Schema({
  name: { type: String, default: '匿名用户' },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  ip: { type: String },
  phone: { type: String },
  city: { type: String },
  county: { type: String },
  avatar: { type: String }
})

let userModel = db.model('user', userSchema)


faker.locale = 'zh_CN'

let insertedDocs = []

for (let i = 0; i <= 100; i++) { 

  let user = {
    'name': faker.name.findName(),
    'username': faker.internet.userName(),
    'password': faker.internet.password(),
    'email': faker.internet.email(),
    'ip': faker.internet.ip(),
    'phone': faker.phone.phoneNumber(),
    // 'card': faker.helpers.createCard(),
    'city': faker.address.city(),
    'county': faker.address.county(),
    'avatar': faker.image.avatar()
    
  }   

  insertedDocs.push(user)
}

userModel.insertMany(insertedDocs)
    .then((mongooseDocuments) => {
      console.log('insert success.')
    })
    .catch((err) => {
      if (err)
        console.log('insert failed.')
    })


db.close()