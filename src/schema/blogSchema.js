const yup = require('yup')
const { email, mobile, password, image, imageSize } = require('./regexp')

const createBlogSchema = yup.object().shape({
  title: yup.string().required('Blog Title is Required!'),
  description: yup.string().required('Blog Description is Required!'),
  bannar: yup.array().min(1, 'Blog Image Required'),
})

module.exports = {
  createBlogSchema,
}
