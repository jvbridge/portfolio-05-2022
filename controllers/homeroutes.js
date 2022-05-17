const repoJson = require("./repos.json");
const fetch = require("node-fetch");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    // getting the github repositories

    const fetches = [];

    // get the list of promises for each repo
    repoJson.forEach((repo) => {
      console.log("doing the fetch for: ", repo.name);
      const response = fetch(
        `https://api.github.com/repos/jvbridge/${repo.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("finished the pull");
      fetches.push(response);
    });

    // execute all the promises to get the responses
    const responses = await Promise.all(fetches);

    // map out the responses
    const tmp = responses.map(async (response, index) => {
      const repoData = await response.json();
      const ret = {
        pictureLink: repoJson[index].image,
        description: repoData.description,
        title: repoData.name,
        link: repoData.html_url,
      };
      return ret;
    });
    // get all the json out
    const projects = await Promise.all(tmp);

    res.render("homepage", { projects });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
