const getJobs = (req, res) => {
  res.json([
    { id: 1, title: "Frontend Developer", company: "Dubai Tech" },
    { id: 2, title: "Backend Engineer", company: "Kenya Systems" },
    { id: 3, title: "UI/UX Designer", company: "Global Remote Inc" }
  ]);
};

module.exports = { getJobs };