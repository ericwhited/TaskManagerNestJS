export default (req, res) => {
  res.status(200).json({
    test: "hello yalllll"
  });
};

//  LONG WAY
// export default (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.statusCode = 200;
//   res.end(
//     JSON.stringify({
//       test: "Hello folks"
//     })
//   );
// };
