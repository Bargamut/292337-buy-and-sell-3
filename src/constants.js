'use strict';

const DEFAULT_COMMAND = `--help`;
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
const MAX_ID_LENGTH = 6;

const MOCK_FILE_NAME = `mocks.json`;

const MAX_FILENAME_LENGTH = 6;
const ALLOWED_FILE_TYPES = [`image/jpeg`, `image/png`];

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  API_PREFIX_PATH,
  MAX_ID_LENGTH,
  MOCK_FILE_NAME,
  MAX_FILENAME_LENGTH,
  ALLOWED_FILE_TYPES,
};
