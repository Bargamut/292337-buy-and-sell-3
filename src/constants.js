'use strict';

const DEFAULT_COMMAND = `--help`;
const SERVICE_DEFAULT_PORT = 3000;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const API_PREFIX_PATH = `/api`;

const MOCK_DEFAULT_COUNT = 1;
const MOCK_MAX_ID_LENGTH = 6;
const MOCK_MAX_COMMENTS = 7;
const MOCK_FILE_NAME = `mocks.json`;
const MOCK_FILE_TITLES_PATH = `./data/titles.txt`;
const MOCK_FILE_SENTENCES_PATH = `./data/sentences.txt`;
const MOCK_FILE_CATEGORIES_PATH = `./data/categories.txt`;
const MOCK_FILE_COMMENTS_PATH = `./data/comments.txt`;

module.exports = {
  DEFAULT_COMMAND,
  SERVICE_DEFAULT_PORT,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  API_PREFIX_PATH,
  MOCK_DEFAULT_COUNT,
  MOCK_MAX_ID_LENGTH,
  MOCK_MAX_COMMENTS,
  MOCK_FILE_NAME,
  MOCK_FILE_TITLES_PATH,
  MOCK_FILE_SENTENCES_PATH,
  MOCK_FILE_CATEGORIES_PATH,
  MOCK_FILE_COMMENTS_PATH,
};
