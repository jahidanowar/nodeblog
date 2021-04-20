const AppError = require("./../utils/appError");
const Post = require("./../models/postModel");
const catchAsync = require("./../utils/catchAsync");

exports.index = catchAsync(async (req, res) => {
  let query = Post.find();
  // Filter
  let queryString = req.query;
  // console.log(JSON.stringify(queryString));
  query = query.find(queryString);
  query = query.select('title');
  // query = query.limit(2);
  const posts = await query;
  res.status(200).json({ status: "success", count: posts.length, data: posts });
});

exports.store = catchAsync(async (req, res, next) => {
  let post = {
    title: req.body.title,
    body: req.body.content,
    thumbnail: req.body.thumbnail ?? "nothumbnail.jpg",
    tags: req.body.tags ?? [],
  };
  await Post.create(post);
  res.status(201).json({ message: "Post Created" });
});

exports.show = catchAsync(async (req, res) => {
  const post = await Post.find({ slug: req.params.slug });
  res.status(200).json({ status: "success", data: post });
});

exports.update = (req, res) => {
  res.status(201).json({ message: `Update Post id ${req.params.slug}` });
};

exports.destroy = (req, res) => {
  res.status(201).json({ message: `Delete Post id ${req.params.slug}` });
};
