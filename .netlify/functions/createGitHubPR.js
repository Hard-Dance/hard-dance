const axios = require("axios");
const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const repoOwner = "Hard-Dance";
  const repoName = "hard-dance";
  const branchName = "main"; // Ensure this is the branch you want to use

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

  // GitHub API URL to create a new file
  const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  try {
    // Call GitHub API to create a new file
    const response = await axios.put(
      githubApiUrl,
      {
        message: `New event submission: ${formData["event-name"]}`,
        content: Buffer.from(markdownContent).toString("base64"),
        branch: branchName,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Netlify Function",
        },
      }
    );

    // Handle image upload logic here if necessary
    // Note: For image uploads, consider using Netlify Large Media or another storage solution,
    // as directly uploading to GitHub via API might not be practical for binary files.

    return { statusCode: 200, body: "Event created successfully" };
  } catch (error) {
    console.error("Error creating event:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
