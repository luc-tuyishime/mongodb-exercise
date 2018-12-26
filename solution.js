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
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .skip(( pageNumber - 1 ) * pageSize)
    .limit(pageSize)
    // .or([ { tags: 'frontend' }, { tags: 'backend' } ])
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    console.log(courses)
}

async function updateCourse(id){
  // approach Query first
  // findById()
  // Modify its properties
  // save()
  const result = await Course.findByIdAndUpdate(id, { // send one command to mongo for update and return it.
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true }); // return a promise await it and storei in a variable

  console.log(result)
}

updateCourse(' put id from DB compasse ')

async function run(){
  const courses = await getCourses()
  console.log(courses)
}

run()
