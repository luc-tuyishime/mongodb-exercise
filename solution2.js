const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("could not connect to MongoDB..", err))

const courseSchema = new mongoose.Schema({
  // once we have a schema, we compile to model down witch gives us a Class (Course)
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema)

async function createCourse() {
  const course = new Course({
    // create object based on class(Course) and store in DB
    name: "Angular Course",
    author: "Luc",
    tags: ["angular", "frontend dev"],
    isPublished: true
  })

  const result = await course.save() // will save to the DB
  console.log(result)
}

async function getCourses() {
  const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .or([ { price: { $gte: 15 } }, { name: /.*by*./i } ]) //find all the courses where we find by
    .limit(pageSize)
    .sort('-price')
    .select('name author price')
  console.log(courses)
}

async function run(){
  const courses = await getCourses()
  console.log(courses)
}

run()
