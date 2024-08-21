import express, { Router } from "express";
import multer from "multer";
import { uploadPost, uploadProfileImage } from "./multer.js";
import fs from "fs";
import * as path from "path";

import {
  validateJSONPost,
  validateJSONPatetYear,
  validateJSONPerson,
} from "./jsonValidator.js";
import { addImage } from "./imgHandler.js";
import {
  isAdminKeyValid,
  getUsernameFromAdminKey,
  pathToCredentialsFile,
} from "../server.js";

import {
  pathToPatetosFile,
  pathToPostsFile,
  pathToPatetosImages,
} from "../server.js";

function createRandomSuffix() {
  return Date.now() + "-" + Math.round(Math.random() * 1e9);
}

const backRouter = Router();

backRouter.get("/getPosts", (req, res) => {
  let activePosts = fs.readFileSync(pathToPostsFile);
  activePosts = JSON.parse(activePosts);
  res.status(200).send(activePosts);
});

backRouter.get("/getAllPeople", (req, res) => {
  let allPatetos = fs.readFileSync(pathToPatetosFile);
  allPatetos = JSON.parse(allPatetos);
  res.status(200).send(allPatetos);
});

backRouter.get("/getAllPatetos", (req, res) => {
  let allPatetos = fs.readFileSync(pathToPatetosFile);
  allPatetos = JSON.parse(allPatetos);
  allPatetos = allPatetos.slice(1);
  res.status(200).send(allPatetos);
});

backRouter.get("/getSittande", (req, res) => {
  let allPatetos = fs.readFileSync(pathToPatetosFile);
  allPatetos = JSON.parse(allPatetos);
  if (allPatetos.length === 0) return res.status(404).send("No sittande found");
  let sittande = allPatetos[0];
  res.status(200).send(sittande);
});

export default backRouter;
