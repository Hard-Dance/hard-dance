const axios = require("axios");
const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const repoOwner = "Hard-Dance";
  const repoName = "hard-dance";
  const baseBranchName = "main";
  const newBranchName = `new-event-${Date.now()}`; // Unique branch name

  const formData = JSON.parse(event.body);
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const fileName = `${currentDate}-${formData["event-name"]
    .replace(/\s+/g, "-")
    .toLowerCase()}.md`;
  const filePath = `_posts/${fileName}`;

  // Construct the markdown content
  const markdownContent = `---
layout: event
category: events
title: "${formData["event-name"]}"
date: ${new Date().toISOString()}
datestart: ${formData.datestart}
dateend: ${formData.dateend || ""}
location: "${formData.location}"
type: "${formData.type}"
age: "${formData.age}"
hosts:
  - ${formData.hosts.join("\n  - ")}
links:
  - title: Website
    url: ${formData.website}
  - title: Facebook
    url: ${formData.facebook}
image: /assets/img/events/${fileName.replace(
    ".md",
    ""
  )}.${"jpg"} // Assuming JPG for simplicity
---
`;

  try {
    // Get the SHA of the latest commit on the base branch
    const { data: { object: { sha: baseSha } } } = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${baseBranchName}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Netlify Function",
        },
      }
    );

    // Create a new branch from the base branch
    await axios.post(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
      {
        ref: `refs/heads/${newBranchName}`,
        sha: baseSha,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Netlify Function",
        },
      }
    );

    // Create a new file on the new branch
    await axios.put(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        message: `New event submission: ${formData["event-name"]}`,
        content: Buffer.from(markdownContent).toString("base64"),
        branch: newBranchName,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Netlify Function",
        },
      }
    );

    // Create a pull request to merge the new branch into the base branch
    await axios.post(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
      {
        title: `New event submission: ${formData["event-name"]}`,
        head: newBranchName,
        base: baseBranchName,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Netlify Function",
        },
      }
    );

    return { statusCode: 200, body: "Event created successfully" };
  } catch (error) {
    console.error("Error creating event:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};